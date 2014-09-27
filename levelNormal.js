(function () {

    function LevelNormal(mapFile) {
        Scene.call(this, mapFile, 32, 32);

        //Functions
        this.update = function(dt, controls) {
            Scene.prototype.update.call(this, dt, controls);
        }
    };

    LevelNormal.prototype = new Scene;

    window.LevelNormal = LevelNormal;

})();