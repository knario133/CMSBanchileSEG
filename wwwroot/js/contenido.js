(function () {
    'use strict';

    let tablaContenidos;
    let quill;
    let todasLasCategorias = [];

    document.addEventListener('DOMContentLoaded', function () {

        const vistaListado = document.getElementById('vista-listado');
        const vistaEditor = document.getElementById('vista-editor');
        const editorTitulo = document.getElementById('editor-titulo');
        const filtroCategoriaSelect = document.getElementById('filtro-categoria');

        const formContenido = document.getElementById('form-contenido');
        const contenidoIdInput = document.getElementById('contenido-id');
        const tituloInput = document.getElementById('titulo');
        const categoriaSelect = document.getElementById('categoria');
        const estadoSelect = document.getElementById('estado');

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

        tablaContenidos = $('#tabla-contenidos').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            columns: [
                { data: 'IdContenido' },
                { data: 'Titulo' },
                {
                    data: 'IdCategoria',
                    render: (data) => (todasLasCategorias.find(c => c.IdCategoria === data) || {}).Nombre || 'N/A'
                },
                { data: 'Estado' },
                {
                    data: 'FechaCreacion',
                    render: (data) => data ? new Date(data).toLocaleDateString() : 'N/A'
                },
                {
                    data: 'IdContenido',
                    render: (data) => `
                        <button class="btn btn-sm btn-info btn-editar" data-id="${data}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${data}"><i class="fas fa-trash"></i></button>
                    `,
                    orderable: false
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
            const response = await fetch(url);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                tablaContenidos.clear().rows.add(result.Respuesta.Resultado || []).draw();
            } else {
                Swal.fire('Error', 'No se pudo cargar el contenido.', 'error');
                console.error("Error handler contenido:", result.Respuesta.Message);
            }
        } catch (error) {
            console.error('Error de red al cargar contenidos:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function cargarCategorias() {
        try {
            const response = await fetch(API_URLS.categoria.listar);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                todasLasCategorias = result.Respuesta.Resultado || [];
                [document.getElementById('filtro-categoria'), document.getElementById('categoria')].forEach(select => {
                    const firstOption = select.options[0];
                    select.innerHTML = '';
                    if (firstOption) select.add(firstOption);
                    todasLasCategorias.forEach(cat => select.add(new Option(cat.Nombre, cat.IdCategoria)));
                });
            }
        } catch (error) {
            console.error('Error de red al cargar categorías:', error);
        }
    }

    async function guardarContenido() {
        if (!document.getElementById('titulo').value.trim() || !document.getElementById('categoria').value) {
            Swal.fire('Campos requeridos', 'El título y la categoría son obligatorios.', 'warning');
            return;
        }

        const contenidoData = {
            IdContenido: document.getElementById('contenido-id').value || 0,
            Titulo: document.getElementById('titulo').value,
            CuerpoHTML: quill.root.innerHTML,
            IdCategoria: document.getElementById('categoria').value,
            Estado: document.getElementById('estado').value,
            IdUsuarioAutor: app.userSession.IdUsuario // CORRECCIÓN
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

            if (result.Respuesta && !result.Respuesta.Error) {
                Swal.fire('Éxito', 'Contenido guardado correctamente.', 'success');
                cambiarVista('listado');
                cargarContenidos();
            } else {
                Swal.fire('Error', result.Respuesta.Message || 'No se pudo guardar el contenido.', 'error');
            }
        } catch (error) {
            console.error('Error de red al guardar contenido:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function abrirEditorParaEditar(id) {
        app.mostrarSpinner();
        try {
            const response = await fetch(`${API_URLS.contenido.obtenerPorId}?id=${id}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const data = result.Respuesta.Resultado[0];
                document.getElementById('contenido-id').value = data.IdContenido;
                document.getElementById('titulo').value = data.Titulo;
                quill.root.innerHTML = data.CuerpoHTML;
                document.getElementById('categoria').value = data.IdCategoria;
                document.getElementById('estado').value = data.Estado;
                cambiarVista('editor', 'Editar Contenido');
            } else {
                Swal.fire('Error', 'No se encontró el contenido.', 'error');
            }
        } catch (error) {
            console.error('Error de red al obtener contenido:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    function eliminarContenido(id) {
        Swal.fire({
            title: '¿Estás seguro?', text: "Esta acción no se puede revertir.", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sí, eliminar'
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
                    if (res.Respuesta && !res.Respuesta.Error) {
                        Swal.fire('Eliminado', 'El contenido ha sido eliminado.', 'success');
                        cargarContenidos();
                    } else {
                        Swal.fire('Error', res.Respuesta.Message || 'No se pudo eliminar.', 'error');
                    }
                } catch (error) {
                    console.error('Error de red al eliminar:', error);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

    function cambiarVista(vista, titulo = 'Nuevo Contenido') {
        if (vista === 'editor') {
            document.getElementById('vista-listado').style.display = 'none';
            document.getElementById('vista-editor').style.display = 'block';
            document.getElementById('editor-titulo').textContent = titulo;
            if (titulo === 'Nuevo Contenido') {
                document.getElementById('form-contenido').reset();
                document.getElementById('contenido-id').value = '';
                quill.root.innerHTML = '';
            }
        } else {
            document.getElementById('vista-editor').style.display = 'none';
            document.getElementById('vista-listado').style.display = 'block';
        }
    }

})();
