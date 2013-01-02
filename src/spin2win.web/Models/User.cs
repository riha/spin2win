using System.Security.Principal;
using Facebook;

namespace spin2win.web.Models
{
    public class User:IIdentity
    {
        public static User Load(FacebookClient client, string userId)
        {
            dynamic me = client.Get(userId);

            if (me == null)
                throw new FacebookOAuthException("Returned null when requesting user");

            if (((object)me) is bool)
                throw new FacebookOAuthException("Returned bool when requesting user");

            var user = new User(userId)
            {
                Id = me.id,
                Name = me.name,
                UserName = me.username
            };

            return user;
        }

        public string PictureLink()
        {
            return string.Concat("http://graph.facebook.com/", this.UserName, "/picture");
        }

        private User(string id)
        {
            AuthenticationType = "Facebook";
            IsAuthenticated = true;
            Id = id;
        }

        public string Name { get; private set; }
        public string UserName { get; private set; }
        public string Id { get; private set; }
        public string AuthenticationType { get; private set; }
        public bool IsAuthenticated { get; private set; }
    }
}