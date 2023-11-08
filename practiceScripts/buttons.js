// Get references to the video element and the play/pause buttons
// const video = document.getElementById("videoPlayer");

const redButton = document.getElementById('pro');
const greenButton = document.getElementById("deu");
const blueButton = document.getElementById("tri");

// const rednessSlider = document.getElementById('rednessSlider');
// const greennessSlider = document.getElementById('greennessSlider');
// const bluenessSlider = document.getElementById('bluenessSlider');

const rednessValue = document.getElementById('rednessValue');
const greennessValue = document.getElementById('greennessValue');
const bluenessValue = document.getElementById('bluenessValue');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawVideo() {
    // if (videoPlayer.paused || videoPlayer.ended) return;
    ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
    
    // Get the pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log("wher")
    const data = imageData.data;

    // Loop through each pixel and subtract red channel
    for (let i = 0; i < data.length; i += 4) {
        // Subtract the red channel value from 255 (inverting it)
        data[i] = 255 - data[i];
    }

    // Put the modified data back on the canvas
    ctx.putImageData(imageData, 0, 0);

    setTimeout(drawVideo, 0);
}

function play() {
    videoPlayer.play();
    console.log("Play")
    // canvas.width = `400px`; //videoPlayer.width;
    // canvas.height = videoPlayer.height;
    drawVideo();

}

function pause() {
    videoPlayer.pause();
}


function setPro() {
    rednessSlider.value = 0;
    greennessSlider.value = 100;
    bluenessSlider.value = 100;

    console.log("red button");
}

function setDeu() {
    rednessSlider.value = 100;
    greennessSlider.value = 0;
    bluenessSlider.value = 100;

    console.log("green button");
}

function setTri() {
    bluenessSlider.value = 0;
    greennessSlider.value = 100;
    rednessSlider.value = 100;

    console.log("blue button");
}

