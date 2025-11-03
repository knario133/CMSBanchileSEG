(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const totalContenidosEl = document.getElementById('total-contenidos');
        const totalUsuariosEl = document.getElementById('total-usuarios');
        const totalCategoriasEl = document.getElementById('total-categorias');
        const totalMultimediaEl = document.getElementById('total-multimedia');

        async function fetchData(nombre, url) {
            try {
                const response = await app.apiFetch(nombre, url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const result = await response.json();
                if (result.Respuesta && !result.Respuesta.Error) {
                    return result.Respuesta.Resultado || [];
                }
                throw new Error(result.Respuesta?.Message || 'Respuesta inválida');
            } catch (error) {
                app.logException(`Dashboard - ${nombre}`, error);
                return [];
            }
        }

        async function cargarEstadisticas() {
            const [contenidos, usuarios, categorias, multimedia] = await Promise.all([
                fetchData('Dashboard - Contenidos', API_URLS.contenido.listar),
                fetchData('Dashboard - Usuarios', API_URLS.usuario.listar),
                fetchData('Dashboard - Categorías', API_URLS.categoria.listar),
                fetchData('Dashboard - Multimedia', API_URLS.multimedia.listar)
            ]);

            if (totalContenidosEl) {
                const publicados = contenidos.filter(c => (c.Estado || c.estado) === 'Publicado').length;
                totalContenidosEl.textContent = publicados;
            }
            if (totalUsuariosEl) {
                totalUsuariosEl.textContent = usuarios.length;
            }
            if (totalCategoriasEl) {
                totalCategoriasEl.textContent = categorias.length;
            }
            if (totalMultimediaEl) {
                totalMultimediaEl.textContent = multimedia.length;
            }
        }

        cargarEstadisticas();
    });
})();
