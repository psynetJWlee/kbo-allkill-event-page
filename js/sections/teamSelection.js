
// Main file acting as a bridge to the new modularized version
// This ensures backward compatibility with the rest of the application

// Import our new modular structure
import TeamSelectionModule from './teamSelection/index.js';

// Initialize handlers from our module
import { initSubmitHandlers } from './teamSelection/handlers.js';

// Set up the submit button handlers on load
$(document).ready(function() {
  initSubmitHandlers();
});

// Export the module with the same interface that was used previously
window.teamSelectionSection = TeamSelectionModule;
