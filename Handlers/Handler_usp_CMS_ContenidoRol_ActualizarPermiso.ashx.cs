using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_ContenidoRol_ActualizarPermiso : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            try
            {
                string jsonBody;
                using (var reader = new StreamReader(context.Request.InputStream))
                {
                    jsonBody = reader.ReadToEnd();
                }

                IN_Handler_usp_CMS_ContenidoRol_ActualizarPermiso EntradaServicioRest = JsonConvert.DeserializeObject<IN_Handler_usp_CMS_ContenidoRol_ActualizarPermiso>(jsonBody);

                RSP_Handler_usp_CMS_ContenidoRol_ActualizarPermiso respuestaServicio = new RSP_Handler_usp_CMS_ContenidoRol_ActualizarPermiso();
                try
                {
                    var instancia = new OperacionesBD();
                    respuestaServicio.Respuesta = instancia.usp_CMS_ContenidoRol_ActualizarPermiso(
                        EntradaServicioRest.idContenidoRol,
                        EntradaServicioRest.permiso
                    );
                    respuestaServicio.CodigoRespuesta = "200";
                    respuestaServicio.GlosaRespuesta = "Operación realizada con éxito.";
                }
                catch (Exception ex)
                {
                    respuestaServicio.CodigoRespuesta = "500";
                    respuestaServicio.GlosaRespuesta = $"Error al procesar el método: {ex.Message}";
                }

                string jsonString = JsonConvert.SerializeObject(respuestaServicio);
                context.Response.Write(jsonString);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                context.Response.Write(JsonConvert.SerializeObject(new
                {
                    CodigoRespuesta = "500",
                    GlosaRespuesta = $"Error inesperado: {ex.Message}"
                }));
            }
        }

        public bool IsReusable
        {
            get { return false; }
        }

        public class IN_Handler_usp_CMS_ContenidoRol_ActualizarPermiso
        {
 public string permiso { get; set; }
        }

        public class RSP_Handler_usp_CMS_ContenidoRol_ActualizarPermiso
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
 public OperacionesBD.Rsp_usp_CMS_ContenidoRol_ActualizarPermiso Respuesta { get; set; }
        }
    }
}
            
 public OperacionesBD.Rsp_usp_CMS_ContenidoRol_ActualizarPermiso Respuesta { get; set; }
        }
    }
}