(function () {

    function LevelNormal(mapFile, bg, ctxAudio, sounds) {
        Scene.call(this, mapFile, 64, 32, ctxAudio, sounds);

        this.background = resources.get(bg);

        //Functions
        this.update = function(dt, controls) {
            Scene.prototype.update.call(this, dt, controls);
        }
    };

    LevelNormal.prototype = new Scene;

    window.LevelNormal = LevelNormal;

})();