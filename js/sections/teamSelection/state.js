
// State management utilities for team selection

/**
 * Get the current state of the team selections
 * @returns {Object} The current state object
 */
export function getState() {
  return window.appState;
}

/**
 * Update state with new team selections
 * @param {number} gameId - The ID of the game
 * @param {string} team - The team selected ('home' or 'away')
 */
export function updateSelectedTeam(gameId, team) {
  window.appState.selectedTeams[gameId] = team;
}

/**
 * Reset all team selections
 */
export function resetSelections() {
  window.appState.selectedTeams = {};
}

/**
 * Set the submitted status
 * @param {boolean} submitted - Whether the selections have been submitted
 * @param {string} timestamp - The submission timestamp
 */
export function setSubmitted(submitted, timestamp) {
  window.appState.submitted = submitted;
  window.appState.submittedTime = timestamp;
}

/**
 * Change the current day being viewed
 * @param {number} day - The day to set current to
 */
export function setCurrentDay(day) {
  window.appState.currentDay = day;
}
