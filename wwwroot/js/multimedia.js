(function () {
    'use strict';

    if (!window.apiService || !window.API_URLS || !window.app) {
        console.error('Dependencias requeridas no disponibles (apiService, API_URLS o app).');
        return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'application/pdf']);

    let multimediaItems = [];
    let modalInstance = null;
    let uploadArea = null;
    let fileInput = null;
    let progressContainer = null;
    let progressBar = null;

    document.addEventListener('DOMContentLoaded', () => {
        const gallery = document.getElementById('galeria-multimedia');
        if (!gallery) {
            console.warn('No se encontró el contenedor de la galería multimedia.');
            return;
        }

        uploadArea = document.getElementById('upload-area');
        fileInput = document.getElementById('file-input');
        progressContainer = document.getElementById('upload-progress-container');
        progressBar = document.getElementById('upload-progress');

        const modalElement = document.getElementById('modal-multimedia');
        if (modalElement && window.bootstrap?.Modal) {
            modalInstance = new bootstrap.Modal(modalElement);
        }

        inicializarZonaDeCarga();
        gallery.addEventListener('click', manejarClickGaleria);
        document.getElementById('btn-guardar-multimedia')?.addEventListener('click', guardarCambios);

        cargarMultimedia();
    });

    function inicializarZonaDeCarga() {
        if (!uploadArea || !fileInput) {
            return;
        }

        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            uploadArea.classList.add('dragover');
        });
        uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
        uploadArea.addEventListener('drop', (event) => {
            event.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = event.dataTransfer?.files;
            if (files?.length) {
                handleFiles(files);
            }
        });

        fileInput.addEventListener('change', (event) => {
            const files = event.target.files;
            if (files?.length) {
                handleFiles(files);
            }
            event.target.value = '';
        });
    }

    async function cargarMultimedia() {
        app.mostrarSpinner();
        try {
            const listado = await apiService.post(API_URLS.multimedia.listar, {});
            const items = Array.isArray(listado) ? listado : [];

            const itemsConContenido = [];
            for (const item of items) {
                itemsConContenido.push(await obtenerItemConContenido(item));
            }

            multimediaItems = itemsConContenido;
            renderizarGaleria(multimediaItems);
        } catch (error) {
            console.error('Error al cargar la galería multimedia:', error);
            Swal.fire('Error', `No se pudo cargar la galería multimedia. ${error.message}`, 'error');
            renderizarGaleria([]);
        } finally {
            app.ocultarSpinner();
        }
    }

    async function obtenerItemConContenido(item) {
        try {
            const detalleRespuesta = await apiService.post(API_URLS.multimedia.obtenerPorId, { idArchivo: item.IdArchivo });
            const detalle = Array.isArray(detalleRespuesta) ? detalleRespuesta[0] : null;
            if (!detalle) {
                return { ...item, ArchivoBase64: null };
            }
            return {
                ...item,
                ArchivoBase64: detalle.ArchivoBase64 || null,
                TipoMIME: detalle.TipoMIME || item.TipoMIME
            };
        } catch (error) {
            console.warn(`No se pudo obtener el detalle del archivo ${item.IdArchivo}:`, error);
            return { ...item, ArchivoBase64: null };
        }
    }

    function renderizarGaleria(multimedia) {
        const container = document.getElementById('galeria-multimedia');
        if (!container) {
            return;
        }

        container.innerHTML = '';

        if (!Array.isArray(multimedia) || multimedia.length === 0) {
            container.innerHTML = '<p class="text-center text-muted my-4">No hay archivos multimedia. ¡Sube el primero!</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        multimedia.forEach((item) => {
            const columna = document.createElement('div');
            columna.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

            const nombreSeguro = escapeHtml(item.NombreOriginal || 'Archivo');
            const previewMarkup = obtenerMarkupPreview(item, nombreSeguro);
            const fechaMarkup = formatearFecha(item.FechaSubida);

            columna.innerHTML = `
                <div class="card gallery-card h-100">
                    ${previewMarkup}
                    <div class="card-body">
                        <p class="card-text text-truncate" title="${nombreSeguro}">${nombreSeguro}</p>
                        ${fechaMarkup ? `<small class=\"text-muted d-block\">Subido el ${fechaMarkup}</small>` : ''}
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm btn-outline-primary btn-editar" data-id="${item.IdArchivo}"><i class="fas fa-edit me-1"></i>Editar</button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${item.IdArchivo}"><i class="fas fa-trash me-1"></i>Eliminar</button>
                    </div>
                </div>`;

            fragment.appendChild(columna);
        });

        container.appendChild(fragment);
    }

    function obtenerMarkupPreview(item, nombreSeguro) {
        const base64 = item.ArchivoBase64 || item.Base64 || '';
        const mimeType = item.TipoMIME || 'application/octet-stream';

        if (!base64) {
            return '<div class="card-img-top d-flex align-items-center justify-content-center bg-light text-muted" style="height: 150px;">Vista previa no disponible</div>';
        }

        const src = `data:${mimeType};base64,${base64}`;

        if (mimeType.startsWith('image/')) {
            return `<a href="${src}" target="_blank" rel="noopener"><img src="${src}" class="card-img-top" alt="${nombreSeguro}"></a>`;
        }

        if (mimeType === 'application/pdf') {
            return `<div class="card-img-top pdf-icon text-danger d-flex align-items-center justify-content-center"><a href="${src}" target="_blank" rel="noopener" class="text-danger"><i class="fas fa-file-pdf"></i></a></div>`;
        }

        return `<div class="card-img-top d-flex align-items-center justify-content-center bg-light" style="height: 150px;"><a href="${src}" target="_blank" rel="noopener">Ver archivo</a></div>`;
    }

    function manejarClickGaleria(event) {
        const botonEliminar = event.target.closest('.btn-eliminar');
        if (botonEliminar) {
            const id = Number.parseInt(botonEliminar.dataset.id, 10);
            if (!Number.isNaN(id)) {
                eliminarArchivo(id);
            }
            return;
        }

        const botonEditar = event.target.closest('.btn-editar');
        if (botonEditar) {
            const id = Number.parseInt(botonEditar.dataset.id, 10);
            if (!Number.isNaN(id)) {
                abrirModalEditar(id);
            }
        }
    }

    function abrirModalEditar(id) {
        const multimedia = multimediaItems.find(item => item.IdArchivo === id);
        if (!multimedia) {
            Swal.fire('Error', 'No se pudo encontrar la información del archivo seleccionado.', 'error');
            return;
        }

        document.getElementById('multimedia-id').value = multimedia.IdArchivo;
        document.getElementById('nombre-multimedia').value = multimedia.NombreOriginal || '';

        modalInstance?.show();
    }

    async function guardarCambios() {
        const id = Number.parseInt(document.getElementById('multimedia-id').value, 10);
        const nombre = document.getElementById('nombre-multimedia').value.trim();

        if (!id) {
            Swal.fire('Error', 'No se identificó el archivo a actualizar.', 'error');
            return;
        }

        if (!nombre) {
            Swal.fire('Campo requerido', 'Ingresa un nombre para el archivo.', 'warning');
            return;
        }

        app.mostrarSpinner();
        try {
            await apiService.post(API_URLS.multimedia.actualizar, {
                idArchivo: id,
                nombreOriginal: nombre
            });
            Swal.fire('Actualizado', 'La información del archivo se actualizó correctamente.', 'success');
            modalInstance?.hide();
            await cargarMultimedia();
        } catch (error) {
            Swal.fire('Error', `No se pudo actualizar el archivo. ${error.message}`, 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function validarArchivo(file) {
        if (!ALLOWED_TYPES.has(file.type)) {
            return 'El tipo de archivo no está permitido. Solo se aceptan imágenes JPG, PNG o documentos PDF.';
        }
        if (file.size > MAX_FILE_SIZE) {
            return 'El archivo supera el tamaño máximo permitido de 5 MB.';
        }
        return null;
    }

    async function handleFiles(fileList) {
        const files = Array.from(fileList);
        if (!files.length) {
            return;
        }

        if (!app.userSession || !app.userSession.IdUsuario) {
            Swal.fire('Sesión requerida', 'Debes iniciar sesión nuevamente para subir archivos.', 'warning');
            return;
        }

        let huboCambios = false;
        for (const file of files) {
            const errorValidacion = validarArchivo(file);
            if (errorValidacion) {
                Swal.fire('Archivo no válido', `${file.name}: ${errorValidacion}`, 'warning');
                continue;
            }

            const exito = await subirArchivo(file);
            if (exito) {
                huboCambios = true;
            }
        }

        if (huboCambios) {
            await cargarMultimedia();
        }
    }

    async function subirArchivo(file) {
        mostrarProgreso(10);
        try {
            const base64DataUrl = await leerArchivoComoBase64(file);
            mostrarProgreso(60);
            const base64 = extraerBase64(base64DataUrl);

            await apiService.post(API_URLS.multimedia.crear, {
                nombreOriginal: file.name,
                archivoBase64: base64,
                tipoMIME: file.type,
                idUsuarioSubio: app.userSession.IdUsuario
            });

            mostrarProgreso(100);
            Swal.fire('Archivo cargado', `"${file.name}" se subió correctamente.`, 'success');
            return true;
        } catch (error) {
            console.error('Error al subir archivo:', error);
            Swal.fire('Error', `No se pudo subir "${file.name}". ${error.message}`, 'error');
            return false;
        } finally {
            ocultarProgresoConRetardo();
        }
    }

    function mostrarProgreso(valor) {
        if (!progressContainer || !progressBar) {
            return;
        }
        progressContainer.style.display = 'block';
        progressBar.style.width = `${valor}%`;
        progressBar.setAttribute('aria-valuenow', valor.toString());
        progressBar.textContent = `${valor}%`;
    }

    function ocultarProgresoConRetardo() {
        if (!progressContainer || !progressBar) {
            return;
        }
        setTimeout(() => {
            progressContainer.style.display = 'none';
            progressBar.style.width = '0%';
            progressBar.setAttribute('aria-valuenow', '0');
            progressBar.textContent = '';
        }, 400);
    }

    function leerArchivoComoBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
            reader.readAsDataURL(file);
        });
    }

    function extraerBase64(dataUrl) {
        if (typeof dataUrl !== 'string') {
            return '';
        }
        const comaIndex = dataUrl.indexOf(',');
        return comaIndex >= 0 ? dataUrl.substring(comaIndex + 1) : dataUrl;
    }

    async function eliminarArchivo(id) {
        const resultado = await Swal.fire({
            title: '¿Eliminar archivo?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!resultado.isConfirmed) {
            return;
        }

        app.mostrarSpinner();
        try {
            await apiService.post(API_URLS.multimedia.eliminar, { idArchivo: id });
            Swal.fire('Eliminado', 'El archivo se eliminó correctamente.', 'success');
            await cargarMultimedia();
        } catch (error) {
            Swal.fire('Error', `No se pudo eliminar el archivo. ${error.message}`, 'error');
        } finally {
            app.ocultarSpinner();
        }
    }

    function formatearFecha(fecha) {
        if (!fecha) {
            return '';
        }
        try {
            const date = new Date(fecha);
            if (Number.isNaN(date.getTime())) {
                return '';
            }
            return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (error) {
            console.warn('No se pudo formatear la fecha:', fecha, error);
            return '';
        }
    }

    function escapeHtml(text) {
        if (!text) {
            return '';
        }
        return text.replace(/[&<>"']/g, (char) => {
            switch (char) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#39;';
                default: return char;
            }
        });
    }

})();
