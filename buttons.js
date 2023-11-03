// Get references to the video element and the play/pause buttons
const video = document.getElementById("inputVideo");

const redButton = document.getElementById('pro');
const greenButton = document.getElementById("deu");
const blueButton = document.getElementById("tri");

// const rednessSlider = document.getElementById('rednessSlider');
// const greennessSlider = document.getElementById('greennessSlider');
// const bluenessSlider = document.getElementById('bluenessSlider');

const rednessValue = document.getElementById('rednessValue');
const greennessValue = document.getElementById('greennessValue');
const bluenessValue = document.getElementById('bluenessValue');


function play() {
    video.play();

}

function pause() {
    video.pause();
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

