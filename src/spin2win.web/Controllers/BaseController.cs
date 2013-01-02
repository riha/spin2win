using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using spin2win.web.Models;

namespace spin2win.web.Controllers
{
    public class BaseController : Controller
    {
        public User CurrentUser;

        public BaseController()
        {
            //if (HttpContext != null)
            //    CurrentUser = (User)HttpContext.User.Identity;

            var applicationId = ConfigurationManager.AppSettings["FacebookApplicationId"];

            if (string.IsNullOrEmpty(applicationId))
                throw new ConfigurationErrorsException("Facebook application id is missing from configuration");

            ViewBag.ApplicationId = applicationId;
        }
    }
}