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
    },

    game: 'splash',
    currentLevel: 0
};

var m;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    if(GameState.game != 'reset') {
        render();
    }
    else {
        init();
    }

    lastTime = now;
    requestAnimationFrame(main);
}


var musicFactory = new MusicFactory('music/', contextAudio, init, $("#progressbar"));

//Load resources assets
resources.load([
    'img/player.png',
    'img/tile.png',
    'img/bg.png',
    'img/jump.png',
    'img/enemy.png',
    'img/tpl.png',
    'img/punio_left.png',
    'img/punio_right.png',
    'img/tilel.png',
    'img/tiler.png',
    'img/relleno.png',
    'img/lvl1.png',
    'img/boss.png',
    'img/cacacoin.png'

]);
resources.onReady(initMusicAndLevels);


//Levels
var levels = [];




function render() {
    ctx.save();
    ctx.translate(levels[GameState.currentLevel].viewport.offsetx, levels[GameState.currentLevel].viewport.offsety);
    ctx.clearRect(-levels[GameState.currentLevel].viewport.offsetx, -levels[GameState.currentLevel].viewport.offsety, canvas.width,canvas.height);

    levels[GameState.currentLevel].render(ctx);


    ctx.restore();

}

function update(dt) {
    handlerInput();
    levels[GameState.currentLevel].update(dt, GameState.controls);
}

function initMusicAndLevels() {
    $("#progressbar").val(50);
    musicFactory.load([
        'test3.wav',
        'test.wav'
    ]);

    //InitLevels
    levels[0] =  new LevelNormal('level1s.txt', 'img/tpl.png', [2048,2048], [2048,0], musicFactory);
}

function init() {

    $("#progressbar").fadeOut(1000);

    levels[GameState.currentLevel].init();

    lastTime = Date.now();

    GameState.game = 'splash';

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