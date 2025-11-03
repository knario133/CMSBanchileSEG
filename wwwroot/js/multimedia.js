(function () {
    'use strict';

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    document.addEventListener('DOMContentLoaded', function () {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const galeriaContainer = document.getElementById('galeria-multimedia');

        cargarMultimedia();

        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.add('bg-light'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('bg-light'), false);
        });

        uploadArea.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files), false);

        galeriaContainer.addEventListener('click', function(e) {
            const target = e.target.closest('.btn-eliminar');
            if (target) eliminarMultimedia(target.dataset.id);
        });
    });

    async function handleFiles(files) {
        for (const file of files) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                Swal.fire('Tipo no permitido', `El archivo ${file.name} no es un JPG, PNG o PDF.`, 'warning');
                continue;
            }
            if (file.size > MAX_FILE_SIZE) {
                Swal.fire('Tamaño excedido', `El archivo ${file.name} supera los 5 MB.`, 'warning');
                continue;
            }
            await uploadFile(file);
        }
        cargarMultimedia();
    }

    function uploadFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Data = reader.result.split(',')[1];
                const multimediaData = {
                    nombreOriginal: file.name,     // CORRECCIÓN
                    tipoMIME: file.type,           // CORRECCIÓN
                    archivoBase64: base64Data,     // CORRECCIÓN
                    idUsuarioSubio: app.userSession.IdUsuario // CORRECCIÓN
                };

                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.multimedia.crear, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(multimediaData)
                    });
                    const result = await response.json();
                    if (result.Respuesta && !result.Respuesta.Error) {
                        Swal.fire({ icon: 'success', title: 'Archivo subido', text: `${file.name} se ha subido correctamente.`, timer: 2000, showConfirmButton: false });
                        resolve();
                    } else {
                        Swal.fire('Error', `No se pudo subir ${file.name}.`, 'error');
                        console.error("Error handler multimedia:", result.Respuesta.Message);
                        reject();
                    }
                } catch (error) {
                    console.error('Error de red al subir archivo:', error);
                    reject();
                } finally {
                    app.ocultarSpinner();
                }
            };
            reader.onerror = (error) => {
                console.error("Error de FileReader:", error);
                reject(error);
            };
        });
    }

    async function cargarMultimedia() {
        // ... (sin cambios en el payload) ...
    }

    function renderizarGaleria(multimedia) {
        // ... (sin cambios en el payload) ...
    }

    function eliminarMultimedia(id) {
        Swal.fire({
            title: '¿Estás seguro?', text: "El archivo se eliminará permanentemente.", icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                app.mostrarSpinner();
                try {
                    const response = await fetch(API_URLS.multimedia.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idArchivo: id }) // CORRECCIÓN
                    });
                    const res = await response.json();
                    if (res.Respuesta && !res.Respuesta.Error) {
                        Swal.fire('Eliminado', 'El archivo ha sido eliminado.', 'success');
                        cargarMultimedia();
                    } else {
                        Swal.fire('Error', res.Respuesta.Message || 'No se pudo eliminar.', 'error');
                    }
                } catch (error) {
                    console.error('Error de red al eliminar:', error);
                } finally {
                    app.ocultarSpinner();
                }
            }
        });
    }

    async function cargarMultimedia() {
        app.mostrarSpinner();
        try {
            const response = await fetch(API_URLS.multimedia.listar);
            const result = await response.json();
            if (result.Respuesta && !result.Respuesta.Error) {
                renderizarGaleria(result.Respuesta.Resultado || []);
            } else {
                Swal.fire('Error', 'No se pudieron cargar los archivos multimedia.', 'error');
                console.error("Error handler multimedia:", result.Respuesta.Message);
            }
        } catch (error) {
            console.error('Error de red al cargar multimedia:', error);
        } finally {
            app.ocultarSpinner();
        }
    }

    function renderizarGaleria(multimedia) {
        const container = document.getElementById('galeria-multimedia');
        container.innerHTML = '';
        if (multimedia.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No hay archivos multimedia. ¡Sube el primero!</p>';
            return;
        }

        multimedia.forEach(item => {
            const esImagen = item.TipoMIME.startsWith('image');
            const src = `data:${item.TipoMIME};base64,${item.ArchivoBase64 || item.Base64}`;

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
})();
