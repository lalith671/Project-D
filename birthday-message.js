// Birthday Message Page Interactive Features

// Initialize confetti on page load
document.addEventListener('DOMContentLoaded', function() {
    createConfetti();
    
    // Display game score if available
    displayGameScore();
    
    // Create confetti every 5 seconds for celebration
    setInterval(createConfetti, 5000);
    
    // Animate message paragraphs with staggered entrance
    const paragraphs = document.querySelectorAll('.message-paragraph');
    paragraphs.forEach((paragraph, index) => {
        setTimeout(() => {
            paragraph.style.animationDelay = `${index * 0.1}s`;
        }, 100);
    });
});

// Display game score if available
function displayGameScore() {
    const gameScore = localStorage.getItem('gameScore');
    if (gameScore !== null) {
        // Create a score display element
        const scoreDisplay = document.createElement('div');
        scoreDisplay.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: score-appear 1s ease-out;
        `;
        scoreDisplay.innerHTML = `🎮 Game Score: ${gameScore}`;
        document.body.appendChild(scoreDisplay);
        
        // Clear the score from localStorage
        localStorage.removeItem('gameScore');
    }
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
}

// Go back to main game page
function goBackToGame() {
    // Add exit animation
    const messageCard = document.querySelector('.message-card');
    messageCard.style.animation = 'card-exit 0.5s ease-in-out forwards';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Restart celebration (reload this page with effects)
function restartCelebration() {
    // Create burst of confetti
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 500);
    }
    
    // Add celebration effects
    const messageCard = document.querySelector('.message-card');
    messageCard.style.animation = 'celebration-pulse 1s ease-in-out';
    
    // Reset animation after it completes
    setTimeout(() => {
        messageCard.style.animation = '';
    }, 1000);
}

// Add exit animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes card-exit {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0.8) translateY(-50px);
        }
    }
    
    @keyframes celebration-pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    switch(event.key.toLowerCase()) {
        case 'escape':
        case 'b':
            goBackToGame();
            break;
        case 'c':
        case ' ':
            event.preventDefault();
            restartCelebration();
            break;
    }
});

// Add touch support for mobile confetti
document.addEventListener('touchstart', function(event) {
    if (event.touches.length === 2) {
        createConfetti();
    }
});

// Auto-scroll effect for better reading experience
function smoothScrollToSection() {
    const messageContent = document.querySelector('.message-content');
    if (messageContent) {
        setTimeout(() => {
            messageContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 2000);
    }
}

// Initialize smooth scroll after page loads
setTimeout(smoothScrollToSection, 1000);

// Add floating hearts effect
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💝', '💗', '💓', '💘'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.bottom = '-50px';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            heart.style.animation = 'heart-float 4s ease-out forwards';
            
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }, i * 1000);
    }
}

// Add floating hearts animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heart-float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Create floating hearts every 10 seconds
setInterval(createFloatingHearts, 10000);

// Initial floating hearts
setTimeout(createFloatingHearts, 3000);
