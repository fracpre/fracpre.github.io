// Discord status: cargar lo primero posible
document.addEventListener('DOMContentLoaded', () => {
  // Selector robusto para el rectángulo
  const rect = document.querySelector('.social-top-rect') || document.querySelector('div[style*="background:#23272a"]');
  if (rect) {
    rect.innerHTML = '<span style="color:#aaa;font-size:15px;">Cargando datos de Discord...</span>';
  }
  // Primero obtenemos nombre/avatar
  fetch('https://api.lanyard.rest/v1/users/644169213107503107')
    .then(res => res.json())
    .then(data => {
      const username = data?.data?.discord_user?.username || 'Desconocido';
      const avatar = data?.data?.discord_user?.avatar || null;
      const userId = data?.data?.discord_user?.id || '344060291543334914';
      let avatarUrl = '';
      if (avatar) {
        const isAnim = avatar.startsWith('a_');
        const ext = isAnim ? 'gif' : 'png';
        avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${ext}?size=64`;
      } else {
        avatarUrl = `https://cdn.discordapp.com/embed/avatars/0.png`;
      }
      const status = data?.data?.discord_status || 'offline';
      let color = '#747f8d';
      if (status === 'online') color = '#3ba55d';
      else if (status === 'idle') color = '#faa81a';
      else if (status === 'dnd') color = '#ed4245';
      const punto = `<span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:${color};margin-right:8px;vertical-align:middle;border:2px solid #23272a;"></span>`;
      if (rect) {
        rect.innerHTML = `
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="${avatarUrl}" alt="avatar" style="width:44px;height:44px;border-radius:50%;border:2px solid #23272a;object-fit:cover;box-shadow:0 2px 8px #0002;">
            <div>
              ${punto}<span style="font-family: 'Press Start 2P', monospace; font-size: 18px;">${username}</span><br>
              <span style="font-size: 15px; color: #aaa;">Estado: ${
                status === 'dnd' ? 'No molestar' :
                status === 'idle' ? 'Ausente' :
                status === 'online' ? 'Conectado' :
                'Desconectado'
              }</span>
            </div>
          </div>
        `;
      }
    })
    .catch(() => {
      if (rect) rect.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <div>
            <span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:#747f8d;margin-right:8px;vertical-align:middle;border:2px solid #23272a;"></span>
            <span style="font-family: 'Press Start 2P', monospace; font-size: 18px;">Desconocido</span><br>
            <span style="font-size: 15px; color: #aaa;">Estado: desconocido</span>
          </div>
        </div>
      `;
    });
});
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
    .then(data => {
      const username = data?.data?.discord_user?.username || 'Desconocido';
      const avatar = data?.data?.discord_user?.avatar || null;
      const userId = data?.data?.discord_user?.id || '344060291543334914';
      let avatarUrl = '';
      if (avatar) {
        const isAnim = avatar.startsWith('a_');
        const ext = isAnim ? 'gif' : 'png';
        avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${ext}?size=64`;
      } else {
        avatarUrl = `https://cdn.discordapp.com/embed/avatars/0.png`;
      }
      const status = typeof data?.data?.discord_status === 'string' ? data.data.discord_status : 'desconocido';
      let color = '#747f8d';
      if (status === 'online') color = '#3ba55d';
      else if (status === 'idle') color = '#faa81a';
      else if (status === 'dnd') color = '#ed4245';
      const punto = `<span style=\"display:inline-block;width:13px;height:13px;border-radius:50%;background:${color};margin-right:8px;vertical-align:middle;border:2px solid #23272a;\"></span>`;
      if (rect) {
        rect.innerHTML = `
          <div style=\"display:flex;align-items:center;gap:12px;\">
            <img src=\"${avatarUrl}\" alt=\"avatar\" style=\"width:44px;height:44px;border-radius:50%;border:2px solid #23272a;object-fit:cover;box-shadow:0 2px 8px #0002;\">
            <div>
              ${punto}<span style=\"font-family: 'Press Start 2P', monospace; font-size: 18px;\">${username || 'Desconocido'}</span><br>
              <span style=\"font-size: 15px; color: #aaa;\">Estado: ${
                status === 'dnd' ? 'No molestar' :
                status === 'idle' ? 'Ausente' :
                status === 'online' ? 'Conectado' :
                'Desconocido'
              }</span>
            </div>
          </div>
        `;
      }
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

// Discord card logic removed per user request

// Discord card/handle removed — presence positioning logic omitted.

// Discord presence & live-updates removed to avoid referencing deleted DOM nodes.

// Test fetch snippet removed (ID: 398423836951052291)

// Click-to-copy and REST update for Discord card removed
// Lightweight visual card population + copy behavior
document.addEventListener('DOMContentLoaded', () => {
  try {
    const vcard = document.getElementById('discord-visual-card');
    if (!vcard) return;
    const uid = vcard.dataset.userId || '';
    const avatarImg = vcard.querySelector('.dv-avatar');
    const nameEl = vcard.querySelector('.dv-username');
    const actEl = vcard.querySelector('.dv-activity');

    // copy on click: copy username if present
    vcard.addEventListener('click', (e) => {
      e.preventDefault();
      const txt = nameEl ? nameEl.textContent.trim() : '';
      if (!txt) return;
      const toCopy = txt;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(toCopy);
        else {
          const ta = document.createElement('textarea'); ta.value = toCopy; ta.style.position = 'absolute'; ta.style.left='-9999px'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        }
      } catch (err) { /* ignore */ }
    });

    // Try a single REST fetch to populate avatar/name/activity (non-blocking)
    if (uid) {
      fetch(`https://api.lanyard.rest/v1/users/${uid}`).then(r => r.ok ? r.json() : null).then(json => {
        if (!json || !json.data) return;
        const data = json.data || {};
        const du = data.discord_user || {};
        if (du && du.avatar) {
          const isAnim = du.avatar.startsWith('a_');
          const ext = isAnim ? 'gif' : 'png';
          avatarImg.src = `https://cdn.discordapp.com/avatars/${du.id}/${du.avatar}.${ext}?size=128`;
        }
        if (du && (du.username || du.discriminator)) {
          const nameText = du.username + (du.discriminator ? ('#' + du.discriminator) : '');
          const usernameTextEl = vcard.querySelector('.dv-username-text');
          if (usernameTextEl) usernameTextEl.textContent = nameText;
        }
        const activities = data.activities || [];
        if (activities && activities.length) {
          const playing = activities.find(a => a.type === 0 && a.name);
          const listening = activities.find(a => /spotify/i.test(a.name || '') || a.type === 2);
          const custom = activities.find(a => a.type === 4 && (a.state || a.emoji));
          const activityTextEl = vcard.querySelector('.dv-activity-text');
          if (custom && custom.state) activityTextEl.textContent = custom.state;
          else if (listening && (listening.details || listening.state)) activityTextEl.textContent = `Listening to ${listening.details || listening.state}`;
          else if (playing && playing.name) activityTextEl.textContent = `Playing ${playing.name}`;
        }
        // presence: update dot
        if (data && data.discord_status) {
          const dot = vcard.querySelector('.dv-presence-dot');
          if (dot) {
            dot.classList.remove('online','idle','dnd','offline');
            dot.classList.add(data.discord_status || 'offline');
          }
        }
      }).catch(()=>{});
    }
    // --- Live updates: Lanyard WebSocket (subscribe to user presence) ---
    (function attachLanyardWS() {
      if (!uid) return;
      const LANYARD_WS = 'wss://api.lanyard.rest/socket';
      let ws = null;
      let heartbeatIntervalId = null;
      let reconnectTimeout = null;

      function safeUpdateFromLanyard(d) {
        try {
          const presence = d || {};
          const discord_user = presence.discord_user || {};
          const uidLocal = (discord_user && discord_user.id) ? discord_user.id : uid;

          // avatar
          if (discord_user && discord_user.avatar) {
            const isAnim = discord_user.avatar.startsWith('a_');
            const ext = isAnim ? 'gif' : 'png';
            avatarImg.src = `https://cdn.discordapp.com/avatars/${uidLocal}/${discord_user.avatar}.${ext}?size=128`;
          }

          // username
          const usernameTextEl = vcard.querySelector('.dv-username-text');
          if (usernameTextEl && discord_user && discord_user.username) {
            usernameTextEl.textContent = discord_user.username + (discord_user.discriminator ? ('#' + discord_user.discriminator) : '');
          }

          // activity
          const activityTextEl = vcard.querySelector('.dv-activity-text');
          const activities = presence.activities || [];
          if (activityTextEl) {
            let text = '';
            if (activities && activities.length) {
              const custom = activities.find(a => a.type === 4 && (a.state || a.emoji));
              const listening = activities.find(a => /spotify/i.test(a.name || '') || a.type === 2);
              const playing = activities.find(a => a.type === 0 && a.name);
              if (custom && custom.state) text = custom.state;
              else if (listening && (listening.details || listening.state)) text = `Listening to ${listening.details || listening.state}`;
              else if (playing && playing.name) text = `Playing ${playing.name}`;
            }
            activityTextEl.textContent = text || (presence.discord_status === 'offline' ? 'Offline' : 'Online');
          }

          // presence dot
          if (presence && presence.discord_status) {
            const dot = vcard.querySelector('.dv-presence-dot');
            if (dot) {
              dot.classList.remove('online','idle','dnd','offline');
              dot.classList.add(presence.discord_status || 'offline');
            }
          }
        } catch (e) { /* ignore parse errors */ }
      }

      function connect() {
        try {
          ws = new WebSocket(LANYARD_WS);
          ws.addEventListener('open', () => {});
          ws.addEventListener('message', (ev) => {
            try {
              const payload = JSON.parse(ev.data);
              if (payload.d && payload.d.heartbeat_interval) {
                const interval = payload.d.heartbeat_interval;
                if (heartbeatIntervalId) clearInterval(heartbeatIntervalId);
                heartbeatIntervalId = setInterval(() => {
                  if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }));
                }, interval);
                if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: uid } }));
                return;
              }
              if (payload.op === 0 && payload.d) {
                safeUpdateFromLanyard(payload.d || {});
              }
            } catch (err) { /* parse error */ }
          });
          ws.addEventListener('close', () => {
            if (heartbeatIntervalId) { clearInterval(heartbeatIntervalId); heartbeatIntervalId = null; }
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
            reconnectTimeout = setTimeout(connect, 5000);
          });
          ws.addEventListener('error', () => { try { ws.close(); } catch(e){} });
        } catch (e) {
          if (reconnectTimeout) clearTimeout(reconnectTimeout);
          reconnectTimeout = setTimeout(connect, 5000);
        }
      }

      connect();
      window.addEventListener('beforeunload', () => { try { if (heartbeatIntervalId) clearInterval(heartbeatIntervalId); if (ws) ws.close(); } catch(e){} });
    })();
    // small entrance animation
    requestAnimationFrame(() => vcard.classList.add('dv-loaded'));
  } catch(e) { /* ignore */ }
});



