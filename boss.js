(function() {

    function Boss(x, y, width, height, prob) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.prob = prob;
        this._sprite = new Sprite('img/boss.png', [x,y], [128,128], 0, [0,0], false, false, [0,0]);
        this._spriteJump;
        this._speedJump;
        this._isTeleporting = false;
        this._lastY = this.y;
        this._lasttime = 0;
        this._timeElapsed = 2;
        this.hidden = true;
    };


    Boss.prototype = {

        render: function(ctx) {
            if(!this.hidden) {
                this._sprite.render(ctx, 0, 0);
            }
        },

        update: function(dt) {
            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;

            this._sprite.update(dt);
        },

        teleport: function(dt) {
            if(!this._isTeleporting) {
                var event = Math.random();
                if(event <= this.prob) {
                    this.y = 600;
                    this._lasttime += dt;
                }
            } else {
                if(this._lasttime >= this._timeElapsed) {
                    this.y = this._lastY;
                    this._isTeleporting = false;
                    this._lasttime = 0;
                }
            }
        },

        runAnimations: function() {
            this._sprite.activate();
        },

        stopAnimations: function() {
            this._sprite.deactivate();
        }

    };

    window.Boss = Boss;

})();