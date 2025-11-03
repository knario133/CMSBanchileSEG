(function () {
    'use strict';

    let tablaRoles;
    let modal;
    let modalLabel;
    let formRol;
    let rolIdInput;
    let nombreRolInput;
    let descripcionInput;

    document.addEventListener('DOMContentLoaded', function () {
        const modalElement = document.getElementById('modal-rol');
        modal = new bootstrap.Modal(modalElement);
        modalLabel = document.getElementById('modal-rol-label');
        formRol = document.getElementById('form-rol');
        rolIdInput = document.getElementById('rol-id');
        nombreRolInput = document.getElementById('nombre-rol');
        descripcionInput = document.getElementById('descripcion-rol');

        tablaRoles = $('#tabla-roles').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            columns: [
                { data: 'IdRol' },
                { data: 'NombreRol' },
                {
                    data: 'IdRol',
                    orderable: false,
                    render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `
                }
            ]
        });

        cargarRoles();

        document.getElementById('btn-nuevo-rol').addEventListener('click', () => {
            formRol.reset();
            rolIdInput.value = '';
            modalLabel.textContent = 'Nuevo Rol';
            modal.show();
        });

        document.getElementById('btn-guardar-rol').addEventListener('click', guardarRol);

        $('#tabla-roles tbody').on('click', '.btn-editar', function () {
            const id = $(this).data('id');
            abrirModalEditar(id);
        });

        $('#tabla-roles tbody').on('click', '.btn-eliminar', function () {
            const id = $(this).data('id');
            eliminarRol(id);
        });
    });

    async function cargarRoles() {
        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Roles - Listar', API_URLS.rol.listar);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                tablaRoles.clear().rows.add(result.Respuesta.Resultado || []).draw();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudieron cargar los roles.', 'error');
            }
        } catch (error) {
            app.logException('Roles - cargarRoles', error);
            Swal.fire('Error', 'Ocurrió un problema al cargar los roles.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarRol() {
        if (!nombreRolInput.value.trim()) {
            Swal.fire('Campo requerido', 'El nombre del rol es obligatorio.', 'warning');
            return;
        }

        const rolData = {
            idRol: rolIdInput.value || 0,
            nombreRol: nombreRolInput.value,
            descripcion: descripcionInput.value || ''
        };

        const url = rolData.idRol && Number(rolData.idRol) !== 0 ? API_URLS.rol.actualizar : API_URLS.rol.crear;

        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Roles - Guardar', url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rolData)
            });
            const result = await response.json();

            if (result.Respuesta && !result.Respuesta.Error) {
                modal.hide();
                Swal.fire('Éxito', 'Rol guardado correctamente.', 'success');
                cargarRoles();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo guardar el rol.', 'error');
            }
        } catch (error) {
            app.logException('Roles - guardarRol', error);
            Swal.fire('Error', 'Ocurrió un problema al guardar el rol.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirModalEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Roles - Obtener', `${API_URLS.rol.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const rol = (result.Respuesta.Resultado || [])[0];
                if (!rol) {
                    Swal.fire('Advertencia', 'No se encontró la información del rol.', 'warning');
                    return;
                }
                formRol.reset();
                rolIdInput.value = rol.IdRol;
                nombreRolInput.value = rol.NombreRol;
                descripcionInput.value = rol.Descripcion || '';
                modalLabel.textContent = 'Editar Rol';
                modal.show();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo obtener el rol.', 'error');
            }
        } catch (error) {
            app.logException('Roles - abrirModalEditar', error);
            Swal.fire('Error', 'Ocurrió un problema al obtener el rol.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function eliminarRol(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Eliminar un rol puede afectar a los usuarios asignados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }

            app.mostrarSpinner();
            try {
                const response = await app.apiFetch('Roles - Eliminar', API_URLS.rol.eliminar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idRol: id })
                });
                const res = await response.json();

                if (res.Respuesta && !res.Respuesta.Error) {
                    Swal.fire('Eliminado', 'El rol ha sido eliminado.', 'success');
                    cargarRoles();
                } else {
                    Swal.fire('Error', res.Respuesta?.Message || 'No se pudo eliminar el rol.', 'error');
                }
            } catch (error) {
                app.logException('Roles - eliminarRol', error);
                Swal.fire('Error', 'Ocurrió un problema al eliminar el rol.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        });
    }
})();
