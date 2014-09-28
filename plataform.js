(function(){

    function Plataform(x, y, width, height, sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    };

    Plataform.prototype = {

        render: function(ctx) {
            ctx.fillRect(this.x, this.y ,this.width, this.height);
        }
    };

    window.Plataform = Plataform;

}) ();