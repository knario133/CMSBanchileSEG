(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        // Elementos del DOM donde se mostrarán los totales
        const totalContenidosEl = document.getElementById('total-contenidos');
        const totalUsuariosEl = document.getElementById('total-usuarios');
        const totalCategoriasEl = document.getElementById('total-categorias');
        const totalMultimediaEl = document.getElementById('total-multimedia');

        /**
         * Función genérica para obtener datos de un handler.
         * @param {string} url - La URL del handler.
         * @returns {Promise<Array>} - Una promesa que resuelve a la lista de datos.
         */
        const fetchData = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const result = await response.json();
                if (result.Success) {
                    return result.Data || [];
                } else {
                    console.error(`Error en la respuesta del handler ${url}: ${result.Message}`);
                    return [];
                }
            } catch (error) {
                console.error(`No se pudo obtener datos de ${url}:`, error);
                return []; // Retorna un array vacío en caso de error
            }
        };

        /**
         * Carga todas las estadísticas del dashboard en paralelo.
         */
        const cargarEstadisticas = async () => {
            // Iniciar todas las peticiones en paralelo
            const promesas = [
                fetchData(API_URLS.contenido.listar),
                fetchData(API_URLS.usuario.listar),
                fetchData(API_URLS.categoria.listar),
                fetchData(API_URLS.multimedia.listar)
            ];

            try {
                // Esperar a que todas las promesas se resuelvan
                const [contenidos, usuarios, categorias, multimedia] = await Promise.all(promesas);

                // Filtrar contenidos por estado 'Publicado'
                const contenidosPublicados = contenidos.filter(c => c.Estado === 'Publicado').length;

                // Actualizar el DOM con los resultados
                totalContenidosEl.textContent = contenidosPublicados;
                totalUsuariosEl.textContent = usuarios.length;
                totalCategoriasEl.textContent = categorias.length;
                totalMultimediaEl.textContent = multimedia.length;

            } catch (error) {
                // Si alguna de las promesas falla, se captura aquí
                console.error("Error cargando las estadísticas del dashboard:", error);
                Swal.fire('Error', 'No se pudieron cargar las estadísticas del dashboard.', 'error');

                // Mostrar un valor de error en las tarjetas
                totalContenidosEl.textContent = 'Error';
                totalUsuariosEl.textContent = 'Error';
                totalCategoriasEl.textContent = 'Error';
                totalMultimediaEl.textContent = 'Error';
            }
        };

        // Iniciar la carga de estadísticas al cargar la página
        cargarEstadisticas();
    });

})();
