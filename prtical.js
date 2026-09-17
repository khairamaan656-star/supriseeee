/**
 * ====================================================================
 * OUR LITTLE LOVE STORY ❤️ — PARTICLES & FIREWORKS ENGINE
 * ====================================================================
 */

class ParticlesEngine {
  constructor() {
    this.heartsCanvas = null;
    this.heartsCtx = null;
    this.hearts = [];
    this.stars = [];

    this.petalsCanvas = null;
    this.petalsCtx = null;
    this.petals = [];

    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.confettiParticles = [];

    this.animFrames = {};
  }

  initHeartsAndStars(canvasId) {
    this.heartsCanvas = document.getElementById(canvasId);
    if (!this.heartsCanvas) return;
    this.heartsCtx = this.heartsCanvas.getContext('2d');
    
    this.resizeCanvas(this.heartsCanvas);
    window.addEventListener('resize', () => this.resizeCanvas(this.heartsCanvas));

    // Spawn initial floating hearts & glowing stars
    this.hearts = [];
    this.stars = [];

    const heartCount = window.innerWidth < 768 ? 25 : 45;
    for (let i = 0; i < heartCount; i++) {
      this.hearts.push(this.createHeartParticle(true));
    }

    const starCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.heartsCanvas.width,
        y: Math.random() * this.heartsCanvas.height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        dir: Math.random() > 0.5 ? 1 : -1
      });
    }

    this.animateHearts();
  }

  resizeCanvas(canvas) {
    if (!canvas) return;
    canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
  }

  createHeartParticle(randomY = false) {
    const width = this.heartsCanvas ? this.heartsCanvas.width : window.innerWidth;
    const height = this.heartsCanvas ? this.heartsCanvas.height : window.innerHeight;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 20,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.6 + 0.3,
      color: ['#FF4D6D', '#FFB3C1', '#FF758F', '#C9184A', '#E2E2FF'][Math.floor(Math.random() * 5)],
      rotation: (Math.random() - 0.5) * 0.4,
      rotationSpeed: (Math.random() - 0.5) * 0.01
    };
  }

  drawHeart(ctx, x, y, size, color, alpha, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, -d / 4);
    ctx.bezierCurveTo(-d / 2, -d / 2, -d, 0, 0, d / 2);
    ctx.bezierCurveTo(d, 0, d / 2, -d / 2, 0, -d / 4);
    ctx.fill();
    ctx.restore();
  }

  animateHearts() {
    if (!this.heartsCtx || !this.heartsCanvas) return;
    this.heartsCtx.clearRect(0, 0, this.heartsCanvas.width, this.heartsCanvas.height);

    // Draw glowing stars
    for (let s of this.stars) {
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 1) { s.alpha = 1; s.dir = -1; }
      if (s.alpha <= 0.1) { s.alpha = 0.1; s.dir = 1; }

      this.heartsCtx.save();
      this.heartsCtx.globalAlpha = s.alpha;
      this.heartsCtx.fillStyle = '#FFFDF9';
      this.heartsCtx.beginPath();
      this.heartsCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.heartsCtx.fill();
      this.heartsCtx.restore();
    }

    // Draw hearts
    for (let i = 0; i < this.hearts.length; i++) {
      const h = this.hearts[i];
      h.y -= h.speedY;
      h.x += Math.sin(h.y * 0.01) * h.speedX;
      h.rotation += h.rotationSpeed;

      if (h.y < -30) {
        this.hearts[i] = this.createHeartParticle(false);
      }

      this.drawHeart(this.heartsCtx, h.x, h.y, h.size, h.color, h.alpha, h.rotation);
    }

    this.animFrames.hearts = requestAnimationFrame(() => this.animateHearts());
  }

  // Rose Petals for Proposal Section
  initRosePetals(canvasId) {
    this.petalsCanvas = document.getElementById(canvasId);
    if (!this.petalsCanvas) return;
    this.petalsCtx = this.petalsCanvas.getContext('2d');
    
    this.resizeCanvas(this.petalsCanvas);
    window.addEventListener('resize', () => this.resizeCanvas(this.petalsCanvas));

    this.petals = [];
    const count = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < count; i++) {
      this.petals.push(this.createPetalParticle(true));
    }

    this.animatePetals();
  }

  createPetalParticle(randomY = false) {
    const width = this.petalsCanvas ? this.petalsCanvas.width : window.innerWidth;
    const height = this.petalsCanvas ? this.petalsCanvas.height : window.innerHeight;
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      size: Math.random() * 10 + 10,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.5 - 0.75,
      oscillation: Math.random() * 0.05,
      angle: Math.random() * Math.PI * 2,
      angularVelocity: (Math.random() - 0.5) * 0.03,
      color: ['#800020', '#C9184A', '#FF4D6D', '#A4133C', '#FF758F'][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.5 + 0.5
    };
  }

  animatePetals() {
    if (!this.petalsCtx || !this.petalsCanvas) return;
    this.petalsCtx.clearRect(0, 0, this.petalsCanvas.width, this.petalsCanvas.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.y * p.oscillation) + p.speedX;
      p.angle += p.angularVelocity;

      if (p.y > this.petalsCanvas.height + 20) {
        this.petals[i] = this.createPetalParticle(false);
      }

      this.petalsCtx.save();
      this.petalsCtx.translate(p.x, p.y);
      this.petalsCtx.rotate(p.angle);
      this.petalsCtx.globalAlpha = p.alpha;
      this.petalsCtx.fillStyle = p.color;

      // Draw petal shape
      this.petalsCtx.beginPath();
      this.petalsCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      this.petalsCtx.fill();
      this.petalsCtx.restore();
    }

    this.animFrames.petals = requestAnimationFrame(() => this.animatePetals());
  }

  // Confetti & Fireworks Explosion for "YES ❤️" Click
  triggerFireworksAndConfetti() {
    let canvas = document.getElementById('celebrationCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'celebrationCanvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const colors = ['#FF4D6D', '#FFB3C1', '#FFFDF9', '#C9184A', '#FFD166', '#E2E2FF', '#FF758F'];

    // Burst 150 particles from center/bottom
    for (let i = 0; i < 200; i++) {
      const isHeart = Math.random() > 0.4;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 4;
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 + 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008,
        gravity: 0.25,
        isHeart: isHeart,
        rotation: Math.random() * Math.PI * 2
      });
    }

    const animateConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      for (let p of particles) {
        if (p.alpha <= 0) continue;
        activeCount++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.isHeart) {
          this.drawHeart(ctx, p.x, p.y, p.size, p.color, Math.max(0, p.alpha), p.rotation);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (activeCount > 0) {
        requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animateConfetti();
  }
}

// Global instance
if (typeof window !== 'undefined') {
  window.particlesEngine = new ParticlesEngine();
}
