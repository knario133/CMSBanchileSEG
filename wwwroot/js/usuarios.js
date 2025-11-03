(function () {
    'use strict';

    let tablaUsuarios;
    let todosLosRoles = [];

    document.addEventListener('DOMContentLoaded', function () {

        const modalElement = document.getElementById('modal-usuario');
        const modal = new bootstrap.Modal(modalElement);
        const modalLabel = document.getElementById('modal-usuario-label');
        const formUsuario = document.getElementById('form-usuario');
        const rolesContainer = document.getElementById('roles-container');

        // Inputs del formulario
        const usuarioIdInput = document.getElementById('usuario-id');
        const usuarioInput = document.getElementById('usuario');
        const nombreCompletoInput = document.getElementById('nombre-completo');
        const emailInput = document.getElementById('email');
        const contrasenaInput = document.getElementById('contrasena');
        const activoCheckbox = document.getElementById('activo');

        // Inicializar DataTable
        tablaUsuarios = $('#tabla-usuarios').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            columns: [
                { data: 'IdUsuario' },
                { data: 'Usuario' },
                { data: 'NombreCompleto' },
                { data: 'Email' },
                {
                    data: 'Activo',
                    render: data => data ? '<span class="badge bg-success">Sí</span>' : '<span class="badge bg-danger">No</span>'
                },
                {
                    data: 'IdUsuario',
                    render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `,
                    orderable: false
                }
            ]
        });

        cargarDatosIniciales();

        // --- Eventos ---
        document.getElementById('btn-nuevo-usuario').addEventListener('click', abrirModalNuevo);
        document.getElementById('btn-guardar-usuario').addEventListener('click', guardarUsuario);

        $('#tabla-usuarios tbody').on('click', '.btn-editar', function () {
            abrirModalEditar($(this).data('id'));
        });
        $('#tabla-usuarios tbody').on('click', '.btn-eliminar', function () {
            eliminarUsuario($(this).data('id'));
        });

    });

    // --- Funciones ---
    async function cargarDatosIniciales() {
        app.mostrarSpinner();
        try {
            // Cargar roles y usuarios en paralelo
            const [resRoles, resUsuarios] = await Promise.all([
                fetch(API_URLS.rol.listar),
                fetch(API_URLS.usuario.listar)
            ]);

            const rolesResult = await resRoles.json();
            if (rolesResult.Success) {
                todosLosRoles = rolesResult.Data || [];
                renderizarCheckboxesRoles();
            }

            const usuariosResult = await resUsuarios.json();
            if (usuariosResult.Success) {
                tablaUsuarios.clear().rows.add(usuariosResult.Data || []).draw();
            }

        } catch (error) {
            console.error('Error cargando datos:', error);
            Swal.fire('Error', 'No se pudieron cargar los datos iniciales.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function renderizarCheckboxesRoles() {
        rolesContainer.innerHTML = '';
        todosLosRoles.forEach(rol => {
            rolesContainer.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${rol.IdRol}" id="rol-${rol.IdRol}">
                    <label class="form-check-label" for="rol-${rol.IdRol}">${rol.Nombre}</label>
                </div>
            `;
        });
    }

    function abrirModalNuevo() {
        formUsuario.reset();
        usuarioIdInput.value = '';
        contrasenaInput.placeholder = 'Ingrese contraseña';
        modalLabel.textContent = 'Nuevo Usuario';
        activoCheckbox.checked = true;
        // Desmarcar todos los roles
        rolesContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        modal.show();
    }

    async function abrirModalEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await fetch(`${API_URLS.usuario.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Success && result.Data) {
                const data = result.Data;
                formUsuario.reset();
                usuarioIdInput.value = data.IdUsuario;
                usuarioInput.value = data.Usuario;
                nombreCompletoInput.value = data.NombreCompleto;
                emailInput.value = data.Email;
                activoCheckbox.checked = data.Activo;
                contrasenaInput.placeholder = 'Dejar en blanco para no cambiar';

                // Marcar los roles del usuario
                rolesContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                    cb.checked = data.Roles.some(rol => rol.IdRol == cb.value);
                });

                modalLabel.textContent = 'Editar Usuario';
                modal.show();
            }
        } catch(error) {
            console.error("Error al cargar usuario", error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarUsuario() {
        const usuarioData = {
            IdUsuario: usuarioIdInput.value || 0,
            Usuario: usuarioInput.value,
            NombreCompleto: nombreCompletoInput.value,
            Email: emailInput.value,
            Contrasena: contrasenaInput.value, // Enviar vacía si no se cambia
            Activo: activoCheckbox.checked
        };

        const rolesSeleccionados = Array.from(rolesContainer.querySelectorAll('input:checked')).map(cb => cb.value);

        const url = usuarioData.IdUsuario ? API_URLS.usuario.actualizar : API_URLS.usuario.crear;
        app.mostrarSpinner();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData)
            });
            const result = await response.json();

            if (result.Success) {
                const idUsuarioGuardado = result.Data.IdUsuario;
                await guardarRoles(idUsuarioGuardado, rolesSeleccionados);
                modal.hide();
                Swal.fire('Éxito', 'Usuario guardado correctamente.', 'success');
                cargarDatosIniciales();
            } else {
                Swal.fire('Error', result.Message || 'No se pudo guardar el usuario.', 'error');
            }
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarRoles(idUsuario, rolesNuevos) {
        // Esta función es más compleja: debe comparar roles actuales con nuevos y llamar a 'asignar' y 'quitar'
        // Por simplicidad, aquí quitamos todos y asignamos los nuevos. En una app real, esto podría optimizarse.

        // 1. Quitar todos los roles (simplificación)
         for (const rol of todosLosRoles) {
             await fetch(API_URLS.usuarioRol.quitar, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ IdUsuario: idUsuario, IdRol: rol.IdRol })
            });
         }

        // 2. Asignar los roles seleccionados
        for (const idRol of rolesNuevos) {
             await fetch(API_URLS.usuarioRol.asignar, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ IdUsuario: idUsuario, IdRol: idRol })
            });
        }
    }

    function eliminarUsuario(id) {
         Swal.fire({
            title: '¿Estás seguro?', text: "El usuario será eliminado.", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    await fetch(API_URLS.usuario.eliminar, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ IdUsuario: id })
                    });
                    Swal.fire('Eliminado', 'Usuario eliminado.', 'success');
                    cargarDatosIniciales();
                } catch(e) {
                    console.error("Error al eliminar", e);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

})();
