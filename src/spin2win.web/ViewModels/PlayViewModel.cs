using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using spin2win.web.Models;

namespace spin2win.web.ViewModels
{
    public class PlayViewModel
    {
        public IEnumerable<Player> Players;
        public Settings Settings;

        public PlayViewModel(IEnumerable<Player> players, Settings settings)
        {
            Players = players;
            Settings = settings;
        }
    }
}