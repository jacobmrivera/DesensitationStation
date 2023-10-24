
document.addEventListener('DOMContentLoaded', function () {

    const videoPlayer = document.getElementById('inputVideo');
    const filterTypeSelector = document.getElementById('filterType');
    const thresholdSlider = document.getElementById('threshold');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(videoPlayer);
    let filter = null;

    // Create a compressor with adjustable threshold.
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

    // Update compressor threshold with slider value.
    thresholdSlider.addEventListener('input', () => {
    compressor.threshold.value = parseFloat(thresholdSlider.value);
    });

});