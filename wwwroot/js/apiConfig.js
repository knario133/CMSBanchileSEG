/**
 * @file apiConfig.js
 * @description Defines the URLs for all .ashx handlers used in the application.
 * This centralized configuration makes it easy to manage and update API endpoints.
 * It relies on a global `window.appBasePath` variable, which should be defined in
 * the main master page (e.g., Template.Master) to ensure correct path resolution.
 */
(function(window) {
    'use strict';

    // It is assumed that window.appBasePath has been defined in Template.Master
    const basePath = window.appBasePath || '';

    /**
     * @typedef {object} ApiEndpoints
     * @property {object} usuario - User-related endpoints.
     * @property {object} contenido - Content-related endpoints.
     * @property {object} categoria - Category-related endpoints.
     * @property {object} multimedia - Multimedia-related endpoints.
     * @property {object} rol - Role-related endpoints.
     * @property {object} usuarioRol - User-role assignment endpoints.
     * @property {object} historial - History-related endpoints.
     * @property {object} contenidoMultimedia - Content-multimedia assignment endpoints.
     * @property {object} contenidoRol - Content-role assignment endpoints.
     */

    /**
     * @type {ApiEndpoints}
     */
    const API_URLS = {
        usuario: {
            listar: `${basePath}Handlers/Handler_usp_CMS_Usuario_Listar.ashx`,
            crear: `${basePath}Handlers/Handler_usp_CMS_Usuario_Crear.ashx`,
            actualizar: `${basePath}Handlers/Handler_usp_CMS_Usuario_Actualizar.ashx`,
            eliminar: `${basePath}Handlers/Handler_usp_CMS_Usuario_Eliminar.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_Usuario_ObtenerPorId.ashx`,
            login: `${basePath}Handlers/Handler_usp_CMS_Usuario_ValidarLogin.ashx`
        },
        contenido: {
            listar: `${basePath}Handlers/Handler_usp_CMS_Contenido_Listar.ashx`,
            crear: `${basePath}Handlers/Handler_usp_CMS_Contenido_Crear.ashx`,
            actualizar: `${basePath}Handlers/Handler_usp_CMS_Contenido_Actualizar.ashx`,
            eliminar: `${basePath}Handlers/Handler_usp_CMS_Contenido_Eliminar.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_Contenido_ObtenerPorId.ashx`,
            listarPorCategoria: `${basePath}Handlers/Handler_usp_CMS_Contenido_ListarPorCategoria.ashx`
        },
        categoria: {
            listar: `${basePath}Handlers/Handler_usp_CMS_Categoria_Listar.ashx`,
            crear: `${basePath}Handlers/Handler_usp_CMS_Categoria_Crear.ashx`,
            actualizar: `${basePath}Handlers/Handler_usp_CMS_Categoria_Actualizar.ashx`,
            eliminar: `${basePath}Handlers/Handler_usp_CMS_Categoria_Eliminar.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_Categoria_ObtenerPorId.ashx`
        },
        multimedia: {
            listar: `${basePath}Handlers/Handler_usp_CMS_Multimedia_Listar.ashx`,
            crear: `${basePath}Handlers/Handler_usp_CMS_Multimedia_Crear.ashx`,
            actualizar: `${basePath}Handlers/Handler_usp_CMS_Multimedia_Actualizar.ashx`,
            eliminar: `${basePath}Handlers/Handler_usp_CMS_Multimedia_Eliminar.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_Multimedia_ObtenerPorId.ashx`
        },
        rol: {
            listar: `${basePath}Handlers/Handler_usp_CMS_Rol_Listar.ashx`,
            crear: `${basePath}Handlers/Handler_usp_CMS_Rol_Crear.ashx`,
            actualizar: `${basePath}Handlers/Handler_usp_CMS_Rol_Actualizar.ashx`,
            eliminar: `${basePath}Handlers/Handler_usp_CMS_Rol_Eliminar.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_Rol_ObtenerPorId.ashx`
        },
        usuarioRol: {
            asignar: `${basePath}Handlers/Handler_usp_CMS_UsuarioRol_Asignar.ashx`,
            quitar: `${basePath}Handlers/Handler_usp_CMS_UsuarioRol_Quitar.ashx`, // Expects IdUsuarioRol
            quitarPorIds: `${basePath}Handlers/Handler_usp_CMS_UsuarioRol_QuitarPorIds.ashx`, // Expects IdUsuario and IdRol
            listarPorUsuario: `${basePath}Handlers/Handler_usp_CMS_UsuarioRol_ListarPorUsuario.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_UsuarioRol_ObtenerPorId.ashx`
        },
        historial: {
            listarPorContenido: `${basePath}Handlers/Handler_usp_CMS_HistorialContenido_ListarPorContenido.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_HistorialContenido_ObtenerPorId.ashx`,
            registrar: `${basePath}Handlers/Handler_usp_CMS_HistorialContenido_Registrar.ashx`
        },
        contenidoMultimedia: {
            asignar: `${basePath}Handlers/Handler_usp_CMS_ContenidoMultimedia_Asignar.ashx`,
            quitar: `${basePath}Handlers/Handler_usp_CMS_ContenidoMultimedia_Quitar.ashx`,
            listarPorContenido: `${basePath}Handlers/Handler_usp_CMS_ContenidoMultimedia_ListarPorContenido.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_ContenidoMultimedia_ObtenerPorId.ashx`
        },
        contenidoRol: {
            asignarPermiso: `${basePath}Handlers/Handler_usp_CMS_ContenidoRol_AsignarPermiso.ashx`,
            quitarPermiso: `${basePath}Handlers/Handler_usp_CMS_ContenidoRol_QuitarPermiso.ashx`,
            actualizarPermiso: `${basePath}Handlers/Handler_usp_CMS_ContenidoRol_ActualizarPermiso.ashx`,
            listarPorContenido: `${basePath}Handlers/Handler_usp_CMS_ContenidoRol_ListarPorContenido.ashx`,
            obtenerPorId: `${basePath}Handlers/Handler_usp_CMS_ContenidoRol_ObtenerPorId.ashx`
        }
    };

    // Expose the configuration to the global window object
    window.API_URLS = API_URLS;

})(window);
