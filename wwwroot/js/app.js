// IIFE para encapsular el código global de la aplicación
(function () {
    'use strict';

    // --- ELEMENTOS DEL DOM ---
    const loadingOverlay = document.getElementById('loading-overlay');
    const usernameDisplay = document.getElementById('username-display');
    const mainNavbar = document.getElementById('main-navbar');
    const logoutButton = document.getElementById('logout-button');

    // --- GESTIÓN DE SESIÓN ---
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const isPublicPage = window.location.pathname.toLowerCase().includes('login.aspx') || window.location.pathname.toLowerCase().includes('default.aspx');


    /**
     * Gestiona la visibilidad de la barra de navegación y la protección de rutas.
     */
    function setupUIAndSecurity() {
        if (isPublicPage) {
            // Ocultar la navbar principal en páginas públicas
            if (mainNavbar) mainNavbar.style.display = 'none';
            // Quitar el padding del body en páginas públicas
            document.body.style.paddingTop = '0';
        } else {
            // Es una página privada, verificar sesión
            if (!userSession) {
                console.log('Usuario no autenticado. Redirigiendo a login...');
                window.location.href = '/Sitios/login.aspx';
                return; // Detener ejecución para evitar mostrar la página
            }
            // Si hay sesión, mostrar la navbar y el nombre de usuario
            if (mainNavbar) mainNavbar.style.display = 'flex';
            if (usernameDisplay) usernameDisplay.textContent = userSession.NombreCompleto || 'Usuario';
        }
    }


    // --- GESTIÓN DEL SPINNER DE CARGA ---

    /** Muestra el overlay de carga. */
    function mostrarSpinner() {
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
    }

    /** Oculta el overlay de carga. */
    function ocultarSpinner() {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }

    // --- LÓGICA DE INICIALIZACIÓN ---

    document.addEventListener('DOMContentLoaded', function () {
        setupUIAndSecurity();

        // Manejar el logout
        if (logoutButton) {
            logoutButton.addEventListener('click', function (e) {
                e.preventDefault();
                Swal.fire({
                    title: '¿Cerrar sesión?',
                    text: "¿Estás seguro de que quieres salir?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, cerrar sesión',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('userSession');
                        window.location.href = '/Sitios/login.aspx';
                    }
                });
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
