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

            //console.log(this.player);
            //Render player
            ctx.fillStyle="#FF0000";
            this.player.renderRect(ctx);
        }
    };

    window.Scene = Scene;
})();