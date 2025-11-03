(function () {
    'use strict';

    let tablaCategorias;
    let todasLasCategorias = [];

    document.addEventListener('DOMContentLoaded', function () {

        const modalElement = document.getElementById('modal-categoria');
        const modal = new bootstrap.Modal(modalElement);

        tablaCategorias = $('#tabla-categorias').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            columns: [
                { data: 'IdCategoria' }, { data: 'Nombre' },
                {
                    data: 'IdCategoriaPadre',
                    render: (data) => (todasLasCategorias.find(c => c.IdCategoria === data) || {}).Nombre || '<em>Ninguna</em>'
                },
                {
                    data: 'IdCategoria',
                    render: (data) => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `,
                    orderable: false
                }
            ]
        });

        cargarCategorias();

        document.getElementById('btn-nueva-categoria').addEventListener('click', function () {
            document.getElementById('form-categoria').reset();
            document.getElementById('categoria-id').value = '';
            document.getElementById('modal-categoria-label').textContent = 'Nueva Categoría';
            actualizarSelectPadre();
            modal.show();
        });

        document.getElementById('btn-guardar-categoria').addEventListener('click', guardarCategoria);

        $('#tabla-categorias tbody').on('click', '.btn-editar', function () { abrirModalParaEditar($(this).data('id')); });
        $('#tabla-categorias tbody').on('click', '.btn-eliminar', function () { eliminarCategoria($(this).data('id')); });
    });

    async function cargarCategorias() {
        app.mostrarSpinner();
        try {
            const response = await fetch(API_URLS.categoria.listar);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                todasLasCategorias = result.Respuesta.Resultado || [];
                tablaCategorias.clear().rows.add(todasLasCategorias).draw();
                actualizarSelectPadre();
            } else {
                Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error');
                console.error('Error del handler de categorías:', result.Respuesta.Message);
            }
        } catch (error) {
            console.error('Error de red al cargar categorías:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function guardarCategoria() {
        if (!document.getElementById('nombre-categoria').value.trim()) {
            Swal.fire('Campo requerido', 'El nombre de la categoría es obligatorio.', 'warning');
            return;
        }

        const categoriaData = {
            idCategoria: document.getElementById('categoria-id').value || 0,
            nombre: document.getElementById('nombre-categoria').value,
            descripcion: document.getElementById('descripcion-categoria').value, // CORRECCIÓN: Añadir
            idCategoriaPadre: document.getElementById('categoria-padre').value || null
        };

        const url = categoriaData.idCategoria != 0 ? API_URLS.categoria.actualizar : API_URLS.categoria.crear;
        app.mostrarSpinner();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoriaData)
            });
            const result = await response.json();

            if (result.Respuesta && !result.Respuesta.Error) {
                new bootstrap.Modal(document.getElementById('modal-categoria')).hide();
                Swal.fire('Éxito', 'Categoría guardada correctamente.', 'success');
                cargarCategorias();
            } else {
                Swal.fire('Error', result.Respuesta.Message || 'No se pudo guardar la categoría.', 'error');
            }
        } catch (error) {
            console.error('Error de red al guardar categoría:', error);
            Swal.fire('Error', 'Ocurrió un problema de conexión.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirModalParaEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await fetch(`${API_URLS.categoria.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const cat = result.Respuesta.Resultado[0];
                document.getElementById('form-categoria').reset();
                document.getElementById('categoria-id').value = cat.IdCategoria;
                document.getElementById('nombre-categoria').value = cat.Nombre;
                document.getElementById('descripcion-categoria').value = cat.Descripcion; // CORRECCIÓN: Añadir
                actualizarSelectPadre(cat.IdCategoria);
                document.getElementById('categoria-padre').value = cat.IdCategoriaPadre || '';
                document.getElementById('modal-categoria-label').textContent = 'Editar Categoría';
                new bootstrap.Modal(document.getElementById('modal-categoria')).show();
            } else {
                Swal.fire('Error', result.Respuesta.Message || 'No se encontró la categoría.', 'error');
            }
        } catch (error) {
            console.error('Error de red al obtener categoría:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    function eliminarCategoria(id) {
        Swal.fire({
            title: '¿Estás seguro?', text: "No podrás revertir esta acción.", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sí, eliminar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.categoria.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idCategoria: id }) // CORRECCIÓN
                    });
                    const res = await response.json();
                    if (res.Respuesta && !res.Respuesta.Error) {
                        Swal.fire('Eliminada', 'La categoría ha sido eliminada.', 'success');
                        cargarCategorias();
                    } else {
                        Swal.fire('Error', res.Respuesta.Message || 'No se pudo eliminar la categoría.', 'error');
                    }
                } catch (error) {
                    console.error('Error de red al eliminar categoría:', error);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

    function actualizarSelectPadre(idExcluir = null) {
        const select = document.getElementById('categoria-padre');
        select.innerHTML = '<option value="">-- Sin categoría padre --</option>';
        todasLasCategorias.forEach(cat => {
            if (cat.IdCategoria !== idExcluir) {
                select.add(new Option(cat.Nombre, cat.IdCategoria));
            }
        });
    }

})();
