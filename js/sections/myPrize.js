// My Prize Section
const PAGE_SIZE = 10;

// 숫자 3자리마다 쉼표 삽입 유틸(폴백)
window.utils = window.utils || {};
window.utils.formatNumber = window.utils.formatNumber || function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// ==============================
// 1) 페이지 핸들러 정의 (반드시 initMyPrizeSection보다 위에)
// ==============================
function setupPaginationHandlers() {
  // 페이지 번호 직접 클릭
  $('.page-item[data-page]')
    .off('click')
    .on('click', function() {
      const page = parseInt($(this).data('page'), 10);
      handlePageChange(page);
    });

  // 이전 페이지 클릭
  $('#prev-page')
    .off('click')
    .on('click', function() {
      if (userData.currentPage > 1) {
        handlePageChange(userData.currentPage - 1);
      }
    });

  // 다음 페이지 클릭
  $('#next-page')
    .off('click')
    .on('click', function() {
      if (userData.currentPage < userData.totalPages) {
        handlePageChange(userData.currentPage + 1);
      }
    });
}

function handlePageChange(page) {
  userData.currentPage = page;
  initMyPrizeSection();
}

// ==============================
// 2) 실제 섹션 초기화 함수
// ==============================
function initMyPrizeSection() {
  const { formatNumber } = window.utils;

  // ─── 페이지 상태 초기화 ───
  const allHistory = prizeHistory;                           // data.js 에 정의된 전체 내역
  userData.totalPages  = Math.ceil(allHistory.length / PAGE_SIZE);
  userData.currentPage = userData.currentPage || 1;

  const startIdx       = (userData.currentPage - 1) * PAGE_SIZE;
  const endIdx         = startIdx + PAGE_SIZE;
  const currentHistory = allHistory.slice(startIdx, endIdx);

  // 전체 개수 표시용
  const totalCount = allHistory.length;

  // ─── Container HTML ─────────────────────────────────────
  const sectionHtml = `
   <div class="my-prize-container">
     <div class="flex flex-col items-center">
       <h2 class="my-prize-title">My 상금</h2>
     </div>
     
     <div class="prize-group">
        <div class="member-info">
          <img src="/placeholder.svg" class="user-avatar" alt="사용자" />
          <div class="user-info">
            <p class="user-nickname">${userData.nickname}</p>
            <p class="user-text">님 보유상금</p>
          </div>
        </div>
     <div class="prize-history">
       <div class="history-header">
         <p class="history-title">상금 획득 내역 (₩)</p>
         <p class="total-prize">누적 ${formatNumber(userData.totalAmount)}</p>
         <p class="history-count">총 ${totalCount}건</p>
       </div>

       <div class="history-items" id="prize-history-items"></div>

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
     </div>
   </div>
 `;
  
  $('#my-prize-section').html(sectionHtml);

  // ─── 3) 히스토리 렌더 ───────────────────────────────────
  const historyItemsHtml = currentHistory.map(item => {
    const d = new Date(item.date);
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    const weekdayMap = ['일','월','화','수','목','금','토'];
    const wk = weekdayMap[d.getDay()];

    // 금액 부호
    const sign   = item.amount >= 0 ? '+' : '-';
    const absAmt = Math.abs(item.amount);

    return `
      <div class="history-item">
        <p class="history-date">${mm}.${dd} (${wk})</p>
        <p class="daily-prize">${sign}${formatNumber(absAmt)}</p>
      </div>
    `;
  }).join('');
  $('#prize-history-items').html(historyItemsHtml);

  // ─── 4) 페이징 핸들러 바인딩 ───────────────────────────
  setupPaginationHandlers();
}

// Export the initialization function
window.myPrizeSection = {
  init: initMyPrizeSection
};
