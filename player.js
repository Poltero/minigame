(function(){

    function Player(x, y, width, height, speed, srpite) {
        //this.entity = new Entity(x,y,null);
        this._spriteRight = new Sprite('img/tpl.png', [x,y], [width,height], 10, [1,2,3,4,5,6,7,8,9,10], 'horizontal',false,[0,0]);
        this._spriteLeft = new Sprite('img/tpl.png', [x,y], [width,height], 10, [1,2,3,4,5,6,7,8,9,10], 'horizontal',false,[768,0]);
        this._spriteJumpRight = new Sprite('img/tpl.png', [x,y], [width,height], 0, [0,0], false, false, [704,0]);
        this._spriteJumpLeft = new Sprite('img/tpl.png', [x,y], [width,height], 0, [0,0], false, false, [1472,0]);
        this._spriteShootRight = new Sprite('img/tpl.png', [x,y], [width,height], 10, [0,1,2], 'horizontal', true, [1536,0]);
        this._spriteShootLeft = new Sprite('img/tpl.png', [x,y], [width,height], 10, [0,1,2], 'horizontal', true, [1728,0]);
        this._spriteDieRight = new Sprite('img/tpl.png', [x,y], [width,height], 0, [0,0], false, false, [1920,0]);
        this._spriteDieLeft = new Sprite('img/tpl.png', [x,y], [width,height], 0, [0,0], false, false, [1984,0]);

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
        this.dir = 'right';
        this.shooting = false;
        this.isDie = false;

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

        this.checkCollisionEnemy = function(e, viewport) {
            var realX = this.x + -(viewport.offsetx);

            var lP = realX /* Ajuste */+ 18;
            var rP = realX + this.width /* Ajuste */- 18;
            var bP = this.y + this.height;
            var lT = e.x;
            var rT = e.x + e.width;
            var tT = e.y;
            var bT = e.y + e.height;

            //console.log(lP + " | " + rP + " | " + bP + " | " + lT + " | " + rT + " | " + tT + " | " + bT);

            return ( bP >= tT &&
                    bP >= bT &&
                    rP >= lT &&
                    lP <= rT );
        };

        this.checkCollisionBomb = function(b, viewport) {
            var realX = this.x + -(viewport.offsetx);

            var lP = realX /* Ajuste */+ 18;
            var rP = realX + this.width /* Ajuste */- 18;
            var tP = this.y;
            var bP = this.y + this.height;
            var lT = b.x;
            var rT = b.x + b.width;
            var tT = b.y;
            var bT = b.y + b.height;

            //console.log(lP + " | " + rP + " | " + bP + " | " + lT + " | " + rT + " | " + tT + " | " + bT);

            return (tP <= bT &&
                    tP >= tT &&
                    rP >= lT &&
                    lP <= rT );
        };

        this.jump = function(dt, collision) {
            if(!this.jumped && collision) {
                this.finalY = Math.abs(this.y - this.pixelJump);
                this.jumped = true;
                if(!this.isDie) {
                    if(this.dir == 'right') {
                        this._sprite = this._spriteJumpRight;
                    } else {
                        this._sprite = this._spriteJumpLeft;
                    }
                }
            }
            if(this.jumped) {
                //if(!this.jumpSprite)

                if(this.y >= this.finalY) {
                    this.y -= this.speedJump * dt;
                    //console.log("Current: " + this.y);
                } else {
                    this.jumped = false;
                    if(!this.isDie) {
                        if(this.dir == 'right') {
                            this._sprite = this._spriteRight;
                        } else {
                            this._sprite = this._spriteLeft;
                        }
                    }
                    
                }
            }   
        };

        this.shoot = function() {
            if(this.dir == 'right') {
                this._sprite = this._spriteShootRight;
            } else {
                this._sprite = this._spriteShootLeft;
            }
            
        };

        this.idle = function() {
            if(this.dir == 'right') {
                this._sprite = this._spriteRight;
            } else {
                this._sprite = this._spriteLeft;
            }
        };

        this.die = function(dt) {
            if(this.dir == 'right') {
                this._sprite = this._spriteDieRight;
            } else {
                this._sprite = this._spriteDieLeft;
            }

            this.isDie = true;
            this.jump(dt, true);
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
        },

        isFinaleShooting: function() {
            return this._sprite.isDone();
        }
    };


    window.Player = Player;

})();