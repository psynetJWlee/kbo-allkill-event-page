
// Team Selection Section
function initTeamSelectionSection() {
  const state = window.appState;
  
  // Date Navigation
  const dateNavHtml = `
    <div class="date-navigation">
      <div class="date-nav-prev" id="date-nav-prev">
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-left"></div>
        </div>
        <span class="prev-day" id="prev-day">${state.currentDay - 1}</span>
      </div>
      <span class="current-day" id="current-day">${state.currentDay === 26 ? 'Today' : state.currentDay}</span>
      <div class="date-nav-next" id="date-nav-next">
        <span class="next-day" id="next-day">${state.currentDay + 1}</span>
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>
  `;
  
  // Container HTML
  let contentHtml = '';
  
  // Tomorrow's content (27)
  if (state.currentDay === 27) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img 
            src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div id="team-selection-submit" class="team-selection-submit">
          <button
            class="submit-btn"
            id="submit-allkill-btn"
            disabled
          >
            올킬 제출
          </button>
        </div>
      </div>
    `;
  }
  // Today's content (26)
  else if (state.currentDay === 26) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img 
            src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div id="team-selection-submit" class="team-selection-submit">
          <button
            class="submit-btn enabled"
            id="submit-allkill-btn"
          >
            <span>2경기 성공!</span>
            <span>채점 중</span>
          </button>
        </div>
      </div>
    `;
  }
  // Yesterday's content (25)
  else if (state.currentDay === 25) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
        <h2 class="team-selection-title">
          <img 
            src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 결과
          <img 
            src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="yesterday-footer w-full flex flex-col items-center mt-[50px] mb-[50px]">
          <!-- Footer content will be added -->
        </div>
      </div>
    `;
  }
  // Placeholder for other dates
  else {
    contentHtml = `
      <div class="team-selection-placeholder" id="team-selection-placeholder">
        <div class="flex justify-center items-center h-[400px] text-white text-lg">
          이 날짜의 데이터가 없습니다.
        </div>
      </div>
    `;
  }
  
  // Combine date navigation and content
  $('#kbo-selection-container').html(dateNavHtml + contentHtml);
  
  // Render games based on currentDay
  renderGames();
  
  // Set up event handlers for date navigation
  setupDateNavigationHandlers();
}

// Render games based on current day
function renderGames() {
  const state = window.appState;
  
  if (state.currentDay === 27) {
    // Tomorrow's games
    renderTomorrowGames();
  } else if (state.currentDay === 26) {
    // Today's games
    renderTodayGames();
  } else if (state.currentDay === 25) {
    // Yesterday's games
    renderYesterdayGames();
  }
}

// Render tomorrow's games (27)
function renderTomorrowGames() {
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
  setupTeamSelectionHandlers();
}


// Render today's games (26)
function renderTodayGames() {
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
        ${index === 1 ? '<div class="red-circle-container"><img class="red-circle-image" src="/lovable-uploads/99d04a7e-ced1-4bc0-8dc6-309e89feb3d4.png" alt="Red Circle"></div>' : ''}
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
  setupTeamSelectionHandlers();
}

// Render yesterday's games (25)
function renderYesterdayGames() {
  const { formatNumber } = window.utils;
  
  const gamesHtml = yesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    return `
      <div class="match-result ${isAlternateBackground ? 'alternate-bg' : ''}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="score-display">
            <span class="score ${game.homeTeam.winner ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${game.awayTeam.winner ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}" data-game-id="${game.id}" data-team="away">
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
  
  $('#yesterday-game-list').html(gamesHtml);
}

// Set up event handlers for date navigation
function setupDateNavigationHandlers() {
  const state = window.appState;
  
  $('#date-nav-prev').on('click', function() {
    state.currentDay--;
    initTeamSelectionSection();
  });
  
  $('#date-nav-next').on('click', function() {
    state.currentDay++;
    initTeamSelectionSection();
  });
  
  $('#current-day').on('click', function() {
    state.currentDay = 26; // Today
    initTeamSelectionSection();
  });
  
  $('#prev-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay - 1;
    initTeamSelectionSection();
  });
  
  $('#next-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay + 1;
    initTeamSelectionSection();
  });
}

// Set up event handlers for team selection
function setupTeamSelectionHandlers() {
  const state = window.appState;
  
  $('.team-box').on('click', function() {
    const gameId = parseInt($(this).data('game-id'));
    const team = $(this).data('team');
    
    state.selectedTeams[gameId] = team;
    updateTeamSelections();
    updateSubmitButton();
  });
}

// Update team selection UI
function updateTeamSelections() {
  const state = window.appState;
  
  Object.keys(state.selectedTeams).forEach(gameId => {
    const team = state.selectedTeams[gameId];
    
    // Remove previous selections for this game
    $(`.team-box[data-game-id="${gameId}"]`).removeClass('selected-home selected-away');
    
    // Add new selection
    $(`.team-box[data-game-id="${gameId}"][data-team="${team}"]`).addClass(`selected-${team}`);
  });
}

// Check if all teams are selected and update submit button - fixed to avoid null references
function updateSubmitButton() {
  const state = window.appState;
  
  // Make sure we're on tomorrow's view
  if (state.currentDay !== 27) {
    return;
  }
  
  // Check if the button exists
  const submitBtn = $('#submit-allkill-btn');
  if (submitBtn.length === 0) {
    return;
  }
  
  const allGamesCount = kboGames ? kboGames.length : 0;
  const allSelected = Object.keys(state.selectedTeams).length === allGamesCount;
  
  if (allSelected) {
    submitBtn.addClass('enabled');
    submitBtn.prop('disabled', false);
    submitBtn.css({
      opacity: 1,
      color: '#121212'
    });
  } else {
    submitBtn.removeClass('enabled');
    submitBtn.prop('disabled', true);
    submitBtn.css({
      opacity: 0.3,
      color: 'rgba(18, 18, 18, 0.7)'
    });
  }
}

// Export the initialization functions
window.teamSelectionSection = {
  init: initTeamSelectionSection,
  updateTeamSelections
};

