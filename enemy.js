(function(){

    function Enemy(x, y, width, height, speed, sprite) {
        this._sprite = new Sprite('img/enemy.png', [x,y], [32,32], 0, [0,0]);;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.rendering = false;
        this.moving = false;

        this.checkCollision = function(p) {
            //var realX = this.x + -(viewport.offsetx);

            var lP = this.x /* Ajuste+ 18*/;
            var rP = this.x + this.width /* Ajuste - 18*/;
            var bP = this.y + this.height;
            var lT = p.x;
            var rT = p.x + p.width;
            var tT = p.y;
            var bT = p.y + p.height;

            return ( bP >= tT &&
                    bP < bT &&
                    rP >= lT &&
                    lP <= rT );
        };

    };

    Enemy.prototype = {

        render: function(ctx) {
            this._sprite.render(ctx, 0, 0);
        },

        update: function(dt) {
            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;
        },

        move: function(dt) {
            this.x -= this.speed * dt;
        },

        down: function(dt) {
            this.y += this.speed * dt;
        }
    };

    window.Enemy = Enemy;

})();