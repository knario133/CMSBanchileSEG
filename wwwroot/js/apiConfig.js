const API_URLS = {
  usuario: {
    listar: '/Handlers/Handler_usp_CMS_Usuario_Listar.ashx',
    crear: '/Handlers/Handler_usp_CMS_Usuario_Crear.ashx',
    actualizar: '/Handlers/Handler_usp_CMS_Usuario_Actualizar.ashx',
    eliminar: '/Handlers/Handler_usp_CMS_Usuario_Eliminar.ashx',
    obtenerPorId: '/Handlers/Handler_usp_CMS_Usuario_ObtenerPorId.ashx',
    login: '/Handlers/Handler_usp_CMS_Usuario_ValidarLogin.ashx'
  },
  contenido: {
    listar: '/Handlers/Handler_usp_CMS_Contenido_Listar.ashx',
    crear: '/Handlers/Handler_usp_CMS_Contenido_Crear.ashx',
    actualizar: '/Handlers/Handler_usp_CMS_Contenido_Actualizar.ashx',
    eliminar: '/Handlers/Handler_usp_CMS_Contenido_Eliminar.ashx',
    obtenerPorId: '/Handlers/Handler_usp_CMS_Contenido_ObtenerPorId.ashx',
    listarPorCategoria: '/Handlers/Handler_usp_CMS_Contenido_ListarPorCategoria.ashx'
  },
  categoria: {
      listar: '/Handlers/Handler_usp_CMS_Categoria_Listar.ashx',
      crear: '/Handlers/Handler_usp_CMS_Categoria_Crear.ashx',
      actualizar: '/Handlers/Handler_usp_CMS_Categoria_Actualizar.ashx',
      eliminar: '/Handlers/Handler_usp_CMS_Categoria_Eliminar.ashx',
      obtenerPorId: '/Handlers/Handler_usp_CMS_Categoria_ObtenerPorId.ashx'
  },
  multimedia: {
      listar: '/Handlers/Handler_usp_CMS_Multimedia_Listar.ashx',
      crear: '/Handlers/Handler_usp_CMS_Multimedia_Crear.ashx',
      actualizar: '/Handlers/Handler_usp_CMS_Multimedia_Actualizar.ashx',
      eliminar: '/Handlers/Handler_usp_CMS_Multimedia_Eliminar.ashx',
      obtenerPorId: '/Handlers/Handler_usp_CMS_Multimedia_ObtenerPorId.ashx'
  },
  rol: {
      listar: '/Handlers/Handler_usp_CMS_Rol_Listar.ashx',
      crear: '/Handlers/Handler_usp_CMS_Rol_Crear.ashx',
      actualizar: '/Handlers/Handler_usp_CMS_Rol_Actualizar.ashx',
      eliminar: '/Handlers/Handler_usp_CMS_Rol_Eliminar.ashx',
      obtenerPorId: '/Handlers/Handler_usp_CMS_Rol_ObtenerPorId.ashx'
  },
  usuarioRol: {
      asignar: '/Handlers/Handler_usp_CMS_UsuarioRol_Asignar.ashx',
      quitar: '/Handlers/Handler_usp_CMS_UsuarioRol_Quitar.ashx'
  },
  historial: {
      listarPorContenido: '/Handlers/Handler_usp_CMS_HistorialContenido_ListarPorContenido.ashx',
      obtenerPorId: '/Handlers/Handler_usp_CMS_HistorialContenido_ObtenerPorId.ashx',
      registrar: '/Handlers/Handler_usp_CMS_HistorialContenido_Registrar.ashx'
  },
  contenidoMultimedia: {
      asignar: '/Handlers/Handler_usp_CMS_ContenidoMultimedia_Asignar.ashx'
  }
};
