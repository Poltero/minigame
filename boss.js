(function() {

    function Boss(x, y, width, height, prob) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.prob = prob;
        this._sprite = new Sprite('img/boss.png', [x,y], [128,128], 0, [0,0], false, false, [0,0]);
        this._spriteJump;
        this._speedJump;
        this._isTeleporting = false;
        this._lastY = this.y;
        this._lasttime = 0;
        this._timeElapsed = 2;
        this.hidden = true;
        this.positions = null;
        this.bullets = [];
        this.isShooting = false;
        this.countBullets = 0;
        this.speedShoot = 200;
        this.firstFire = false;

        this.hearts = [
            new Sprite('img/heart.png', [x+40,y-15], [16,16], 0, [0,0], false, false, [0,0]),
            new Sprite('img/heart.png', [x+60,y-15], [16,16], 0, [0,0], false, false, [0,0]),
            new Sprite('img/heart.png', [x+80,y-15], [16,16], 0, [0,0], false, false, [0,0])
        ];

        this.lifes = 3;

        this.isDead = function() {
            return (this.lifes <= 0);
        };

        this.checkCollisionBullet = function(b) {
            var lP = this.x; /* Ajuste *///+ 18;
            var rP = this.x + this.width; /* Ajuste *///- 18;
            var bP = this.y + this.height;
            var lT = b.x;
            var rT = b.x + b.width;
            var tT = b.y;
            var bT = b.y + b.height;
            //console.log(b);

            //console.log(bP + " | " + tT + " | " + bT + " | " + lP + " | " + rT);

            return ( bP >= tT &&
                    bP >= bT &&
                    rP >= lT &&
                    lP <= rT );
        };

        this.setPositionsBullets = function(positions) {
            this.positions = positions;
        };

        this.initBullets = function() {
            for(var i = 0; i < this.positions.length; i++) {
                //console.log("eee");
                this.bullets.push({
                    _sprite: new Sprite('img/bomb.png', [this.positions[i][0],this.positions[i][0]], [32,32], 0, [0,0], false, false, [0,0]),
                    x: this.positions[i][0],
                    y: this.positions[i][1],
                    width: 32,
                    height: 32
                    });
                this.countBullets++;
            }
        }
    };


    Boss.prototype = {

        render: function(ctx) {
            if(!this.hidden) {
                this._sprite.render(ctx, 0, 0);
                if(!this._isTeleporting) {
                    for(var i = 0; i < 3; i++) { 
                        if(this.hearts[i])
                            this.hearts[i].render(ctx, 0, 0);
                    }
                }

                if(this.isShooting) {
                    for(var i = 0; i < this.bullets.length; i++) {
                        if(this.bullets[i]) {
                            this.bullets[i]._sprite.render(ctx, 0, 0);
                        }
                    }
                }
            }
        },

        update: function(dt) {
            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;

            this._sprite.update(dt);
        },

        fire: function() {
            if(!this.isShooting) {
                this.isShooting = true;
                this.firstFire = true;
                //console.log(this.bullets);
            }
        },

        updateBullets: function(dt) {
            if(this.countBullets > 0) {
                for(var i = 0; i < this.bullets.length; i++) {
                    if(this.bullets[i]) {
                        this.bullets[i].y += this.speedShoot * dt;
                        this.bullets[i]._sprite.pos[1] = this.bullets[i].y;

                        //console.log("ss: " + this.bullets[i].x);

                        if(this.bullets[i].y >= 600) {
                            delete this.bullets[i];
                            this.countBullets--;
                        }
                    }
                }
            } else {
                this.isShooting = false;
            }
        },

        teleport: function() {
            if(!this._isTeleporting) {
                var event = Math.random();
                //console.log(event);
                if(event <= this.prob) {
                    this.y = 98;
                    this._isTeleporting = true;
                    
                    return true;
                } else {
                    this.lifes--;
                    delete this.hearts[this.lifes];
                    return false;
                }
            }
        },

        teleporting: function(dt) {
            if(this._isTeleporting) {
                this._lasttime += dt;

                if(this._lasttime >= this._timeElapsed) {
                    this.y = this._lastY;
                    this._isTeleporting = false;
                    this._lasttime = 0;
                }
            }
        },

        runAnimations: function() {
            this._sprite.activate();
        },

        stopAnimations: function() {
            this._sprite.deactivate();
        }

    };

    window.Boss = Boss;

})();