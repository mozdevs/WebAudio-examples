window.onload = function() {
	var sampleRate = 22050;
	var duration = 0.5; // minutes
	var clipLength = sampleRate * duration; // 1 minute per sampleRate samples
	var oac = new OfflineAudioContext(1, clipLength, sampleRate);

	var canvas = document.querySelector('canvas');
	var dpi = window.devicePixelRatio;
	canvas.style.width = (canvas.width / dpi) + 'px';
	canvas.style.height = (canvas.height / dpi) + 'px';

	var spanNumSamples = document.getElementById('numSamples');
	spanNumSamples.innerHTML = oac.length;

	var spanNumSeconds = document.getElementById('numSeconds');
	
	// Since both AudioContext and OfflineAudioContext extend the same base class,
	// you can create nodes using the same methods!
	var gain = oac.createGain();
	var oscillator = oac.createOscillator();

	var now = oac.currentTime;

	// I'm using the new syntax to chain multiple connect calls and build these chains fast
	oscillator.connect(gain).connect(oac.destination);

	var attackTime = 0.1 * duration;
	var decayTime = 0.2 * duration;

	// Setting up some envelopes for the gain
	gain.gain.setValueAtTime(0, now);
	gain.gain.linearRampToValueAtTime(1, now + attackTime);
	gain.gain.linearRampToValueAtTime(0.5, now + attackTime + decayTime);
	gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

	// And for the oscillator frequency
	oscillator.frequency.setValueAtTime(250, now);
	oscillator.frequency.linearRampToValueAtTime(1, now + duration);
	
	// And get the oscillator to play so we can see some rendered sound!
	oscillator.start(now);
	
	var t0 = performance.now();

	oac.startRendering().then((audioBuffer) => {
		var t1 = performance.now();
		var diff = t1 - t0;
		numSeconds.innerHTML = (diff / 1000).toFixed(2);

		var data = [];
		var channelData = audioBuffer.getChannelData(0);

		console.log(channelData.length);
		for(var i = 0; i < channelData.length; i++) {
			data.push(channelData[i]);
		}

		RenderWave(canvas, data);

	});

};
