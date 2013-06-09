(function(win) {

    "use strict";

    /**
     * Objecto principal
     * @param  {Object} setting
     * @return {undefined}
     */
    window.RkmaxEngine = function(settings) {

        /**
         * Configuracion del mundo
         * @type {RkmaxWorld}
         */
        this.world = new RkmaxWorld(settings);

        /**
         * Manejador del ciclo
         * @type {[type]}
         */
        this.requestId = undefined;

        /**
         * Lista de cuerpos
         * @type {Array}
         */
        this.entities = [];
    };

    RkmaxEngine.prototype.update = function() {

        var
            now = Date.now(),
            i, j, a, b
        ;

        this.world.elapsed = (now - this.world.lastTime);
        this.world.lastTime = now;

        for (i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this.world);
        }

        for (i = 0; i < this.entities.length - 1; i++) {
            a = this.entities[i];

            for (j = i + 1; j < this.entities.length; j++) {
                b = this.entities[j];

                var manifold = RkmaxOperation.AABBOverlap(a, b);
                if (manifold) {
                    RkmaxOperation.ABBBCollision(manifold);
                }
            }
        }

        this.world.context.clearRect(0, 0, this.world.width, this.world.height);

        for (i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.world);
        }

        this.requestId = window.requestAnimationFrame(this.update.bind(this));
    };

    RkmaxEngine.prototype.play = function() {
        if (!this.requestId) {
            this.world.lastTime = Date.now();
            this.update();
        }
    };

    RkmaxEngine.prototype.stop = function() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    };

    RkmaxEngine.prototype.init = function() {
        this.play();
    };

})(window);
