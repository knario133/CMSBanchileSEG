(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const listaCategoriasContainer = document.getElementById('lista-categorias');
        const contenedorContenidos = document.getElementById('contenedor-contenidos');
        const plantillaSkeleton = `
            <div class="text-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>`;

        let todasLasCategorias = [];

        cargarCategorias();
        cargarContenidos();

        listaCategoriasContainer.addEventListener('click', function (e) {
            const target = e.target.closest('.list-group-item');
            if (!target) {
                return;
            }
            e.preventDefault();
            const activo = this.querySelector('.active');
            if (activo) {
                activo.classList.remove('active');
            }
            target.classList.add('active');
            const idCategoria = target.dataset.idCategoria || '';
            cargarContenidos(idCategoria);
        });

        async function cargarCategorias() {
            try {
                const response = await app.apiFetch('Portal - Listar Categorías', API_URLS.categoria.listar);
                const result = await response.json();
                if (result.Respuesta && !result.Respuesta.Error) {
                    todasLasCategorias = result.Respuesta.Resultado || [];
                    renderizarCategorias(todasLasCategorias);
                } else {
                    throw new Error(result.Respuesta?.Message || 'Respuesta inválida');
                }
            } catch (error) {
                app.logException('Portal - cargarCategorias', error);
                listaCategoriasContainer.insertAdjacentHTML('beforeend', '<p class="p-3 text-danger">No se pudieron cargar las categorías.</p>');
            }
        }

        async function cargarContenidos(idCategoria = '') {
            contenedorContenidos.innerHTML = plantillaSkeleton;
            const url = idCategoria
                ? `${API_URLS.contenido.listarPorCategoria}?idCategoria=${idCategoria}`
                : API_URLS.contenido.listar;

            try {
                const response = await app.apiFetch('Portal - Listar Contenido', url);
                const result = await response.json();
                if (result.Respuesta && !result.Respuesta.Error) {
                    const contenidos = (result.Respuesta.Resultado || []).filter(c => (c.Estado || c.estado) === 'Publicado');
                    renderizarContenidos(contenidos);
                } else {
                    throw new Error(result.Respuesta?.Message || 'No se pudo cargar el contenido.');
                }
            } catch (error) {
                app.logException('Portal - cargarContenidos', error);
                contenedorContenidos.innerHTML = '<p class="p-3 text-danger">No se pudieron cargar los contenidos.</p>';
            }
        }

        function renderizarCategorias(categorias) {
            listaCategoriasContainer.innerHTML = '';
            categorias.forEach((cat, index) => {
                const item = document.createElement('a');
                item.href = '#';
                item.className = 'list-group-item list-group-item-action';
                if (index === 0) {
                    item.classList.add('active');
                }
                item.dataset.idCategoria = cat.IdCategoria;
                item.textContent = cat.Nombre;
                listaCategoriasContainer.appendChild(item);
            });
        }

        function renderizarContenidos(contenidos) {
            if (!contenidos.length) {
                contenedorContenidos.innerHTML = '<div class="alert alert-info">No hay contenidos publicados en esta categoría.</div>';
                return;
            }

            const html = contenidos.map(contenido => {
                const categoria = todasLasCategorias.find(c => c.IdCategoria === contenido.IdCategoria);
                const fecha = contenido.FechaCreacion ? new Date(contenido.FechaCreacion).toLocaleDateString() : '';
                return `
                    <article class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h2 class="card-title">${contenido.Titulo}</h2>
                            <p class="card-subtitle mb-2 text-muted">
                                ${fecha ? `Publicado el ${fecha}` : ''}
                                ${categoria ? ` en <strong>${categoria.Nombre}</strong>` : ''}
                            </p>
                            <div class="card-text">
                                ${contenido.CuerpoHTML || ''}
                            </div>
                        </div>
                    </article>`;
            }).join('');

            contenedorContenidos.innerHTML = html;
        }
    });
})();
