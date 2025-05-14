// teamSelection.js

// ======================
// 1. 공통 헬퍼 추가
// ======================
function renderGameStatus(game) {
  // 1) 투표 중 / 경기 취소
  if (game.status === '투표 중' || game.status === '경기 취소') {
    return `
      <div class="game-status">
        <div class="status-text">${game.status}</div>
        <div class="game-time">${game.time || ''}</div>
      </div>
    `;
  }

  // 2) 경기 중
  if (game.status === '경기 중') {
    return `
      <div class="game-status">
        <div class="score-display">${game.homeScore} vs ${game.awayScore}</div>
        <div class="status-text">경기 중</div>
      </div>
    `;
  }

  // 3) 종료 or 무승부
  const isDraw = game.homeScore === game.awayScore;
  return `
    <div class="game-status" data-status="${st}">
      ${
        (st === '투표 중' || st === '경기 취소')
          ? `<div class="status-text">${st}</div><div class="game-time">${game.time || ''}</div>`
        : (st === '경기 중')
          ? `<div class="score-display">${game.homeScore} vs ${game.awayScore}</div><div class="status-text">경기 중</div>`
        : (() => {
            const draw = game.homeScore === game.awayScore;
            return `<div class="score-display">${game.homeScore} vs ${game.awayScore}</div>
                    <div class="status-text">${draw ? '무승부' : '종료'}</div>`;
          })()
      }
    </div>
  `;
}

// ======================
// 2. 제출 버튼 핸들러
// ======================
function setupSubmitHandler() {
  const state = window.appState;

  $(document)
    .off('click', '#submit-allkill-btn')
    .on('click', '#submit-allkill-btn', function() {
      if (state.currentDay !== state.today + 1) return;

      const totalGames    = kboGames.length;
      const selectedCount = Object.keys(state.selectedTeams).length;

      if (selectedCount < totalGames) {
        alert('모든 경기를 선택해주세요.');
        return;
      }

      alert(
        '제출완료 !\n' +
        '경기시작 전 까지\n' +
        '수정이 가능합니다.'
      );

      // 타임스탬프 생성
      const now     = new Date();
      const month   = now.getMonth() + 1;
      const day     = now.getDate();
      const hour    = now.getHours();
      const minute  = now.getMinutes().toString().padStart(2, '0');
      const stamp   = `${month}월 ${day}일 ${hour}:${minute}`;

      // 제목 변경 & subtitle 교체 & 버튼 텍스트 변경
      const $section = $('#team-selection-section-tomorrow');
      $section.find('.team-selection-title')
        .contents()
        .filter((_, el) => el.nodeType === 3)
        .remove()
        .end()
        .prepend('제출 완료 !');
      $section.find('.subtitle').text(stamp);
      $section.find('#submit-allkill-btn')
        .text('제출 완료 !')
        .append('<div class="spark"></div><div class="spark"></div><div class="spark"></div>');
    });
}

// ======================
// 3. 섹션 초기화
// ======================
function initTeamSelectionSection() {
  const state = window.appState;
  const { today, currentDay } = state;

  // Date Nav 계산
  const prevDay    = currentDay - 1;
  const nextDay    = currentDay + 1;
  const labelToday = currentDay === today ? 'Today' : currentDay;

  // Date Navigation HTML
  const dateNavHtml = `
    <div class="date-navigation">
      <div class="date-nav-prev" id="date-nav-prev">
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-left"></div>
        </div>
        <span class="prev-day" id="prev-day">${prevDay}</span>
      </div>
      <span class="current-day" id="current-day">${labelToday}</span>
      <div class="date-nav-next" id="date-nav-next">
        <span class="next-day" id="next-day">${nextDay}</span>
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>
  `;

  // 날짜별 콘텐츠 결정
  let contentHtml = '';

  if (currentDay === today + 1) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img src="…left.png" class="pointing-finger pointing-finger-left" alt="Left">
          올킬 도전!
          <img src="…right.png" class="pointing-finger pointing-finger-right" alt="Right">
          <span class="subtitle"></span>
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            올킬 제출
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img src="…left.png" class="pointing-finger pointing-finger-left" alt="Left">
          채점 중 !
          <img src="…right.png" class="pointing-finger pointing-finger-right" alt="Right">
          <span class="subtitle">1 경기 성공 !</span>
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            <span class="button-line">2경기 성공!</span>
            <span class="button-line">채점 중</span>
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today - 1) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
        <h2 class="team-selection-title">
          다음 경기 도전 !<br/>
          <span class="subtitle">3 경기 성공!</span>
          <img src="…yesterday.png" class="yesterday-icon right" alt="Icon">
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            다음 경기 도전!
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today - 2) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day24" style="position: relative;">
        <h2 class="team-selection-title">올킬 성공!</h2>
        <img src="…stamp.png" class="allkill-stamp" alt="Stamp" />
        <div class="game-list" id="day24-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            올킬 성공!
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today - 3) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day23">
        <h2 class="team-selection-title">
          다음 올킬 도전 !<br/>
          <span class="subtitle">2경기 이상 경기 취소</span>
          <img src="…cancel.png" class="yesterday-icon right" alt="Icon">
        </h2>
        <div class="game-list" id="day23-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            다음 경기 도전!
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
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

  $('#kbo-selection-container').html(dateNavHtml + contentHtml);
  renderGames();
  setupDateNavigationHandlers();
  setupSubmitHandler();
}

// ======================
// 4. 렌더링 로직
// ======================
function renderGames() {
  const { currentDay, today } = window.appState;

  if      (currentDay === today + 1) renderTomorrowGames();
  else if (currentDay === today)     renderTodayGames();
  else if (currentDay === today - 1) renderYesterdayGames();
  else if (currentDay === today - 2) renderDay24Games();
  else if (currentDay === today - 3) renderDay23Games();
}

function renderTomorrowGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;

  const html = kboGames.map((game, i) => {
    const bg = i % 2 === 0 ? 'alternate-bg' : '';
    const homeSel = state.selectedTeams[game.id] === 'home' ? 'selected-home' : '';
    const awaySel = state.selectedTeams[game.id] === 'away' ? 'selected-away' : '';
    const homeHigh = game.homeTeam.votes >= game.awayTeam.votes ? 'higher' : 'lower';
    const awayHigh = game.awayTeam.votes >= game.homeTeam.votes ? 'higher' : 'lower';

    return `
      <div class="game-item ${bg}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box ${homeSel}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${awaySel}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');

  $('#game-list').html(html);
  setupTeamSelectionHandlers();
}

function renderTodayGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;

  const html = todayResults.map((game,i) => {
    const bg = i % 2 === 0 ? 'alternate-bg' : '';
    const homeSel = state.selectedTeams[game.id]==='home'?'selected-home':'';
    const awaySel = state.selectedTeams[game.id]==='away'?'selected-away':'';
    const homeHigh = game.homeTeam.votes>=game.awayTeam.votes?'higher':'lower';
    const awayHigh = game.awayTeam.votes>=game.homeTeam.votes?'higher':'lower';

    return `
      <div class="game-item ${bg}" data-index="${game.id}">
        ${i===1?`<div class="red-circle-container"><img class="red-circle-image" src="…red.png" alt="Highlight"></div>`:''}
        <div class="team-column">
          <div class="team-box ${homeSel}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${awaySel}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');

  $('#game-list').html(html);
  setupTeamSelectionHandlers();
}

function renderYesterdayGames() {
  const { formatNumber } = window.utils;
  const html = yesterdayResults.map((game,i) => {
    const bg = i%2===0?'alternate-bg':'';
    const disabled = game.correct===false?'disabled':'';
    const homeHigh = game.homeTeam.votes>=game.awayTeam.votes?'higher':'lower';
    const awayHigh = game.awayTeam.votes>=game.homeTeam.votes?'higher':'lower';
    const mark = game.correct
      ? `<div class="red-circle-container"><img class="red-circle-image" src="…red.png" alt=""></div>`
      : '';
    return `
      <div class="match-result ${bg} ${disabled}" data-index="${game.id}">
        ${mark}
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner?'selected-home':''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner?'selected-away':''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');
  $('#yesterday-game-list').html(html);
}

function renderDay24Games() {
  const { formatNumber } = window.utils;
  const html = dayBeforeYesterdayResults.map((game,i) => {
    const bg = i%2===0?'alternate-bg':'';
    const disabled = game.correct===false?'disabled':'';
    const homeHigh = game.homeTeam.votes>=game.awayTeam.votes?'higher':'lower';
    const awayHigh = game.awayTeam.votes>=game.homeTeam.votes?'higher':'lower';
    const mark = game.correct
      ? `<div class="red-circle-container"><img class="red-circle-image" src="…red.png" alt=""></div>`
      : '';
    return `
      <div class="match-result ${bg} ${disabled}" data-index="${game.id}">
        ${mark}
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner?'selected-home':''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner?'selected-away':''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');
  $('#day24-game-list').html(html);
}

function renderDay23Games() {
  const { formatNumber } = window.utils;
  const html = day23Results.map((game,i) => {
    const bg = i%2===0?'alternate-bg':'';
    const disabled = game.correct===false?'disabled':'';
    const homeHigh = game.homeTeam.votes>=game.awayTeam.votes?'higher':'lower';
    const awayHigh = game.awayTeam.votes>=game.homeTeam.votes?'higher':'lower';
    const mark = game.correct
      ? `<div class="red-circle-container"><img class="red-circle-image" src="…red.png" alt=""></div>`
      : '';
    return `
      <div class="match-result ${bg} ${disabled}" data-index="${game.id}">
        ${mark}
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner?'selected-home':''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner?'selected-away':''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');
  $('#day23-game-list').html(html);
}

// ======================
// 5. 네비게이션 & 선택 핸들러
// ======================
function setupDateNavigationHandlers() {
  const state = window.appState;

  function resetToDefaultSelections() {
    if (!Array.isArray(window.todayResults)) return {};
    return window.todayResults.reduce((acc, g) => {
      // 첫 5경기만 기본 선택
      acc[g.id] = ['home','away','away','home','home'][g.id];
      return acc;
    }, {});
  }

  $('#date-nav-prev').on('click', () => {
    state.currentDay--;
    if (state.currentDay === state.today) {
      state.selectedTeams = resetToDefaultSelections();
    }
    initTeamSelectionSection();
  });

  $('#date-nav-next').on('click', () => {
    state.currentDay++;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });

  $('#current-day').on('click', () => {
    state.currentDay = state.today;
    state.selectedTeams = resetToDefaultSelections();
    initTeamSelectionSection();
  });

  $('#prev-day').on('click', e => {
    e.stopPropagation();
    state.currentDay--;
    if (state.currentDay === state.today) {
      state.selectedTeams = resetToDefaultSelections();
    }
    initTeamSelectionSection();
  });

  $('#next-day').on('click', e => {
    e.stopPropagation();
    state.currentDay++;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });

  $(document)
    .off('click', '#yesterday-nav-btn')
    .on('click', '#yesterday-nav-btn', () => {
      state.currentDay = state.today + 1;
      state.selectedTeams = {};
      initTeamSelectionSection();
    });

  $(document).on(
    'click',
    '#state-yesterday .team-selection-submit button, #team-selection-section-day24 .team-selection-submit button',
    () => {
      state.currentDay = state.today + 1;
      state.selectedTeams = {};
      initTeamSelectionSection();
    }
  );
}

function setupTeamSelectionHandlers() {
  const state = window.appState;

  $('.team-box').off('click').on('click', function() {
    const gameId = +$(this).data('game-id');
    const team   = $(this).data('team');
    state.selectedTeams[gameId] = team;
    updateTeamSelections();
    updateSubmitButton();

    // 이미 제출 완료 상태면 '수정 제출'로 변경
    if (state.currentDay === state.today + 1 &&
        $('#team-selection-section-tomorrow .team-selection-title').text().startsWith('제출 완료')) {
      $('#submit-allkill-btn')
        .text('수정 제출 !')
        .append('<div class="spark"></div><div class="spark"></div><div class="spark"></div>');
    }
  });
}

function updateTeamSelections() {
  const state = window.appState;
  Object.entries(state.selectedTeams).forEach(([id, team]) => {
    $(`.team-box[data-game-id="${id}"]`).removeClass('selected-home selected-away');
    $(`.team-box[data-game-id="${id}"][data-team="${team}"]`)
      .addClass(`selected-${team}`);
  });
}

function updateSubmitButton() {
  const state = window.appState;
  if (state.currentDay !== state.today + 1) return;

  const $btn = $('#submit-allkill-btn');
  if (!$btn.length) return;

  const allGames = kboGames.length;
  const selected = Object.keys(state.selectedTeams).length === allGames;

  if (selected) {
    $btn.addClass('enabled').prop('disabled', false).css({ opacity: 1, color: '#121212' });
  } else {
    $btn.removeClass('enabled').prop('disabled', true).css({ opacity: 0.3, color: 'rgba(18,18,18,0.7)' });
  }
}

// ======================
// 6. 내보내기
// ======================
window.teamSelectionSection = {
  init: initTeamSelectionSection,
  updateTeamSelections
};
