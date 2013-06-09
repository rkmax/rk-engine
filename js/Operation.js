(function(window) {

    "use strict";

    window.RkmaxOperation = {
        /**
         * Determina si hay colision entre dos cuerpos AABB
         * @param  {RkmaxAABB} a
         * @param  {RkmaxAABB} b
         * @return {boolean}
         */
        AABBvsAABB: function(a, b) {
            if (a.max.x < b.min.x || a.min.x > b.max.x) return false;
            if (a.max.y < b.min.y || a.min.y > b.max.y) return false;

            return true;
        },

        /**
         * Calcula la sobreposición entre dos cuerpos AABB, si no existe devuelve {null}
         * @param  {RkmaxAABB} a
         * @param  {RkmaxAABB} b
         * @return {RkmaxManifold}
         */
        AABBOverlap: function(a, b, debug) {
            var
                normal = new RkmaxVector2D(),
                manifold = new RkmaxManifold(),
                // A calcular
                a_extent,
                b_extent,
                x_overlap,
                y_overlap
            ;

            normal.reset(b.x - a.x, b.y - a.y);

            a_extent = (a.max.x - a.min.x) / 2;
            b_extent = (b.max.x - b.min.x) / 2;
            x_overlap = a_extent + b_extent - Math.abs(normal.x);

            // SAT test sobre X
            if (x_overlap > 0) {
                a_extent = (a.max.y - a.min.y) / 2;
                b_extent = (b.max.y - b.min.y) / 2;
                y_overlap = a_extent + b_extent - Math.abs(normal.y);

                if (y_overlap > 0) {

                    if (x_overlap > y_overlap) {
                        if ( normal.x < 0) {
                            manifold.normal = new RkmaxVector2D(-1, 0);
                        } else {
                            manifold.normal = new RkmaxVector2D(0, 0);
                        }
                        manifold.penetration = x_overlap;
                    } else {
                        if (normal.y < 0) {
                            manifold.normal = new RkmaxVector2D(0, -1);
                        } else {
                            manifold.normal = new RkmaxVector2D(0, 1);
                        }
                        manifold.penetration = y_overlap;
                    }
                    // if (x_overlap < y_overlap) {
                    //     manifold.normal = (normal.x < 0) ? normal.reset(-1, 0) : normal.reset(1, 0);
                    //     manifold.penetration = x_overlap;
                    // } else {
                    //     manifold.normal = (normal.y < 0) ? normal.reset(0, -1) : normal.reset(0, 1);
                    //     manifold.penetration = y_overlap;
                    // }

                    return manifold;
                }

            }

            return null;
        },

        /**
         * Resulve la colision entre dos objetos AABB
         * @param  {RkmaxAABB} a
         * @param  {RkmaxAABB} b
         * @param  {RkmaxManifold} manifold
         * @return {undefined}
         */
        ABBBCollision: function(a, b, manifold, debug) {
            var
                relativeVel = new RkmaxVector2D(),
                impulse = new RkmaxVector2D(),
                impulseJ,
                relativeVelNormal,
                restitution,
                percent = 0.8,
                slop = 0.01,
                correction_x,
                correction_y
            ;

            relativeVel.reset(b.velocity.x - a.velocity.x, b.velocity.y - a.velocity.y);
            relativeVelNormal = relativeVel.dotProduct(manifold.normal);

            if (relativeVelNormal > 0) return;

            restitution = Math.min(a.restitution, b.restitution);
            impulseJ = -(1 + restitution) * relativeVelNormal;
            impulseJ /= a.invmass + b.invmass;

            impulse.reset(manifold.normal.x * impulseJ, manifold.normal.y * impulseJ);

            correction_x = Math.max(manifold.penetration - slop, 0) / (a.invmass + b.invmass) * percent * manifold.normal.x;
            correction_y = Math.max(manifold.penetration - slop, 0) / (a.invmass + b.invmass) * percent * manifold.normal.y;

            a.velocity.x -= (a.invmass * impulse.x);
            a.velocity.y -= (a.invmass * impulse.y);
            a.x -= a.invmass * correction_x;
            a.y -= a.invmass * correction_y;

            b.velocity.x += (b.invmass * impulse.x);
            b.velocity.y += (b.invmass * impulse.y);
            b.x += b.invmass * correction_x;
            b.y += b.invmass * correction_y;
        }
    };
})(window);