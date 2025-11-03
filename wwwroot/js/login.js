(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        const loginButton = document.getElementById('login-button');
        const usuarioInput = document.getElementById('usuario');
        const contrasenaInput = document.getElementById('contrasena');

        if (localStorage.getItem('userSession')) {
            window.location.href = window.appBasePath + 'Sitios/admin.aspx';
        }

        const handleLogin = async () => {
            const usuario = usuarioInput.value.trim();
            const contrasena = contrasenaInput.value.trim();

            if (!usuario || !contrasena) {
                Swal.fire('Campos vacíos', 'Por favor, ingrese su usuario y contraseña', 'warning');
                return;
            }

            app.mostrarSpinner();

            try {
                const response = await fetch(API_URLS.usuario.login, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario: usuario, password: contrasena }) // CORRECCIÓN
                });

                const result = await response.json();

                if (result.Respuesta && !result.Respuesta.Error && result.Respuesta.Resultado && result.Respuesta.Resultado.length > 0) {

                    const userData = result.Respuesta.Resultado[0];
                    localStorage.setItem('userSession', JSON.stringify(userData));

                    Swal.fire({
                        title: '¡Bienvenido!', text: 'Inicio de sesión exitoso.', icon: 'success',
                        timer: 1500, showConfirmButton: false
                    }).then(() => {
                        window.location.href = window.appBasePath + 'Sitios/admin.aspx';
                    });

                } else {
                    Swal.fire('Error de autenticación', result.Respuesta.Message || 'Usuario o contraseña incorrectos.', 'error');
                }

            } catch (error) {
                console.error('Error en el proceso de login:', error);
                Swal.fire('Error', 'Ocurrió un problema al intentar iniciar sesión.', 'error');
            } finally {
                app.ocultarSpinner();
            }
        };

        loginButton.addEventListener('click', handleLogin);

        contrasenaInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });
        usuarioInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });
    });

})();
