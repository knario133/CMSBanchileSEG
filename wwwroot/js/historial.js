(function() {
    'use strict';

    let tablaHistorial;

    document.addEventListener('DOMContentLoaded', function() {
        const filtroContenidoInput = document.getElementById('filtro-contenido');
        const btnFiltrar = document.getElementById('btn-filtrar');

        tablaHistorial = $('#tabla-historial').DataTable({
            language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
            responsive: true,
            columns: [
                { data: 'IdHistorialContenido' },
                { data: 'IdContenido' },
                { data: 'TipoAccion' },
                {
                    data: 'FechaAccion',
                    render: function(data) {
                        return new Date(data).toLocaleString();
                    }
                },
                { data: 'NombreUsuario' }, // Asumiendo que el handler devuelve este dato
                {
                    data: 'Detalles',
                    render: function(data) {
                        return `<pre style="white-space: pre-wrap; word-break: break-all;">${data || ''}</pre>`;
                    }
                }
            ],
            order: [[3, 'desc']] // Ordenar por fecha descendente por defecto
        });

        // Cargar historial al inicio (sin filtro)
        cargarHistorial();

        // --- Eventos ---
        btnFiltrar.addEventListener('click', () => {
            const idContenido = filtroContenidoInput.value;
            cargarHistorial(idContenido);
        });

        filtroContenidoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                cargarHistorial(filtroContenidoInput.value);
            }
        });
    });

    async function cargarHistorial(idContenido = null) {
        if (!idContenido) {
            // Si no hay ID, podríamos decidir no cargar nada o cargar un historial general.
            // Por ahora, solo cargará si se provee un ID.
            tablaHistorial.clear().draw();
            Swal.fire({
                title: 'Ingrese un ID',
                text: 'Por favor, ingrese un ID de contenido para ver su historial.',
                icon: 'info',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        app.mostrarSpinner();
        const url = `${API_URLS.historial.listarPorContenido}?idContenido=${idContenido}`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.Success) {
                tablaHistorial.clear().rows.add(result.Data || []).draw();
                 if (!result.Data || result.Data.length === 0) {
                     Swal.fire('Sin resultados', 'No se encontró historial para el ID de contenido proporcionado.', 'info');
                 }
            } else {
                Swal.fire('Error', `No se pudo cargar el historial: ${result.Message}`, 'error');
            }
        } catch (error) {
            console.error('Error al cargar historial:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

})();
