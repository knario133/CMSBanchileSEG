(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        const totalContenidosEl = document.getElementById('total-contenidos');
        const totalUsuariosEl = document.getElementById('total-usuarios');
        const totalCategoriasEl = document.getElementById('total-categorias');
        const totalMultimediaEl = document.getElementById('total-multimedia');

        const fetchData = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

                const result = await response.json();

                if (result.Respuesta && !result.Respuesta.Error) {
                    return result.Respuesta.Resultado || [];
                } else {
                    console.error(`Error en la respuesta de ${url}:`, result.Respuesta.Message);
                    return [];
                }
            } catch (error) {
                console.error(`Fallo al obtener datos de ${url}:`, error);
                return [];
            }
        };

        const cargarEstadisticas = async () => {
            const promesas = [
                fetchData(API_URLS.contenido.listar),
                fetchData(API_URLS.usuario.listar),
                fetchData(API_URLS.categoria.listar),
                fetchData(API_URLS.multimedia.listar)
            ];

            try {
                const [contenidos, usuarios, categorias, multimedia] = await Promise.all(promesas);

                const contenidosPublicados = contenidos.filter(c => c.Estado === 'Publicado').length;

                totalContenidosEl.textContent = contenidosPublicados;
                totalUsuariosEl.textContent = usuarios.length;
                totalCategoriasEl.textContent = categorias.length;
                totalMultimediaEl.textContent = multimedia.length;

            } catch (error) {
                console.error("Error cargando estadísticas del dashboard:", error);
                Swal.fire('Error', 'No se pudieron cargar las estadísticas del dashboard.', 'error');
                [totalContenidosEl, totalUsuariosEl, totalCategoriasEl, totalMultimediaEl].forEach(el => el.textContent = 'Error');
            }
        };

        cargarEstadisticas();
    });

})();
