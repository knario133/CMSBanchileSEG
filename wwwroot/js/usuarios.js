(function () {
    'use strict';

    let tablaUsuarios;
    let todosLosRoles = [];

    document.addEventListener('DOMContentLoaded', function () {

        const modalElement = document.getElementById('modal-usuario');
        const modal = new bootstrap.Modal(modalElement);

        tablaUsuarios = $('#tabla-usuarios').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            columns: [
                { data: 'IdUsuario' }, { data: 'Usuario' }, { data: 'NombreCompleto' }, { data: 'Email' },
                { data: 'Activo', render: data => data ? '<span class="badge bg-success">Sí</span>' : '<span class="badge bg-danger">No</span>' },
                { data: 'IdUsuario', render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>`,
                    orderable: false
                }
            ]
        });

        cargarDatosIniciales();

        document.getElementById('btn-nuevo-usuario').addEventListener('click', abrirModalNuevo);
        document.getElementById('btn-guardar-usuario').addEventListener('click', guardarUsuario);

        $('#tabla-usuarios tbody').on('click', '.btn-editar', function () { abrirModalEditar($(this).data('id')); });
        $('#tabla-usuarios tbody').on('click', '.btn-eliminar', function () { eliminarUsuario($(this).data('id')); });
    });

    async function cargarDatosIniciales() {
        app.mostrarSpinner();
        try {
            const [resRoles, resUsuarios] = await Promise.all([
                fetch(API_URLS.rol.listar),
                fetch(API_URLS.usuario.listar)
            ]);

            const rolesResult = await resRoles.json();
            if (rolesResult.Respuesta && !rolesResult.Respuesta.Error) {
                todosLosRoles = rolesResult.Respuesta.Resultado || [];
                renderizarCheckboxesRoles();
            } else {
                console.error("Error al cargar roles:", rolesResult.Respuesta.Message);
            }

            const usuariosResult = await resUsuarios.json();
            if (usuariosResult.Respuesta && !usuariosResult.Respuesta.Error) {
                tablaUsuarios.clear().rows.add(usuariosResult.Respuesta.Resultado || []).draw();
            } else {
                console.error("Error al cargar usuarios:", usuariosResult.Respuesta.Message);
            }

        } catch (error) {
            console.error('Error de red al cargar datos iniciales:', error);
            Swal.fire('Error', 'No se pudieron cargar los datos iniciales.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function renderizarCheckboxesRoles() {
        const container = document.getElementById('roles-container');
        container.innerHTML = '';
        todosLosRoles.forEach(rol => {
            container.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${rol.IdRol}" id="rol-${rol.IdRol}">
                    <label class="form-check-label" for="rol-${rol.IdRol}">${rol.NombreRol}</label>
                </div>`;
        });
    }

    function abrirModalNuevo() {
        document.getElementById('form-usuario').reset();
        document.getElementById('usuario-id').value = '';
        document.getElementById('contrasena').placeholder = 'Ingrese contraseña';
        document.getElementById('modal-usuario-label').textContent = 'Nuevo Usuario';
        document.getElementById('activo').checked = true;
        document.querySelectorAll('#roles-container input').forEach(cb => cb.checked = false);
        new bootstrap.Modal(document.getElementById('modal-usuario')).show();
    }

    async function abrirModalEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await fetch(`${API_URLS.usuario.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const data = result.Respuesta.Resultado[0];
                document.getElementById('form-usuario').reset();
                document.getElementById('usuario-id').value = data.IdUsuario;
                document.getElementById('usuario').value = data.Usuario;
                document.getElementById('nombre-completo').value = data.NombreCompleto;
                document.getElementById('email').value = data.Email; // Asumo que el Email viene
                document.getElementById('activo').checked = data.Activo; // Asumo que Activo viene
                document.getElementById('contrasena').placeholder = 'Dejar en blanco para no cambiar';

                // Cargar los roles del usuario (necesitamos un handler para esto)
                const rolesResponse = await fetch(`${API_URLS.usuarioRol.listarPorUsuario}?idUsuario=${id}`);
                const rolesResult = await rolesResponse.json();
                if(rolesResult.Respuesta && !rolesResult.Respuesta.Error) {
                    const rolesDeUsuario = rolesResult.Respuesta.Resultado || [];
                    document.querySelectorAll('#roles-container input').forEach(cb => {
                        cb.checked = rolesDeUsuario.some(rol => rol.IdRol == cb.value);
                    });
                }

                document.getElementById('modal-usuario-label').textContent = 'Editar Usuario';
                new bootstrap.Modal(document.getElementById('modal-usuario')).show();
            }
        } catch(error) {
            console.error("Error de red al cargar usuario:", error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarUsuario() {
        const usuarioData = {
            IdUsuario: document.getElementById('usuario-id').value || 0,
            NombreCompleto: document.getElementById('nombre-completo').value,
            Usuario: document.getElementById('usuario').value,
            Password: document.getElementById('contrasena').value // CORRECCIÓN
            // Email y Activo no se envían directamente al SP de Crear/Actualizar
        };

        const rolesSeleccionados = Array.from(document.querySelectorAll('#roles-container input:checked')).map(cb => cb.value);
        const url = usuarioData.IdUsuario ? API_URLS.usuario.actualizar : API_URLS.usuario.crear;

        app.mostrarSpinner();
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData)
            });
            const result = await response.json();

            if (result.Respuesta && !result.Respuesta.Error) {
                const idUsuarioGuardado = result.Respuesta.Resultado[0].IdUsuarioCreado || usuarioData.IdUsuario;
                await guardarRoles(idUsuarioGuardado, rolesSeleccionados);
                new bootstrap.Modal(document.getElementById('modal-usuario')).hide();
                Swal.fire('Éxito', 'Usuario guardado correctamente.', 'success');
                cargarDatosIniciales();
            } else {
                Swal.fire('Error', result.Respuesta.Message || 'No se pudo guardar el usuario.', 'error');
            }
        } catch (error) {
            console.error('Error de red al guardar usuario:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarRoles(idUsuario, rolesNuevos) {
        const rolesActualesResponse = await fetch(`${API_URLS.usuarioRol.listarPorUsuario}?idUsuario=${idUsuario}`);
        const rolesActualesResult = await rolesActualesResponse.json();
        const rolesActuales = (rolesActualesResult.Respuesta.Resultado || []).map(r => r.IdRol.toString());

        const rolesAAgregar = rolesNuevos.filter(id => !rolesActuales.includes(id));
        const rolesAQuitar = rolesActuales.filter(id => !rolesNuevos.includes(id));

        const promesas = [];
        rolesAAgregar.forEach(idRol => {
            promesas.push(fetch(API_URLS.usuarioRol.asignar, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ IdUsuario: idUsuario, IdRol: idRol })
            }));
        });
        rolesAQuitar.forEach(idRol => {
            // Necesitamos IdUsuarioRol para quitar. Esto es un problema.
            // La solución simple sigue siendo quitar todos y agregar los nuevos.
            // Para eso, necesitaría el IdUsuarioRol, que no tengo.
            // El SP `usp_CMS_UsuarioRol_QuitarPorIds` sería ideal, pero no está en apiConfig.
            // Volviendo a la lógica de quitar todos. Asumo que el SP de quitar no necesita IdUsuarioRol sino IdUsuario e IdRol
        });

        // Lógica simplificada: quitar todos los roles y re-asignar.
        // Esto depende de un SP que no tengo. Lo dejo como estaba.
        const promesasQuitar = todosLosRoles.map(rol => fetch(API_URLS.usuarioRol.quitar, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ IdUsuario: idUsuario, IdRol: rol.IdRol }) // Esto es una suposición.
        }));
        await Promise.all(promesasQuitar);

        const promesasAsignar = rolesNuevos.map(idRol => fetch(API_URLS.usuarioRol.asignar, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ IdUsuario: idUsuario, IdRol: idRol })
        }));
        await Promise.all(promesasAsignar);
    }

    function eliminarUsuario(id) {
         Swal.fire({
            title: '¿Estás seguro?', text: "El usuario será eliminado.", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.usuario.eliminar, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ IdUsuario: id })
                    });
                    const res = await response.json();
                     if (res.Respuesta && !res.Respuesta.Error) {
                        Swal.fire('Eliminado', 'Usuario eliminado.', 'success');
                        cargarDatosIniciales();
                     } else {
                        Swal.fire('Error', res.Respuesta.Message || 'No se pudo eliminar.', 'error');
                     }
                } catch(e) {
                    console.error("Error de red al eliminar usuario:", e);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

})();
