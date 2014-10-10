(function () {

    function LevelNormal(mapFile, bg, ctxAudio) {
        Scene.call(this, mapFile, 64, 32, ctxAudio);

        this.background = resources.get(bg);
        this.bgmusic = 'test3.wav';
        this.flagSound = false;
        this.bullets = [];

        this.init = function() {
            Scene.prototype.init.call(this);

            //Run Background music
            //this.audio.make(this.sounds.bgmusic.buffer, this.sounds.bgmusic.loop).start(0);
        };

        this.render = function(ctx) {
            Scene.prototype.render.call(this, ctx);

            //Update Bullets
            for(var i = 0; i < this.bullets.length; i++) {
                if(this.bullets[i])
                    this.bullets[i].render(ctx);
            }
        };

        //Functions
        this.update = function(dt, controls) {
            Scene.prototype.update.call(this, dt, controls);

            //Player
            if(controls.up) {
                if(this.collision && !flagSound) {
                    this.audio.make(this.sounds.jump.buffer, this.sounds.jump.loop).start(contextAudio.currentTime);
                    flagSound = true;
                }
            }
            if(controls.up || this._player.jumped) {
                this._player.jump(dt, this.collision);
            } else {
                flagSound = false;
            }

            if(!this.collision && !this._player.jumped) {
                this._player.y += this._player.speedDown * dt;
            }

            //Enemies
            for(i = 0; i < this._enemies.length; i++) {
                this.collisionEnemy = false;
                for(j = 0; j < this._plataforms.length; j++) {
                    if(this._enemies[i].checkCollision(this._plataforms[j])) {
                        this.collisionEnemy = true;
                        break;
                    }
                }
                if(this._enemies[i].x >= -(this.viewport.offsetx+this._sizeTile) && this._enemies[i].x <= (-(this.viewport.offsetx) + canvas.width)) {
                    this._enemies[i].rendering = true;
                    this._enemies[i].moving = true;
                } else {
                    this._enemies[i].rendering = false;
                }

                //Moving Enemies
                if(this._enemies[i].moving) {
                    this._enemies[i].move(dt);
                    if(!this.collisionEnemy) {
                        this._enemies[i].down(dt);
                    }
                }

                //Update
                this._enemies[i].update(dt);
            }

            //Shoots
            if(controls.space) {
                var posy = this._player.y, posx = 0;
                if((this._player.x-this.viewport.offsetx) <= this._player.x) {
                    posx = this._player.x;
                }
                else {
                    posx = ((this._player.x + this._player.width/2) - this.viewport.offsetx);
                }
                this.bullets.push(new Bullet(posx, posy, 300, this._player.dir));
            }

            //Update Bullets
            for(var i = 0; i < this.bullets.length; i++) {
                //console.log(this.bullets);
                if(this.bullets[i]) {
                    if(this.bullets[i].x >= -(this.viewport.offsetx+this._sizeTile) && this.bullets[i].x <= (-(this.viewport.offsetx) + canvas.width)) {
                        this.bullets[i].update(dt);
                    } else {
                        delete this.bullets[i];
                    }
                }
            }


            //update player position
            this._player.Viewx = this.viewport.offsetx;
            this._player.Viewy = this.viewport.offsety;
            this._player.update(dt);
        };
    };

    LevelNormal.prototype = new Scene;

    window.LevelNormal = LevelNormal;

})();