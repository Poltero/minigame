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

        renderRect: function(ctx) {
            ctx.save();

            ctx.fillRect(this.pos[0],this.pos[1],50,50);

            ctx.restore();
        }
    };

    window.Entity = Entity;

})();