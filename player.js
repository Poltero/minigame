(function(){

    function Player(x, y, width, height, speed, srpite) {
        //this.entity = new Entity(x,y,null);
        this._srpite = srpite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.Viewx = 0;
        this.Viewy = 0;
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
            //console.log(this.x);
            ctx.fillRect(this.x-this.Viewx,this.y-this.Viewy,this.width,this.height);
            ctx.restore();
        }
    };


    window.Player = Player;

})();