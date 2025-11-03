(function () {
    'use strict';

    let tablaContenidos;
    let quill;
    let todasLasCategorias = [];

    document.addEventListener('DOMContentLoaded', function () {

        // --- Vistas y Elementos del DOM ---
        const vistaListado = document.getElementById('vista-listado');
        const vistaEditor = document.getElementById('vista-editor');
        const editorTitulo = document.getElementById('editor-titulo');
        const filtroCategoriaSelect = document.getElementById('filtro-categoria');

        // --- Formulario ---
        const formContenido = document.getElementById('form-contenido');
        const contenidoIdInput = document.getElementById('contenido-id');
        const tituloInput = document.getElementById('titulo');
        const categoriaSelect = document.getElementById('categoria');
        const estadoSelect = document.getElementById('estado');
        const cuerpoHtmlInput = document.getElementById('cuerpo-html');

        // --- Inicialización ---

        // Quill Editor
        quill = new Quill('#editor-quill', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['link', 'image'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });

        // DataTable
        tablaContenidos = $('#tabla-contenidos').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            columns: [
                { data: 'IdContenido' },
                { data: 'Titulo' },
                {
                    data: 'IdCategoria',
                    render: function(data) {
                        const categoria = todasLasCategorias.find(c => c.IdCategoria === data);
                        return categoria ? categoria.Nombre : 'N/A';
                    }
                },
                { data: 'Estado' },
                {
                    data: 'FechaCreacion',
                    render: function(data) {
                        return data ? new Date(data).toLocaleDateString() : 'N/A';
                    }
                },
                {
                    data: 'IdContenido',
                    render: function (data) {
                        return `
                            <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                        `;
                    },
                    orderable: false
                }
            ]
        });

        cargarCategorias();
        cargarContenidos();

        // --- Manejadores de Eventos ---

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

    // --- Funciones Principales ---

    async function cargarContenidos(idCategoria = '') {
        app.mostrarSpinner();
        const url = idCategoria ? `${API_URLS.contenido.listarPorCategoria}?idCategoria=${idCategoria}` : API_URLS.contenido.listar;
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.Success) {
                tablaContenidos.clear().rows.add(result.Data || []).draw();
            } else {
                Swal.fire('Error', 'No se pudo cargar el contenido.', 'error');
            }
        } catch (error) {
            console.error('Error al cargar contenidos:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function cargarCategorias() {
        try {
            const response = await fetch(API_URLS.categoria.listar);
            const result = await response.json();
            if (result.Success) {
                todasLasCategorias = result.Data || [];
                // Poblar ambos selects de categoría
                [filtroCategoriaSelect, categoriaSelect].forEach(select => {
                    // Limpiar opciones viejas, excepto la primera del filtro
                    const firstOption = select.options[0];
                    select.innerHTML = '';
                    select.appendChild(firstOption);

                    todasLasCategorias.forEach(cat => {
                        const option = new Option(cat.Nombre, cat.IdCategoria);
                        select.add(option);
                    });
                });
            }
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    }

    async function guardarContenido() {
        if (!tituloInput.value.trim() || !categoriaSelect.value) {
            Swal.fire('Campos requeridos', 'El título y la categoría son obligatorios.', 'warning');
            return;
        }

        const contenidoData = {
            IdContenido: contenidoIdInput.value || 0,
            Titulo: tituloInput.value,
            CuerpoHTML: quill.root.innerHTML,
            IdCategoria: categoriaSelect.value,
            Estado: estadoSelect.value,
            IdUsuario: app.userSession.IdUsuario // Asumiendo que IdUsuario está en la sesión
        };

        const url = contenidoData.IdContenido ? API_URLS.contenido.actualizar : API_URLS.contenido.crear;
        app.mostrarSpinner();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contenidoData)
            });
            const result = await response.json();

            if (result.Success) {
                Swal.fire('Éxito', 'Contenido guardado correctamente.', 'success');
                cambiarVista('listado');
                cargarContenidos();
            } else {
                Swal.fire('Error', result.Message || 'No se pudo guardar el contenido.', 'error');
            }
        } catch (error) {
            console.error('Error al guardar contenido:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirEditorParaEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await fetch(`${API_URLS.contenido.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Success && result.Data) {
                const data = result.Data;
                contenidoIdInput.value = data.IdContenido;
                tituloInput.value = data.Titulo;
                quill.root.innerHTML = data.CuerpoHTML;
                categoriaSelect.value = data.IdCategoria;
                estadoSelect.value = data.Estado;
                cambiarVista('editor', 'Editar Contenido');
            } else {
                Swal.fire('Error', 'No se encontró el contenido.', 'error');
            }
        } catch (error) {
            console.error('Error al obtener contenido:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    function eliminarContenido(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.contenido.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ IdContenido: id })
                    });
                    const res = await response.json();
                    if (res.Success) {
                        Swal.fire('Eliminado', 'El contenido ha sido eliminado.', 'success');
                        cargarContenidos();
                    } else {
                        Swal.fire('Error', res.Message || 'No se pudo eliminar.', 'error');
                    }
                } catch (error) {
                    console.error('Error al eliminar:', error);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

    function cambiarVista(vista, titulo = 'Nuevo Contenido') {
        if (vista === 'editor') {
            vistaListado.style.display = 'none';
            vistaEditor.style.display = 'block';
            editorTitulo.textContent = titulo;
            if (titulo === 'Nuevo Contenido') {
                formContenido.reset();
                contenidoIdInput.value = '';
                quill.root.innerHTML = ''; // Limpiar Quill
            }
        } else { // listado
            vistaEditor.style.display = 'none';
            vistaListado.style.display = 'block';
        }
    }

})();
