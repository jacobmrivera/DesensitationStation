// export var filter_num = -1;

import { extractFrame, displayFrame } from './frames.js';

let frameCount = 0;
let flashingFrameCount = 0;
let lastValidFrame = null;

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('inputVideo');
    const canvas = document.getElementById('outputCanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    const saturationSlider = document.getElementById('saturationSlider');
    const saturationValue = document.getElementById('saturationValue');
    const rednessSlider = document.getElementById('rednessSlider');
    const rednessValue = document.getElementById('rednessValue');
    const bluenessSlider = document.getElementById('bluenessSlider');
    const bluenessValue = document.getElementById('bluenessValue');
    const greennessSlider = document.getElementById('greennessSlider');
    const greennessValue = document.getElementById('greennessValue');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const brightnessValue = document.getElementById('brightnessValue');

    const redButton = document.getElementById('pro');
    const greenButton = document.getElementById("deu");
    const blueButton = document.getElementById("tri");

    


    if (!gl) {
        console.error('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    let originalSaturation = 1.0;
    let originalRedness = 1.0;
    let originalGreenness = 1.0;
    let originalBlueness = 1.0;
    let originalBrightness = 1.0;
    let flash_detected = 1;

    const vertexShaderSource = `
        attribute vec2 a_position;
        varying vec2 v_texcoord;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texcoord = a_position * 0.5 + 0.5;
            v_texcoord.y = 1.0 - v_texcoord.y;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        varying vec2 v_texcoord;
        uniform sampler2D u_texture;
        uniform float u_saturation;
        uniform float u_redness;
        uniform float u_blueness;
        uniform float u_greenness;
        uniform float u_brightness;
        uniform int u_flashDetected;

        void main() {
            vec4 color = texture2D(u_texture, v_texcoord);

            float average = (color.r + color.g + color.b) / 3.0;
            // Apply saturation
            color.rgb = mix(vec3(average), color.rgb, u_saturation);

            // Apply redness
            color.r = mix(average, color.r, u_redness);

            // Apply blueness
            color.b = mix(average, color.b, u_blueness);

            // Apply greenness
            color.g = mix(average, color.g, u_greenness);

            // Apply brightness
            color.rgb *= u_brightness;

            gl_FragColor = color;
        }
    `;

    function compileShader(source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    function createProgram(vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }

        return program;
    }

    function initShaderProgram() {
        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

        return createProgram(vertexShader, fragmentShader);
    }

    const shaderProgram = initShaderProgram();
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.useProgram(shaderProgram);

    const uTextureLocation = gl.getUniformLocation(shaderProgram, 'u_texture');
    const uSaturationLocation = gl.getUniformLocation(shaderProgram, 'u_saturation');
    const uRednessLocation = gl.getUniformLocation(shaderProgram, 'u_redness');
    const uBluenessLocation = gl.getUniformLocation(shaderProgram, 'u_blueness');
    const uGreennessLocation = gl.getUniformLocation(shaderProgram, 'u_greenness');
    const uBrightnessLocation = gl.getUniformLocation(shaderProgram, 'u_brightness');
    const uFlashDetected = gl.getUniformLocation(shaderProgram, 'u_flashDetected');

    gl.uniform1i(uTextureLocation, 0);
    gl.uniform1f(uSaturationLocation, originalSaturation);
    gl.uniform1f(uRednessLocation, originalRedness);
    gl.uniform1f(uBluenessLocation, originalBlueness);
    gl.uniform1f(uGreennessLocation, originalGreenness);
    gl.uniform1f(uBrightnessLocation, originalBrightness);

    let showFrame = false;
    let frameToDisplay = null;
    let frameDisplayCount = 0;
    let showAlternateFrame = true;

    function toggleFrameDisplay(frame) {
        showFrame = true;
        frameToDisplay = frame;
        frameDisplayCount = 0;
    }

    function render() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        if (!video.paused){
            frameCount+=1;

        }

        if (document.getElementById('toggle').checked && document.getElementById('flash_detected').textContent == 1) {
            if (showAlternateFrame && frameCount % 25 != 0) {
                flashingFrameCount +=1;

                requestAnimationFrame(render);
                let flashingPercentage = frameCount !== 0 ? (flashingFrameCount / frameCount) * 100 : 0;
                // console.log("Flashing percentage: " + flashingPercentage);
                const flashingPercentageElement = document.getElementById('flashingPercentage');
                flashingPercentageElement.textContent = `${flashingPercentage.toFixed(2)}%`;
                return;
            }
        }
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

        gl.uniform1f(uSaturationLocation, originalSaturation);
        gl.uniform1f(uRednessLocation, originalRedness);
        gl.uniform1f(uBluenessLocation, originalBlueness);
        gl.uniform1f(uGreennessLocation, originalGreenness);
        gl.uniform1f(uBrightnessLocation, originalBrightness);

        gl.uniform1i(uFlashDetected, flash_detected);


        //     if (showAlternateFrame ) {
        //         toggleFrameDisplay(video);
        //         gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        //         // Update canvas size to match the captured frame
        //         canvas.width = frameToDisplay.videoWidth;
        //         canvas.height = frameToDisplay.videoHeight;
    
        //         // Bind the captured frame as the texture data
        //         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, frameToDisplay);
    
        //         // Render the captured frame every other frame
        //         if (frameDisplayCount % 2 === 0) {
        //             gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        //         } else {
        //             // Bind the current frame for two frames
        //             gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, currentFrame);
        //             gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        //         }
        //         frameDisplayCount++;
        //     } else {
        //         showAlternateFrame = false; // Reset frame display
        //     }
        // } else {
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // }



        // if(!video.paused)
        //     frameCount++;
    
        requestAnimationFrame(render);

        let flashingPercentage = frameCount !== 0 ? (flashingFrameCount / frameCount) * 100 : 0;
        // console.log("Flashing percentage: " + flashingPercentage);
        const flashingPercentageElement = document.getElementById('flashingPercentage');
        flashingPercentageElement.textContent = `${flashingPercentage.toFixed(2)}%`;
    }

    saturationSlider.addEventListener('input', function() {
        originalSaturation = this.value / 100;
        saturationValue.innerText = `${Math.ceil(originalSaturation * 100)}%`;
    });

    rednessSlider.addEventListener('input', function() {
        originalRedness = this.value / 100;
        rednessValue.innerText = `${Math.ceil(originalRedness * 100)}%`;
    });

    bluenessSlider.addEventListener('input', function() {
        originalBlueness = this.value / 100;
        bluenessValue.innerText = `${Math.ceil(originalBlueness * 100)}%`;
    });

    greennessSlider.addEventListener('input', function() {
        originalGreenness = this.value / 100;
        greennessValue.innerText = `${Math.ceil(originalGreenness * 100)}%`;
    });

    brightnessSlider.addEventListener('input', function() {
        originalBrightness = this.value / 100;
        brightnessValue.innerText = `${Math.ceil(originalBrightness * 100)}%`;
    });

    redButton.addEventListener('click', function() {
        originalRedness = rednessSlider.value / 100;
        rednessValue.innerText = "0%";
        originalBlueness = bluenessSlider.value / 100;
        bluenessValue.innerText = "100%";
        originalGreenness = greennessSlider.value / 100;
        greennessValue.innerText = "100%";
    });

    blueButton.addEventListener('click', function() {
        originalRedness = rednessSlider.value / 100;
        rednessValue.innerText = "100%";
        originalBlueness = bluenessSlider.value / 100;
        bluenessValue.innerText = "0%";
        originalGreenness = greennessSlider.value / 100;
        greennessValue.innerText = "100%";
    });

    greenButton.addEventListener('click', function() {
        originalRedness = rednessSlider.value / 100;
        rednessValue.innerText = "100%";
        originalGreenness = greennessSlider.value / 100;
        greennessValue.innerText = "0%";
        originalBlueness = bluenessSlider.value / 100;
        bluenessValue.innerText = "100%";
    });

    document.getElementById("flash_detected").addEventListener('input', function() {
        flash_detected = document.getElementById("flash_detected").textContent;
        console.log(flash_detected);
    });

    video.addEventListener('loadedmetadata', function() {
        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;

        render();
    });

    // Path to source video
    // video.src = 'mickey.mp4';

    const videoInput = document.getElementById('videoForm');
    // const selectedVideo = document.getElementById('inputVideo');
    
    videoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const videoURL = URL.createObjectURL(file);
    
        video.src = videoURL;
        video.load(); // Load the selected video
      });

});
