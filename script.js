// Birthday Page Interactive Features

let gameActive = false;
let celebrationActive = false;
let gameScore = 0;
let gameTimer = 30;
let gameInterval = null;
let balloonInterval = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createConfetti();
    setTimeout(() => {
        showWelcomeAnimation();
    }, 500);
});

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

// Welcome animation
function showWelcomeAnimation() {
    const title = document.querySelector('.title');
    title.style.transform = 'scale(0)';
    title.style.opacity = '0';
    title.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    setTimeout(() => {
        title.style.transform = 'scale(1)';
        title.style.opacity = '1';
    }, 100);
}

// Open gift function
function openGift() {
    const gift = document.getElementById('gift');
    const message = document.getElementById('message');
    
    // Animate gift opening
    gift.style.transform = 'scale(0) rotate(360deg)';
    gift.style.transition = 'all 0.5s ease-in-out';
    
    setTimeout(() => {
        gift.style.display = 'none';
        message.style.display = 'block';
        
        // Create surprise confetti burst
        createSurpriseConfetti();
        
        // Play a celebration sound effect (if available)
        playConfettiSound();
    }, 500);
}

// Create surprise confetti burst
function createSurpriseConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            
            document.body.appendChild(confetti);
            
            // Animate confetti burst
            const angle = (i / 30) * 360;
            const velocity = Math.random() * 200 + 100;
            const gravity = 0.5;
            let x = 0, y = 0, vx = Math.cos(angle * Math.PI / 180) * velocity;
            let vy = Math.sin(angle * Math.PI / 180) * velocity;
            
            function animateConfetti() {
                x += vx * 0.016;
                y += vy * 0.016;
                vy += gravity;
                
                confetti.style.transform = `translate(${x}px, ${y}px)`;
                confetti.style.opacity = Math.max(0, 1 - Math.abs(y) / 300);
                
                if (y < 300 && confetti.style.opacity > 0) {
                    requestAnimationFrame(animateConfetti);
                } else {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }
            }
            
            animateConfetti();
        }, i * 20);
    }
}

// Start celebration function
function startCelebration() {
    celebrationActive = true;
    document.body.classList.add('celebration-active');
    
    // Create more confetti
    createConfetti();
    
    // Make balloons dance
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        balloon.style.animation = `balloon-dance 1s ease-in-out infinite`;
        balloon.style.animationDelay = (index * 0.1) + 's';
    });
    
    // Add celebration keyframes if not exists
    if (!document.querySelector('#celebration-keyframes')) {
        const style = document.createElement('style');
        style.id = 'celebration-keyframes';
        style.textContent = `
            @keyframes balloon-dance {
                0%, 100% { transform: translateY(0) rotate(-10deg) scale(1); }
                25% { transform: translateY(-30px) rotate(10deg) scale(1.2); }
                50% { transform: translateY(-60px) rotate(-5deg) scale(1.1); }
                75% { transform: translateY(-30px) rotate(15deg) scale(1.15); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show celebration message
    setTimeout(() => {
        showCelebrationPopup();
    }, 1000);
    
    // Reset celebration state
    setTimeout(() => {
        document.body.classList.remove('celebration-active');
        celebrationActive = false;
    }, 3000);
}

// Show celebration popup
function showCelebrationPopup() {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,0.95);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 1000;
            font-family: 'Dancing Script', cursive;
            animation: popup-appear 0.5s ease-out;
        ">
            <h2 style="color: #667eea; font-size: 2.5rem; margin-bottom: 15px;">🎉 CELEBRATION TIME! 🎉</h2>
            <p style="color: #333; font-size: 1.2rem;">Hope your birthday is absolutely wonderful!</p>
            <div style="margin-top: 15px; font-size: 2rem;">🎈🎂🎁🎊🌟</div>
        </div>
    `;
    
    // Add popup animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popup-appear {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(popup);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
        popup.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 300);
    }, 3000);
}

// Start Game function
function startGame() {
    const gameSection = document.getElementById('game-section');
    const gameText = document.getElementById('game-text');
    
    if (gameActive) {
        endGame();
        gameText.textContent = 'Play Game';
    } else {
        gameSection.style.display = 'block';
        gameSection.scrollIntoView({ behavior: 'smooth' });
        initializeGame();
        gameText.textContent = 'End Game';
    }
}

// Initialize the balloon pop game
function initializeGame() {
    gameActive = true;
    gameScore = 0;
    gameTimer = 10;
    
    updateGameDisplay();
    
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    
    // Start game timer
    gameInterval = setInterval(() => {
        gameTimer--;
        updateGameDisplay();
        
        if (gameTimer <= 0) {
            console.log('Timer reached zero, ending game...');
            endGame();
        }
    }, 1000);
    
    // Start spawning balloons
    spawnBalloon();
    balloonInterval = setInterval(spawnBalloon, 1500);
}

// Update game score and timer display
function updateGameDisplay() {
    document.getElementById('game-score').textContent = gameScore;
    document.getElementById('game-timer').textContent = gameTimer;
}

// Spawn a balloon in the game area
function spawnBalloon() {
    if (!gameActive) return;
    
    const gameArea = document.getElementById('game-area');
    const balloon = document.createElement('div');
    
    const balloonColors = ['🎈', '🟥', '🟦', '🟨', '🟩', '🟪', '🟧'];
    const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    
    balloon.className = 'game-balloon';
    balloon.textContent = randomColor;
    balloon.style.left = Math.random() * (gameArea.offsetWidth - 60) + 'px';
    balloon.style.top = Math.random() * (gameArea.offsetHeight - 60) + 'px';
    
    balloon.addEventListener('click', function() {
        popBalloon(balloon);
    });
    
    gameArea.appendChild(balloon);
    
    // Remove balloon after 3 seconds if not clicked
    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.parentNode.removeChild(balloon);
        }
    }, 3000);
}

// Pop balloon when clicked
function popBalloon(balloon) {
    if (!gameActive) return;
    
    gameScore += 10;
    updateGameDisplay();
    
    // Pop animation
    balloon.style.transform = 'scale(1.5)';
    balloon.style.opacity = '0';
    balloon.textContent = '💥';
    
    // Create pop effect
    createPopEffect(balloon);
    
    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.parentNode.removeChild(balloon);
        }
    }, 200);
}

// Create pop effect animation
function createPopEffect(balloon) {
    const rect = balloon.getBoundingClientRect();
    const gameArea = document.getElementById('game-area');
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.textContent = '✨';
        particle.style.position = 'absolute';
        particle.style.left = balloon.style.left;
        particle.style.top = balloon.style.top;
        particle.style.fontSize = '1rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        gameArea.appendChild(particle);
        
        // Animate particles
        const angle = (i / 5) * 360;
        const velocity = 50;
        let x = parseInt(balloon.style.left);
        let y = parseInt(balloon.style.top);
        const vx = Math.cos(angle * Math.PI / 180) * velocity;
        const vy = Math.sin(angle * Math.PI / 180) * velocity;
        
        function animateParticle() {
            x += vx * 0.02;
            y += vy * 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = Math.max(0, parseFloat(particle.style.opacity || 1) - 0.05);
            
            if (parseFloat(particle.style.opacity || 1) > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// End the game
function endGame() {
    gameActive = false;
    
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    
    if (balloonInterval) {
        clearInterval(balloonInterval);
        balloonInterval = null;
    }
    
    // Clear remaining balloons
    const gameArea = document.getElementById('game-area');
    const balloons = gameArea.querySelectorAll('.game-balloon');
    balloons.forEach(balloon => balloon.remove());
    
    // Store game score in localStorage for the birthday page
    localStorage.setItem('gameScore', gameScore);
    
    // Redirect to birthday message page after a short delay
    setTimeout(() => {
        window.location.href = 'birthday-message.html';
    }, 1000);
    
    // Show temporary ending message
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <h3 style="color: #667eea; font-family: 'Dancing Script', cursive; font-size: 2rem;">🎉 Game Over! 🎉</h3>
            <p style="font-size: 1.2rem; margin: 15px 0;">Your Score: <strong>${gameScore}</strong></p>
            <p style="color: #ff6b6b; font-size: 1.1rem;">Taking you to a special birthday message...</p>
            <div style="font-size: 2rem; margin: 20px 0;">🎂✨🎈</div>
        </div>
    `;
}

// Show game over popup with score
function showGameOverPopup() {
    console.log('Showing game over popup...');
    const gameArea = document.getElementById('game-area');
    
    if (!gameArea) {
        console.error('Game area not found!');
        return;
    }
    
    // Clear the game area first
    gameArea.innerHTML = '';
    
    const popup = document.createElement('div');
    popup.className = 'game-over-popup';
    popup.innerHTML = `
        <h2 style="color: #ff6b6b; font-family: 'Dancing Script', cursive; font-size: 2.8rem; margin-bottom: 20px;">🎂 Happy Birthday Dhwani! 🎂</h2>
        <h3>🎉 Game Over! 🎉</h3>
        <p>Your Score: <strong>${gameScore}</strong></p>
        <p>${getScoreMessage(gameScore)}</p>
        <div style="font-size: 2rem; margin: 15px 0;">🎈🎂🎁🎊🌟</div>
        <p style="color: #667eea; font-style: italic; margin-top: 15px;">Hope your special day is filled with joy and laughter!</p>
    `;
    
    gameArea.appendChild(popup);
    
    // Also trigger confetti for celebration
    createConfetti();
    
    // Remove popup after 6 seconds (longer to show the birthday message)
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
        gameArea.innerHTML = '<p class="game-instructions">Click the balloons as fast as you can! 🎈</p>';
    }, 6000);
}

// Get encouraging message based on score
function getScoreMessage(score) {
    if (score >= 80) return "🌟 Amazing! You're a balloon popping champion! 🌟";
    if (score >= 60) return "🎊 Excellent! Great balloon popping skills! 🎊";
    if (score >= 40) return "🎉 Well done! Nice birthday celebration! 🎉";
    if (score >= 20) return "🎈 Good job! Keep practicing! 🎈";
    return "🎂 Great try! Every birthday deserves celebration! 🎂";
}

// Restart the game
function restartGame() {
    if (gameActive) {
        endGame();
    }
    setTimeout(() => {
        initializeGame();
    }, 500);
}

// Close the game
function closeGame() {
    if (gameActive) {
        endGame();
    }
    
    const gameSection = document.getElementById('game-section');
    gameSection.style.display = 'none';
    
    const gameText = document.getElementById('game-text');
    gameText.textContent = 'Play Game';
}

// Play confetti sound (visual feedback since no audio file)
function playConfettiSound() {
    // Create visual sound wave effect
    const soundWave = document.createElement('div');
    soundWave.innerHTML = '🔊';
    soundWave.style.position = 'fixed';
    soundWave.style.top = '20px';
    soundWave.style.right = '20px';
    soundWave.style.fontSize = '2rem';
    soundWave.style.zIndex = '1000';
    soundWave.style.animation = 'sound-pulse 0.5s ease-out';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sound-pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.7; }
            100% { transform: scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(soundWave);
    
    setTimeout(() => {
        if (soundWave.parentNode) {
            soundWave.parentNode.removeChild(soundWave);
        }
    }, 500);
}

// Add keyboard shortcuts for fun
document.addEventListener('keydown', function(event) {
    switch(event.key.toLowerCase()) {
        case 'c':
            if (event.ctrlKey || event.metaKey) return; // Don't interfere with copy
            startCelebration();
            break;
        case 'g':
            if (document.getElementById('gift').style.display !== 'none') {
                openGift();
            } else {
                startGame();
            }
            break;
        case 'b':
            // Manual birthday message trigger for testing
            if (gameActive) {
                endGame();
            } else {
                showGameOverPopup();
            }
            break;
        case ' ':
            event.preventDefault();
            createConfetti();
            break;
    }
});

// Add touch support for mobile
document.addEventListener('touchstart', function(event) {
    if (event.touches.length === 2) {
        // Two finger touch creates confetti
        createConfetti();
    }
});

// Periodic confetti for ambiance
setInterval(() => {
    if (!celebrationActive && Math.random() < 0.3) {
        createConfetti();
    }
}, 10000);
