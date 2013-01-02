/// <reference path="..\..\knockout-2.2.d.ts" />
/// <reference path="..\..\Models\Player.ts" />

declare var ko: Knockout;

module ViewModels.Play {
    //Note: this class should really extend the Player class but that require a specific load order of the JS files
    export class ActivePlayer {
        public wins = [];
        public runWinnerAnimation = ko.observable(false);
        public runPlayerCardAnimation = ko.observable(ActivePlayer.HiddenPlayerAnimationEnum);
        public repaintAnimation: () =>void;

        public static HiddenPlayerAnimationEnum = 0;
        public static HidePlayerAnimationEnum = 1;
        public static ShowPlayerAnimationEnum = 2;
        public static NonePlayerAnimationEnum = 3;


        constructor (public id, public name, public numberOfSlots, public pictureUrl, numberOfRounds: number, public color: string) {

            for (var i = 0; i < numberOfRounds; i++) {
                this.wins.push(ko.observable(false));
            }

            this.repaintAnimation = ko.computed(() => {
                if (this.runPlayerCardAnimation() == ActivePlayer.NonePlayerAnimationEnum) {
                    return "";
                } else if (this.runPlayerCardAnimation() == ActivePlayer.HiddenPlayerAnimationEnum) {
                    return "hide";
                } else if (this.runPlayerCardAnimation() == ActivePlayer.HidePlayerAnimationEnum) {
                    return "animated flipOutX";
                } else if (this.runPlayerCardAnimation() == ActivePlayer.ShowPlayerAnimationEnum) {
                    return "animated flipInX";
                }
            });
        }

        public addWin() {
            for (var i = 0; i < this.wins.length; i++) {
                var current = this.wins[i];
                if (current() == false) {
                    this.wins[i](true);
                    return;
                }
            }
        }

        public numberOfWins() {
            var n = 0;
            for (var i = 0; i < this.wins.length; i++) {
                var current = this.wins[i];
                if (current() == true) {
                    n++;
                }
            }

            return n;
        }
    }
}