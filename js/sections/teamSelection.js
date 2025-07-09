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

    // prev/next 버튼용 함수 (기존 방식 유지)
    function dayLabel(k) {
      if (!k) return '';
      if (k === todayKey) return 'Today';
      return k.split('-')[2];
    }

    // 가운데 현재 날짜용 함수 (월/일 형식)
    function currentDayLabel(k) {
      if (!k) return '';
      if (k === todayKey) return 'Today';
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
    const spinnerHtml = effStatus === 'IN_PROGRESS_USER_SELECTED' 
      ? '<div class="spinner"></div>' 
      : '';

    const html = `
      <div id="${sectionId}" class="team-selection-section">
        <div class="title-wrapper">
          <h2 class="team-selection-title">
            <div class="title-main-row">
              ${spinnerHtml}
              <span class="title-main"></span>
            </div>
            <span class="title-sub"></span>
          </h2>
        </div>
        <div id="${gameListId}" class="game-list"></div>
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
        $list.append(`<div class="game-item placeholder"><div class="game-row row1"></div><div class="game-row row2"></div><div class="game-row row3"></div></div>`);
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

      // ─── 1행: 시계/점수 등 ─────────────────────────────
      const $row1 = $('<div>').addClass('game-row row1');
      if (match.status==='경기전') {
        $row1.append(
          $('<img>').addClass('team-logo-small').attr('src', match.home.logo).attr('alt', match.home.teamName),
          $('<span>').addClass('start-time').text(match.startTime),
          $('<img>').addClass('team-logo-small').attr('src', match.away.logo).attr('alt', match.away.teamName)
        );
      } else if (match.score) {
        const hs=match.score.home, as=match.score.away, mx=Math.max(hs,as);
        $row1.append(
          $('<img>').addClass('team-logo-small').attr('src', match.home.logo),
          $('<span>').addClass(`score${hs===mx?' higher':''}`).text(hs),
          $('<span>').addClass('status-text').text(match.status),
          $('<span>').addClass(`score${as===mx?' higher':''}`).text(as),
          $('<img>').addClass('team-logo-small').attr('src', match.away.logo)
        );
      } else {
        $row1.append(
          $('<img>').addClass('team-logo-small').attr('src', match.home.logo),
          $('<span>').addClass('status-text').text(match.status),
          $('<img>').addClass('team-logo-small').attr('src', match.away.logo)
        );
      }
      $item.append($row1);

      // ─── 2행: 홈/무/원정 선택 박스 ───────────────────
      const sel = window.appState.selectedTeams?.[match.gameId] || match.userSelection;
      const $row2 = $('<div>').addClass('game-row row2');
      ['home','draw','away'].forEach(k => {
        if (k==='draw' && !match.draw) return;
        const obj = k==='draw'? match.draw : match[k];
        const cls = sel===k ? `selected-${k}` : '';
        $row2.append(
          $('<div>')
            .addClass(`team-box ${cls}`)
            .attr('data-game-id', match.gameId)
            .attr('data-team', k)
            .append($('<span>').addClass('team-name').text(obj.teamName))
        );
      });
      $item.append($row2);

      // ─── 3행: 득표수 ─────────────────────────────────
      const $row3 = $('<div>').addClass('game-row row3');
      const votes = [];
      ['home','draw','away'].forEach(k => {
        if (k==='draw' && !match.draw) return;
        const v = k==='draw'? match.draw.votes : match[k].votes;
        votes.push(v);
      });
      const maxV = Math.max(...votes);
      votes.forEach((v,i) => {
        $row3.append(
          $('<div>').addClass(`vote-count${v===maxV?' higher':''}`).text(v)
        );
      });
      $item.append($row3);

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
    let main = '', sub = '', statusClass = '';

    // === [NO_GAMES_EVENT_DISABLED 상태] ===
    if (status === 'NO_GAMES_EVENT_DISABLED') {
      main = '다음 올킬 도전 !';
      sub = '경기가 없어요 !';
      statusClass = 'status-no-games';
    }
    // === [EVENT_CANCELLED_MULTI_GAMES 상태] ===
    else if (status === 'EVENT_CANCELLED_MULTI_GAMES') {
      main = '다음 올킬 도전 !';
      
      // 취소된 경기 상태 배열
      const cancelledStatuses = ['경기지연', '경기중지', '서스펜드', '경기취소'];
      
      // 취소된 경기 개수 계산
      const cancelledCount = games.filter(game => 
        game.gameId !== 'null' && cancelledStatuses.includes(game.status)
      ).length;
      
      sub = `경기취소 ${cancelledCount}개 발생! 당일 무효!`;
      statusClass = 'status-cancelled';
    }
    else if (status === 'PENDING_USER_NOT_SELECTED') {
      main = '올킬 도전 !';
      statusClass = 'status-pending-unselected';
      // 카운트다운 - 동적 시간 자릿수 지원
      if (games.length && games[0].startTime && games[0].startTime !== "null") {
        const [h, m] = games[0].startTime.split(':').map(Number);
        const [Y,Mo,D]= key.split('-').map(Number);
        const target = new Date(Y,Mo-1,D,h,m);
        let diff   = Math.max(0, Math.floor((target - now)/1000));
        const totalHours = Math.floor(diff/3600);
        const mm = Math.floor((diff%3600)/60).toString().padStart(2,'0');
        const ss = String(diff%60).padStart(2,'0');
        
        // 시간이 100시간 이상인지 확인하여 자릿수 결정
        let hoursHtml = '';
        if (totalHours >= 100) {
          // 3자리 시간 표시 (000~999)
          const hh = totalHours.toString().padStart(3, '0');
          const hoursHundreds = hh[0];
          const hoursTens = hh[1];
          const hoursOnes = hh[2];
          hoursHtml = `<span class="hours-hundreds flip-container"><span class="flip-card">${hoursHundreds}</span></span><span class="hours-tens flip-container"><span class="flip-card">${hoursTens}</span></span><span class="hours-ones flip-container"><span class="flip-card">${hoursOnes}</span></span>`;
        } else {
          // 2자리 시간 표시 (00~99)
          const hh = totalHours.toString().padStart(2, '0');
          const hoursTens = hh[0];
          const hoursOnes = hh[1];
          hoursHtml = `<span class="hours-tens flip-container"><span class="flip-card">${hoursTens}</span></span><span class="hours-ones flip-container"><span class="flip-card">${hoursOnes}</span></span>`;
        }
        
        const minutesTens = mm[0];
        const minutesOnes = mm[1];
        const secondsTens = ss[0];
        const secondsOnes = ss[1];
        
        sub = `<span class="time-label">남은 시간</span><span class="countdown-hours">${hoursHtml}</span>:<span class="countdown-minutes"><span class="minutes-tens flip-container"><span class="flip-card">${minutesTens}</span></span><span class="minutes-ones flip-container"><span class="flip-card">${minutesOnes}</span></span></span>:<span class="countdown-seconds"><span class="seconds-tens flip-container"><span class="flip-card">${secondsTens}</span></span><span class="seconds-ones flip-container"><span class="flip-card">${secondsOnes}</span></span></span>`;
      }
    }
    else if (status === 'PENDING_USER_SELECTED') {
      main = '제출 완료';
      statusClass = 'status-pending-selected';
      const st = window.appState.submissionTimes?.[key];
      if (st) {
        const d = new Date(st);
        const month = d.getMonth() + 1;
        const date = d.getDate();
        const hour = d.getHours().toString().padStart(2, '0');
        const min  = d.getMinutes().toString().padStart(2, '0');
        sub = `${month}월 ${date}일 ${hour}:${min}`;
      }
    }
    else if (status === 'IN_PROGRESS_USER_NOT_SELECTED') {
      main = '다음 올킬 도전';
      sub  = '투표 마감 !';
      statusClass = 'status-progress-unselected';
    }
    else if (status === 'IN_PROGRESS_USER_SELECTED') {
      main = '채점 중!';
      statusClass = 'status-progress-selected';
      const n = games.filter(g => g.eventResult==='success').length;
      sub  = `${n}경기 성공 !`;
    }
    else if (status === 'COMPLETED_USER_SUCCESS') {
      main = '<span class="allkill-text">ALL KILL!</span>';
      sub  = '모든 경기 성공 !';
      statusClass = 'status-completed-success';
    }
    else if (status === 'COMPLETED_USER_FAIL') {
      main = '다음 올킬 도전!';
      statusClass = 'status-completed-fail';
      const n = games.filter(g => g.eventResult==='success').length;
      sub  = `${n}경기 성공 !`;
    }
    else if (status === 'COMPLETED_USER_NOT_SELECTED') {
      main = '다음 올킬 도전!';
      sub  = '투표 마감!';
      statusClass = 'status-completed-unselected';
    }
    else {
      main = ''; sub = ''; statusClass = '';
    }

    return { main, sub, statusClass };
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

    // 카운트다운 상태 클래스 추가 및 동적 시간 자릿수 애니메이션 처리
    const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const status = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : data.eventStatus;
    
    if (status === 'PENDING_USER_NOT_SELECTED') {
      const games = data.games || [];
      const $titleSub = $('.title-sub');
      
      // 기존 상태 클래스 제거
      $titleSub.removeClass('urgent completed');
      
      if (games.length && games[0].startTime && games[0].startTime !== "null") {
        const [h, m] = games[0].startTime.split(':').map(Number);
        const [Y,Mo,D]= key.split('-').map(Number);
        const target = new Date(Y,Mo-1,D,h,m);
        const now = new Date();
        let diff = Math.max(0, Math.floor((target - now)/1000));
        
        const totalHours = Math.floor(diff/3600);
        const mm = Math.floor((diff%3600)/60).toString().padStart(2,'0');
        const ss = String(diff%60).padStart(2,'0');
        
        // 동적 시간 자릿수 처리
        let currentHoursHundreds = null;
        let currentHoursTens = null;
        let currentHoursOnes = null;
        
        if (totalHours >= 100) {
          // 3자리 시간
          const hh = totalHours.toString().padStart(3, '0');
          currentHoursHundreds = hh[0];
          currentHoursTens = hh[1];
          currentHoursOnes = hh[2];
          
          // 100의 자리 애니메이션 처리
          if (previousHoursHundreds !== null && previousHoursHundreds !== currentHoursHundreds) {
            const $flipCard = $('.hours-hundreds .flip-card');
            if ($flipCard.length) {
              $flipCard.addClass('flipping');
              setTimeout(() => $flipCard.text(currentHoursHundreds), 150);
              setTimeout(() => $flipCard.removeClass('flipping'), 300);
            }
          } else if (previousHoursHundreds === null) {
            $('.hours-hundreds .flip-card').text(currentHoursHundreds);
          }
        } else {
          // 2자리 시간
          const hh = totalHours.toString().padStart(2, '0');
          currentHoursTens = hh[0];
          currentHoursOnes = hh[1];
          currentHoursHundreds = null; // 100시간 미만이므로 리셋
        }
        
        const currentMinutesTens = mm[0];
        const currentMinutesOnes = mm[1];
        const currentSecondsTens = ss[0];
        const currentSecondsOnes = ss[1];
        
        // 시간 - 10의 자리 애니메이션 처리
        if (previousHoursTens !== null && previousHoursTens !== currentHoursTens) {
          const $flipCard = $('.hours-tens .flip-card');
          if ($flipCard.length) {
            $flipCard.addClass('flipping');
            setTimeout(() => $flipCard.text(currentHoursTens), 150);
            setTimeout(() => $flipCard.removeClass('flipping'), 300);
          }
        } else if (previousHoursTens === null) {
          $('.hours-tens .flip-card').text(currentHoursTens);
        }
        
        // 시간 - 1의 자리 애니메이션 처리
        if (previousHoursOnes !== null && previousHoursOnes !== currentHoursOnes) {
          const $flipCard = $('.hours-ones .flip-card');
          if ($flipCard.length) {
            $flipCard.addClass('flipping');
            setTimeout(() => $flipCard.text(currentHoursOnes), 150);
            setTimeout(() => $flipCard.removeClass('flipping'), 300);
          }
        } else if (previousHoursOnes === null) {
          $('.hours-ones .flip-card').text(currentHoursOnes);
        }
        
        // 분 - 10의 자리 애니메이션 처리
        if (previousMinutesTens !== null && previousMinutesTens !== currentMinutesTens) {
          const $flipCard = $('.minutes-tens .flip-card');
          if ($flipCard.length) {
            $flipCard.addClass('flipping');
            setTimeout(() => $flipCard.text(currentMinutesTens), 150);
            setTimeout(() => $flipCard.removeClass('flipping'), 300);
          }
        } else if (previousMinutesTens === null) {
          $('.minutes-tens .flip-card').text(currentMinutesTens);
        }
        
        // 분 - 1의 자리 애니메이션 처리
        if (previousMinutesOnes !== null && previousMinutesOnes !== currentMinutesOnes) {
          const $flipCard = $('.minutes-ones .flip-card');
          if ($flipCard.length) {
            $flipCard.addClass('flipping');
            setTimeout(() => $flipCard.text(currentMinutesOnes), 150);
            setTimeout(() => $flipCard.removeClass('flipping'), 300);
          }
        } else if (previousMinutesOnes === null) {
          $('.minutes-ones .flip-card').text(currentMinutesOnes);
        }
        
        // 초 - 10의 자리 애니메이션 처리
        if (previousSecondsTens !== null && previousSecondsTens !== currentSecondsTens) {
          const $flipCard = $('.seconds-tens .flip-card');
          if ($flipCard.length) {
            $flipCard.addClass('flipping');
            setTimeout(() => $flipCard.text(currentSecondsTens), 150);
            setTimeout(() => $flipCard.removeClass('flipping'), 300);
          }
        } else if (previousSecondsTens === null) {
          $('.seconds-tens .flip-card').text(currentSecondsTens);
        }
        
        // 초 - 1의 자리 애니메이션 처리
        if (previousSecondsOnes !== null && previousSecondsOnes !== currentSecondsOnes) {
          const $flipCard = $('.seconds-ones .flip-card');
          if ($flipCard.length) {
            $flipCard.addClass('flipping');
            setTimeout(() => $flipCard.text(currentSecondsOnes), 150);
            setTimeout(() => $flipCard.removeClass('flipping'), 300);
          }
        } else if (previousSecondsOnes === null) {
          $('.seconds-ones .flip-card').text(currentSecondsOnes);
        }
        
        // 이전 값들 업데이트
        previousHoursHundreds = currentHoursHundreds;
        previousHoursTens = currentHoursTens;
        previousHoursOnes = currentHoursOnes;
        previousMinutesTens = currentMinutesTens;
        previousMinutesOnes = currentMinutesOnes;
        previousSecondsTens = currentSecondsTens;
        previousSecondsOnes = currentSecondsOnes;
        
        // 10초 이하일 때 urgent 클래스 추가
        if (diff <= 10 && diff > 0) {
          $titleSub.addClass('urgent');
        }
        // 0초일 때 completed 클래스 추가
        else if (diff === 0) {
          $titleSub.addClass('completed');
        }
      }
    } else {
      // 카운트다운이 아닌 상태에서는 이전 값들 리셋
      previousHoursHundreds = null;
      previousHoursTens = null;
      previousHoursOnes = null;
      previousMinutesTens = null;
      previousMinutesOnes = null;
      previousSecondsTens = null;
      previousSecondsOnes = null;
    }

    let btnText = parts.main;
    const effStatus = typeof localEventStatusMap[key] !== 'undefined'
      ? localEventStatusMap[key] 
      : (window.matchData[key]?.eventStatus);
    
    // COMPLETED_USER_SUCCESS 상태일 때 "올킬 성공 !" 텍스트 설정
    if (effStatus === 'COMPLETED_USER_SUCCESS') {
      btnText = '올킬 성공 !';
    }
    else if (effStatus === 'PENDING_USER_SELECTED' && isSelectionChanged()) {
      btnText = '수정 제출';
    }
    $('.btn-text').text(btnText);

    if (countdownTimerId && parts.main !== '올킬 도전 !') {
      clearInterval(countdownTimerId);
      countdownTimerId = null;
    }
    if (parts.main === '올킬 도전 !') {
      if (!countdownTimerId) {
        countdownTimerId = setInterval(updateTitleAndCountdown, 1000);
      }
    }

    // === EVENT_CANCELLED_MULTI_GAMES에서는 버튼 숨김 ===
    if (effStatus === 'NO_GAMES_EVENT_DISABLED' || effStatus === 'EVENT_CANCELLED_MULTI_GAMES') {
      $('#submit-allkill-btn').hide();
    } else {
      $('#submit-allkill-btn').show();
    }
  }

  // ==============================
  // 9. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]||{}).games||[];
    const baseStatus = (window.matchData[key]||{}).eventStatus;
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : baseStatus;

    // [NO_GAMES_EVENT_DISABLED] or [EVENT_CANCELLED_MULTI_GAMES]일 경우 숨김 처리
    if (effStatus === 'NO_GAMES_EVENT_DISABLED' || effStatus === 'EVENT_CANCELLED_MULTI_GAMES') {
      $('#submit-allkill-btn').hide();
      return;
    }

    const allSel = games.length>0 && games.every(g =>
      (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== 'none'
    );
    $('#submit-allkill-btn')
      .prop('disabled', !allSel)
      .toggleClass('enabled', allSel)
      .css('opacity', allSel?1:0.3)
      .show();
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
        window.appState.selectedTeams[id] = tm;
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

      // (1) 'PENDING_USER_NOT_SELECTED' 최초 제출
      if (effStatus === 'PENDING_USER_NOT_SELECTED') {
        games.forEach(g => { g.userSelection = window.appState.selectedTeams?.[g.gameId]; });
        localEventStatusMap[key] = 'PENDING_USER_SELECTED';
        window.appState.submissionTimes[key] = new Date();
        updateSubmitButton();
        updateTitleAndCountdown();
        if (games.every(g => g.status==='경기전')) {
          alert('제출 완료 !\n\n경기시작 전까지 수정이 가능합니다.\n\n확인.');
        }
      // (2) 'PENDING_USER_SELECTED'이면서 선택값이 변경됐으면 "수정 제출"
      } else if (
        effStatus === 'PENDING_USER_SELECTED'
        && isSelectionChanged()
      ) {
        // userSelection(원본) 갱신: 실서비스는 서버에 요청해야함
        games.forEach(g => { g.userSelection = window.appState.selectedTeams?.[g.gameId]; });
        // 재제출 시간 갱신
        window.appState.submissionTimes[key] = new Date();
        updateSubmitButton();
        updateTitleAndCountdown();
        alert('수정 제출 완료!\n\n경기시작 전까지 계속 수정 가능합니다.\n\n확인.');
      }
      // else 클릭 무시
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
