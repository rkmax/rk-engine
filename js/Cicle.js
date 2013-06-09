(function(window) {
    "use strict";

    window.RkmaxCircle = function(x, y, r) {

        /**
         * Posicion X
         * @type {Number}
         */
        this.x = x || 0;

        /**
         * Posicion Y
         * @type {Number}
         */
        this.y = y || 0;

        /**
         * Radio del circulo
         * @type {Number}
         */
        this.radius = r || 0;
    };

    /**
     * Distancia entre los circulos
     * @param  {RkmaxCircle} c
     * @return {Number}
     */
    RkmaxCircle.prototype.distance = function(c) {

        return Math.sqrt((this.x - c.x)^2 + (this.y - c.y)^2);
    };
})(window);
