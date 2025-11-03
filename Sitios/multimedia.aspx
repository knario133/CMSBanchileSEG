<%@ Page Title="Gestión de Multimedia - CMS Banchile" Language="C#" MasterPageFile="~/Template.Master" AutoEventWireup="true" CodeBehind="multimedia.aspx.cs" Inherits="CMSBanchileSEGUROS.Sitios.multimedia" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .upload-area {
            border: 2px dashed #003366;
            border-radius: 0.5rem;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            background-color: #f8f9fa;
        }
        .upload-area:hover {
            background-color: #e9ecef;
        }
        .gallery-card {
            height: 100%;
        }
        .gallery-card img {
            height: 150px;
            object-fit: cover;
        }
        .gallery-card .pdf-icon {
            font-size: 5rem;
            text-align: center;
            padding-top: 30px;
            padding-bottom: 30px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Gestión de Multimedia</h1>

    <!-- Área de subida de archivos -->
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <div id="upload-area" class="upload-area">
                <input type="file" id="file-input" multiple accept=".jpg, .jpeg, .png, .pdf" style="display: none;">
                <i class="fas fa-cloud-upload-alt fa-3x mb-3"></i>
                <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar.</p>
                <small class="text-muted">Tipos permitidos: JPG, PNG, PDF. Tamaño máximo: 5 MB.</small>
            </div>
             <div class="progress mt-3" style="display: none;">
                <div id="upload-progress" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>

    <!-- Galería de Multimedia -->
    <div class="card shadow-sm">
        <div class="card-body">
            <div class="row" id="galeria-multimedia">
                <!-- Las tarjetas de multimedia se cargarán aquí dinámicamente -->
            </div>
        </div>
    </div>

    <!-- Modal para Editar Multimedia (ej. cambiar nombre) -->
    <div class="modal fade" id="modal-multimedia" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar Detalles</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="form-multimedia">
                        <input type="hidden" id="multimedia-id">
                        <div class="mb-3">
                            <label for="nombre-multimedia" class="form-label">Nombre del archivo</label>
                            <input type="text" class="form-control" id="nombre-multimedia" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" id="btn-guardar-multimedia" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="/wwwroot/js/multimedia.js"></script>
</asp:Content>
