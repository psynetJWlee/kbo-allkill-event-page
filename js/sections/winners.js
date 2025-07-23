// js/section/winners.js
window.userData = window.userData || {};
const PAGE_SIZE = 10;

// Winners(당첨자) 섹션 초기화 함수
function initWinnersSection() {
  const { formatNumber } = window.utils;
  // 이 섹션 전용으로 범위를 좁혀 사용할 변수
  const $sec = $('#winners-section');
  // ───── 페이지 상태 초기화 ─────
  // data.js에서 불러온 전체 멤버 배열 (전역 members 변수)
  const allMembers = members;   
  const totalCount = allMembers.length;

  // 총 페이지 수 계산
  userData.winners.totalPages  = Math.ceil(allMembers.length / PAGE_SIZE);
  
  // 현재 페이지가 설정되어 있지 않으면 1로
  userData.winners.currentPage = userData.winners.currentPage || 1;

  // 현재 페이지에 보여줄 슬라이스
  const startIdx = (userData.winners.currentPage - 1) * PAGE_SIZE;
  const endIdx   = startIdx + PAGE_SIZE;
  const currentMembers = allMembers.slice(startIdx, endIdx);
  

  // members 배열에서 날짜 추출 (가장 첫 번째 멤버의 date 사용)
  const winnerDateRaw = (members[0]?.date || '');
  let winnerDate = '';
  if (winnerDateRaw) {
    const [yyyy, mm, dd] = winnerDateRaw.split('-');
    winnerDate = `${parseInt(mm, 10)} / ${parseInt(dd, 10)}`;
  }
  const sectionHtml = `
    <div class="w-full flex flex-col items-center relative">
      <div class="winners-title">
        <span class="title-text">${winnerDate ? winnerDate + '일 당첨자' : '오늘의 당첨자'}</span>
        <div class="title-underline"></div>
      </div>
      <p class="winners-count w-full text-center">
        총 ${totalCount}명
      </p>
    </div>
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

  // PENDING_USER_NOT_SELECTED 상태의 가장 가까운 날짜로 올킬 도전 버튼 텍스트 반환
  function getNextPendingAllkillText() {
    let btnText = '올킬 도전';
    if (window.matchData) {
      const pendingDates = Object.entries(window.matchData)
        .filter(([date, data]) => data.eventStatus === 'PENDING_USER_NOT_SELECTED')
        .map(([date]) => date);
      const today = new Date();
      const closest = pendingDates
        .map(dateStr => ({ dateStr, dateObj: new Date(dateStr) }))
        .filter(({ dateObj }) => dateObj >= today)
        .sort((a, b) => a.dateObj - b.dateObj)[0];
      if (closest) {
        const [yyyy, mm, dd] = closest.dateStr.split('-');
        btnText = `${parseInt(mm)}월 ${parseInt(dd)}일<br>올킬 도전`;
      }
    }
    return btnText;
  }

  // 페이징 하단에 올킬 도전 버튼 추가
  if ($sec.find('.go-to-team-selection-btn').length === 0) {
    const btnText = getNextPendingAllkillText();
    $sec.append(`<button id="go-to-team-selection" class="go-to-team-selection-btn">${btnText}</button>`);
  }
  // 버튼 클릭 시 team selection 상단으로 스크롤
  const goToBtn = document.getElementById('go-to-team-selection');
  if (goToBtn) {
    goToBtn.addEventListener('click', () => {
      const section = document.getElementById('kbo-selection-container');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

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
