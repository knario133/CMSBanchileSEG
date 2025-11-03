(function () {
    'use strict';
    // ... (inicialización)

    document.addEventListener('DOMContentLoaded', function () {
        // ... (event listeners sin cambios)
    });

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
            esDestacado: document.getElementById('es-destacado').checked
        };

        const url = contenidoData.idContenido != 0 ? API_URLS.contenido.actualizar : API_URLS.contenido.crear;
        app.mostrarSpinner();
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contenidoData) // CORRECCIÓN (todo a camelCase)
            });
            // ... (manejo de respuesta)
        } catch (error) { /* ... */ } finally { app.ocultarSpinner(); }
    }

    function eliminarContenido(id) {
        Swal.fire({ /* ... */ }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.contenido.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idContenido: id }) // CORRECCIÓN
                    });
                    // ... (manejo de respuesta)
                } catch (error) { /* ... */ } finally { app.ocultarSpinner(); }
            }
        });
    }

    // ... (demás funciones sin cambios de payload)
})();

$(document).ready(function () {
    $('#tabla-contenidos').DataTable();
});
