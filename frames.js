// frames.js

const video = document.getElementById('inputVideo');
let extractedFrameData = null; // Variable to store frame image data

function extractFrame() {
    console.log("In extract frame");
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Save the frame as an image data URL
    extractedFrameData = canvas.toDataURL();

    
}

function displayFrame() {
    console.log("In display frame");
    const canvas = document.getElementById('outputCanvas2');
    const ctx = canvas.getContext('2d');

    if (extractedFrameData) {
        const img = new Image();
        img.src = extractedFrameData;
        img.onload = function() {
            console.log("Drawing captured frame");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = extractedFrameData;
    }
}

export { extractFrame, displayFrame };