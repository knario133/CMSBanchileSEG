(function () {
    'use strict';

    let tablaRoles;

    document.addEventListener('DOMContentLoaded', function () {

        const modalElement = document.getElementById('modal-rol');
        const modal = new bootstrap.Modal(modalElement);

        tablaRoles = $('#tabla-roles').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            columns: [
                { data: 'IdRol' },
                { data: 'NombreRol' },
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

        document.getElementById('btn-nuevo-rol').addEventListener('click', () => {
            document.getElementById('form-rol').reset();
            document.getElementById('rol-id').value = '';
            document.getElementById('modal-rol-label').textContent = 'Nuevo Rol';
            modal.show();
        });

        document.getElementById('btn-guardar-rol').addEventListener('click', guardarRol);

        $('#tabla-roles tbody').on('click', '.btn-editar', function () { abrirModalEditar($(this).data('id')); });
        $('#tabla-roles tbody').on('click', '.btn-eliminar', function () { eliminarRol($(this).data('id')); });
    });

    async function cargarRoles() {
        // ... (sin cambios de payload) ...
    }

    async function guardarRol() {
        if (!document.getElementById('nombre-rol').value.trim()) {
            Swal.fire('Campo requerido', 'El nombre del rol es obligatorio.', 'warning');
            return;
        }

        const rolData = {
            idRol: document.getElementById('rol-id').value || 0,
            nombreRol: document.getElementById('nombre-rol').value,
            descripcion: document.getElementById('descripcion-rol').value // CORRECCIÓN: Añadir
        };

        const url = rolData.idRol != 0 ? API_URLS.rol.actualizar : API_URLS.rol.crear;
        app.mostrarSpinner();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rolData)
            });
            const result = await response.json();

            if (result.Respuesta && !result.Respuesta.Error) {
                new bootstrap.Modal(document.getElementById('modal-rol')).hide();
                Swal.fire('Éxito', 'Rol guardado correctamente.', 'success');
                cargarRoles();
            } else {
                Swal.fire('Error', result.Respuesta.Message || 'No se pudo guardar el rol.', 'error');
            }
        } catch (error) {
            console.error('Error de red al guardar rol:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirModalEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await fetch(`${API_URLS.rol.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const rol = result.Respuesta.Resultado[0];
                document.getElementById('form-rol').reset();
                document.getElementById('rol-id').value = rol.IdRol;
                document.getElementById('nombre-rol').value = rol.NombreRol;
                document.getElementById('descripcion-rol').value = rol.Descripcion; // CORRECCIÓN: Añadir
                document.getElementById('modal-rol-label').textContent = 'Editar Rol';
                new bootstrap.Modal(document.getElementById('modal-rol')).show();
            } else {
                 Swal.fire('Error', result.Respuesta.Message || 'No se encontró el rol.', 'error');
            }
        } catch(error) {
            console.error('Error de red al obtener rol:', error);
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
                        body: JSON.stringify({ idRol: id }) // CORRECCIÓN
                    });
                    const res = await response.json();
                    if (res.Respuesta && !res.Respuesta.Error) {
                        Swal.fire('Eliminado', 'El rol ha sido eliminado.', 'success');
                        cargarRoles();
                    } else {
                        Swal.fire('Error', res.Respuesta.Message || 'No se pudo eliminar.', 'error');
                    }
                } catch(error) {
                    console.error('Error de red al eliminar rol:', error);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

    async function cargarRoles() {
        app.mostrarSpinner();
        try {
            const response = await fetch(API_URLS.rol.listar);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                tablaRoles.clear().rows.add(result.Respuesta.Resultado || []).draw();
            } else {
                Swal.fire('Error', 'No se pudieron cargar los roles.', 'error');
                console.error("Error handler roles:", result.Respuesta.Message);
            }
        } catch (error) {
            console.error('Error de red al cargar roles:', error);
        } finally {
            app.ocultarSpinner();
        }
    }
})();
