using System;
using System.IO;
using System.Web;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_Contenido_Crear : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            try
            {
                IN_Handler_usp_CMS_Contenido_Crear entrada;
                using (var reader = new StreamReader(context.Request.InputStream))
                {
                    var body = reader.ReadToEnd();
                    entrada = JsonConvert.DeserializeObject<IN_Handler_usp_CMS_Contenido_Crear>(body ?? string.Empty);
                }

                if (entrada == null || string.IsNullOrWhiteSpace(entrada.titulo) || entrada.idCategoria <= 0 || entrada.idUsuarioAutor <= 0)
                {
                    context.Response.StatusCode = 400;
                    context.Response.Write(JsonConvert.SerializeObject(new
                    {
                        CodigoRespuesta = "400",
                        GlosaRespuesta = "Debe proporcionar título, categoría y autor válidos."
                    }));
                    return;
                }

                var respuestaServicio = new RSP_Handler_usp_CMS_Contenido_Crear();
                try
                {
                    var instancia = new OperacionesBD();
                    respuestaServicio.Respuesta = instancia.usp_CMS_Contenido_Crear(
                        entrada.titulo,
                        entrada.cuerpoHTML ?? string.Empty,
                        entrada.idCategoria,
                        entrada.estado ?? string.Empty,
                        entrada.idUsuarioAutor,
                        entrada.esDestacado);

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
            catch (JsonException ex)
            {
                context.Response.StatusCode = 400;
                context.Response.Write(JsonConvert.SerializeObject(new
                {
                    CodigoRespuesta = "400",
                    GlosaRespuesta = $"Formato de solicitud inválido: {ex.Message}"
                }));
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

        public class IN_Handler_usp_CMS_Contenido_Crear
        {
            public string titulo { get; set; }
            public string cuerpoHTML { get; set; }
            public int idCategoria { get; set; }
            public string estado { get; set; }
            public int idUsuarioAutor { get; set; }
            public bool esDestacado { get; set; }
        }

        public class RSP_Handler_usp_CMS_Contenido_Crear
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            public OperacionesBD.Rsp_usp_CMS_Contenido_Crear Respuesta { get; set; }
        }
    }
}
            public string GlosaRespuesta { get; set; }
            
 public OperacionesBD.Rsp_usp_CMS_Contenido_Crear Respuesta { get; set; }
        }
    }
}