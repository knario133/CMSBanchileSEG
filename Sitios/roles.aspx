<%@ Page Title="Gestión de Roles - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="roles.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.roles" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Roles</h1>
        <button id="btn-nuevo-rol" class="btn btn-primary"><i class="fas fa-plus me-2"></i>Nuevo Rol</button>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <table id="tabla-roles" class="table table-striped table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

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
                            <input type="text" class="form-control" id="nombre-rol" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" id="btn-guardar-rol" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <script src='<%= ResolveUrl("~/wwwroot/js/roles.js") %>'></script>
</asp:Content>
