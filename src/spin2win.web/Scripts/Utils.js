var Common;
(function (Common) {
    var Utils = (function () {
        function Utils() { }
        Utils.easeOutExpo = function easeOutExpo(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        }
        Utils.shadeColor = function shadeColor(color, percent) {
            var num = parseInt(color.slice(1), 16);
            var amt = Math.round(2.55 * percent);
            var R = (num >> 16) + amt;
            var B = (num >> 8 & 255) + amt;
            var G = (num & 255) + amt;

            return "#" + (16777216 + (R < 255 ? R < 1 ? 0 : R : 255) * 65536 + (B < 255 ? B < 1 ? 0 : B : 255) * 256 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
        }
        Utils.colors = [
            "#660000", 
            "#990000", 
            "#cc0000", 
            "#cc3333", 
            "#ea4c88", 
            "#993399", 
            "#663399", 
            "#333399", 
            "#0066cc", 
            "#0099cc", 
            "#66cccc", 
            "#77cc33", 
            "#669900", 
            "#336600", 
            "#666600", 
            "#999900", 
            "#cccc33", 
            "#ffff00", 
            "#ffcc33", 
            "#ff9900", 
            "ff6600", 
            "cc6633", 
            "996633", 
            "663300", 
            "000000", 
            "999999", 
            "cccccc,", 
            "ffffff"
        ];
        return Utils;
    })();
    Common.Utils = Utils;    
})(Common || (Common = {}));

