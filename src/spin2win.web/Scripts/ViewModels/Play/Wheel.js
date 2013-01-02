var Models;
(function (Models) {
    var Wheel = (function () {
        function Wheel(canvas, canvasBg) {
            this.canvas = canvas;
            this.canvasBg = canvasBg;
            this.outsideRadius = 200;
            this.insideRadius = 20;
            this.spinTime = 0;
            this.startAngle = 0;
            this.lastDegree = 0;
            this.slots = [];
            this.centerX = this.canvas.width / 2;
            this.centerY = this.canvas.height / 2;
            this.context = canvas.getContext("2d");
            this.contextBg = canvasBg.getContext("2d");
            this.spin = this.spin.bind(this);
            this.rotateWheel = this.rotateWheel.bind(this);
            this.stopRotateWheel = this.stopRotateWheel.bind(this);
        }
        Wheel.prototype.draw = function (players) {
            this.shadow();
            this.background();
            for(var i = 0; i < players.length; i++) {
                var player = players[i];
                for(var y = 0; y < player.numberOfSlots; y++) {
                    this.slots.push(player);
                }
                ; ;
            }
            ; ;
            this.contextBg.lineWidth = 2;
            var startAngle = 0;
            this.arc = Math.PI / (this.slots.length / 2);
            for(var y = 0; y < this.slots.length; y++) {
                var color = this.slots[y].color;
                var angle = startAngle + y * this.arc;
                this.context.fillStyle = color;
                this.context.strokeStyle = Common.Utils.shadeColor(color, 20);
                this.context.beginPath();
                this.context.arc(this.centerX, this.centerY, this.outsideRadius, angle, angle + this.arc, false);
                this.context.arc(this.centerX, this.centerY, this.insideRadius, angle + this.arc, angle, true);
                this.context.fill();
                this.context.stroke();
            }
            console.log("klar");
        };
        Wheel.prototype.background = function () {
            this.contextBg.beginPath();
            this.contextBg.arc(this.centerX, this.centerY, this.outsideRadius + 9, 0, 2 * Math.PI, false);
            this.contextBg.fillStyle = '#aaa';
            this.contextBg.fill();
        };
        Wheel.prototype.shadow = function () {
            this.contextBg.beginPath();
            this.contextBg.arc(this.centerX - 2, this.centerY + 3, this.outsideRadius + 9, 0, 2 * Math.PI, false);
            this.contextBg.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.contextBg.fill();
        };
        Wheel.prototype.spin = function () {
            this.spinTime = 0;
            this.spinTimeTotal = Number(Math.random() * 3 + 4 * 4500);
            this.spinAngleStart = Math.random() * 10 + 10;
            this.rotateWheel();
        };
        Wheel.prototype.rotateWheel = function () {
            var framerate = 24;
            this.spinTime += framerate;
            if(this.spinTime >= this.spinTimeTotal) {
                this.stopRotateWheel();
                return;
            }
            var spinAngle = this.spinAngleStart - Common.Utils.easeOutExpo(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
            this.startAngle = this.startAngle + (spinAngle * Math.PI / 180);
            var degree = this.startAngle * 180 / Math.PI;
            this.spinTimeoutId = setTimeout(this.rotateWheel, framerate);
            if(this.lastDegree.toFixed(2) == degree.toFixed(2)) {
                this.stopRotateWheel();
                return;
            }
            this.lastDegree = degree;
            this.setCurrentSlotIndex();
            $(document).trigger("move", degree);
        };
        Wheel.prototype.setCurrentSlotIndex = function () {
            var degrees = this.startAngle * 180 / Math.PI + 90;
            var arcd = this.arc * 180 / Math.PI;
            var index = Math.floor((360 - degrees % 360) / arcd);
            if(index != this.currentSlotIndex) {
                this.currentSlotIndex = index;
            }
            ; ;
            $(document).trigger("current", this.slots[this.currentSlotIndex]);
        };
        Wheel.prototype.stopRotateWheel = function () {
            clearTimeout(this.spinTimeoutId);
            $(document).trigger("complete", this.slots[this.currentSlotIndex]);
        };
        return Wheel;
    })();
    Models.Wheel = Wheel;    
})(Models || (Models = {}));

