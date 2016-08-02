window.onload = function() {

	var createBtn = document.getElementById('create');
	var suspendBtn = document.getElementById('suspend');
	var resumeBtn = document.getElementById('resume');
	var closeBtn = document.getElementById('close');
	var audioContext;

	createBtn.addEventListener('click', createContext);
	suspendBtn.addEventListener('click', suspendContext);
	resumeBtn.addEventListener('click', resumeContext);
	closeBtn.addEventListener('click', closeContext);
	
	enableButtons(createBtn);
	disableButtons(suspendBtn, resumeBtn, closeBtn);

	function createContext() {
		audioContext = new AudioContext();

		var oscillator = audioContext.createOscillator();
		oscillator.frequency.value = 220;
		var gain = audioContext.createGain();
		gain.gain.value = 0.25;

		oscillator.connect(gain);
		gain.connect(audioContext.destination);

		var lfo = audioContext.createOscillator();
		lfo.frequency.value = 0.5;
		var lfoGain = audioContext.createGain();
		lfoGain.gain.value = 100;
		lfo.connect(lfoGain);
		lfoGain.connect(oscillator.frequency);

		lfo.start();
		oscillator.start();

		disableButtons(createBtn, resumeBtn);
		enableButtons(suspendBtn, closeBtn);

	}

	function suspendContext() {
		audioContext.suspend();

		disableButtons(suspendBtn);
		enableButtons(createBtn, resumeBtn, closeBtn);
	}

	function resumeContext() {
		audioContext.resume();

		disableButtons(resumeBtn, createBtn);
		enableButtons(suspendBtn, closeBtn);
	}

	function closeContext() {
		audioContext.close();

		disableButtons(suspendBtn, resumeBtn, closeBtn);
		enableButtons(createBtn);
	}

	function enableButtons() {
		setMultipleStatus(arguments, true);
	}

	function disableButtons() {
		setMultipleStatus(arguments, false);
	}

	function setMultipleStatus(items, enabled) {
		Array.from(items).forEach((b) => b.disabled = !enabled);
	}
};
