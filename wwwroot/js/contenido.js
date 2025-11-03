(function () {
    'use strict';

    let tablaContenidos;
    let quill;
    let todasLasCategorias = [];

    let vistaListado;
    let vistaEditor;
    let editorTitulo;
    let filtroCategoriaSelect;

    let formContenido;
    let contenidoIdInput;
    let tituloInput;
    let categoriaSelect;
    let estadoSelect;
    let cuerpoHtmlInput;
    let destacadoCheckbox;

    document.addEventListener('DOMContentLoaded', function () {
        vistaListado = document.getElementById('vista-listado');
        vistaEditor = document.getElementById('vista-editor');
        editorTitulo = document.getElementById('editor-titulo');
        filtroCategoriaSelect = document.getElementById('filtro-categoria');

        formContenido = document.getElementById('form-contenido');
        contenidoIdInput = document.getElementById('contenido-id');
        tituloInput = document.getElementById('titulo');
        categoriaSelect = document.getElementById('categoria');
        estadoSelect = document.getElementById('estado');
        cuerpoHtmlInput = document.getElementById('cuerpo-html');
        destacadoCheckbox = document.getElementById('es-destacado');

        quill = new Quill('#editor-quill', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['link', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean']
                ]
            }
        });

        tablaContenidos = $('#tabla-contenidos').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            columns: [
                { data: 'IdContenido' },
                { data: 'Titulo' },
                {
                    data: 'IdCategoria',
                    render: function (data) {
                        const categoria = todasLasCategorias.find(c => c.IdCategoria === data);
                        return categoria ? categoria.Nombre : 'N/A';
                    }
                },
                { data: 'Estado' },
                {
                    data: 'FechaCreacion',
                    render: function (data) {
                        return data ? new Date(data).toLocaleDateString() : 'N/A';
                    }
                },
                {
                    data: 'IdContenido',
                    orderable: false,
                    render: data => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `
                }
            ]
        });

        cargarCategorias();
        cargarContenidos();

        document.getElementById('btn-nuevo-contenido').addEventListener('click', () => cambiarVista('editor'));
        document.getElementById('btn-cancelar').addEventListener('click', () => cambiarVista('listado'));
        document.getElementById('btn-guardar-contenido').addEventListener('click', guardarContenido);
        filtroCategoriaSelect.addEventListener('change', () => cargarContenidos(filtroCategoriaSelect.value));

        $('#tabla-contenidos tbody').on('click', '.btn-editar', function () {
            abrirEditorParaEditar($(this).data('id'));
        });
        $('#tabla-contenidos tbody').on('click', '.btn-eliminar', function () {
            eliminarContenido($(this).data('id'));
        });
    });

    async function cargarContenidos(idCategoria = '') {
        app.mostrarSpinner();
        const url = idCategoria ? `${API_URLS.contenido.listarPorCategoria}?idCategoria=${idCategoria}` : API_URLS.contenido.listar;
        try {
            const response = await app.apiFetch('Contenido - Listar', url);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                tablaContenidos.clear().rows.add(result.Respuesta.Resultado || []).draw();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo cargar el contenido.', 'error');
            }
        } catch (error) {
            app.logException('Contenido - cargarContenidos', error);
            Swal.fire('Error', 'Ocurrió un problema al cargar el contenido.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function cargarCategorias() {
        try {
            const response = await app.apiFetch('Contenido - Listar Categorías', API_URLS.categoria.listar);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                todasLasCategorias = result.Respuesta.Resultado || [];
                poblarSelectsDeCategorias();
            }
        } catch (error) {
            app.logException('Contenido - cargarCategorias', error);
        }
    }

    function poblarSelectsDeCategorias() {
        const selects = [filtroCategoriaSelect, categoriaSelect];
        selects.forEach((select, index) => {
            if (!select) {
                return;
            }
            const defaultOption = index === 0 ? select.options[0] : null;
            select.innerHTML = '';
            if (defaultOption) {
                select.appendChild(defaultOption);
            }
            todasLasCategorias.forEach(cat => {
                const option = new Option(cat.Nombre, cat.IdCategoria);
                select.add(option);
            });
        });
    }

    async function guardarContenido() {
        if (!tituloInput.value.trim() || !categoriaSelect.value) {
            Swal.fire('Campos requeridos', 'El título y la categoría son obligatorios.', 'warning');
            return;
        }

        const contenidoData = {
            idContenido: contenidoIdInput.value || 0,
            titulo: tituloInput.value,
            cuerpoHtml: quill.root.innerHTML,
            idCategoria: Number(categoriaSelect.value),
            estado: estadoSelect.value,
            idUsuario: app.userSession ? app.userSession.IdUsuario : 0,
            esDestacado: destacadoCheckbox ? destacadoCheckbox.checked : false
        };

        const url = contenidoData.idContenido && Number(contenidoData.idContenido) !== 0
            ? API_URLS.contenido.actualizar
            : API_URLS.contenido.crear;

        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Contenido - Guardar', url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contenidoData)
            });
            const result = await response.json();

            if (result.Respuesta && !result.Respuesta.Error) {
                Swal.fire('Éxito', 'Contenido guardado correctamente.', 'success');
                cambiarVista('listado');
                cargarContenidos();
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo guardar el contenido.', 'error');
            }
        } catch (error) {
            app.logException('Contenido - guardarContenido', error);
            Swal.fire('Error', 'Ocurrió un problema al guardar el contenido.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirEditorParaEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Contenido - Obtener', `${API_URLS.contenido.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const data = result.Respuesta.Resultado[0];
                if (!data) {
                    Swal.fire('Advertencia', 'No se encontró el contenido solicitado.', 'warning');
                    return;
                }
                formContenido.reset();
                contenidoIdInput.value = data.IdContenido;
                tituloInput.value = data.Titulo;
                quill.root.innerHTML = data.CuerpoHTML || '';
                categoriaSelect.value = data.IdCategoria;
                estadoSelect.value = data.Estado;
                if (destacadoCheckbox) {
                    destacadoCheckbox.checked = Boolean(data.EsDestacado);
                }
                cambiarVista('editor', 'Editar Contenido');
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo obtener el contenido.', 'error');
            }
        } catch (error) {
            app.logException('Contenido - abrirEditorParaEditar', error);
            Swal.fire('Error', 'Ocurrió un problema al obtener el contenido.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function eliminarContenido(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'El contenido se eliminará permanentemente.',
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
                const response = await app.apiFetch('Contenido - Eliminar', API_URLS.contenido.eliminar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idContenido: id })
                });
                const res = await response.json();

                if (res.Respuesta && !res.Respuesta.Error) {
                    Swal.fire('Eliminado', 'El contenido ha sido eliminado.', 'success');
                    cargarContenidos();
                } else {
                    Swal.fire('Error', res.Respuesta?.Message || 'No se pudo eliminar el contenido.', 'error');
                }
            } catch (error) {
                app.logException('Contenido - eliminarContenido', error);
                Swal.fire('Error', 'Ocurrió un problema al eliminar el contenido.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        });
    }

    function cambiarVista(vista, titulo = 'Nuevo Contenido') {
        if (vista === 'editor') {
            vistaListado.classList.add('d-none');
            vistaEditor.classList.remove('d-none');
            editorTitulo.textContent = titulo;
        } else {
            vistaEditor.classList.add('d-none');
            vistaListado.classList.remove('d-none');
            formContenido.reset();
            contenidoIdInput.value = '';
            quill.root.innerHTML = '';
            if (destacadoCheckbox) {
                destacadoCheckbox.checked = false;
            }
        }
    }
})();
