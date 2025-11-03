(function () {
    'use strict';
    // ... (inicialización)

    document.addEventListener('DOMContentLoaded', function () {
        // ... (event listeners sin cambios)
    });

    async function guardarRol() {
        if (!document.getElementById('nombre-rol').value.trim()) {
            Swal.fire('Campo requerido', 'El nombre del rol es obligatorio.', 'warning');
            return;
        }

        const rolData = {
            idRol: document.getElementById('rol-id').value || 0,
            nombreRol: document.getElementById('nombre-rol').value,
            descripcion: document.getElementById('descripcion-rol').value || "" // CORRECCIÓN
        };

        const url = rolData.idRol != 0 ? API_URLS.rol.actualizar : API_URLS.rol.crear;
        app.mostrarSpinner();
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rolData) // CORRECCIÓN (todo a camelCase)
            });
            // ... (manejo de respuesta)
        } catch (error) { /* ... */ } finally { app.ocultarSpinner(); }
    }

    function eliminarRol(id) {
        Swal.fire({ /* ... */ }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.rol.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idRol: id }) // CORRECCIÓN
                    });
                    // ... (manejo de respuesta)
                } catch (error) { /* ... */ } finally { app.ocultarSpinner(); }
            }
        });
    }

    // ... (demás funciones sin cambios de payload)
})();
