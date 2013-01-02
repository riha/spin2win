/// <reference path="..\jquery-1.8.d.ts" />
/// <reference path="Player.ts" />
/// <reference path="Settings.ts" />

module Models {

    export class ModelConverter {

        public static convertServerSidePlayerModel(serverSidePlayer: any): Player[] {
            var players = [];

            $.each(serverSidePlayer, function (i, item) {
                var player = new Models.Player(item.Id, item.Name, item.NumberOfSlots, item.PictureUrl, item.Included)
                console.log("convert", item, player)
                players.push(player);
            });
            console.log(players);
            return players;
        }

        public static convertServerSideSettingModel(serverSideSettings: any): Settings {
            var settings: Settings;

            if (serverSideSettings != null) {
                settings = new Models.Settings(serverSideSettings.Id, serverSideSettings.NumberOfRounds);
            }

            return settings;
        }

    }

}

