<%@ Page Title="Gestión de Usuarios - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="usuarios.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.usuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- ... (HTML sin cambios) ... -->
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
                                <div class="mb-3"><label for="usuario" class="form-label">Usuario (Login)</label><input type="text" class="form-control" id="usuario" name="usuario" required></div>
                                <div class="mb-3"><label for="nombre-completo" class="form-label">Nombre Completo</label><input type="text" class="form-control" id="nombre-completo" name="nombre-completo" required></div>
                                <div class="mb-3"><label for="email" class="form-label">Email</label><input type="email" class="form-control" id="email" name="email" required></div>
                                <div class="mb-3"><label for="contrasena" class="form-label">Contraseña</label><input type="password" class="form-control" id="contrasena" name="contrasena"><small class="form-text text-muted">Dejar en blanco para no cambiar.</small></div>
                                <div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="activo" name="activo" checked><label class="form-check-label" for="activo">Usuario Activo</label></div>
                            </div>
                            <div class="col-md-6">
                                <h5>Roles Asignados</h5>
                                <div id="roles-container"></div>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- ... (footer sin cambios) ... -->
            </div>
        </div>
    </div>
    <script src='<%= ResolveUrl("~/wwwroot/js/usuarios.js") %>'></script>
</asp:Content>
