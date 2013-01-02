var ViewModels;
(function (ViewModels) {
    (function (Play) {
        var ViewModel = (function () {
            function ViewModel(players, settings, wheel) {
                this.settings = settings;
                this.wheel = wheel;
                var _this = this;
                this.degree = ko.observable(0);
                this.activePlayers = ko.observableArray([]);
                this.currentRound = ko.observable(1);
                this.running = ko.observable(false);
                this.showWinner = ko.observable(false);
                var colors = Common.Utils.colors;
                $.each(players, function (index, item) {
                    var activePlayer = new Play.ActivePlayer(item.id, item.name, item.numberOfSlots, item.pictureUrl, settings.numberOfRounds, colors[index]);
                    _this.activePlayers.push(activePlayer);
                });
                this.activePlayers.sort(ViewModel.sortByWinnerFunc);
                this.wheel.draw(this.activePlayers());
                this.playerListAnimator = new Play.PlayerListAnimator(this.activePlayers);
                this.playerListAnimator.showPlayers();
                this.currentPlayer = ko.observable({
                    name: "Mr. Nobody"
                });
                this.degreeTransformation = ko.computed(function () {
                    return "rotate(" + _this.degree() + "deg)";
                });
                this.continuePlay = this.continuePlay.bind(this);
                $(document).bind("move", function (event, degress) {
                    _this.degree(degress);
                });
                $(document).bind("current", function (event, player) {
                    var current = _this.getActivePlayerById(player.id);
                    _this.setCurrentPlayer(current);
                });
                $(document).bind("complete", function (event, player) {
                    _this.roundWinner = _this.getActivePlayerById(player.id);
                    if(settings.numberOfRounds == _this.roundWinner.numberOfWins() + 1) {
                        console.log("Winner!!!!");
                        _this.roundWinner.addWin();
                        _this.showWinner(true);
                    } else {
                        _this.showRoundWinner();
                    }
                });
                this.spin = this.spin.bind(this);
            }
            ViewModel.prototype.continuePlay = function () {
                console.log("Nu kör vi!");
                this.wheel.spin();
            };
            ViewModel.prototype.showRoundWinner = function () {
                var _this = this;
                this.setCurrentPlayer(this.roundWinner);
                this.roundWinner.runWinnerAnimation(true);
                setTimeout(function () {
                    _this.roundWinner.runWinnerAnimation(false);
                    _this.playerListAnimator.hidePlayers().done(function () {
                        console.log("done", _this);
                        _this.roundWinner.addWin();
                        _this.activePlayers.sort(ViewModel.sortByWinnerFunc);
                        console.log("after sort", _this.activePlayers());
                        _this.playerListAnimator.showPlayers().done(function () {
                            _this.enableNextRound();
                        });
                    });
                }, 500);
                console.log("complete", this.roundWinner);
            };
            ViewModel.prototype.enableNextRound = function () {
                this.currentRound(this.currentRound() + 1);
                this.running(false);
            };
            ViewModel.sortByWinnerFunc = function (a, b) {
                if(a.numberOfWins() < b.numberOfWins()) {
                    return 1;
                }
                if(a.numberOfWins() > b.numberOfWins()) {
                    return -1;
                }
                if(a.name > b.name) {
                    return 1;
                }
                if(a.name < b.name) {
                    return -1;
                }
                return 0;
            };
            ViewModel.prototype.setCurrentPlayer = function (player) {
                if(player.id != this.currentPlayer().id) {
                    this.currentPlayer(player);
                }
            };
            ViewModel.prototype.getActivePlayerById = function (id) {
                var player = ko.utils.arrayFirst(this.activePlayers(), function (activePlayer) {
                    return activePlayer.id == id;
                });
                return player;
            };
            ViewModel.prototype.spin = function () {
                if(!this.running()) {
                    this.wheel.spin();
                    this.running(true);
                }
            };
            return ViewModel;
        })();
        Play.ViewModel = ViewModel;        
    })(ViewModels.Play || (ViewModels.Play = {}));
    var Play = ViewModels.Play;

})(ViewModels || (ViewModels = {}));

