let hasUserInteracted = false;

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
      const handle = discordContainer.querySelector('.discord-handle');
      if (handle) {
        // Make sure it's hidden initially
        handle.classList.remove('show');

        // Toggle on mouseenter/mouseleave and on focus
        discordContainer.addEventListener('mouseenter', () => handle.classList.add('show'));
        discordContainer.addEventListener('mouseleave', () => handle.classList.remove('show'));
        discordContainer.addEventListener('focusin', () => handle.classList.add('show'));
        discordContainer.addEventListener('focusout', () => handle.classList.remove('show'));
      }
    }
  } catch (e) { /* no bloquear si algo falla */ }
});

// --- Lanyard WebSocket: real-time Discord presence ---
document.addEventListener('DOMContentLoaded', () => {
  const LANYARD_WS = 'wss://api.lanyard.rest/socket';
  const USER_ID = '344060291543334914';
  const container = document.querySelector('.social-icon-container[aria-label="Discord"]');
  if (!container) return;

  const avatarImg = container.querySelector('.discord-avatar');
  const nameEl = container.querySelector('.discord-name');
  const activityEl = container.querySelector('.discord-activity');
  const statusDot = container.querySelector('.status-dot');

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

          // username (use raw username for the card; keep visible handle text unchanged elsewhere)
          if (discordUser && discordUser.username && nameEl) {
            nameEl.textContent = discordUser.username;
          }

          // status (online/idle/dnd/offline)
          const status = presence.discord_status || d.discord_status || 'offline';
          if (statusDot) {
            statusDot.classList.remove('online','idle','dnd','offline');
            statusDot.classList.add(status || 'offline');
          }

          // activity: prefer a 'playing' / game activity or the first activity
          const activities = presence.activities || d.activities || [];
          let activity = activities.find(a => a.type === 0) || activities[0] || null;
          if (activity && activity.name) {
            const text = activity.state ? `${activity.name} — ${activity.state}` : activity.name;
            if (activityEl) activityEl.textContent = text;
          } else {
            if (activityEl) activityEl.textContent = '';
          }
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

        // Actualizar nombre en handle
        if (handleName && discordData.discord_user) {
          handleName.textContent = discordData.discord_user.username || '';
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
            lanyardName.textContent = discordData.discord_user.username || '';
        }
        if (lanyardActivity) {
            if (discordData.activities && discordData.activities.length > 0) {
                lanyardActivity.textContent = discordData.activities[0].name || 'Sin actividad';
            } else {
                lanyardActivity.textContent = 'Sin actividad';
            }
        }
        if (lanyardStatusDot) {
            const st2 = discordData.discord_status || 'offline';
            lanyardStatusDot.classList.remove('online','idle','dnd','offline');
            lanyardStatusDot.classList.add(st2);
        }
    }
});


