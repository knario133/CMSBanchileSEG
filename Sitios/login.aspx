<%@ Page Title="Login - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* Estilos específicos para la página de login */
        body {
            background-color: #f0f2f5; /* Un fondo neutro */
        }
        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-card {
            max-width: 400px;
            width: 100%;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .login-logo {
            max-height: 60px;
            margin-bottom: 1.5rem;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid login-container">
        <div class="card login-card">
            <div class="card-body">
                <div class="text-center">
                    <img src='<%= ResolveUrl("~/wwwroot/img/banchile-corredores-de-seguro-logo.png") %>' alt="Logo Banchile" class="login-logo" />
                </div>
                <h5 class="card-title text-center mb-4">Inicio de Sesión</h5>

                <!-- Formulario de Login -->
                <div id="login-form">
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuario</label>
                        <input type="text" class="form-control" id="usuario" placeholder="Ingrese su usuario" required>
                    </div>
                    <div class="mb-3">
                        <label for="contrasena" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="contrasena" placeholder="Ingrese su contraseña" required>
                    </div>
                    <div class="d-grid">
                        <button type="button" id="login-button" class="btn btn-primary">Ingresar</button>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Script específico para la lógica de login -->
    <script src='<%= ResolveUrl("~/wwwroot/js/login.js") %>'></script>
</asp:Content>
