(function(window) {

    "use strict";

    window.RkmaxAABB = function(x, y, settings) {
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
         * Minimo
         * @type {RkmaxVector2D}
         */
        this.min = new RkmaxVector2D();

        /**
         * Maximo
         * @type {RkmaxVector2D}
         */
        this.max = new RkmaxVector2D();

        /**
         * Ancho
         * @type {Number}
         */
        this.width = 50;

        /**
         * Alto
         * @type {Number}
         */
        this.height = 50;

        /**
         * Fijo
         * @type {Boolean}
         */
        this.fixed = false;

        /**
         * Masa
         * @type {Number}
         */
        this.mass = 0;

        /**
         * Inversa de la masa
         * @type {Number}
         */
        this.invmass = 0;

        /**
         * Restitucion (rebote)
         * @type {Number}
         */
        this.restitution = 1;

        /**
         * Color
         * @type {String}
         */
        this.color = '';

        /**
         * Velocidad
         * @type {RkmaxVector2D}
         */
        this.velocity = new RkmaxVector2D();

        if (typeof settings !== 'undefined') {
            for (var attr in settings) {
                if (this.hasOwnProperty(attr)) this[attr] = settings[attr];
            }
        }

        this.setMass(this.mass);
    };

    /**
     * Actualiza los valores internos, segun el valor
     * pasado
     * @param  {RkmaxWorld} world
     * @return {undefined}
     */
    RkmaxAABB.prototype.update = function(world) {

        if (typeof world.gravity !== 'undefined') {
            if (!this.fixed) this.velocity.y += world.gravity;
        }

        this.x += this.velocity.x * world.elapsed;
        this.y += this.velocity.y * world.elapsed;

        if (this.x < 0) {
            // this.x = 0;
            this.velocity.x = Math.abs(this.velocity.x);
        } else if (this.x + this.width > world.width) {
            // this.x = world.width - this.width;
            this.velocity.x *= -1;
        }

        if (this.y < 0) {
            // this.y = 0;
            this.velocity.y = Math.abs(this.velocity.y);
        } else if (this.y + this.height > world.height) {
            // this.y = world.height - this.height;
            this.velocity.y *= -1;
        }

        this.min.reset(this.x, this.y);
        this.max.reset(this.x + this.width, this.y + this.height);
    };

    /**
     * Cambia la masa
     * @param  {Number} newMass
     * @return {undefined}
     */
    RkmaxAABB.prototype.setMass = function(newMass) {
        this.mass = newMass;
        this.invmass = (newMass <= 0) ? 0 : 1 / newMass;
    };

    RkmaxAABB.prototype.draw = function(world) {
        if (typeof world === 'undefined') return;
        if (world.context === null) return;
        this.color = (this.color === '') ? 'rgba(0, 10, 150, 0.5)': this.color;

        world.context.fillStyle = this.color;
        world.context.fillRect(this.x, this.y, this.width, this.height);
    };
})(window);
