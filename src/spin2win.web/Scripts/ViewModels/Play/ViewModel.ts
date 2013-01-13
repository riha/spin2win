/// <reference path="..\..\knockout-2.2.d.ts" />
/// <reference path="..\..\jquery-1.8.d.ts" />
/// <reference path="..\..\Models\Player.ts" />
/// <reference path="..\..\Models\Settings.ts" />
/// <reference path="Wheel.ts" />
/// <reference path="ActivePlayer.ts" />
/// <reference path="PlayerListAnimator.ts" />

declare var $: jQuery;
declare var ko: Knockout;

module ViewModels.Play {
    export class ViewModel {
        public degreeTransformation: () =>void;
        public currentPlayer: KnockoutObservableAny;
        public degree: KnockoutObservableNumber = ko.observable(0);
        public activePlayers: KnockoutObservableArray = ko.observableArray([]);
        public currentRound: KnockoutObservableNumber = ko.observable(1);
        public running = ko.observable(false);
        public roundWinner: ActivePlayer;
        public winner = ko.observable();
        private playerListAnimator;

        constructor (players: Models.Player[], public settings: Models.Settings, private wheel: Models.Wheel) {

            var colors = Common.Utils.colors;
            $.each(players, (index, item: Models.Player) => {
                var activePlayer = new ActivePlayer(item.id, item.name, item.numberOfSlots, item.pictureUrl, settings.numberOfRounds, colors[index]);
                this.activePlayers.push(activePlayer);

            });

            console.log(this.winner());

            this.activePlayers.sort(ViewModel.sortByWinnerFunc);

            this.wheel.draw(this.activePlayers());

            this.playerListAnimator = new PlayerListAnimator(this.activePlayers);
            this.playerListAnimator.showPlayers();

            this.currentPlayer = ko.observable({ name: "Mr. Nobody" });

            this.degreeTransformation = ko.computed(() => {
                return "rotate(" + this.degree() + "deg)";
            });

            this.continuePlay = <() => void >  this.continuePlay.bind(this);

            $(document).bind("move", (event, degress) => {
                this.degree(degress);
            });

            $(document).bind("current", (event, player: Models.Player) => {
                var current: ActivePlayer = this.getActivePlayerById(player.id);
                this.setCurrentPlayer(current);
            });

            $(document).bind("complete", (event, player: Models.Player) => {
                this.roundWinner = this.getActivePlayerById(player.id);

                if (settings.numberOfRounds == this.roundWinner.numberOfWins() + 1) {
                    this.showGameWinner();
                } else {
                    this.showRoundWinner();
                }
            });

            this.spin = <() => void >  this.spin.bind(this);
        }

        public continuePlay() {

            for (var i = 0; i < this.activePlayers().length; i++) {
                if (this.winner().id == this.activePlayers()[i].id) {
                    this.activePlayers.splice(i, 1);
                    break;
                }
            }

            this.wheel.clear();
            this.wheel.draw(this.activePlayers());
            this.running(false);
            //this.wheel.spin();
        }

        private showGameWinner() {
            this.roundWinner.addWin();
            this.winner(this.roundWinner);
        }

        private showRoundWinner() {
            this.setCurrentPlayer(this.roundWinner);
            this.roundWinner.runWinnerAnimation(true);
            setTimeout(() => {
                this.roundWinner.runWinnerAnimation(false);

                this.playerListAnimator.hidePlayers()
                    .done(() =>  {
                        console.log("done", this);
                        this.roundWinner.addWin();
                        this.activePlayers.sort(ViewModel.sortByWinnerFunc);
                        console.log("after sort", this.activePlayers());

                        this.playerListAnimator.showPlayers().done(() => {
                            this.enableNextRound();
                        });

                    });

            }, 500)

            console.log("complete", this.roundWinner);
        }

        private enableNextRound() {
            this.currentRound(this.currentRound() + 1);
            this.running(false);
        }

        private static sortByWinnerFunc = function (a, b) {
            if (a.numberOfWins() < b.numberOfWins()) return 1;
            if (a.numberOfWins() > b.numberOfWins()) return -1;
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;

            return 0;
        };

        private setCurrentPlayer(player: ActivePlayer) {
            if (player.id != this.currentPlayer().id) {
                this.currentPlayer(player);
            }
        }

        private getActivePlayerById(id: string) {
            var player: ActivePlayer = ko.utils.arrayFirst(this.activePlayers(), function (activePlayer: ActivePlayer) {
                return activePlayer.id == id;
            });

            return player;
        }

        public spin() {
            if (!this.running()) {
                this.wheel.spin();
                this.running(true);
            }
        }
    }
}

