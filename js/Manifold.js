(function(window) {

    "use strict";

    /**
     * Objecto que mantiene colisiones
     * @return {RkmaxManifold}
     */
    window.RkmaxManifold = function () {
        /**
         * Cuerpo A participe de la colision
         * @type {RkmaxAABB}
         */
        this.a = null;

        /**
         * Cuerpo B participe de la colision
         * @type {RkmaxAABB}
         */
        this.b = null;

        /**
         * Porcentaje de penetración de los cuerpos
         * @type {Number}
         */
        this.penetration = 0;

        /**
         * Vector normal
         * @type {RkmaxVector2D}
         */
        this.normal = null;
    };

    RkmaxManifold.prototype.clone = function() {
        var copy = new RkmaxManifold();
        copy.a = this.a;
        copy.b = this.b;
        copy.penetration = this.penetration;
        copy.normal = this.normal.clone();
    };

})(window);
