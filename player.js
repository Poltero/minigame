(function(){

    function Player(x, y, width, height, speed, srpite) {
        //this.entity = new Entity(x,y,null);
        this._spriteRight = new Sprite('img/player.png', [x,y], [width,height], 10, [1,2,3,4,5,6,7,8,9,10], 'horizontal');
        this._spriteJump = new Sprite('img/jump.png', [x,y], [width,height], 0, [0,0]);
        this._sprite = this._spriteRight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.Viewx = 0;
        this.Viewy = 0;
        this.speedDown = 350;
        this.speedJump = 300;
        this.jumped = false;
        this.finalY = 0;
        this.pixelJump = 85;

        this.checkCollision = function(p, viewport) {
            var realX = this.x + -(viewport.offsetx);

            var lP = realX /* Ajuste */+ 18;
            var rP = realX + this.width /* Ajuste */- 18;
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

        this.jump = function(dt, collision) {
            if(!this.jumped && collision) {
                this.finalY = Math.abs(this.y - this.pixelJump);
                this.jumped = true;
                this._sprite = this._spriteJump;
            }
            if(this.jumped) {
                //console.log(this.y + " | " + this.finalY);
                if(this.y >= this.finalY) {
                    this.y -= this.speedJump * dt;
                    //console.log("Current: " + this.y);
                } else {
                    this.jumped = false;
                    this._sprite = this._spriteRight;
                }
            }   
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

            this._sprite.update(dt);
        },

        draw: function(ctx){        
            // draw a simple rectangle shape as our player model
            //ctx.save();     
            //ctx.fillStyle = "red";
            //ctx.fillRect(this.x-this.Viewx,this.y-this.Viewy,this.width,this.height);

            //ctx.translate(this.Viewx, this.Viewy);
            this._sprite.render(ctx, this.Viewx, this.Viewy);
            //ctx.restore();
        },

        runAnimations: function() {
            this._sprite.activate();
        },

        stopAnimations: function() {
            this._sprite.deactivate();
        }
    };


    window.Player = Player;

})();