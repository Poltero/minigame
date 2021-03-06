(function(){

    function MusicFactory(path, ctx, callback, domElement) {
        this.path = path;
        var musicCache = {};
        this.count = 0;
        var domElement = domElement;
        var callback = callback;
        var elapsed = 0;
        var ctx = ctx;
        var volume = ctx.createGain();

        this._load = function(source) {
            if(musicCache[source]) {
                return musicCache[source];
            }
            else {
                var fullPath = this.path + source;

                // Create lineOut

                // load a sound and play it immediatly
                WebAudiox.loadBuffer(ctx, fullPath, function(buffer){
                    //console.log("Loaded buffer");
                    // init AudioBufferSourceNode
                    

                    upProgress(); 
                    musicCache[source] = buffer;

                    if(isReady()) {
                        callback();
                    }
                });

                musicCache[source] = false;

            }
        };

        this.load = function(files) {
            elapsed = 50 / files.length;

            for(var i = 0; i < files.length; i++) {
                this._load(files[i]);
            }
        };

        this.make = function(buffer, loop, vol) {
            //console.log(buffer);
            var src  = ctx.createBufferSource();
            src.buffer   = buffer

            volume.gain.value = vol || 0.4;

            src.connect(volume);
            volume.connect(ctx.destination);
            src.loop = loop;

            return src;
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