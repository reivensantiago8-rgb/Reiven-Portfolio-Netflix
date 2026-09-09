// ============================= 
// NAVBAR SCROLL EFFECT
// ============================= 
const header = document.querySelector('header');

function handleNavScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll);
handleNavScroll();


// ============================= 
// HERO BACKGROUND CROSSFADE SLIDESHOW
// ============================= 
// Add or remove filenames here to control which photos cycle
// through the homepage cover. Put the image files in the same
// folder as index.html.
const heroImages = [
    'images/reiven-hero-16x9.jpg',
    'images/hero-2.jpg',
    'images/hero-3.jpg',
    'images/hero-4.jpg',
];

const SLIDE_DURATION = 6000; // milliseconds each photo stays fully visible

if (heroImages.length > 1) {
    const layerA = document.getElementById('heroBgLayerA');
    const layerB = document.getElementById('heroBgLayerB');

    let currentIndex = 0;
    let showingA = true;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % heroImages.length;
        const nextImage = heroImages[currentIndex];

        const incoming = showingA ? layerB : layerA;
        const outgoing = showingA ? layerA : layerB;

        incoming.src = nextImage;
        incoming.classList.add('active');
        outgoing.classList.remove('active');

        showingA = !showingA;
    }, SLIDE_DURATION);
}
const aboutSlides = document.querySelectorAll('.about-slide');
const aboutNextButton = document.querySelector('.about-arrow-right');
const aboutPreviousButton = document.querySelector('.about-arrow-left');
const aboutDots = document.querySelectorAll('.about-dot');

let aboutSlideIndex = 0;

function updateAboutSlides() {
    aboutSlides.forEach((slide, index) => {
        slide.classList.remove('active', 'previous', 'next');

        if (index === aboutSlideIndex) {
            slide.classList.add('active');
        } 
        else if (
            index === (aboutSlideIndex - 1 + aboutSlides.length) % aboutSlides.length
        ) {
            slide.classList.add('previous');
        } 
        else if (
            index === (aboutSlideIndex + 1) % aboutSlides.length
        ) {
            slide.classList.add('next');
        }
    });

    aboutDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === aboutSlideIndex);
});

}

function nextAboutSlide() {
    aboutSlideIndex++;

    if (aboutSlideIndex >= aboutSlides.length) {
        aboutSlideIndex = 0;
    }

    updateAboutSlides();
    restartAboutAutoSlide();
}

function previousAboutSlide() {
    aboutSlideIndex--;

    if (aboutSlideIndex < 0) {
        aboutSlideIndex = aboutSlides.length - 1;
    }

    updateAboutSlides();
    restartAboutAutoSlide();
}

aboutNextButton.addEventListener('click', nextAboutSlide);
aboutPreviousButton.addEventListener('click', previousAboutSlide);
aboutDots.forEach(dot => {
    dot.addEventListener('click', () => {
        aboutSlideIndex = Number(dot.dataset.index);
        updateAboutSlides();
        restartAboutAutoSlide();
    });
});
aboutSlides.forEach((slide) => {
    slide.addEventListener('click', () => {
        if (slide.classList.contains('next')) {
            nextAboutSlide();
        }

        if (slide.classList.contains('previous')) {
            previousAboutSlide();
        }
    });
});
updateAboutSlides();

let aboutAutoSlideTimer;

function restartAboutAutoSlide() {
    clearInterval(aboutAutoSlideTimer);

    aboutAutoSlideTimer = setInterval(nextAboutSlide, 4000);
}

restartAboutAutoSlide();

window.addEventListener('load', () => {
    const introScreen = document.getElementById('intro-screen');
    const introSound = document.getElementById('intro-sound');

    introSound.volume = 0.6;

    introScreen.addEventListener('click', () => {

        introSound.currentTime = 0;

        introSound.play().catch(() => {
            console.log('Intro sound could not be played.');
        });

        introScreen.style.opacity = '0';
        introScreen.style.transition = 'opacity 0.8s ease';

        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 800);
    });
});

const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicPrevious = document.getElementById('music-previous');
const musicNext = document.getElementById('music-next');

const playlist = [
    {
        title: 'Bakal-Yero',
        artist: 'PF.PRO',
        file: 'media/bakal-yero.mp3'
    },
    {
        title: 'C2 Na Red',
        artist: 'Zaniel',
        file: 'media/c2-na-red.mp3'
    },
    {
        title: 'Kung Dalawa',
        artist: 'Mallow',
        file: 'media/kung-dalawa.mp3'
    },
    {
        title: 'Makapangyarihan',
        artist: 'Mejico Legal',
        file: 'media/makapangyarihan.mp3'
    }
];

let currentSong = 0;

function loadSong(index, autoplay = false) {
    const musicInfo = document.querySelector('.music-info');
    const musicTitle = document.getElementById('music-title');
    const musicArtist = document.getElementById('music-artist');

    musicInfo.classList.add('changing');

    setTimeout(() => {
        music.src = playlist[index].file;

music.addEventListener('loadedmetadata', () => {
    document.getElementById('music-duration').textContent =
        formatTime(music.duration);
}, { once: true });

        musicTitle.textContent = playlist[index].title;
        musicArtist.textContent = playlist[index].artist;

        musicInfo.classList.remove('changing');

        if (autoplay) {
            music.play();
            musicToggle.textContent = '❚❚';
            musicToggle.classList.add('playing');
        }
    }, 200);
}

loadSong(currentSong);

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicToggle.textContent = '❚❚';
        musicToggle.classList.add('playing');
    } else {
        music.pause();
        musicToggle.textContent = '▶';
        musicToggle.classList.remove('playing');
    }
});

musicPrevious.addEventListener('click', () => {
    currentSong--;

    if (currentSong < 0) {
        currentSong = playlist.length - 1;
    }

    loadSong(currentSong, true);
});

musicNext.addEventListener('click', () => {
    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong(currentSong, true);
});

music.addEventListener('ended', () => {
    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong(currentSong, true);
});

const musicProgress = document.getElementById('music-progress');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
}

music.addEventListener('timeupdate', () => {
    if (!music.duration) return;

    musicProgress.value =
        (music.currentTime / music.duration) * 100;

    document.getElementById('music-current-time').textContent =
        formatTime(music.currentTime);
});

musicProgress.addEventListener('input', () => {
    if (!music.duration) return;

    music.currentTime =
        (musicProgress.value / 100) * music.duration;
});

const musicVolume = document.getElementById('music-volume');

music.volume = 0.6;

musicVolume.addEventListener('input', () => {
    music.volume = musicVolume.value;
});

// Mobile project card tap
document.querySelectorAll('.netflix-project-card').forEach(card => {

    card.addEventListener('click', () => {

        // Only activate tap behavior on mobile
        if (window.innerWidth <= 800) {

            // Close other project cards
            document.querySelectorAll('.netflix-project-card.active')
                .forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });

            // Toggle this project
            card.classList.toggle('active');
        }

    });

});

// Project row arrows
document.querySelectorAll('.projects-row').forEach(row => {

    const track = row.querySelector('.row-track');
    const leftArrow = row.querySelector('.row-arrow.left');
    const rightArrow = row.querySelector('.row-arrow.right');

    leftArrow.addEventListener('click', () => {
        track.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        track.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });

});

// Mobile music player minimize
const musicMinimize = document.getElementById('music-minimize');

musicMinimize.addEventListener('click', () => {
    document.querySelector('.music-player').classList.toggle('minimized');
});

// Restore minimized music player
document.querySelector('.music-player').addEventListener('click', (event) => {

    const player = document.querySelector('.music-player');

    if (
        player.classList.contains('minimized') &&
        event.target.id === 'music-toggle'
    ) {
        player.classList.remove('minimized');
    }

});