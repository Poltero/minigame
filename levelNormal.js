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
        this.update = function(dt, controls, gamestate) {
            if(!gamestate.die) {
                Scene.prototype.update.call(this, dt, controls, gamestate);

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
                        if(this._plataforms[j].type != 'i') {
                            if(!this._enemies[i].isDie) {
                                if(this._enemies[i].checkCollision(this._plataforms[j])) {
                                    this.collisionEnemy = true;
                                    break;
                                }
                            }
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
                        if(!this._enemies[i].isDie) {
                            this._enemies[i].move(dt);
                            this._enemies[i].runAnimations();
                        }
                        if(!this.collisionEnemy && !this._enemies[i].jumped) {
                            this._enemies[i].stopAnimations();
                            this._enemies[i].down(dt);
                        }
                    }

                    //Collision player with enemies
                    if(!this._enemies[i].isDie) {
                        if(this._player.checkCollisionEnemy(this._enemies[i], this.viewport)) {
                            this._player.die(dt);
                            gamestate.die = true;
                            break;
                        }
                    }

                    //Collision enemy with bullets

                    for(var k = 0; k < this.bullets.length; k++) {
                        if(!this._enemies[i].isDie) {
                            if(this.bullets[k]) {
                                if(this._enemies[i].checkCollisionBullet(this.bullets[k])) {
                                    this._enemies[i].die(dt);
                                    //delete the bullet
                                    delete this.bullets[k];
                                }
                            }
                        }
                    }

                    //Animation death enemis
                    if(this._enemies[i].jumped) {
                        this._enemies[i].jump(dt);
                    }

                    //Update
                    this._enemies[i].update(dt);
                }
            }

            if(gamestate.die) {
                if(this._player.jumped) {
                    this._player.jump(dt, false);
                } else {
                    this._player.y += this._player.speedDown * dt;
                }
            }

            if(!gamestate.die) {

                //Shoots
                if(this._player.shooting) {
                    if(this._player.isFinaleShooting()) {
                        var posy = this._player.y, posx = 0;
                        if((this._player.x-this.viewport.offsetx) <= this._player.x) {
                            posx = this._player.x;
                            if(this._player.dir == 'right')
                                posx += 50; //Ajuste en right
                        }
                        else {
                            posx = ((this._player.x + this._player.width/2) - this.viewport.offsetx);
                        }
                        if(this._player.dir == 'left')
                            posx -= 50; //Ajuste en left
                        this.bullets.push(new Bullet(posx, posy, 300, this._player.dir));
                        this._player.shooting = false;
                        this._player.stopAnimations();
                        this._player.idle();

                    } 
                }

                if(controls.space) {
                    if(!this._player.shooting) {
                        this._player.stopAnimations();
                        this._player.shoot();
                        this._player.runAnimations();
                        this._player.shooting = true;
                    }
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