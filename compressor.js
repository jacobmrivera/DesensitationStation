// const playButton = document.getElementById("play-button");

// document.addEventListener('DOMContentLoaded', function () {

//     const videoPlayer = document.getElementById('inputVideo');
//     const filterTypeSelector = document.getElementById('filterType');
//     const thresholdSlider = document.getElementById('threshold');
//     const playButton = document.getElementById('play-button');
//     const pauseButton = document.getElementById('pause-button');
    
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const source = audioContext.createMediaElementSource(videoPlayer);
//     let filter = null;

//     // Create a compressor with adjustable threshold.
//     const compressor = audioContext.createDynamicsCompressor();
//     source.connect(compressor);
//     compressor.connect(audioContext.destination);

//     filterTypeSelector.addEventListener('change', () => {
//     if (filter) {
//         filter.disconnect();
//     }

//     const selectedFilter = filterTypeSelector.value;

//     if (selectedFilter !== 'none') {
//         filter = audioContext.createBiquadFilter();
//         filter.type = selectedFilter;
//         filter.frequency.value = 1000;
//         filter.Q.value = 1;

//         source.disconnect();
//         source.connect(filter);
//         filter.connect(compressor);
//     } else {
//         filter = null;
//         source.disconnect();
//         source.connect(compressor);
//     }
//     });

//     // Update compressor threshold with slider value.
//     thresholdSlider.addEventListener('input', () => {
//     compressor.threshold.value = parseFloat(thresholdSlider.value);
//     });


//     playButton.addEventListener('click', () => {
//         videoPlayer.play();
//     });

//     pauseButton.addEventListener('click', () => {
//         videoPlayer.pause();
//     });

// });


document.addEventListener('DOMContentLoaded', function () {
    const videoPlayer = document.getElementById('inputVideo');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const filterTypeSelector = document.getElementById('filterType');
    const thresholdSlider = document.getElementById('threshold');

    let audioContext;  // Declare audioContext here

    // Create the audioContext in response to a user gesture (play button click)
    playButton.addEventListener('click', function () {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            source = audioContext.createMediaElementSource(videoPlayer);

        }

        let filter = null;

        const compressor = audioContext.createDynamicsCompressor();
        source.connect(compressor);
        compressor.connect(audioContext.destination);

        filterTypeSelector.addEventListener('change', () => {
            if (filter) {
                filter.disconnect();
            }

            const selectedFilter = filterTypeSelector.value;

            if (selectedFilter !== 'none') {
                filter = audioContext.createBiquadFilter();
                filter.type = selectedFilter;
                filter.frequency.value = 1000;
                filter.Q.value = 1;

                source.disconnect();
                source.connect(filter);
                filter.connect(compressor);
            } else {
                filter = null;
                source.disconnect();
                source.connect(compressor);
            }
        });

        thresholdSlider.addEventListener('input', () => {
            compressor.threshold.value = parseFloat(thresholdSlider.value);
        });
    });

    playButton.addEventListener('click', () => {
        videoPlayer.play();
    });

    pauseButton.addEventListener('click', () => {
        videoPlayer.pause();
    });
});

