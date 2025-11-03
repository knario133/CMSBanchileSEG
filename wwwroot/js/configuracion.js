(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const btnGuardar = document.getElementById('btn-guardar-configuracion');

        // Cargar configuraciones existentes (función placeholder)
        cargarConfiguraciones();

        btnGuardar.addEventListener('click', function() {
            // Lógica para guardar (función placeholder)
            guardarConfiguraciones();
        });
    });

    /**
     * Carga las configuraciones actuales desde el backend.
     * Es una función placeholder.
     */
    function cargarConfiguraciones() {
        console.log('Intentando cargar configuraciones...');
        // Aquí iría una llamada a un handler como API_URLS.config.obtener

        // Simulación de datos cargados
        document.getElementById('titulo-sitio').value = 'Intranet Corporativa Banchile';
        document.getElementById('email-contacto').value = 'soporte.ti@banchile.cl';
    }

    /**
     * Guarda las configuraciones en el backend.
     * Es una función placeholder.
     */
    function guardarConfiguraciones() {
        const configData = {
            tituloSitio: document.getElementById('titulo-sitio').value,
            colorPrimario: document.getElementById('color-primario').value,
            emailContacto: document.getElementById('email-contacto').value,
        };

        console.log('Guardando configuraciones:', configData);

        // Aquí iría una llamada a un handler como API_URLS.config.guardar

        Swal.fire({
            title: 'Funcionalidad no implementada',
            text: 'Los handlers para guardar la configuración aún no están disponibles en el backend.',
            icon: 'info',
            confirmButtonText: 'Entendido'
        });
    }

})();
