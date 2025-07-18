// js/section/winners.js
window.userData = window.userData || {};
const PAGE_SIZE = 10;

// Winners Section
function initWinnersSection() {
  const { formatNumber } = window.utils;
  // 이 섹션 전용으로 범위를 좁혀 사용할 변수
  const $sec = $('#winners-section');
  // ─── 페이지 상태 초기화 ───
  // data.js 에서 불러온 전체 멤버 배열 (전역 members 변수)
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
  const winnerDateRaw = (members[0]?.date || '').split('-')[2];
  const winnerDate = winnerDateRaw ? String(parseInt(winnerDateRaw, 10)) : '';
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
    <p class="unit-label">단위 : 원</p>
    <div class="member-list" id="member-list"></div>
  `;
  
  $sec.html(sectionHtml);
  
  // Render member list (현재 페이지 멤버만)
  const memberListHtml = currentMembers
    .map(member => {
      // 닉네임이 한글 6글자 이상이면 6글자+..으로 표기
      let displayName = member.nickname;
      const hangulMatch = displayName.match(/^[가-힣]{6,}$/);
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
            ${formatNumber(member.amount)}
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

function scrollWinnersSectionToBottom() {
  const section = $('#winners-section');
  const sectionBottom = section.offset().top + section.outerHeight();
  const viewportHeight = window.innerHeight;
  const scrollTo = sectionBottom - viewportHeight;
  window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'auto' });
}

// Export the initialization function
window.winnersSection = {
  init: initWinnersSection
};
