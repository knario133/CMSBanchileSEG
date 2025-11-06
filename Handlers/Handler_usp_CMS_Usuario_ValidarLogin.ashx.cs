using System;
using System.IO;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_Usuario_ValidarLogin : IHttpHandler, IRequiresSessionState
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

                var entrada = JsonConvert.DeserializeObject<IN_Handler_usp_CMS_Usuario_ValidarLogin>(jsonBody ?? string.Empty);
                if (entrada == null || string.IsNullOrWhiteSpace(entrada.usuario) || string.IsNullOrWhiteSpace(entrada.password))
                {
                    context.Response.StatusCode = 400;
                    context.Response.Write(JsonConvert.SerializeObject(new
                    {
                        CodigoRespuesta = "400",
                        GlosaRespuesta = "Los parámetros 'usuario' y 'password' son obligatorios."
                    }));
                    return;

                var instancia = new OperacionesBD();
                var resultado = instancia.usp_CMS_Usuario_ValidarLogin(entrada.usuario, entrada.password);

                var respuestaServicio = new RSP_Handler_usp_CMS_Usuario_ValidarLogin
                {
                    CodigoRespuesta = resultado.Error ? "500" : "200",
                    GlosaRespuesta = resultado.Error
                        ? (string.IsNullOrWhiteSpace(resultado.Message) ? "Error al validar las credenciales." : resultado.Message)
                        : "Operación realizada con éxito.",
                    Respuesta = resultado
                };

                if (!resultado.Error && resultado.Resultado != null && resultado.Resultado.Length > 0)
                {
                    context.Session["Usuario"] = resultado.Resultado[0];
                }

                context.Response.Write(JsonConvert.SerializeObject(respuestaServicio));
            {
                context.Response.StatusCode = 500;
                context.Response.Write(JsonConvert.SerializeObject(new
                {
                    CodigoRespuesta = "500",
                    GlosaRespuesta = $"Error inesperado: {ex.Message}"
                }));
            }
        public bool IsReusable => false;
            public string usuario { get; set; }
            public string password { get; set; }
            public OperacionesBD.Rsp_usp_CMS_Usuario_ValidarLogin Respuesta { get; set; }
}
        }

        public class IN_Handler_usp_CMS_Usuario_ValidarLogin
        {
            
 public string usuario { get; set; }
 public string password { get; set; }
        }

        public class RSP_Handler_usp_CMS_Usuario_ValidarLogin
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            
 public OperacionesBD.Rsp_usp_CMS_Usuario_ValidarLogin Respuesta { get; set; }
        }
    }
}