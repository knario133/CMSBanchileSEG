<%@ Page Title="Historial de Cambios - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="historial.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.historial" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Historial de Cambios de Contenido</h1>

    <div class="card shadow-sm mt-4">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="filtro-contenido" class="form-label">Filtrar por ID de Contenido:</label>
                    <div class="input-group">
                        <input type="number" id="filtro-contenido" class="form-control" placeholder="Ingrese ID...">
                        <button id="btn-filtrar" class="btn btn-primary">Filtrar</button>
                    </div>
                </div>
            </div>

            <table id="tabla-historial" class="table table-striped table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th>ID Historial</th>
                        <th>ID Contenido</th>
                        <th>Tipo de Acción</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <script src='<%= ResolveUrl("~/wwwroot/js/historial.js") %>'></script>
</asp:Content>
