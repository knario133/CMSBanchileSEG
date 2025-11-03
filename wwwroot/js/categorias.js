(function () {
    'use strict';

    let tablaCategorias;
    let todasLasCategorias = [];
    let modal;
    let modalLabel;
    let formCategoria;
    let categoriaIdInput;
    let nombreCategoriaInput;
    let descripcionCategoriaInput;
    let categoriaPadreSelect;

    document.addEventListener('DOMContentLoaded', function () {
        const modalElement = document.getElementById('modal-categoria');
        modal = new bootstrap.Modal(modalElement);
        modalLabel = document.getElementById('modal-categoria-label');
        formCategoria = document.getElementById('form-categoria');
        categoriaIdInput = document.getElementById('categoria-id');
        nombreCategoriaInput = document.getElementById('nombre-categoria');
        descripcionCategoriaInput = document.getElementById('descripcion-categoria');
        categoriaPadreSelect = document.getElementById('categoria-padre');

        tablaCategorias = $('#tabla-categorias').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            columns: [
                { data: 'IdCategoria' },
                { data: 'Nombre' },
                {
                    data: 'IdCategoriaPadre',
                    render: function (data) {
                        if (!data) {
                            return '<em>Sin padre</em>';
                        }
                        const padre = todasLasCategorias.find(c => c.IdCategoria === data);
                        return padre ? padre.Nombre : '<em>Desconocido</em>';
                    }
                },
                {
                    data: 'IdCategoria',
                    orderable: false,
                    render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `
                }
            ]
        });

        cargarCategorias();

        document.getElementById('btn-nueva-categoria').addEventListener('click', () => {
            formCategoria.reset();
            categoriaIdInput.value = '';
            modalLabel.textContent = 'Nueva Categoría';
            actualizarSelectPadre();
            modal.show();
        });

        document.getElementById('btn-guardar-categoria').addEventListener('click', guardarCategoria);

        $('#tabla-categorias tbody').on('click', '.btn-editar', function () {
            const id = $(this).data('id');
            abrirModalParaEditar(id);
        });

        $('#tabla-categorias tbody').on('click', '.btn-eliminar', function () {
            const id = $(this).data('id');
            eliminarCategoria(id);
        });
    });

    async function cargarCategorias() {
        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Categorías - Listar', API_URLS.categoria.listar);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                todasLasCategorias = result.Respuesta.Resultado || [];
                tablaCategorias.clear().rows.add(todasLasCategorias).draw();
                actualizarSelectPadre();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudieron cargar las categorías.', 'error');
            }
        } catch (error) {
            app.logException('Categorías - cargarCategorias', error);
            Swal.fire('Error', 'Ocurrió un problema al cargar las categorías.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function actualizarSelectPadre(idExcluir = null) {
        if (!categoriaPadreSelect) {
            return;
        }
        categoriaPadreSelect.innerHTML = '<option value="">-- Sin categoría padre --</option>';
        todasLasCategorias.forEach(cat => {
            if (cat.IdCategoria !== idExcluir) {
                const option = document.createElement('option');
                option.value = cat.IdCategoria;
                option.textContent = cat.Nombre;
                categoriaPadreSelect.appendChild(option);
            }
        });
    }

    async function guardarCategoria() {
        if (!nombreCategoriaInput.value.trim()) {
            Swal.fire('Campo requerido', 'El nombre de la categoría es obligatorio.', 'warning');
            return;
        }

        const categoriaData = {
            idCategoria: categoriaIdInput.value || 0,
            nombre: nombreCategoriaInput.value,
            descripcion: descripcionCategoriaInput ? descripcionCategoriaInput.value : '',
            idCategoriaPadre: categoriaPadreSelect.value ? Number(categoriaPadreSelect.value) : 0
        };

        const url = categoriaData.idCategoria && Number(categoriaData.idCategoria) !== 0
            ? API_URLS.categoria.actualizar
            : API_URLS.categoria.crear;

        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Categorías - Guardar', url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoriaData)
            });
            const result = await response.json();

            if (result.Respuesta && !result.Respuesta.Error) {
                modal.hide();
                Swal.fire('Éxito', 'Categoría guardada correctamente.', 'success');
                cargarCategorias();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo guardar la categoría.', 'error');
            }
        } catch (error) {
            app.logException('Categorías - guardarCategoria', error);
            Swal.fire('Error', 'Ocurrió un problema al guardar la categoría.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirModalParaEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Categorías - Obtener', `${API_URLS.categoria.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const categoria = result.Respuesta.Resultado[0];
                if (!categoria) {
                    Swal.fire('Advertencia', 'No se encontró la categoría solicitada.', 'warning');
                    return;
                }
                formCategoria.reset();
                categoriaIdInput.value = categoria.IdCategoria;
                nombreCategoriaInput.value = categoria.Nombre;
                if (descripcionCategoriaInput) {
                    descripcionCategoriaInput.value = categoria.Descripcion || '';
                }
                actualizarSelectPadre(categoria.IdCategoria);
                categoriaPadreSelect.value = categoria.IdCategoriaPadre || '';
                modalLabel.textContent = 'Editar Categoría';
                modal.show();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo obtener la categoría.', 'error');
            }
        } catch (error) {
            app.logException('Categorías - abrirModalParaEditar', error);
            Swal.fire('Error', 'Ocurrió un problema al obtener la categoría.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function eliminarCategoria(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción.',
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
                const response = await app.apiFetch('Categorías - Eliminar', API_URLS.categoria.eliminar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idCategoria: id })
                });
                const res = await response.json();

                if (res.Respuesta && !res.Respuesta.Error) {
                    Swal.fire('Eliminada', 'La categoría ha sido eliminada.', 'success');
                    cargarCategorias();
                } else {
                    Swal.fire('Error', res.Respuesta?.Message || 'No se pudo eliminar la categoría.', 'error');
                }
            } catch (error) {
                app.logException('Categorías - eliminarCategoria', error);
                Swal.fire('Error', 'Ocurrió un problema al eliminar la categoría.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        });
    }
})();
