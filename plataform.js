(function(){

    function Plataform(x, y, width, height, sprite, img, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this._sprite = (img != null) ? new Sprite(img, [x,y], [32,32], 0, [0,0], false, false, [0,0]) : null;
        this.fallen = false;
        this.speedFallen = 100;
        this.endDisapear = false;
        this.lastY = 0;
        this.lastX = 0;
        this.Viewx = 0;

        this.broken = function() {
            this.fallen = true;
            this.lastY = this.y;
            this.lastX = this.x;
        };
    };

    Plataform.prototype = {

        update: function(dt) {
            if(this.fallen && this.y <= 700) {
                this.y += this.speedFallen * dt;
            } else {
                this.endDisapear = true;
            }

            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;
        },

        render: function(ctx) {
            if(this._sprite != null)
                this._sprite.render(ctx, 0, 0);
        }
    };

    window.Plataform = Plataform;

}) ();