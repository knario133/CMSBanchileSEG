using System;
using System.IO;
using System.Web;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_HistorialContenido_ListarPorContenido : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            try
            {
                IN_Handler_usp_CMS_HistorialContenido_ListarPorContenido entrada;
                using (var reader = new StreamReader(context.Request.InputStream))
                {
                    var body = reader.ReadToEnd();
                    entrada = JsonConvert.DeserializeObject<IN_Handler_usp_CMS_HistorialContenido_ListarPorContenido>(body ?? string.Empty);
                }

                if (entrada == null || entrada.idContenido <= 0)
                {
                    context.Response.StatusCode = 400;
                    context.Response.Write(JsonConvert.SerializeObject(new
                    {
                        CodigoRespuesta = "400",
                        GlosaRespuesta = "Debe proporcionar un identificador de contenido válido."
                    }));
                    return;
                }

                var respuestaServicio = new RSP_Handler_usp_CMS_HistorialContenido_ListarPorContenido();
                try
                {
                    var instancia = new OperacionesBD();
                    respuestaServicio.Respuesta = instancia.usp_CMS_HistorialContenido_ListarPorContenido(entrada.idContenido);

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

        public class IN_Handler_usp_CMS_HistorialContenido_ListarPorContenido
        {
            public int idContenido { get; set; }
        }

        public class RSP_Handler_usp_CMS_HistorialContenido_ListarPorContenido
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            public OperacionesBD.Rsp_usp_CMS_HistorialContenido_ListarPorContenido Respuesta { get; set; }
        }
    }
}
}