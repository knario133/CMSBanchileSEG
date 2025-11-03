<%@ Page Title="Gestión de Categorías - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="categorias.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.categorias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- ... (HTML sin cambios) ... -->
    <div class="modal fade" id="modal-categoria" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-categoria-label">Nueva Categoría</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="form-categoria">
                        <input type="hidden" id="categoria-id">
                        <div class="mb-3">
                            <label for="nombre-categoria" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre-categoria"> <!-- 'required' eliminado -->
                        </div>
                        <div class="mb-3">
                            <label for="descripcion-categoria" class="form-label">Descripción</label>
                            <textarea class="form-control" id="descripcion-categoria" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="categoria-padre" class="form-label">Categoría Padre (Opcional)</label>
                            <select class="form-select" id="categoria-padre">
                                <option value="">-- Sin categoría padre --</option>
                            </select>
                        </div>
                    </form>
                </div>
                <!-- ... (footer sin cambios) ... -->
            </div>
        </div>
    </div>
    <script src='<%= ResolveUrl("~/wwwroot/js/categorias.js") %>'></script>
</asp:Content>
