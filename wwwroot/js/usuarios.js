(function () {
    'use strict';

    let tablaUsuarios;
    let todosLosRoles = [];
    let modal;
    let modalLabel;
    let formUsuario;
    let usuarioIdInput;
    let usuarioInput;
    let nombreCompletoInput;
    let emailInput;
    let passwordInput;
    let activoCheckbox;
    let rolesContainer;

    document.addEventListener('DOMContentLoaded', function () {
        tablaUsuarios = $('#tabla-usuarios').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            columns: [
                { data: 'IdUsuario' },
                { data: 'Usuario' },
                { data: 'NombreCompleto' },
                {
                    data: 'Activo',
                    render: data => data
                        ? '<span class="badge bg-success">Sí</span>'
                        : '<span class="badge bg-danger">No</span>'
                },
                {
                    data: 'IdUsuario',
                    orderable: false,
                    render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `
                }
            ]
        });

        modal = new bootstrap.Modal(document.getElementById('modal-usuario'));
        modalLabel = document.getElementById('modal-usuario-label');
        formUsuario = document.getElementById('form-usuario');
        usuarioIdInput = document.getElementById('usuario-id');
        usuarioInput = document.getElementById('usuario');
        nombreCompletoInput = document.getElementById('nombre-completo');
        emailInput = document.getElementById('email');
        passwordInput = document.getElementById('contrasena');
        activoCheckbox = document.getElementById('activo');
        rolesContainer = document.getElementById('roles-container');

        cargarDatosIniciales();

        document.getElementById('btn-nuevo-usuario').addEventListener('click', abrirModalNuevo);
        document.getElementById('btn-guardar-usuario').addEventListener('click', guardarUsuario);

        $('#tabla-usuarios tbody').on('click', '.btn-editar', function () {
            abrirModalEditar($(this).data('id'));
        });
        $('#tabla-usuarios tbody').on('click', '.btn-eliminar', function () {
            eliminarUsuario($(this).data('id'));
        });
    });

    async function cargarDatosIniciales() {
        app.mostrarSpinner();
        try {
            const [rolesResponse, usuariosResponse] = await Promise.all([
                app.apiFetch('Usuarios - Listar Roles', API_URLS.rol.listar),
                app.apiFetch('Usuarios - Listar', API_URLS.usuario.listar)
            ]);

            const rolesResult = await rolesResponse.json();
            if (rolesResult.Respuesta && !rolesResult.Respuesta.Error) {
                todosLosRoles = rolesResult.Respuesta.Resultado || [];
                renderizarCheckboxesRoles();
            } else {
                Swal.fire('Error', rolesResult.Respuesta?.Message || 'No se pudieron cargar los roles.', 'error');
            }

            const usuariosResult = await usuariosResponse.json();
            if (usuariosResult.Respuesta && !usuariosResult.Respuesta.Error) {
                tablaUsuarios.clear().rows.add(usuariosResult.Respuesta.Resultado || []).draw();
            } else {
                Swal.fire('Error', usuariosResult.Respuesta?.Message || 'No se pudieron cargar los usuarios.', 'error');
            }
        } catch (error) {
            app.logException('Usuarios - cargarDatosIniciales', error);
            Swal.fire('Error', 'Ocurrió un problema al cargar los datos de usuarios.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function renderizarCheckboxesRoles() {
        rolesContainer.innerHTML = '';
        todosLosRoles.forEach(rol => {
            rolesContainer.insertAdjacentHTML('beforeend', `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${rol.IdRol}" id="rol-${rol.IdRol}">
                    <label class="form-check-label" for="rol-${rol.IdRol}">${rol.NombreRol || rol.Nombre}</label>
                </div>`);
        });
    }

    function abrirModalNuevo() {
        formUsuario.reset();
        usuarioIdInput.value = '';
        modalLabel.textContent = 'Nuevo Usuario';
        passwordInput.placeholder = 'Ingrese contraseña';
        activoCheckbox.checked = true;
        rolesContainer.querySelectorAll('input').forEach(cb => cb.checked = false);
        modal.show();
    }

    async function abrirModalEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Usuarios - Obtener', `${API_URLS.usuario.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const data = result.Respuesta.Resultado[0];
                if (!data) {
                    Swal.fire('Advertencia', 'No se encontró el usuario solicitado.', 'warning');
                    return;
                }

                formUsuario.reset();
                usuarioIdInput.value = data.IdUsuario;
                usuarioInput.value = data.Usuario;
                nombreCompletoInput.value = data.NombreCompleto;
                emailInput.value = data.Email || '';
                activoCheckbox.checked = Boolean(data.Activo);
                passwordInput.placeholder = 'Dejar en blanco para no cambiar';

                const rolesResponse = await app.apiFetch('Usuarios - Roles del Usuario', `${API_URLS.usuarioRol.listarPorUsuario}?idUsuario=${id}`);
                const rolesResult = await rolesResponse.json();
                const rolesDeUsuario = rolesResult.Respuesta && !rolesResult.Respuesta.Error
                    ? rolesResult.Respuesta.Resultado || []
                    : [];

                const rolesAsignados = rolesDeUsuario.map(r => String(r.IdRol || r.idRol));
                rolesContainer.querySelectorAll('input').forEach(cb => {
                    cb.checked = rolesAsignados.includes(cb.value);
                });

                modalLabel.textContent = 'Editar Usuario';
                modal.show();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo obtener el usuario.', 'error');
            }
        } catch (error) {
            app.logException('Usuarios - abrirModalEditar', error);
            Swal.fire('Error', 'Ocurrió un problema al obtener el usuario.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarUsuario() {
        if (!usuarioInput.value.trim() || !nombreCompletoInput.value.trim()) {
            Swal.fire('Campos requeridos', 'El usuario y el nombre completo son obligatorios.', 'warning');
            return;
        }

        const usuarioData = {
            idUsuario: usuarioIdInput.value || 0,
            usuario: usuarioInput.value,
            nombreCompleto: nombreCompletoInput.value,
            email: emailInput.value || '',
            password: passwordInput.value || '',
            activo: activoCheckbox.checked
        };

        const rolesSeleccionados = Array.from(rolesContainer.querySelectorAll('input:checked')).map(cb => cb.value);
        const url = usuarioData.idUsuario && Number(usuarioData.idUsuario) !== 0
            ? API_URLS.usuario.actualizar
            : API_URLS.usuario.crear;

        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Usuarios - Guardar', url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData)
            });
            const result = await response.json();

            if (result.Respuesta && !result.Respuesta.Error) {
                const idUsuarioGuardado = result.Respuesta.Resultado && result.Respuesta.Resultado[0]
                    ? result.Respuesta.Resultado[0].IdUsuarioCreado || result.Respuesta.Resultado[0].IdUsuario || usuarioData.idUsuario
                    : usuarioData.idUsuario;
                await guardarRoles(idUsuarioGuardado, rolesSeleccionados);
                modal.hide();
                Swal.fire('Éxito', 'Usuario guardado correctamente.', 'success');
                cargarDatosIniciales();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo guardar el usuario.', 'error');
            }
        } catch (error) {
            app.logException('Usuarios - guardarUsuario', error);
            Swal.fire('Error', 'Ocurrió un problema al guardar el usuario.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarRoles(idUsuario, rolesNuevos) {
        try {
            const response = await app.apiFetch('Usuarios - Roles actuales', `${API_URLS.usuarioRol.listarPorUsuario}?idUsuario=${idUsuario}`);
            const result = await response.json();
            const rolesActuales = result.Respuesta && !result.Respuesta.Error
                ? (result.Respuesta.Resultado || []).map(r => String(r.IdRol || r.idRol))
                : [];

            const rolesAAgregar = rolesNuevos.filter(id => !rolesActuales.includes(String(id)));
            const rolesAQuitar = rolesActuales.filter(id => !rolesNuevos.includes(String(id)));

            const promesas = [];

            rolesAAgregar.forEach(idRol => {
                promesas.push(app.apiFetch('Usuarios - Asignar Rol', API_URLS.usuarioRol.asignar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idUsuario, idRol: Number(idRol) })
                }));
            });

            rolesAQuitar.forEach(idRol => {
                promesas.push(app.apiFetch('Usuarios - Quitar Rol', API_URLS.usuarioRol.quitarPorIds, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idUsuario, idRol: Number(idRol) })
                }));
            });

            await Promise.all(promesas.map(async (promise) => {
                const resp = await promise;
                const body = await resp.json();
                if (!(body.Respuesta && !body.Respuesta.Error)) {
                    throw new Error(body.Respuesta?.Message || 'Error al sincronizar roles');
                }
            }));
        } catch (error) {
            app.logException('Usuarios - guardarRoles', error);
            Swal.fire('Advertencia', 'Se guardó el usuario, pero algunos roles no pudieron sincronizarse.', 'warning');
        }
    }

    function eliminarUsuario(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'El usuario será eliminado.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }

            app.mostrarSpinner();
            try {
                const response = await app.apiFetch('Usuarios - Eliminar', API_URLS.usuario.eliminar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idUsuario: id })
                });
                const res = await response.json();

                if (res.Respuesta && !res.Respuesta.Error) {
                    Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success');
                    cargarDatosIniciales();
                } else {
                    Swal.fire('Error', res.Respuesta?.Message || 'No se pudo eliminar el usuario.', 'error');
                }
            } catch (error) {
                app.logException('Usuarios - eliminarUsuario', error);
                Swal.fire('Error', 'Ocurrió un problema al eliminar el usuario.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        });
    }
})();
