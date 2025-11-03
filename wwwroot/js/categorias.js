(function () {
    'use strict';

    let tablaCategorias;
    let todasLasCategorias = []; // Almacenar todas las categorías para buscar nombres de padres

    document.addEventListener('DOMContentLoaded', function () {

        const modalElement = document.getElementById('modal-categoria');
        const modal = new bootstrap.Modal(modalElement);
        const modalLabel = document.getElementById('modal-categoria-label');
        const formCategoria = document.getElementById('form-categoria');
        const categoriaIdInput = document.getElementById('categoria-id');
        const nombreCategoriaInput = document.getElementById('nombre-categoria');
        const categoriaPadreSelect = document.getElementById('categoria-padre');

        // Inicializar DataTable
        tablaCategorias = $('#tabla-categorias').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            columns: [
                { data: 'IdCategoria' },
                { data: 'Nombre' },
                {
                    data: 'IdCategoriaPadre',
                    render: function(data, type, row) {
                        if (!data) return '<em>Ninguna</em>';
                        const padre = todasLasCategorias.find(c => c.IdCategoria === data);
                        return padre ? padre.Nombre : 'Desconocido';
                    }
                },
                {
                    data: 'IdCategoria',
                    render: function (data, type, row) {
                        return `
                            <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                        `;
                    },
                    orderable: false
                }
            ]
        });

        // Cargar datos iniciales
        cargarCategorias();

        // --- MANEJADORES DE EVENTOS ---

        // Abrir modal para nueva categoría
        document.getElementById('btn-nueva-categoria').addEventListener('click', function () {
            formCategoria.reset();
            categoriaIdInput.value = '';
            modalLabel.textContent = 'Nueva Categoría';
            modal.show();
        });

        // Guardar o actualizar categoría
        document.getElementById('btn-guardar-categoria').addEventListener('click', async function () {
            if (!nombreCategoriaInput.value.trim()) {
                Swal.fire('Campo requerido', 'El nombre de la categoría es obligatorio.', 'warning');
                return;
            }

            const categoriaData = {
                IdCategoria: categoriaIdInput.value || 0,
                Nombre: nombreCategoriaInput.value,
                IdCategoriaPadre: categoriaPadreSelect.value || null
            };

            const url = categoriaData.IdCategoria ? API_URLS.categoria.actualizar : API_URLS.categoria.crear;
            app.mostrarSpinner();

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(categoriaData)
                });
                const result = await response.json();

                if (result.Success) {
                    modal.hide();
                    Swal.fire('Éxito', 'Categoría guardada correctamente.', 'success');
                    cargarCategorias(); // Recargar la tabla
                } else {
                    Swal.fire('Error', result.Message || 'No se pudo guardar la categoría.', 'error');
                }
            } catch (error) {
                console.error('Error al guardar categoría:', error);
                Swal.fire('Error', 'Ocurrió un problema de conexión.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        });

        // Eventos para editar y eliminar (delegación de eventos)
        $('#tabla-categorias tbody').on('click', '.btn-editar', function () {
            const id = $(this).data('id');
            abrirModalParaEditar(id);
        });

        $('#tabla-categorias tbody').on('click', '.btn-eliminar', function () {
            const id = $(this).data('id');
            eliminarCategoria(id);
        });

        // --- FUNCIONES AUXILIARES ---

        async function cargarCategorias() {
            app.mostrarSpinner();
            try {
                const response = await fetch(API_URLS.categoria.listar);
                const result = await response.json();
                if (result.Success) {
                    todasLasCategorias = result.Data || [];
                    tablaCategorias.clear().rows.add(todasLasCategorias).draw();
                    actualizarSelectPadre();
                } else {
                    Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error');
                }
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            } finally {
                app.ocultarSpinner();
            }
        }

        function actualizarSelectPadre(idExcluir = null) {
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

        async function abrirModalParaEditar(id) {
            app.mostrarSpinner();
            try {
                const response = await fetch(`${API_URLS.categoria.obtenerPorId}?id=${id}`);
                const result = await response.json();
                if (result.Success && result.Data) {
                    const cat = result.Data;
                    formCategoria.reset();
                    categoriaIdInput.value = cat.IdCategoria;
                    nombreCategoriaInput.value = cat.Nombre;
                    actualizarSelectPadre(cat.IdCategoria); // Excluir la misma categoría de ser su propio padre
                    categoriaPadreSelect.value = cat.IdCategoriaPadre || '';
                    modalLabel.textContent = 'Editar Categoría';
                    modal.show();
                } else {
                    Swal.fire('Error', result.Message || 'No se encontró la categoría.', 'error');
                }
            } catch (error) {
                console.error('Error al obtener categoría:', error);
            } finally {
                app.ocultarSpinner();
            }
        }

        function eliminarCategoria(id) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    app.mostrarSpinner();
                    try {
                        const response = await fetch(API_URLS.categoria.eliminar, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ IdCategoria: id })
                        });
                        const res = await response.json();
                        if (res.Success) {
                            Swal.fire('Eliminada', 'La categoría ha sido eliminada.', 'success');
                            cargarCategorias();
                        } else {
                            Swal.fire('Error', res.Message || 'No se pudo eliminar la categoría.', 'error');
                        }
                    } catch (error) {
                        console.error('Error al eliminar categoría:', error);
                    } finally {
                        app.ocultarSpinner();
                    }
                }
            });
        }

    });
})();
