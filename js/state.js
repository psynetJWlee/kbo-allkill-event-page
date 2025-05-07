
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

// Helper function to check if an element exists before accessing its properties
window.safeDOM = {
  getElement: function(selector) {
    return document.querySelector(selector);
  },
  hasElement: function(selector) {
    return document.querySelector(selector) !== null;
  },
  addClass: function(selector, className) {
    const el = this.getElement(selector);
    if (el) el.classList.add(className);
  },
  removeClass: function(selector, className) {
    const el = this.getElement(selector);
    if (el) el.classList.remove(className);
  }
};
