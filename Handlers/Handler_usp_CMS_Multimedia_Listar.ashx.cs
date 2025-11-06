using System;
using System.IO;
using System.Web;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_Multimedia_Listar : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";

            try
            {
                using (var reader = new StreamReader(context.Request.InputStream))
                {
                    reader.ReadToEnd();
                }

                var respuestaServicio = new RSP_Handler_usp_CMS_Multimedia_Listar();
                try
                {
                    var instancia = new OperacionesBD();
                    respuestaServicio.Respuesta = instancia.usp_CMS_Multimedia_Listar();

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

        public class RSP_Handler_usp_CMS_Multimedia_Listar
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            public OperacionesBD.Rsp_usp_CMS_Multimedia_Listar Respuesta { get; set; }
        }
    }
}
