document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('inputVideo');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let frameBuffer = [];
    const FRAME_BUFFER_SIZE = 10; // Number of frames to buffer
    const PIXEL_CHANGE_THRESHOLD = 500; // Threshold for pixel value change

    video.addEventListener('play', function() {
        setInterval(function() {
            if (!video.paused && !video.ended) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                let currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                if (frameBuffer.length >= FRAME_BUFFER_SIZE) {
                    let flashDetected = false;

                    for (let i = 0; i < currentFrame.length; i += 4) {
                        let pixelDiffSum = 0;

                        for (let j = 0; j < FRAME_BUFFER_SIZE; j++) {
                            let prevFrame = frameBuffer[j];
                            let diff = Math.abs(currentFrame[i] - prevFrame[i]);

                            pixelDiffSum += diff;
                        }

                        if (pixelDiffSum > PIXEL_CHANGE_THRESHOLD) {
                            flashDetected = true;
                            break;
                        }
                    }

                    if (flashDetected) {
                        ctx.fillStyle = 'black';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    frameBuffer.shift(); // Remove oldest frame
                }

                frameBuffer.push(currentFrame);
            }
        }, 200); // Adjust interval as needed
    });

    function pause() {
        document.getElementById('videoPlayer').pause();
    }
});

// document.addEventListener('DOMContentLoaded', function() {



// // function initFlashDetection() {
//     const video = document.getElementById('inputVideo');
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d', { willReadFrequently: true });
//     let lastFrameData;

//     video.addEventListener('play', function() {
//         setInterval(function() {
//             if (!video.paused && !video.ended) {
//                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//                 let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
//                 console.log("flashing");
//                 if (lastFrameData) {
//                     let flashDetected = false;

//                     for (let i = 0; i < imageData.length; i += 4) {
//                         let diff = Math.abs(imageData[i] - lastFrameData[i]);
//                         if (diff > 100) { // Adjust threshold as needed
//                             flashDetected = true;
//                             break;
//                         }
//                     }

//                     if (flashDetected) {
//                         // Apply blackout effect
//                         ctx.fillStyle = 'black';
//                         ctx.fillRect(0, 0, canvas.width, canvas.height);
//                     }
//                 }

//                 lastFrameData = imageData.slice(); // Copy the frame data
//             }
//         }, 200); // Adjust interval as needed
//     });
// // }

// function pause() {
//     document.getElementById('videoPlayer').pause();
// }

// // document.getElementById('inputVideo').addEventListener('play', initFlashDetection);
// });






// //  IDEAS:
// //  - count number of pixels with a difference greater than a threshold, then black out screen
// //  - 



// // 