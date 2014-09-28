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
            ctx.fillStyle="#086A87";

            //Render all plataforms
            for(i = 0; i < this._plataforms.length; i++) {
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
                    this._player.x -= this._player.speed * dt;
                }
                else {
                    this.viewport.offsetx += this._player.speed * dt;
                }
            }
            if(controls.right) {
                if(this.viewport.pixelActivate > this._player.x) {
                    this._player.x += this._player.speed * dt;
                }
                else {
                    this.viewport.offsetx -= this._player.speed * dt;
                }
            }

            //update player position
            this._player.Viewx = this.viewport.offsetx;
            this._player.Viewy = this.viewport.offsety;
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