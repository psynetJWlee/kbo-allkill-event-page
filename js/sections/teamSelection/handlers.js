
// Event handlers for team selection

// Set up event handlers for date navigation
export function setupDateNavigationHandlers() {
  const state = window.appState;
  
  $('#date-nav-prev').on('click', function() {
    state.currentDay--;
    const teamSelectionModule = require('./index.js').default;
    teamSelectionModule.init();
  });
  
  $('#date-nav-next').on('click', function() {
    state.currentDay++;
    const teamSelectionModule = require('./index.js').default;
    teamSelectionModule.init();
  });
  
  $('#current-day').on('click', function() {
    state.currentDay = state.today; // 오늘 날짜로
    const teamSelectionModule = require('./index.js').default;
    teamSelectionModule.init();
  });
  
  $('#prev-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay - 1;
    const teamSelectionModule = require('./index.js').default;
    teamSelectionModule.init();
  });
  
  $('#next-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay + 1;
    const teamSelectionModule = require('./index.js').default;
    teamSelectionModule.init();
  });
  
  $(document).off('click', '#yesterday-nav-btn')  // 중복 바인딩 방지
             .on('click', '#yesterday-nav-btn', function() {
    state.currentDay = 27;
    state.selectedTeams = {};
    const teamSelectionModule = require('./index.js').default;
    teamSelectionModule.init();
  });
    
  $(document).on('click',
    '#state-yesterday .team-selection-submit button, ' +
    '#team-selection-section-day24 .team-selection-submit button',
    function() {
      state.currentDay      = state.today + 1;
      state.selectedTeams   = {};
      const teamSelectionModule = require('./index.js').default;
      teamSelectionModule.init();
    }
  );
}

// Set up event handlers for team selection
export function setupTeamSelectionHandlers() {
  const state = window.appState;
  $('.team-box').on('click', function() {
    const gameId = parseInt($(this).data('game-id'));
    const team = $(this).data('team');
    
    state.selectedTeams[gameId] = team;
    updateTeamSelections();
    updateSubmitButton();
    
    // Check if submitted and showing tomorrow's view
    if (state.submitted && state.currentDay === state.today + 1) {
      $('#submit-allkill-btn')
        .text('수정 제출')
        .addClass('modified');
    }
  });
}

// Update team selection UI
export function updateTeamSelections() {
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
export function updateSubmitButton() {
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

// Submit button click handler
export function initSubmitHandlers() {
  // 1) 올킬 제출 버튼 클릭 핸들러
  $(document).on('click', '#submit-allkill-btn', function() {
    const state = window.appState;
    const totalGames = kboGames.length;

    // (1) 5개 모두 선택했는지 체크
    if (Object.keys(state.selectedTeams).length !== totalGames) {
      alert('모든 경기에 팀을 선택해주세요.');
      return;
    }

    // (2) 타임스탬프 생성
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const timeLabel = `${now.getMonth()+1}월 ${now.getDate()}일 ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    // (3) 시스템 얼럿 (confirm)
    if (!confirm('제출 완료!\n경기시작 전까지 수정이 가능합니다.')) return;

    // (4) 상태 저장
    state.submitted     = true;
    state.submittedTime = timeLabel;

    // (5) 타이틀 변경 (두 줄, 폰트 크기)
    $('#team-selection-section-tomorrow .team-selection-title').html(`
      <div style="font-size:45px;font-weight:bold;">제출 완료!</div>
      <div style="font-size:35px;">${timeLabel}</div>
    `);

    // (6) 버튼 텍스트 변경
    $('#submit-allkill-btn')
      .text('제출 완료!')
      .addClass('submitted');
  });
}
