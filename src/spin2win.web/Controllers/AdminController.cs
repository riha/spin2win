using System;
using System.Web.Mvc;
using spin2win.web.Models;
using spin2win.web.ViewModels;

namespace spin2win.web.Controllers
{
    [Authorize]
    public class AdminController : BaseController
    {
        public ActionResult Index()
        {
            var context = new CloudTableContext();
            var user = ((User)HttpContext.User.Identity);
            var players = context.GetPlayers(user);
            var settings = context.GetSettings(user);

            return View(new AdminViewModel(players, settings));
        }

        [HttpPost]
        public JsonResult SavePlayer(Player player)
        {
            string playerId;
            try
            {
                var context = new CloudTableContext();
                playerId = context.SavePlayer((User)HttpContext.User.Identity, player);
            }
            catch (Exception exception)
            {
                //TODO:logging of exception!
                return Json(new { Success = false, ErrorMessage = exception.Message });
            }

            return Json(new { Success = true, Id = playerId });
        }

        [HttpPost]
        public JsonResult SaveSettings(Settings settings)
        {
            try
            {
                var context = new CloudTableContext();
                context.SaveSettings((User)HttpContext.User.Identity, settings);
            }
            catch (Exception exception)
            {
                //TODO:logging of exception!
                return Json(new { Success = false, ErrorMessage = exception.Message });
            }

            return Json(new { Success = true });
        }


        [HttpPost]
        public JsonResult DeletePlayer(Player player)
        {
            try
            {
                var context = new CloudTableContext();
                context.DeletePlayer((User)HttpContext.User.Identity, player);
            }
            catch (Exception exception)
            {
                //TODO:logging of exception!
                //return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                return Json(new { Success = false, ErrorMessage = exception.Message });
            }

            return Json(new { Success = true });
        }

    }
}
