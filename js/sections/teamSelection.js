// teamSelection.js

(function($) {
  // ==============================
  // 1. 설정 및 상태 변수
  // ==============================
    // 양옆에 들어갈 아이콘 (채점 중, 올킬 도전, 제출 완료)
  const iconBothLeft   = 'iconBothLeft.gif';
  const iconBothRight  = 'iconBothRight.gif';
  // 오른쪽에만 들어갈 아이콘 (다음 경기 도전, 올킬 성공)
  const iconSingle     = 'iconSingle.gif';
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
  // 6. 경기 리스트 렌더링
  // ==============================
  function renderGames() {
  const key     = dateKeys[currentIndex];
  const matches = window.matchData[key] || [];
  const $list   = $(`#${gameListId}`).empty();

  matches.forEach(match => {
    // 1) disable 여부 판단
    const isSuspended = ["서스펜드", "우천취소", "경기취소"].includes(match.status);
    const isFailed    = match.status === "경기종료" && match.eventResult === "fail";

    // 2) fade 여부 판단
    const fadeClass = match.eventResult === 'fail' ? 'faded' : '';

    // 3) game-item 생성 & 클래스 토글
    const $gameItem = $('<div>')
      .addClass('game-item')
      .toggleClass('disabled', isSuspended || isFailed)
      .addClass(fadeClass)
      .attr('data-game-id', match.gameId);

    // 4) 홈팀 컬럼
    const selected     = window.appState.selectedTeams?.[match.gameId] ?? match.userSelection;
    const homeSelClass = selected === 'home' ? 'selected-home' : '';
    const homeHigh     = match.home.votes >= match.away.votes ? 'higher' : 'lower';
    const $homeCol = $('<div>').addClass('team-column');
    const $homeBox = $('<div>')
      .addClass(`team-box ${homeSelClass}`)
      .attr('data-game-id', match.gameId)
      .attr('data-team', 'home')
      .append(
        $('<img>')
          .addClass('team-logo')
          .attr('src', match.home.logo)
          .attr('alt', match.home.teamName),
        $('<span>')
          .addClass('team-name')
          .text(match.home.teamName)
      );
    const $homeVote = $('<div>')
      .addClass(`vote-count ${homeHigh}`)
      .text(match.home.votes);
    $homeCol.append($homeBox, $homeVote);

    // 5) 상태 영역
    const statusHtml = renderStatusSection(match);
    const $statusSection = $(statusHtml);

    // 6) 원정팀 컬럼
    const awaySelClass = selected === 'away' ? 'selected-away' : '';
    const awayHigh     = match.away.votes >= match.home.votes ? 'higher' : 'lower';
    const $awayCol = $('<div>').addClass('team-column');
    const $awayBox = $('<div>')
      .addClass(`team-box ${awaySelClass}`)
      .attr('data-game-id', match.gameId)
      .attr('data-team', 'away')
      .append(
        $('<img>')
          .addClass('team-logo')
          .attr('src', match.away.logo)
          .attr('alt', match.away.teamName),
        $('<span>')
          .addClass('team-name')
          .text(match.away.teamName)
      );
    const $awayVote = $('<div>')
      .addClass(`vote-count ${awayHigh}`)
      .text(match.away.votes);
    $awayCol.append($awayBox, $awayVote);

    // 7) 오버레이 (success/fail) HTML
    let overlayHtml = '';
    if (match.eventResult === 'success') {
      overlayHtml = `
        <img
          class="event-overlay success"
          src="https://lh3.googleusercontent.com/fife/ALs6j_E8WBg5Y8fwDyiOTEpMpLy9RNIKF6QKPcJMV4u7S3c8BCG_Hw0C_7Axa8-ss2nXYKGVmatoG7Gzy2ihsTlXrYHkAPN1_CArzZJeAM4WYK6IYWG7L6ZHG4v9p0MfdEZdrhT8Sg4EKuFS7KN71ONcFIL91-r0BYBdLg8XD2jjOMrTQwAJGdeWVKZRczxMMF4pSaa0L2uw6NvjaZ4W1A2P5j0i6LoiMjm_osD8_zpxnxmd-0CsoYhVrA-4G0Mk41AmpBMHh8P3xLdd4AisfpRGyJfoBODDQg5vkdhvs7nSn2hR_xXzJLwUVdRkX4VYloggn_2rrFnlPjnbhSr6w37F7arpdOk9rm9ljB92UXPnBrdpPQU_5wySlukzGWC6gOhoUjidOMtsPNqwCKlFNGGNZ6ZvNs7qAUV50aQQk5etkqmgMj-mxJgrsIA5P5ZZ84fOJa1Qmn2Pz5War0iLbKNOogxZmg2K60HtSifY4pHGO4lnO5gQKLeNrl59fwHC7WRGrQ9LMsnX0rOEUcmj4JtGd4XgzrBnN2mFGER9JGCNpGsKLO1VL2NJsgOre-boj0PV9w96QB5OCAr9JEwFSRMXZMUEIPDwFckVgv3GGEcJvn6961Ws6p7cU0CUHZt9JgJJWh1kV40ZnuIYj9U-GKpwacmZM9lRRkXVUXESE32Ma8J51ZNiA1dG3vNIY3QJRjuf-wGQHK_IGslD5iqpHCuP7Gf_xVcIS8wqYanrDO9ES83GnZ8tJjdfVRsBrBWwPi1X_bcYL3EcX6oU_c6LuBttN1RunkJg7myzOiUMf__sysv21ttoNqe7TgFrbh6AXAN0Cu6yYHUQ6n6ZJasfNMkL4Yt49LKZPXtM6vxZcA8kUokoKOGCAWLdKxKZuqPttVkFA2rxR0O1V8cSd8RkPa7s0kHsV3MeDDOHbttGtoKj5inLgN1Goq7IEgxjuEpCtvckgDTydRGD0QnpoNGG2OkAMByuNZtTVr_9CFPRPZ45mBRu0Y2GWidQ3L9bIoaKnwYd0G775nV6LFtDRukC4KI0aGnvBD40zdL1AYeI4bcDs_a2yRI5Jqh4fHr18TjFwod3TqoF_x1O5hTnmPR-shh_P_b3LtsP2GQujymcS8nNXwnIft5VwSNxRcpZP3qjfKqRaQ_xeND4sO0bQvVBsOVfiMnHggi19rU85nh-Oq34Ko7egqDdoW8wVpXQv2e_9rNEfNoPHC_d81VOGB3yP6ohdygDZIthkfDh8bfKpajpBTWF-ar47986qQdqCMLtgDmDLYUD3aFlWCgAEfFHTEG0zubE7ci4W_tfC11JdK9e2TLt3ns7gvzPk6Ody0hYyPsZbFUfaBaoG-cwPQ16Hi6t4_535OKKXH6W8joQ-yYhtfTPsCKnj2ufVUIcMes1n_0pkKTMQoZ4QL29Kz3I74m160PRDEuchqvPDb49EELP9NTbHt-wFsTbhJN_QzlAZX6mQ5clmrnEEy_oFZljGoKvz47qiZgAvgPOBassmJ5tDEok0EyAeyta1OrD9rmwQPBAOSLGqvkKb3LfGLXc0J8jLR_tdCob7T6RNSEdaHSV4qxf7TGOnVw333Zxlis5AQoCy6-GdVqD1TNHPWCQeuGZmftZ=w1920-h911?auditContext=prefetch"
        />
      `;
    } else if (match.eventResult === 'fail') {
      overlayHtml = `
        <img
          class="event-overlay fail"
          src="https://lh3.googleusercontent.com/fife/ALs6j_EpFfhiRZ1tTh7WbvSDnrxMEaZYxPrpV-0LR7xI9qR3ShwR73lnF8A6pZDePS__YWXSOhao1zeNSpeaI1u_3C-xIO-DkGEg9T2xQILuWcApFKRXaCyvZ1yTfd8LaMswio6tzGUoKHXRp7UsHSTU5zeBhwRz_OYOfLiaA2PCe5BXrpxfTPCA_jxwRnIZF5bGF39lKPEMc5Q3FWp8et3DoYbGYtXGqTbFpMWuoDNYqo1NHQZyYt6YoGVO87l2urHIXfiPd8MxZvHbxfz4Oc3r6zppoNjMnn3RB19lvTsHPF7QgsjUJ3d8W-l-r9AJyBNpK_77KjMgafn3JEXi9dB-KcRYBcPlklZe6HvWT-T_iObbsD1X1ypouYxEUy0JUSY5leSPBwsGA81NRrJepne3YGYevkhPTotUJpm6_F3puu1-UMtdApL-bOrNUylUfKg-evvoZoGZQO6wjZAvDwefz1qAvlP5pjanZ26_lvpzjrfw8HLskJVt3XibjzzoQEOoo5VLsE_0Mibnqr79CQJ3WyDjjSD0gZ8px26xFUap-zeTbtZ6SrhKEYWiHfYXOM1RWAtJX7lsIzp2A2--oGmcMEV0EURmpsc3ciW8iKfydqcHdQowfgNxdlHoUyZTfosLY4LxqZxEaxpLc6_Rkp7I6K3trOYBVKQBV4yQfjofLq9EHZNHdUY4eGJL3EXAWf4o2PTu1FIiyRlC8sOp6KVkMeEUvR1IZ7iEYczeERZKQKAIID7pVpuJTw05OmVTmgv4lWObc3TZ8TjBESNuQDXj_U_sx632Y4zcN1NPmlDK7ZRGs_MdNDSQ61KOSLG_T-_2xONQsAbw3PgDTPi8wp6Algid7h5MP6ET0a_YZF7yiKQXAm3g1KKfi4yg2XENZB7isDWRqwXfKqspoP96K0mC-29j1wUS4n_da2TYjmhunmKjIpjgQ3gp9p1_owKd6XIuBE5aJOVxwGSx9SnfvudooLQN4YBspG4cUCX68G9Ij_XKVHX_a0-tIyncXrg9Yf9EONX7zqEm4A3IHedMnZFjqzPEKfp-8VxMvap-DoKVhoNCgj5mF9L0FIIKU4bw9n2ZKuyNcll_xXUYakDLEXmXhn6enFW_gSxvyUdC4s1vOuRpeLLPcNhtCDkaDWWDkUPixmKH-Ow_cwKGs2m6fU6S7MlZIjuI2IFqiiAKVFLFnmwP96O6LpRpxngaoZMI7qsX_cYCmjdE12GX5c5jM7OxfeBH0WhAaoeV2_095_PfMWjRFBRTa16dG1JzGLjj1wUd0Q46DywdjeM3q7CcHZctUNOYdGk5PIf6tNwo2hChvZ_KIZzA9bk9TmDiOabzp1KFrR86oyuIEHVyMZl__azd7jN9cLS5fPwZ1sCmig4tGxPoEb8yoKEyFANPx6nZw2ZdB_uRWnE8KoJGfCLiv96rNC4XGINO2n2VDgv_pbr3czoi91Hk3_qJaN0F_giprLM82gDpJH_wWyUV8v7pULy1pK6l73f_07RPPCGD8a3dL-qErM3osooOfM3OKoNCXXkPrgZiAGfwzxjnfao7n98eIg7Lopwy-ugFjpko3ymJv6NdQMvLC1B2FwYxhZJ05MXufX20hZiPbv24K45LdJJb-y-o=w1920-h911?auditContext=prefetch"
        />
      `;
    }
    // 8) 순서에 맞춰 append
    $gameItem
      .append($homeCol)
      .append($statusSection)
      .append($awayCol)
      .append(overlayHtml);

    // 9) 리스트에 추가
    $list.append($gameItem);
  });

  // 10) 제출 버튼·타이틀/카운트다운 업데이트
  updateSubmitButton();
  updateTitleAndCountdown();
   const okAll = matches.filter(m => m.eventResult === 'success').length === matches.length
    && matches.length > 0;
  if (okAll) {
    $list.append(`
      <img
        src="https://lh3.googleusercontent.com/fife/ALs6j_HLjV71pueAKjeoThJtL1v8ZFtKk8kLiDkn_tI9eeG-G0M07IUdslk86TIaFrnD9MH_hxpUELJOL5-GkI5LJjrJ4ZkgIyIWzIqlbQ17jASB15Xor-WD8tZYb24_jZKTSsWMmJecd0V2Pf6V23rsZ-av1TSfhKnD6Gl3PGsYzd_hmRHZsnC5g1I8ZX65uf6Hgg1rGGfkSZwGfy5sjEn9LQ-cB-OdoLQMZBvbNOV3U5MB8Yq_340-_9BdHDfTEAZ-S8HzTWS3wBWORcZ1Gd2HO9_-yjwT7pCRhfaCVcsNdSfX80BygO1QOUzWfsoa4INJmDNitNzMQXA2lsKRsluTvXVrAUGhayfZj5xzgHDPjWTrLv5_lFnFViWVbQEds4pDNzomQFTpeM2eKI8sb4if5FHNhzgwjms-MkQfjtGtFfaQWsSNx-hPa3OlvqLE1zwS-n-fu9FkFMUrYd321gOIpoCLVZsvdrsGw5M_UNdhkQ-1CEwOYeDqCe_TWUWQtAwNH_QkYJw_JzPKFbhN2uOWEIjJSWWfqxt0r1mHbVd51Sx0PcSrCqqou11KBgRv1IdaavO76VJsWt-Dhd036v-AeUgP2e00U0h37q_pgNuvkWluLZ_3VZ-O7RTvqWsmpYI4CYmb8RIyM620SAIw53UiPknr7DV2HbjVvt3Y8sHdweSdsCmkaboXTtc_PTE6c-TqnzhoQoP_I6msWh9Cqiv4dvv5FOtFFk9DcvdpBZxn52G-pAGbtnC1CBVnQXt_r_BHpn_PvcU5eIalkUkI87YkCp0Hcpvtvdo40wz-RL3shPKTsBvkJ84l4TZT0wR0y9Kha-xa368vLa8RaY32dZCIk5Z8e3JlGGNBNmfjECavvwwg4S6C_ig5lZxUlSXL6_BX_NhE6IOTDU1mpLj3CiBN8DIlbgsn30Cce2JMiFSGKYDEIVa0t_0A2Skp0yEHEn5UAwDrM7JQu_J7BXjn68mK_GQ-w97oLFgiC_8dOxy34faGolAlE3CQ5gmX6Opx4e4F1oJIICTLfpweBltatqrOkoRJ1j-JauHVip2a2hFe61PHQiBjP_x8_KjDjZ5T1aYVSR5yE5wLFfVWXP0gNbnDTkUNpzrnva9ln0n_vj0zwLmheVZZNSt_dlM5PKy5jfvHijWfipO6wt5xjQzZY6462MhJe7Zy0EBO-daxksGFlbdrBDRNEk6HR6xMjC2qqdO6aFO5JkMJR37NCp-sgTwi1UjVIK8lrsgZaePJJZmqFJEN5XXcHD1q3_mfJnuXh3n7C8ovADrnrQfvxBUinz7LAFpvyLm8JDYu9j9gw9GOj3b2MSvweu6dRwQq_9UN9rM-IX7r94xAjfrVz6fwqAjNFMNX8S8kthQzAYTDopT4FnpESEL8v_fMadWZjmK-Xp3ZKqGxsAJpr5UTa4wAlXRZC2QcgP5_YBVx4NOm9SwHw6S35TgKXtstEADxijeLACXckFkYeSiG-_jF-R-MEBYoRoXPFm9q1SoLO4rdNqiNuzoHDD6DVf5S5fs4XBj17-hpNND36ulJ9faSIVRp3m8Gwg7O30GwCdY7Vm0u_d_ui7ZDfTy9F6kF-zQNLqW5HchUrD5DOH0pNGuLmlCgw5i_Mq8M=w1902-h910?auditContext=forDisplay"
        alt="올킬 도장"
        class="allkill-stamp"
      />
    `);
  }
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

