<%@ Page Title="Gestión de Usuarios - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="usuarios.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.usuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 mb-0">Gestión de Usuarios</h1>
        <button id="btn-nuevo-usuario" type="button" class="btn btn-primary">
            <i class="fas fa-user-plus me-2"></i>Nuevo Usuario
        </button>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <div class="table-responsive">
                <table id="tabla-usuarios" class="table table-striped table-hover align-middle" style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombre Completo</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-usuario" tabindex="-1" aria-labelledby="modal-usuario-label" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-usuario-label">Nuevo Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="form-usuario" autocomplete="off">
                        <input type="hidden" id="usuario-id">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="usuario" class="form-label">Usuario (Login)</label>
                                    <input type="text" class="form-control" id="usuario" name="usuario">
                                </div>
                                <div class="mb-3">
                                    <label for="nombre-completo" class="form-label">Nombre Completo</label>
                                    <input type="text" class="form-control" id="nombre-completo" name="nombre-completo">
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" name="email">
                                </div>
                                <div class="mb-3" id="contrasena-group">
                                    <label for="contrasena" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="contrasena" name="contrasena" autocomplete="new-password">
                                    <small class="form-text text-muted">Dejar en blanco para no cambiar.</small>
                                </div>
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" id="activo" name="activo" checked>
                                    <label class="form-check-label" for="activo">Usuario Activo</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h5>Roles Asignados</h5>
                                <div id="roles-container" class="d-flex flex-column gap-2"></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btn-guardar-usuario">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src='<%= ResolveUrl("~/wwwroot/js/usuarios.js") %>'></script>
</asp:Content>
