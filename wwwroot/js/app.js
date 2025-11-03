// IIFE para encapsular el código global de la aplicación
(function () {
    'use strict';

    // --- ELEMENTOS DEL DOM ---
    const loadingOverlay = document.getElementById('loading-overlay');
    const usernameDisplay = document.getElementById('username-display');

    // --- GESTIÓN DE SESIÓN ---
    const userSession = JSON.parse(localStorage.getItem('userSession'));

    /**
     * Función para proteger rutas. Verifica si el usuario está autenticado.
     * Si no lo está, lo redirige a la página de login.
     * Se ejecuta en todas las páginas privadas.
     */
    function protegerRuta() {
        // La página de login no necesita protección
        if (window.location.pathname.toLowerCase().includes('login.aspx') || window.location.pathname.toLowerCase().includes('default.aspx')) {
            return;
        }

        if (!userSession) {
            console.log('Usuario no autenticado. Redirigiendo a login...');
            window.location.href = '/Sitios/login.aspx';
        }
    }

    /**
     * Muestra el nombre del usuario en el navbar si está autenticado.
     */
    function mostrarNombreUsuario() {
        if (userSession && usernameDisplay) {
            usernameDisplay.textContent = userSession.NombreCompleto || 'Usuario';
        }
    }


    // --- GESTIÓN DEL SPINNER DE CARGA ---

    /**
     * Muestra el overlay de carga.
     */
    function mostrarSpinner() {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
    }

    /**
     * Oculta el overlay de carga.
     */
    function ocultarSpinner() {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    // --- LÓGICA DE INICIALIZACIÓN ---

    // Se ejecuta cuando el DOM está completamente cargado.
    document.addEventListener('DOMContentLoaded', function () {
        protegerRuta();
        mostrarNombreUsuario();

        // Pequeño hack para manejar el logout en Template.Master
        const logoutButton = document.querySelector('a[href="/Sitios/logout.aspx"]');
        if (logoutButton) {
            logoutButton.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('userSession');
                window.location.href = '/Sitios/login.aspx';
            });
        }
    });

    // Exponer funciones globales para ser usadas en otros scripts
    window.app = {
        mostrarSpinner,
        ocultarSpinner,
        userSession
    };

})();
