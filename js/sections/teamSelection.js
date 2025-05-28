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

  // PENDING 상태 전/후, 완료 후 재도전 등 버튼 기본 텍스트 (최소 placeholder)
  const submitBtnPlaceholder = '제출하기';

  // 카운트다운 타이머 ID
  let countdownTimerId = null;

  // 제출 시각을 날짜별로 저장
  window.appState.submissionTimes = window.appState.submissionTimes || {};

  // ==============================
  // 2. 날짜 키 배열 생성
  // ==============================
  function formatLocalDate(d) {
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    return `${Y}-${M}-${D}`;
  }

  const rawKeys = Object.keys(window.matchData);
  const dates   = rawKeys.map(k => new Date(k).getTime());
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

    function dayLabel(k) {
      if (!k) return '';
      if (k === todayKey) return 'Today';
      return k.split('-')[2];
    }

    const html = `
      <div class="date-navigation">
        <div id="${prevBtnId}" class="date-nav-prev">
          <div class="arrow-left"></div>
          <span class="prev-day">${dayLabel(prevKey)}</span>
        </div>
        <span id="${currentDayId}" class="current-day">${dayLabel(dateKeys[currentIndex])}</span>
        <div id="${nextBtnId}" class="date-nav-next">
          <span class="next-day">${dayLabel(nextKey)}</span>
          <div class="arrow-right"></div>
        </div>
      </div>
    `;
    $(containerSelector).html(html);
  }

  // ==============================
  // 5. 섹션 렌더링
  // ==============================
  function renderSection() {
    const html = `
      <div id="${sectionId}" class="team-selection-section">
        <div class="title-wrapper">
          <h2 class="team-selection-title">
            <span class="title-main"></span>
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
  // 6. 경기 리스트 렌더링
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
        const label = ['home','draw','away'][i];
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
  // 7. eventStatus 기반 title/sub 계산
  // ==============================
  function computeTitleParts() {
    const key  = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const status = data.eventStatus;
    const games  = data.games || [];
    const now    = new Date();
    let main = '', sub = '';

    // 1) PENDING_USER_NOT_SELECTED
    if (status === 'PENDING_USER_NOT_SELECTED') {
      main = '올킬 도전 !';
      // 제일 첫 경기 startTime 으로 카운트다운
      if (games.length && games[0].startTime) {
        const [h, m] = games[0].startTime.split(':').map(Number);
        const [Y,Mo,D]= key.split('-').map(Number);
        const target = new Date(Y,Mo-1,D,h,m);
        const diff   = Math.max(0, Math.floor((target - now)/1000));
        const hh = Math.floor(diff/3600), mm = Math.floor((diff%3600)/60).toString().padStart(2,'0');
        sub = `참여시간 -${hh}:${mm}`;
      }
    }
    // 2) PENDING_USER_SELECTED
    else if (status === 'PENDING_USER_SELECTED') {
      main = '제출 완료';
      const st = window.appState.submissionTimes?.[key];
      if (st) {
        const d = new Date(st);
        sub = `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
      }
    }
    // 3) IN_PROGRESS_USER_NOT_SELECTED
    else if (status === 'IN_PROGRESS_USER_NOT_SELECTED') {
      main = '이벤트 참여 종료!';
      sub  = '다음 이벤트 도전 !';
    }
    // 4) IN_PROGRESS_USER_SELECTED
    else if (status === 'IN_PROGRESS_USER_SELECTED') {
      main = '채점 중!';
      const n = games.filter(g => g.eventResult==='success').length;
      sub  = `${n}경기 성공 !`;
    }
    // 5) COMPLETED_USER_SUCCESS
    else if (status === 'COMPLETED_USER_SUCCESS') {
      main = '올킬 성공 !';
      sub  = '축하합니다 !';
    }
    // 6) COMPLETED_USER_FAIL
    else if (status === 'COMPLETED_USER_FAIL') {
      main = '다음 경기 도전!';
      const n = games.filter(g => g.eventResult==='success').length;
      sub  = `${n}경기 성공 !`;
    }
    // 7) COMPLETED_USER_NOT_SELECTED
    else if (status === 'COMPLETED_USER_NOT_SELECTED') {
      main = '다음 경기 도전!';
      sub  = '다음 이벤트는 꼭 참여하세요!';
    }

    return { main, sub };
  }

  // ==============================
  // 8. 제목·버튼·카운트다운 동기화
  // ==============================
  function updateTitleAndCountdown() {
    const parts = computeTitleParts();
    $('.title-main').text(parts.main);
    $('.title-sub').text(parts.sub);

    // submit 버튼도 title-main 과 동일하게
    $('.btn-text').text(parts.main);

    // countdown 필요 없는 상태면 타이머 끄기
    if (countdownTimerId && parts.main !== '올킬 도전 !') {
      clearInterval(countdownTimerId);
      countdownTimerId = null;
    }
  }

  // ==============================
  // 9. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]||{}).games||[];
    const allSel = games.length>0 && games.every(g =>
      (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== 'none'
    );
    $('#submit-allkill-btn')
      .prop('disabled', !allSel)
      .toggleClass('enabled', allSel)
      .css('opacity', allSel?1:0.3);
  }

  // ==============================
  // 10. 내비게이션 핸들러
  // ==============================
  function setupNavHandlers() {
    $(containerSelector)
      .on('click', `#${prevBtnId}`, () => {
        if (currentIndex>0) {
          currentIndex--; refreshAll();
        }
      })
      .on('click', `#${nextBtnId}`, () => {
        if (currentIndex<dateKeys.length-1) {
          currentIndex++; refreshAll();
        }
      });
  }

  // ==============================
  // 11. 팀 선택 핸들러
  // ==============================
  function canEditSelections() {
    const key = dateKeys[currentIndex];
    const status = (window.matchData[key]||{}).eventStatus;
    return status === 'PENDING_USER_NOT_SELECTED';
  }

  function setupTeamSelectionHandlers() {
    $(`#${gameListId}`)
      .on('click', '.team-box', function() {
        if (!canEditSelections()) return;
        const id = $(this).data('game-id'), tm = $(this).data('team');
        window.appState.selectedTeams[id] = tm;
        updateSubmitButton();
      });
  }

  // ==============================
  // 12. 제출 핸들러
  // ==============================
  function setupSubmitHandler() {
    $('#submit-allkill-btn').on('click', function() {
      const key    = dateKeys[currentIndex];
      const status = window.matchData[key]?.eventStatus;
      const games  = window.matchData[key]?.games || [];

      // 오직 'PENDING_USER_NOT_SELECTED' 상태에서만 동작
      if (status === 'PENDING_USER_NOT_SELECTED') {
        // 1) 메모리상 상태 변경
        window.matchData[key].eventStatus = 'PENDING_USER_SELECTED';
        // 2) 제출 시각 저장
        window.appState.submissionTimes[key] = new Date();
        // 3) UI 갱신
        updateSubmitButton();
        updateTitleAndCountdown();
        // 4) 경기 전이라면 alert
        if (games.every(g => g.status==='경기전')) {
          alert('제출 완료 !\n\n경기시작 전까지 수정이 가능합니다.\n\n확인.');
        }
      }
      // 그 외 상태에서는 클릭 무시
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
