
// Main entry point file that coordinates all modules
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  
  // Import all modules
  const { initializeApp } = TeamSelectionCore;
  const { elements } = DOMElements;
  
  // Initialize the application
  initializeApp();
});
