/**
 * ====================================================================
 * OUR LITTLE LOVE STORY ❤️ — DYNAMIC INTERACTIVE COMPONENTS
 * ====================================================================
 */

class LoveStoryApp {
  constructor() {
    this.config = window.loveStoryConfig || {};
    this.typewriterStarted = false;
    this.buildUpStep = 0;
  }

  init() {
    this.injectConfigData();
    this.setupLandingEnvelope();
    this.setupPhotoGallery();
    this.setupWhyYouCards();
    this.setupTimeline();
    this.setupMiniGame();
    this.setupFutureDreams();
    this.setupBuildUp();
    this.setupProposalSection();
    this.setupFinalLetter();
    this.setupSecretSurprise();
    this.setupQRCodeGenerator();
    this.setupScrollAnimations();

    // Start background particles
    if (window.particlesEngine) {
      window.particlesEngine.initHeartsAndStars('heartsCanvas');
      window.particlesEngine.initRosePetals('proposalPetalsCanvas');
    }

    // Lucide Icons initialization
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  injectConfigData() {
    // Inject names in headers, letter, etc.
    document.querySelectorAll('.girl-name').forEach(el => el.textContent = this.config.girlName);
    document.querySelectorAll('.boy-name').forEach(el => el.textContent = this.config.boyName);
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = this.config.storyTitle;
  }

  // 1. Landing Screen & Envelope
  setupLandingEnvelope() {
    const openBtn = document.getElementById('openHeartBtn');
    const envelope = document.getElementById('landingEnvelope');

    const handleOpen = () => {
      if (envelope) envelope.classList.add('open');
      
      // Start audio synth on first explicit user click
      if (window.audioController) {
        window.audioController.startBackgroundMusic();
      }

      // Sparkles and heart explosion
      if (window.particlesEngine) {
        window.particlesEngine.triggerFireworksAndConfetti();
      }

      setTimeout(() => {
        const nextSec = document.getElementById('personalMessageSection');
        if (nextSec) {
          nextSec.scrollIntoView({ behavior: 'smooth' });
          this.startTypewriter();
        }
      }, 1200);
    };

    if (openBtn) openBtn.addEventListener('click', handleOpen);
    if (envelope) envelope.addEventListener('click', handleOpen);
  }

  // 2. Personal Message Typewriter
  startTypewriter() {
    if (this.typewriterStarted) return;
    this.typewriterStarted = true;

    const el = document.getElementById('typewriterText');
    if (!el) return;

    const text = this.config.personalMessage ? this.config.personalMessage.mainText : "";
    el.innerHTML = "";
    el.classList.add('typewriter-cursor');

    let i = 0;
    const speed = 35; // ms per character

    const type = () => {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => el.classList.remove('typewriter-cursor'), 1500);
      }
    };

    type();
  }

  // 3. Photo Gallery & Lightbox Modal
  setupPhotoGallery() {
    const grid = document.getElementById('photoGalleryGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const photos = this.config.photos || [];

    const rotations = [-2, 3, -4, 2, -3, 4];

    photos.forEach((photo, idx) => {
      const card = document.createElement('div');
      const rot = rotations[idx % rotations.length];
      card.className = 'polaroid-card group';
      card.style.transform = `rotate(${rot}deg)`;
      
      card.innerHTML = `
        <div class="overflow-hidden rounded bg-pink-50 aspect-4/3 relative">
          <img src="${photo.src}" alt="${photo.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div class="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full text-xs text-pink-600 shadow font-medium">
            ❤️
          </div>
        </div>
        <div class="mt-3 text-center">
          <h4 class="font-handwriting text-2xl text-burgundy">${photo.title}</h4>
          <p class="text-xs text-gray-500 mt-1 font-body">${photo.date}</p>
        </div>
      `;

      card.addEventListener('click', () => this.openPhotoModal(photo));
      grid.appendChild(card);
    });
  }

  openPhotoModal(photo) {
    const modal = document.getElementById('photoModal');
    const img = document.getElementById('modalPhotoImg');
    const title = document.getElementById('modalPhotoTitle');
    const caption = document.getElementById('modalPhotoCaption');
    const date = document.getElementById('modalPhotoDate');

    if (img) img.src = photo.src;
    if (title) title.textContent = photo.title;
    if (caption) caption.textContent = photo.caption;
    if (date) date.textContent = photo.date;

    if (modal) modal.classList.add('active');

    // Trigger mini heart float inside modal
    if (window.particlesEngine) {
      window.particlesEngine.triggerFireworksAndConfetti();
    }
  }

  // 5. Why You? Cards
  setupWhyYouCards() {
    const grid = document.getElementById('whyYouGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const reasons = this.config.reasons || [];

    reasons.forEach((r) => {
      const card = document.createElement('div');
      card.className = 'glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-pink-100 flex flex-col justify-between group';
      
      card.innerHTML = `
        <div>
          <div class="w-12 h-12 rounded-full bg-pink-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span class="text-2xl font-bold">❤️</span>
          </div>
          <h4 class="font-semibold text-xl text-gray-800">${r.title}</h4>
          <p class="text-sm text-gray-600 mt-2">${r.shortText}</p>
        </div>
        <div class="mt-4 pt-4 border-t border-pink-100 flex items-center justify-between text-xs font-semibold text-rose-500">
          <span>Click to read why</span>
          <span>✨</span>
        </div>
      `;

      card.addEventListener('click', () => this.openReasonModal(r));
      grid.appendChild(card);
    });
  }

  openReasonModal(reason) {
    const modal = document.getElementById('reasonModal');
    const title = document.getElementById('modalReasonTitle');
    const desc = document.getElementById('modalReasonMessage');

    if (title) title.textContent = reason.title;
    if (desc) desc.textContent = reason.expandedMessage;

    if (modal) modal.classList.add('active');
  }

  // 6. Interactive Love Timeline
  setupTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    container.innerHTML = '';
    const timeline = this.config.timeline || [];

    timeline.forEach((item, idx) => {
      const isEven = idx % 2 === 0;
      const el = document.createElement('div');
      el.className = `relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group my-8`;

      el.innerHTML = `
        <!-- Timeline Icon Marker -->
        <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-rose-500 text-white shadow font-bold text-sm shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          ${idx + 1}
        </div>
        
        <!-- Content Card -->
        <div class="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl shadow-md border border-pink-100 transition-all hover:shadow-xl">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-600">${item.date}</span>
            <span class="text-xs text-gray-400 font-medium">${item.badge}</span>
          </div>
          <h4 class="font-handwriting text-2xl text-burgundy">${item.title}</h4>
          <p class="text-sm text-gray-600 mt-2">${item.description}</p>
          ${item.image ? `<img src="${item.image}" alt="${item.title}" class="mt-4 rounded-lg w-full h-36 object-cover shadow-sm" />` : ''}
        </div>
      `;

      container.appendChild(el);
    });
  }

  // 7. Cute Interactive Mini-Game (Runaway NO button!)
  setupMiniGame() {
    const noBtn = document.getElementById('gameNoBtn');
    const yesBtn = document.getElementById('gameYesBtn');
    const resultBox = document.getElementById('gameResult');

    if (!noBtn || !yesBtn) return;

    let dodgeCount = 0;

    // Runaway dodging physics on mouse enter / hover
    const dodge = (e) => {
      dodgeCount++;
      const padding = 100;
      const maxX = window.innerWidth - noBtn.offsetWidth - padding;
      const maxY = window.innerHeight - noBtn.offsetHeight - padding;

      const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
      const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

      noBtn.style.position = 'fixed';
      noBtn.style.left = `${randomX}px`;
      noBtn.style.top = `${randomY}px`;
      noBtn.style.zIndex = '999';

      // Grow YES button to make it increasingly attractive
      const currentScale = 1 + dodgeCount * 0.12;
      yesBtn.style.transform = `scale(${Math.min(currentScale, 1.8)})`;
      yesBtn.style.boxShadow = `0 0 ${20 + dodgeCount * 5}px rgba(255, 77, 109, 0.8)`;
    };

    noBtn.addEventListener('mouseenter', dodge);
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodge(e);
    });

    yesBtn.addEventListener('click', () => {
      if (window.particlesEngine) {
        window.particlesEngine.triggerFireworksAndConfetti();
      }

      if (resultBox) {
        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth' });
      }

      yesBtn.disabled = true;
      noBtn.style.display = 'none';

      setTimeout(() => {
        const dreamsSec = document.getElementById('futureDreamsSection');
        if (dreamsSec) dreamsSec.scrollIntoView({ behavior: 'smooth' });
      }, 2500);
    });
  }

  // 8. Future Dreams Section
  setupFutureDreams() {
    const grid = document.getElementById('dreamsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const dreams = this.config.futureDreams || [];

    dreams.forEach((d) => {
      const card = document.createElement('div');
      card.className = `p-6 rounded-2xl bg-gradient-to-br ${d.gradient} shadow-md border border-white/60 transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between`;

      card.innerHTML = `
        <div>
          <h4 class="font-semibold text-xl text-gray-800 mb-2">${d.title}</h4>
          <p class="text-sm text-gray-700 leading-relaxed">${d.description}</p>
        </div>
        <div class="mt-4 text-right text-lg">✨</div>
      `;

      grid.appendChild(card);
    });
  }

  // 9. Build-Up Transition
  setupBuildUp() {
    const container = document.getElementById('buildUpTextContainer');
    const nextBtn = document.getElementById('buildUpContinueBtn');

    if (!container || !nextBtn) return;

    const messages = this.config.buildUpMessages || [];

    nextBtn.addEventListener('click', () => {
      if (this.buildUpStep < messages.length) {
        const msg = messages[this.buildUpStep];
        const p = document.createElement('p');
        p.className = 'text-xl md:text-3xl font-handwriting text-pink-200 transition-all duration-700 animate-fade-in my-3';
        p.textContent = msg;
        container.appendChild(p);
        this.buildUpStep++;

        // Soften background music volume during build up
        if (window.audioController) {
          window.audioController.setVolume(0.25);
        }

        if (this.buildUpStep >= messages.length) {
          nextBtn.textContent = "Reveal Proposal 💍";
          nextBtn.onclick = () => {
            const proposalSec = document.getElementById('proposalSection');
            if (proposalSec) proposalSec.scrollIntoView({ behavior: 'smooth' });
          };
        }
      }
    });
  }

  // 10. THE BIG PROPOSAL 💍
  setupProposalSection() {
    const yesBtn = document.getElementById('proposalYesBtn');
    const timeBtn = document.getElementById('proposalTimeBtn');
    const yesResult = document.getElementById('proposalYesResult');
    const timeResult = document.getElementById('proposalTimeResult');

    if (!yesBtn || !timeBtn) return;

    yesBtn.addEventListener('click', () => {
      // Trigger massive celebration fireworks & confetti!
      if (window.particlesEngine) {
        window.particlesEngine.triggerFireworksAndConfetti();
        // Trigger a second burst 500ms later for dramatic effect
        setTimeout(() => window.particlesEngine.triggerFireworksAndConfetti(), 600);
      }

      if (window.audioController) {
        window.audioController.setVolume(0.8);
      }

      yesBtn.style.display = 'none';
      timeBtn.style.display = 'none';

      if (yesResult) {
        yesResult.classList.remove('hidden');
        yesResult.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        const letterSec = document.getElementById('finalLetterSection');
        if (letterSec) letterSec.scrollIntoView({ behavior: 'smooth' });
      }, 4000);
    });

    timeBtn.addEventListener('click', () => {
      yesBtn.style.display = 'none';
      timeBtn.style.display = 'none';

      if (timeResult) {
        timeResult.classList.remove('hidden');
        timeResult.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 11. Final Handwritten Letter
  setupFinalLetter() {
    const salutation = document.getElementById('letterSalutation');
    const body = document.getElementById('letterBody');

    if (salutation) {
      salutation.textContent = `${this.config.finalLetter?.salutation || 'Dear'} ${this.config.boyName},`;
    }

    if (body) {
      body.innerHTML = '';
      const paragraphs = this.config.finalLetter?.bodyParagraphs || [];
      paragraphs.forEach(p => {
        const elem = document.createElement('p');
        elem.className = 'my-4 leading-relaxed text-lg md:text-xl font-handwriting text-burgundy';
        elem.textContent = p;
        body.appendChild(elem);
      });

      const sign = document.createElement('div');
      sign.className = 'text-right font-handwriting text-2xl md:text-3xl text-rose-600 mt-6';
      sign.textContent = `— ${this.config.girlName} ❤️`;
      body.appendChild(sign);
    }
  }

  // 12. Final Secret Surprise & QR Code Modal
  setupSecretSurprise() {
    const surpriseBtn = document.getElementById('secretSurpriseBtn');
    const modal = document.getElementById('surpriseModal');

    if (!surpriseBtn || !modal) return;

    surpriseBtn.addEventListener('click', () => {
      if (window.particlesEngine) {
        window.particlesEngine.triggerFireworksAndConfetti();
      }
      modal.classList.add('active');
    });
  }

  setupQRCodeGenerator() {
    const qrBtn = document.getElementById('showQrBtn');
    const modal = document.getElementById('qrModal');
    const qrContainer = document.getElementById('qrCodeCanvas');

    if (!qrBtn || !modal || !qrContainer) return;

    qrBtn.addEventListener('click', () => {
      modal.classList.add('active');
      qrContainer.innerHTML = '';

      // Generate QR Code using QuickChart QR API or dynamic Canvas
      const pageUrl = window.location.href;
      const qrImg = document.createElement('img');
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pageUrl)}&color=800020&bgcolor=FFFDF9`;
      qrImg.alt = "Scan to view on phone";
      qrImg.className = "rounded-xl border-4 border-pink-200 shadow-md mx-auto";

      qrContainer.appendChild(qrImg);
    });
  }

  // Scroll animations for smooth entry
  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          if (entry.target.id === 'personalMessageSection') {
            this.startTypewriter();
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

    // Modal close listeners
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new LoveStoryApp();
  window.app.init();
});
