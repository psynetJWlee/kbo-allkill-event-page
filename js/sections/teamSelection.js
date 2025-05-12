// js/sections/teamselection.js

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
          <!-- omitted for brevity -->
          올킬 도전!
          <!-- omitted for brevity -->
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
          <!-- omitted for brevity -->
          올킬 도전!
          <!-- omitted for brevity -->
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
          ...올킬 결과...
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>        
        <div id="team-selection-submit" class="team-selection-submit">
          <button id="yesterday-nav-btn" class="submit-btn enabled">
            다음 경기 도전!
          </button>
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
  
  // After rendering, highlight higher votes on whichever list is visible
  const $visibleList = $('#game-list:visible, #yesterday-game-list:visible');
  highlightHigherScores($visibleList);
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
  }
}

// ... renderTomorrowGames, renderTodayGames, renderYesterdayGames (unchanged) ...

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
    state.currentDay = 26;
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
  
  $(document).off('click', '#yesterday-nav-btn')
             .on('click', '#yesterday-nav-btn', function() {
    state.currentDay = 27;
    state.selectedTeams = {};
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
    
    // 새로 선택할 때마다 하이라이트 다시 적용
    const $visibleList = $('#game-list:visible, #yesterday-game-list:visible');
    highlightHigherScores($visibleList);
  });
}

// Update team selection UI
function updateTeamSelections() {
  const state = window.appState;
  
  Object.keys(state.selectedTeams).forEach(gameId => {
    const team = state.selectedTeams[gameId];
    
    $(`.team-box[data-game-id="${gameId}"]`).removeClass('selected-home selected-away');
    $(`.team-box[data-game-id="${gameId}"][data-team="${team}"]`).addClass(`selected-${team}`);
  });
}

// Update submit button state
function updateSubmitButton() {
  const state = window.appState;
  
  if (state.currentDay !== 27) return;
  
  const submitBtn = $('#submit-allkill-btn');
  if (submitBtn.length === 0) return;
  
  const allGamesCount = kboGames ? kboGames.length : 0;
  const allSelected = Object.keys(state.selectedTeams).length === allGamesCount;
  
  if (allSelected) {
    submitBtn.addClass('enabled')
             .prop('disabled', false)
             .css({ opacity: 1, color: '#121212' });
  } else {
    submitBtn.removeClass('enabled')
             .prop('disabled', true)
             .css({ opacity: 0.3, color: 'rgba(18, 18, 18, 0.7)' });
  }
}

// Highlight higher vote-count for each game/match
/**
 * container 안의 .game-item 또는 .match-result 요소에 대해
 * 두 팀의 vote-count를 비교해 더 높은 쪽만 노란색으로 표시
 */
function highlightHigherScores(container) {
  container.find('.game-item, .match-result').each(function() {
    const $item = $(this);
    const $counts = $item.find('.vote-count');
    if ($counts.length < 2) return;
    
    const scores = $counts.map(function() {
      return parseInt($(this).text().replace(/,/g, ''), 10);
    }).get();
    
    const maxScore = Math.max(...scores);
    
    $counts.each(function() {
      const $vc = $(this);
      const val = parseInt($vc.text().replace(/,/g, ''), 10);
      if (val === maxScore) {
        $vc.addClass('highlighted');
      } else {
        $vc.removeClass('highlighted');
      }
    });
  });
}

// Export the initialization functions
window.teamSelectionSection = {
  init: initTeamSelectionSection,
  updateTeamSelections
};
