(function (window) {
    'use strict';

    if (!window.apiService || !window.API_URLS || !window.app || !window.$ || !window.bootstrap) {
        console.error('Dependencias requeridas no disponibles (apiService, API_URLS, app, jQuery o Bootstrap).');
        return;
    }

    let tablaCategorias;
    let modalInstance;
    let todasLasCategorias = [];

    let modalElement;
    let modalLabel;
    let formElement;
    let idInput;
    let nombreInput;
    let descripcionInput;
    let categoriaPadreSelect;

    document.addEventListener('DOMContentLoaded', () => {
        const tablaElement = document.getElementById('tabla-categorias');
        const btnNuevaCategoria = document.getElementById('btn-nueva-categoria');
        const btnGuardarCategoria = document.getElementById('btn-guardar-categoria');

        modalElement = document.getElementById('modal-categoria');
        modalLabel = document.getElementById('modal-categoria-label');
        formElement = document.getElementById('form-categoria');
        idInput = document.getElementById('categoria-id');
        nombreInput = document.getElementById('nombre-categoria');
        descripcionInput = document.getElementById('descripcion-categoria');
        categoriaPadreSelect = document.getElementById('categoria-padre');

        const elementosFaltantes = [
            ['#tabla-categorias', tablaElement],
            ['#modal-categoria', modalElement],
            ['#modal-categoria-label', modalLabel],
            ['#form-categoria', formElement],
            ['#categoria-id', idInput],
            ['#nombre-categoria', nombreInput],
            ['#descripcion-categoria', descripcionInput],
            ['#categoria-padre', categoriaPadreSelect]
        ].filter(([, element]) => !element).map(([selector]) => selector);

        if (elementosFaltantes.length > 0) {
            console.warn('No se encontraron los siguientes elementos requeridos:', elementosFaltantes.join(', '));
            return;
        }

        modalInstance = new bootstrap.Modal(modalElement);

        tablaCategorias = window.$('#tabla-categorias').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            autoWidth: false,
            columns: [
                { data: 'IdCategoria' },
                { data: 'Nombre' },
                {
                    data: 'Descripcion',
                    render: (data) => data ? window.$('<div>').text(data).html() : ''
                },
                {
                    data: 'IdCategoriaPadre',
                    render: (data) => {
                        if (data === null || typeof data === 'undefined') {
                            return '<span class="text-muted">Sin categoría padre</span>';
                        }
                        const idPadre = Number.parseInt(data, 10);
                        if (Number.isNaN(idPadre) || idPadre === 0) {
                            return '<span class="text-muted">Sin categoría padre</span>';
                        }
                        const categoriaPadre = todasLasCategorias.find(cat => cat.IdCategoria === idPadre);
                        return categoriaPadre ? window.$('<div>').text(categoriaPadre.Nombre).html() : '<span class="text-muted">No disponible</span>';
                    }
                },
                {
                    data: 'IdCategoria',
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

        cargarCategorias();

        if (btnNuevaCategoria) {
            btnNuevaCategoria.addEventListener('click', abrirModalNueva);
        }

        if (btnGuardarCategoria) {
            btnGuardarCategoria.addEventListener('click', guardarCategoria);
        }

        window.$('#tabla-categorias tbody').on('click', '.btn-editar', function () {
            const id = Number.parseInt(window.$(this).data('id'), 10);
            if (!Number.isNaN(id)) {
                abrirModalEditar(id);
            }
        });

        window.$('#tabla-categorias tbody').on('click', '.btn-eliminar', function () {
            const id = Number.parseInt(window.$(this).data('id'), 10);
            if (!Number.isNaN(id)) {
                eliminarCategoria(id);
            }
        });
    });

    async function cargarCategorias() {
        window.app.mostrarSpinner();
        try {
            const categorias = await window.apiService.post(window.API_URLS.categoria.listar, {});
            todasLasCategorias = Array.isArray(categorias) ? categorias : [];
            tablaCategorias.clear().rows.add(todasLasCategorias).draw();
            actualizarSelectPadre();
        } catch (error) {
            console.error('Error al cargar categorías:', error);
            Swal.fire('Error', `No se pudieron cargar las categorías. ${error.message}`, 'error');
        } finally {
            window.app.ocultarSpinner();
        }
    }

    function actualizarSelectPadre(idCategoriaActual = null, idPadreSeleccionado = null) {
        if (!categoriaPadreSelect) {
            return;
        }

        const opciones = ['<option value="">-- Sin categoría padre --</option>'];
        todasLasCategorias.forEach((categoria) => {
            if (idCategoriaActual && categoria.IdCategoria === idCategoriaActual) {
                return;
            }

            const seleccionado = idPadreSeleccionado === categoria.IdCategoria ? ' selected' : '';
            const nombreSeguro = window.$('<div>').text(categoria.Nombre || '').html();
            opciones.push(`<option value="${categoria.IdCategoria}"${seleccionado}>${nombreSeguro}</option>`);
        });

        categoriaPadreSelect.innerHTML = opciones.join('');
    }

    function abrirModalNueva() {
        formElement.reset();
        idInput.value = '';
        modalLabel.textContent = 'Nueva Categoría';
        actualizarSelectPadre();
        modalInstance.show();
    }

    async function abrirModalEditar(idCategoria) {
        window.app.mostrarSpinner();
        try {
            const respuesta = await window.apiService.post(window.API_URLS.categoria.obtenerPorId, { idCategoria });
            const categoria = Array.isArray(respuesta) ? respuesta[0] : null;
            if (!categoria) {
                Swal.fire('No encontrada', 'No se encontró la categoría solicitada.', 'warning');
                return;
            }

            idInput.value = categoria.IdCategoria || '';
            nombreInput.value = categoria.Nombre || '';
            descripcionInput.value = categoria.Descripcion || '';

            const idPadre = categoria.IdCategoriaPadre ?? '';
            actualizarSelectPadre(categoria.IdCategoria, typeof idPadre === 'number' ? idPadre : null);
            categoriaPadreSelect.value = idPadre === null ? '' : String(idPadre || '');

            modalLabel.textContent = 'Editar Categoría';
            modalInstance.show();
        } catch (error) {
            console.error('Error al obtener categoría:', error);
            Swal.fire('Error', `No se pudo cargar la categoría seleccionada. ${error.message}`, 'error');
        } finally {
            window.app.ocultarSpinner();
        }
    }

    async function guardarCategoria() {
        const nombre = nombreInput.value.trim();
        if (!nombre) {
            Swal.fire('Campo requerido', 'El nombre de la categoría es obligatorio.', 'warning');
            return;
        }

        const idCategoria = Number.parseInt(idInput.value, 10) || 0;
        const idPadreSeleccionado = Number.parseInt(categoriaPadreSelect.value, 10);
        const payload = {
            idCategoria,
            nombre,
            descripcion: descripcionInput.value || '',
            idCategoriaPadre: Number.isNaN(idPadreSeleccionado) ? 0 : idPadreSeleccionado
        };

        const url = idCategoria !== 0 ? window.API_URLS.categoria.actualizar : window.API_URLS.categoria.crear;

        window.app.mostrarSpinner();
        try {
            await window.apiService.post(url, payload);
            Swal.fire('Éxito', 'La categoría se guardó correctamente.', 'success');
            modalInstance.hide();
            await cargarCategorias();
        } catch (error) {
            console.error('Error al guardar categoría:', error);
            Swal.fire('Error', `No se pudo guardar la categoría. ${error.message}`, 'error');
        } finally {
            window.app.ocultarSpinner();
        }
    }

    function eliminarCategoria(idCategoria) {
        Swal.fire({
            title: '¿Eliminar categoría?',
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
                await window.apiService.post(window.API_URLS.categoria.eliminar, { idCategoria });
                Swal.fire('Eliminada', 'La categoría se eliminó correctamente.', 'success');
                await cargarCategorias();
            } catch (error) {
                console.error('Error al eliminar categoría:', error);
                Swal.fire('Error', `No se pudo eliminar la categoría. ${error.message}`, 'error');
            } finally {
                window.app.ocultarSpinner();
            }
        });
    }
})(window);
