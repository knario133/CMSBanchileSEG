(function () {
    'use strict';

    let tablaCategorias;
    let todasLasCategorias = [];

    document.addEventListener('DOMContentLoaded', function () {

        const tablaElement = document.getElementById('tabla-categorias');
        if (!tablaElement) {
            console.warn('No se encontró el elemento #tabla-categorias. Se cancela la inicialización de la página de categorías.');
            return;
        }

        const modalElement = document.getElementById('modal-categoria');
        const modal = modalElement ? new bootstrap.Modal(modalElement) : null;

        tablaCategorias = $('#tabla-categorias').DataTable({ /* ... */ });
        cargarCategorias();

        const btnNuevaCategoria = document.getElementById('btn-nueva-categoria');
        if (btnNuevaCategoria) {
            btnNuevaCategoria.addEventListener('click', function () {
                document.getElementById('form-categoria').reset();
                document.getElementById('categoria-id').value = '';
                document.getElementById('modal-categoria-label').textContent = 'Nueva Categoría';
                actualizarSelectPadre();
                if (modal) {
                    modal.show();
                }
            });
        }

        const btnGuardarCategoria = document.getElementById('btn-guardar-categoria');
        if (btnGuardarCategoria) {
            btnGuardarCategoria.addEventListener('click', guardarCategoria);
        }

        $('#tabla-categorias tbody').on('click', '.btn-editar', function () { abrirModalParaEditar($(this).data('id')); });
        $('#tabla-categorias tbody').on('click', '.btn-eliminar', function () { eliminarCategoria($(this).data('id')); });
    });

    async function guardarCategoria() {
        if (!document.getElementById('nombre-categoria').value.trim()) {
            Swal.fire('Campo requerido', 'El nombre de la categoría es obligatorio.', 'warning');
            return;
        }

        const categoriaData = {
            idCategoria: document.getElementById('categoria-id').value || 0,
            nombre: document.getElementById('nombre-categoria').value,
            descripcion: document.getElementById('descripcion-categoria').value || "", // CORRECCIÓN
            idCategoriaPadre: document.getElementById('categoria-padre').value || null
        };

        const url = categoriaData.idCategoria != 0 ? API_URLS.categoria.actualizar : API_URLS.categoria.crear;
        app.mostrarSpinner();
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoriaData)
            });
            // ... (manejo de respuesta sin cambios)
        } catch (error) { /* ... */ } finally { app.ocultarSpinner(); }
    }

    function eliminarCategoria(id) {
        Swal.fire({ /* ... */ }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.categoria.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idCategoria: id }) // CORRECCIÓN
                    });
                    // ... (manejo de respuesta sin cambios)
                } catch (error) { /* ... */ } finally { app.ocultarSpinner(); }
            }
        });
    }

    // Las demás funciones no envían payloads y no necesitan cambios.
    // ...
})();

$(document).ready(function () {
    $('#tabla-categorias').DataTable();
});
