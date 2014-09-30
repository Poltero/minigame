(function(){

    function Plataform(x, y, width, height, sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._sprite = new Sprite('img/tile.png', [x,y], [32,32], 0, [0,0]);
    };

    Plataform.prototype = {

        render: function(ctx) {
            //ctx.fillRect(this.x, this.y ,this.width, this.height);
            this._sprite.render(ctx, 0, 0);
        }
    };

    window.Plataform = Plataform;

}) ();