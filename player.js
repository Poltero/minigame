(function(){

    function Player(x, y, width, height, speed, srpite) {
        //this.entity = new Entity(x,y,null);
        this._sprite = new Sprite('img/player.png', [x,y], [width,height], 0, [0,0]);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.Viewx = 0;
        this.Viewy = 0;
        this.speedJump = 300;

        this.checkCollision = function(p, viewport) {
            var realX = this.x + -(viewport.offsetx);

            var lP = realX;
            var rP = realX + this.width;
            var bP = this.y + this.height;
            var lT = p.x;
            var rT = p.x + p.width;
            var tT = p.y;
            var bT = p.y + p.height;

            return ( bP >= tT &&
                    bP < bT &&
                    rP >= lT &&
                    lP <= rT );
        };

        
    };

    Player.prototype = {

        update: function(dt) {
            /*if(state.controls.right) {
                this.x += this.speed * dt;
            }
            if(state.controls.left) {
                this.x -= this.speed * dt;
            }*/

            //this._sprite.pos[0] = (0.5 + this.x) << 0;
            //this._sprite.pos[1] = (0.5 + this.y) << 0;
            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;
        },

        draw: function(ctx){        
            // draw a simple rectangle shape as our player model
            //ctx.save();     
            //ctx.fillStyle = "red";
            //ctx.fillRect(this.x-this.Viewx,this.y-this.Viewy,this.width,this.height);

            //ctx.translate(this.Viewx, this.Viewy);
            this._sprite.render(ctx, this.Viewx, this.Viewy);
            //ctx.restore();
        }
    };


    window.Player = Player;

})();