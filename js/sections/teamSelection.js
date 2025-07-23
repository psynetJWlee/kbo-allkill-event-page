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
  let originalSelections = {};

  // ==============================
  // 2. 날짜 키 배열 생성 (정렬 보장)
  // ==============================
  function formatLocalDate(d) {
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    return `${Y}-${M}-${D}`;
  }
  // 개선: 실제 데이터가 있는 날짜만 사용
  const dateKeys = Object.keys(window.matchData).sort((a, b) => new Date(a) - new Date(b));

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
    setupCopyLinkButton();
  }

  function renderNav() {
    const prevKey = currentIndex > 0 ? dateKeys[currentIndex - 1] : '';
    const nextKey = currentIndex < dateKeys.length - 1 ? dateKeys[currentIndex + 1] : '';

    // prev/next 버튼용 함수 (dd 형식)
    function dayLabel(k) {
      if (!k) return '';
      const [year, month, day] = k.split('-');
      return `${parseInt(day, 10)}`;
    }

    // 가운데 현재 날짜용 함수 (오늘만 Today, 그 외 MM/DD)
    function currentDayLabel(k) {
      if (!k) return '';
      if (dateKeys[currentIndex] === todayKey) return 'Today';
      const [year, month, day] = k.split('-');
      return `${parseInt(month, 10)}/${parseInt(day, 10)}`;
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
        <a 
          href="javascript:void(0);" 
          class="download-button copy-link-button team-selection-copy-link"
        >
          링크 복사
        </a>
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

    // 오늘과 내일 날짜 계산
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const keyDate = new Date(key);
    keyDate.setHours(0,0,0,0);
    let showVoteCount = keyDate <= tomorrow;

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
      const fadeClass   = match.eventResult==='fail' ? 'faded' : '';

      const $item = $('<div>')
        .addClass('game-item')
        .toggleClass('disabled', isSuspended)
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
      // league 표시 div 생성
      let $leagueDiv = null;
      if (match.league) {
        $leagueDiv = $('<div>').addClass('league').text(match.league);
      }
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
      // start-time 또는 status-text와 league를 묶어서 표시
      let $leagueStatusWrap;
      if (match.status === '경기전') {
        $leagueStatusWrap = $('<div>').addClass('league-status-wrap')
          .append(
            $leagueDiv ? $leagueDiv : '',
            $('<div>').addClass('start-time').text(match.startTime)
          );
      } else {
        $leagueStatusWrap = $('<div>').addClass('league-status-wrap')
          .append(
            $leagueDiv ? $leagueDiv : '',
            $('<div>').addClass('status-text').text(match.status)
          );
      }
      // home 다음에 team-score(home), league-status-wrap, team-score(away), away 순서로 추가
      $row1.append($home, $homeScore, $leagueStatusWrap, $awayScore, $away);
      // 반드시 $item에 $row1 append
      $item.append($row1);

      // ─── row2: 팀 선택 박스 3개(승/무/패, 내부에 팀명+득표수) ─────────────
      let sel = window.appState.selectedTeams?.[match.gameId];
      if (!sel || sel === 'none') sel = match.userSelection;
      const $row2 = $('<div>').addClass('game-row row2');
      // vote-count 배열 준비
      const voteArr = [
        { key: 'home', value: match.home.votes },
        { key: 'draw', value: match.draw ? match.draw.votes : null },
        { key: 'away', value: match.away.votes }
      ].filter(v => v.value !== null);
      const maxVote = Math.max(...voteArr.map(v => v.value));
      // 동점 모두 top-vote
      ['home','draw','away'].forEach(k => {
        if (k==='draw' && !match.draw) return;
        const obj = k==='draw'? match.draw : match[k];
        let isSelected = sel===k;
        let cls = isSelected ? 'selected' : '';
        // top-vote 클래스 조건: 최대값이 1개만 있을 때만 적용
        const maxVoteCount = voteArr.filter(v => v.value === maxVote).length;
        if (obj.votes === maxVote && maxVote > 0 && maxVoteCount === 1) {
          cls += ' top-vote';
        }
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
          .addClass(`team-box${cls ? ' ' + cls : ''}`)
          .attr('data-game-id', match.gameId)
          .attr('data-team', k)
          .append(
            $('<div>').addClass(nameClass).text(label)
          );
        if (showVoteCount) {
          $box.append($('<div>').addClass('vote-count').text(obj.votes));
        }
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

    // 날짜 포맷 분기 (PENDING/IN_PROGRESS는 7월 17일, 그 외는 7 / 17)
    const [year, month, day] = key.split('-');
    let dateStr = '';
    if ([
      'PENDING_USER_NOT_SELECTED',
      'PENDING_USER_SELECTED',
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED'
    ].includes(status)) {
      dateStr = `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    } else {
      dateStr = `${parseInt(month, 10)} / ${parseInt(day, 10)}`;
    }
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
        sub = '첫 경기 시작 전까지 수정 가능';
        btnText = '';
      } else {
        sub = '첫 경기 시작 전까지 수정 가능';
        btnText = '';
      }
      statusClass = 'status-pending-selected';
    }
    // === IN_PROGRESS_USER_NOT_SELECTED ===
    else if (status === 'IN_PROGRESS_USER_NOT_SELECTED') {
      main = `${dateStr} 올킬`;
      sub = '제출 마감 : 총 447,388 명 참여';
      btnText = getNextPendingAllkillText();
      statusClass = 'status-progress-unselected';
    }
    // === IN_PROGRESS_USER_SELECTED ===
    else if (status === 'IN_PROGRESS_USER_SELECTED') {
      main = `${dateStr} 올킬`;
      sub = '제출 마감 : 총 447,388 명 참여';
      btnText = getNextPendingAllkillText();
      statusClass = 'status-progress-selected';
    }
    // === COMPLETED_USER_SUCCESS ===
    else if (status === 'COMPLETED_USER_SUCCESS') {
      main = `${dateStr}   올킬 <span class="success">당첨</span>`;
      sub = '당첨금 : 100/20 = 50,000 원';
      btnText = getNextPendingAllkillText();
      statusClass = 'COMPLETED_USER_SUCCESS';
    }
    // === COMPLETED_USER_FAIL ===
    else if (status === 'COMPLETED_USER_FAIL') {
      main = `${dateStr} 올킬 <span class="fail">땡</span>`;
      sub = '당첨금 : 100/20 = 50,000 원';
      btnText = getNextPendingAllkillText();
      statusClass = 'COMPLETED_USER_FAIL';
    }
    // === COMPLETED_USER_NOT_SELECTED ===
    else if (status === 'COMPLETED_USER_NOT_SELECTED') {
      main = `${dateStr} 올킬`;
      sub = '당첨금 : 100/20 = 50,000 원';
      btnText = getNextPendingAllkillText();
      statusClass = 'status-completed-unselected';
    }
    // === NO_GAMES_EVENT_DISABLED ===
    else if (status === 'NO_GAMES_EVENT_DISABLED') {
      main = `${dateStr} 올킬`;
      sub = '경기 없음';
      btnText = getNextPendingAllkillText();
      statusClass = 'status-no-games';
    }
    // === EVENT_CANCELLED_MULTI_GAMES ===
    else if (status === 'EVENT_CANCELLED_MULTI_GAMES') {
      main = `${dateStr} 올킬 <span class="cancelled">무효</span>`;
      sub = '3경기 이상 취소';
      btnText = getNextPendingAllkillText();
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
        // 이미 선택한 팀을 다시 클릭하면 해제 (vote-count는 그대로)
        if (window.appState.selectedTeams[id] === tm) {
          // 선택 취소 시 vote-count -1
          const match = window.matchData[dateKeys[currentIndex]].games.find(g => g.gameId === id);
          if (match[tm]) match[tm].votes = Math.max(0, (match[tm].votes || 0) - 1);
          delete window.appState.selectedTeams[id];
          match.userSelection = 'none'; // 선택 해제 시 userSelection도 none으로
          // check-icon 강제 제거(혹시 남아있을 경우)
          $(this).find('.check-icon').remove();
          renderGames();
          return;
        } else {
          // 기존 선택이 있으면 vote-count 복원
          const match = window.matchData[dateKeys[currentIndex]].games.find(g => g.gameId === id);
          if (window.appState.selectedTeams[id]) {
            const prevTeam = window.appState.selectedTeams[id];
            if (match[prevTeam]) match[prevTeam].votes = Math.max(0, match[prevTeam].votes - 1);
          }
          // 새로 선택한 팀 vote-count +1
          if (match[tm]) match[tm].votes = (match[tm].votes || 0) + 1;
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
        // 제출 직전 선택값 저장
        originalSelections = {};
        games.forEach(g => { originalSelections[g.gameId] = window.appState.selectedTeams[g.gameId]; });
        // 기존 제출 버튼 숨기고, 취소/수정 버튼 추가
        $('.team-selection-submit').hide();
        if ($('.edit-btn-row').length === 0) {
          const btnRow = `
            <div class="edit-btn-row">
              <button class="edit-btn cancel-btn">취소</button>
              <button class="edit-btn submit-edit-btn">수정</button>
            </div>
          `;
          $('.team-selection-copy-link').before(btnRow);
        }
        // 수정 버튼 상태 갱신 함수
        function updateEditBtnState() {
          let changed = false;
          games.forEach(g => {
            if ((window.appState.selectedTeams[g.gameId] || 'none') !== (originalSelections[g.gameId] || 'none')) changed = true;
          });
          if (changed) {
            $('.submit-edit-btn').addClass('active');
            $('.cancel-btn').addClass('active');
          } else {
            $('.submit-edit-btn').removeClass('active');
            $('.cancel-btn').removeClass('active');
          }
        }
        // 팀 선택 변경 시 수정 버튼 색상 갱신
        $(document).off('click.editBtn').on('click.editBtn', '.team-box', function() {
          setTimeout(updateEditBtnState, 0);
        });
        // 취소 버튼 클릭 시 원래 선택값 복원
        $(document).off('click.cancelBtn').on('click.cancelBtn', '.cancel-btn', function() {
          games.forEach(g => {
            window.appState.selectedTeams[g.gameId] = originalSelections[g.gameId];
          });
          renderGames();
          updateEditBtnState();
        });
        // 수정 버튼 클릭 시 재제출 및 토스트
        $(document).off('click.submitEditBtn').on('click.submitEditBtn', '.submit-edit-btn', function() {
          let changed = false;
          games.forEach(g => {
            if ((window.appState.selectedTeams[g.gameId] || 'none') !== (originalSelections[g.gameId] || 'none')) changed = true;
          });
          // 미선택 경기 검사
          const hasUnselected = games.some(g => (window.appState.selectedTeams[g.gameId] || 'none') === 'none');
          if (hasUnselected) {
            showToast(`${games.length} 경기 모두 체크 필요`, '', 1500, 'toast-warning');
            return;
          }
          if (!changed) return;
          games.forEach(g => { g.userSelection = window.appState.selectedTeams?.[g.gameId]; });
          // 선택값을 다시 저장
          originalSelections = {};
          games.forEach(g => { originalSelections[g.gameId] = window.appState.selectedTeams[g.gameId]; });
          showToast('수정 완료', '첫경기 시작 전까지 수정 가능');
          updateEditBtnState();
          scrollToTeamSelectionBottom();
        });
        // 최초 상태 갱신
        updateEditBtnState();
        // 스크롤
        scrollToTeamSelectionBottom();
        showToast('제출 완료', '첫 경기 시작 전까지 수정 가능');
        return;
      }
      // 실패 시 기존 제출 버튼 보이기, edit-btn-row 제거
      else {
        const games = window.matchData[key]?.games || [];
        const totalGames = games.length;
        showToast(`${totalGames} 경기 모두 체크 필요`, '', 1500, 'toast-warning');
        scrollToTeamSelectionBottom();
        $('.team-selection-submit').show();
        $('.edit-btn-row').remove();
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

  // ===== 토스트 팝업 함수 추가 =====
  function showToast(mainText, subText = '', duration = 1500, extraClass = '') {
    // 기존 토스트 제거
    $("#toast-popup").remove();
    // 토스트 HTML 생성
    const toastHtml = `
      <div id="toast-popup" class="toast-popup${extraClass ? ' ' + extraClass : ''}">
        <div class="toast-main-text">${mainText}</div>
        ${subText ? `<div class="toast-sub-text">${subText}</div>` : ''}
      </div>
    `;
    $("body").append(toastHtml);
    // 1.5초 후 자동 제거
    let toastTimeout = setTimeout(() => {
      $("#toast-popup").fadeOut(200, function() { $(this).remove(); });
    }, duration);
    // 1.5초 내 터치 시 즉시 제거
    $("#toast-popup").on('touchstart mousedown', function() {
      clearTimeout(toastTimeout);
      $(this).fadeOut(100, function() { $(this).remove(); });
    });
  }

  function scrollToTeamSelectionBottom() {
    const section = document.getElementById('kbo-selection-container');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  // 문서 준비 후 초기화
  $(document).ready(window.teamSelectionSection.init);
})(jQuery);
