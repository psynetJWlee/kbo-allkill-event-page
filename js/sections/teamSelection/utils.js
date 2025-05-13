
// Utility functions for team selection

/**
 * Format a date for display
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const pad = n => n.toString().padStart(2, '0');
  return `${date.getMonth()+1}월 ${date.getDate()}일 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Check if all games have been selected
 * @param {Object} selectedTeams - Object containing team selections
 * @param {number} totalGames - Total number of games
 * @returns {boolean} Whether all games have been selected
 */
export function areAllGamesSelected(selectedTeams, totalGames) {
  return Object.keys(selectedTeams).length === totalGames;
}

/**
 * Get a game result description
 * @param {Object} game - The game object
 * @returns {string} Description of the game result
 */
export function getGameResultDescription(game) {
  if (game.homeScore > game.awayScore) {
    return `${game.homeTeam.name} 승리`;
  } else if (game.awayScore > game.homeScore) {
    return `${game.awayTeam.name} 승리`;
  } else {
    return '무승부';
  }
}

/**
 * Generate HTML for a team box
 * @param {Object} team - Team data
 * @param {string} position - 'home' or 'away'
 * @param {number} gameId - Game ID
 * @param {boolean} isSelected - Whether this team is selected
 * @returns {string} HTML string for the team box
 */
export function generateTeamBoxHTML(team, position, gameId, isSelected) {
  return `
    <div class="team-box ${isSelected ? `selected-${position}` : ''}"
         data-game-id="${gameId}" data-team="${position}">
      <img class="team-logo"
           src="${team.logo}"
           alt="${team.name} 로고" />
      <span class="team-name">${team.name}</span>
    </div>
  `;
}
