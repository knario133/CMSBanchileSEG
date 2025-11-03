(function () {
    'use strict';

    let tablaRoles;

    document.addEventListener('DOMContentLoaded', function () {

        const modalElement = document.getElementById('modal-rol');
        const modal = new bootstrap.Modal(modalElement);
        const modalLabel = document.getElementById('modal-rol-label');
        const formRol = document.getElementById('form-rol');
        const rolIdInput = document.getElementById('rol-id');
        const nombreRolInput = document.getElementById('nombre-rol');

        // Inicializar DataTable
        tablaRoles = $('#tabla-roles').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            columns: [
                { data: 'IdRol' },
                { data: 'Nombre' },
                {
                    data: 'IdRol',
                    render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `,
                    orderable: false
                }
            ]
        });

        cargarRoles();

        // --- Eventos ---
        document.getElementById('btn-nuevo-rol').addEventListener('click', () => {
            formRol.reset();
            rolIdInput.value = '';
            modalLabel.textContent = 'Nuevo Rol';
            modal.show();
        });

        document.getElementById('btn-guardar-rol').addEventListener('click', guardarRol);

        $('#tabla-roles tbody').on('click', '.btn-editar', function () {
            abrirModalEditar($(this).data('id'));
        });
        $('#tabla-roles tbody').on('click', '.btn-eliminar', function () {
            eliminarRol($(this).data('id'));
        });
    });

    async function cargarRoles() {
        app.mostrarSpinner();
        try {
            const response = await fetch(API_URLS.rol.listar);
            const result = await response.json();
            if (result.Success) {
                tablaRoles.clear().rows.add(result.Data || []).draw();
            } else {
                Swal.fire('Error', 'No se pudieron cargar los roles.', 'error');
            }
        } catch (error) {
            console.error('Error al cargar roles:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarRol() {
        if (!document.getElementById('nombre-rol').value.trim()) {
            Swal.fire('Campo requerido', 'El nombre del rol es obligatorio.', 'warning');
            return;
        }

        const rolData = {
            IdRol: document.getElementById('rol-id').value || 0,
            Nombre: document.getElementById('nombre-rol').value
        };

        const url = rolData.IdRol ? API_URLS.rol.actualizar : API_URLS.rol.crear;
        app.mostrarSpinner();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rolData)
            });
            const result = await response.json();

            if (result.Success) {
                document.getElementById('modal-rol').querySelector('.btn-close').click();
                Swal.fire('Éxito', 'Rol guardado correctamente.', 'success');
                cargarRoles();
            } else {
                Swal.fire('Error', result.Message || 'No se pudo guardar el rol.', 'error');
            }
        } catch (error) {
            console.error('Error al guardar rol:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirModalEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await fetch(`${API_URLS.rol.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Success && result.Data) {
                const rol = result.Data;
                document.getElementById('form-rol').reset();
                document.getElementById('rol-id').value = rol.IdRol;
                document.getElementById('nombre-rol').value = rol.Nombre;
                document.getElementById('modal-rol-label').textContent = 'Editar Rol';
                new bootstrap.Modal(document.getElementById('modal-rol')).show();
            }
        } catch(error) {
            console.error('Error al obtener rol:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    function eliminarRol(id) {
        Swal.fire({
            title: '¿Estás seguro?', text: "Eliminar un rol puede afectar a los usuarios asignados.", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.rol.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ IdRol: id })
                    });
                    const res = await response.json();
                    if (res.Success) {
                        Swal.fire('Eliminado', 'El rol ha sido eliminado.', 'success');
                        cargarRoles();
                    } else {
                        Swal.fire('Error', res.Message || 'No se pudo eliminar.', 'error');
                    }
                } catch(error) {
                    console.error('Error al eliminar rol:', error);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

})();
