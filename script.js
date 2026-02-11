/* ═══════════════════════════════════════════════════
   MIRAI — Interactions
   Lightweight, no dependencies
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Scroll Reveal ──
     IntersectionObserver adds .visible class with stepped CSS transitions */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  /* ── Terminal Typewriter ──
     Sequential reveal of terminal lines with a stepped delay */
  function initTerminalSequence() {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    const lines = terminalBody.querySelectorAll('.terminal-line');
    let revealed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealed) {
            revealed = true;
            lines.forEach((line, i) => {
              setTimeout(() => {
                line.classList.add('visible');
              }, i * 400); // 400ms stagger — feels like sequential terminal output
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(terminalBody);
  }

  /* ── Data Matrix Animation ──
     Randomly activates cells in the data-matrix showcase frame */
  function initDataMatrix() {
    const matrix = document.getElementById('data-matrix');
    if (!matrix) return;

    // Generate 48 cells (8 cols × 6 rows)
    for (let i = 0; i < 48; i++) {
      const cell = document.createElement('div');
      cell.classList.add('data-cell');
      // Insert before the label
      matrix.insertBefore(cell, matrix.querySelector('.showcase-frame-label'));
    }

    const cells = matrix.querySelectorAll('.data-cell');

    function randomize() {
      cells.forEach((cell) => {
        cell.classList.toggle('active', Math.random() > 0.7);
      });
    }

    // Slow tick — low-FPS feel
    randomize();
    setInterval(randomize, 800);
  }

  /* ── Smooth Scroll for Anchor Links ──
     Keyboard-accessible anchor navigation */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }


  /* ── Hero Logo Typing Animation ──
     Cycles between "MIRAI" and "मिराइ" with a typing effect */
  function initLogoTyping() {
    const logoHero = document.querySelector('.hero-logo');
    if (!logoHero) return;

    const words = ["MiRAi", "मिराइ", "未来"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        logoHero.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 75;
      } else {
        logoHero.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at the end of the word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Small pause before starting next word
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /* ── Boot Sequence ── */
  function init() {
    initScrollReveal();
    initTerminalSequence();
    initDataMatrix();
    initSmoothScroll();
    initLogoTyping();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
