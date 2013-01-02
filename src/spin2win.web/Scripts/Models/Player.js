var Models;
(function (Models) {
    var Player = (function () {
        function Player(id, name, numberOfSlots, pictureUrl, included) {
            this.id = id;
            this.name = name;
            this.numberOfSlots = numberOfSlots;
            this.pictureUrl = pictureUrl;
            this.included = included;
        }
        Player.defaultObject = function defaultObject() {
            return new Player(null, null, 1, null, true);
        }
        return Player;
    })();
    Models.Player = Player;    
})(Models || (Models = {}));

