window.onload = function() {

	var audioNode = document.querySelector('audio');
	var audioContext = new AudioContext();
	var compressor = audioContext.createDynamicsCompressor();
	compressor.connect(audioContext.destination);
	var mediaElementSource = audioContext.createMediaElementSource(audioNode);
	mediaElementSource.connect(compressor);

	var reduction = document.getElementById('reduction');

	requestAnimationFrame(render);

	function render(t) {
		requestAnimationFrame(render);

		reduction.value = compressor.reduction;
	}
};
