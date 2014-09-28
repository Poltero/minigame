(function () {

    function BonusOne(mapFile) {
        Scene.call(this, mapFile, 64, 32);

        this.scorePlayer = 0;
        this.scoreNpc1 = 0;
        this.scoreNpc2 = 0;
        this.lastTimeNpc1 = 0;
        this.lastTimeNpc2 = 0;

        //Functions
        this.update = function(dt, controls) {
            //Scene.prototype.update.call(this, dt, controls);

            if(controls.space) {
                this.scorePlayer++;
            }
            this.lastTimeNpc1 += (dt*1000)/60;
            
            if(this.lastTimeNpc1 >= 3) {
                this.scoreNpc1 += 1;
                this.lastTimeNpc1 = 0;
            }

            this.lastTimeNpc2 += (dt*1000)/60;

            if(this.lastTimeNpc2 >= 5) {
                this.scoreNpc2 += 1;
                this.lastTimeNpc2 = 0;
            }

            //Win or lose

            if(this.scoreNpc2 >= 25) {
                delete this.npcs[1];
            }

        };

        this.render = function(ctx) {
            Scene.prototype.render.call(this, ctx);

            //Render all npcs
            for(i = 0; i < this.npcs.length; i++) {
                if(this.npcs[i] != undefined)
                    this.npcs[i].draw(ctx);
            }

            //Render text
            ctx.font="30px Verdana";
            ctx.fillText(this.scorePlayer, this._player.x, this._player.y-32);
            ctx.fillText(this.scoreNpc1, this.npcs[0].x, this.npcs[0].y-32);
            if(this.npcs[1] != undefined)
                ctx.fillText(this.scoreNpc2, this.npcs[1].x, this.npcs[1].y-32);
        }
    };

    BonusOne.prototype = new Scene;

    window.BonusOne = BonusOne;

})();