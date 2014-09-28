(function () {

    function BonusOne(mapFile) {
        Scene.call(this, mapFile, 64, 32);

        this.scorePlayer = 0;
        this.scoreNpc1 = 0;
        this.scoreNpc2 = 0;

        //Functions
        this.update = function(dt, controls) {
            //Scene.prototype.update.call(this, dt, controls);

            if(controls.space) {
                this.scorePlayer++;
            }
        };

        this.render = function(ctx) {
            Scene.prototype.render.call(this, ctx);

            //Render all npcs
            for(i = 0; i < this.npcs.length; i++) {
                this.npcs[i].draw(ctx);
            }

            //Render text
            ctx.font="30px Verdana";
            ctx.fillText(this.scorePlayer, this._player.x, this._player.y-32,50);
        }
    };

    BonusOne.prototype = new Scene;

    window.BonusOne = BonusOne;

})();