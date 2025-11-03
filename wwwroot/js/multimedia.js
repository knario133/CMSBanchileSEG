(function () {
    'use strict';

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    document.addEventListener('DOMContentLoaded', function () {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const galeriaContainer = document.getElementById('galeria-multimedia');

        if (!uploadArea || !fileInput || !galeriaContainer) {
            return;
        }

        cargarMultimedia();

        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.add('bg-light'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('bg-light'), false);
        });

        uploadArea.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files), false);

        galeriaContainer.addEventListener('click', function (e) {
            const target = e.target.closest('.btn-eliminar');
            if (target) {
                eliminarMultimedia(target.dataset.id);
            }
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

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
                        nombreOriginal: file.name,
                        tipoMIME: file.type,
                        archivoBase64: base64Data,
                        idUsuarioSubio: app.userSession ? app.userSession.IdUsuario : 0
                    };

                    app.mostrarSpinner();
                    try {
                        const response = await app.apiFetch('Multimedia - Subir', API_URLS.multimedia.crear, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(multimediaData)
                        });
                        const result = await response.json();
                        if (result.Respuesta && !result.Respuesta.Error) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Archivo subido',
                                text: `${file.name} se ha subido correctamente.`,
                                timer: 2000,
                                showConfirmButton: false
                            });
                            resolve();
                        } else {
                            Swal.fire('Error', result.Respuesta?.Message || `No se pudo subir ${file.name}.`, 'error');
                            reject(new Error(result.Respuesta?.Message || 'Error al subir archivo'));
                        }
                    } catch (error) {
                        app.logException('Multimedia - uploadFile', error);
                        Swal.fire('Error', 'Ocurrió un problema al subir el archivo.', 'error');
                        reject(error);
                    } finally {
                        app.ocultarSpinner();
                    }
                };
                reader.onerror = (error) => {
                    app.logException('Multimedia - FileReader', error);
                    reject(error);
                };
            });
        }

        async function cargarMultimedia() {
            app.mostrarSpinner();
            try {
                const response = await app.apiFetch('Multimedia - Listar', API_URLS.multimedia.listar);
                const result = await response.json();
                if (result.Respuesta && !result.Respuesta.Error) {
                    renderizarGaleria(result.Respuesta.Resultado || []);
                } else {
                    Swal.fire('Error', result.Respuesta?.Message || 'No se pudieron cargar los archivos multimedia.', 'error');
                }
            } catch (error) {
                app.logException('Multimedia - cargarMultimedia', error);
                Swal.fire('Error', 'Ocurrió un problema al cargar los archivos multimedia.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        }

        function renderizarGaleria(multimedia) {
            galeriaContainer.innerHTML = '';
            if (!multimedia.length) {
                galeriaContainer.innerHTML = '<p class="text-center text-muted">No hay archivos multimedia. ¡Sube el primero!</p>';
                return;
            }

            multimedia.forEach(item => {
                const tipoArchivo = item.TipoArchivo || item.TipoMIME || '';
                const nombreArchivo = item.Nombre || item.NombreOriginal || item.NombreArchivo || 'Archivo';
                const base64 = item.Base64 || item.ArchivoBase64 || '';
                const idMultimedia = item.IdMultimedia || item.IdArchivo || item.Id || 0;
                const esImagen = tipoArchivo.startsWith('image');
                const src = base64 ? `data:${tipoArchivo};base64,${base64}` : '';
                const cardHtml = `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card gallery-card">
                            ${esImagen
                                ? `<a href="${src}" data-bs-toggle="tooltip" title="Ver imagen completa" target="_blank"><img src="${src}" class="card-img-top" alt="${nombreArchivo}"></a>`
                                : `<div class="card-img-top pdf-icon text-danger"><a href="${src}" data-bs-toggle="tooltip" title="Abrir archivo" target="_blank"><i class="fas fa-file-pdf fa-4x"></i></a></div>`
                            }
                            <div class="card-body">
                                <p class="card-text text-truncate" data-bs-toggle="tooltip" title="${nombreArchivo}">${nombreArchivo}</p>
                            </div>
                            <div class="card-footer text-center">
                                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${idMultimedia}"><i class="fas fa-trash"></i> Eliminar</button>
                            </div>
                        </div>
                    </div>`;
                galeriaContainer.insertAdjacentHTML('beforeend', cardHtml);
            });
        }

        function eliminarMultimedia(id) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'El archivo se eliminará permanentemente.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, eliminar'
            }).then(async (result) => {
                if (!result.isConfirmed) {
                    return;
                }

                app.mostrarSpinner();
                try {
                    const response = await app.apiFetch('Multimedia - Eliminar', API_URLS.multimedia.eliminar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idArchivo: id })
                    });
                    const res = await response.json();

                    if (res.Respuesta && !res.Respuesta.Error) {
                        Swal.fire('Eliminado', 'El archivo ha sido eliminado.', 'success');
                        cargarMultimedia();
                    } else {
                        Swal.fire('Error', res.Respuesta?.Message || 'No se pudo eliminar.', 'error');
                    }
                } catch (error) {
                    app.logException('Multimedia - eliminarMultimedia', error);
                    Swal.fire('Error', 'Ocurrió un problema al eliminar el archivo.', 'error');
                } finally {
                    app.ocultarSpinner();
                }
            });
        }
    });
})();
