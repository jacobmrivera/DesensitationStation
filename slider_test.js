document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('inputVideo');
    const canvas2 = document.getElementById('outputCanvas');
    console.log(canvas);
    const ctx = canvas2.getContext('2d');

    const rednessSlider = document.getElementById('rednessSlider');
    // const rednessValue = document.getElementById('rednessValue');

    const greennessSlider = document.getElementById('greennessSlider');
    // const greennessValue = document.getElementById('greennessValue');

    const bluenessSlider = document.getElementById('bluenessSlider');
    // const bluenessValue = document.getElementById('bluenessValue');

    // Listen for the 'timeupdate' event to draw video frames
    video.addEventListener('timeupdate', drawFrame);

    // Function to draw the current video frame on the canvas
    function drawFrame() {
        ctx.drawImage(video, 0, 0, canvas2.width, canvas2.height);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas2.width, canvas2.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Red channel is at index i (0, 4, 8, ...)
        data[i] = Math.ceil(data[i] * rednessSlider.value/100); // Set red channel value
        data[i+1] = Math.ceil(data[i+1] * greennessSlider.value/100); // Set red channel value
        data[i+2] = Math.ceil(data[i+2] * bluenessSlider.value/100); // Set red channel value
    }

      ctx.putImageData(imageData, 0, 0);
    }

});