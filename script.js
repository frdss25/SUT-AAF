let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let isPlaying = false;
const audio = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

setInterval(() => {
    changeSlide(1);
}, 5000);

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '▶️';
        isPlaying = false;
    } else {
        audio.play().catch(e => {
            console.log('Error playing audio:', e);
            alert('Tidak dapat memutar musik. Pastikan file audio valid.');
        });
        playBtn.innerHTML = '⏸️';
        isPlaying = true;
    }
}

function setVolume(value) {
    audio.volume = value / 100;
}

audio.volume = 0.5;

document.addEventListener('DOMContentLoaded', function () {
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        card.addEventListener('click', function () {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 200);
        });
    });

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

function createConfetti() {
    const colors = ['#f43f5e', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

setTimeout(createConfetti, 1000);
setInterval(createConfetti, 10000);