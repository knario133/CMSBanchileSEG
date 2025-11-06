(function () {
    'use strict';

    if (typeof window.apiService === 'undefined' || typeof window.API_URLS === 'undefined' || typeof window.app === 'undefined') {
        console.error('Dependencias no disponibles: apiService, API_URLS o app.');
        return;
    }

    if (typeof window.Quill === 'undefined' || typeof window.bootstrap === 'undefined' || typeof window.$ === 'undefined') {
        console.error('Se requieren Quill, Bootstrap y jQuery/DataTables para la gestión de contenidos.');
        return;
    }

    let tablaContenidos;
    let quill;
    let modalInstance;
    let todasLasCategorias = [];
    let modalTitulo;
    let contenidoIdInput;
    let tituloInput;
    let categoriaSelect;
    let estadoSelect;
    let destacadoCheckbox;
    let filtroCategoriaSelect;

    document.addEventListener('DOMContentLoaded', () => {
        const tablaElement = document.getElementById('tabla-contenidos');
        filtroCategoriaSelect = document.getElementById('filtro-categoria');
        const btnNuevoContenido = document.getElementById('btn-nuevo-contenido');
        const btnGuardarContenido = document.getElementById('btn-guardar-contenido');
        const modalElement = document.getElementById('modal-contenido');
        const formContenido = document.getElementById('form-contenido');

        modalTitulo = document.getElementById('modal-contenido-label');
        contenidoIdInput = document.getElementById('contenido-id');
        tituloInput = document.getElementById('titulo');
        categoriaSelect = document.getElementById('categoria');
        estadoSelect = document.getElementById('estado');
        destacadoCheckbox = document.getElementById('es-destacado');

        if (!tablaElement || !filtroCategoriaSelect || !btnNuevoContenido || !btnGuardarContenido ||
            !modalElement || !formContenido || !modalTitulo || !contenidoIdInput || !tituloInput ||
            !categoriaSelect || !estadoSelect || !destacadoCheckbox) {
            console.warn('No se encontraron todos los elementos requeridos para inicializar la vista de contenidos.');
            return;
        }

        quill = new Quill('#editor-quill', {
            theme: 'snow',
            placeholder: 'Escribe el contenido aquí…',
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                ]
            }
        });

        tablaContenidos = $('#tabla-contenidos').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            autoWidth: false,
            columns: [
                { data: 'IdContenido' },
                { data: 'Titulo' },
                {
                    data: 'IdCategoria',
                    render: (data) => {
                        const categoria = todasLasCategorias.find(cat => cat.IdCategoria === data);
                        return categoria ? categoria.Nombre : 'N/A';
                    }
                },
                { data: 'Estado' },
                {
                    data: 'FechaCreacion',
                    render: (data) => {
                        if (!data) {
                            return '';
                        }
                        const fecha = new Date(data);
                        return Number.isNaN(fecha.getTime()) ? '' : fecha.toLocaleDateString('es-CL');
                    }
                },
                {
                    data: 'IdContenido',
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

        modalInstance = new bootstrap.Modal(modalElement, { backdrop: 'static' });

        btnNuevoContenido.addEventListener('click', abrirModalCrear);
        btnGuardarContenido.addEventListener('click', (event) => {
            event.preventDefault();
            guardarContenido();
        });
        filtroCategoriaSelect.addEventListener('change', () => cargarContenidos(filtroCategoriaSelect.value));

        $('#tabla-contenidos tbody').on('click', '.btn-editar', function () {
            const id = Number.parseInt(this.dataset.id, 10);
            if (!Number.isNaN(id)) {
                abrirModalEditar(id);
            }
        });

        $('#tabla-contenidos tbody').on('click', '.btn-eliminar', function () {
            const id = Number.parseInt(this.dataset.id, 10);
            if (!Number.isNaN(id)) {
                confirmarEliminacion(id);
            }
        });

        modalElement.addEventListener('hidden.bs.modal', resetFormulario);

        cargarCategorias().finally(() => {
            cargarContenidos();
        });
    });

    async function cargarCategorias() {
        try {
            const categorias = await apiService.get(API_URLS.categoria.listar);
            todasLasCategorias = Array.isArray(categorias) ? categorias : [];

            poblarSelect(filtroCategoriaSelect, todasLasCategorias, true);
            poblarSelect(categoriaSelect, todasLasCategorias, false);
        } catch (error) {
            console.error('No se pudieron cargar las categorías:', error);
            Swal.fire('Error', 'No fue posible cargar las categorías disponibles.', 'error');
        }
    }

    function poblarSelect(selectElement, categorias, incluirOpcionTodos) {
        if (!selectElement) {
            return;
        }
        const seleccionActual = selectElement.value;
        const opciones = [];

        if (incluirOpcionTodos) {
            opciones.push(new Option('-- Todas las categorías --', ''));
        } else {
            const placeholder = new Option('Seleccione una categoría', '', true, false);
            placeholder.disabled = true;
            opciones.push(placeholder);
        }

        categorias.forEach(cat => {
            if (cat && typeof cat.IdCategoria !== 'undefined') {
                opciones.push(new Option(cat.Nombre, cat.IdCategoria));
            }
        });

        selectElement.innerHTML = '';
        opciones.forEach(opcion => selectElement.add(opcion));

        if (seleccionActual && Array.from(selectElement.options).some(opt => opt.value == seleccionActual)) {
            selectElement.value = seleccionActual;
        } else if (!incluirOpcionTodos) {
            selectElement.value = '';
        }
    }

    async function cargarContenidos(idCategoria = '') {
        app.mostrarSpinner();
        try {
            const data = idCategoria
                ? await apiService.post(API_URLS.contenido.listarPorCategoria, { idCategoria: Number(idCategoria) })
                : await apiService.post(API_URLS.contenido.listar, {});

            const lista = Array.isArray(data) ? data : [];
            tablaContenidos.clear().rows.add(lista).draw();
        } catch (error) {
            console.error('Error al cargar los contenidos:', error);
            Swal.fire('Error', 'No fue posible obtener el listado de contenidos.', 'error');
            tablaContenidos.clear().draw();
        } finally {
            app.ocultarSpinner();
        }
    }

    function abrirModalCrear() {
        if (!modalTitulo) {
            return;
        }
        resetFormulario();
        modalTitulo.textContent = 'Nuevo Contenido';
        estadoSelect.value = 'Borrador';
        if (modalInstance) {
            modalInstance.show();
        }
        setTimeout(() => tituloInput.focus(), 150);
    }

    async function abrirModalEditar(idContenido) {
        if (!modalTitulo) {
            return;
        }
        app.mostrarSpinner();
        try {
            const respuesta = await apiService.post(API_URLS.contenido.obtenerPorId, { idContenido });
            const data = Array.isArray(respuesta) ? respuesta[0] : respuesta;

            if (!data) {
                Swal.fire('Error', 'No se encontró la información del contenido seleccionado.', 'error');
                return;
            }

            contenidoIdInput.value = data.IdContenido || '';
            tituloInput.value = data.Titulo || '';
            categoriaSelect.value = data.IdCategoria || '';
            estadoSelect.value = data.Estado || 'Borrador';
            destacadoCheckbox.checked = Boolean(data.EsDestacado);
            quill.root.innerHTML = data.CuerpoHTML || '';

            modalTitulo.textContent = 'Editar Contenido';
            modalInstance?.show();
        } catch (error) {
            console.error('No se pudo obtener el detalle del contenido:', error);
            Swal.fire('Error', 'Ocurrió un problema al cargar el contenido seleccionado.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function resetFormulario() {
        const form = document.getElementById('form-contenido');
        form?.reset();
        if (contenidoIdInput) {
            contenidoIdInput.value = '';
        }
        quill?.setContents([]);
    }

    async function guardarContenido() {
        if (!tituloInput.value.trim() || !categoriaSelect.value) {
            Swal.fire('Campos requeridos', 'Debes ingresar un título y seleccionar una categoría.', 'warning');
            return;
        }

        if (!app.userSession || !app.userSession.IdUsuario) {
            Swal.fire('Sesión expirada', 'Debes iniciar sesión nuevamente para guardar contenido.', 'warning');
            return;
        }

        const payload = {
            idContenido: Number(contenidoIdInput.value) || 0,
            titulo: tituloInput.value.trim(),
            cuerpoHTML: quill.root.innerHTML,
            idCategoria: Number(categoriaSelect.value),
            estado: estadoSelect.value,
            idUsuarioAutor: app.userSession.IdUsuario,
            esDestacado: destacadoCheckbox.checked
        };

        const url = payload.idContenido ? API_URLS.contenido.actualizar : API_URLS.contenido.crear;

        app.mostrarSpinner();
        try {
            await apiService.post(url, payload);
            Swal.fire('Éxito', 'El contenido se guardó correctamente.', 'success');
            modalInstance?.hide();
            cargarContenidos(filtroCategoriaSelect?.value || '');
        } catch (error) {
            console.error('Fallo al guardar el contenido:', error);
            Swal.fire('Error', error.message || 'Ocurrió un problema al guardar el contenido.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function confirmarEliminacion(idContenido) {
        Swal.fire({
            title: '¿Eliminar contenido?',
            text: 'Esta acción no se puede deshacer.',
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
                await apiService.post(API_URLS.contenido.eliminar, { idContenido });
                Swal.fire('Eliminado', 'El contenido fue eliminado correctamente.', 'success');
                cargarContenidos(filtroCategoriaSelect?.value || '');
            } catch (error) {
                console.error('Error al eliminar el contenido:', error);
                Swal.fire('Error', 'No fue posible eliminar el contenido seleccionado.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        });
    }

})();
