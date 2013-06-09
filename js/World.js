(function(window) {

    "use strict";

    /**
     * Contenernos de los valores globales
     * @param  {Object} settings
     * @return {undefined}
     */
    window.RkmaxWorld = function(settings) {
        /**
         * Tiempo de inicio
         * @type {Number}
         */
        this.lastTime = Date.now();

        /**
         * Milisegundos desde el ultimo fotograma
         * @type {Number}
         */
        this.elapsed = 0;

        /**
         * Fuerza de gravedad
         * @type {Number}
         */
        this.gravity = 0;

        /**
         * Alto en pixeles
         * @type {Number}
         */
        this.width = 500 || settings.width;

        /**
         * Ancho en pixeles
         * @type {Number}
         */
        this.height = 400 || settings.height;

        /**
         * Contexto de dibujo del canvas
         * @type {CanvasRenderingContext2D}
         */
        this.context = null || settings.context;

        /**
         * Habilita la impresion en consola
         * @type {boolean}
         */
        this.DEBUG = (typeof settings.debug === 'undefined') ? false : settings.debug;
    };

    /**
     * Cambia los segundos desde el ultimo frame
     * @param  {[type]} elapse [description]
     * @return {[type]}        [description]
     */
    RkmaxWorld.prototype.setElapsed = function(elapsed) {
        this.elapsed = elapsed;
    };
})(window);
