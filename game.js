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
    'img/player.png',
    'img/tile.png',
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