(function(){

    function MusicFactory(path, ctx) {
        this.path = path;
        var musicCache = {};
        this.count = 0;
        var domElement = domElement;
        var callback = callback;
        var elapsed = 0;
        var ctx = ctx;

        this._load = function(source, loop) {
            if(musicCache[source]) {
                return musicCache[source];
            }
            else {
                var fullPath = this.path + source;

                // Create lineOut
                var lineOut = new WebAudiox.LineOut(ctx)
                console.log("sdsd");

                // load a sound and play it immediatly
                WebAudiox.loadBuffer(ctx, fullPath, function(buffer){
                    console.log("now");
                    // init AudioBufferSourceNode
                    var src  = ctx.createBufferSource();
                    src.buffer   = buffer
                    src.connect(lineOut.destination)

                    // start the sound now
                    musicCache[source] = src;
                });

                //upProgress();
                /*var music = new Audio();
                music.src = fullPath;
                music.loop = loop;
                music.load();

                /*music.onprogress = function() {
                    console.log(music.buffered / music.duration);
                };
                //console.log("sd");

                music.oncanplaythrough = function() {
                    musicCache[source] = music;

                    if(isReady()){
                        //upProgress();
                        //finale();
                        callback();
                    }
                };

                musicCache[source] = false;*/

            }
        };

        this.load = function(files) {
            //elapsed = 50 / files.length;

            for(var i = 0; i < files.length; i++) {
                this._load(files[i].source, files[i].loop);
            }
        };

        this.get = function(source) {
            return musicCache[source];
        };

        var isReady = function() {
            var ready = true;
            for(var m in musicCache) {
                if(musicCache.hasOwnProperty(m) &&
                   !musicCache[m]) {
                    ready = false;
                }
            }
            return ready;
        };

        var upProgress = function() {
            val = domElement.val();
            domElement.val(val+elapsed);
        };

        var finale = function() {
            domElement.fadeOut(1000);
        }

    };


    window.MusicFactory = MusicFactory;


}) ();