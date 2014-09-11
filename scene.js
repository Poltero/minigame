(function(){

    function Scene(mapFile) {
        this.mapFile = mapFile;
        this.plataforms = [];
        this.player = null;
        this.sizeTile = 32;
    };


    Scene.prototype = {

        render: function(ctx) {
            ctx.fillStyle="#086A87";

            //Render all plataforms
            for(i = 0; i < this.plataforms.length; i++) {
                this.plataforms[i].renderRect(ctx);
            }

            //Render player
            ctx.fillStyle="#FF0000";
            this.player.renderRect(ctx);
        },

        init: function() {

            var loadMap = function(data) {
                var map = data;
                var posx = 0, posy = 0;

                var size = map.length;
                for(i = 0; i < size; i++) {
                    var c = map.charAt(i);
                    
                    if(c == '-') {
                        this.plataforms.push(new Entity(posx,posy,null));
                        posx = posx + this.sizeTile;
                    }
                    else if(c == ' ') {
                        posx = posx + this.sizeTile;
                    }
                    else if(c == 'p') {
                        //console.log("LOAD player");
                        this.player = new Entity(posx, posy,null);
                        //console.log(this.player);
                        posx = posx + this.sizeTile;
                    }
                    else if(c == '\n') {
                        posx = 0;
                        posy = posy + this.sizeTile;
                    }
                }
            }

            $.ajax({
                async: false,
                type: 'GET',
                url: this.mapFile,
                success: $.proxy(loadMap,this)
            });
        }
    };

    window.Scene = Scene;
})();