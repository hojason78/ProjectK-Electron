var audio = new AudioContext();

function hasGetUserMedia() {
    console.log("Detecting getusermedia");
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function capture() {
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

function start() {
    // Here lies my code
    setTimeout(() => {
        console.log("Alexa starting up");
        //capture();
    }, 1000);
    console.log("Alexa done.");
};

onloadfuncs.push(start);