(function () {

    function BonusOne(mapFile) {
        Scene.call(this, mapFile);

        //Functions
        this.uptade = function() {
            Scene.prototype.update.call(this);
        }
    };

    BonusOne.prototype = Scene;

    window.BonusOne = BonusOne;

})();