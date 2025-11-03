<%@ Page Title="Gestión de Categorías - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="categorias.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.categorias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!-- Estilos adicionales si fueran necesarios -->
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Categorías</h1>
        <button id="btn-nueva-categoria" class="btn btn-primary"><i class="fas fa-plus me-2"></i>Nueva Categoría</button>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <table id="tabla-categorias" class="table table-striped table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría Padre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- El contenido se cargará dinámicamente con DataTables -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal para Crear/Editar Categoría -->
    <div class="modal fade" id="modal-categoria" tabindex="-1" aria-labelledby="modal-categoria-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-categoria-label">Nueva Categoría</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-categoria">
                        <input type="hidden" id="categoria-id">
                        <div class="mb-3">
                            <label for="nombre-categoria" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre-categoria" required>
                        </div>
                        <div class="mb-3">
                            <label for="categoria-padre" class="form-label">Categoría Padre (Opcional)</label>
                            <select class="form-select" id="categoria-padre">
                                <option value="">-- Sin categoría padre --</option>
                                <!-- Las opciones se cargarán dinámicamente -->
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" id="btn-guardar-categoria" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="/wwwroot/js/categorias.js"></script>
</asp:Content>
