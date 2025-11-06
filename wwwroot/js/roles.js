(function (window) {
    'use strict';

    if (!window.apiService || !window.API_URLS || !window.app || !window.$ || !window.bootstrap) {
        console.error('Dependencias requeridas no disponibles (apiService, API_URLS, app, jQuery o Bootstrap).');
        return;
    }

    let tablaRoles;
    let modalInstance;
    let modalElement;
    let formElement;
    let idInput;
    let nombreInput;
    let descripcionInput;

    document.addEventListener('DOMContentLoaded', () => {
        const tablaElement = document.getElementById('tabla-roles');
        const btnNuevoRol = document.getElementById('btn-nuevo-rol');
        const btnGuardarRol = document.getElementById('btn-guardar-rol');

        modalElement = document.getElementById('modal-rol');
        formElement = document.getElementById('form-rol');
        idInput = document.getElementById('rol-id');
        nombreInput = document.getElementById('nombre-rol');
        descripcionInput = document.getElementById('descripcion-rol');

        const elementosFaltantes = [
            ['#tabla-roles', tablaElement],
            ['#modal-rol', modalElement],
            ['#form-rol', formElement],
            ['#rol-id', idInput],
            ['#nombre-rol', nombreInput],
            ['#descripcion-rol', descripcionInput]
        ].filter(([, element]) => !element).map(([selector]) => selector);

        if (elementosFaltantes.length > 0) {
            console.warn('No se encontraron los siguientes elementos requeridos:', elementosFaltantes.join(', '));
            return;
        }

        modalInstance = new bootstrap.Modal(modalElement);

        tablaRoles = window.$('#tabla-roles').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            autoWidth: false,
            columns: [
                { data: 'IdRol' },
                { data: 'NombreRol' },
                {
                    data: 'Descripcion',
                    render: (data) => data ? window.$('<div>').text(data).html() : ''
                },
                {
                    data: 'IdRol',
                    orderable: false,
                    render: (data) => {
                        const id = Number.parseInt(data, 10);
                        if (Number.isNaN(id)) {
                            return '';
                        }
                        return `
                            <div class="btn-group" role="group" aria-label="Acciones">
                                <button type="button" class="btn btn-sm btn-outline-primary btn-editar" data-id="${id}">
                                    <i class="fas fa-edit me-1"></i>Editar
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${id}">
                                    <i class="fas fa-trash me-1"></i>Eliminar
                                </button>
                            </div>`;
                    }
                }
            ]
        });

        cargarRoles();

        if (btnNuevoRol) {
            btnNuevoRol.addEventListener('click', abrirModalNuevo);
        }
        if (btnGuardarRol) {
            btnGuardarRol.addEventListener('click', guardarRol);
        }

        window.$('#tabla-roles tbody').on('click', '.btn-editar', function () {
            const id = Number.parseInt(window.$(this).data('id'), 10);
            if (!Number.isNaN(id)) {
                abrirModalEditar(id);
            }
        });

        window.$('#tabla-roles tbody').on('click', '.btn-eliminar', function () {
            const id = Number.parseInt(window.$(this).data('id'), 10);
            if (!Number.isNaN(id)) {
                eliminarRol(id);
            }
        });
    });

    async function cargarRoles() {
        window.app.mostrarSpinner();
        try {
            const roles = await window.apiService.post(window.API_URLS.rol.listar, {});
            const datos = Array.isArray(roles) ? roles : [];
            tablaRoles.clear().rows.add(datos).draw();
        } catch (error) {
            console.error('Error al cargar roles:', error);
            Swal.fire('Error', `No se pudieron cargar los roles. ${error.message}`, 'error');
        } finally {
            window.app.ocultarSpinner();
        }
    }

    function abrirModalNuevo() {
        formElement.reset();
        idInput.value = '';
        modalElement.querySelector('#modal-rol-label').textContent = 'Nuevo Rol';
        modalInstance.show();
    }

    async function abrirModalEditar(idRol) {
        window.app.mostrarSpinner();
        try {
            const respuesta = await window.apiService.post(window.API_URLS.rol.obtenerPorId, { idRol });
            const rol = Array.isArray(respuesta) ? respuesta[0] : null;
            if (!rol) {
                Swal.fire('No encontrado', 'No se encontró el rol solicitado.', 'warning');
                return;
            }

            idInput.value = rol.IdRol || '';
            nombreInput.value = rol.NombreRol || '';
            descripcionInput.value = rol.Descripcion || '';

            modalElement.querySelector('#modal-rol-label').textContent = 'Editar Rol';
            modalInstance.show();
        } catch (error) {
            console.error('Error al obtener rol:', error);
            Swal.fire('Error', `No se pudo cargar el rol seleccionado. ${error.message}`, 'error');
        } finally {
            window.app.ocultarSpinner();
        }
    }

    async function guardarRol() {
        const nombre = nombreInput.value.trim();
        if (!nombre) {
            Swal.fire('Campo requerido', 'El nombre del rol es obligatorio.', 'warning');
            return;
        }

        const idRol = Number.parseInt(idInput.value, 10) || 0;
        const payload = {
            idRol,
            nombreRol: nombre,
            descripcion: descripcionInput.value || ''
        };

        const url = idRol !== 0 ? window.API_URLS.rol.actualizar : window.API_URLS.rol.crear;

        window.app.mostrarSpinner();
        try {
            await window.apiService.post(url, payload);
            Swal.fire('Éxito', 'El rol se guardó correctamente.', 'success');
            modalInstance.hide();
            await cargarRoles();
        } catch (error) {
            console.error('Error al guardar rol:', error);
            Swal.fire('Error', `No se pudo guardar el rol. ${error.message}`, 'error');
        } finally {
            window.app.ocultarSpinner();
        }
    }

    function eliminarRol(idRol) {
        Swal.fire({
            title: '¿Eliminar rol?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }

            window.app.mostrarSpinner();
            try {
                await window.apiService.post(window.API_URLS.rol.eliminar, { idRol });
                Swal.fire('Eliminado', 'El rol se eliminó correctamente.', 'success');
                await cargarRoles();
            } catch (error) {
                console.error('Error al eliminar rol:', error);
                Swal.fire('Error', `No se pudo eliminar el rol. ${error.message}`, 'error');
            } finally {
                window.app.ocultarSpinner();
            }
        });
    }
})(window);
