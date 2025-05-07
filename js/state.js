
// Global state for the application
let state = {
  currentDay: 26,  // Default to "Today" (26)
  selectedTeams: {},
  activeTab: 'weekly'
};

// Export the state object
window.appState = state;

// Utility function to format numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Export utility functions
window.utils = {
  formatNumber
};
