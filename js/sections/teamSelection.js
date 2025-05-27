// teamSelection.js
  
  function formatLocalDate(d) {
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    return `${Y}-${M}-${D}`;
  }

  (function($) {
    
  // ==============================
  // 1. 설정 및 상태 변수
  // ==============================
    // 양옆에 들어갈 아이콘 (채점 중, 올킬 도전, 제출 완료)
  const iconBothLeft   = '/image/iconBothLeft.gif';
  const iconBothRight  = '/image/iconBothRight.gif';
  // 오른쪽에만 들어갈 아이콘 (다음 경기 도전, 올킬 성공)
  const iconSingle     = '/image/iconSingle.gif';
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

// 2-1. rawKeys → minDate, maxDate 계산
  // ==============================
  const rawKeys = Object.keys(window.matchData);                  // ["2025-05-25", "2025-05-26", …]
  const dates   = rawKeys.map(k => new Date(k).getTime());        // UTC 타임스탬프 배열
  const minDate = new Date(Math.min(...dates));                   // 가장 이른 날
  const maxDate = new Date(Math.max(...dates));                   // 가장 늦은 날

  // ==============================
  // 2-2. 날짜 키 배열 생성
  // ==============================
  const minDateKey = formatLocalDate(minDate);
  const maxDateKey = formatLocalDate(maxDate);

  const dateKeys = [];
  const [minY, minM, minD] = minDateKey.split('-').map(Number);
  const [maxY, maxM, maxD] = maxDateKey.split('-').map(Number);

  let cursor  = new Date(minY, minM - 1, minD);  // 로컬 자정 기준 시작일
  const endDate = new Date(maxY, maxM - 1, maxD);

  while (cursor <= endDate) {
    dateKeys.push(formatLocalDate(cursor));
    cursor.setDate(cursor.getDate() + 1);         // 로컬 기준 +1일
  }

  // ==============================
  // 2-3. 오늘 인덱스 찾기
  // ==============================
  const todayKey   = formatLocalDate(new Date());
  let   currentIndex = dateKeys.indexOf(todayKey);
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
      <div class="title-wrapper">
        <h2 class="team-selection-title">
          <span class="title-main">${initialTitle}</span>
          <span class="title-sub"></span>
        </h2>
        <!-- 왼쪽/오른쪽 데코 자리 -->
        <img src="" class="title-decor-left"  alt="" style="display:none;" />
        <img src="" class="title-decor-right" alt="" style="display:none;" />
      </div>
  
        <div class="game-list" id="${gameListId}"></div>
  
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            <span class="btn-text">${submitBtnText}</span>
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
    $(containerSelector).append(sectionHtml);
    renderGames();
  }
    
  // ==============================
  // 6. 경기 리스트 렌더링 (3줄 UI)
  // ==============================
  function renderGames() {
    const key     = dateKeys[currentIndex];
    const matches = window.matchData[key] || [];
    const $list   = $(`#${gameListId}`).empty();

    // “경기 없음” 처리
    if (!matches.length || matches.every(m => m.gameId === 'null')) {
      $list.html('<div class="no-game">경기가 없습니다.</div>');
      updateSubmitButton();
      updateTitleAndCountdown();
      return;
    }

    matches.forEach(match => {
      // placeholder
      if (match.gameId === 'null') {
        $list.append(`
          <div class="game-item placeholder">
            <div class="game-row row1"></div>
            <div class="game-row row2"></div>
            <div class="game-row row3"></div>
          </div>`);
        return;
      }

      // disabled/fade 체크
      const isSuspended = ["서스펜드","우천취소","경기취소"].includes(match.status);
      const isFailed    = (match.status==="경기종료" && match.eventResult==="fail");
      const fadeClass   = match.eventResult==='fail' ? 'faded' : '';

      const $item = $('<div>')
        .addClass('game-item')
        .toggleClass('disabled', isSuspended||isFailed)
        .addClass(fadeClass)
        .attr('data-game-id', match.gameId);

      // ─── 1행: logo – time/status – logo ────────────────────────
      const $row1 = $('<div>').addClass('game-row row1');
      if (match.status==='경기전') {
        $row1.append(
          $('<img>').addClass('team-logo-small').attr('src', match.home.logo).attr('alt',match.home.teamName),
          $('<span>').addClass('start-time').text(match.startTime),
          $('<img>').addClass('team-logo-small').attr('src', match.away.logo).attr('alt',match.away.teamName)
        );
      } else {
        $row1.append(
          $('<img>').addClass('team-logo-small').attr('src', match.home.logo).attr('alt',match.home.teamName),
          $('<span>').addClass('score').text(match.score.home),
          $('<span>').addClass('status-text').text(match.status),
          $('<span>').addClass('score').text(match.score.away),
          $('<img>').addClass('team-logo-small').attr('src', match.away.logo).attr('alt',match.away.teamName)
        );
      }
      $item.append($row1);

      // ─── 2행: 팀 선택박스(home/draw/away) ─────────────────
      const selected = window.appState.selectedTeams?.[match.gameId] || match.userSelection;
      const $row2    = $('<div>').addClass('game-row row2');
      ['home','draw','away'].forEach(key2 => {
        const obj = key2 === 'draw' ? match.draw : match[key2];
        const sel = selected === key2 ? `selected-${key2}` : '';
        const $btn = $('<div>')
          .addClass(`team-box ${sel}`)
          .attr('data-game-id', match.gameId)
          .attr('data-team', key2)
          .append($('<span>').addClass('team-name').text(obj.teamName));
        $row2.append($btn);
      });
      $item.append($row2);

      // ─── 3행: 득표수(home/draw/away) ─────────────────────
      const $row3 = $('<div>').addClass('game-row row3');
      ['home','draw','away'].forEach(key2 => {
        const v = key2 === 'draw' ? match.draw.votes : match[key2].votes;
        $row3.append($('<div>').addClass('vote-count').text(v));
      });
      $item.append($row3);

      // ─── 오버레이(success/fail) ───────────────────────────
      if (match.eventResult==='success') {
        $item.append(`<img class="event-overlay success" src="/image/event-overlay success.png"/>`);
      } else if (match.eventResult==='fail') {
        $item.append(`<img class="event-overlay fail" src="/image/event-overlay fail.png"/>`);
      }

      $list.append($item);
    });

    // 버튼·타이틀 갱신
    updateSubmitButton();
    updateTitleAndCountdown();

    // 올킬 스탬프
    const allOK = matches.length>0 && matches.every(m=>m.eventResult==='success');
    if (allOK) {
      $list.append(`<img class="allkill-stamp" src="/image/allkill_stemp.png"/>`);
    }
  }


  // ==============================
  // 7. 상태별 UI 분기
  // ==============================
  function renderStatusSection(match) {
    const s = match.status;
    const hc = match.score?.home > match.score?.away ? 'higher' : '';
    const ac = match.score?.away > match.score?.home ? 'higher' : '';

    if (s==='경기전') {
      return `
        <div class="status-column status-pre">
          <div class="start-time">${match.startTime}</div>
        </div>`;
    }
    // 경기중 / 종료 모두 스코어-상태-스코어
    return `
      <div class="status-column ${s==='경기중'?'status-live':'status-post'}">
        <div class="score">
          <span class="home-score ${hc}">${match.score.home}</span>
          <span class="vs">vs</span>
          <span class="away-score ${ac}">${match.score.away}</span>
        </div>
        <div class="status-text">${s}</div>
      </div>`;
  }
    
  // ==============================
  // 8. 편집 가능 여부 판단
  // ==============================
 function canEditSelections() { 
   const key     = dateKeys[currentIndex]; 
   const matches = window.matchData[key] || []; 
   const allPre  = matches.every(m => m.status === '경기전'); 
   const canceledCount = matches.filter(m => m.status === '경기취소').length; 
   return allPre && canceledCount < 2; 
 }
  
  // ==============================
  // 9. 타이틀 파트 계산
  // ==============================
  function computeTitleParts() {
  const key      = dateKeys[currentIndex];
  const matches  = window.matchData[key] || [];
  const isEmptyDay = matches.length > 0 && matches.every(m => m.gameId === 'null');
  if (isEmptyDay) {
    return {
      main: '경기가 없어요 !',
      sub:  '다음 올킬 도전!'
    };
  }
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
  // 10. 타이틀 & 카운트다운 업데이트
  // ==============================
function updateTitleAndCountdown() {
  const key         = dateKeys[currentIndex];
  const matches     = window.matchData[key] || [];

  // 1) 경기 상태 판정
  const allPre      = matches.every(m => m.status === '경기전');
  const anyLive     = matches.some(m => m.status === '경기중');
  const finishedSt  = ['경기종료','경기취소','경기지연','경기중지','서스펜드','우천취소'];
  const allFinished = matches.length > 0 && matches.every(m => finishedSt.includes(m.status));

  // 2) 제출 여부 & 타이틀 계산
  const submittedAt = window.appState.submissionTimes?.[key];
  const parts       = computeTitleParts();

  // 3) 타이틀 텍스트 갱신
  $('.team-selection-title .title-main').text(parts.main);
  $('.team-selection-title .title-sub')
    .text(parts.sub)
    .toggleClass('countdown-active', allPre && !submittedAt);

  // 4) 버튼 텍스트 동기화
  $('.btn-text').text(parts.main);

  // 5) 데코 아이콘 제어
  if (allPre || anyLive) {
    // (경기전 또는 경기중) 양쪽에 아이콘
    $('.title-decor-left')
      .attr('src', iconBothLeft)
      .show();
    $('.title-decor-right')
      .attr('src', iconBothRight)
      .show();

  } else if (allFinished) {
    // (모두 종료/취소) 오른쪽에 단일 아이콘
    $('.title-decor-left').hide();
    $('.title-decor-right')
      .attr('src', iconSingle)
      .show();

  } else {
    // 그 외 상태에는 둘 다 숨김
    $('.title-decor-left, .title-decor-right').hide();
  }

  // 6) 카운트다운 실행/중지
  if (allPre && !submittedAt && matches.length) {
    const [h, mi]      = matches[0].startTime.split(':').map(Number);
    const [yy, mo, dd] = key.split('-').map(Number);
    startCountdown(new Date(yy, mo - 1, dd, h, mi));
  } else if (countdownTimerId) {
    clearInterval(countdownTimerId);
    countdownTimerId = null;
  }
}



  // ==============================
  // 11. 카운트다운 시작 함수
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
  // 12. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const $btn    = $('#submit-allkill-btn');
    const matches= window.matchData[dateKeys[currentIndex]] || [];
    const allSel   = matches.every(m => {
    const sel = window.appState.selectedTeams?.[m.gameId] ?? m.userSelection;
    return sel !== 'none';
   });

    if (allSel) {
      $btn.addClass('enabled').prop('disabled', false)
          .css({ opacity: 1, color: '#121212' });
    } else {
      $btn.removeClass('enabled').prop('disabled', true)
          .css({ opacity: 0.3, color: 'rgba(18,18,18,0.7)' });
    }
  }

  // ==============================
  // 13. 내비게이션 핸들러
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
  // 14. 팀 선택 핸들러
  // ==============================
  function setupTeamSelectionHandlers() {
   $(`#${gameListId}`)
     .off('click', '.team-box')
     .on('click', '.team-box', function() {
       // 1) 편집 불가능한 경우 무시
       if (!canEditSelections()) return;

       // 2) 선택 로직
       const gameId = $(this).data('game-id');
       const team   = $(this).data('team');
       window.appState.selectedTeams = window.appState.selectedTeams || {};
       window.appState.selectedTeams[gameId] = team;

       // 3) 버튼을 “제출 !” 로 변경
       $('.btn-text').text('제출 !');

       // 4) 화면 갱신 (타이틀·버튼 활성화 등)
       renderGames();
     });
  }

  // ==============================
  // 15. 제출 핸들러
  // ==============================
    function setupSubmitHandler() {
    $('#submit-allkill-btn')
      .off('click')
      .on('click', function() {
        const key     = dateKeys[currentIndex];
        const matches = window.matchData[key] || [];
  
        // 제출 시각 저장 & 타이틀 갱신
        window.appState.submissionTimes[key] = new Date();
        updateTitleAndCountdown();
  
        // 모든 경기가 아직 시작 전(경기전)이라면 얼럿 띄우기
        const allPre = matches.every(m => m.status === '경기전');
        if (allPre) {
          alert(
            '제출 완료 !\n\n' +
            '경기시작 전까지\n' +
            '수정이 가능합니다.\n\n' +
            '확인.'
          );
        }
      });
  }
  
  // ==============================
  // 16. 전체 갱신
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
  // 17. 외부 API 노출
  // ==============================
  window.teamSelectionSection = {
    init: initTeamSelectionSection,
    updateTeamSelections: (gameId, team) => {
      window.appState.selectedTeams = window.appState.selectedTeams || {};
      window.appState.selectedTeams[gameId] = team;
    }
  };
})(jQuery);

+$(document).ready(window.teamSelectionSection.init);
