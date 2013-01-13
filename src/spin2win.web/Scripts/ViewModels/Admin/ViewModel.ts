/// <reference path="..\..\knockout-2.2.d.ts" />
/// <reference path="..\..\jquery-1.8.d.ts" />
/// <reference path="..\..\Models\Player.ts" />
/// <reference path="..\..\Models\Settings.ts" />
/// <reference path="EditablePlayer.ts" />

declare var $: jQuery;
declare var ko: Knockout;

module ViewModels.Admin {
    export class ViewModel {
        public players = ko.observableArray([]);
        public editedPlayer = ko.observable();
        public isEdited: () =>void;
        public isPlayable: () =>void;

        constructor (private players: Models.Player[], public settings: Models.Settings) {

            $.each(players, (index, player: Models.Player) => {
                console.log(player, this.players());
                this.players.push(new EditablePlayer(player));
            });

            this.players.sort(this.sortAlphabetically);

            this.includePlayer = <() => void >  this.includePlayer.bind(this);
            this.saveSetting = <() => void >  this.saveSetting.bind(this);
            this.addPlayer = <() => void >  this.addPlayer.bind(this);
            this.editPlayer = <() => void >  this.editPlayer.bind(this);
            this.savePlayer = <() => void >  this.savePlayer.bind(this);
            this.deletePlayer = <() => void >  this.deletePlayer.bind(this);

            this.isEdited = ko.computed(() => {
                return this.editedPlayer() != undefined;
            });

            if (this.settings == null) {
                this.settings = Models.Settings.defaultObject();
            }

            this.isPlayable = ko.computed(() => {
                var includedPlayers = 0;
                for (var i = 0; i < this.players().length; i++) {
                    console.log(this.players()[i], this.players()[i].included());
                    if (this.players()[i].included()) {
                        console.log("yes");
                        includedPlayers++;
                    }
                }

                return includedPlayers > 1;
            });
        }

        public navigatePlay() {
            if (this.isPlayable()) {
                console.log("Va fan");
                location.href = "/Play/Index";
            }
        }

        public saveSetting(viewModel) {
            $.ajax("/Admin/SaveSettings", {
                data: ko.toJSON({ "settings": viewModel.settings }),
                type: "post",
                contentType: 'application/json',
                dataType: 'json'
            });
        }

        public addPlayer() {
            this.editedPlayer(new EditablePlayer(Models.Player.defaultObject()));
        }

        public totalNumberOfSlots() {
            var i: number = 0;

            $.each(this.players(), (index, player: EditablePlayer) => {
                if (player.included()) {
                    i = i + Number(player.numberOfSlots());
                }
            });

            return i;
        }

        public includePlayer(player: EditablePlayer) {
            if (player.included()) {
                player.included(false);
            } else {
                player.included(true);
            }

            this.persistPlayer(player, () => { }, "/Admin/SavePlayer")
        }

        public editPlayer(player: EditablePlayer) {
            this.editedPlayer(player);
        }

        public deletePlayer() {
            var doneFunc = (data) => {
                for (var i = 0; i < this.players().length; i++) {
                    if (this.editedPlayer().id == this.players()[i].id) {
                        this.players.splice(i, 1);
                        break;
                    }
                }

                this.editedPlayer(undefined);
            }

            this.persistPlayer(this.editedPlayer(), doneFunc, "/Admin/DeletePlayer");
        }

        public savePlayer() {
            var doneFunc = (data) => {
                if (this.editedPlayer().isNew()) {
                    this.editedPlayer().id = data.Id;
                    this.players.push(this.editedPlayer());
                } else {
                    for (var i = 0; i < this.players().length; i++) {
                        if (this.editedPlayer().id == this.players()[i].id) {
                            this.players.splice(i, 1, this.editedPlayer());
                            break;
                        }
                    }

                }

                this.players.sort(this.sortAlphabetically);
                this.editedPlayer(undefined);
            }

            this.persistPlayer(this.editedPlayer(), doneFunc, "/Admin/SavePlayer");
        }

        private persistPlayer(player, doneFunc, url) {
            $.ajax(url, {
                data: ko.toJSON(player),
                type: "post",
                contentType: 'application/json',
                dataType: 'json'
            }).done(doneFunc);
        }

        private sortAlphabetically(a, b) {
            if (a.name() < b.name())
                return -1;
            if (a.name() > b.name())
                return 1;
            return 0;
        }
    }
}

