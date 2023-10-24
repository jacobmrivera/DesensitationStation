const video = document.getElementById('video-player');

// Play/Pause the video
function play_pause(){
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
// document.getElementById('play-button').addEventListener('click', () => {
//     if (video.paused) {
//         video.play();
//     } else {
//         video.pause();
//     }
// });

// // Adjust video speed
// document.getElementById('speed-slider').addEventListener('input', () => {
//     video.playbackRate = parseFloat(speedSlider.value);
// });

// // Adjust video brightness
// document.getElementById('brightness-slider').addEventListener('input', () => {
//     video.style.filter = `brightness(${brightnessSlider.value}%)`;
// });

// // Adjust audio volume
// document.getElementById('volume-slider').addEventListener('input', () => {
//     video.volume = parseFloat(volumeSlider.value);
// });
