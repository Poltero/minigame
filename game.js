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
canvas.width = 1024;
canvas.height = 512;

//Create an Viewport
//var viewport = new Viewport(0,0);

//The main game loop
var lastTime = 0;
var playerSpeed = 200;

var GameState = {
    controls: {
        left: false,
        right: false,
        space: false
    }
};

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimationFrame(main);
}


var currentLevel;

resources.load([
    'img/test.png',
    'img/test2.png',
    'img/bg.png'
]);

resources.onReady(init);


//init();



function render() {
    ctx.save();
    ctx.translate(currentLevel.viewport.offsetx, currentLevel.viewport.offsety);
    ctx.clearRect(-currentLevel.viewport.offsetx, -currentLevel.viewport.offsety, canvas.width,canvas.height);

    currentLevel.render(ctx);


    ctx.restore();

}

function update(dt) {
    handlerInput();
    currentLevel.update(dt, GameState.controls);
}

function init() {

    currentLevel = new LevelNormal('level1.txt', 'img/bg.png');
    //currentLevel = new BonusOne("bonus1.txt");


    currentLevel.init();

    main();

}

/*window.addEventListener("keydown", function(e){
    switch(e.keyCode)
    {
        case 37: // left arrow
            GameState.controls.left = true;
            break;
        case 38: // up arrow
            //Game.controls.up = true;
            break;
        case 39: // right arrow
            GameState.controls.right = true;
            break;
        case 40: // down arrow
            //Game.controls.down = true;
            break;
    }
}, false);

window.addEventListener("keyup", function(e){
    switch(e.keyCode)
    {
        case 37: // left arrow
            GameState.controls.left = false;
            break;
        case 38: // up arrow
            //Game.controls.up = false;
            break;
        case 39: // right arrow
            GameState.controls.right = false;
            break;
        case 40: // down arrow
            //Game.controls.down = false;
            break;
        case 80: // key P pauses the game
            //Game.togglePause();
            break;      
    }
}, false);*/

var block_key = false;

function handlerInput() {
    GameState.controls.left = input.isDown('LEFT');

    GameState.controls.right = input.isDown('RIGHT');

    GameState.controls.space = input.isDown('SPACE');

    if(GameState.controls.space) {

        if(block_key) {
            GameState.controls.space = false;
        }

        block_key = true;
    } else {
        block_key = false;
    }
}