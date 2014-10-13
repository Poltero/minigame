(function() {
    function Sprite(url, pos, size, speed, frames, dir, once, posTpl) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
        this.active = false;
        this.posTpl = posTpl;
        this.done = false;

        this.isDone = function() {
            return this.done;
        }
    };

    Sprite.prototype = {
        update: function(dt) {
            if(this.active)
                this._index += this.speed*dt;
        },

        render: function(ctx, vx, vy) {
            var frame;

            if(this.speed > 0 && this.active) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    //return;
                }
            }
            else {
                frame = 0;
            }


            var x = this.pos[0];
            var y = this.pos[1];
            var xp = this.posTpl[0];
            var yp = this.posTpl[1];

            if(this.dir == 'vertical') {
                yp += frame * this.size[1];
            }
            else {
                xp += frame * this.size[0];
            }

            //console.log(this.active);
            //Debug options
            //console.log("x: " + x + " | y: " + y);
            //ctx.fillText(x, x-vx, y-vy);
            ctx.drawImage(resources.get(this.url),
                          xp,yp,
                          this.size[0], this.size[1],
                          x-vx, y-vy,
                          this.size[0], this.size[1]
                          );
        },

        activate: function() {
            this.active = true;
        },

        deactivate: function() {
            if(this.active) {
                this.active = false;
                this._index = 0;
                if(this.done)
                    this.done = false;
            }
        }
    };

    window.Sprite = Sprite;
})();