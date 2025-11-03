(function () {
    'use-strict';

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    document.addEventListener('DOMContentLoaded', function () {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const galeriaContainer = document.getElementById('galeria-multimedia');

        cargarMultimedia();

        // --- Eventos de subida de archivos ---
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

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // --- Funciones principales ---

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
            cargarMultimedia(); // Recargar galería después de subir
        }

        function uploadFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async () => {
                    const base64Data = reader.result.split(',')[1];
                    const multimediaData = {
                        Nombre: file.name,
                        TipoArchivo: file.type,
                        Base64: base64Data,
                        IdUsuario: app.userSession.IdUsuario
                    };

                    app.mostrarSpinner();
                    try {
                        const response = await fetch(API_URLS.multimedia.crear, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(multimediaData)
                        });
                        const result = await response.json();
                        if (result.Success) {
                            Swal.fire({ icon: 'success', title: 'Archivo subido', text: `${file.name} se ha subido correctamente.`, timer: 2000, showConfirmButton: false });
                            resolve();
                        } else {
                            Swal.fire('Error', `No se pudo subir ${file.name}.`, 'error');
                            reject();
                        }
                    } catch (error) {
                        console.error('Error al subir archivo:', error);
                        reject();
                    } finally {
                        app.ocultarSpinner();
                    }
                };
                reader.onerror = (error) => reject(error);
            });
        }

        async function cargarMultimedia() {
            app.mostrarSpinner();
            try {
                const response = await fetch(API_URLS.multimedia.listar);
                const result = await response.json();
                if (result.Success) {
                    renderizarGaleria(result.Data || []);
                } else {
                    Swal.fire('Error', 'No se pudieron cargar los archivos multimedia.', 'error');
                }
            } catch (error) {
                console.error('Error al cargar multimedia:', error);
            } finally {
                app.ocultarSpinner();
            }
        }

        function renderizarGaleria(multimedia) {
            galeriaContainer.innerHTML = '';
            if (multimedia.length === 0) {
                galeriaContainer.innerHTML = '<p class="text-center text-muted">No hay archivos multimedia. ¡Sube el primero!</p>';
                return;
            }

            multimedia.forEach(item => {
                const esImagen = item.TipoArchivo.startsWith('image');
                const src = `data:${item.TipoArchivo};base64,${item.Base64}`;

                const cardHtml = `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card gallery-card">
                            ${esImagen
                                ? `<a href="${src}" data-bs-toggle="tooltip" title="Ver imagen completa" target="_blank"><img src="${src}" class="card-img-top" alt="${item.Nombre}"></a>`
                                : `<div class="card-img-top pdf-icon text-danger"><a href="${src}" data-bs-toggle="tooltip" title="Abrir PDF" target="_blank"><i class="fas fa-file-pdf"></i></a></div>`
                            }
                            <div class="card-body">
                                <p class="card-text text-truncate" data-bs-toggle="tooltip" title="${item.Nombre}">${item.Nombre}</p>
                            </div>
                            <div class="card-footer text-center">
                                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${item.IdMultimedia}"><i class="fas fa-trash"></i> Eliminar</button>
                            </div>
                        </div>
                    </div>
                `;
                galeriaContainer.innerHTML += cardHtml;
            });
        }

        galeriaContainer.addEventListener('click', function(e) {
            const target = e.target.closest('.btn-eliminar');
            if (target) {
                eliminarMultimedia(target.dataset.id);
            }
        });

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
                            body: JSON.stringify({ IdMultimedia: id })
                        });
                        const res = await response.json();
                        if (res.Success) {
                            Swal.fire('Eliminado', 'El archivo ha sido eliminado.', 'success');
                            cargarMultimedia();
                        } else {
                            Swal.fire('Error', res.Message || 'No se pudo eliminar.', 'error');
                        }
                    } catch (error) {
                        console.error('Error al eliminar:', error);
                    } finally {
                        app.ocultarSpinner();
                    }
                }
            });
        }
    });
})();
