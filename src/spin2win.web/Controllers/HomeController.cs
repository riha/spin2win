using System.Web.Mvc;

namespace spin2win.web.Controllers
{
    [Authorize]
    public class HomeController : BaseController
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

    }
}
