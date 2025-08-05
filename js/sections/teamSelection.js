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

  // 한글 기준 엘립시스 처리 함수
  function truncateKoreanText(text, maxLength = 4) {
    if (!text || text.length <= maxLength) return text;
    
    // 한글, 영문, 숫자, 공백을 포함한 문자를 개별적으로 처리
    let charCount = 0;
    let truncatedText = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = char.charCodeAt(0);
      
      // 한글인지 확인 (가-힣: 44032-55203)
      const isKorean = charCode >= 44032 && charCode <= 55203;
      
      if (charCount >= maxLength) {
        break;
      }
      
      truncatedText += char;
      charCount++;
    }
    
    return truncatedText + '..';
  }
  // 개선: 실제 데이터가 있는 날짜만 사용
  const dateKeys = Object.keys(window.matchData).sort((a, b) => new Date(a) - new Date(b));

  const todayKey = formatLocalDate(new Date());
  let currentIndex = dateKeys.indexOf(todayKey);
  if (currentIndex < 0) {
    // 오늘 날짜가 없으면 가장 최근의 과거 날짜를 찾아서 설정
    const today = new Date();
    today.setHours(0,0,0,0);
    let latestPastIndex = -1;
    
    for (let i = dateKeys.length - 1; i >= 0; i--) {
      const dateKey = dateKeys[i];
      const date = new Date(dateKey);
      date.setHours(0,0,0,0);
      if (date < today) {
        latestPastIndex = i;
        break;
      }
    }
    
    // 과거 날짜가 없으면 첫 번째 날짜 사용
    currentIndex = latestPastIndex >= 0 ? latestPastIndex : 0;
  }

  // ==============================
  // 3~5. 초기화/네비/섹션 렌더링
  // ==============================
  function initTeamSelectionSection() {
    renderDateNavigation();
    renderSection();
    setupDateNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
    
  }

  // 오늘 이전 날짜만 추출
  function getPastDateKeys() {
    const today = new Date();
    today.setHours(0,0,0,0);
    return dateKeys.filter(k => {
      const d = new Date(k);
      d.setHours(0,0,0,0);
      return d < today;
    });
  }

  // 날짜 포맷 변환 (mm월 dd일)
  function getDisplayDate(dateKey) {
    const [year, month, day] = dateKey.split('-');
    return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  }

  // 체크 아이콘 노출 조건
  function shouldShowCheckIcon(eventStatus) {
    return [
      'PENDING_USER_NOT_SELECTED',
      'PENDING_USER_SELECTED'
    ].includes(eventStatus);
  }

  // 날짜 내비게이션 렌더링
  function renderDateNavigation() {
    const today = new Date();
    today.setHours(0,0,0,0);
    const key = dateKeys[currentIndex];
    const d = new Date(key);
    d.setHours(0,0,0,0);
    const isToday = d.getTime() === today.getTime();
    const pastDateKeys = getPastDateKeys();
    const prevKey = pastDateKeys.filter(k => new Date(k) < d).pop();
    const nextKey = (currentIndex < dateKeys.length - 1) ? dateKeys[currentIndex + 1] : null;
    const data = window.matchData[key] || {};
    const eventStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : data.eventStatus;

    // 다음 날짜가 미래인지 확인
    const isNextKeyFuture = nextKey ? (new Date(nextKey) > today) : false;

    // 좌측: 과거 이동 화살표 (이전 날짜가 있을 때만, 없으면 placeholder)
    const prevArrow = prevKey
      ? `<div class="nav-arrow prev" data-key="${prevKey}"></div>`
      : `<div class="nav-arrow-placeholder"></div>`;
    // 중앙: 날짜 + 올킬 텍스트
    const centerText = `<span class="nav-date">${getDisplayDate(key)} 올킬</span>`;
    // 우측: 체크 아이콘 또는 다음 날짜 이동 화살표 또는 placeholder
    let rightIcon = '';
    if (isToday && shouldShowCheckIcon(eventStatus)) {
      rightIcon = '<div class="nav-check"><img src="/image/check2.png" alt="check" /></div>';
    } else if (!isToday && nextKey && !isNextKeyFuture) {
      // 다음 날짜가 미래가 아닐 때만 화살표 표시
      rightIcon = `<div class="nav-arrow next" data-key="${nextKey}"></div>`;
    } else {
      rightIcon = '<div class="nav-arrow-placeholder"></div>';
    }

    const html = `
      <div class="date-navigation">
        ${prevArrow}
        ${centerText}
        ${rightIcon}
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

    // === 추가: PENDING_USER_SELECTED 상태면 바로 edit-btn-row 렌더링 ===
    if (effStatus === 'PENDING_USER_SELECTED') {
      // userSelection을 appState.selectedTeams에 동기화
      const games = (window.matchData[key]?.games) || [];
      games.forEach(g => {
        if (!window.appState.selectedTeams) window.appState.selectedTeams = {};
        window.appState.selectedTeams[g.gameId] = g.userSelection;
      });
      // originalSelections 세팅
      originalSelections = {};
      games.forEach(g => { originalSelections[g.gameId] = g.userSelection; });
      // edit-btn-row 렌더링
      if ($('.edit-btn-row').length === 0) {
        const btnRow = `
          <div class="edit-btn-row">
            <button class="edit-btn cancel-btn">취소</button>
            <button class="edit-btn submit-edit-btn">수정</button>
          </div>
        `;
        $('.team-selection-copy-link').before(btnRow);
      }
      // 핸들러 연결
      setupEditButtonHandlers();
    }
  }

  // ==============================
  // 6. 경기 리스트 렌더링 (overlay 복원)
  // ==============================
  function renderGames() {
    const key     = dateKeys[currentIndex];
    const data    = window.matchData[key] || { eventStatus: '', games: [] };
    const matches = data.games || [];
    const eventStatus = data.eventStatus;
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
      if (eventStatus !== 'EVENT_CANCELLED_MULTI_GAMES') {
        if (match.eventResult === 'success') {
          $item.append('<img class="event-overlay success" src="/image/event-overlay%20success.png" alt="성공" />');
        } else if (match.eventResult === 'fail') {
          $item.append('<img class="event-overlay fail" src="/image/event-overlay%20fail.png" alt="실패" />');
        }
      }

      // ─── row1: 홈/시간/원정 ─────────────────────────────
      const $row1 = $('<div>').addClass('game-row row1');
      // league 표시 div 생성
      let $leagueDiv = null;
      if (match.league) {
        const truncatedLeague = truncateKoreanText(match.league, 4);
        $leagueDiv = $('<div>').addClass('league').text(truncatedLeague);
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
    const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const status = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : data.eventStatus;
    const totalParticipants = data.totalParticipants || 0;
    const winners = data.winners;
    let main = '', sub = '', statusClass = '', btnText = '', mainClass = '', btnTextClass = '', subClass = '';

    const smallTextStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED',
      'NO_GAMES_EVENT_DISABLED',
      'EVENT_CANCELLED_MULTI_GAMES'
    ];

    // 내일 날짜 계산 및 표기 (현실 오늘 기준)
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const tomorrowKey = formatLocalDate(tomorrow);
    const tomorrowDisplay = getDisplayDate(tomorrowKey);

    switch (status) {
      case 'PENDING_USER_NOT_SELECTED':
        main = '';
        sub = '';
        mainClass = '';
        btnText = '올킬 제출';
        btnTextClass = '';
        break;
      case 'PENDING_USER_SELECTED':
        main = '';
        sub = '첫 경기 시작전까지 수정 가능';
        mainClass = '';
        btnText = '';
        btnTextClass = '';
        break;
      case 'IN_PROGRESS_USER_NOT_SELECTED':
        main = '';
        sub = `총 ${totalParticipants.toLocaleString()} 명 참여`;
        mainClass = '';
        btnText = `제출 마감`;
        btnTextClass = 'small-text';
        break;
      case 'IN_PROGRESS_USER_SELECTED':
        main = '';
        sub = `제출 마감 : 총 ${totalParticipants.toLocaleString()} 명 참여`;
        mainClass = '';
        btnText = `제출 마감`;
        btnTextClass = 'small-text';
        break;
      case 'COMPLETED_USER_SUCCESS':
        main = '당첨';
        mainClass = 'success';
        if (winners && winners > 0) {
          const displayPrize = Math.floor(100 / winners).toLocaleString();
          const realPrize = Math.floor(1000000 / winners); // 실제 지급액(내부용)
          sub = `<span class="prize-label">당첨금 : 100/${winners} = </span><span class="real-prize-amount">${realPrize.toLocaleString()} 원</span>`;
        } else {
          sub = '당첨자 없음';
        }
        btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
        btnTextClass = 'small-text';
        break;
      case 'COMPLETED_USER_FAIL':
      case 'COMPLETED_USER_NOT_SELECTED':
        main = '땡';
        mainClass = 'fail';
        if (winners && winners > 0) {
          const displayPrize = Math.floor(100 / winners).toLocaleString();
          const realPrize = Math.floor(1000000 / winners); // 실제 지급액(내부용)
          sub = `<span class="prize-label">당첨금 : 100/${winners} = </span><span class="real-prize-amount">${realPrize.toLocaleString()} 원</span>`;
        } else {
          sub = '당첨자 없음';
        }
        btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
        btnTextClass = 'small-text';
        break;
      case 'NO_GAMES_EVENT_DISABLED':
        main = '';
        sub = '';
        mainClass = '';
        btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
        btnTextClass = 'small-text';
        break;
      case 'EVENT_CANCELLED_MULTI_GAMES':
        main = '무효';
        sub = '3 경기 이상 취소';
        mainClass = 'cancelled';
        btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
        btnTextClass = 'small-text';
        subClass = 'cancelled-subtitle';
        break;
      default:
        main = '';
        sub = '';
        mainClass = '';
        btnText = '';
        btnTextClass = '';
    }
    return { main, sub, statusClass, btnText, mainClass, btnTextClass, subClass };
  }

  // ==============================
  // 8. 제목·버튼·카운트다운 동기화 (동적 시간 자릿수 애니메이션)
  // ==============================
  function updateTitleAndCountdown() {
    const parts = computeTitleParts();
    // 메인 타이틀 처리
    if (parts.main) {
      $('.title-main')
        .html(parts.main)
        .removeClass('success fail cancelled')
        .addClass(parts.mainClass || '')
        .show();
    } else {
      $('.title-main').removeClass('success fail cancelled').hide();
    }
    // 서브타이틀 처리
    if (parts.sub) {
      $('.title-sub')
        .removeClass('cancelled-subtitle')
        .addClass(parts.subClass || '')
        .html(parts.sub)
        .show();
    } else {
      $('.title-sub').removeClass('cancelled-subtitle').hide();
    }
    // 기존 status 클래스 제거 후 새로운 클래스 적용
    const $titleWrapper = $('.title-wrapper');
    $titleWrapper.removeClass(function(index, className) {
      return (className.match(/\bstatus-\S+/g) || []).join(' ');
    });
    if (parts.statusClass) {
      $titleWrapper.addClass(parts.statusClass);
    }
    // 버튼 텍스트도 상태별로 변경 및 클래스 적용
    $('.btn-text')
      .removeClass('small-text')
      .addClass(parts.btnTextClass || '')
      .html(parts.btnText || '');
  }

  // ==============================
  // 9. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]||{}).games||[];
    const baseStatus = (window.matchData[key]||{}).eventStatus;
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : baseStatus;

    // 비활성화해야 하는 상태값 목록
    const alwaysDisabledStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED',
      'NO_GAMES_EVENT_DISABLED',
      'EVENT_CANCELLED_MULTI_GAMES'
    ];

    if (alwaysDisabledStatuses.includes(effStatus)) {
      $('#submit-allkill-btn').attr('disabled', true).removeClass('active').hide();
      return;
    }

    if (effStatus === 'PENDING_USER_NOT_SELECTED') {
      const allSel = games.length > 0 && games.every(g =>
        (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== 'none'
      );
      if (allSel) {
        $('#submit-allkill-btn').removeAttr('disabled').addClass('active');
      } else {
        $('#submit-allkill-btn').attr('disabled', true).removeClass('active');
      }
      $('#submit-allkill-btn').show();
    } else {
      $('#submit-allkill-btn').removeAttr('disabled').addClass('active').show();
    }
  }

  // ==============================
  // 10. 내비게이션 핸들러
  // ==============================
  function setupDateNavHandlers() {
    $(containerSelector)
      .off('click', '.nav-arrow.prev')
      .off('click', '.nav-arrow.next')
      .on('click', '.nav-arrow.prev', function() {
        const key = $(this).data('key');
        const idx = dateKeys.indexOf(key);
        if (idx !== -1) {
          currentIndex = idx;
          refreshAll();
        }
      })
      .on('click', '.nav-arrow.next', function() {
        const key = $(this).data('key');
        const idx = dateKeys.indexOf(key);
        if (idx !== -1) {
          currentIndex = idx;
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

  // === edit-btn-row 핸들러 함수 분리 ===
  function setupEditButtonHandlers() {
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]?.games) || [];
    // 최초 상태 갱신 함수
    function updateEditBtnState() {
      let changed = false;
      games.forEach(g => {
        if ((window.appState.selectedTeams[g.gameId] || 'none') !== (g.userSelection || 'none')) changed = true;
      });
      if (changed) {
        $('.submit-edit-btn').addClass('active').prop('disabled', false);
        $('.cancel-btn').addClass('active').prop('disabled', false);
      } else {
        $('.submit-edit-btn').removeClass('active').prop('disabled', true);
        $('.cancel-btn').removeClass('active').prop('disabled', true);
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
  }

  // ==============================
  // 13. 전체 갱신
  // ==============================
  function refreshAll() {
    renderDateNavigation();
    $(`#${sectionId}`).remove();
    renderSection();
    setupDateNavHandlers();
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
