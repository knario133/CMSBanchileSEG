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
                { data: 'IdHistorial' }, // CORRECCIÓN
                { data: 'IdContenido' },
                { data: 'TipoAccion' }, // Asumido
                {
                    data: 'FechaCambio', // CORRECCIÓN
                    render: (data) => new Date(data).toLocaleString()
                },
                { data: 'NombreUsuario' }, // Asumido
                {
                    data: 'Detalles',
                    render: (data) => `<pre style="white-space: pre-wrap; word-break: break-all;">${data || ''}</pre>`
                }
            ],
            order: [[3, 'desc']]
        });

        btnFiltrar.addEventListener('click', () => cargarHistorial(filtroContenidoInput.value));
        filtroContenidoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') cargarHistorial(filtroContenidoInput.value);
        });

        const urlParams = new URLSearchParams(window.location.search);
        const idContenido = urlParams.get('idContenido');
        if (idContenido) {
            filtroContenidoInput.value = idContenido;
            cargarHistorial(idContenido);
        }
    });

    async function cargarHistorial(idContenido) {
        if (!idContenido || isNaN(idContenido)) {
            tablaHistorial.clear().draw();
            Swal.fire({
                title: 'ID de Contenido Inválido',
                text: 'Por favor, ingrese un ID numérico de contenido para ver su historial.',
                icon: 'info'
            });
            return;
        }

        app.mostrarSpinner();
        const url = `${API_URLS.historial.listarPorContenido}?idContenido=${idContenido}`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const data = result.Respuesta.Resultado || [];
                tablaHistorial.clear().rows.add(data).draw();
                 if (data.length === 0) {
                     Swal.fire('Sin resultados', 'No se encontró historial para el ID de contenido proporcionado.', 'info');
                 }
            } else {
                Swal.fire('Error', `No se pudo cargar el historial: ${result.Respuesta.Message}`, 'error');
                console.error("Error handler historial:", result.Respuesta.Message);
            }
        } catch (error) {
            console.error('Error de red al cargar historial:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

})();

$(document).ready(function () {
    $('#tabla-historial').DataTable();
});
