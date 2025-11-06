<%@ Page Title="Dashboard - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="admin.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.admin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .dashboard-card { transition: transform 0.2s; }
        .dashboard-card:hover { transform: translateY(-5px); }
        .dashboard-card .card-body { display: flex; justify-content: space-between; align-items: center; }
        .dashboard-card .card-text { font-size: 1.5rem; font-weight: bold; }
        .dashboard-card .icon { font-size: 3rem; opacity: 0.3; }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1 class="mb-4">Dashboard</h1>
    <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2 dashboard-card">
                <div class="card-body">
                    <div>
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Contenidos Publicados</div>
                        <div id="total-contenidos" class="h5 mb-0 font-weight-bold text-gray-800"><asp:Literal ID="ContenidoCountLiteral" runat="server" /></div>
                    </div>
                    <div class="icon"><i class="fas fa-file-alt fa-2x text-gray-300"></i></div>
                </div>
                 <a href='<%= ResolveUrl("~/Sitios/contenido.aspx") %>' class="stretched-link"></a>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2 dashboard-card">
                <div class="card-body">
                     <div>
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Usuarios Registrados</div>
                        <div id="total-usuarios" class="h5 mb-0 font-weight-bold text-gray-800"><asp:Literal ID="UsuariosCountLiteral" runat="server" /></div>
                    </div>
                     <div class="icon"><i class="fas fa-users fa-2x text-gray-300"></i></div>
                </div>
                <a href='<%= ResolveUrl("~/Sitios/usuarios.aspx") %>' class="stretched-link"></a>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2 dashboard-card">
                <div class="card-body">
                    <div>
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Categorías Creadas</div>
                        <div id="total-categorias" class="h5 mb-0 font-weight-bold text-gray-800"><asp:Literal ID="CategoriasCountLiteral" runat="server" /></div>
                    </div>
                    <div class="icon"><i class="fas fa-folder-open fa-2x text-gray-300"></i></div>
                </div>
                 <a href='<%= ResolveUrl("~/Sitios/categorias.aspx") %>' class="stretched-link"></a>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2 dashboard-card">
                <div class="card-body">
                    <div>
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Archivos Multimedia</div>
                        <div id="total-multimedia" class="h5 mb-0 font-weight-bold text-gray-800">...</div>
                    </div>
                    <div class="icon"><i class="fas fa-photo-video fa-2x text-gray-300"></i></div>
                </div>
                 <a href='<%= ResolveUrl("~/Sitios/multimedia.aspx") %>' class="stretched-link"></a>
            </div>
        </div>
    </div>
    <script src='<%= ResolveUrl("~/wwwroot/js/dashboard.js") %>'></script>
</asp:Content>
