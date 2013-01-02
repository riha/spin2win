/// <reference path="..\..\jquery-1.8.d.ts" />
/// <reference path="..\..\Utils.ts" />
/// <reference path="ActivePlayer.ts" />

declare var $: jQuery;

module Models {
    /// Class to controll the initial drawing of the wheel as well as the 
    /// rotaion calculations. Communicates back to view model via events.
    export class Wheel {
        private outsideRadius: number = 200;
        private insideRadius = 20;

        private centerX;
        private centerY;
        private context: CanvasRenderingContext2D;
        private contextBg: CanvasRenderingContext2D;
        private self: Wheel;
        private spinTime: number = 0;
        private spinTimeTotal: number;
        private spinAngleStart: number;
        private spinTimeoutId: number;
        private startAngle: number = 0;
        private lastDegree: number = 0;
        private arc: number;
        private currentSlotIndex;
        private slots = [];

        constructor (private canvas: HTMLCanvasElement, private canvasBg: HTMLCanvasElement) {
            this.centerX = this.canvas.width / 2;
            this.centerY = this.canvas.height / 2;
            this.context = canvas.getContext("2d");
            this.contextBg = canvasBg.getContext("2d");

            this.spin = <() => void >  this.spin.bind(this);
            this.rotateWheel = <() => void >  this.rotateWheel.bind(this);
            this.stopRotateWheel = <() => void >  this.stopRotateWheel.bind(this);

        }

        //  Draws the basic shape of the wheel
        public draw(players) {
            this.shadow();
            this.background();
            for (var i = 0; i < players.length; i++) {
                
                var player = players[i];
                for (var y = 0; y < player.numberOfSlots; y++) {
                    this.slots.push(player);
                };
            };

            this.contextBg.lineWidth = 2;
            var startAngle = 0;
            this.arc = Math.PI / (this.slots.length / 2);

            for (var y = 0; y < this.slots.length; y++) {
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

        }

        //  Draws a simple background to achive a grey circle around the wheel
        public background() {
            this.contextBg.beginPath();
            this.contextBg.arc(this.centerX, this.centerY, this.outsideRadius + 9, 0, 2 * Math.PI, false);
            this.contextBg.fillStyle = '#aaa';
            this.contextBg.fill();
        }

        //  Draws a shadow for the wheel
        public shadow() {
            this.contextBg.beginPath();
            this.contextBg.arc(this.centerX - 2, this.centerY + 3, this.outsideRadius + 9, 0, 2 * Math.PI, false);
            this.contextBg.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.contextBg.fill();
        }

        //  Starts the rotation of the wheel
        public spin() {
            this.spinTime = 0;
            this.spinTimeTotal = Number(Math.random() * 3 + 4 * 4500);
            this.spinAngleStart = Math.random() * 10 + 10;
            this.rotateWheel();
        };

        public rotateWheel() {
            var framerate = 24;

            this.spinTime += framerate;

            if (this.spinTime >= this.spinTimeTotal) {
                this.stopRotateWheel();
                return;
            }

            var spinAngle = this.spinAngleStart - Common.Utils.easeOutExpo(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
            this.startAngle = this.startAngle + (spinAngle * Math.PI / 180);

            var degree = this.startAngle * 180 / Math.PI;

            //console.log("degree", degree.toFixed(2));
            //console.log("last degree", this.lastDegree);

            this.spinTimeoutId = setTimeout(this.rotateWheel, framerate);

            if (this.lastDegree.toFixed(2) == degree.toFixed(2)) {
                this.stopRotateWheel();
                return;
            }

            this.lastDegree = degree;

            this.setCurrentSlotIndex();

            $(document).trigger("move", degree);
        }

        private setCurrentSlotIndex() {
            var degrees = this.startAngle * 180 / Math.PI + 90;
            var arcd = this.arc * 180 / Math.PI;
            var index = Math.floor((360 - degrees % 360) / arcd);

            if (index != this.currentSlotIndex) {
                this.currentSlotIndex = index;
            };

            $(document).trigger("current", this.slots[this.currentSlotIndex]);
        };

        public stopRotateWheel() {
            clearTimeout(this.spinTimeoutId);
            $(document).trigger("complete", this.slots[this.currentSlotIndex]);
        };



    }
}
