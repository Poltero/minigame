(function(){

    function Enemy(x, y, width, height, speed, sprite) {
        this._sprite = new Sprite('img/tpl.png', [x,y], [width,height], 10, [1,2,3,4,5,6,7,8,9,10], 'horizontal', false, [768,64]);
        this._spriteDieLeft = new Sprite('img/tpl.png', [x,y], [width,height], 0, [0,0], false, false, [1984,64]);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.rendering = false;
        this.moving = false;
        this.speedDown = 350;
        this.isDie = false;
        this.jumped = false;
        this.finalY = 0;
        this.pixelJump = 85;
        this.speedJump = 300;

        this.checkCollision = function(p) {
            //var realX = this.x + -(viewport.offsetx);

            var lP = this.x /* Ajuste+ 18*/;
            var rP = this.x + this.width /* Ajuste - 18*/;
            var bP = this.y + this.height;
            var lT = p.x;
            var rT = p.x + p.width;
            var tT = p.y;
            var bT = p.y + p.height;

            return ( bP >= tT &&
                    bP < bT &&
                    rP >= lT &&
                    lP <= rT );
        };

        this.checkCollisionBullet = function(b) {
            var lP = this.x; /* Ajuste *///+ 18;
            var rP = this.x + this.width; /* Ajuste *///- 18;
            var bP = this.y + this.height;
            var lT = b.x;
            var rT = b.x + b.width;
            var tT = b.y;
            var bT = b.y + b.height;
            //console.log(b);

            //console.log(bP + " | " + tT + " | " + bT + " | " + lP + " | " + rT);

            return ( bP >= tT &&
                    bP >= bT &&
                    rP >= lT &&
                    lP <= rT );
        };

        this.jump = function(dt) {
            if(!this.jumped) {
                this.finalY = Math.abs(this.y - this.pixelJump);
                this.jumped = true;
            }
            if(this.jumped) {
                if(this.y >= this.finalY) {
                    this.y -= this.speedJump * dt;
                } else {
                    this.jumped = false;    
                }
            }   
        };

        this.die = function(dt) {
            this._sprite = this._spriteDieLeft;

            this.isDie = true;
            this.jump(dt);
        };

    };

    Enemy.prototype = {

        render: function(ctx) {
            this._sprite.render(ctx, 0, 0);
        },

        update: function(dt) {
            this._sprite.pos[0] = this.x;
            this._sprite.pos[1] = this.y;

            this._sprite.update(dt);
        },

        move: function(dt) {
            this.x -= this.speed * dt;
        },

        down: function(dt) {
            this.y += this.speedDown * dt;
        },

        runAnimations: function() {
            this._sprite.activate();
        },

        stopAnimations: function() {
            this._sprite.deactivate();
        }

    };

    window.Enemy = Enemy;

})();