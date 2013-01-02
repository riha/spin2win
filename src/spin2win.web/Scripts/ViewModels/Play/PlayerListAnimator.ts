/// <reference path="..\..\knockout-2.2.d.ts" />
/// <reference path="..\..\jquery-1.8.d.ts" />
/// <reference path="ActivePlayer.ts" />

declare var $: jQuery;
declare var ko: Knockout;

module ViewModels.Play {

    export class PlayerListAnimator{
        constructor (private activePlayers: KnockoutObservableArray,) { }

        public showPlayers() {
            var status = $.Deferred();
            this.showPlayerAnimation(this.activePlayers()[0], 0, status);
            return status.promise();
        }

        private showPlayerAnimation(player: ActivePlayer, currentIndex: number, status: JQueryDeferred) {
            player.runPlayerCardAnimation(ActivePlayer.ShowPlayerAnimationEnum);
            currentIndex++;
            //console.log("show", player, currentIndex);
            setTimeout(() => player.runPlayerCardAnimation(ActivePlayer.NonePlayerAnimationEnum), 1000);
            if (currentIndex >= this.activePlayers().length) {
                console.log("exit");
                setTimeout(() => {
                    status.resolve();
                }, 1000);
                return;
            } else {
                setTimeout(() => this.showPlayerAnimation(this.activePlayers()[currentIndex], currentIndex, status), 100);
            }
        }

        public hidePlayers() {
            var currentIndex = this.activePlayers().length - 1;
            var player = this.activePlayers()[currentIndex];
            console.log("start")
            var status = $.Deferred();
            this.hidePlayerAnimation(player, currentIndex, status);
            return status.promise();
        }

        private hidePlayerAnimation(player: ActivePlayer, currentIndex: number, status: JQueryDeferred) {
            console.log("player", player);
            player.runPlayerCardAnimation(ActivePlayer.HidePlayerAnimationEnum);
            currentIndex--;
            //console.log("hide", player, currentIndex);
            setTimeout(() => player.runPlayerCardAnimation(ActivePlayer.HiddenPlayerAnimationEnum), 1000);
            if (currentIndex <= -1) {
                console.log("exit");
                setTimeout(() => {
                    status.resolve();
                }, 1000);
                return;
            } else {
                setTimeout(() => this.hidePlayerAnimation(this.activePlayers()[currentIndex], currentIndex, status), 100);
            }
        }
    }

}

