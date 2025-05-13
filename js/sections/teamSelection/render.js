
// Render functions for team selection games

// Import required data
import { updateSubmitButton } from './handlers.js';

// Render games based on current day
export function renderGames() {
  const { currentDay, today } = window.appState;

  if (currentDay === today + 1) {
    renderTomorrowGames();
  } else if (currentDay === today) {
    renderTodayGames();
  } else if (currentDay === today - 1) {
    renderYesterdayGames();
  } else if (currentDay === today - 2) {
    renderDay24Games();
  }
}

// Render tomorrow's games (27)
export function renderTomorrowGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;
  
  const gamesHtml = kboGames.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeSelected = state.selectedTeams[game.id] === 'home';
    const awaySelected = state.selectedTeams[game.id] === 'away';
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    return `
      <div class="game-item ${isAlternateBackground ? 'alternate-bg' : ''}"
           data-index="${game.id}"
           ${index === 1 ? 'id="highlighted-game"' : ''}>
        
        <div class="team-column">
          <div class="team-box ${homeSelected ? 'selected-home' : ''}"
               data-game-id="${game.id}" data-team="home">
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="voting-text">${game.status}</div>
          <div class="game-time">${game.time}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${awaySelected ? 'selected-away' : ''}"
               data-game-id="${game.id}" data-team="away">
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  $('#game-list').html(gamesHtml);

  // Setup event handlers for team selection
  const { setupTeamSelectionHandlers } = require('./handlers.js');
  setupTeamSelectionHandlers();
}

// Render today's games (26)
export function renderTodayGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;
  
  const gamesHtml = todayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeSelected = state.selectedTeams[game.id] === 'home';
    const awaySelected = state.selectedTeams[game.id] === 'away';
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    const homeScoreHigher = game.homeScore > game.awayScore;
    const awayScoreHigher = game.awayScore > game.homeScore;
    const scoreEqual = game.homeScore === game.awayScore;
    
    return `
      <div class="game-item ${isAlternateBackground ? 'alternate-bg' : ''}" data-index="${game.id}" ${index === 1 ? 'id="highlighted-game"' : ''}>
        ${index === 1 ? '<div class="red-circle-container"><img class="red-circle-image" src="https://lh3.googleusercontent.com/fife/ALs6j_HvzAxhqjA6ks4NNecsKoq5P6nR7I7Haaf-fIQcZ-UZzcLVWkFCbuSkN9eEP35B2sBF5o3KNy6Pewjn9OLZpXL1m-XR8MSJtPJMk6SgMFgcYY5fcuFrgiHJUCAAv73An68UCws-ZziPYpFgWIqDB99NeZ9hNMvamqA_tmJb5a49Xf3VWB0BPXQ3_QInYtc6P-CHuS1KEq1JKJOWlinVi9HNGO-JyRehIxM9S8oRiK_DIwnxngAF_WHRP8Z7QZ2Gi4nhuj9wFKWM9rTJVRd_AKW2T-Qrv7V5B53xWinMUQ10gqiszhGpfgd6sj7FKLj3GshsYhos56PZLpjaIeZzOzUgHZlIzoe6p5dOQU_bDIrP_ejdaMlq9jS6mQP0AjNiY0_LFCMKMWL87IMEfK04z0AasuPu11VMKCxmGDWyJGxCRp6LxO3J-X2NSKQJjio2bJjn27FCcZCRLfBhG-LKDBdybrlcXXbsQ2RaKQNZ-cb_aFsU-NqMxFscZKosShuorkwASJG65D6HZx_Sf3mqzIda6UCXGMJqRqOhgQbtGWqgXi-4ZRpBTY0-PiP2uy6UkYoYxKHFNNbY2T-c-FWJZwatjDDgwuMqBYm5Mr6LjGgPIHjNvHotCUpYB7_WYD4GvJRQwW8hhIr5Zabcbqf6dahH9xquVogTScxtvBKh0Tj_3BXs-VmPxAdTKlYWtmjuVeEXyV6Cmt9ihryHNHysDNeW4up7LdpiCw9T5cSmSRe-7cUdvA251Z168WofOW-C3Wdt5zxeTnDXcPOI_SkiiDDH6c4ZZYUlzsvLhjf__dx4n6UXUEwVBpS1euMThLlCGQp4hM4E8gNgdUdv0jO53GVOh-NKEpf6bA8PoK4CxdQboSEHgQi4xqKJIYxxzYoCxckA_FLsI-GroPg3fKjtFjw22EvdpfMBHwnyE9PIakNwMQ8dii4QNr3cH-wiO5voXslqvKW_NOzNiu9f24F19B5CiFM4HPsoslOWQlHUFw3skYfH6iE6IIPSY8add427x9nfYiXeTVxxo2koQaAflTmQkyK8tp152bYI3q-jZLwkmAbyw87Rf7Oi04xq0LGElRaMMHOuvToY3ki3tHjS0YhdwekjlPd_E1XRmRSnidkNTrPdUSC_cUjZoMAxS59GqOyXdJlpN_d3p0kUUxRtb9ZNZy_TPlDrvAaf5uLgH9O2ZYo25uvaEvBwqJvP-3IkImUS_TXbsG6ZA4U1VJmo-1cqjPCnO2KWDVXpdAF-gY3VUtowQK3xc_FBSZbo0UNGrjNuMY1H2tVjKBcTLPEip7u6TatMMknMHQyVia3Qc7TbU2Tvkxf2CbXarReV14ar1SET7SY8j0OsKAUwCMTMqqyEfJqJBjTcxNlXqbTOcd7rUG2tLi4aB3iGpm8_jdd3VP2cUd3ZRSA4DCz2D2WZcZeIGofgs0nNPwJs9kDmIkbYlZGVsm8FM9NRUnP_ApdtgFsviFGmifda5c5XrzEqXpd5k_DvJuPQorMpKdIKxxmFMyajf_skbpyz_7tHZXMc-4IYmn2z0rJDK1G8SmLKJx4ZUO_-xkoky7GU5gf85R344kLs0e3SjbvdOqnRXEITG24DVj1Pod6pTlLvs8mhjWnj=w1902-h910" alt="Red Circle"></div>' : ''}
        <div class="team-column">
          <div class="team-box ${homeSelected ? 'selected-home' : ''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="score-display">
            <span class="score ${homeScoreHigher ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${awayScoreHigher ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${awaySelected ? 'selected-away' : ''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  $('#game-list').html(gamesHtml);
  
  // Setup event handlers for team selection
  const { setupTeamSelectionHandlers } = require('./handlers.js');
  setupTeamSelectionHandlers();
}

// Render yesterday's games (25)
export function renderYesterdayGames() {
  const { formatNumber } = window.utils;
  
  const gamesHtml = yesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes     = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes     = game.awayTeam.votes >= game.homeTeam.votes;
    
    // Use game.correct flag directly to determine disabled class
    const disableCls = game.correct === false ? 'disabled' : '';
    
    return `
      <div
        class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
        data-index="${game.id}"
      >
        <div class="team-column">
          <div
            class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}"
            data-game-id="${game.id}"
            data-team="home"
          >
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>

        <div class="game-status">
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>

        <div class="team-column">
          <div
            class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}"
            data-game-id="${game.id}"
            data-team="away"
          >
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#yesterday-game-list').html(gamesHtml);
}

// Render day before yesterday's games (24)
export function renderDay24Games() {
  const { formatNumber } = window.utils;
  
  const gamesHtml = dayBeforeYesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    // Use game.correct flag to determine disabled class
    const disableCls = game.correct === false ? 'disabled' : '';
    
    return `
      <div
        class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
        data-index="${game.id}"
      >
        <div class="team-column">
          <div
            class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}"
            data-game-id="${game.id}"
            data-team="home"
          >
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>

        <div class="game-status">
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>

        <div class="team-column">
          <div
            class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}"
            data-game-id="${game.id}"
            data-team="away"
          >
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#day24-game-list').html(gamesHtml);
}
