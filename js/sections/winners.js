
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
  

  // Container HTML
  const sectionHtml = `
    <div class="w-full flex flex-col items-center relative">
      <div class="winners-title">
        <span class="title-text">오늘의 당첨자</span>
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
      return `
        <div class="member-card" style="border: 0.5px solid #FFFFFF;">
          <div class="member-profile">
            <img
              src="${member.profileImage || '/placeholder.svg'}"
              alt="${member.nickname} 프로필"
              class="member-avatar"
            />
            <span class="member-nickname">${member.nickname}</span>
          </div>
          <span class="member-amount">
            ${formatNumber(member.amount)}
          </span>
        </div>
      `;
    })
    .join('');
  
  // 3) 페이징 HTML (한 번만!)
  const paginationHtml = `
    <div class="pagination">
      <div class="pagination-content">
        <div id="prev-page" class="page-item ${userData.winners.currentPage === 1 ? 'disabled' : ''}">&lt;</div>
        ${Array.from({ length: userData.winners.totalPages }, (_, i) => i + 1).map(page => `
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
    }
  });
  // 다음 페이지
  $sec.find('#next-page').off('click').on('click', () => {
    if (userData.winners.currentPage < userData.winners.totalPages) {
      userData.winners.currentPage++;
      initWinnersSection();
    }
  });
  // 페이지 번호 직접 클릭
  $sec.find('.page-item[data-page]').off('click').on('click', function() {
    const page = Number($(this).data('page'));
    if (page !== userData.winners.currentPage) {
      userData.winners.currentPage = page;
      initWinnersSection();
    }
  });
}

// Export the initialization function
window.winnersSection = {
  init: initWinnersSection
};
