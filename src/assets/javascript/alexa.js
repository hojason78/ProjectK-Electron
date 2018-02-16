var alexaAudio = new AudioContext();

class Alexa {
    static hasGetUserMedia() {
        console.log("Detecting getusermedia");
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    static capture() {
        if (hasGetUserMedia()) {
            console.log("Getusermedia detected");

            navigator.getUserMedia({
                    video: true,
                    audio: true
                },
                function (stream) {
                    console.log("Started");
                    var alexaplaybackelem = document.querySelector("video");
                    alexaplaybackelem.srcObject = stream;
                    alexaplaybackelem.onloadedmetadata = function (ready) {
                        console.log("Video loaded.");
                        alexaplaybackelem.play();
                    };
                },
                function (errror) {
                    console.log(error);
                }
            );
            console.log("Running...");
            setTimeout(() => {
                console.log("Ending...");
            }, 10000);
        } else {
            console.log("Media support not detected");
        }
    }

    static start() {
        console.log("Alexa service not supported.");
    };
}

onloadfuncs.push(Alexa.start);
