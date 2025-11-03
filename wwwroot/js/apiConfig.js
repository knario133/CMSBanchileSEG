// Se asume que window.appBasePath ha sido definido en Template.Master
const API_URLS = {
  usuario: {
    listar: window.appBasePath + 'Handlers/Handler_usp_CMS_Usuario_Listar.ashx',
    crear: window.appBasePath + 'Handlers/Handler_usp_CMS_Usuario_Crear.ashx',
    actualizar: window.appBasePath + 'Handlers/Handler_usp_CMS_Usuario_Actualizar.ashx',
    eliminar: window.appBasePath + 'Handlers/Handler_usp_CMS_Usuario_Eliminar.ashx',
    obtenerPorId: window.appBasePath + 'Handlers/Handler_usp_CMS_Usuario_ObtenerPorId.ashx',
    login: window.appBasePath + 'Handlers/Handler_usp_CMS_Usuario_ValidarLogin.ashx'
  },
  contenido: {
    // ...
  },
  categoria: {
    // ...
  },
  multimedia: {
    // ...
  },
  rol: {
    // ...
  },
  usuarioRol: {
      asignar: window.appBasePath + 'Handlers/Handler_usp_CMS_UsuarioRol_Asignar.ashx',
      quitar: window.appBasePath + 'Handlers/Handler_usp_CMS_UsuarioRol_Quitar.ashx', // Espera IdUsuarioRol
      quitarPorIds: window.appBasePath + 'Handlers/Handler_usp_CMS_UsuarioRol_QuitarPorIds.ashx', // CORRECCIÓN: Añadir
      listarPorUsuario: window.appBasePath + 'Handlers/Handler_usp_CMS_UsuarioRol_ListarPorUsuario.ashx'
  },
  historial: {
    // ...
  },
  contenidoMultimedia: {
    // ...
  }
};
// Rellenar las demás secciones para que el archivo esté completo
Object.assign(API_URLS.contenido, {
    listar: window.appBasePath + 'Handlers/Handler_usp_CMS_Contenido_Listar.ashx',
    crear: window.appBasePath + 'Handlers/Handler_usp_CMS_Contenido_Crear.ashx',
    actualizar: window.appBasePath + 'Handlers/Handler_usp_CMS_Contenido_Actualizar.ashx',
    eliminar: window.appBasePath + 'Handlers/Handler_usp_CMS_Contenido_Eliminar.ashx',
    obtenerPorId: window.appBasePath + 'Handlers/Handler_usp_CMS_Contenido_ObtenerPorId.ashx',
    listarPorCategoria: window.appBasePath + 'Handlers/Handler_usp_CMS_Contenido_ListarPorCategoria.ashx'
});
Object.assign(API_URLS.categoria, {
      listar: window.appBasePath + 'Handlers/Handler_usp_CMS_Categoria_Listar.ashx',
      crear: window.appBasePath + 'Handlers/Handler_usp_CMS_Categoria_Crear.ashx',
      actualizar: window.appBasePath + 'Handlers/Handler_usp_CMS_Categoria_Actualizar.ashx',
      eliminar: window.appBasePath + 'Handlers/Handler_usp_CMS_Categoria_Eliminar.ashx',
      obtenerPorId: window.appBasePath + 'Handlers/Handler_usp_CMS_Categoria_ObtenerPorId.ashx'
});
Object.assign(API_URLS.multimedia, {
      listar: window.appBasePath + 'Handlers/Handler_usp_CMS_Multimedia_Listar.ashx',
      crear: window.appBasePath + 'Handlers/Handler_usp_CMS_Multimedia_Crear.ashx',
      actualizar: window.appBasePath + 'Handlers/Handler_usp_CMS_Multimedia_Actualizar.ashx',
      eliminar: window.appBasePath + 'Handlers/Handler_usp_CMS_Multimedia_Eliminar.ashx',
      obtenerPorId: window.appBasePath + 'Handlers/Handler_usp_CMS_Multimedia_ObtenerPorId.ashx'
});
Object.assign(API_URLS.rol, {
      listar: window.appBasePath + 'Handlers/Handler_usp_CMS_Rol_Listar.ashx',
      crear: window.appBasePath + 'Handlers/Handler_usp_CMS_Rol_Crear.ashx',
      actualizar: window.appBasePath + 'Handlers/Handler_usp_CMS_Rol_Actualizar.ashx',
      eliminar: window.appBasePath + 'Handlers/Handler_usp_CMS_Rol_Eliminar.ashx',
      obtenerPorId: window.appBasePath + 'Handlers/Handler_usp_CMS_Rol_ObtenerPorId.ashx'
});
Object.assign(API_URLS.historial, {
      listarPorContenido: window.appBasePath + 'Handlers/Handler_usp_CMS_HistorialContenido_ListarPorContenido.ashx',
      obtenerPorId: window.appBasePath + 'Handlers/Handler_usp_CMS_HistorialContenido_ObtenerPorId.ashx',
      registrar: window.appBasePath + 'Handlers/Handler_usp_CMS_HistorialContenido_Registrar.ashx'
});
Object.assign(API_URLS.contenidoMultimedia, {
      asignar: window.appBasePath + 'Handlers/Handler_usp_CMS_ContenidoMultimedia_Asignar.ashx'
});
