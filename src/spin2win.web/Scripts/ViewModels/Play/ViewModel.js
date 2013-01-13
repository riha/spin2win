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
                this.winner = ko.observable();
                var colors = Common.Utils.colors;
                $.each(players, function (index, item) {
                    var activePlayer = new Play.ActivePlayer(item.id, item.name, item.numberOfSlots, item.pictureUrl, settings.numberOfRounds, colors[index]);
                    _this.activePlayers.push(activePlayer);
                });
                console.log(this.winner());
                this.activePlayers.sort(ViewModel.sortByWinnerFunc);
                this.wheel.draw(this.activePlayers());
                this.playerListAnimator = new Play.PlayerListAnimator(this.activePlayers);
                this.playerListAnimator.showPlayers();
                this.currentPlayer = ko.observable(Play.ActivePlayer.defaultPlayer());
                this.degreeTransformation = ko.computed(function () {
                    return "rotate(" + _this.degree() + "deg)";
                });
                this.continuePlay = this.continuePlay.bind(this);
                this.spin = this.spin.bind(this);
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
                        _this.showGameWinner();
                    } else {
                        _this.showRoundWinner();
                    }
                });
            }
            ViewModel.prototype.continuePlay = function () {
                for(var i = 0; i < this.activePlayers().length; i++) {
                    if(this.winner().id == this.activePlayers()[i].id) {
                        this.activePlayers.splice(i, 1);
                        break;
                    }
                }
                this.currentPlayer(Play.ActivePlayer.defaultPlayer());
                this.wheel.clear();
                this.wheel.draw(this.activePlayers());
                this.running(false);
            };
            ViewModel.prototype.showGameWinner = function () {
                this.roundWinner.addWin();
                this.winner(this.roundWinner);
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
            ViewModel.prototype.statsText = function (player) {
                var numerOfSlots = player.numberOfSlots;
                var totalNumberOfSlots = this.totalNumberOfSlots();
                var percentage = Number((numerOfSlots / totalNumberOfSlots) * 100).toPrecision(2);
                return numerOfSlots + '/' + totalNumberOfSlots + ' (' + percentage + '%)';
            };
            ViewModel.prototype.totalNumberOfSlots = function () {
                var i = 0;
                $.each(this.activePlayers(), function (index, player) {
                    i = i + Number(player.numberOfSlots);
                });
                return i;
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
            ViewModel.prototype.isFinalWinner = function () {
                console.log("is final", this.activePlayers().length, this.activePlayers().length < 3);
                return this.activePlayers().length < 3;
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

