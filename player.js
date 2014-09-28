(function(){

    function Player(x, y, width, height, speed) {
        this.entity = new Entity(x,y,null);
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.x = 0;
        this.y = 0;
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

        draw: function(ctx){        
            // draw a simple rectangle shape as our player model
            ctx.save();     
            ctx.fillStyle = "red";
            console.log(this.x);
            this.entity.renderRect(ctx, this.x, this.y);
            ctx.restore();
        }
    };


    window.Player = Player;

})();