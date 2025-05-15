// teamSelection.js

(function($) {
  // ==============================
  // 1. 설정 및 상태 변수
  // ==============================
  const containerSelector = '#kbo-selection-container';
  const sectionId         = 'team-selection-section';
  const gameListId        = 'game-list';
  const prevBtnId         = 'date-nav-prev';
  const nextBtnId         = 'date-nav-next';
  const currentDayId      = 'current-day';
  // 디자인 시안대로 사용 중인 스탬프 이미지(기존 base64 또는 URL)
  const stampImgSrc       = 'data:image/png;base64,…';  
  const initialTitle      = '올킬 도전!';         // (필요 시 동적 변경 로직 추가 가능)
  const submitBtnText     = '다음 경기 도전!';

  // 1) matchData에 정의된 날짜 키(YYYY-MM-DD) 배열 구하기
  const rawKeys = Object.keys(window.matchData);

  // 2) rawKeys 중 최소·최대 날짜(Date 객체) 계산
  const dates   = rawKeys.map(k => new Date(k));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  // 3) minDate부터 maxDate까지 하루씩 증가시키며
  //    범위 내 모든 날짜(YYYY-MM-DD)를 dateKeys 배열에 담기
  const dateKeys = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    dateKeys.push(d.toISOString().slice(0,10));
  }

  const todayKey   = new Date().toISOString().slice(0,10);
  let currentIndex = dateKeys.indexOf(todayKey);
  if (currentIndex === -1) currentIndex = 0;

  // ==============================
  // 2. 초기화 함수
  // ==============================
  function initTeamSelectionSection() {
    renderNav();
    renderSection();
    setupNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
  }

// ==============================
// 3. 날짜 내비게이션 렌더링
// ==============================
function renderNav() {
  // 이전·다음 날짜 키 가져오기
  const prevKey = currentIndex > 0
    ? dateKeys[currentIndex - 1]
    : '';
  const nextKey = currentIndex < dateKeys.length - 1
    ? dateKeys[currentIndex + 1]
    : '';

  // YYYY-MM-DD 키를 화면에 표시할 레이블로 변환
  function dayLabel(key) {
    if (!key) return '';
    if (key === todayKey) return 'Today';
    return key.split('-')[2];   // '2025-05-15' → '15'
  }

  const prevLabel    = dayLabel(prevKey);
  const currentLabel = dayLabel(dateKeys[currentIndex]);
  const nextLabel    = dayLabel(nextKey);

  const navHtml = `
    <div class="date-navigation">
      <div class="date-nav-prev" id="${prevBtnId}">
        <div class="arrow-left"></div>
        <span class="prev-day">${prevLabel}</span>
      </div>
      <span class="current-day" id="${currentDayId}">
        ${currentLabel}
      </span>
      <div class="date-nav-next" id="${nextBtnId}">
        <span class="next-day">${nextLabel}</span>
        <div class="arrow-right"></div>
      </div>
    </div>
  `;

  // 내비게이션 마크업 갱신
  $(containerSelector).html(navHtml);
}

  // ==============================
  // 4. 메인 섹션(타이틀·스탬프·게임 리스트·버튼) 렌더링
  // ==============================
  function renderSection() {
    const sectionHtml = `
      <div class="team-selection-section" id="${sectionId}">
        <h2 class="team-selection-title">${initialTitle}</h2>
        <img src="${stampImgSrc}" class="allkill-stamp" alt="Stamp" />
        <div class="game-list" id="${gameListId}"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            ${submitBtnText}
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
    $(containerSelector).append(sectionHtml);
    renderGames();
  }

  // ==============================
  // 5. 경기 리스트 렌더링
  // ==============================
  function renderGames() {
    const key     = dateKeys[currentIndex];
    const matches = window.matchData[key] || [];
    const $list   = $(`#${gameListId}`).empty();

    matches.forEach(match => {
      const homeSelClass  = window.appState.selectedTeams[match.gameId] === 'home' ? 'selected-home' : '';
      const awaySelClass  = window.appState.selectedTeams[match.gameId] === 'away' ? 'selected-away' : '';
      const homeHighClass = match.home.votes >= match.away.votes ? 'higher' : 'lower';
      const awayHighClass = match.away.votes >= match.home.votes ? 'higher' : 'lower';
      const statusSection = renderStatusSection(match);

      const itemHtml = `
        <div class="game-item" data-game-id="${match.gameId}">
          <div class="team-column">
            <div class="team-box ${homeSelClass}" data-game-id="${match.gameId}" data-team="home">
              <img class="team-logo" src="${match.home.logo}" alt="${match.home.teamName}" />
              <span class="team-name">${match.home.teamName}</span>
            </div>
            <div class="vote-count ${homeHighClass}">${match.home.votes}</div>
          </div>
          ${statusSection}
          <div class="team-column">
            <div class="team-box ${awaySelClass}" data-game-id="${match.gameId}" data-team="away">
              <img class="team-logo" src="${match.away.logo}" alt="${match.away.teamName}" />
              <span class="team-name">${match.away.teamName}</span>
            </div>
            <div class="vote-count ${awayHighClass}">${match.away.votes}</div>
          </div>
        </div>
      `;
      $list.append(itemHtml);
    });

    updateSubmitButton();
  }

  // ==============================
  // 6. 상태별 UI 분기 (pre / live / post)
  // ==============================
function renderStatusSection(match) {
  // 경기 전
  if (match.status === 'pre') {
    return `
      <div class="status-column status-pre">
        <div class="status-text">경기전</div>
        <div class="start-time">${match.startTime}</div>
      </div>
    `;
  }

  // 경기 중
  if (match.status === 'live') {
    return `
      <div class="status-column status-live">
        <div class="score">
          <span class="home-score">${match.score.home}</span>
          <span class="vs">vs</span>
          <span class="away-score">${match.score.away}</span>
        </div>
        <div class="status-text">경기중</div>
      </div>
    `;
  }

  // 종료
  if (match.status === 'post') {
    return `
      <div class="status-column status-post">
        <div class="score">
          <span class="home-score">${match.score.home}</span>
          <span class="vs">vs</span>
          <span class="away-score">${match.score.away}</span>
        </div>
        <div class="status-text">경기종료</div>
      </div>
    `;
  }

  return `<div class="status-column"></div>`;
}

  // ==============================
  // 7. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const $btn    = $('#submit-allkill-btn');
    const matches = window.matchData[dateKeys[currentIndex]] || [];
    const allSelected = matches.every(m => window.appState.selectedTeams[m.gameId] != null);

    if (allSelected) {
      $btn.addClass('enabled').prop('disabled', false).css({ opacity: 1, color: '#121212' });
    } else {
      $btn.removeClass('enabled').prop('disabled', true).css({ opacity: 0.3, color: 'rgba(18,18,18,0.7)' });
    }
  }

  // ==============================
  // 8. 내비게이션 이전/다음 핸들러
  // ==============================
  function setupNavHandlers() {
  // 이전 버튼 클릭 (부모 컨테이너에 위임)
  $(containerSelector)
    .off('click', `#${prevBtnId}`)
    .on('click', `#${prevBtnId}`, () => {
      if (currentIndex > 0) {
        currentIndex--;
        refreshAll();     // <-- 전체 섹션(nav + games)을 다시 렌더
      }
    });

  $(containerSelector)
    .off('click', `#${nextBtnId}`)
    .on('click', `#${nextBtnId}`, () => {
      if (currentIndex < dateKeys.length - 1) {
        currentIndex++;
        refreshAll();     // <-- 전체 섹션(nav + games)을 다시 렌더
      }
    });
}


  // ==============================
  // 9. 팀 선택 클릭 핸들러
  // ==============================
  function setupTeamSelectionHandlers() {
    $(`#${gameListId}`)
      .off('click', '.team-box')
      .on('click', '.team-box', function() {
        const $this  = $(this);
        const gameId = $this.data('game-id');
        const team   = $this.data('team');

        window.appState.selectedTeams = window.appState.selectedTeams || {};
        window.appState.selectedTeams[gameId] = team;

        renderGames();
      });
  }

  // ==============================
  // 10. 제출 버튼 클릭 핸들러
  // ==============================
  function setupSubmitHandler() {
    $('#submit-allkill-btn').on('click', function() {
      // 기존에 작성하셨던 제출 로직(서버 호출 등)을 그대로 호출하세요.
      console.log('팀 선택 제출:', window.appState.selectedTeams);
    });
  }

  // ==============================
  // 11. 전체 화면 새로고침
  // ==============================
  function refreshAll() {
    renderNav();
    $(`#${sectionId}`).remove();
    renderSection();
    setupNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
  }

  // ==============================
  // 12. 외부에 노출할 API
  // ==============================
  window.teamSelectionSection = {
    init: initTeamSelectionSection,
    updateTeamSelections: (gameId, team) => {
      window.appState.selectedTeams = window.appState.selectedTeams || {};
      window.appState.selectedTeams[gameId] = team;
    }
  };
})(jQuery);
