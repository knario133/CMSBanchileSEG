<%@ Page Title="Cerrando Sesión" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="logout.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.logout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container text-center py-5">
        <h2>Cerrando sesión...</h2>
        <p>Serás redirigido en unos momentos.</p>
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Limpiar la sesión del localStorage
            localStorage.removeItem('userSession');

            // Redirigir a la página de login después de un breve momento
            setTimeout(function () {
                window.location.href = '/Sitios/login.aspx';
            }, 1000); // 1 segundo de espera
        });
    </script>
</asp:Content>
