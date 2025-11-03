<%@ Page Title="Intranet - Banchile Seguros" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CMSBanchileSEGUROS.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!-- Estilos específicos del portal, si fueran necesarios en el futuro -->
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container py-4">
        <header class="pb-3 mb-4 border-bottom">
            <a href='<%= ResolveUrl("~/Default.aspx") %>' class="d-flex align-items-center text-dark text-decoration-none">
                <img src='<%= ResolveUrl("~/wwwroot/img/banchile-corredores-de-seguro-logo.png") %>' alt="Logo" style="max-height: 50px;" class="me-3">
                <span class="fs-4">Portal de Contenidos</span>
            </a>
        </header>

        <div class="row">
            <!-- Columna de filtros -->
            <div class="col-md-3">
                <div class="card shadow-sm">
                    <div class="card-header fw-bold">
                        Categorías
                    </div>
                    <div class="list-group list-group-flush" id="lista-categorias">
                        <a href="#" class="list-group-item list-group-item-action active" data-id-categoria="">Todas</a>
                        <!-- Categorías se cargarán aquí -->
                    </div>
                </div>
            </div>

            <!-- Columna de contenidos -->
            <div class="col-md-9">
                <main id="contenedor-contenidos">
                    <div class="text-center p-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>

    <script src='<%= ResolveUrl("~/wwwroot/js/portal.js") %>'></script>
</asp:Content>
