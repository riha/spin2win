using System.Web.Optimization;

namespace spin2win.web.App_Start
{
    public class BundlesConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            var less = new Bundle("~/bundles/less")
                .Include("~/Content/*.less");
            less.Transforms.Add(new LessTransform());
            less.Transforms.Add(new CssMinify());
            bundles.Add(less);

            var animate = new StyleBundle("~/bundles/css").Include("~/Content/animate.css");
            bundles.Add(animate);

            var jquery = new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js");
            bundles.Add(jquery);

            var knockout = new ScriptBundle("~/bundles/knockout")
                .Include("~/Scripts/knockout-{version}.js")
                .Include("~/Scripts/knockout.custombindings.js");
            bundles.Add(knockout);

            var bootstrap = new ScriptBundle("~/bundles/bootstrap")
                .Include("~/Scripts/bootstrap.js");
            bundles.Add(bootstrap);

            var game = new ScriptBundle("~/bundles/game")
                .Include("~/Scripts/Utils.js")
                .Include("~/Scripts/Models/Settings.js")
                .Include("~/Scripts/Models/Utils.js")
                .Include("~/Scripts/Models/Player.js")
                .Include("~/Scripts/Models/ModelConverter.js")
                .Include("~/Scripts/ViewModels/Admin/EditablePlayer.js")
                .Include("~/Scripts/ViewModels/Play/ActivePlayer.js")
                .Include("~/Scripts/ViewModels/Play/PlayerListAnimator.js")
                .Include("~/Scripts/ViewModels/Play/Wheel.js")
                .Include("~/Scripts/ViewModels/Play/ViewModel.js")
                .Include("~/Scripts/ViewModels/Admin/ViewModel.js");

            bundles.Add(game);

            //TODO: I get an error on the admin page when reading oberables when turning this on .. annoying
            BundleTable.EnableOptimizations = false;
        }
    }
}