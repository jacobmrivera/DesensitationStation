let flash_detected = -1; // Declare the variable
export { flash_detected };

document.addEventListener('DOMContentLoaded', function() {

  // Detect flashing in the video.
  const videoElement = document.getElementById('inputVideo');
  const canvasElement = document.querySelector('#outputCanvas2');
  const context = canvasElement.getContext('2d', { willReadFrequently: true });
  const threshold = 20;

  const flash_div = document.getElementById('flash_detected');
  let previousFrameData = [];
  let flashCount = 0;

  setInterval(() => {
    flashCount = 0;
    //console.log("resetting");
  }, 1000);

  // Detect flashing every 1/10th of a second.
  let intervalId = setInterval(() => {

    if (!videoElement.paused) {
        detectFlashing(videoElement, canvasElement, context, threshold);
    }
    // detectFlashingWithBitmap(videoElement, threshold)
    if (flashCount >= 3) {

      console.log('Three or more flashes detected!');
      // clearInterval(intervalId);
      flashCount = 0;

      // Change the variable after 5 seconds
        setTimeout(() => {
          flash_div.textContent = 1;
            console.log('Flash div content changed');

            // Revert the variable back after another 5 seconds
            setTimeout(() => {
              flash_div.textContent = -1;
                console.log('Flash div content reverted');
            }, 5000); // Delay for reverting the variable
        }, 0); // Delay for changing the variable
    }


  }, 10);
  // Reset flash count after one second



//  Define the detectFlashing() function.
 function detectFlashing(video, canvas, context, threshold) {

    // Draw the current frame onto the canvas.
    context.drawImage(video, 0, 0, 1920, 1080);

    // Get the pixel data from the canvas.
    const imageData = context.getImageData(0, 0, 1920, 1080);

    // Calculate the red channel difference between the current and previous frames.
    const redChannelDifference = Math.abs(imageData.data[0] - previousFrameData[0]);
    //   console.log(redChannelDifference);
    // Update the previous frame data.
    previousFrameData = imageData.data;

    // If the red channel difference is greater than the threshold, then a flash has been detected.
    if (redChannelDifference > threshold) {
      flashCount++;
    }
  }

//   function sendFilterNum(value) {
//     const event = new CustomEvent('filterChange', {detail: {newValue: value}})
//     document.dispatchEvent(event);
//   }

  });
