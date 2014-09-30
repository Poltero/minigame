(function () {

    function LevelNormal(mapFile, bg) {
        Scene.call(this, mapFile, 32, 32);

        this.background = resources.get(bg);

        //Functions
        this.update = function(dt, controls) {
            Scene.prototype.update.call(this, dt, controls);
        }
    };

    LevelNormal.prototype = new Scene;

    window.LevelNormal = LevelNormal;

})();