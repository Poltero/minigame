(function(){

    function Enemy(x, y, width, height, speed, sprite) {
        this._sprite = new Sprite('img/enemy.png', [x,y], [32,32], 0, [0,0]);;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;

    };

    Enemy.prototype = {

        render: function(ctx) {
            this._sprite.render(ctx, 0, 0);
        }
    };

    window.Enemy = Enemy;

})();