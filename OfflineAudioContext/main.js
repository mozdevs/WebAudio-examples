window.onload = function() {
	var sampleRate = 44100;
	var clipLength = sampleRate * 60; // 1 minute = 60 seconds
	var oac = new OfflineAudioContext(1, clipLength, sampleRate);

	var spanNumSamples = document.getElementById('numSamples');
	spanNumSamples.innerHTML = oac.length;

	
};
