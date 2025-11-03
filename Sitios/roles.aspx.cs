using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CMSBanchileSEGUROS.Sitios
{
    public partial class roles : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                // The code that is causing the error is likely in the .aspx file,
                // but this try-catch block will help us identify the issue.
            }
            catch (Exception ex)
            {
                // Log the exception to a file or the event log.
                // For now, we'll just write it to the response.
                Response.Write("An error occurred: " + ex.Message);
                Response.End();
            }
        }
    }
}