<%@ Page Title="Gestión de Roles - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.roles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- ... (HTML sin cambios) ... -->
    <div class="modal fade" id="modal-rol" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-rol-label">Nuevo Rol</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="form-rol">
                        <input type="hidden" id="rol-id">
                        <div class="mb-3">
                            <label for="nombre-rol" class="form-label">Nombre del Rol</label>
                            <input type="text" class="form-control" id="nombre-rol"> <!-- 'required' eliminado -->
                        </div>
                        <div class="mb-3">
                            <label for="descripcion-rol" class="form-label">Descripción</label>
                            <textarea class="form-control" id="descripcion-rol" rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <!-- ... (footer sin cambios) ... -->
            </div>
        </div>
    </div>
    <script src='<%= ResolveUrl("~/wwwroot/js/roles.js") %>'></script>
</asp-Content>
