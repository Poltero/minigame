(function() {

    function Entity(x, y, sprite) {
        this.pos = [x,y];
        this.sprite = sprite;
    };

    Entity.prototype = {
        render: function(ctx) {
            ctx.save();
            ctx.translate(this.pos[0], this.pos[1]);
            this.sprite.render(ctx);
            ctx.restore();
        },

        renderRect: function(ctx,offsetx,offsety) {
            //ctx.save();

            //ctx.fillRect(this.pos[0]-offsetx,this.pos[1]-offsety,32,32);
            //ctx.fillText(this.pos[0], this.pos[0], this.pos[1])

            //ctx.restore();
        }
    };

    window.Entity = Entity;

})();