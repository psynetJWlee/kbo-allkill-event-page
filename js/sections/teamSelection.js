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

  const submitBtnPlaceholder = '제출하기';

  let countdownTimerId = null;
  // 시, 분, 초의 개별 자릿수 추적 (100의 자리 추가)
  let previousHoursHundreds = null;
  let previousHoursTens = null;
  let previousHoursOnes = null;
  let previousMinutesTens = null;
  let previousMinutesOnes = null;
  let previousSecondsTens = null;
  let previousSecondsOnes = null;

  window.appState.submissionTimes = window.appState.submissionTimes || {};
  let localEventStatusMap = {};

  // ==============================
  // 2. 날짜 키 배열 생성 (정렬 보장)
  // ==============================
  function formatLocalDate(d) {
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    return `${Y}-${M}-${D}`;
  }
  // 날짜 처리: key 정렬(오름차순) 보장
  const rawKeys = Object.keys(window.matchData);
  const sortedKeys = rawKeys.slice().sort((a, b) => new Date(a) - new Date(b));
  const dates   = sortedKeys.map(k => new Date(k).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const minKey = formatLocalDate(minDate);
  const maxKey = formatLocalDate(maxDate);
  const dateKeys = [];
  {
    let cur = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const end = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    while (cur <= end) {
      dateKeys.push(formatLocalDate(cur));
      cur.setDate(cur.getDate() + 1);
    }
  }

  const todayKey = formatLocalDate(new Date());
  let currentIndex = dateKeys.indexOf(todayKey);
  if (currentIndex < 0) currentIndex = 0;

  // ==============================
  // 3~5. 초기화/네비/섹션 렌더링
  // ==============================
  function initTeamSelectionSection() {
    renderNav();
    renderSection();
    setupNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
  }

  function renderNav() {
    const prevKey = currentIndex > 0 ? dateKeys[currentIndex - 1] : '';
    const nextKey = currentIndex < dateKeys.length - 1 ? dateKeys[currentIndex + 1] : '';

    // prev/next 버튼용 함수 (dd 형식)
    function dayLabel(k) {
      if (!k) return '';
      const [year, month, day] = k.split('-');
      return `${parseInt(day)}`;
    }

    // 가운데 현재 날짜용 함수 (오늘만 Today, 그 외 MM/DD)
    function currentDayLabel(k) {
      if (!k) return '';
      if (dateKeys[currentIndex] === todayKey) return 'Today';
      const [year, month, day] = k.split('-');
      return `${parseInt(month)}/${parseInt(day)}`;
    }

    const html = `
      <div class="date-navigation">
        <div id="${prevBtnId}" class="date-nav-prev" ${prevKey ? '' : 'style="visibility:hidden;"'}>
          <div class="arrow-left"></div>
          <span class="prev-day">${dayLabel(prevKey)}</span>
        </div>
        <span id="${currentDayId}" class="current-day${dateKeys[currentIndex]===todayKey ? ' today-active' : ''}" style="cursor:pointer;">${currentDayLabel(dateKeys[currentIndex])}</span>
        <div id="${nextBtnId}" class="date-nav-next" ${nextKey ? '' : 'style="visibility:hidden;"'}>
          <span class="next-day">${dayLabel(nextKey)}</span>
          <div class="arrow-right"></div>
        </div>
      </div>
    `;
    $(containerSelector).html(html);
  }

  function renderSection() {
    // 현재 날짜의 eventStatus 확인
    const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' 
      ? localEventStatusMap[key] 
      : data.eventStatus;

    // IN_PROGRESS_USER_SELECTED일 때만 spinner 추가

    // NO_GAMES_EVENT_DISABLED 상태면 숨김 처리용 스타일 추가
    const hideGameList = effStatus === 'NO_GAMES_EVENT_DISABLED' ? 'style="display:none"' : '';
    

    const html = `
      <div id="${sectionId}" class="team-selection-section">
        <div class="title-wrapper">
          <h2 class="team-selection-title">
            <div class="title-main-row">
              <span class="title-main"></span>
            </div>
            <span class="title-sub"></span>
          </h2>
        </div>
        <div id="${gameListId}" class="game-list" ${hideGameList}></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            <span class="btn-text">${submitBtnPlaceholder}</span>
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
    $(containerSelector).append(html);
    renderGames();
  }

  // ==============================
  // 6. 경기 리스트 렌더링 (overlay 복원)
  // ==============================
  function renderGames() {
    const key     = dateKeys[currentIndex];
    const data    = window.matchData[key] || { eventStatus: '', games: [] };
    const matches = data.games || [];
    const $list   = $(`#${gameListId}`).empty();

    if (!matches.length || matches.every(m => m.gameId === 'null')) {
      $list.html('<div class="no-game">경기가 없습니다.</div>');
      updateSubmitButton();
      updateTitleAndCountdown();
      return;
    }

    matches.forEach(match => {
      if (match.gameId === 'null') {
        $list.append(`<div class="game-item placeholder"><div class="game-row row1"></div><div class="game-row row2"></div></div>`);
        return;
      }

      const isSuspended = ["서스펜드","우천취소","경기취소"].includes(match.status);
      const isFailed    = match.status==="경기종료" && match.eventResult==="fail";
      const fadeClass   = match.eventResult==='fail' ? 'faded' : '';

      const $item = $('<div>')
        .addClass('game-item')
        .toggleClass('disabled', isSuspended||isFailed)
        .addClass(fadeClass)
        .attr('data-game-id', match.gameId);

      // === overlay logic (클래스명 통합) ===
      if (match.eventResult === 'success') {
        $item.append('<img class="event-overlay success" src="/image/event-overlay%20success.png" alt="성공" />');
      } else if (match.eventResult === 'fail') {
        $item.append('<img class="event-overlay fail" src="/image/event-overlay%20fail.png" alt="실패" />');
      }

      // ─── row1: 홈/시간/원정 ─────────────────────────────
      const $row1 = $('<div>').addClass('game-row row1');
      // score 표시
      let homeScore = null, awayScore = null, isDraw = false;
      if (match.score && typeof match.score.home === 'number' && typeof match.score.away === 'number') {
        homeScore = match.score.home;
        awayScore = match.score.away;
        isDraw = homeScore === awayScore;
      }
      // home
      const $home = $('<div>').addClass('home')
        .append(
          $('<img>').addClass('team-logo-small').attr('src', match.home.logo).attr('alt', match.home.teamName),
          $('<div>').addClass('team-name').text(match.home.teamName)
        );
      // team-score(home)
      let $homeScore = $('<div>').addClass('team-score');
      if (homeScore !== null) {
        $homeScore.text(homeScore)
          .css('color', isDraw ? '#000' : (homeScore > awayScore ? '#FF3B30' : '#000'));
      }
      // start-time 또는 status-text
      let $center;
      if (match.status === '경기전') {
        $center = $('<div>').addClass('start-time').text(match.startTime);
      } else {
        $center = $('<div>').addClass('status-text').text(match.status);
      }
      // team-score(away)
      let $awayScore = $('<div>').addClass('team-score');
      if (awayScore !== null) {
        $awayScore.text(awayScore)
          .css('color', isDraw ? '#000' : (awayScore > homeScore ? '#FF3B30' : '#000'));
      }
      // away
      const $away = $('<div>').addClass('away')
        .append(
          $('<img>').addClass('team-logo-small').attr('src', match.away.logo).attr('alt', match.away.teamName),
          $('<div>').addClass('team-name').text(match.away.teamName)
        );
      $row1.append($home, $homeScore, $center, $awayScore, $away);
      $item.append($row1);

      // ─── row2: 팀 선택 박스 3개(승/무/패, 내부에 팀명+득표수) ─────────────
      let sel = window.appState.selectedTeams?.[match.gameId] || match.userSelection;
      const $row2 = $('<div>').addClass('game-row row2');
      ['home','draw','away'].forEach(k => {
        if (k==='draw' && !match.draw) return;
        const obj = k==='draw'? match.draw : match[k];
        let isSelected = sel===k;
        let cls = isSelected ? 'selected' : '';
        // 승/무/패 텍스트 및 team-name 클래스 지정
        let label, nameClass;
        if (k === 'home') {
          label = '승';
          nameClass = 'win button';
        } else if (k === 'draw') {
          label = '무';
          nameClass = 'draw button';
        } else {
          label = '승';
          nameClass = 'lose button';
        }
        const $box = $('<div>')
          .addClass(`team-box ${cls}`)
          .attr('data-game-id', match.gameId)
          .attr('data-team', k)
          .append(
            $('<div>').addClass(nameClass).text(label),
            $('<div>').addClass('vote-count').text(obj.votes)
          );
        if (isSelected) {
          $box.append('<img class="check-icon" src="/image/check.png" alt="check" />');
        }
        $row2.append($box);
      });
      $item.append($row2);

      $list.append($item);
    });

    updateSubmitButton();
    updateTitleAndCountdown();
  }

  // ==============================
  // 7. eventStatus 기반 title/sub 계산 (동적 시간 자릿수 지원)
  // ==============================
  function computeTitleParts() {
    const key  = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    let status = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : data.eventStatus;
    const games  = data.games || [];
    const now    = new Date();
    let main = '', sub = '', statusClass = '', btnText = '';

    // 날짜 포맷 (예: 7월 15일)
    const [year, month, day] = key.split('-');
    const dateStr = `${parseInt(month)}월${parseInt(day)}일`;
    // 내일 날짜 (예: 7월 16일) - 실제 오늘 날짜 기준
    let tomorrowStr = '';
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    tomorrowStr = `${tomorrow.getMonth() + 1}월 ${tomorrow.getDate()}일`;

    // === PENDING_USER_NOT_SELECTED ===
    if (status === 'PENDING_USER_NOT_SELECTED') {
      main = `${dateStr} 올킬 <img src="/image/check.png" alt="check" />`;
      sub = '';
      btnText = '올킬 제출';
      statusClass = 'status-pending-unselected';
    }
    // === PENDING_USER_SELECTED ===
    else if (status === 'PENDING_USER_SELECTED') {
      main = `${dateStr} 올킬 <img src="/image/check.png" alt="check" />`;
      // 수정 제출 여부
      if (isSelectionChanged()) {
        sub = '수정 제출';
        btnText = '수정 제출';
      } else {
        sub = '제출 완료';
        btnText = '제출 완료';
      }
      statusClass = 'status-pending-selected';
    }
    // === IN_PROGRESS_USER_NOT_SELECTED ===
    else if (status === 'IN_PROGRESS_USER_NOT_SELECTED') {
      main = `${dateStr} 올킬`;
      sub = '제출 마감';
      btnText = '제출 마감';
      statusClass = 'status-progress-unselected';
    }
    // === IN_PROGRESS_USER_SELECTED ===
    else if (status === 'IN_PROGRESS_USER_SELECTED') {
      main = `${dateStr} 올킬`;
      sub = '제출 마감';
      btnText = '제출 마감';
      statusClass = 'status-progress-selected';
    }
    // === COMPLETED_USER_SUCCESS ===
    else if (status === 'COMPLETED_USER_SUCCESS') {
      main = `${dateStr} 올킬 <span class="success">당첨</span>`;
      sub = '';
      btnText = '올킬 성공';
      statusClass = '';
    }
    // === COMPLETED_USER_FAIL ===
    else if (status === 'COMPLETED_USER_FAIL') {
      main = `${dateStr} 올킬 <span class="fail">땡</span>`;
      sub = '';
      btnText = tomorrowStr ? `${tomorrowStr}\n올킬 도전` : '올킬 도전';
      statusClass = '';
    }
    // === COMPLETED_USER_NOT_SELECTED ===
    else if (status === 'COMPLETED_USER_NOT_SELECTED') {
      main = `${dateStr} 올킬`;
      sub = '제출 마감';
      btnText = tomorrowStr ? `${tomorrowStr}\n올킬 도전` : '올킬 도전';
      statusClass = 'status-completed-unselected';
    }
    // === NO_GAMES_EVENT_DISABLED ===
    else if (status === 'NO_GAMES_EVENT_DISABLED') {
      main = `${dateStr} 올킬`;
      sub = '경기 없음';
      btnText = tomorrowStr ? `${tomorrowStr}\n올킬 도전` : '올킬 도전';
      statusClass = 'status-no-games';
    }
    // === EVENT_CANCELLED_MULTI_GAMES ===
    else if (status === 'EVENT_CANCELLED_MULTI_GAMES') {
      main = `${dateStr} 올킬 <span class="cancelled">무효</span>`;
      sub = '3경기 이상 취소';
      btnText = tomorrowStr ? `${tomorrowStr}\n올킬 도전` : '올킬 도전';
      statusClass = 'status-cancelled';
    }
    else {
      main = '';
      sub = '';
      btnText = '';
      statusClass = '';
    }

    return { main, sub, statusClass, btnText };
  }

  // ==============================
  // 8. 제목·버튼·카운트다운 동기화 (동적 시간 자릿수 애니메이션)
  // ==============================
  function updateTitleAndCountdown() {
    const parts = computeTitleParts();
    $('.title-main').html(parts.main);  // Changed from .text() to .html()
    $('.title-sub').html(parts.sub); // HTML 사용으로 변경

    // 기존 status 클래스 제거 후 새로운 클래스 적용
    const $titleWrapper = $('.title-wrapper');
    $titleWrapper.removeClass(function(index, className) {
      return (className.match(/\bstatus-\S+/g) || []).join(' ');
    });
    if (parts.statusClass) {
      $titleWrapper.addClass(parts.statusClass);
    }

    // 버튼 텍스트도 상태별로 변경
    $('.btn-text').html(parts.btnText.replace(/\n/g, '<br>'));

    // 카운트다운 등 기존 로직은 모두 생략(불필요)
  }

  // ==============================
  // 9. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]||{}).games||[];
    const baseStatus = (window.matchData[key]||{}).eventStatus;
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : baseStatus;

    // [EVENT_CANCELLED_MULTI_GAMES]일 경우 숨김 처리 코드 삭제

    const allSel = games.length>0 && games.every(g =>
      (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== 'none'
    );
    $('#submit-allkill-btn').show();
  }

  // ==============================
  // 10. 내비게이션 핸들러
  // ==============================
  function setupNavHandlers() {
    $(containerSelector)
      .off('click', `#${prevBtnId}`)
      .off('click', `#${nextBtnId}`)
      .off('click', `#${currentDayId}`)
      .on('click', `#${prevBtnId}`, () => {
        if (currentIndex > 0) {
          currentIndex--;
          refreshAll();
        }
      })
      .on('click', `#${nextBtnId}`, () => {
        if (currentIndex < dateKeys.length - 1) {
          currentIndex++;
          refreshAll();
        }
      })
      .on('click', `#${currentDayId}`, function () {
        // todayKey의 인덱스로 무조건 이동
        const todayIdx = dateKeys.indexOf(todayKey);
        if (todayIdx !== -1 && currentIndex !== todayIdx) {
          currentIndex = todayIdx;
          refreshAll();
        }
      });
  }

  // ==============================
  // 11. 팀 선택 핸들러
  // ==============================
  function canEditSelections() {
    const key = dateKeys[currentIndex];
    const baseStatus = (window.matchData[key]||{}).eventStatus;
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : baseStatus;
    // PENDING_USER_NOT_SELECTED 또는 PENDING_USER_SELECTED에서 선택 가능,
    // EVENT_CANCELLED_MULTI_GAMES에서는 선택 불가!
    return (
      effStatus === 'PENDING_USER_NOT_SELECTED' ||
      effStatus === 'PENDING_USER_SELECTED'
    );
  }

  function isSelectionChanged() {
    // 제출된 값과 현재 선택값 비교
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]?.games) || [];
    // 제출된 값 복원: userSelection
    return games.some(g => 
      (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== g.userSelection
    );
  }

  function setupTeamSelectionHandlers() {
    $(`#${gameListId}`)
      .off('click', '.team-box')
      .on('click', '.team-box', function() {
        if (!canEditSelections()) return;
        const id = $(this).data('game-id'), tm = $(this).data('team');
        // 이미 선택한 팀을 다시 클릭하면 해제
        if (window.appState.selectedTeams[id] === tm) {
          delete window.appState.selectedTeams[id];
        } else {
          window.appState.selectedTeams[id] = tm;
        }
        // 즉시 반영
        renderGames();
      });
  }

  // ==============================
  // 12. 제출 핸들러
  // ==============================
  function setupSubmitHandler() {
    $('#submit-allkill-btn').off('click').on('click', function() {
      const key    = dateKeys[currentIndex];
      const status = (window.matchData[key]?.eventStatus);
      const games  = window.matchData[key]?.games || [];

      // 현재 상태값
      const effStatus = typeof localEventStatusMap[key] !== 'undefined' 
        ? localEventStatusMap[key] 
        : status;

      // 현재 버튼 텍스트 확인
      const currentBtnText = $('.btn-text').text();
      // '다음 올킬 도전', '올킬 도전', 또는 '날짜\n올킬 도전'으로 시작하는 경우 오늘+1일로 이동 (최우선)
      const isGoToTomorrow =
        currentBtnText.startsWith('다음 올킬 도전') ||
        currentBtnText.startsWith('올킬 도전') ||
        /\d+월\s*\d+일\s*올킬 도전/.test(currentBtnText.replace(/\n/g, ''));
      if (isGoToTomorrow) {
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const tomorrowKey = formatLocalDate(tomorrow);
        const tomorrowIndex = dateKeys.indexOf(tomorrowKey);
        if (tomorrowIndex !== -1) {
          currentIndex = tomorrowIndex;
          refreshAll();
          // 스크롤 이동 추가
          setTimeout(() => {
            const el = document.getElementById('kbo-selection-container');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
        return;
      }

      // 모든 팀 선택 여부 확인 (팀 선택 필요 상태에서만 체크)
      const allSelected = games.length > 0 && games.every(g =>
        (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== 'none'
      );
      if (allSelected) {
        games.forEach(g => { g.userSelection = window.appState.selectedTeams?.[g.gameId]; });
        localEventStatusMap[key] = 'PENDING_USER_SELECTED';
        window.appState.submissionTimes[key] = new Date();
        updateSubmitButton();
        updateTitleAndCountdown();
        if (games.every(g => g.status==='경기전')) {
          alert('제출 완료 !\n\n경기시작 전까지 수정이 가능합니다.\n\n확인.');
        }
      } else {
        alert('모든 팀을 선택해 주세요.');
      }
    });
  }

  // ==============================
  // 13. 전체 갱신
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
  // 14. 외부 API 노출
  // ==============================
  window.teamSelectionSection = {
    init: initTeamSelectionSection,
    updateTeamSelections: (gameId, team) => {
      window.appState.selectedTeams[gameId] = team;
    }
  };

  // 문서 준비 후 초기화
  $(document).ready(window.teamSelectionSection.init);
})(jQuery);
