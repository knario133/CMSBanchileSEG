using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CMSBanchileSEGUROS
{
    public class Handler_usp_CMS_Rol_Actualizar : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            try{
            // Leer el cuerpo de la solicitud
            string jsonBody;
            using (var reader = new System.IO.StreamReader(context.Request.InputStream))
            {
                jsonBody = reader.ReadToEnd();
            }
            // Variables de entrada a Mapear
            IN_Handler_usp_CMS_Rol_Actualizar EntradaServicioRest = JsonConvert.DeserializeObject<IN_Handler_usp_CMS_Rol_Actualizar>(jsonBody);
            //Llamada a metodo
            
            RSP_Handler_usp_CMS_Rol_Actualizar respuestaServicio = new RSP_Handler_usp_CMS_Rol_Actualizar();
            try{
            var instancia = new OperacionesBD();
respuestaServicio.Respuesta = instancia.usp_CMS_Rol_Actualizar(EntradaServicioRest.idRol, EntradaServicioRest.nombreRol, EntradaServicioRest.descripcion);
            respuestaServicio.CodigoRespuesta = "200";
            respuestaServicio.GlosaRespuesta = "Operación realizada con éxito.";
            }
            catch (Exception ex){
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

        public class IN_Handler_usp_CMS_Rol_Actualizar
        {
            
 public int idRol { get; set; }
 public string nombreRol { get; set; }
 public string descripcion { get; set; }
        }

        public class RSP_Handler_usp_CMS_Rol_Actualizar
        {
            public string CodigoRespuesta { get; set; }
            public string GlosaRespuesta { get; set; }
            
 public OperacionesBD.Rsp_usp_CMS_Rol_Actualizar Respuesta { get; set; }
        }
    }
}