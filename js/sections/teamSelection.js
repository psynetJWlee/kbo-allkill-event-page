
// js/sections/teamSelection.js

// Team Selection Section
function initTeamSelectionSection() {
  const state = window.appState;

  // 1) Date Navigation HTML
  const dateNavHtml = `
    <div class="date-navigation">
      <div class="date-nav-prev" id="date-nav-prev">
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-left"></div>
        </div>
        <span class="prev-day" id="prev-day">${state.currentDay - 1}</span>
      </div>
      <span class="current-day" id="current-day">
        ${state.currentDay === 26 ? 'Today' : state.currentDay}
      </span>
      <div class="date-nav-next" id="date-nav-next">
        <span class="next-day" id="next-day">${state.currentDay + 1}</span>
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>
  `;

  // 2) contentHtml 분기
  let contentHtml = '';
  if (state.currentDay === 27) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img src="/lovable-uploads/d85d06bb-3146-4fad-8560-d5f095fe350a.png" class="pointing-finger pointing-finger-left" alt="Left Finger" />
          올킬 도전!
          <img src="/lovable-uploads/d85d06bb-3146-4fad-8560-d5f095fe350a.png" class="pointing-finger pointing-finger-right" alt="Right Finger" />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            올킬 제출
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (state.currentDay === 26) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img src="/lovable-uploads/d85d06bb-3146-4fad-8560-d5f095fe350a.png" class="pointing-finger pointing-finger-left" alt="Left Finger" />
          올킬 도전!
          <img src="/lovable-uploads/d85d06bb-3146-4fad-8560-d5f095fe350a.png" class="pointing-finger pointing-finger-right" alt="Right Finger" />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="submit-btn" disabled>
            올킬 제출
          </button>
        </div>
      </div>
    `;
  }
  else if (state.currentDay === 25) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
        <h2 class="team-selection-title">
          다음 경기 도전!
          <img src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" class="yesterday-icon right" alt="결과 아이콘" />
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="team-selection-submit">
          <button id="yesterday-nav-btn" class="submit-btn enabled">
            다음 경기 도전!
          </button>
        </div>
      </div>
    `;
  }
  else if (state.currentDay === 24) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day24" style="position: relative;">
        <h2 class="team-selection-title">올킬 성공!</h2>
        <img src="/lovable-uploads/c80cf187-d9ab-4ccd-a210-ab2049d9a23a.png" class="allkill-stamp" alt="올킬 도장" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 200px; opacity: 0.7; z-index: 10;" />
        <div class="game-list" id="day24-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-day24-btn" class="submit-btn enabled">
            올킬 성공!
          </button>
        </div>
      </div>
    `;
  }
  else {
    contentHtml = `
      <div class="team-selection-placeholder" id="team-selection-placeholder">
        <div class="flex justify-center items-center h-[400px] text-white text-lg">
          이 날짜의 데이터가 없습니다.
        </div>
      </div>
    `;
  }

  // 3) HTML 주입 — contentHtml 이 모두 결정된 후에 한 번만
  $('#kbo-selection-container').html(dateNavHtml + contentHtml);

  // 4) sparkle 효과 (내일일 때만)
  if (state.currentDay === 27) {
    initSparkleEffect();
  }

  // 5) 게임 렌더링 & 이벤트 바인딩
  renderGames();
  setupDateNavigationHandlers();
}

// Render games based on current day
function renderGames() {
  const state = window.appState;
  
  if (state.currentDay === 27) {
    renderTomorrowGames();
  } else if (state.currentDay === 26) {
    renderTodayGames();
  } else if (state.currentDay === 25) {
    renderYesterdayGames();
  } else if (state.currentDay === 24) {
    renderDay24Games();
  }
}

// Render tomorrow's games (day 27)
function renderTomorrowGames() {
  const gameList = $('#game-list');
  if (!gameList.length) return;
  
  gameList.empty();
  
  kboGames.forEach((game, index) => {
    const isAlternateBg = index % 2 === 1;
    const homeHigherVotes = game.homeTeam.votes > game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes > game.homeTeam.votes;
    
    const gameHtml = `
      <div class="game-item ${isAlternateBg ? 'alternate-bg' : ''}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box" data-team="home" data-game-id="${game.id}">
            <img src="${game.homeTeam.logo}" class="team-logo" alt="${game.homeTeam.name}" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <span class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">${game.homeTeam.votes.toLocaleString()}</span>
        </div>
        
        <div class="game-status">
          <span class="voting-text">투표 중</span>
          <div class="game-time">${game.time}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box" data-team="away" data-game-id="${game.id}">
            <img src="${game.awayTeam.logo}" class="team-logo" alt="${game.awayTeam.name}" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <span class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">${game.awayTeam.votes.toLocaleString()}</span>
        </div>
      </div>
    `;
    
    gameList.append(gameHtml);
  });
  
  // Attach click handlers to team boxes
  $('.team-box').on('click', function() {
    const gameId = $(this).data('game-id');
    const team = $(this).data('team');
    
    // Remove previous selections for this game
    $(`.team-box[data-game-id="${gameId}"]`).removeClass('selected-home selected-away');
    
    // Add selection class to this team
    if (team === 'home') {
      $(this).addClass('selected-home');
      window.appState.selectedTeams[gameId] = 'home';
    } else {
      $(this).addClass('selected-away');
      window.appState.selectedTeams[gameId] = 'away';
    }
    
    updateSubmitButton();
  });
}

// Render today's games (day 26)
function renderTodayGames() {
  const gameList = $('#game-list');
  if (!gameList.length) return;
  
  gameList.empty();
  
  todayResults.forEach((game, index) => {
    const isAlternateBg = index % 2 === 1;
    const homeHigherVotes = game.homeTeam.votes > game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes > game.homeTeam.votes;
    
    // Determine if game is live or completed
    const isLive = game.status === "경기 중";
    
    const gameHtml = `
      <div class="match-result ${isAlternateBg ? 'alternate-bg' : ''}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box ${window.appState.selectedTeams[game.id] === 'home' ? 'selected-home' : ''}">
            <img src="${game.homeTeam.logo}" class="team-logo" alt="${game.homeTeam.name}" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <span class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">${game.homeTeam.votes.toLocaleString()}</span>
        </div>
        
        <div class="game-status">
          ${isLive ? 
            `<div class="status-text">경기 중</div>` : 
            `<div class="status-text">경기 종료</div>`
          }
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">${game.homeScore}</span>
            <span class="vs-text">:</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">${game.awayScore}</span>
          </div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${window.appState.selectedTeams[game.id] === 'away' ? 'selected-away' : ''}">
            <img src="${game.awayTeam.logo}" class="team-logo" alt="${game.awayTeam.name}" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <span class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">${game.awayTeam.votes.toLocaleString()}</span>
        </div>
      </div>
    `;
    
    gameList.append(gameHtml);
  });
}

// Render yesterday's games (day 25)
function renderYesterdayGames() {
  const gameList = $('#yesterday-game-list');
  if (!gameList.length) return;
  
  gameList.empty();
  
  yesterdayResults.forEach((game, index) => {
    const isAlternateBg = index % 2 === 1;
    const isCorrect = game.correct;
    
    const gameHtml = `
      <div class="match-result ${isAlternateBg ? 'alternate-bg' : ''} ${!isCorrect ? 'highlight-game' : ''}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}">
            <img src="${game.homeTeam.logo}" class="team-logo" alt="${game.homeTeam.name}" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <span class="vote-count ${game.homeTeam.winner ? 'higher' : 'lower'}">${game.homeTeam.votes.toLocaleString()}</span>
        </div>
        
        <div class="game-status">
          <div class="status-text">경기 종료</div>
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">${game.homeScore}</span>
            <span class="vs-text">:</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">${game.awayScore}</span>
          </div>
          ${!isCorrect ? 
            `<div class="red-circle-container">
              <img src="/lovable-uploads/46e10f18-b741-49e5-809e-500ae37ffbd7.png" class="red-circle-image" alt="Wrong Prediction" />
            </div>` : 
            ''
          }
        </div>
        
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}">
            <img src="${game.awayTeam.logo}" class="team-logo" alt="${game.awayTeam.name}" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <span class="vote-count ${game.awayTeam.winner ? 'higher' : 'lower'}">${game.awayTeam.votes.toLocaleString()}</span>
        </div>
      </div>
    `;
    
    gameList.append(gameHtml);
  });
}

// Render day 24 games
function renderDay24Games() {
  const gameList = $('#day24-game-list');
  if (!gameList.length) return;
  
  gameList.empty();
  
  dayBeforeYesterdayResults.forEach((game, index) => {
    const isAlternateBg = index % 2 === 1;
    
    const gameHtml = `
      <div class="match-result ${isAlternateBg ? 'alternate-bg' : ''}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}">
            <img src="${game.homeTeam.logo}" class="team-logo" alt="${game.homeTeam.name}" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <span class="vote-count ${game.homeTeam.winner ? 'higher' : 'lower'}">${game.homeTeam.votes.toLocaleString()}</span>
        </div>
        
        <div class="game-status">
          <div class="status-text">경기 종료</div>
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">${game.homeScore}</span>
            <span class="vs-text">:</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">${game.awayScore}</span>
          </div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}">
            <img src="${game.awayTeam.logo}" class="team-logo" alt="${game.awayTeam.name}" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <span class="vote-count ${game.awayTeam.winner ? 'higher' : 'lower'}">${game.awayTeam.votes.toLocaleString()}</span>
        </div>
      </div>
    `;
    
    gameList.append(gameHtml);
  });
  
  // Add event handler for the day24 button
  $('#submit-day24-btn').on('click', function() {
    window.appState.currentDay = 25;
    initTeamSelectionSection();
  });
}

// Update the submit button state based on selections
function updateSubmitButton() {
  const state = window.appState;
  
  if (state.currentDay === 27) {
    const allGamesSelected = kboGames.every(game => state.selectedTeams.hasOwnProperty(game.id));
    const submitBtn = $('#submit-allkill-btn');
    
    if (allGamesSelected) {
      submitBtn.addClass('enabled');
      submitBtn.prop('disabled', false);
    } else {
      submitBtn.removeClass('enabled');
      submitBtn.prop('disabled', true);
    }
  }
}

// Handle navigation between dates
function setupDateNavigationHandlers() {
  $('#date-nav-prev').on('click', function() {
    if (window.appState.currentDay > 24) {
      window.appState.currentDay--;
      initTeamSelectionSection();
    }
  });
  
  $('#date-nav-next').on('click', function() {
    if (window.appState.currentDay < 27) {
      window.appState.currentDay++;
      initTeamSelectionSection();
    }
  });
  
  $('#yesterday-nav-btn').on('click', function() {
    window.appState.currentDay = 26;
    initTeamSelectionSection();
  });
}

// Initialize sparkle effect for tomorrow's view
function initSparkleEffect() {
  const btn = document.getElementById('submit-allkill-btn');
  if (!btn) return;
  
  const sparks = btn.querySelectorAll('.spark');
  
  sparks.forEach((spark, index) => {
    const delay = index * 0.5;
    spark.style.animationDelay = `${delay}s`;
  });
  
  // Attach click event to the button
  btn.addEventListener('click', function() {
    if (!this.disabled) {
      alert('올킬 도전 제출이 완료되었습니다!');
    }
  });
}

// Export the functions
window.teamSelectionSection = {
  init: initTeamSelectionSection,
  updateTeamSelections: updateSubmitButton
};
