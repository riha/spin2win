var ViewModels;
(function (ViewModels) {
    (function (Admin) {
        var EditablePlayer = (function () {
            function EditablePlayer(player) {
                this.id = ko.observable();
                this.name = ko.observable();
                this.numberOfSlots = ko.observable();
                this.pictureUrl = ko.observable();
                this.included = ko.observable();
                this.id(player.id);
                this.name(player.name);
                this.numberOfSlots(player.numberOfSlots);
                this.pictureUrl(player.pictureUrl);
                this.included(player.included);
            }
            EditablePlayer.prototype.isNew = function () {
                return this.id() == undefined;
            };
            return EditablePlayer;
        })();
        Admin.EditablePlayer = EditablePlayer;        
    })(ViewModels.Admin || (ViewModels.Admin = {}));
    var Admin = ViewModels.Admin;

})(ViewModels || (ViewModels = {}));

