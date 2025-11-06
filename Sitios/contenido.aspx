<%@ Page Title="Gestión de Contenido - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="contenido.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.contenido" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Contenido</h1>
        <button id="btn-nuevo-contenido" class="btn btn-primary" type="button">
            <i class="fas fa-plus me-2"></i>
            Nuevo Contenido
        </button>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="filtro-categoria" class="form-label">Filtrar por Categoría:</label>
                    <select id="filtro-categoria" class="form-select">
                        <option value="">-- Todas las categorías --</option>
                    </select>
                </div>
            </div>
            <table id="tabla-contenidos" class="table table-striped table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="modal-contenido" tabindex="-1" aria-labelledby="modal-contenido-label" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-contenido-label">Nuevo Contenido</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="form-contenido">
                        <input type="hidden" id="contenido-id">
                        <div class="row g-3">
                            <div class="col-lg-8">
                                <div class="mb-3">
                                    <label for="titulo" class="form-label">Título</label>
                                    <input type="text" id="titulo" name="titulo" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="editor-quill" class="form-label">Cuerpo del Contenido</label>
                                    <div id="editor-quill" style="height: 300px;"></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Publicación</h5>
                                        <div class="mb-3">
                                            <label for="categoria" class="form-label">Categoría</label>
                                            <select id="categoria" name="categoria" class="form-select" required></select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="estado" class="form-label">Estado</label>
                                            <select id="estado" name="estado" class="form-select">
                                                <option value="Borrador">Borrador</option>
                                                <option value="Publicado">Publicado</option>
                                            </select>
                                        </div>
                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" id="es-destacado">
                                            <label class="form-check-label" for="es-destacado">Marcar como destacado</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" id="btn-guardar-contenido" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src='<%= ResolveUrl("~/wwwroot/js/contenido.js") %>'></script>
</asp:Content>
