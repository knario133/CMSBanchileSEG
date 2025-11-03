<%@ Page Title="Gestión de Usuarios - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="usuarios.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.usuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Usuarios</h1>
        <button id="btn-nuevo-usuario" class="btn btn-primary"><i class="fas fa-plus me-2"></i>Nuevo Usuario</button>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <table id="tabla-usuarios" class="table table-striped table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th> <th>Usuario</th> <th>Nombre Completo</th> <th>Email</th> <th>Activo</th> <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="modal-usuario" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-usuario-label">Nuevo Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="form-usuario">
                        <input type="hidden" id="usuario-id">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3"><label for="usuario" class="form-label">Usuario (Login)</label><input type="text" class="form-control" id="usuario" required></div>
                                <div class="mb-3"><label for="nombre-completo" class="form-label">Nombre Completo</label><input type="text" class="form-control" id="nombre-completo" required></div>
                                <div class="mb-3"><label for="email" class="form-label">Email</label><input type="email" class="form-control" id="email" required></div>
                                <div class="mb-3"><label for="contrasena" class="form-label">Contraseña</label><input type="password" class="form-control" id="contrasena"><small class="form-text text-muted">Dejar en blanco para no cambiar.</small></div>
                                <div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="activo" checked><label class="form-check-label" for="activo">Usuario Activo</label></div>
                            </div>
                            <div class="col-md-6">
                                <h5>Roles Asignados</h5>
                                <div id="roles-container"></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" id="btn-guardar-usuario" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <script src='<%= ResolveUrl("~/wwwroot/js/usuarios.js") %>'></script>
</asp:Content>
