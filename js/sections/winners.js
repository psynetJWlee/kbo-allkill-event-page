// js/section/winners.js
window.userData = window.userData || {};
const PAGE_SIZE = 10;

// 날짜별 당첨자 데이터 관리
let currentWinnerDate = '2025-08-24'; // 기본 날짜
const availableWinnerDates = ['2025-08-20', '2025-08-21', '2025-08-22', '2025-08-23', '2025-08-24'];

// 날짜 포맷 변환 (mm월 dd일)
function getDisplayDate(dateKey) {
  const [year, month, day] = dateKey.split('-');
  return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
}

// 현재 날짜의 당첨자 데이터 가져오기
function getCurrentDateMembers() {
  return members.filter(member => member.date === currentWinnerDate);
}

// 날짜 내비게이션 렌더링
function renderDateNavigation() {
  const currentIndex = availableWinnerDates.indexOf(currentWinnerDate);
  const prevDate = currentIndex > 0 ? availableWinnerDates[currentIndex - 1] : null;
  const nextDate = currentIndex < availableWinnerDates.length - 1 ? availableWinnerDates[currentIndex + 1] : null;
  
  const prevArrow = prevDate 
    ? `<div class="nav-arrow prev" data-key="${prevDate}"></div>`
    : '<div class="nav-arrow-placeholder"></div>';
    
  const nextArrow = nextDate 
    ? `<div class="nav-arrow next" data-key="${nextDate}"></div>`
    : '<div class="nav-arrow-placeholder"></div>';

  return `
    <div class="w-full flex flex-col items-center relative">
        ${prevArrow}
        <div class="win-title">
              <div class="winners-title">
                <span class="title-text">${getDisplayDate(currentWinnerDate)} 당첨자</span>
                <div class="title-underline"></div>
              </div>
              <p class="winners-count w-full text-center">
                총 ${getCurrentDateMembers().length.toLocaleString()}명
              </p>
        </div>
        ${nextArrow}
    </div>
  `;
}

// Winners(당첨자) 섹션 초기화 함수
function initWinnersSection() {
  const { formatNumber } = window.utils;
  // 이 섹션 전용으로 범위를 좁혀 사용할 변수
  const $sec = $('#winners-section');
  // ───── 페이지 상태 초기화 ─────
  // 현재 날짜의 멤버 배열만 필터링
  const allMembers = getCurrentDateMembers();   
  const totalCount = allMembers.length;

  // 총 페이지 수 계산
  userData.winners.totalPages  = Math.ceil(allMembers.length / PAGE_SIZE);
  
  // 현재 페이지가 설정되어 있지 않으면 1로
  userData.winners.currentPage = userData.winners.currentPage || 1;

  // 현재 페이지에 보여줄 슬라이스
  const startIdx = (userData.winners.currentPage - 1) * PAGE_SIZE;
  const endIdx   = startIdx + PAGE_SIZE;
  const currentMembers = allMembers.slice(startIdx, endIdx);
  
  const sectionHtml = `
    ${renderDateNavigation()}
    <div class="member-list" id="member-list"></div>
  `;
  
  $sec.html(sectionHtml);
  
  // 당첨자 리스트 렌더 (현재 페이지 멤버만)
  const memberListHtml = currentMembers
    .map(member => {
      // 닉네임이 한글 6글자 이상이면 6글자+..으로 표시
      let displayName = member.nickname;
      const hangulMatch = displayName.match(/^[\uac00-\ud7a3]{6,}$/);
      if (hangulMatch) {
        displayName = displayName.slice(0, 5) + '..';
      }
      return `
        <div class="member-card">
          <div class="member-profile">
            <img
              src="${member.profileImage || '/image/profile.png'}"
              alt="${member.nickname} 프로필"
              class="member-avatar"
            />
            <span class="member-nickname">${displayName}</span>
          </div>
          <span class="member-amount">
            ${formatNumber(member.amount)} 원
          </span>
        </div>
      `;
    })
    .join('');
  
  // ==============================
  // 공통 페이지네이션 번호 계산 함수
  // ==============================
  function getPaginationPages(currentPage, totalPages, maxPages = 5) {
    const pages = [];
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let end = start + maxPages - 1;
    if (end > totalPages) {
      end = totalPages;
      start = end - maxPages + 1;
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // 3) 페이징 HTML (한 번만!)
  const paginationHtml = `
    <div class="pagination">
      <div class="pagination-content">
        <div id="prev-page" class="page-item ${userData.winners.currentPage === 1 ? 'disabled' : ''}">&lt;</div>
        ${getPaginationPages(userData.winners.currentPage, userData.winners.totalPages, 5).map(page => `
          <div class="page-item ${userData.winners.currentPage === page ? 'active' : ''}" data-page="${page}">
            ${page}
          </div>
        `).join('')}
        <div id="next-page" class="page-item ${userData.winners.currentPage === userData.winners.totalPages ? 'disabled' : ''}">&gt;</div>
      </div>
    </div>
  `;
  
  $sec.find('#member-list').html(memberListHtml + paginationHtml);

  // 공통 go-to-team-selection 버튼 생성 함수
  function createGoToTeamSelectionButton(targetSelector) {
    const todayKey = formatLocalDate(new Date());
    const todayStatus = window.matchData?.[todayKey]?.eventStatus;

    const hideStatuses = [
      'PENDING_USER_SELECTED',
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED'
    ];
    const greyStatuses = [
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED',
      'NO_GAMES_EVENT_DISABLED',
      'EVENT_CANCELLED_MULTI_GAMES'
    ];

    let showGoToBtn = false;
    let goToBtnClass = 'go-to-team-selection-btn';
    let goToBtnText = '';

    if (todayStatus === 'PENDING_USER_NOT_SELECTED') {
      showGoToBtn = true;
      goToBtnClass = 'go-to-team-selection-btn yellow-btn';
      const today = new Date();
      const todayDisplay = `${today.getMonth() + 1}월 ${today.getDate()}일`;
      goToBtnText = `<span class="btn-date">${todayDisplay}</span><br><span class="btn-challenge">올킬 도전</span>`;
    } else if (greyStatuses.includes(todayStatus)) {
      showGoToBtn = true;
      goToBtnClass = 'go-to-team-selection-btn grey-btn';
      const today = new Date();
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      const tomorrowDisplay = `${tomorrow.getMonth() + 1}월 ${tomorrow.getDate()}일 올킬`;
      goToBtnText = `<span class="btn-date">${tomorrowDisplay}</span><br><span class="btn-open">당일 00시 오픈</span>`;
    } else if (hideStatuses.includes(todayStatus)) {
      showGoToBtn = false;
    }

    if (showGoToBtn) {
      const btnHtml = `<button id="go-to-team-selection" class="${goToBtnClass}">${goToBtnText}</button>`;
      $(targetSelector).append(btnHtml);
      document.getElementById('go-to-team-selection').onclick = function() {
        // 회색 버튼(grey-btn)인 경우 스크롤 기능 비활성화
        if (this.classList.contains('grey-btn')) {
          return;
        }
        const section = document.getElementById('kbo-selection-container');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }
  }
  // 페이징 하단에 올킬 도전 버튼 추가 (기존 로직 삭제)
  // createGoToTeamSelectionButton('#winners-section');

  // 날짜 내비게이션 이벤트 핸들러
  $sec.find('.nav-arrow').off('click').on('click', function() {
    const targetDate = $(this).data('key');
    if (targetDate && !$(this).hasClass('disabled')) {
      currentWinnerDate = targetDate;
      userData.winners.currentPage = 1; // 날짜 변경 시 첫 페이지로
      initWinnersSection();
      setupPaginationHandlers();
    }
  });

  // 페이징 이벤트 핸들러
  setupPaginationHandlers();
}

// 페이징 이벤트 핸들러 설정
function setupPaginationHandlers() {
  const $sec = $('#winners-section');
  
  // 이전 페이지
  $sec.find('#prev-page').off('click').on('click', () => {
    if (userData.winners.currentPage > 1) {
      userData.winners.currentPage--;
      initWinnersSection();
      scrollWinnersSectionToBottom();
    }
  });
  // 다음 페이지
  $sec.find('#next-page').off('click').on('click', () => {
    if (userData.winners.currentPage < userData.winners.totalPages) {
      userData.winners.currentPage++;
      initWinnersSection();
      scrollWinnersSectionToBottom();
    }
  });
  // 페이지 번호 직접 클릭
  $sec.find('.page-item[data-page]').off('click').on('click', function() {
    const page = Number($(this).data('page'));
    if (page !== userData.winners.currentPage) {
      userData.winners.currentPage = page;
      initWinnersSection();
      scrollWinnersSectionToBottom();
    }
  });
}

// 당첨자 섹션 하단으로 스크롤
function scrollWinnersSectionToBottom() {
  const section = $('#winners-section');
  const sectionBottom = section.offset().top + section.outerHeight();
  const viewportHeight = window.innerHeight;
  const scrollTo = sectionBottom - viewportHeight;
  window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'auto' });
}

// 초기화 함수 내보내기
window.winnersSection = {
  init: initWinnersSection
};
