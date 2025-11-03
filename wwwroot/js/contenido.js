(function () {
    'use strict';

    let tablaContenidos;
    let quill;
    let todasLasCategorias = [];

    document.addEventListener('DOMContentLoaded', function () {

        // ... (inicialización de elementos sin cambios) ...

        quill = new Quill('#editor-quill', { /* ... */ });
        tablaContenidos = $('#tabla-contenidos').DataTable({ /* ... */ });

        cargarCategorias();
        cargarContenidos();

        document.getElementById('btn-nuevo-contenido').addEventListener('click', () => cambiarVista('editor'));
        document.getElementById('btn-cancelar').addEventListener('click', () => cambiarVista('listado'));
        document.getElementById('btn-guardar-contenido').addEventListener('click', guardarContenido);
        $('#filtro-categoria').on('change', () => cargarContenidos($('#filtro-categoria').val()));

        $('#tabla-contenidos tbody').on('click', '.btn-editar', function () { abrirEditorParaEditar($(this).data('id')); });
        $('#tabla-contenidos tbody').on('click', '.btn-eliminar', function () { eliminarContenido($(this).data('id')); });
    });

    // ... (cargarContenidos y cargarCategorias sin cambios en la lógica de envío) ...

    async function guardarContenido() {
        if (!document.getElementById('titulo').value.trim() || !document.getElementById('categoria').value) {
            Swal.fire('Campos requeridos', 'El título y la categoría son obligatorios.', 'warning');
            return;
        }

        const contenidoData = {
            idContenido: document.getElementById('contenido-id').value || 0,
            titulo: document.getElementById('titulo').value,
            cuerpoHTML: quill.root.innerHTML,
            idCategoria: document.getElementById('categoria').value,
            estado: document.getElementById('estado').value,
            idUsuarioAutor: app.userSession.IdUsuario,
            esDestacado: document.getElementById('es-destacado').checked // CORRECCIÓN: Añadir
        };

        const url = contenidoData.idContenido != 0 ? API_URLS.contenido.actualizar : API_URLS.contenido.crear;
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
                document.getElementById('es-destacado').checked = data.EsDestacado; // CORRECCIÓN: Añadir
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
                        body: JSON.stringify({ idContenido: id }) // CORRECCIÓN
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
        // ... (sin cambios) ...
    }

    // Las funciones `cargarContenidos` y `cargarCategorias` ya fueron corregidas en el paso anterior y no necesitan cambios aquí.
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
