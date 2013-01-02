var Models;
(function (Models) {
    var ModelConverter = (function () {
        function ModelConverter() { }
        ModelConverter.convertServerSidePlayerModel = function convertServerSidePlayerModel(serverSidePlayer) {
            var players = [];
            $.each(serverSidePlayer, function (i, item) {
                var player = new Models.Player(item.Id, item.Name, item.NumberOfSlots, item.PictureUrl, item.Included);
                console.log("convert", item, player);
                players.push(player);
            });
            console.log(players);
            return players;
        }
        ModelConverter.convertServerSideSettingModel = function convertServerSideSettingModel(serverSideSettings) {
            var settings;
            if(serverSideSettings != null) {
                settings = new Models.Settings(serverSideSettings.Id, serverSideSettings.NumberOfRounds);
            }
            return settings;
        }
        return ModelConverter;
    })();
    Models.ModelConverter = ModelConverter;    
})(Models || (Models = {}));

