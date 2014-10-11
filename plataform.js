(function(){

    function Plataform(x, y, width, height, sprite, img, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this._sprite = new Sprite(img, [x,y], [32,32], 0, [0,0], false, false, [0,0]);;
    };

    Plataform.prototype = {

        render: function(ctx) {
            //ctx.fillRect(this.x, this.y ,this.width, this.height);
            this._sprite.render(ctx, 0, 0);
        }
    };

    window.Plataform = Plataform;

}) ();