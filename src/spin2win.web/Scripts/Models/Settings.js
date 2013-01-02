var Models;
(function (Models) {
    var Settings = (function () {
        function Settings(id, numberOfRounds) {
            this.id = id;
            this.numberOfRounds = numberOfRounds;
        }
        Settings.defaultObject = function defaultObject() {
            return new Settings(null, 3);
        }
        return Settings;
    })();
    Models.Settings = Settings;    
})(Models || (Models = {}));

