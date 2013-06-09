(function(win) {

    "use strict";

    /**
     * Objecto principal
     * @param  {Object} setting
     * @return {undefined}
     */
    window.RkmaxEngine = function(settings) {

        this.world = new RkmaxWorld(settings);

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

        window.webkitRequestAnimationFrame(this.update.bind(this));

    };

    RkmaxEngine.prototype.init = function() {
        this.world.lastTime = Date.now();
        this.update();
    };

})(window);
