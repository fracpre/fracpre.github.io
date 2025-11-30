let hasUserInteracted = false;

// Helper: choose a display name preferring global_name when non-empty, else username
function chooseDisplayName(discordUser) {
  if (!discordUser) return '';
  const g = (discordUser.global_name || '').toString().trim();
  const u = (discordUser.username || '').toString().trim();
  return g.length > 0 ? g : u;
}

// Offline tracking: store when the user went offline and update UI with "hace X"
// Try to restore last offline timestamp from localStorage so visiting the page
// later can show how long ago the user disconnected.
let _lastOfflineAt = null;
try {
  const stored = localStorage.getItem('lastOfflineAt');
  if (stored) _lastOfflineAt = parseInt(stored, 10) || null;
} catch (e) { _lastOfflineAt = null; }
let _offlineTickerId = null;

function formatTimeAgo(ms) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s} ${s === 1 ? 'segundo' : 'segundos'}`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} ${m === 1 ? 'minuto' : 'minutos'}`;
  const h = Math.floor(m / 60);
  if (h < 24) {
    const remMin = m % 60;
    if (remMin === 0) return `${h} ${h === 1 ? 'hora' : 'horas'}`;
    return `${h} ${h === 1 ? 'hora' : 'horas'} ${remMin} ${remMin === 1 ? 'minuto' : 'minutos'}`;
  }
  const d = Math.floor(h / 24);
  const remH = h % 24;
  if (remH === 0) return `${d} ${d === 1 ? 'día' : 'días'}`;
  return `${d} ${d === 1 ? 'día' : 'días'} ${remH} ${remH === 1 ? 'hora' : 'horas'}`;
}

function getOfflineText() {
  if (!_lastOfflineAt) return 'Desconectado';
  const diff = Date.now() - _lastOfflineAt;
  return `Desconectado hace ${formatTimeAgo(diff)}`;
}

function startOfflineTicker(activityEl) {
  if (_offlineTickerId) return; // already running
  if (!activityEl) return;
  // update immediately and then every 30s
  activityEl.style.fontSize = '13px';
  activityEl.style.fontStyle = 'normal';
  activityEl.style.display = 'inline-flex';
  activityEl.style.verticalAlign = 'middle';
  activityEl.textContent = getOfflineText();
  _offlineTickerId = setInterval(() => {
    try {
      activityEl.textContent = getOfflineText();
    } catch (e) {}
  }, 60000); // update every 1 minute
}

function stopOfflineTicker(activityEl) {
  if (_offlineTickerId) { clearInterval(_offlineTickerId); _offlineTickerId = null; }
  _lastOfflineAt = null;
  try { localStorage.removeItem('lastOfflineAt'); } catch(e) {}
  if (activityEl) {
    // clear only if there is no other activity; caller should set appropriate text afterwards
    try { activityEl.textContent = ''; activityEl.style.fontSize = ''; activityEl.style.fontStyle = ''; activityEl.style.display = ''; } catch (e) {}
  }
}

// If we have a stored offline timestamp from a previous session, begin the
// offline ticker immediately so the visitor sees "Desconectado hace X" on load.
try {
  if (_lastOfflineAt) {
    const initialActivityEl = document.querySelector('.handle-activity');
    if (initialActivityEl) startOfflineTicker(initialActivityEl);
  }
} catch (e) {}

function initMedia() {
  console.log("initMedia called");
  const backgroundMusic = document.getElementById('background-music');
  const backgroundElem = document.getElementById('background');
  if (!backgroundMusic || !backgroundElem) {
    console.error("Media elements not found");
    return;
  }
  backgroundMusic.volume = 0.3;

  // Si el background es video, mantenerlo silenciado y intentar reproducir.
  if (backgroundElem.tagName === 'VIDEO') {
    backgroundElem.muted = true;
    backgroundElem.play().catch(err => {
      console.error("Failed to play background video:", err);
    });
  } else {
    // si es IMG (GIF), sólo aseguramos que esté visible cuando corresponda
    backgroundElem.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  // NO tocar profileName - dejarlo estático en el HTML
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const hackerMusic = document.getElementById('hacker-music');
  const rainMusic = document.getElementById('rain-music');
  const animeMusic = document.getElementById('anime-music');
  const carMusic = document.getElementById('car-music');
  const homeButton = document.getElementById('home-theme');
  const hackerButton = document.getElementById('hacker-theme');
  const rainButton = document.getElementById('rain-theme');
  const animeButton = document.getElementById('anime-theme');
  const carButton = document.getElementById('car-theme');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');

  
  const cursor = document.querySelector('.custom-cursor');
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchend', () => {
      cursor.style.display = 'none'; 
    });
  } else {

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8) translate(0, 0)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1) translate(0, 0)';
    });
  }


  const startMessage = "Bendiciones";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (!startText) return;
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }

  if (startText) {
    setInterval(() => {
        startCursorVisible = !startCursorVisible;
        if(startText) {
            startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
        }
    }, 500);
  }


  function initializeVisitorCounter() {
    let totalVisitors = localStorage.getItem('totalVisitorCount');
    if (!totalVisitors) {
      totalVisitors = 4;
      localStorage.setItem('totalVisitorCount', totalVisitors);
    } else {
      totalVisitors = parseInt(totalVisitors);
    }

    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      totalVisitors++;
      localStorage.setItem('totalVisitorCount', totalVisitors);
      localStorage.setItem('hasVisited', 'true');
    }

    if (visitorCount) {
        visitorCount.textContent = totalVisitors.toLocaleString();
    }
  }


  initializeVisitorCounter();

  if (startScreen) {
    startScreen.addEventListener('click', () => {
      // Se eliminó la petición automática de pantalla completa aquí.
      // Para permitir pantalla completa, añade un botón que llame
      // a `document.documentElement.requestFullscreen()` explícitamente.

        startScreen.classList.add('hidden');
        backgroundMusic.muted = false;
        backgroundMusic.play().catch(err => {
        console.error("Failed to play music after start screen click:", err);
        });
        profileBlock.classList.remove('hidden');
        gsap.fromTo(profileBlock,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
            profileBlock.classList.add('profile-appear');
            profileContainer.classList.add('orbit');
        }}
        );
        if (!isTouchDevice) {
        try {
            new cursorTrailEffect({
            length: 10,
            size: 8,
            speed: 0.2
            });
            console.log("Cursor trail initialized");
        } catch (err) {
            console.error("Failed to initialize cursor trail effect:", err);
        }
        }
    });

    startScreen.addEventListener('touchstart', (e) => {
      e.preventDefault();
      // Se eliminó la petición automática de pantalla completa aquí.
      // Mantener la experiencia táctil sin forzar fullscreen.

        startScreen.classList.add('hidden');
        backgroundMusic.muted = false;
        backgroundMusic.play().catch(err => {
        console.error("Failed to play music after start screen touch:", err);
        });
        profileBlock.classList.remove('hidden');
        gsap.fromTo(profileBlock,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
            profileBlock.classList.add('profile-appear');
            profileContainer.classList.add('orbit');
        }}
        );
        if (!isTouchDevice) {
        try {
            new cursorTrailEffect({
            length: 10,
            size: 8,
            speed: 0.2
            });
            console.log("Cursor trail initialized");
        } catch (err) {
            console.error("Failed to initialize cursor trail effect:", err);
        }
        }
    });
  }




  let currentAudio = backgroundMusic;
  let isMuted = false;

  volumeIcon.addEventListener('click', () => {
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  volumeIcon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  volumeSlider.addEventListener('input', () => {
    currentAudio.volume = volumeSlider.value;
    isMuted = false;
    currentAudio.muted = false;
    volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });


  transparencySlider.addEventListener('input', () => {
    const opacity = transparencySlider.value;
    if (opacity == 0) {
      profileBlock.style.background = 'rgba(0, 0, 0, 0)';
      profileBlock.style.borderOpacity = '0';
      profileBlock.style.borderColor = 'transparent';
      profileBlock.style.backdropFilter = 'none';
      skillsBlock.style.background = 'rgba(0, 0, 0, 0)';
      skillsBlock.style.borderOpacity = '0';
      skillsBlock.style.borderColor = 'transparent';
      skillsBlock.style.backdropFilter = 'none';
   
      profileBlock.style.pointerEvents = 'auto';
      socialIcons.forEach(icon => {
        icon.style.pointerEvents = 'auto';
        icon.style.opacity = '1';
      });
      badges.forEach(badge => {
        badge.style.pointerEvents = 'auto';
        badge.style.opacity = '1';
      });
      profilePicture.style.pointerEvents = 'auto';
      profilePicture.style.opacity = '1';
      // profileName se deja estático en HTML
      profileBio.style.opacity = '1';
      visitorCount.style.opacity = '1';
    } else {
      profileBlock.style.background = `rgba(0, 0, 0, ${opacity})`;
      profileBlock.style.borderOpacity = opacity;
      profileBlock.style.borderColor = '';
      profileBlock.style.backdropFilter = `blur(${10 * opacity}px)`;
      skillsBlock.style.background = `rgba(0, 0, 0, ${opacity})`;
      skillsBlock.style.borderOpacity = opacity;
      skillsBlock.style.borderColor = '';
      skillsBlock.style.backdropFilter = `blur(${10 * opacity}px)`;
      profileBlock.style.pointerEvents = 'auto';
      socialIcons.forEach(icon => {
        icon.style.pointerEvents = 'auto';
        icon.style.opacity = '1';
      });
      badges.forEach(badge => {
        badge.style.pointerEvents = 'auto';
        badge.style.opacity = '1';
      });
      profilePicture.style.pointerEvents = 'auto';
      profilePicture.style.opacity = '1';
      // profileName se deja estático en HTML
      profileBio.style.opacity = '1';
      visitorCount.style.opacity = '1';
    }
  });


  function switchTheme(videoSrc, audio, themeClass, overlay = null, overlayOverProfile = false) {
    let primaryColor;
    switch (themeClass) {
      case 'home-theme':
        primaryColor = '#00CED1';
        break;
      case 'hacker-theme':
        primaryColor = '#22C55E';
        break;
      case 'rain-theme':
        primaryColor = '#1E3A8A';
        break;
      case 'anime-theme':
        primaryColor = '#DC2626';
        break;
      case 'car-theme':
        primaryColor = '#EAB308';
        break;
      default:
        primaryColor = '#00CED1';
    }
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    gsap.to(backgroundVideo, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        backgroundVideo.src = videoSrc; // funciona tanto para <video> como para <img>

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio;
        currentAudio.volume = volumeSlider.value;
        currentAudio.muted = isMuted;
        currentAudio.play().catch(err => console.error("Failed to play theme music:", err));

        document.body.classList.remove('home-theme', 'hacker-theme', 'rain-theme', 'anime-theme', 'car-theme');
        document.body.classList.add(themeClass);

        hackerOverlay.classList.add('hidden');
        snowOverlay.classList.add('hidden');
        profileBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        skillsBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        if (overlay) {
          overlay.classList.remove('hidden');
        }

        if (themeClass === 'hacker-theme') {
          resultsButtonContainer.classList.remove('hidden');
        } else {
          resultsButtonContainer.classList.add('hidden');
          skillsBlock.classList.add('hidden');
          resultsHint.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.to(profileBlock, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        }

        gsap.to(backgroundVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            profileContainer.classList.remove('orbit');
            void profileContainer.offsetWidth;
            profileContainer.classList.add('orbit');
          }
        });
      }
    });
  }


  homeButton.addEventListener('click', () => {
    switchTheme('assets/background1.gif', backgroundMusic, 'home-theme');
  });
  homeButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/background1.gif', backgroundMusic, 'home-theme');
  });

  hackerButton.addEventListener('click', () => {
    switchTheme('assets/hacker_background.mp4', hackerMusic, 'hacker-theme', hackerOverlay, false);
  });
  hackerButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/hacker_background.mp4', hackerMusic, 'hacker-theme', hackerOverlay, false);
  });

  rainButton.addEventListener('click', () => {
    switchTheme('assets/rain_background.mov', rainMusic, 'rain-theme', snowOverlay, true);
  });
  rainButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/rain_background.mov', rainMusic, 'rain-theme', snowOverlay, true);
  });

  animeButton.addEventListener('click', () => {
    switchTheme('assets/anime_background.mp4', animeMusic, 'anime-theme');
  });
  animeButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/anime_background.mp4', animeMusic, 'anime-theme');
  });

  carButton.addEventListener('click', () => {
    switchTheme('assets/car_background.mp4', carMusic, 'car-theme');
  });
  carButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/car_background.mp4', carMusic, 'car-theme');
  });

 
  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const maxTilt = 15;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  }

  profileBlock.addEventListener('mousemove', (e) => handleTilt(e, profileBlock));
  profileBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, profileBlock);
  });

  skillsBlock.addEventListener('mousemove', (e) => handleTilt(e, skillsBlock));
  skillsBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, skillsBlock);
  });

  profileBlock.addEventListener('mouseleave', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  profileBlock.addEventListener('touchend', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  skillsBlock.addEventListener('mouseleave', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  skillsBlock.addEventListener('touchend', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });


  profilePicture.addEventListener('mouseenter', () => {
    glitchOverlay.style.opacity = '1';
    setTimeout(() => {
      glitchOverlay.style.opacity = '0';
    }, 500);
  });


  profilePicture.addEventListener('click', () => {
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });

  profilePicture.addEventListener('touchstart', (e) => {
    e.preventDefault();
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });

 
  let isShowingSkills = false;
  resultsButton.addEventListener('click', () => {
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  });

  resultsButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  });


  typeWriterStart();
});

// Fallback: ensure the Discord handle is only visible on hover using JS toggle
document.addEventListener('DOMContentLoaded', () => {
  try {
    const discordContainer = document.querySelector('.social-icon-container[aria-label="Discord"]');
    if (discordContainer) {
      const globalHandle = document.getElementById('discord-handle-global');
      if (globalHandle) {
        // Ensure the global handle is visible by default (always shown below the social icons)
        globalHandle.classList.add('show');
        // No hover/toggle listeners: the handle stays visible at all times.
        // Position the handle centered under the Discord icon (not the whole group)
        function positionDiscordHandle() {
          try {
            const socialBlock = document.querySelector('.social-block');
            if (!socialBlock) return;
            const discordRect = discordContainer.getBoundingClientRect();
            const socialRect = socialBlock.getBoundingClientRect();
            const centerX = discordRect.left + discordRect.width / 2;
            // left relative to socialBlock
            const leftPx = Math.round(centerX - socialRect.left);
            globalHandle.style.left = leftPx + 'px';
            // keep translateX(-50%) so left Px becomes the center
            globalHandle.style.transform = 'translateX(-50%) translateY(0)';
          } catch (e) { /* ignore */ }
        }

        // initial position and on resize
        positionDiscordHandle();
        window.addEventListener('resize', positionDiscordHandle);
      }
    }
  } catch (e) { /* no bloquear si algo falla */ }
});

// --- Lanyard WebSocket: real-time Discord presence ---
document.addEventListener('DOMContentLoaded', () => {
  const LANYARD_WS = 'wss://api.lanyard.rest/socket';
  const USER_ID = '344060291543334914';
  const container = document.querySelector('.social-icon-container[aria-label="Discord"]');
  const globalHandle = document.getElementById('discord-handle-global');
  if (!container || !globalHandle) return;

  const handleStatusTextEl = globalHandle.querySelector('.handle-status-text');
  const avatarImg = globalHandle.querySelector('.handle-avatar');
  const nameEl = globalHandle.querySelector('.handle-name');
  const activityEl = globalHandle.querySelector('.handle-activity');
  const statusDot = globalHandle.querySelector('.handle-status');

  let ws;
  let heartbeatIntervalId = null;

  function connect() {
    ws = new WebSocket(LANYARD_WS);
    ws.addEventListener('open', () => {
      console.log('Lanyard WS connected');
    });

    ws.addEventListener('message', (ev) => {
      try {
        const payload = JSON.parse(ev.data);

        // Handle HELLO / heartbeat info (Lanyard may use op 1 or 2 for hello; accept both)
        if ((payload.op === 2 && payload.d && payload.d.heartbeat_interval) || (payload.d && payload.d.heartbeat_interval)) {
          const interval = payload.d.heartbeat_interval;
          if (heartbeatIntervalId) clearInterval(heartbeatIntervalId);
          heartbeatIntervalId = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, interval);

          // subscribe to the user's presence
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: USER_ID } }));
          }
          return;
        }

        // Event dispatches
        if (payload.op === 0 && payload.t) {
          // payload.d may contain presence info directly or under 'presence'
          const d = payload.d || {};
          const presence = d.presence || d;

          // Discord user info
          const discordUser = presence.discord_user || d.discord_user || {};
          const uid = discordUser.id || USER_ID;
          const avatarHash = discordUser.avatar;
          if (avatarHash && avatarImg) {
            const isAnimated = avatarHash.startsWith('a_');
            const ext = isAnimated ? 'gif' : 'png';
            avatarImg.src = `https://cdn.discordapp.com/avatars/${uid}/${avatarHash}.${ext}?size=128`;
          }

          // global_name (use raw global_name for the card; keep visible handle text unchanged elsewhere)
          if (discordUser && discordUser.global_name && nameEl) {
            nameEl.textContent = discordUser.global_name;
          }

          // status (online/idle/dnd/offline)
          const status = presence.discord_status || d.discord_status || 'offline';
          if (statusDot) {
            statusDot.classList.remove('online','idle','dnd','offline');
            statusDot.classList.add(status || 'offline');
          }
          // Actualizar texto de estado junto al nombre (misma convención en español)
          try {
            const statusMap = {
              online: 'En línea',
              idle: 'Ausente',
              dnd: 'No molestar',
              offline: ''
            };
            const label = (status && statusMap[status]) ? statusMap[status] : '';
            if (handleStatusTextEl) {
              handleStatusTextEl.textContent = label;
              handleStatusTextEl.style.display = label ? 'inline-block' : 'none';
            }
          } catch(e) {}
          // activity: prefer a 'playing' / game activity or the first activity
          const activities = presence.activities || d.activities || [];
          let activity = activities.find(a => a.type === 0 && a.name) || activities[0] || null;
          if (activity && activity.name) {
            const text = activity.state ? `${activity.name} — ${activity.state}` : activity.name;
            if (activityEl) activityEl.textContent = text;
          } else {
            if (activityEl) activityEl.textContent = '';
          }
          // Offline timer: if status is offline and there is no activity, show how long ago
          try {
            if (status === 'offline') {
              if (!_lastOfflineAt) {
                _lastOfflineAt = Date.now();
                try { localStorage.setItem('lastOfflineAt', String(_lastOfflineAt)); } catch(e) {}
              }
              startOfflineTicker(activityEl);
            } else {
              // clear any offline timer when back online/away/dnd
              if (_offlineTickerId) stopOfflineTicker(activityEl);
            }
          } catch (e) {}
        }
      } catch (err) {
        console.error('Lanyard WS message parse error', err);
      }
    });

    ws.addEventListener('close', () => {
      console.log('Lanyard WS closed, reconnecting in 5s');
      if (heartbeatIntervalId) { clearInterval(heartbeatIntervalId); heartbeatIntervalId = null; }
      setTimeout(connect, 5000);
    });
    ws.addEventListener('error', (e) => {
      console.error('Lanyard WS error', e);
      try { ws.close(); } catch(e){}
    });
  }

  connect();
});

// Conexión al WebSocket de Lanyard
const socket = new WebSocket("wss://api.lanyard.rest/socket");

// Hover-only handle elements (avatar, name, status) shown above discord.png
const handleAvatar = document.querySelector(".handle-avatar");
const handleName = document.querySelector(".handle-name");
const handleStatus = document.querySelector(".handle-status");
// Lanyard card elements (reintroduced)
const lanyardAvatar = document.querySelector('.lanyard-avatar');
const lanyardName = document.querySelector('.lanyard-name');
const lanyardActivity = document.querySelector('.lanyard-activity');
const lanyardStatusDot = document.querySelector('.lanyard-status-dot');

const DISCORD_ID = "YOUR_DISCORD_ID"; // Reemplaza con tu ID de Discord

const heartbeat = () => {
    socket.send(JSON.stringify({ op: 3 }));
};

socket.addEventListener("open", () => {
    socket.send(
        JSON.stringify({
            op: 2,
            d: {
                subscribe_to_id: DISCORD_ID,
            },
        })
    );
    setInterval(heartbeat, 30000);
});

socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    if (data.op === 0) {
        const discordData = data.d;

        // Actualizar avatar (si existe el elemento en el hover handle)
        if (handleAvatar && discordData.discord_user && discordData.discord_user.avatar) {
          handleAvatar.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${discordData.discord_user.avatar}.png`;
        }

        // Actualizar nombre en handle (usar global_name si tiene contenido, sino username)
        if (handleName && discordData.discord_user) {
          try {
            console.debug('WS received discord_user:', discordData.discord_user);
          } catch(e) {}
          const display = chooseDisplayName(discordData.discord_user);
          if (display && display.length) {
            handleName.textContent = display;
          } // si display está vacío, no sobreescribimos el nombre existente
        }

        // Actualizar estado (cambia la clase del punto de status) en handle
        if (handleStatus) {
          const st = discordData.discord_status || 'offline';
          handleStatus.classList.remove('online','idle','dnd','offline');
          handleStatus.classList.add(st);
        }

        // También actualizar la tarjeta Lanyard si está presente
        if (lanyardAvatar && discordData.discord_user && discordData.discord_user.avatar) {
            lanyardAvatar.src = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${discordData.discord_user.avatar}.png`;
        }
        if (lanyardName && discordData.discord_user) {
          const display2 = chooseDisplayName(discordData.discord_user);
          if (display2 && display2.length) lanyardName.textContent = display2;
        }
        if (lanyardActivity) {
            if (discordData.activities && discordData.activities.length > 0) {
                lanyardActivity.textContent = discordData.activities[0].name || 'Sin actividad';
            } else {
                lanyardActivity.textContent = 'Sin actividad';
            }
        }
        // If the API returned an activities array, prefer a 'playing' (type 0)
        // activity to show what game/app is being played. If none, fall back
        // to the first activity. When we show an API activity, remove Spotify
        // visuals to avoid conflicting UI.
        try {
          const activityElHandle = document.querySelector('.handle-activity');
          if (activityElHandle && discordData.activities && discordData.activities.length > 0) {
            const activitiesArr = discordData.activities;
            const playing = activitiesArr.find(a => a.type === 0 && a.name);
            const chosen = playing || activitiesArr[0];
            const text = chosen.state ? `${chosen.name} — ${chosen.state}` : chosen.name;
            activityElHandle.textContent = text;
            // remove Spotify album art / note / small icon to avoid conflicting UI
            const existingAlbum = document.querySelector('.handle-album-art');
            if (existingAlbum) try { existingAlbum.remove(); } catch(e){}
            const existingNote = document.querySelector('.global-name-note');
            if (existingNote) try { existingNote.remove(); } catch(e){}
            const existingSpotifyImg = document.querySelector('.handle-spotify-img');
            if (existingSpotifyImg) try { existingSpotifyImg.remove(); } catch(e){}
            // Reset inline styles so CSS controls the appearance
            activityElHandle.style.fontSize = '';
            activityElHandle.style.fontStyle = '';
            activityElHandle.style.display = '';
          }
        } catch(e) { /* non-fatal */ }
        if (lanyardStatusDot) {
            const st2 = discordData.discord_status || 'offline';
            lanyardStatusDot.classList.remove('online','idle','dnd','offline');
            lanyardStatusDot.classList.add(st2);
        }
    }
});

// Railway polling: only update the hover status dot to `dnd` when API reports dnd
// Railway polling: map API status to the status dot classes
(function startRailwayPoll(){
  const STATUS_API = 'https://api-discord-status-production.up.railway.app/';
  const statusDot = document.querySelector('.handle-status');
  if (!statusDot) return;

  async function checkRailway() {
    try {
      const res = await fetch(STATUS_API, { cache: 'no-store' });
      if (!res.ok) return;
      const json = await res.json();
      const data = json && json.data ? json.data : null;
      if (!data) return;

      // If API provides an avatar_url, update the hover handle avatar image
      try {
        const avatarImg = document.querySelector('.handle-avatar');
        const apiAvatar = data.discord_user && data.discord_user.avatar_url ? data.discord_user.avatar_url : null;
        if (apiAvatar && avatarImg) {
          // Only change if different to avoid unnecessary reflows
          if (avatarImg.src !== apiAvatar) {
            avatarImg.src = apiAvatar;
          }
        }
        // Log discord_user for debugging
        try { console.debug('Railway response discord_user:', data.discord_user); } catch(e) {}
        // Ensure handle name uses global_name when present, otherwise username
        try {
          const nameEl = document.querySelector('.handle-name');
          if (nameEl && data.discord_user) {
            const display = chooseDisplayName(data.discord_user);
            if (display && display.length) nameEl.textContent = display;
          }
        } catch(e) {}
        // If API provides an avatar_decoration_url, insert/update it above the avatar
        try {
          const decoUrl = data.discord_user && data.discord_user.avatar_decoration_url ? data.discord_user.avatar_decoration_url : null;
          const avatarWrap = document.querySelector('.handle-avatar-wrap');
          if (decoUrl && avatarWrap) {
            let deco = avatarWrap.querySelector('.handle-avatar-decoration');
            if (!deco) {
              deco = document.createElement('img');
              deco.className = 'handle-avatar-decoration';
              // insert it as the first child so it sits above the avatar visually
              avatarWrap.insertBefore(deco, avatarWrap.firstChild);
            }
            deco.src = decoUrl;
            deco.alt = 'Avatar decoration';
            deco.onerror = function() { try { this.remove(); } catch(e){} };
          } else if (avatarWrap) {
            const existing = avatarWrap.querySelector('.handle-avatar-decoration');
            if (existing) try { existing.remove(); } catch(e){}
          }
        } catch (e) { /* non-fatal */ }
      } catch (e) { /* non-fatal */ }

      // If the API provides any activities, prefer those for the handle display
      // (prefer a 'playing' activity type 0). Only when no activities exist do
      // we fall back to showing Spotify song info. This ensures "a lo que juegas"
      // from the API appears immediately and isn't overwritten by Spotify.
      try {
        const activityEl = document.querySelector('.handle-activity');
        const nameEl = document.querySelector('.handle-name');

        if (data.activities && data.activities.length > 0) {
          const activitiesArr = data.activities;
          const playing = activitiesArr.find(a => a.type === 0 && a.name);
          const chosen = playing || activitiesArr[0];
          const text = chosen.state ? `${chosen.name} — ${chosen.state}` : chosen.name;
          if (activityEl) {
            activityEl.textContent = text;
            activityEl.style.fontSize = '';
            activityEl.style.fontStyle = '';
            activityEl.style.display = '';
          }
          // remove any Spotify-specific visuals to avoid conflict
          const existingAlbum = document.querySelector('.handle-album-art');
          if (existingAlbum) try { existingAlbum.remove(); } catch(e){}
          const existingNote = document.querySelector('.global-name-note');
          if (existingNote) try { existingNote.remove(); } catch(e){}
          const existingSpotifyImg = document.querySelector('.handle-spotify-img');
          if (existingSpotifyImg) try { existingSpotifyImg.remove(); } catch(e){}
        } else {
          // No activities: fall back to Spotify display if present
          const spotifyLinkHref = 'https://emoji.gg/emoji/35248-spotify';
          const spotifyImgSrc = 'spotify.png';

          if (data.listening_to_spotify === true && data.spotify && data.spotify.song) {
            if (activityEl) {
              activityEl.style.fontSize = '12px';
              activityEl.style.fontStyle = 'normal';
              activityEl.style.display = 'inline-flex';
              activityEl.style.verticalAlign = 'middle';
              activityEl.textContent = '';
              activityEl.appendChild(document.createTextNode(data.spotify.song));
            }

            try {
              if (nameEl && nameEl.parentElement) {
                const existingImg = nameEl.parentElement.querySelector('.handle-spotify-img');
                if (existingImg) existingImg.remove();

                const img = document.createElement('img');
                img.className = 'handle-spotify-img';
                img.src = 'spotify.png';
                img.onerror = function() { try { this.remove(); } catch(e){} };
                img.alt = 'Spotify';
                img.style.width = '14px';
                img.style.height = '14px';
                img.style.objectFit = 'contain';
                img.style.marginLeft = '6px';
                img.style.verticalAlign = 'middle';
                img.style.display = 'inline-block';
                nameEl.parentElement.appendChild(img);
              }
            } catch (e) { /* non-fatal */ }

            try {
              const prevNoteGlobal = document.querySelector('.global-name-note');
              if (prevNoteGlobal) prevNoteGlobal.remove();

              const note = document.createElement('span');
              note.className = 'global-name-note';
              note.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>';

              if (activityEl) {
                const prev = activityEl.querySelector('.global-name-note');
                if (prev) prev.remove();
                activityEl.insertBefore(note, activityEl.firstChild);
              } else if (activityEl && activityEl.parentElement) {
                activityEl.parentElement.insertBefore(note, activityEl);
              } else if (nameEl && nameEl.parentElement) {
                if (nameEl.nextSibling) nameEl.parentElement.insertBefore(note, nameEl.nextSibling);
                else nameEl.parentElement.appendChild(note);
              }
            } catch (e) { /* non-fatal */ }

            try {
              if (data.spotify.album_art_url) {
                let album = document.querySelector('.handle-album-art');
                if (!album) {
                  album = document.createElement('img');
                  album.className = 'handle-album-art';
                  const handleCard = document.getElementById('discord-handle-global') || document.querySelector('.discord-handle');
                  if (handleCard) handleCard.appendChild(album);
                  else if (activityEl && activityEl.parentElement) activityEl.parentElement.appendChild(album);
                }
                album.src = data.spotify.album_art_url;
                album.alt = 'Album art';
                album.onerror = function() { try { this.remove(); } catch(e){} };
              } else {
                const existing = document.querySelector('.handle-album-art');
                if (existing) try { existing.remove(); } catch(e){}
              }
            } catch (e) { /* non-fatal */ }
          } else {
            if (activityEl) {
              activityEl.style.fontSize = '';
              activityEl.style.fontStyle = '';
            }
            try {
              const nameEl2 = document.querySelector('.handle-name');
              if (nameEl2) {
                const link = nameEl2.parentElement.querySelector('.handle-spotify-link');
                if (link) link.remove();
                try {
                  const activityEl2 = document.querySelector('.handle-activity');
                  let note = null;
                  if (activityEl2) note = activityEl2.querySelector('.global-name-note');
                  if (!note) note = nameEl2.querySelector('.global-name-note');
                  if (note) note.remove();
                } catch(e) {}
              }
            } catch (e) { /* non-fatal */ }
          }
        }
        // --- tiempo de desconexión usando timestamp proporcionado por la API ---
        try {
          const timeDisplay = document.getElementById('tiempo-desconectado');
          if (timeDisplay) {
            if (data.discord_status === 'offline' && data.last_seen_timestamp) {
              // Asumimos que data.last_seen_timestamp está en ms desde epoch
              const ahora = Date.now();
              const desconexion = Number(data.last_seen_timestamp) || 0;
              const diferencia = Math.max(0, ahora - desconexion);

              const segundos = Math.floor(diferencia / 1000);
              const minutos = Math.floor(segundos / 60);
              const horas = Math.floor(minutos / 60);
              const dias = Math.floor(horas / 24);

              let texto = '';
              if (dias > 0) texto = `Desconectado hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
              else if (horas > 0) texto = `Desconectado hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
              else if (minutos > 0) texto = `Desconectado hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
              else texto = 'Desconectado hace unos segundos';

              timeDisplay.innerText = texto;
              timeDisplay.style.display = 'block';
            } else if (data.discord_status && data.discord_status !== 'offline') {
              // Don't show the 'online' green message — hide the time display when online
              timeDisplay.style.display = 'none';
            } else {
              // Si estamos offline pero no hay timestamp
              timeDisplay.innerText = 'Desconectado';
              timeDisplay.style.display = 'block';
            }
          }
        } catch (e) { /* non-fatal */ }
      } catch (e) { /* non-fatal */ }

      // Precedence: if active_on_discord_desktop === false -> consider 'offline' (gray)
      if (data.active_on_discord_desktop === false) {
        statusDot.classList.remove('online','idle','dnd');
        statusDot.classList.add('offline');
        return;
      }

      const status = data.discord_status || null;

      // Map statuses explicitly per your request
      if (status === 'dnd') {
        statusDot.classList.remove('online','idle','offline');
        statusDot.classList.add('dnd');
      } else if (status === 'idle') {
        statusDot.classList.remove('online','dnd','offline');
        statusDot.classList.add('idle');
      } else if (status === 'online') {
        statusDot.classList.remove('idle','dnd','offline');
        statusDot.classList.add('online');
      } else {
        // If API doesn't provide a known status, remove API-controlled classes
        // to allow the Lanyard WS or fallback HTML/CSS to manage the dot.
        statusDot.classList.remove('online','idle','dnd','offline');
      }
      // Show offline elapsed time when user is offline (and no other activity)
      try {
        const activityEl = document.querySelector('.handle-activity');
        if (status === 'offline') {
          if (!_lastOfflineAt) _lastOfflineAt = Date.now();
          startOfflineTicker(activityEl);
        } else {
          if (_offlineTickerId) stopOfflineTicker(activityEl);
        }
      } catch (e) {}
    } catch (e) {
      console.warn('Railway poll failed:', e);
    }
  }

  // initial check and periodic polling
  checkRailway();
  setInterval(checkRailway, 15000); // poll every 15s
})();


