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
  const initialTitle      = '올킬 도전!';
  const submitBtnText     = '다음 경기 도전!';

  // 카운트다운 타이머 ID
  let countdownTimerId = null;
  
  // 제출 시각을 날짜별로 저장할 맵
  window.appState.submissionTimes = window.appState.submissionTimes || {};


  // ==============================
  // 2. 날짜 키 배열 생성
  // ==============================
  const rawKeys = Object.keys(window.matchData);
  const dates   = rawKeys.map(k => new Date(k).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const dateKeys = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    dateKeys.push(d.toISOString().slice(0,10));
  }

  const todayKey   = new Date().toISOString().slice(0,10);
  let currentIndex = dateKeys.indexOf(todayKey);
  if (currentIndex === -1) currentIndex = 0;

  // ==============================
  // 3. 초기화
  // ==============================
  function initTeamSelectionSection() {
    renderNav();
    renderSection();
    setupNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
  }

  // ==============================
  // 4. 내비게이션 렌더링
  // ==============================
  function renderNav() {
    const prevKey = currentIndex > 0 ? dateKeys[currentIndex - 1] : '';
    const nextKey = currentIndex < dateKeys.length - 1 ? dateKeys[currentIndex + 1] : '';

    function dayLabel(key) {
      if (!key) return '';
      if (key === todayKey) return 'Today';
      return key.split('-')[2];
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
    $(containerSelector).html(navHtml);
  }

  // ==============================
  // 5. 섹션 렌더링
  // ==============================
  function renderSection() {
    const sectionHtml = `
      <div class="team-selection-section" id="${sectionId}">
        <h2 class="team-selection-title">
          <span class="title-main">${initialTitle}</span>
          <span class="title-sub"></span>
        </h2>
        <div class="game-list" id="${gameListId}"></div>
        <div class="team-selection-submit">
        <button id="submit-allkill-btn" class="mega-sparkle-btn">
          <span class="btn-text">${submitBtnText}</span>
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
          </button>
        </div>
      </div>
    `;
    $(containerSelector).append(sectionHtml);
    renderGames();
  }

  // ==============================
  // 6. 경기 리스트 렌더링
  // ==============================
  function renderGames() {
    const key     = dateKeys[currentIndex];
    const matches = window.matchData[key] || [];
    const $list   = $(`#${gameListId}`).empty();

    matches.forEach(match => {
      const selected     = window.appState.selectedTeams?.[match.gameId] ?? match.userSelection;
      const homeSelClass = selected === 'home' ? 'selected-home' : '';
      const awaySelClass = selected === 'away' ? 'selected-away' : '';
      const homeHigh     = match.home.votes >= match.away.votes ? 'higher' : 'lower';
      const awayHigh     = match.away.votes >= match.home.votes ? 'higher' : 'lower';
      const statusSection = renderStatusSection(match);

      const itemHtml = `
        <div class="game-item" data-game-id="${match.gameId}">
          <div class="team-column">
            <div class="team-box ${homeSelClass}" data-game-id="${match.gameId}" data-team="home">
              <img class="team-logo" src="${match.home.logo}" alt="${match.home.teamName}" />
              <span class="team-name">${match.home.teamName}</span>
            </div>
            <div class="vote-count ${homeHigh}">${match.home.votes}</div>
          </div>

          ${statusSection}

          <div class="team-column">
            <div class="team-box ${awaySelClass}" data-game-id="${match.gameId}" data-team="away">
              <img class="team-logo" src="${match.away.logo}" alt="${match.away.teamName}" />
              <span class="team-name">${match.away.teamName}</span>
            </div>
            <div class="vote-count ${awayHigh}">${match.away.votes}</div>
          </div>
        </div>
      `;
      $list.append(itemHtml);
    });

    updateSubmitButton();
    updateTitleAndCountdown();
  }

  // ==============================
  // 7. 상태별 UI 분기
  // ==============================
  function renderStatusSection(match) {
    const s = match.status;
    const homeScoreClass = match.score?.home > match.score?.away ? 'higher' : '';
    const awayScoreClass = match.score?.away > match.score?.home ? 'higher' : '';

    if (s === '경기중') {
      return `
        <div class="status-column status-live">
          <div class="score">
            <span class="home-score ${homeScoreClass}">${match.score.home}</span>
            <span class="vs">vs</span>
            <span class="away-score ${awayScoreClass}">${match.score.away}</span>
          </div>
          <div class="status-text">경기중</div>
        </div>
      `;
    }

    if (s === '경기종료') {
      return `
        <div class="status-column status-post">
          <div class="score">
            <span class="home-score ${homeScoreClass}">${match.score.home}</span>
            <span class="vs">vs</span>
            <span class="away-score ${awayScoreClass}">${match.score.away}</span>
          </div>
          <div class="status-text">경기종료</div>
        </div>
      `;
    }

    // 경기전 & 기타 상태
    return `
      <div class="status-column status-pre">
        <div class="status-text">${s}</div>
        ${match.startTime ? `<div class="start-time">${match.startTime}</div>` : ''}
      </div>
    `;
  }

  // ==============================
  // 8. 타이틀 파트 계산
  // ==============================
  function computeTitleParts() {
  const key      = dateKeys[currentIndex];
  const matches  = window.matchData[key] || [];
  const selMap   = window.appState.selectedTeams || {};
  const finished = ['경기종료','경기취소','경기지연','경기중지','서스펜드','우천취소'];

  // ➤ 1) 제출 완료(그 날짜에만)
   // 1) 제출 완료(날짜별 기록) 체크
   const submittedAt = window.appState.submissionTimes?.[key];
   if (submittedAt) {
     const mm = submittedAt.getMonth()+1;
     const dd = submittedAt.getDate();
     const hh = String(submittedAt.getHours()).padStart(2,'0');
     const mi = String(submittedAt.getMinutes()).padStart(2,'0');
     return { main: '제출 완료 !', sub:  `${mm}월 ${dd}일 ${hh}:${mi}` };
   }

  // ➤ 2) 모두 경기전 & 미선택
   const allPre  = matches.every(m => m.status === '경기전');
   if (allPre) {
  
    return { main: '올킬 도전!', sub: '참여시간 ' };
  }

  // ➤ 3) 경기중 한 건이라도
  if (matches.some(m => m.status === '경기중')) {
    const ok = matches.filter(m => m.eventResult === 'success').length;
    return { main: '채점 중!', sub: `${ok} 경기 성공 !` };
  }

  // ➤ 4) 모두 완료 상태
  if (matches.length > 0 && matches.every(m => finished.includes(m.status))) {
    const ok    = matches.filter(m => m.eventResult === 'success').length;
    const allOK = ok === matches.length;
    if (allOK) {
      return { main: '올킬 성공 !', sub: '상금을 확인하세요 !' };
    } else {
      return { main: '다음 경기 도전 !', sub: `${ok} 경기 성공 !` };
    }
  }

  // ➤ 5) 기본
  return { main: initialTitle, sub: '' };
  }


  // ==============================
  // 9. 타이틀 & 카운트다운 업데이트
  // ==============================
  function updateTitleAndCountdown() {
    const key     = dateKeys[currentIndex];
    const matches = window.matchData[key] || [];
    const selMap  = window.appState.selectedTeams || {};
    const allPre  = matches.every(m => m.status === '경기전');
    const allNone = matches.every(m => (selMap[m.gameId] ?? m.userSelection) === 'none');
    const submittedAt = window.appState.submissionTimes?.[key];
    // 메인/서브 텍스트 설정
    $('.team-selection-title .title-main').text(computeTitleParts().main);
    $('.team-selection-title .title-sub')
    .text(computeTitleParts().sub)
    .toggleClass('countdown-active', allPre && !submittedAt);

    // 카운트다운 실행/중지
    if (allPre && !submittedAt) {
      const [h, mi]     = matches[0].startTime.split(':').map(Number);
      const [yy, mo, dd]= key.split('-').map(Number);
      const target      = new Date(yy, mo - 1, dd, h, mi);
      startCountdown(target);
  } else {
      if (countdownTimerId) {
        clearInterval(countdownTimerId);
        countdownTimerId = null;
      }
    }
  }

  // ==============================
  // 10. 카운트다운 시작 함수
  // ==============================
  function startCountdown(targetDate) {
    if (countdownTimerId) clearInterval(countdownTimerId);

    function update() {
      const now  = new Date();
      let diff   = Math.floor((targetDate - now) / 1000);
      if (diff < 0) diff = 0;

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const text = `-${h}:${String(m).padStart(2, '0')}`;

      $('.team-selection-title .title-sub').text(`참여시간 ${text}`);
    }

    update();
    countdownTimerId = setInterval(update, 1000);
  }

  // ==============================
  // 11. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const $btn    = $('#submit-allkill-btn');
    const matches= window.matchData[dateKeys[currentIndex]] || [];
    const allSel = matches.every(m => window.appState.selectedTeams?.[m.gameId] != null);

    if (allSel) {
      $btn.addClass('enabled').prop('disabled', false)
          .css({ opacity: 1, color: '#121212' });
    } else {
      $btn.removeClass('enabled').prop('disabled', true)
          .css({ opacity: 0.3, color: 'rgba(18,18,18,0.7)' });
    }
  }

  // ==============================
  // 12. 내비게이션 핸들러
  // ==============================
  function setupNavHandlers() {
    $(containerSelector)
      .off('click', `#${prevBtnId}`)
      .on('click', `#${prevBtnId}`, () => {
        if (currentIndex > 0) {
          currentIndex--;
          refreshAll();
        }
      });

    $(containerSelector)
      .off('click', `#${nextBtnId}`)
      .on('click', `#${nextBtnId}`, () => {
        if (currentIndex < dateKeys.length - 1) {
          currentIndex++;
          refreshAll();
        }
      });
  }

  // ==============================
  // 13. 팀 선택 핸들러
  // ==============================
  function setupTeamSelectionHandlers() {
    $(`#${gameListId}`)
      .off('click', '.team-box')
      .on('click', '.team-box', function() {
        const gameId = $(this).data('game-id');
        const team   = $(this).data('team');
        window.appState.selectedTeams = window.appState.selectedTeams || {};
        window.appState.selectedTeams[gameId] = team;
        renderGames();
      });
  }

  // ==============================
  // 14. 제출 핸들러
  // ==============================
    function setupSubmitHandler() {
    $('#submit-allkill-btn').on('click', function() {
      const key = dateKeys[currentIndex];
      window.appState.submissionTimes[key] = new Date();  // 오늘 날짜 기준 제출 시각 저장
      updateTitleAndCountdown();
      });
    }
  
  // ==============================
  // 15. 전체 갱신
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
  // 16. 외부 API 노출
  // ==============================
  window.teamSelectionSection = {
    init: initTeamSelectionSection,
    updateTeamSelections: (gameId, team) => {
      window.appState.selectedTeams = window.appState.selectedTeams || {};
      window.appState.selectedTeams[gameId] = team;
    }
  };
})(jQuery);
