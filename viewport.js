(function(){

    function Viewport(offsetx, offsety) {
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.pixelActivate = 300;

        this.back = function(x) {
            this.offsetx += x;
        };
    }




    window.Viewport = Viewport;
})();