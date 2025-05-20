// js/section/winners.js
window.userData = window.userData || {};
const PAGE_SIZE = 10;

// Winners Section
function initWinnersSection() {
  const { formatNumber } = window.utils;
// ─── 페이지 상태 초기화 ───
// data.js 에서 불러온 전체 멤버 배열 (전역 members 변수)
  const allMembers = members;   
  const totalCount = allMembers.length;

// 총 페이지 수 계산
  userData.totalPages  = Math.ceil(allMembers.length / PAGE_SIZE);
  
// 현재 페이지가 설정되어 있지 않으면 1로
  userData.currentPage = userData.currentPage || 1;

// 현재 페이지에 보여줄 슬라이스
  const startIdx = (userData.currentPage - 1) * PAGE_SIZE;
  const endIdx   = startIdx + PAGE_SIZE;
  const currentMembers = allMembers.slice(startIdx, endIdx);
  

// Container HTML
  const sectionHtml = `
    <div class="w-full flex flex-col items-center relative">
      <img 
        src="https://lh3.googleusercontent.com/fife/ALs6j_FacrWtWYijSwVbTqua0DDRtUbXaYh1kCfZdJqIAgdSDXYowtjvyQPloHVynbjthBc0mwTa-Jy8oGPo4VgPErfvXXm21Y8YXln5gIz3XMev7te7lH912hVsL2IX4vgt97krVtNvVoSnhL43bwHxYZN7asNsHSNtTPxgXAqBTIum4cHtfrdqTQCEWhHo25j0xE2ceqgrwEt0estpCidJs8CGIkcD-4JEwHYYUZMOOJKY9JmfdoR1HvKNhCgHdO1BJ3l-M217oNw63g8n42lx8qN_FSW68S3nHUv3hAR-vi0iS-4UDZOIC-1xFhlRGohAz73VwFDIoKnqkPhBmfETCo1PMJtx8gj9UwggYDA97tmBgGbDnbO65-KVv8bFLF_SKt_ynLCJK9T05a8IJ94k0zgLn0kS8seAHupCs66jkFVzvai_j46SSr4VpYFem6NI3rxSYTXOFrcdULcc-rO8976eADMpR6VkVvvpzDGs0B-JAyzAyUMUykpCBojfLEbVrKY6GtLoZFHMN7B3VAdw4PZJcJ9xPN2N5EhQhQYyPI5_y9rcwWxdp8yeH3w5VTtune4y36ug0oOb0XEZr5NSAn48fNq_SsyKdC7U8u_U4UwU1PzteI4QSXL5JiZUrN4SnTCdkxspCC0xLcBby2oO4f0BDPgFL8s2HoP76qOYbgFQnPmmgBMSWEiCJrmj-c9RUWcZNlgVO1iKJ8NWLxZTweTKOlztlJifVsWcIC1ZXi01WMfHeCVPgt1e9RIeq8OzXpR6nntiUewEjMCIH2cxlgSsRgQymmLa02aUvejlCwW38VnBPLC1uEY3BJgKU4KhV01SP2kEcWyQlevmD6RdTFTRn50pKvAsNXjLbB8j2jE0zZKR9qp8ZqnBCyV1QrsQcvSvB4g7XtBVXg8GALp-Fcxqem_uGkmnGnDVfo426Gps-k8kkEV-xt1C-SL9kCb1abOcImJ9l3tORqFVSZznjVvhca2jJnkZCXNUpXW1qFkiMV_zp7kqmGwoHrE1ao3k16ymXTfvTtWsGsf-UNnr5FYlw_DLOfZbKtspkou627oiWzZiQIXqxarjpEpM_G0NOA9-2goPcQd8pNEYr0iju4KdAvRK_DZhCyUbt-rPZH-e6e2SMpez3RJ07iNr1JSDMYK2UkJiAshH1rGfnhA8G3EyS4Cxg2NhLtOPMDFR5MniV9o1eH4ixGQnzUq7l5z0URbZTNsRC7El12FoVrJMdttHZGrrIxAUfPRvnjBIKyiHHJvXsuKp3hpqcgG6UGjlBh8EdkgdXfQrBh64fsQR4oDErF7D36ttYYg7uG9wPfVBdZ8tl2NiKS8LhnCe7V1pJ0SljiebKH9yoLjn407pY5IuT2TvJvvg7us8F4g0-F6YDNbmg-O_ray0l-b0OKtDASGcjB08TUUGy-uB_YFHGTR7UwlG-J4_QyqLtapiL5lQu4IjV1vKnZMdyF5PYz_I3WNXk3DNEx_P-K-8yEKO4kb20195vLLdukbgHLUyWFV3vTabBxJbE4sqysSXgLDk89Siazd-Meys5RPV2Dz2wDZz2qGrbXJrr7SFOzqYJ0Rr6LHFp4ZL5FXQTA_dG0BBZCVq6pIUbCBDcwAKnuXQQ4Dl=w1122-h910?auditContext=prefetch" 
        alt="오늘의 당첨자"
        class="winners-title"
      />
      <p class="winners-count w-full text-center">
        총 ${totalCount}명
      </p>
    </div>
    <div class="member-list" id="member-list"></div>
  `;
  
  $('#winners-section').html(sectionHtml);
  
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
            ${formatNumber(member.amount)}원
          </span>
        </div>
      `;
    })
    .join('');
  
// 3) 페이징 HTML (한 번만!)
  const paginationHtml = `
    <div class="pagination">
      <div class="pagination-content">
        <div id="prev-page" class="page-item ${userData.currentPage === 1 ? 'disabled' : ''}">&lt;</div>
        ${Array.from({ length: userData.totalPages }, (_, i) => i + 1).map(page => `
          <div class="page-item ${userData.currentPage === page ? 'active' : ''}" data-page="${page}">
            ${page}
          </div>
        `).join('')}
        <div id="next-page" class="page-item ${userData.currentPage === userData.totalPages ? 'disabled' : ''}">&gt;</div>
      </div>
    </div>
  `;
  
  $('#member-list').html(memberListHtml + paginationHtml);
    // 이전 페이지
  $('#prev-page').off('click').on('click', () => {
    if (userData.currentPage > 1) {
      userData.currentPage--;
      initWinnersSection();
    }
  });
  // 다음 페이지
  $('#next-page').off('click').on('click', () => {
    if (userData.currentPage < userData.totalPages) {
      userData.currentPage++;
      initWinnersSection();
    }
  });
  // 페이지 번호 직접 클릭
  $('.page-item[data-page]').off('click').on('click', function() {
    const page = Number($(this).data('page'));
    if (page !== userData.currentPage) {
      userData.currentPage = page;
      initWinnersSection();
    }
  });
}

// Export the initialization function
window.winnersSection = {
  init: initWinnersSection
};
