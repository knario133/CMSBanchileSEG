using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMSBanchileSEGUROS
{
    public class OperacionesBD
    {
        public class Rsp_usp_CMS_Categoria_Actualizar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Categoria_Actualizar usp_CMS_Categoria_Actualizar(int idCategoria, string nombre, string descripcion, int idCategoriaPadre)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Categoria_Actualizar RespuestaMetodo = new Rsp_usp_CMS_Categoria_Actualizar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Categoria_Actualizar(idCategoria, nombre, descripcion, idCategoriaPadre);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_UsuarioRol_QuitarPorIds
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_UsuarioRol_QuitarPorIds usp_CMS_UsuarioRol_QuitarPorIds(int idUsuario, int idRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_UsuarioRol_QuitarPorIds RespuestaMetodo = new Rsp_usp_CMS_UsuarioRol_QuitarPorIds();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_UsuarioRol_QuitarPorIds(idUsuario, idRol);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Categoria_Crear
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Categoria_CrearResult[] Resultado;
        }
        public Rsp_usp_CMS_Categoria_Crear usp_CMS_Categoria_Crear(string nombre, string descripcion, int idCategoriaPadre)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Categoria_Crear RespuestaMetodo = new Rsp_usp_CMS_Categoria_Crear();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Categoria_Crear(nombre, descripcion, idCategoriaPadre).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Categoria_Eliminar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Categoria_Eliminar usp_CMS_Categoria_Eliminar(int idCategoria)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Categoria_Eliminar RespuestaMetodo = new Rsp_usp_CMS_Categoria_Eliminar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Categoria_Eliminar(idCategoria);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Categoria_Listar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Categoria_ListarResult[] Resultado;
        }
        public Rsp_usp_CMS_Categoria_Listar usp_CMS_Categoria_Listar()
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Categoria_Listar RespuestaMetodo = new Rsp_usp_CMS_Categoria_Listar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Categoria_Listar().ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Categoria_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Categoria_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_Categoria_ObtenerPorId usp_CMS_Categoria_ObtenerPorId(int idCategoria)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Categoria_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_Categoria_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Categoria_ObtenerPorId(idCategoria).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Contenido_Actualizar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Contenido_Actualizar usp_CMS_Contenido_Actualizar(int idContenido, string titulo, string cuerpoHTML, int idCategoria, string estado, int idUsuarioAutor, bool esDestacado)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Contenido_Actualizar RespuestaMetodo = new Rsp_usp_CMS_Contenido_Actualizar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Contenido_Actualizar(idContenido, titulo, cuerpoHTML, idCategoria, estado, idUsuarioAutor, esDestacado);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Contenido_Crear
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Contenido_CrearResult[] Resultado;
        }
        public Rsp_usp_CMS_Contenido_Crear usp_CMS_Contenido_Crear(string titulo, string cuerpoHTML, int idCategoria, string estado, int idUsuarioAutor, bool esDestacado)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Contenido_Crear RespuestaMetodo = new Rsp_usp_CMS_Contenido_Crear();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Contenido_Crear(titulo, cuerpoHTML, idCategoria, estado, idUsuarioAutor, esDestacado).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Contenido_Eliminar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Contenido_Eliminar usp_CMS_Contenido_Eliminar(int idContenido)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Contenido_Eliminar RespuestaMetodo = new Rsp_usp_CMS_Contenido_Eliminar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Contenido_Eliminar(idContenido);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Contenido_Listar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Contenido_ListarResult[] Resultado;
        }
        public Rsp_usp_CMS_Contenido_Listar usp_CMS_Contenido_Listar()
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Contenido_Listar RespuestaMetodo = new Rsp_usp_CMS_Contenido_Listar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Contenido_Listar().ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Contenido_ListarPorCategoria
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Contenido_ListarPorCategoriaResult[] Resultado;
        }
        public Rsp_usp_CMS_Contenido_ListarPorCategoria usp_CMS_Contenido_ListarPorCategoria(int idCategoria)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Contenido_ListarPorCategoria RespuestaMetodo = new Rsp_usp_CMS_Contenido_ListarPorCategoria();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Contenido_ListarPorCategoria(idCategoria).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Contenido_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Contenido_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_Contenido_ObtenerPorId usp_CMS_Contenido_ObtenerPorId(int idContenido)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Contenido_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_Contenido_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Contenido_ObtenerPorId(idContenido).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoMultimedia_Asignar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_ContenidoMultimedia_AsignarResult[] Resultado;
        }
        public Rsp_usp_CMS_ContenidoMultimedia_Asignar usp_CMS_ContenidoMultimedia_Asignar(int idContenido, int idArchivo)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoMultimedia_Asignar RespuestaMetodo = new Rsp_usp_CMS_ContenidoMultimedia_Asignar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoMultimedia_Asignar(idContenido, idArchivo).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoMultimedia_ListarPorContenido
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_ContenidoMultimedia_ListarPorContenidoResult[] Resultado;
        }
        public Rsp_usp_CMS_ContenidoMultimedia_ListarPorContenido usp_CMS_ContenidoMultimedia_ListarPorContenido(int idContenido)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoMultimedia_ListarPorContenido RespuestaMetodo = new Rsp_usp_CMS_ContenidoMultimedia_ListarPorContenido();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoMultimedia_ListarPorContenido(idContenido).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoMultimedia_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_ContenidoMultimedia_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_ContenidoMultimedia_ObtenerPorId usp_CMS_ContenidoMultimedia_ObtenerPorId(int idContenidoMultimedia)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoMultimedia_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_ContenidoMultimedia_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoMultimedia_ObtenerPorId(idContenidoMultimedia).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoMultimedia_Quitar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_ContenidoMultimedia_Quitar usp_CMS_ContenidoMultimedia_Quitar(int idContenidoMultimedia)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoMultimedia_Quitar RespuestaMetodo = new Rsp_usp_CMS_ContenidoMultimedia_Quitar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoMultimedia_Quitar(idContenidoMultimedia);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoRol_ActualizarPermiso
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_ContenidoRol_ActualizarPermiso usp_CMS_ContenidoRol_ActualizarPermiso(int idContenidoRol, string permiso)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoRol_ActualizarPermiso RespuestaMetodo = new Rsp_usp_CMS_ContenidoRol_ActualizarPermiso();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoRol_ActualizarPermiso(idContenidoRol, permiso);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoRol_AsignarPermiso
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_ContenidoRol_AsignarPermisoResult[] Resultado;
        }
        public Rsp_usp_CMS_ContenidoRol_AsignarPermiso usp_CMS_ContenidoRol_AsignarPermiso(int idContenido, int idRol, string permiso)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoRol_AsignarPermiso RespuestaMetodo = new Rsp_usp_CMS_ContenidoRol_AsignarPermiso();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoRol_AsignarPermiso(idContenido, idRol, permiso).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoRol_ListarPorContenido
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_ContenidoRol_ListarPorContenidoResult[] Resultado;
        }
        public Rsp_usp_CMS_ContenidoRol_ListarPorContenido usp_CMS_ContenidoRol_ListarPorContenido(int idContenido)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoRol_ListarPorContenido RespuestaMetodo = new Rsp_usp_CMS_ContenidoRol_ListarPorContenido();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoRol_ListarPorContenido(idContenido).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoRol_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_ContenidoRol_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_ContenidoRol_ObtenerPorId usp_CMS_ContenidoRol_ObtenerPorId(int idContenidoRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoRol_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_ContenidoRol_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoRol_ObtenerPorId(idContenidoRol).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_ContenidoRol_QuitarPermiso
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_ContenidoRol_QuitarPermiso usp_CMS_ContenidoRol_QuitarPermiso(int idContenidoRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_ContenidoRol_QuitarPermiso RespuestaMetodo = new Rsp_usp_CMS_ContenidoRol_QuitarPermiso();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_ContenidoRol_QuitarPermiso(idContenidoRol);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_HistorialContenido_ListarPorContenido
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_HistorialContenido_ListarPorContenidoResult[] Resultado;
        }
        public Rsp_usp_CMS_HistorialContenido_ListarPorContenido usp_CMS_HistorialContenido_ListarPorContenido(int idContenido)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_HistorialContenido_ListarPorContenido RespuestaMetodo = new Rsp_usp_CMS_HistorialContenido_ListarPorContenido();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_HistorialContenido_ListarPorContenido(idContenido).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_HistorialContenido_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_HistorialContenido_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_HistorialContenido_ObtenerPorId usp_CMS_HistorialContenido_ObtenerPorId(int idHistorial)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_HistorialContenido_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_HistorialContenido_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_HistorialContenido_ObtenerPorId(idHistorial).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_HistorialContenido_Registrar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_HistorialContenido_RegistrarResult[] Resultado;
        }
        public Rsp_usp_CMS_HistorialContenido_Registrar usp_CMS_HistorialContenido_Registrar(int idContenido, int idUsuario, string comentario)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_HistorialContenido_Registrar RespuestaMetodo = new Rsp_usp_CMS_HistorialContenido_Registrar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_HistorialContenido_Registrar(idContenido, idUsuario, comentario).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Multimedia_Actualizar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Multimedia_Actualizar usp_CMS_Multimedia_Actualizar(int idArchivo, string nombreOriginal)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Multimedia_Actualizar RespuestaMetodo = new Rsp_usp_CMS_Multimedia_Actualizar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Multimedia_Actualizar(idArchivo, nombreOriginal);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Multimedia_Crear
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Multimedia_CrearResult[] Resultado;
        }
        public Rsp_usp_CMS_Multimedia_Crear usp_CMS_Multimedia_Crear(string nombreOriginal, string archivoBase64, string tipoMIME, int idUsuarioSubio)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Multimedia_Crear RespuestaMetodo = new Rsp_usp_CMS_Multimedia_Crear();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Multimedia_Crear(nombreOriginal, archivoBase64, tipoMIME, idUsuarioSubio).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Multimedia_Eliminar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Multimedia_Eliminar usp_CMS_Multimedia_Eliminar(int idArchivo)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Multimedia_Eliminar RespuestaMetodo = new Rsp_usp_CMS_Multimedia_Eliminar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Multimedia_Eliminar(idArchivo);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Multimedia_Listar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Multimedia_ListarResult[] Resultado;
        }
        public Rsp_usp_CMS_Multimedia_Listar usp_CMS_Multimedia_Listar()
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Multimedia_Listar RespuestaMetodo = new Rsp_usp_CMS_Multimedia_Listar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Multimedia_Listar().ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Multimedia_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Multimedia_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_Multimedia_ObtenerPorId usp_CMS_Multimedia_ObtenerPorId(int idArchivo)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Multimedia_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_Multimedia_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Multimedia_ObtenerPorId(idArchivo).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Rol_Actualizar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Rol_Actualizar usp_CMS_Rol_Actualizar(int idRol, string nombreRol, string descripcion)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Rol_Actualizar RespuestaMetodo = new Rsp_usp_CMS_Rol_Actualizar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Rol_Actualizar(idRol, nombreRol, descripcion);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Rol_Crear
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Rol_CrearResult[] Resultado;
        }
        public Rsp_usp_CMS_Rol_Crear usp_CMS_Rol_Crear(string nombreRol, string descripcion)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Rol_Crear RespuestaMetodo = new Rsp_usp_CMS_Rol_Crear();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Rol_Crear(nombreRol, descripcion).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Rol_Eliminar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Rol_Eliminar usp_CMS_Rol_Eliminar(int idRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Rol_Eliminar RespuestaMetodo = new Rsp_usp_CMS_Rol_Eliminar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Rol_Eliminar(idRol);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Rol_Listar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Rol_ListarResult[] Resultado;
        }
        public Rsp_usp_CMS_Rol_Listar usp_CMS_Rol_Listar()
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Rol_Listar RespuestaMetodo = new Rsp_usp_CMS_Rol_Listar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Rol_Listar().ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Rol_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Rol_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_Rol_ObtenerPorId usp_CMS_Rol_ObtenerPorId(int idRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Rol_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_Rol_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Rol_ObtenerPorId(idRol).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Usuario_Actualizar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Usuario_Actualizar usp_CMS_Usuario_Actualizar(int idUsuario, string nombreCompleto, string usuario, string password)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Usuario_Actualizar RespuestaMetodo = new Rsp_usp_CMS_Usuario_Actualizar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Usuario_Actualizar(idUsuario, nombreCompleto, usuario, password);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Usuario_Crear
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Usuario_CrearResult[] Resultado;
        }
        public Rsp_usp_CMS_Usuario_Crear usp_CMS_Usuario_Crear(string nombreCompleto, string usuario, string password)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Usuario_Crear RespuestaMetodo = new Rsp_usp_CMS_Usuario_Crear();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Usuario_Crear(nombreCompleto, usuario, password).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Usuario_Eliminar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_Usuario_Eliminar usp_CMS_Usuario_Eliminar(int idUsuario)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Usuario_Eliminar RespuestaMetodo = new Rsp_usp_CMS_Usuario_Eliminar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Usuario_Eliminar(idUsuario);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Usuario_Listar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Usuario_ListarResult[] Resultado;
        }
        public Rsp_usp_CMS_Usuario_Listar usp_CMS_Usuario_Listar()
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Usuario_Listar RespuestaMetodo = new Rsp_usp_CMS_Usuario_Listar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Usuario_Listar().ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Usuario_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Usuario_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_Usuario_ObtenerPorId usp_CMS_Usuario_ObtenerPorId(int idUsuario)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Usuario_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_Usuario_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Usuario_ObtenerPorId(idUsuario).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_Usuario_ValidarLogin
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_Usuario_ValidarLoginResult[] Resultado;
        }
        public Rsp_usp_CMS_Usuario_ValidarLogin usp_CMS_Usuario_ValidarLogin(string usuario, string password)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_Usuario_ValidarLogin RespuestaMetodo = new Rsp_usp_CMS_Usuario_ValidarLogin();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_Usuario_ValidarLogin(usuario, password).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_UsuarioRol_Asignar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_UsuarioRol_AsignarResult[] Resultado;
        }
        public Rsp_usp_CMS_UsuarioRol_Asignar usp_CMS_UsuarioRol_Asignar(int idUsuario, int idRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_UsuarioRol_Asignar RespuestaMetodo = new Rsp_usp_CMS_UsuarioRol_Asignar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_UsuarioRol_Asignar(idUsuario, idRol).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_UsuarioRol_ListarPorUsuario
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_UsuarioRol_ListarPorUsuarioResult[] Resultado;
        }
        public Rsp_usp_CMS_UsuarioRol_ListarPorUsuario usp_CMS_UsuarioRol_ListarPorUsuario(int idUsuario)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_UsuarioRol_ListarPorUsuario RespuestaMetodo = new Rsp_usp_CMS_UsuarioRol_ListarPorUsuario();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_UsuarioRol_ListarPorUsuario(idUsuario).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_UsuarioRol_ObtenerPorId
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public usp_CMS_UsuarioRol_ObtenerPorIdResult[] Resultado;
        }
        public Rsp_usp_CMS_UsuarioRol_ObtenerPorId usp_CMS_UsuarioRol_ObtenerPorId(int idUsuarioRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_UsuarioRol_ObtenerPorId RespuestaMetodo = new Rsp_usp_CMS_UsuarioRol_ObtenerPorId();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_UsuarioRol_ObtenerPorId(idUsuarioRol).ToArray();
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }
        public class Rsp_usp_CMS_UsuarioRol_Quitar
        {
            public bool Error;
            public string Message;
            public string StackTrace;
            public int SqlErrorCode;
            public int Resultado;
        }
        public Rsp_usp_CMS_UsuarioRol_Quitar usp_CMS_UsuarioRol_Quitar(int idUsuarioRol)
        {
            /**Inicio Codigo Previo**/

            /**Fin Codigo Previo**/
            Rsp_usp_CMS_UsuarioRol_Quitar RespuestaMetodo = new Rsp_usp_CMS_UsuarioRol_Quitar();
            string cadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (Banchile_CMSDataContext linkbd = new Banchile_CMSDataContext(cadenaConexion))
            {
                try
                {
                    RespuestaMetodo.Resultado = linkbd.usp_CMS_UsuarioRol_Quitar(idUsuarioRol);
                    RespuestaMetodo.Error = false;
                    RespuestaMetodo.Message = "";
                    RespuestaMetodo.StackTrace = "";
                }
                catch (System.Data.SqlClient.SqlException sqlEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = sqlEx.Message;
                    RespuestaMetodo.SqlErrorCode = sqlEx.Number;
                    RespuestaMetodo.StackTrace = sqlEx.StackTrace;
                }
                catch (NullReferenceException nullRefEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = nullRefEx.Message;
                    RespuestaMetodo.StackTrace = nullRefEx.StackTrace;
                }
                catch (InvalidCastException castEx)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = castEx.Message;
                    RespuestaMetodo.StackTrace = castEx.StackTrace;
                }
                catch (Exception e1)
                {
                    RespuestaMetodo.Error = true;
                    RespuestaMetodo.Message = e1.Message;
                    RespuestaMetodo.StackTrace = e1.StackTrace;
                }
                return RespuestaMetodo;
            }
        }

    }
}