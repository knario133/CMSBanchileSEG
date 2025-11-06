/**
 * @file usuarios.js
 * @description Manages the user administration page, including listing, creating,
 * updating, and deleting users. It uses DataTables for displaying user data and
 * interacts with the backend via the centralized `apiService`.
 */
(function(window) {
    'use strict';

    // Ensure necessary services are available
    if (!window.apiService || !window.API_URLS || !window.app) {
        console.error('Dependencies (apiService, API_URLS, app) are not loaded!');
        return;
    }

    let tablaUsuarios;
    let todosLosRoles = [];

    /**
     * Initializes the page elements and event listeners once the DOM is fully loaded.
     */
    document.addEventListener('DOMContentLoaded', function() {
        // DataTable initialization
        tablaUsuarios = $('#tabla-usuarios').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            columns: [
                { data: 'IdUsuario' },
                { data: 'Usuario' },
                { data: 'NombreCompleto' },
                {
                    data: 'Activo',
                    render: data => data ? '<span class="badge bg-success">Sí</span>' : '<span class="badge bg-danger">No</span>'
                },
                {
                    data: 'IdUsuario',
                    render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>`,
                    orderable: false
                }
            ],
            responsive: true,
            autoWidth: false
        });

        // Initial data loading
        cargarDatosIniciales();

        // Event listeners
        document.getElementById('btn-nuevo-usuario').addEventListener('click', abrirModalNuevo);
        document.getElementById('btn-guardar-usuario').addEventListener('click', guardarUsuario);

        $('#tabla-usuarios tbody').on('click', '.btn-editar', function() {
            abrirModalEditar($(this).data('id'));
        });
        $('#tabla-usuarios tbody').on('click', '.btn-eliminar', function() {
            eliminarUsuario($(this).data('id'));
        });
    });

    /**
     * Loads initial data for roles and users from the server.
     */
    async function cargarDatosIniciales() {
        app.mostrarSpinner();
        try {
            const [roles, usuarios] = await Promise.all([
                apiService.get(API_URLS.rol.listar),
                apiService.get(API_URLS.usuario.listar)
            ]);

            todosLosRoles = roles || [];
            renderizarCheckboxesRoles();

            tablaUsuarios.clear().rows.add(usuarios || []).draw();

        } catch (error) {
            Swal.fire('Error', `No se pudieron cargar los datos iniciales. ${error.message}`, 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    /**
     * Renders the role checkboxes in the modal.
     */
    function renderizarCheckboxesRoles() {
        const container = document.getElementById('roles-container');
        container.innerHTML = todosLosRoles.map(rol => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${rol.IdRol}" id="rol-${rol.IdRol}" name="roles">
                <label class="form-check-label" for="rol-${rol.IdRol}">${rol.NombreRol}</label>
            </div>`).join('');
    }

    /**
     * Opens the modal to create a new user.
     */
    function abrirModalNuevo() {
        document.getElementById('form-usuario').reset();
        document.getElementById('usuario-id').value = '';
        document.getElementById('contrasena-group').style.display = 'block';
        document.getElementById('contrasena').placeholder = 'Ingrese contraseña';
        document.getElementById('modal-usuario-label').textContent = 'Nuevo Usuario';
        document.getElementById('activo').checked = true;
        document.querySelectorAll('#roles-container input').forEach(cb => cb.checked = false);
        new bootstrap.Modal(document.getElementById('modal-usuario')).show();
    }

    /**
     * Opens the modal to edit an existing user.
     * @param {number} id - The ID of the user to edit.
     */
    async function abrirModalEditar(id) {
        app.mostrarSpinner();
        try {
            const [userData, rolesData] = await Promise.all([
                apiService.get(`${API_URLS.usuario.obtenerPorId}?id=${id}`),
                apiService.get(`${API_URLS.usuarioRol.listarPorUsuario}?idUsuario=${id}`)
            ]);

            const user = userData[0];
            if (user) {
                document.getElementById('form-usuario').reset();
                document.getElementById('usuario-id').value = user.IdUsuario;
                document.getElementById('usuario').value = user.Usuario;
                document.getElementById('nombre-completo').value = user.NombreCompleto;
                document.getElementById('email').value = user.Email;
                document.getElementById('activo').checked = user.Activo;
                document.getElementById('contrasena-group').style.display = 'block';
                document.getElementById('contrasena').placeholder = 'Dejar en blanco para no cambiar';
                document.getElementById('contrasena').value = '';

                const rolesDeUsuario = rolesData || [];
                document.querySelectorAll('#roles-container input').forEach(cb => {
                    cb.checked = rolesDeUsuario.some(rol => rol.IdRol == cb.value);
                });

                document.getElementById('modal-usuario-label').textContent = 'Editar Usuario';
                new bootstrap.Modal(document.getElementById('modal-usuario')).show();
            }
        } catch (error) {
            Swal.fire('Error', `No se pudo cargar el usuario. ${error.message}`, 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    /**
     * Saves a new or existing user to the database.
     */
    async function guardarUsuario() {
        const idUsuario = document.getElementById('usuario-id').value || 0;
        const password = document.getElementById('contrasena').value;

        // Basic validation
        if (!document.getElementById('usuario').value.trim() || !document.getElementById('nombre-completo').value.trim()) {
            Swal.fire('Atención', 'El usuario y el nombre son obligatorios.', 'warning');
            return;
        }
        if (idUsuario == 0 && !password) {
            Swal.fire('Atención', 'La contraseña es obligatoria para nuevos usuarios.', 'warning');
            return;
        }

        const usuarioData = {
            idUsuario: idUsuario,
            nombreCompleto: document.getElementById('nombre-completo').value,
            usuario: document.getElementById('usuario').value,
            email: document.getElementById('email').value,
            activo: document.getElementById('activo').checked,
            password: password // Send password only if it's entered
        };

        const url = idUsuario != 0 ? API_URLS.usuario.actualizar : API_URLS.usuario.crear;

        app.mostrarSpinner();
        try {
            const result = await apiService.post(url, usuarioData);
            const idUsuarioGuardado = result[0].IdUsuarioCreado || idUsuario;

            const rolesSeleccionados = Array.from(document.querySelectorAll('#roles-container input:checked')).map(cb => cb.value);
            await guardarRoles(idUsuarioGuardado, rolesSeleccionados);

            const modal = bootstrap.Modal.getInstance(document.getElementById('modal-usuario'));
            if (modal) modal.hide();

            Swal.fire('Éxito', 'Usuario guardado correctamente.', 'success');
            cargarDatosIniciales(); // Refresh data

        } catch (error) {
            Swal.fire('Error', `No se pudo guardar el usuario. ${error.message}`, 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    /**
     * Manages role assignments for a user.
     * @param {number} idUsuario - The user's ID.
     * @param {string[]} rolesNuevos - Array of new role IDs.
     */
    async function guardarRoles(idUsuario, rolesNuevos) {
        try {
            const rolesActualesData = await apiService.get(`${API_URLS.usuarioRol.listarPorUsuario}?idUsuario=${idUsuario}`);
            const rolesActuales = (rolesActualesData || []).map(r => r.IdRol.toString());

            const rolesAAgregar = rolesNuevos.filter(id => !rolesActuales.includes(id));
            const rolesAQuitar = rolesActuales.filter(id => !rolesNuevos.includes(id));

            const promesas = [];
            rolesAAgregar.forEach(idRol => {
                promesas.push(apiService.post(API_URLS.usuarioRol.asignar, { idUsuario: idUsuario, idRol: idRol }));
            });
            rolesAQuitar.forEach(idRol => {
                promesas.push(apiService.post(API_URLS.usuarioRol.quitarPorIds, { idUsuario: idUsuario, idRol: idRol }));
            });

            await Promise.all(promesas);
        } catch (error) {
             // We show the error in the console, but we don't interrupt the flow for the user.
             // The main operation (user creation/update) was successful.
            console.error('Error al guardar roles:', error);
            Swal.fire('Advertencia', 'El usuario se guardó, pero hubo un problema al asignar los roles.', 'warning');
        }
    }

    /**
     * Deletes a user after confirmation.
     * @param {number} id - The ID of the user to delete.
     */
    function eliminarUsuario(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "El usuario será eliminado permanentemente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    await apiService.post(API_URLS.usuario.eliminar, { idUsuario: id });
                    Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
                    cargarDatosIniciales(); // Refresh data
                } catch (error) {
                    Swal.fire('Error', `No se pudo eliminar el usuario. ${error.message}`, 'error');
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

})(window);
