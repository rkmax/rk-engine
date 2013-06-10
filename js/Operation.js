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
         * Determina si hay colision entre dos circulos
         * @param  {RkmaxCircle} a
         * @param  {RkmaxCircle} b
         * @return {Boolean}
         */
        CirclevsCircle: function(a, b) {
            var r = a.radius + b.radius;
            r *= r;

            return r < (a.x + b.x)^2 + (a.y + b.y)^2;
        },

        /**
         * Calcula la sobreposición entre dos cuerpos AABB, si no existe devuelve {null}
         * @param  {RkmaxAABB} a
         * @param  {RkmaxAABB} b
         * @return {RkmaxManifold}
         */
        AABBOverlap: function(a, b) {
            var
                normal = new RkmaxVector2D(),
                manifold = new RkmaxManifold(),
                a_extent,
                b_extent,
                x_overlap,
                y_overlap
            ;

            manifold.a = a;
            manifold.b = b;

            normal.reset(b.x - a.x, b.y - a.y);

            // SAT test X
            a_extent = (a.max.x - a.min.x) / 2;
            b_extent = (b.max.x - b.min.x) / 2;
            x_overlap = a_extent + b_extent - Math.abs(normal.x);

            if (x_overlap > 0) {

                // SAT test Y
                a_extent = (a.max.y - a.min.y) / 2;
                b_extent = (b.max.y - b.min.y) / 2;
                y_overlap = a_extent + b_extent - Math.abs(normal.y);

                manifold.normal = normal.normalize();
                manifold.penetration = x_overlap;

                if (y_overlap > x_overlap) {
                    manifold.penetration = y_overlap;
                }

                return manifold;
            }

            return null;
        },

        /**
         * Resulve la colision entre dos objetos AABB
         * @param  {RkmaxManifold} manifold
         * @return {undefined}
         */
        ABBBCollision: function(manifold) {
            var
                relativeVel = new RkmaxVector2D(),
                impulse = new RkmaxVector2D(),
                impulseJ,
                relativeVelNormal,
                restitution,
                percent = 0.8,
                slop = 0.01,
                correction_x,
                correction_y,
                a = manifold.a,
                b = manifold.b
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
            a.x += a.invmass * correction_x;
            a.y += a.invmass * correction_y;

            b.velocity.x += (b.invmass * impulse.x);
            b.velocity.y += (b.invmass * impulse.y);
            b.x -= b.invmass * correction_x;
            b.y -= b.invmass * correction_y;
        },

        /**
         * Resulve la colision entre dos circulos
         * @param  {RkmaxManifold} manifold
         * @return {undefined}
         */
        CircleCollision: function(manifold) {
            var
                normal = new RkmaxVector2D(),
                a = manifold.a,
                b = manifold.b,
                r = a.radius + b.radius,
                dist
            ;

            r *= r;
            normal.reset(b.x - a.x, b.y - a.y);

            if (normal.getLengthSquared() > r) return;

            dist = normal.getLength();
            if (dist !== 0) {
                manifold.penetration = r- dist;
            } else {
                manifold.penetration = a.radius;
            }

            // collisionPointX =
            //  ((firstBall.x * secondBall.radius) + (secondBall.x * firstBall.radius))
            //  / (firstBall.radius + secondBall.radius);

            // collisionPointY =
            //  ((firstBall.y * secondBall.radius) + (secondBall.y * firstBall.radius))
            //  / (firstBall.radius + secondBall.radius);


        }
    };
})(window);
