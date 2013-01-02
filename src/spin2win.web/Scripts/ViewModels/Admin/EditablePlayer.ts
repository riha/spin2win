/// <reference path="..\..\knockout-2.2.d.ts" />

declare var ko: Knockout;

module ViewModels.Admin {
    export class EditablePlayer {
        public id = ko.observable();
        public name = ko.observable();
        public numberOfSlots = ko.observable();
        public pictureUrl = ko.observable();
        public included = ko.observable();

        constructor (player:Models.Player) {
            this.id(player.id);
            this.name(player.name);
            this.numberOfSlots(player.numberOfSlots);
            this.pictureUrl(player.pictureUrl);
            this.included(player.included);
        }

        public isNew() {
            return this.id() == undefined;
        }

    }
}
