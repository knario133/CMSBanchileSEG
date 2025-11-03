<%@ Page Title="Gestión de Contenido - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="contenido.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.contenido" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="vista-listado">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Gestión de Contenido</h1>
            <button id="btn-nuevo-contenido" class="btn btn-primary"><i class="fas fa-plus me-2"></i>Nuevo Contenido</button>
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
                            <th>ID</th> <th>Título</th> <th>Categoría</th> <th>Estado</th> <th>Fecha Creación</th> <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="vista-editor" style="display: none;">
        <h1 id="editor-titulo">Nuevo Contenido</h1>
        <form id="form-contenido" class="mt-4">
            <input type="hidden" id="contenido-id">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="titulo" class="form-label">Título</label>
                        <input type="text" id="titulo" name="titulo" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="cuerpo-html" class="form-label">Cuerpo del Contenido</label>
                        <div id="editor-quill" style="height: 300px;"></div>
                    </div>
                </div>
                <div class="col-md-4">
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
                            <div class="d-grid gap-2">
                                <button type="button" id="btn-guardar-contenido" class="btn btn-primary">Guardar</button>
                                <button type="button" id="btn-cancelar" class="btn btn-secondary">Volver al listado</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script src='<%= ResolveUrl("~/wwwroot/js/contenido.js") %>'></script>
</asp:Content>
