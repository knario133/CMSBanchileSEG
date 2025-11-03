(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const listaCategoriasContainer = document.getElementById('lista-categorias');
        const contenedorContenidos = document.getElementById('contenedor-contenidos');
        let todasLasCategorias = [];

        // --- Carga inicial ---
        cargarCategorias();
        cargarContenidos(); // Carga inicial de todos los contenidos publicados

        // --- Eventos ---
        listaCategoriasContainer.addEventListener('click', function(e) {
            e.preventDefault();
            const target = e.target;
            if (target.classList.contains('list-group-item')) {
                // Marcar como activo
                this.querySelector('.active').classList.remove('active');
                target.classList.add('active');

                const idCategoria = target.dataset.idCategoria;
                cargarContenidos(idCategoria);
            }
        });

        // --- Funciones de Carga de Datos ---

        async function cargarCategorias() {
            try {
                const response = await fetch(API_URLS.categoria.listar);
                const result = await response.json();
                if (result.Success && result.Data) {
                    todasLasCategorias = result.Data;
                    renderizarCategorias(todasLasCategorias);
                }
            } catch (error) {
                console.error('Error al cargar categorías:', error);
                listaCategoriasContainer.innerHTML += '<p class="p-3 text-danger">No se pudieron cargar las categorías.</p>';
            }
        }

        async function cargarContenidos(idCategoria = '') {
            contenedorContenidos.innerHTML = `
                <div class="text-center p-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>`;

            const url = idCategoria
                ? `${API_URLS.contenido.listarPorCategoria}?idCategoria=${idCategoria}`
                : API_URLS.contenido.listar;

            try {
                const response = await fetch(url);
                const result = await response.json();
                if (result.Success && result.Data) {
                    // Filtrar solo los publicados
                    const contenidosPublicados = result.Data.filter(c => c.Estado === 'Publicado');
                    renderizarContenidos(contenidosPublicados);
                } else {
                     throw new Error(result.Message || 'Error desconocido');
                }
            } catch (error) {
                console.error('Error al cargar contenidos:', error);
                contenedorContenidos.innerHTML = '<p class="p-3 text-danger">No se pudieron cargar los contenidos.</p>';
            }
        }

        // --- Funciones de Renderizado ---

        function renderizarCategorias(categorias) {
            categorias.forEach(cat => {
                const item = document.createElement('a');
                item.href = '#';
                item.className = 'list-group-item list-group-item-action';
                item.dataset.idCategoria = cat.IdCategoria;
                item.textContent = cat.Nombre;
                listaCategoriasContainer.appendChild(item);
            });
        }

        function renderizarContenidos(contenidos) {
            if (contenidos.length === 0) {
                contenedorContenidos.innerHTML = '<div class="alert alert-info">No hay contenidos publicados en esta categoría.</div>';
                return;
            }

            let html = '';
            contenidos.forEach(contenido => {
                const categoria = todasLasCategorias.find(c => c.IdCategoria === contenido.IdCategoria);
                html += `
                    <article class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h2 class="card-title">${contenido.Titulo}</h2>
                            <p class="card-subtitle mb-2 text-muted">
                                Publicado el ${new Date(contenido.FechaCreacion).toLocaleDateString()}
                                ${categoria ? `en <strong>${categoria.Nombre}</strong>` : ''}
                            </p>
                            <div class="card-text">
                                ${contenido.CuerpoHTML}
                            </div>
                        </div>
                    </article>
                `;
            });
            contenedorContenidos.innerHTML = html;
        }
    });
})();
