(function(){

    function Scene(mapFile, playerSize, tileSize, audioFactory) {
        this._mapFile = mapFile;
        this._plataforms = [];
        this._player = null;
        this._enemies = [];
        this._sizeTile = tileSize;
        this._sizePlayer = playerSize;
        this.viewport = new Viewport(0,0);
        this.npcs = [];
        this.audio = audioFactory;
        this.sounds = {};
        this.bgmusic;

        this.collision = false;
        this.collisionEnemy = false;
        this.lasttime = 0;
        this.timeSplash = 2;
        this.xTpl;
        this.yTpl;
        this.specials = 0;
        this.boss = null;
        this._sizeBoss = 128;
        this._sizeCoin = 16;
        //this.vision = 128;
    };


    Scene.prototype = {

        render: function(ctx) {
            //Render Background
            ctx.drawImage(this.background, this.xTpl, this.yTpl, 1024, 512, -this.viewport.offsetx, -this.viewport.offsety, 1024, 512);
            //console.log(canvas.width);

            if(GameState.game != 'splash') {
                //Render all plataforms
                for(i = 0; i < this._plataforms.length; i++) {
                    if(this._plataforms[i].x >= -(this.viewport.offsetx+this._sizeTile) && this._plataforms[i].x <= (-(this.viewport.offsetx) + canvas.width))
                        this._plataforms[i].render(ctx);
                }

                //Render all Enemies
                for(i = 0; i < this._enemies.length; i++) {
                    if(this._enemies[i].rendering)
                        this._enemies[i].render(ctx);
                }       

                //Render player
                this._player.draw(ctx);
                //console.log(this.player.entity.pos[0]);

                //score
                $("#infoScore").fadeIn(1);
            }
        },

        init: function() {
            var loadMap = function(data) {
                var map = data;
                var posx = 0, posy = 0;

                var size = map.length;
                for(i = 0; i < size; i++) {
                    var c = map.charAt(i);
                    
                    if(c == '-') {
                        this._plataforms.push(new Plataform(posx,posy,this._sizeTile,this._sizeTile,null, 'img/tile.png', c));
                        posx = posx + this._sizeTile;
                    }
                    else if(c == 'l') {
                        this._plataforms.push(new Plataform(posx,posy,this._sizeTile,this._sizeTile,null, 'img/tilel.png', c));
                        posx = posx + this._sizeTile;
                    }
                    else if(c == 'r') {
                        this._plataforms.push(new Plataform(posx,posy,this._sizeTile,this._sizeTile,null, 'img/tiler.png', c));
                        posx = posx + this._sizeTile;
                    }
                    else if(c == 'i') {
                        this._plataforms.push(new Plataform(posx,posy,this._sizeTile,this._sizeTile,null, 'img/relleno.png', c));
                        posx = posx + this._sizeTile;
                    }
                    else if(c == '+') {
                        this._enemies.push(new Enemy(posx,posy,this._sizePlayer,this._sizePlayer,100,null));
                        posx = posx + this._sizeTile;
                    }
                    else if(c == 'k') {
                        this._plataforms.push(new Plataform(posx,posy,this._sizeTile,this._sizeTile,null, 'img/tile.png', c));
                        posx = posx + this._sizeTile;
                        this.specials++;
                    }
                    else if(c == 'o') {
                        this._plataforms.push(new Plataform(posx,posy,this._sizeTile,this._sizeTile,null, 'img/tile.png', c));
                        posx = posx + this._sizeTile;
                    }
                    else if(c == 'b') {
                        this.boss = new Boss(posx, posy, this._sizeBoss, this._sizeBoss, 0.2);
                        posx = posx + this._sizeBoss;
                    }
                    else if(c == 'c') {
                        this.coins.push(new Coin(posx, posy));
                        posx = posx + this._sizeCoin;
                    }
                    else if(c == ' ') {
                        posx = posx + this._sizeTile;
                    }
                    else if(c == 'p') {
                        //console.log("LOAD player");
                        this._player = new Player(posx, posy,this._sizePlayer,this._sizePlayer,200,null);
                        //console.log(this.player);
                        posx = posx + this._sizeTile;
                    }
                    else if(c == 1 || c == 2) {
                        this.npcs.push(new Player(posx, posy,this._sizePlayer,this._sizePlayer,10,null));
                        posx = posx + this._sizeTile;
                    }
                    else if(c == '\n') {
                        posx = 0;
                        posy = posy + this._sizeTile;
                    }
                }
            }

            $.ajax({
                async: false,
                type: 'GET',
                url: this._mapFile,
                success: $.proxy(loadMap,this)
            });

            this.sounds = {
                jump: {
                    buffer: this.audio.get('test.wav'),
                    loop: false
                },
                bgmusic: {
                    buffer: this.audio.get(this.bgmusic),
                    loop: true
                }
            };
        },

        update: function(dt, controls) {
            if(GameState.game == 'start') {
                if(controls.left) {
                    if(this._player.dir != 'left') {
                        this._player.dir = 'left';
                        this._player._sprite = this._player._spriteLeft;
                    }
                    if((this._player.x-this.viewport.offsetx) <= this._player.x) {
                        this._player.x -= this._player.speed * dt;;
                    }
                    else {
                        this.viewport.offsetx += (0.5 + (this._player.speed * dt)) << 0;
                    }

                    this._player.runAnimations();
                }

                if(controls.right) {
                    if(this._player.dir != 'right') {
                        this._player.dir = 'right';
                        this._player._sprite = this._player._spriteRight;
                    }
                    if(this.viewport.pixelActivate > this._player.x) {
                        this._player.x += this._player.speed * dt;
                    }
                    else {
                        this.viewport.offsetx -= (0.5 +(this._player.speed * dt)) << 0;
                    }

                    this._player.runAnimations();
                }

                if(!controls.left && !controls.right && !this._player.shooting) {
                    this._player.stopAnimations();
                }

                //Detect Collisions Down
                this.collision = false;
                for(i = 0; i < this._plataforms.length; i++) {
                    if(this._plataforms[i].type != 'i' && this._plataforms[i].type != 'o') {
                        if(this._player.checkCollision(this._plataforms[i], this.viewport)) {
                            this.collision = true;
                            break;
                        }
                    }
                }

            }
            else if(GameState.game == 'splash') {
                //Show Splash
                this.xTpl = this.xSplash;
                this.yTpl = this.ySplash;
                this.lasttime += dt;

                if(this.lasttime >= this.timeSplash) {
                    this.xTpl = this.xBackgroud;
                    this.yTpl = this.yBackgroud;
                    GameState.game = 'start';
                    //Run Background music
                    //this.music = this.audio.make(this.sounds.bgmusic.buffer, this.sounds.bgmusic.loop);
                    //this.music.start(0);
                }

            }
        },

        reset: function() {
            this._plataforms = [];
            this._player = null;
            this._enemies = [];
            this.viewport = new Viewport(0,0);
            this.npcs = [];
            this.sounds = {};

            this.collision = false;
            this.collisionEnemy = false;
            this.lasttime = 0;
        }
    };

    window.Scene = Scene;
})();



/*

if(controls.left) {
                if(this.viewport.offsetx <= this.player.entity.pos[0]) {
                    this.player.entity.pos[0] -= this.player.speed * dt;
                }
                else {
                    this.viewport.offsetx += this.player.speed * dt;
                }
            }
            if(controls.right) {
                if(this.viewport.pixelActivate > this.player.entity.pos[0]) {
                    this.player.entity.pos[0] += this.player.speed * dt;
                }
                else {
                    this.viewport.offsetx -= this.player.speed * dt;
                }
            }
*/