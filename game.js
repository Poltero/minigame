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


var contextAudio = new AudioContext()

//Create an Viewport
//var viewport = new Viewport(0,0);

//The main game loop
var lastTime;
var playerSpeed = 200;

var GameState = {
    controls: {
        left: false,
        right: false,
        space: false,
        up: false
    }
};

var m;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);

    render();

    lastTime = now;
    requestAnimationFrame(main);
}

var currentLevel;


var musicFactory = new MusicFactory('music/', contextAudio, init, $("#progressbar"));

//Load music
//Load resources assets
    resources.load([
        'img/player.png',
        'img/tile.png',
        'img/bg.png',
        'img/jump.png',
        'img/enemy.png',
        'img/tpl.png'
    ]);
    resources.onReady(initMusic);



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

function initMusic() {
    $("#progressbar").val(50);
    musicFactory.load([
        'test3.wav',
        'test.wav'
    ]);
}

function init() {

    $("#progressbar").fadeOut(1000);


    currentLevel = new LevelNormal('level1.txt', 'img/bg.png', musicFactory);
    //currentLevel = new BonusOne("bonus1.txt");


    currentLevel.init();

    lastTime = Date.now();

    main();

}

var block_key = false;

function handlerInput() {
    GameState.controls.left = input.isDown('LEFT');

    GameState.controls.right = input.isDown('RIGHT');

    GameState.controls.space = input.isDown('SPACE');

    GameState.controls.up = input.isDown('UP');

    if(GameState.controls.space) {

        if(block_key) {
            GameState.controls.space = false;
        }

        block_key = true;
    } else {
        block_key = false;
    }
}