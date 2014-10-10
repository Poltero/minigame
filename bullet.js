(function(){

    function Bullet(x, y, speed, dir) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dir = dir || 'right';
        this._sprite = (dir == 'right') ? new Sprite('img/punio_right.png', [x,y], [32,32], 0, [0,0], false, false, [0,0]) : new Sprite('img/punio_left.png', [x,y], [32,32], 0, [0,0], false, false, [0,0]);
    };

    Bullet.prototype = {
        update: function(dt) {
            if(this.dir == 'right') {
                this.x += this.speed * dt;
            } else {
                this.x -= this.speed * dt;
            }

            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;
        },

        render: function(ctx) {
            this._sprite.render(ctx, 0, 0);
        }
    };

    window.Bullet = Bullet;

})();