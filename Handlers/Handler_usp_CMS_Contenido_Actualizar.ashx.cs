using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_Contenido_Actualizar : IHttpHandler
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

                IN_Handler_usp_CMS_Contenido_Actualizar EntradaServicioRest = JsonConvert.DeserializeObject<IN_Handler_usp_CMS_Contenido_Actualizar>(jsonBody);

                RSP_Handler_usp_CMS_Contenido_Actualizar respuestaServicio = new RSP_Handler_usp_CMS_Contenido_Actualizar();
                try
                {
                    var instancia = new OperacionesBD();
                    respuestaServicio.Respuesta = instancia.usp_CMS_Contenido_Actualizar(
                        EntradaServicioRest.idContenido,
                        EntradaServicioRest.titulo,
                        EntradaServicioRest.cuerpoHTML,
                        EntradaServicioRest.idCategoria,
                        EntradaServicioRest.estado,
                        EntradaServicioRest.idUsuarioAutor,
                        EntradaServicioRest.esDestacado
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

        public class IN_Handler_usp_CMS_Contenido_Actualizar
        {
 public bool esDestacado { get; set; }
        }

        public class RSP_Handler_usp_CMS_Contenido_Actualizar
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            
 public OperacionesBD.Rsp_usp_CMS_Contenido_Actualizar Respuesta { get; set; }
        }
    }
}
 public string estado { get; set; }
 public int idUsuarioAutor { get; set; }
 public bool esDestacado { get; set; }
        }

        public class RSP_Handler_usp_CMS_Contenido_Actualizar
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            
 public OperacionesBD.Rsp_usp_CMS_Contenido_Actualizar Respuesta { get; set; }
        }
    }
}