/**
 * ====================================================================
 * OUR LITTLE LOVE STORY ❤️ — AUDIO CONTROLLER & SYNTHESIZER
 * ====================================================================
 */

class AudioController {
  constructor() {
    this.audioCtx = null;
    this.isPlayingMusic = false;
    this.isMuted = false;
    this.volume = 0.5;
    
    // Synth notes for romantic ambient background
    this.synthInterval = null;
    this.activeVoiceNoteId = null;
    this.voiceAudioElement = null;
  }

  initWebAudio() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleBackgroundMusic() {
    this.initWebAudio();

    if (this.isPlayingMusic) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
  }

  startBackgroundMusic() {
    this.initWebAudio();
    this.isPlayingMusic = true;
    this.updateWidgetUI();

    // Check if custom bg audio path is provided in config or fallback to Web Audio Synth
    const customBg = window.loveStoryConfig && window.loveStoryConfig.bgMusicUrl;
    const startTime = (window.loveStoryConfig && typeof window.loveStoryConfig.bgMusicStartTime === 'number') 
      ? window.loveStoryConfig.bgMusicStartTime 
      : 10;

    if (customBg) {
      if (!this.bgAudioElem) {
        this.bgAudioElem = new Audio(customBg);
        this.bgAudioElem.currentTime = startTime;
        
        // Ensure loop starts back from the specified start time
        this.bgAudioElem.addEventListener('ended', () => {
          this.bgAudioElem.currentTime = startTime;
          this.bgAudioElem.play().catch(e => console.log('Bg audio error', e));
        });
      } else if (this.bgAudioElem.paused && (this.bgAudioElem.currentTime < startTime || this.bgAudioElem.ended)) {
        this.bgAudioElem.currentTime = startTime;
      }
      
      this.bgAudioElem.volume = this.isMuted ? 0 : this.volume;
      this.bgAudioElem.play().catch(e => console.log('Bg audio error', e));
      return;
    }

    // Synthesize gentle romantic ambient chords using Web Audio API
    if (!this.audioCtx) return;

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlayingMusic || this.isMuted) return;

      const currentChord = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;

      currentChord.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.isPlayingMusic || !this.audioCtx) return;

          try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            // Soft attack and decay curve
            const now = this.audioCtx.currentTime;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.08 * this.volume, now + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(now);
            osc.stop(now + 3.8);
          } catch (e) {
            // Audio ctx error fallback
          }
        }, idx * 300);
      });
    };

    playChord();
    this.synthInterval = setInterval(playChord, 4500);
  }

  stopBackgroundMusic() {
    this.isPlayingMusic = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.bgAudioElem) {
      this.bgAudioElem.pause();
    }
    this.updateWidgetUI();
  }

  setVolume(val) {
    this.volume = parseFloat(val);
    if (this.bgAudioElem) {
      this.bgAudioElem.volume = this.isMuted ? 0 : this.volume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgAudioElem) {
      this.bgAudioElem.volume = this.isMuted ? 0 : this.volume;
    }
    this.updateWidgetUI();
  }

  updateWidgetUI() {
    const btn = document.getElementById('musicToggleBtn');
    const icon = document.getElementById('musicIcon');
    const label = document.getElementById('musicLabel');

    if (!btn || !icon || !label) return;

    if (this.isPlayingMusic && !this.isMuted) {
      btn.classList.add('bg-pink-100', 'text-pink-600');
      icon.innerHTML = `<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`;
      label.textContent = "Music: Playing 🎵";
    } else {
      btn.classList.remove('bg-pink-100', 'text-pink-600');
      icon.innerHTML = `<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v9"></path><circle cx="6" cy="18" r="3"></circle><path d="M12 6.5L19 5v6.5"></path>`;
      label.textContent = "Music: Paused 🔇";
    }
  }

  // Voice Note player logic
  playVoiceNote(id, customUrl, containerElem) {
    this.initWebAudio();

    if (this.activeVoiceNoteId === id) {
      // Pause
      this.stopVoiceNote();
      return;
    }

    this.stopVoiceNote();
    this.activeVoiceNoteId = id;

    if (containerElem) {
      containerElem.classList.add('waveform-playing');
      const btn = containerElem.querySelector('.vn-play-btn');
      if (btn) btn.innerHTML = '⏸️';

      // Spawn floating hearts during voice note play
      const heartInterval = setInterval(() => {
        if (this.activeVoiceNoteId !== id) {
          clearInterval(heartInterval);
          return;
        }
        const heart = document.createElement('div');
        heart.className = 'mini-floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = (Math.random() * 80 + 10) + '%';
        heart.style.bottom = '10px';
        containerElem.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
      }, 400);
    }

    if (customUrl) {
      this.voiceAudioElement = new Audio(customUrl);
      this.voiceAudioElement.play();
      this.voiceAudioElement.onended = () => this.stopVoiceNote();
    } else {
      // Synthesize cute melody for voice note demo
      this.playVoiceNoteSynth(() => this.stopVoiceNote());
    }
  }

  stopVoiceNote() {
    this.activeVoiceNoteId = null;
    if (this.voiceAudioElement) {
      this.voiceAudioElement.pause();
      this.voiceAudioElement = null;
    }
    document.querySelectorAll('.waveform-playing').forEach(el => {
      el.classList.remove('waveform-playing');
      const btn = el.querySelector('.vn-play-btn');
      if (btn) btn.innerHTML = '▶️';
    });
  }

  playVoiceNoteSynth(onEnded) {
    if (!this.audioCtx) {
      setTimeout(onEnded, 3000);
      return;
    }

    const notes = [330, 392, 440, 523, 587, 659];
    let step = 0;
    const interval = setInterval(() => {
      if (!this.activeVoiceNoteId) {
        clearInterval(interval);
        return;
      }

      if (step >= notes.length * 2) {
        clearInterval(interval);
        if (onEnded) onEnded();
        return;
      }

      const note = notes[step % notes.length];
      step++;

      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, this.audioCtx.currentTime);

        const now = this.audioCtx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      } catch (e) {}
    }, 450);
  }
}

if (typeof window !== 'undefined') {
  window.audioController = new AudioController();
}
