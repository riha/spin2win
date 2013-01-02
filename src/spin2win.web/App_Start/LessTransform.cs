using System.Web.Optimization;

namespace spin2win.web.App_Start
{
    public class LessTransform : IBundleTransform
    {
        public void Process(BundleContext context, BundleResponse response)
        {
            response.Content = dotless.Core.Less.Parse(response.Content);
            response.ContentType = "text/css";
        }

    }
}