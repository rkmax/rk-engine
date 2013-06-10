(function(window) {

    "use strict";

    /**
     * Objeto que describe un vector de dos dimensiones
     * @param  {integer} x
     * @param  {integer} y
     * @return {RkmaxVector2D}
     */
    window.RkmaxVector2D = function(x, y) {
        this.x = (typeof x === 'undefined') ? 0 : x;
        this.y = (typeof x === 'undefined') ? 0 : y;
    };

    /**
     * Adiciona el vector pasado como parametro
     * @param  {RkmaxVector2D} v
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.add = function(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    };

    /**
     * Substrae el vector pasado como parametro
     * @param  {RkmaxVector2D} v
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.subtract = function(v) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    };

    /**
     * Multiplica el vector pasado como parametro
     * @param  {RkmaxVector2D} v
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.multiply = function(v) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    };

    /**
     * Calcula el vector perpendicular (normal)
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.perp = function() {
        this.y = -this.y;

        return this;
    };

    /**
     * Calcula el largo del vector
     * @return {Number}
     */
    RkmaxVector2D.prototype.getLength = function() {

        return Math.sqrt((this.x * this.x)+(this.y * this.y));
    };

    /**
     * Calcula el largo del vector
     * @return {Number}
     */
    RkmaxVector2D.prototype.getLengthSquared = function() {

        return (this.x * this.x)+(this.y * this.y);
    };

    /**
     * Cambia el largo del vector (X, Y), pero no el angulo
     * @param  {Number} newLength
     * @return {undefined}
     */
    RkmaxVector2D.prototype.setLength = function(newLength) {
        var _angle = angle;
        this.x = Math.cos(_angle) * newLength;
        this.y = Math.sin(_angle) * newLength;
        if (Math.abs(this.x) < 0.00000001) this.x = 0;
        if (Math.abs(this.y) < 0.00000001) this.y = 0;
    };

    /**
     * Obtiene el angulo del vector
     * @return {[type]}
     */
    RkmaxVector2D.prototype.getAngle = function() {

        var x = Math.atan2(this.y, this.x);
        var PI2 = 2* Math.PI;

        return (x > 0 ? x : (PI2 + x)) * 360 / PI2;
    };

    /**
     * Cambia el angulo del vecto
     * @param  {Number} newAngle
     * @return {undefined}
     */
    RkmaxVector2D.prototype.setAngle = function(newAngle) {
        var len = this.getLength();
        this.x = Math.cos(newAngle) * len;
        this.y = Math.sin(newAngle) * len;
    };

    /**
     * Calcula el angulo entre dos vectores
     * @param  {RkmaxVector2D} v1
     * @param  {RkmaxVector2D} v2
     * @return {Number}
     */
    RkmaxVector2D.prototype.angleBetween = function(v1, v2) {
        v1 = v1.clone().normalize();
        v2 = v2.clone().normalize();

        return Math.acos(v1.dotProduc(v2));
    };

    /**
     * Calcula el producto punto
     * @param  {RkmaxVector2D} v
     * @return {Number}
     */
    RkmaxVector2D.prototype.dotProduct = function(v) {
        if (typeof v === 'undefined' || v === null) {
            throw new Error("El argumento no puede ser 'undefined' o 'null'");
        }

        return (this.x * v.x + this.y * v.y);
    };

    /**
     * Calcula el producto cruz
     * @param  {RkmaxVector2D} v
     * @return {Number}
     */
    RkmaxVector2D.prototype.crossProd = function(v) {

        return this.x * v.y - this.y * v.x;
    };

    /**
     * Trunca el largo del vector al valor pasado
     * @param  {Number} max
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.truncate = function(max) {
        var len = this.getLength();
        if (len > max) this.setLength(len);

        return this;
    };

    /**
     * Normaliza el vector
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.normalize = function() {
        var len = this.getLength();
        this.x /= len;
        this.y /= len;

        return this;
    };

    /**
     * Copia el vector pasado
     * @param  {RkmaxVector2D} v
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.copy = function(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    };

    /**
     * Clona el vector y crea uno nuevo
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.clone = function() {

        return new RkmaxVector2D(this.x, this.y);
    };

    /**
     * Asigna los nuevos valores o inicializa el vector
     * en caso de no estar definidos.
     * @param  {Number} x
     * @param  {Number} y
     * @return {RkmaxVector2D}
     */
    RkmaxVector2D.prototype.reset = function(x, y) {
        this.x = (typeof x === 'undefined') ? 0 : x;
        this.y = (typeof x === 'undefined') ? 0 : y;

        return this;
    };

    /**
     * Visualiza el vector dentro del mundo (canvas)
     * @param  {Number} x1
     * @param  {Number} y1
     * @param  {RkmaxWorld} world
     * @param  {string} color
     * @return {undefined}
     */
    RkmaxVector2D.prototype.draw = function(world, x1, y1,color) {

        if (world.context === null) return;

        x1 = (typeof x1 === 'undefined') ? 0 : x1;
        y1 = (typeof y1 === 'undefined') ? 0 : y1;
        color = (typeof color === 'undefined') ? 'rgb(255, 0, 0)': color;

        world.context.strokeStyle = color;
        world.context.beginPath();
        world.context.moveTo(x1, y1);
        world.context.lineTo(x1 + this.x, y1 + this.y);
        world.context.stroke();
    };
})(window);
