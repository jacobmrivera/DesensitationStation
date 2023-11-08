
window.addEventListener("DOMContentLoaded", (event) => {




    // Get references to the slider and the colored div
    const videoPlayer = document.getElementById('videoPlayer');

    const brightnessSlider = document.getElementById('brightnessSlider');
    const brightnessValue = document.getElementById('brightnessValue');

    const saturationSlider = document.getElementById('saturationSlider');
    const saturationValue = document.getElementById('saturationValue');

    const rednessSlider = document.getElementById('rednessSlider');
    const rednessValue = document.getElementById('rednessValue');

    const greennessSlider = document.getElementById('greennessSlider');
    const greennessValue = document.getElementById('greennessValue');

    const bluenessSlider = document.getElementById('bluenessSlider');
    const bluenessValue = document.getElementById('bluenessValue');


    // Add an event listener to the brightnessSlider to detect value changes
    brightnessSlider.addEventListener('input', function() {
        // Get the current value of the brightnessSlider
        const sliderValue = brightnessSlider.value;

        // Update the CSS property of the element to adjust based on the slider value
        videoPlayer.style.filter = `brightness(${sliderValue}%)`;

        // Update the displayed brightness value
        brightnessValue.textContent = `${sliderValue}%`;
    });


    // Add an event listener to the saturationSlider to detect value changes
    saturationSlider.addEventListener('input', function() {
        // Get the current value of the saturationSlider
        const sliderValue = saturationSlider.value;

        // Update the CSS property of the element to adjust based on the slider value
        videoPlayer.style.filter = `saturate(${sliderValue}%)`;

        // Update the displayed brightness value
        saturationValue.textContent = `${sliderValue}%`;
    });

    // Add an event listener to the saturationSlider to detect value changes
    rednessSlider.addEventListener('input', function() {
        // Get the current value of the saturationSlider
        const sliderValue = rednessSlider.value;


        // Update the CSS property of the element to adjust based on the slider value
        videoPlayer.style.background = `saturate(${sliderValue}%)`;

        // Update the displayed brightness value
        saturationValue.textContent = `${sliderValue}%`;
    });


    // // Add an event listener to the saturationSlider to detect value changes
    // rednessSlider.addEventListener('input', function() {
    //     // Get the current value of the saturationSlider
    //     const sliderValue = rednessSlider.value;

    //     // Convert the slider value to an angle for hue-rotate filter
    //     // Map the slider range (0-200) to the hue-rotate angle (-180deg to 180deg)
    //     const angle = (sliderValue - 100) * 1.8; // Adjust the multiplier as needed

    //     // Update the displayed brightness value
    //     rednessValue.textContent = `${sliderValue}%`;

    //         // Update the CSS filter property of the video to change the red channel
    //     videoPlayer.style.filter = `hue-rotate(${angle}deg)`;
    // });


    // Add an event listener to the redSlider to detect value changes
    rednessSlider.addEventListener('input', function() {
        // Get the computed styles of the videoPlayer element
        const computedStyles = getComputedStyle(videoPlayer);

        // Extract the RGB color channel values
        const backgroundColor = computedStyles.backgroundColor; // Get the background color
        const [, red, green, blue] = backgroundColor.match(/\d+/g); // Extract the R, G, and B values

        console.log(`Red: ${red}, Green: ${green}, Blue: ${blue}`);


        // Apply the new RGB color to the video
        // videoPlayer.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    });


    function mapSliderValue(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      }

      rednessSlider.addEventListener('input', function() {
        if (!videoPlayer.paused) {
          const sliderValue = rednessSlider.value;
          const hueValue = mapSliderValue(sliderValue, 0, 100, -60, 60);
          const hueRotateValue = `hue-rotate(${hueValue}deg)`;
          videoPlayer.style.filter = `${hueRotateValue}`;
        }
      });

    //   hueSlider.addEventListener('input', function() {
    //     if (video.paused) {
    //       const sliderValue = hueSlider.value;
    //       const hueValue = mapSliderValue(sliderValue, 0, 100, -60, 60);
    //       const hueRotateValue = `hue-rotate(${hueValue}deg)`;

    //       video.style.filter = hueRotateValue;
    //     }
    //   });



    bluenessSlider.addEventListener('input', function() {
        if (!videoPlayer.paused) {
          const sliderValue = bluenessSlider.value;
          const hueValue = mapSliderValue(sliderValue, 0, 100, -180, 0);
          const hueRotateValue = `hue-rotate(${hueValue}deg)`;

          videoPlayer.style.filter = `${hueRotateValue}`;
        }
      });
      
    //   blueSlider.addEventListener('input', function() {
    //     if (videoPlayer.paused) {
    //       const sliderValue = blueSlider.value;
    //       const hueValue = mapSliderValue(sliderValue, 0, 100, -60, 60);
    //       const hueRotateValue = `hue-rotate(0deg)`;
      
    //       video.style.filter = `${hueRotateValue}`;
    //     }
    //   });


    // const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    videoPlayer.addEventListener('input', function() {
        canvas.width = videoPlayer.width;
        canvas.height = videoPlayer.height;
        drawVideo();
    });

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

});