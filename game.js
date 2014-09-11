// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 512;

//The main game loop
var lastTime;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    //update(dt);
    render();

    lastTime = now;
    requestAnimationFrame(main);
}


var currentLevel;
init();



function render() {
    
    //player.renderRect(ctx);
    currentLevel.render(ctx);

    //console.log(lastTime);
}

function init() {

    currentLevel = new Scene("level1.txt");

    $.get(currentLevel.mapFile, function(data) {
        var map = data;
        var posx = 0, posy = 0;

        var size = map.length;
        for(i = 0; i < size; i++) {
            var c = map.charAt(i);
            
            if(c == '-') {
                currentLevel.plataforms.push(new Entity(posx,posy,null));
                posx = posx + currentLevel.sizeTile;
            }
            else if(c == ' ') {
                posx = posx + currentLevel.sizeTile;
            }
            else if(c == 'p') {
                //console.log(" LOAD player");
                currentLevel.player = new Entity(posx, posy,null);
                //console.log(this.player);
                posx = posx + currentLevel.sizeTile;
            }
            else if(c == '\n') {
                posx = 0;
                posy = posy + currentLevel.sizeTile;
            }

            
        }

        main();

    });
}