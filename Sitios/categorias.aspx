<%@ Page Title="Gestión de Categorías - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="categorias.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.categorias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">Gestión de Categorías</h1>
        <button id="btn-nueva-categoria" type="button" class="btn btn-primary">
            <i class="fas fa-folder-plus me-2"></i>Nueva Categoría
        </button>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <div class="table-responsive">
                <table id="tabla-categorias" class="table table-striped table-hover align-middle" style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Categoría Padre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-categoria" tabindex="-1" aria-labelledby="modal-categoria-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-categoria-label">Nueva Categoría</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="form-categoria">
                        <input type="hidden" id="categoria-id">
                        <div class="mb-3">
                            <label for="nombre-categoria" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre-categoria" name="nombre-categoria">
                        </div>
                        <div class="mb-3">
                            <label for="descripcion-categoria" class="form-label">Descripción</label>
                            <textarea class="form-control" id="descripcion-categoria" name="descripcion-categoria" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="categoria-padre" class="form-label">Categoría Padre (Opcional)</label>
                            <select class="form-select" id="categoria-padre" name="categoria-padre">
                                <option value="">-- Sin categoría padre --</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btn-guardar-categoria">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src='<%= ResolveUrl("~/wwwroot/js/categorias.js") %>'></script>
</asp:Content>
