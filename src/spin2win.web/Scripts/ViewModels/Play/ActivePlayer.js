var ViewModels;
(function (ViewModels) {
    (function (Play) {
        var ActivePlayer = (function () {
            function ActivePlayer(id, name, numberOfSlots, pictureUrl, numberOfRounds, color) {
                this.id = id;
                this.name = name;
                this.numberOfSlots = numberOfSlots;
                this.pictureUrl = pictureUrl;
                this.color = color;
                var _this = this;
                this.wins = [];
                this.runWinnerAnimation = ko.observable(false);
                this.runPlayerCardAnimation = ko.observable(ActivePlayer.HiddenPlayerAnimationEnum);
                for(var i = 0; i < numberOfRounds; i++) {
                    this.wins.push(ko.observable(false));
                }
                this.repaintAnimation = ko.computed(function () {
                    if(_this.runPlayerCardAnimation() == ActivePlayer.NonePlayerAnimationEnum) {
                        return "";
                    } else {
                        if(_this.runPlayerCardAnimation() == ActivePlayer.HiddenPlayerAnimationEnum) {
                            return "hide";
                        } else {
                            if(_this.runPlayerCardAnimation() == ActivePlayer.HidePlayerAnimationEnum) {
                                return "animated flipOutX";
                            } else {
                                if(_this.runPlayerCardAnimation() == ActivePlayer.ShowPlayerAnimationEnum) {
                                    return "animated flipInX";
                                }
                            }
                        }
                    }
                });
            }
            ActivePlayer.HiddenPlayerAnimationEnum = 0;
            ActivePlayer.HidePlayerAnimationEnum = 1;
            ActivePlayer.ShowPlayerAnimationEnum = 2;
            ActivePlayer.NonePlayerAnimationEnum = 3;
            ActivePlayer.prototype.addWin = function () {
                for(var i = 0; i < this.wins.length; i++) {
                    var current = this.wins[i];
                    if(current() == false) {
                        this.wins[i](true);
                        return;
                    }
                }
            };
            ActivePlayer.prototype.numberOfWins = function () {
                var n = 0;
                for(var i = 0; i < this.wins.length; i++) {
                    var current = this.wins[i];
                    if(current() == true) {
                        n++;
                    }
                }
                return n;
            };
            return ActivePlayer;
        })();
        Play.ActivePlayer = ActivePlayer;        
    })(ViewModels.Play || (ViewModels.Play = {}));
    var Play = ViewModels.Play;

})(ViewModels || (ViewModels = {}));

