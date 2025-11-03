(function () {
    'use strict';
    // ... (constantes y listeners sin cambios)

    // ... (handleFiles y uploadFile sin cambios)

    function renderizarGaleria(multimedia) {
        const container = document.getElementById('galeria-multimedia');
        container.innerHTML = '';
        if (multimedia.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No hay archivos multimedia. ¡Sube el primero!</p>';
            return;
        }

        multimedia.forEach(item => {
            // CORRECCIÓN: Validar que el Base64 existe
            const base64Content = item.ArchivoBase64 || item.Base64;
            if (!base64Content) {
                console.error("El item multimedia no tiene contenido Base64:", item);
                return; // No renderizar esta tarjeta
            }

            const esImagen = item.TipoMIME.startsWith('image');
            const src = `data:${item.TipoMIME};base64,${base64Content}`;

            container.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card gallery-card">
                        ${esImagen
                            ? `<a href="${src}" target="_blank"><img src="${src}" class="card-img-top" alt="${item.NombreOriginal}"></a>`
                            : `<div class="card-img-top pdf-icon text-danger"><a href="${src}" target="_blank"><i class="fas fa-file-pdf"></i></a></div>`
                        }
                        <div class="card-body">
                            <p class="card-text text-truncate" title="${item.NombreOriginal}">${item.NombreOriginal}</p>
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${item.IdArchivo}"><i class="fas fa-trash"></i> Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // ... (demás funciones sin cambios)
})();
