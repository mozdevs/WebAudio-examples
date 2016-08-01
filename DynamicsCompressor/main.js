window.onload = function() {

	var audioNode = document.querySelector('audio');
	var audioContext = new AudioContext();
	var compressor = audioContext.createDynamicsCompressor();
	compressor.connect(audioContext.destination);
	var mediaElementSource = audioContext.createMediaElementSource(audioNode);
	mediaElementSource.connect(compressor);

	var reduction = document.getElementById('reduction');
	var getReductionValue = makeReductionFunction();

	requestAnimationFrame(render);

	function render(t) {
		requestAnimationFrame(render);
		reduction.value = getReductionValue(compressor);
	}

	// A recent Web Audio API has changed the type of reduction from AudioParam to float
	// This function generates a function that can be used to obtain the reduction value
	// from any compressor
	function makeReductionFunction() {
		// Create temporary audio context and compressor to check for properties
		var ac = new AudioContext();
		var co = ac.createDynamicsCompressor();
		if(co.reduction.value !== undefined) {
			console.log('old school');
			return function(compressor) {
				return compressor.reduction.value;
			}
		} else {
			return function(compressor) {
				return compressor.reduction;
			}
		}
	}
};
