
// Create confetti elements
function createConfetti(container) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  // Random position, color, size, and animation properties
  const left = Math.random() * 100;
  const colors = ['#FFD700', '#FF6347', '#00BFFF', '#32CD32', '#FF69B4', '#8A2BE2'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 8 + 6;
  const animationDuration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;

  
  confetti.style.cssText = `
    position: absolute;
    left: ${left}%;
    top: -${size}px;
    background-color: ${color};
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${animationDuration}s;
    animation-delay: ${delay}s;
  `;
  
  container.appendChild(confetti);
  
  // Remove the element when animation ends
  confetti.addEventListener('animationend', () => {
    confetti.remove();
  });
}

// Create star elements
function createStar(container) {
  const star = document.createElement('div');
  star.className = 'star';
  
  // Create star shape using clip-path
  const left = Math.random() * 100;
  const colors = ['#FFD700', '#FFFFFF', '#FFC0CB'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 10 + 8;
  const animationDuration = Math.random() * 4 + 3;
  const delay = Math.random() * 3;
  
  star.style.cssText = `
  position: absolute;
    left: ${left}%;
    top: -${size}px;
    background-color: ${color};
    width: ${size}px;
    height: ${size}px;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation-duration: ${animationDuration}s;
    animation-delay: ${delay}s;
  `;
  
  container.appendChild(star);
  
  // Remove the element when animation ends
  star.addEventListener('animationend', () => {
    star.remove();
  });
}

// Start animation
function startAnimation(container) {
  if (!container) {
    console.error('Animation container not found');
    return;
  }
  
  // Continuous animation - generate 4 confetti and 2 stars each interval
  setInterval(() => {
    // Generate 4 confetti at once for quadruple density
    createConfetti(container);
    createConfetti(container);
    createConfetti(container);
    createConfetti(container);
    
    // Generate 2 stars at once for double star density
    createStar(container);
    createStar(container);
  }, 300);
}

// Export functions
window.animationUtils = {
  createConfetti,
  createStar,
  startAnimation
};
