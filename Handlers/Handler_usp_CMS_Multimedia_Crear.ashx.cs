using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_Multimedia_Crear : IHttpHandler, IRequiresSessionState
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

                if (context.Session["userSession"] == null)
                {
                    context.Response.StatusCode = 401;
                    context.Response.Write(JsonConvert.SerializeObject(new { CodigoRespuesta = "401", GlosaRespuesta = "No autorizado." }));
                    return;
                }

                var entrada = JsonConvert.DeserializeObject<IN_Handler_usp_CMS_Multimedia_Crear>(jsonBody);

                if (entrada == null ||
                    string.IsNullOrWhiteSpace(entrada.archivoBase64) ||
                    string.IsNullOrWhiteSpace(entrada.nombreOriginal) ||
                    string.IsNullOrWhiteSpace(entrada.tipoMIME))
                {
                    context.Response.StatusCode = 400;
                    context.Response.Write(JsonConvert.SerializeObject(new { CodigoRespuesta = "400", GlosaRespuesta = "Los datos enviados no son válidos." }));
                    return;
                }

                if (entrada.archivoBase64.Length * 0.75 > 5 * 1024 * 1024)
                {
                    context.Response.StatusCode = 400;
                    context.Response.Write(JsonConvert.SerializeObject(new { CodigoRespuesta = "400", GlosaRespuesta = "El archivo es demasiado grande." }));
                    return;
                }

                var allowedTypes = new[] { "image/jpeg", "image/png", "application/pdf" };
                if (!allowedTypes.Contains(entrada.tipoMIME))
                {
                    context.Response.StatusCode = 400;
                    context.Response.Write(JsonConvert.SerializeObject(new { CodigoRespuesta = "400", GlosaRespuesta = "Tipo de archivo no permitido." }));
                    return;
                }

                var respuestaServicio = new RSP_Handler_usp_CMS_Multimedia_Crear();
                try
                {
                    var instancia = new OperacionesBD();
                    respuestaServicio.Respuesta = instancia.usp_CMS_Multimedia_Crear(
                        entrada.nombreOriginal,
                        entrada.archivoBase64,
                        entrada.tipoMIME,
                        entrada.idUsuarioSubio);

                    respuestaServicio.CodigoRespuesta = "200";
                    respuestaServicio.GlosaRespuesta = "Operación realizada con éxito.";
                }
                catch (Exception ex)
                {
                    respuestaServicio.CodigoRespuesta = "500";
                    respuestaServicio.GlosaRespuesta = $"Error al procesar el método: {ex.Message}";
                }

                context.Response.Write(JsonConvert.SerializeObject(respuestaServicio));
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

        public bool IsReusable => false;

        public class IN_Handler_usp_CMS_Multimedia_Crear
        {
            public string nombreOriginal { get; set; }
            public string archivoBase64 { get; set; }
            public string tipoMIME { get; set; }
            public int idUsuarioSubio { get; set; }
        }

        public class RSP_Handler_usp_CMS_Multimedia_Crear
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            public OperacionesBD.Rsp_usp_CMS_Multimedia_Crear Respuesta { get; set; }
        }
    }
}
 public OperacionesBD.Rsp_usp_CMS_Multimedia_Crear Respuesta { get; set; }
        }
    }
}