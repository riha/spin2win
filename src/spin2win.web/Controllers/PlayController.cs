using System.Linq;
using System.Web.Mvc;
using spin2win.web.Models;
using spin2win.web.ViewModels;

namespace spin2win.web.Controllers
{
    [Authorize]
    public class PlayController : BaseController
    {
        public ActionResult Index()
        {
            var context = new CloudTableContext();
            var user = ((User)HttpContext.User.Identity);
            var players = context.GetPlayers(user).Where(p => p.Included);
            var settings = context.GetSettings(user);

            return View(new PlayViewModel(players, settings));
        }

    }
}
