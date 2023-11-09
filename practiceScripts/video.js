window.addEventListener("DOMContentLoaded", (event) => {



    const video = document.getElementById('videoPlayer');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });


    // getContext('2d', { willReadFrequently: true });
    function playVid(){
        // video = document.getElementById('video');
        console.log("click");
        video.play();
        requestAnimationFrame(processFrame);
    }
    document.getElementById('play-button').addEventListener('click', playVid);


    function processFrame() {
        console.log("frame")
      // Draw the current frame from the video onto the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height, );
      const data = imageData.data;

      // Modify the pixel values as needed
      for (let i = 0; i < data.length; i += 4) {
        // Modify RGBA values here, e.g., invert colors
        data[i] = 255; // - data[i];         // Red
        // data[i + 1] = 255;// - data[i + 1]; // Green
        // data[i + 2] = 255;// - data[i + 2]; // Blue
        // Leave alpha channel (data[i + 3]) unchanged
      }
    
      // Put the modified image data back on the canvas
      ctx.putImageData(imageData, 0, 0);
    
      // Request the next frame
      requestAnimationFrame(processFrame);
    }
    
     });
    
    