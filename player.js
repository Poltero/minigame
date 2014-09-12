(function(){

    function Player(x, y, width, height, speed) {
        this.entity = new Entity(x,y,null);
        this.width = width;
        this.height = height;
        this.speed = speed;
    };

    Player.prototype = {

        update: function(dt) {
            /*if(state.controls.right) {
                this.x += this.speed * dt;
            }
            if(state.controls.left) {
                this.x -= this.speed * dt;
            }*/
        },

        draw: function(ctx, xView, yView){        
            // draw a simple rectangle shape as our player model
            ctx.save();     
            ctx.fillStyle = "red";
            this.entity.renderRect(ctx, xView, yView);
            ctx.restore();
        }
    };


    window.Player = Player;

})();