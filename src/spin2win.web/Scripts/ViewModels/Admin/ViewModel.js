var ViewModels;
(function (ViewModels) {
    (function (Admin) {
        var ViewModel = (function () {
            function ViewModel(players, settings) {
                this.players = players;
                this.settings = settings;
                var _this = this;
                this.players = ko.observableArray([]);
                this.editedPlayer = ko.observable();
                $.each(players, function (index, player) {
                    console.log(player, _this.players());
                    _this.players.push(new Admin.EditablePlayer(player));
                });
                this.players.sort(this.sortAlphabetically);
                this.includePlayer = this.includePlayer.bind(this);
                this.saveSetting = this.saveSetting.bind(this);
                this.addPlayer = this.addPlayer.bind(this);
                this.editPlayer = this.editPlayer.bind(this);
                this.savePlayer = this.savePlayer.bind(this);
                this.deletePlayer = this.deletePlayer.bind(this);
                this.isEdited = ko.computed(function () {
                    return _this.editedPlayer() != undefined;
                });
                if(this.settings == null) {
                    this.settings = Models.Settings.defaultObject();
                }
            }
            ViewModel.prototype.saveSetting = function (viewModel) {
                $.ajax("/Admin/SaveSettings", {
                    data: ko.toJSON({
                        "settings": viewModel.settings
                    }),
                    type: "post",
                    contentType: 'application/json',
                    dataType: 'json'
                });
            };
            ViewModel.prototype.addPlayer = function () {
                this.editedPlayer(new Admin.EditablePlayer(Models.Player.defaultObject()));
            };
            ViewModel.prototype.totalNumberOfSlots = function () {
                var i = 0;
                $.each(this.players(), function (index, player) {
                    i = i + Number(player.numberOfSlots());
                });
                return i;
            };
            ViewModel.prototype.includePlayer = function (player) {
                if(player.included()) {
                    player.included(false);
                } else {
                    player.included(true);
                }
                this.persistPlayer(player, function () {
                }, "/Admin/SavePlayer");
            };
            ViewModel.prototype.editPlayer = function (player) {
                this.editedPlayer(player);
            };
            ViewModel.prototype.deletePlayer = function () {
                var _this = this;
                var doneFunc = function (data) {
                    for(var i = 0; i < _this.players().length; i++) {
                        if(_this.editedPlayer().id == _this.players()[i].id) {
                            _this.players.splice(i, 1);
                            break;
                        }
                    }
                    _this.editedPlayer(undefined);
                };
                this.persistPlayer(this.editedPlayer(), doneFunc, "/Admin/DeletePlayer");
            };
            ViewModel.prototype.savePlayer = function () {
                var _this = this;
                var doneFunc = function (data) {
                    if(_this.editedPlayer().isNew()) {
                        _this.editedPlayer().id = data.Id;
                        _this.players.push(_this.editedPlayer());
                    } else {
                        for(var i = 0; i < _this.players().length; i++) {
                            if(_this.editedPlayer().id == _this.players()[i].id) {
                                _this.players.splice(i, 1, _this.editedPlayer());
                                break;
                            }
                        }
                    }
                    _this.players.sort(_this.sortAlphabetically);
                    _this.editedPlayer(undefined);
                };
                this.persistPlayer(this.editedPlayer(), doneFunc, "/Admin/SavePlayer");
            };
            ViewModel.prototype.persistPlayer = function (player, doneFunc, url) {
                $.ajax(url, {
                    data: ko.toJSON(player),
                    type: "post",
                    contentType: 'application/json',
                    dataType: 'json'
                }).done(doneFunc);
            };
            ViewModel.prototype.sortAlphabetically = function (a, b) {
                if(a.name() < b.name()) {
                    return -1;
                }
                if(a.name() > b.name()) {
                    return 1;
                }
                return 0;
            };
            return ViewModel;
        })();
        Admin.ViewModel = ViewModel;        
    })(ViewModels.Admin || (ViewModels.Admin = {}));
    var Admin = ViewModels.Admin;

})(ViewModels || (ViewModels = {}));

