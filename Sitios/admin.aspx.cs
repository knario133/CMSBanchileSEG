using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CMSBanchileSEGUROS.Sitios
{
    public partial class admin : System.Web.UI.Page
    {
        public int ContenidoCount { get; private set; }
        public int CategoriasCount { get; private set; }
        public int UsuariosCount { get; private set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadDashboardData();
            }
        }

        private void LoadDashboardData()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["BANCHILE_CMSConnectionString"].ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM CMS_Contenido", connection))
                {
                    ContenidoCount = (int)command.ExecuteScalar();
                }
                using (SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM CMS_Categoria", connection))
                {
                    CategoriasCount = (int)command.ExecuteScalar();
                }
                using (SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM CMS_Usuario", connection))
                {
                    UsuariosCount = (int)command.ExecuteScalar();
                }
            }
        }
    }
}