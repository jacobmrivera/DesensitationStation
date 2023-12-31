let videoInput = document.getElementById('videoInput');
let canvasOutput = document.getElementById('canvasOutput');
let src, dst, cap, streaming = false;

function onOpenCvReady() {
    videoInput.addEventListener('change', function(event) {
    // Stop the previous video if any
    stopVideo();

    // Start processing the new video
    startVideo(event.target.files[0]);
    });
}

function startVideo(file) {
    // Initialize video elements
    let video = document.createElement('video');
    video.width = canvasOutput.width;
    video.height = canvasOutput.height;
    video.autoplay = true;
    video.muted = true;

    // Append the video to the body (hidden)
    document.body.appendChild(video);

    // Set up video source
    video.src = URL.createObjectURL(file);

    // Initialize OpenCV Mats
    src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    cap = new cv.VideoCapture(video);

    // Set streaming flag to true
    streaming = true;

    // Start processing the video
    processVideo();
}

function stopVideo() {
    streaming = false;

    // Release Mats
    if (src) src.delete();
    if (dst) dst.delete();
    if (cap) cap.delete();

    // Remove the video element
    let video = document.querySelector('video');
    if (video) {
    video.pause();
    video.src = '';
    document.body.removeChild(video);
    }
}

const FPS = 30;
function processVideo() {
    try {
    if (!streaming) {
        // Clean and stop.
        return;
    }

    let begin = Date.now();
    // Start processing.
    cap.read(src);
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvasOutput, dst);
    // Schedule the next one.
    let delay = 1000 / FPS - (Date.now() - begin);
    setTimeout(processVideo, delay);
    } catch (err) {
    console.error(err);
    }
}

// Schedule the first one.
setTimeout(processVideo, 0);
