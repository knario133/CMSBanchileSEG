(function () {
    'use strict';

    let tablaHistorial;

    document.addEventListener('DOMContentLoaded', function () {
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
                    render: data => data ? new Date(data).toLocaleString() : ''
                },
                { data: 'NombreUsuario' },
                {
                    data: 'Detalles',
                    render: data => `<pre class="mb-0" style="white-space: pre-wrap; word-break: break-word;">${data || ''}</pre>`
                }
            ],
            order: [[3, 'desc']]
        });

        btnFiltrar.addEventListener('click', () => cargarHistorial(filtroContenidoInput.value));
        filtroContenidoInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                cargarHistorial(filtroContenidoInput.value);
            }
        });
    });

    async function cargarHistorial(idContenido) {
        if (!idContenido) {
            tablaHistorial.clear().draw();
            Swal.fire({
                title: 'Ingrese un ID',
                text: 'Por favor, ingrese un ID de contenido para ver su historial.',
                icon: 'info',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false
            });
            return;
        }

        app.mostrarSpinner();
        try {
            const response = await app.apiFetch('Historial - Listar por Contenido', `${API_URLS.historial.listarPorContenido}?idContenido=${idContenido}`);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                const registros = result.Respuesta.Resultado || [];
                tablaHistorial.clear().rows.add(registros).draw();
                if (!registros.length) {
                    Swal.fire('Sin resultados', 'No se encontró historial para el ID proporcionado.', 'info');
                }
            } else {
                Swal.fire('Error', result.Respuesta?.Message || 'No se pudo cargar el historial.', 'error');
            }
        } catch (error) {
            app.logException('Historial - cargarHistorial', error);
            Swal.fire('Error', 'Ocurrió un problema al consultar el historial.', 'error');
        } finally {
            app.ocultarSpinner();
        }
    }
})();
