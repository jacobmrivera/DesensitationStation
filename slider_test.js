document.addEventListener('DOMContentLoaded', function() {


// // const video = document.getElementById('inputVideo');
// const canvas = document.getElementById('outputCanvas');
// const context = canvas.getContext('2d');

// function processFrame() {
//   context.drawImage(video, 0, 0, 1920, 1080);
//   const imageData = context.getImageData(0, 0, 1920 , 1080);

//   // Get the current frame's pixel data
// //   const imageData = video.getImageData(0, 0, video.videoWidth, video.videoHeight);

//   // Apply RGB adjustments to each pixel
//   for (let i = 0; i < imageData.data.length; i += 4) {
//     const redValue = imageData.data[i];
//     const greenValue = imageData.data[i + 1];
//     const blueValue = imageData.data[i + 2];

//     // Modify RGB values based on desired adjustments
//     const modifiedRedValue = adjustRedValue(redValue);
//     const modifiedGreenValue = adjustGreenValue(greenValue);
//     const modifiedBlueValue = adjustBlueValue(blueValue);

//     // Update the pixel data with modified RGB values
//     imageData.data[i] = modifiedRedValue;
//     imageData.data[i + 1] = modifiedGreenValue;
//     imageData.data[i + 2] = modifiedBlueValue;
//   }

//   // Draw the modified frame onto the canvas
//   context.putImageData(imageData, 0, 0);

//   // Request the next frame to be processed
//   requestAnimationFrame(processFrame);
// }

// // Define functions to adjust red, green, and blue values as needed

// function adjustRedValue(redValue) {
//   // Apply desired adjustment to the red value
//   return 100;
// }

// function adjustGreenValue(greenValue) {
//   // Apply desired adjustment to the green value
//   return 100;
// }

// function adjustBlueValue(blueValue) {
//   // Apply desired adjustment to the blue value
//   return 100;
// }

// // Start processing frames
// requestAnimationFrame(processFrame);




    const video = document.getElementById('inputVideo');
    const canvas2 = document.getElementById('outputCanvas2');
    const ctx = canvas2.getContext('2d');

    // Listen for the 'timeupdate' event to draw video frames
    video.addEventListener('timeupdate', drawFrame);

    // Function to draw the current video frame on the canvas
    function drawFrame() {
        console.log("daring frae");
        ctx.drawImage(video, 0, 0, canvas2.width, canvas2.height);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas2.width, canvas2.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Red channel is at index i (0, 4, 8, ...)
        data[i] = 0; // Set red channel value
      }
    //   imageData.data = data; 
      // Put the modified image data back onto the canvas
    //   console.log(imageData);
      ctx.putImageData(imageData, 0, 0);
    }

    // Listen for changes in the slider value
    redSlider.addEventListener('input', function() {
      drawFrame(); // Redraw the frame when the slider changes
    });




});