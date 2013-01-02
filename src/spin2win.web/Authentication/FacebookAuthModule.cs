using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Principal;
using System.Text.RegularExpressions;
using System.Web;
using Facebook;
using spin2win.web.Models;

namespace spin2win.web.Authentication
{
    public class FacebookAuthModule : IHttpModule
    {
        private static readonly List<string> ExcludePathsRegEx = new List<string> {"/Content/*","/favicon.ico"};

        public void Dispose() { }

        public void Init(HttpApplication context)
        {
            context.AuthenticateRequest += new EventHandler(context_AuthenticateRequest);
        }

        private void context_AuthenticateRequest(object sender, EventArgs e)
        {
            var httpApplication = (HttpApplication)sender;
            var context = httpApplication.Context;

            foreach (var regex in ExcludePathsRegEx)
            {
                if(new Regex(regex).IsMatch(context.Request.Path))
                    return;
            }

            var applicationId = ConfigurationManager.AppSettings["facebookApplicationId"];
            var applicationSecret = ConfigurationManager.AppSettings["facebookApplicationSecret"];

            var client = new FacebookClient();

            //Read the signed request added by the Javascript SDK login
            var signedRequestCookie = context.Request.Cookies[string.Concat("fbsr_", applicationId)];

            dynamic signedRequest;

            if (signedRequestCookie == null)
                return;

            if (!client.TryParseSignedRequest(applicationSecret, signedRequestCookie.Value, out signedRequest))
                return;

            if (signedRequest == null)
                return;

            if (signedRequest.expires != null)
            {
                int expires = signedRequest.expires;
                return;
            }

            string userId = signedRequest.user_id;

            if (string.IsNullOrEmpty(userId))
                return;

            User user;

            try
            {
                user = User.Load(client, userId);

                if (user == null)
                    return;
            }
            catch (FacebookOAuthException ex)
            {
                return;
            }

            context.User = new GenericPrincipal(user, null);
        }
    }
}