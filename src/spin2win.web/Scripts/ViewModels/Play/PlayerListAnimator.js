var ViewModels;
(function (ViewModels) {
    (function (Play) {
        var PlayerListAnimator = (function () {
            function PlayerListAnimator(activePlayers) {
                this.activePlayers = activePlayers;
            }
            PlayerListAnimator.prototype.showPlayers = function () {
                var status = $.Deferred();
                this.showPlayerAnimation(this.activePlayers()[0], 0, status);
                return status.promise();
            };
            PlayerListAnimator.prototype.showPlayerAnimation = function (player, currentIndex, status) {
                var _this = this;
                player.runPlayerCardAnimation(Play.ActivePlayer.ShowPlayerAnimationEnum);
                currentIndex++;
                setTimeout(function () {
                    return player.runPlayerCardAnimation(Play.ActivePlayer.NonePlayerAnimationEnum);
                }, 1000);
                if(currentIndex >= this.activePlayers().length) {
                    console.log("exit");
                    setTimeout(function () {
                        status.resolve();
                    }, 1000);
                    return;
                } else {
                    setTimeout(function () {
                        return _this.showPlayerAnimation(_this.activePlayers()[currentIndex], currentIndex, status);
                    }, 100);
                }
            };
            PlayerListAnimator.prototype.hidePlayers = function () {
                var currentIndex = this.activePlayers().length - 1;
                var player = this.activePlayers()[currentIndex];
                console.log("start");
                var status = $.Deferred();
                this.hidePlayerAnimation(player, currentIndex, status);
                return status.promise();
            };
            PlayerListAnimator.prototype.hidePlayerAnimation = function (player, currentIndex, status) {
                var _this = this;
                console.log("player", player);
                player.runPlayerCardAnimation(Play.ActivePlayer.HidePlayerAnimationEnum);
                currentIndex--;
                setTimeout(function () {
                    return player.runPlayerCardAnimation(Play.ActivePlayer.HiddenPlayerAnimationEnum);
                }, 1000);
                if(currentIndex <= -1) {
                    console.log("exit");
                    setTimeout(function () {
                        status.resolve();
                    }, 1000);
                    return;
                } else {
                    setTimeout(function () {
                        return _this.hidePlayerAnimation(_this.activePlayers()[currentIndex], currentIndex, status);
                    }, 100);
                }
            };
            return PlayerListAnimator;
        })();
        Play.PlayerListAnimator = PlayerListAnimator;        
    })(ViewModels.Play || (ViewModels.Play = {}));
    var Play = ViewModels.Play;

})(ViewModels || (ViewModels = {}));

