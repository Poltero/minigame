(function(){

    function BonusTwo(args) {
        Scene.call(this, args.map, 64, 32, args.factory);

        this.background = resources.get('img/tpl.png');
        this.xSplash = args.splash[0];
        this.ySplash = args.splash[1];
        this.xBackgroud = args.background[0];
        this.yBackgroud = args.background[1];
        this.coins = [];
        this.score = $("#score");
        this.flag = false;
        this.bgmusic = args.music;


        this.init = function() {
            Scene.prototype.init.call(this);
            this._player.runAnimations();
            this.npcs[0].runAnimations();
            this._player.speed = 800;
            this.npcs[0].speed = 50;
        };

        this.update = function(dt, controls) {
            if(GameState.game == 'start') {
                //to do

                //Controlar la colision que viene del padre
                this.detectCollisionDown(dt);

                if(!this.collision) {
                    this._player.y += this._player.speedDown * dt;
                }

                //Collisions npcs
                this.detectCollisionDown(dt, this.npcs[0]);

                if(!this.collision && !this.flag) {
                    this.npcs[0].y += this.npcs[0].speedDown * dt;
                } else {
                    this.flag = true;
                }

                if(controls.space) {
                    if(this._player.dir != 'right') {
                        this._player.dir = 'right';
                        this._player._sprite = this._player._spriteRight;
                    }
  
                    this.viewport.offsetx -= (this._player.speed * dt);

                }

                //Movement auto for npc
                this.npcs[0].x += (this.npcs[0].speed * dt);

                /*if(!controls.space) {
                    console.log("hi")
                    this._player.stopAnimations();
                }*/

                this.collisionCoins();


                //Update Player
                this._player.Viewx = this.viewport.offsetx;
                this._player.Viewy = this.viewport.offsety;
                this._player.update(dt);

                //Update Npc
                this.npcs[0].update(dt);
            
            }
            else if(GameState.game == 'splash') {
                this.pre(dt);
            }

        };

        this.render = function(ctx) {
            Scene.prototype.render.call(this, ctx);

            if(GameState.game == 'start') {
                this.npcs[0].draw(ctx);


                for(var i = 0; i < this.coins.length; i++) {
                    if(this.coins[i])
                        this.coins[i].render(ctx);
                }           
            }
        };

    };

    BonusTwo.prototype = new Scene;

    window.BonusTwo = BonusTwo;


})();