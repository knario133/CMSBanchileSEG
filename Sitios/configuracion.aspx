<%@ Page Title="Configuración - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="configuracion.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.configuracion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Configuración General</h1>

    <div class="card shadow-sm mt-4">
        <div class="card-body">
            <div class="alert alert-info">
                Esta sección es un placeholder. Para que sea funcional, se necesitarían handlers para obtener y guardar las configuraciones.
            </div>
            <form id="form-configuracion">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="titulo-sitio" class="form-label">Título del Sitio</label>
                            <input type="text" id="titulo-sitio" class="form-control" placeholder="Ej: Intranet Corporativa">
                        </div>
                        <div class="mb-3">
                            <label for="color-primario" class="form-label">Color Principal</label>
                            <input type="color" id="color-primario" class="form-control form-control-color" value="#003366">
                        </div>
                         <div class="mb-3">
                            <label for="email-contacto" class="form-label">Email de Contacto</label>
                            <input type="email" id="email-contacto" class="form-control" placeholder="contacto@ejemplo.com">
                        </div>
                    </div>
                </div>
                <button type="button" id="btn-guardar-configuracion" class="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    </div>

    <script src="/wwwroot/js/configuracion.js"></script>
</asp:Content>
