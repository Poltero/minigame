(function(){

    function Coin(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this._sprite = new Sprite('img/cacacoin.png', [x,y], [this.width,this.height], 0, [0,0], false, false, [0,0]);
        this.score = 1;
    };


    Coin.prototype = {
        render: function(ctx) {
            this._sprite.render(ctx, 0, 0);
        },

        update: function(dt) {
            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;

            this._sprite.update(dt);
        },
    };


    window.Coin = Coin;


})();