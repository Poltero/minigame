(function(){

    function Viewport(offsetx, offsety) {
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.pixelActivate = 300;

        this.isChange = function() {
            return this.offsetx != 0;
        };
    }




    window.Viewport = Viewport;
})();