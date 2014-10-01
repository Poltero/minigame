(function(){

    function Scene(mapFile, playerSize, tileSize) {
        this._mapFile = mapFile;
        this._plataforms = [];
        this._player = null;
        this._sizeTile = tileSize;
        this._sizePlayer = playerSize;
        this.viewport = new Viewport(0,0);
        this.npcs = [];
    };


    Scene.prototype = {

        render: function(ctx) {
            //ctx.fillStyle="#086A87";
            //Render Background
            ctx.drawImage(this.background, -this.viewport.offsetx, -this.viewport.offsety);
            //console.log(canvas.width);

            //Render all plataforms
            for(i = 0; i < this._plataforms.length; i++) {
                if(this._plataforms[i].x >= -(this.viewport.offsetx+this._sizeTile) && this._plataforms[i].x <= (-(this.viewport.offsetx) + canvas.width))
                    this._plataforms[i].render(ctx);
            }

            //Render player
            this._player.draw(ctx);
            //console.log(this.player.entity.pos[0]);
        },

        init: function() {

            var loadMap = function(data) {
                var map = data;
                var posx = 0, posy = 0;

                var size = map.length;
                for(i = 0; i < size; i++) {
                    var c = map.charAt(i);
                    
                    if(c == '-') {
                        this._plataforms.push(new Plataform(posx,posy,this._sizeTile,this._sizeTile,null));
                        posx = posx + this._sizeTile;
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
        },

        update: function(dt, controls) {

            if(controls.left) {
                if((this._player.x-this.viewport.offsetx) <= this._player.x) {
                    this._player.x -= this._player.speed * dt;;
                }
                else {
                    this.viewport.offsetx += (0.5 + (this._player.speed * dt)) << 0;
                }
            }
            if(controls.right) {
                if(this.viewport.pixelActivate > this._player.x) {
                    this._player.x += this._player.speed * dt;
                }
                else {
                    this.viewport.offsetx -= (0.5 +(this._player.speed * dt)) << 0;
                    //console.log("increment: " + ((0.5 +(this._player.speed * dt)) << 0));
                }
            }

            //Detect Collisions
            var isCollision = false;
            for(i = 0; i < this._plataforms.length; i++) {
                isCollision = this._player.checkcollision(this._plataforms[i], this.viewport);
                if(isCollision != 'none') {
                    break;
                }
            }

            if(isCollision == 'right') {
                if(this.viewport.isChange()) {
                    this.viewport.offsetx += (0.5 +(this._player.speed * dt)) << 0;
                } else {
                    this._player.x -= this._player.speed * dt;
                }
            }else if(isCollision == 'left') {
                if(this.viewport.isChange()) {
                    this.viewport.offsetx -= (0.5 +(this._player.speed * dt)) << 0;
                } else {
                    this._player.x += this._player.speed * dt;
                }
            }


            //update player position
            this._player.Viewx = this.viewport.offsetx;
            this._player.Viewy = this.viewport.offsety;
            this._player.update(dt);
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