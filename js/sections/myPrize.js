
// My Prize Section
+export function initMyPrizeSection() {

  const { formatNumber } = window.utils;
  const container = document.getElementById('my-prize-section');
  if (!container) {
    console.error('[initMyPrizeSection] #my-prize-section not found');
    return;
  }
  
  const sectionHtml = `
    <div class="my-prize-container">
      <div class="flex flex-col items-center">
        <h2 class="my-prize-title">
          My 상금
        </h2>
      </div>
      
      <div class="prize-group">
        <div class="member-info">
          <img src="/placeholder.svg" class="user-avatar" alt="사용자" />
          <div class="user-info">
            <p class="user-nickname">${userData.nickname}</p>
            <p class="user-text">님 보유상금</p>
          </div>
        </div>
        
        <p class="prize-amount">${formatNumber(userData.totalAmount)} 원</p>
        
        <button class="request-button">
          상금 지급 신청
        </button>
      </div>
      
      <div class="prize-history">
        <div class="history-header">
          <p class="history-title">상금 획득 내역 (₩)</p>
          <p class="total-prize">누적 ${formatNumber(userData.totalAmount)}</p>
        </div>
        
        <div class="history-items" id="prize-history-items"></div>
        
        <div class="pagination">
          <div class="pagination-content">
            <div id="prev-page" class="page-item ${userData.currentPage === 1 ? 'disabled' : ''}">
              &lt;
            </div>
            
            ${Array.from({ length: userData.totalPages }, (_, i) => i + 1).map(page => `
              <div class="page-item ${userData.currentPage === page ? 'active' : ''}" data-page="${page}">
                ${page}
              </div>
            `).join('')}
            
            <div id="next-page" class="page-item ${userData.currentPage === userData.totalPages ? 'disabled' : ''}">
              &gt;
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  $('#my-prize-section').html(sectionHtml);
  
  // Render prize history
  const historyItemsHtml = prizeHistory.map(item => {
    return `
      <div class="history-item">
        <p class="history-date">${item.date}</p>
        <p class="daily-prize">${formatNumber(item.amount)}</p>
      </div>
    `;
  }).join('');
  
  $('#prize-history-items').html(historyItemsHtml);
  
  // Set up pagination handlers
  setupPaginationHandlers();
}

// Set up pagination handlers
function setupPaginationHandlers() {
  $('.page-item[data-page]').on('click', function() {
    const page = parseInt($(this).data('page'));
    handlePageChange(page);
  });
  
  $('#prev-page').on('click', function() {
    if (userData.currentPage > 1) {
      handlePageChange(userData.currentPage - 1);
    }
  });
  
  $('#next-page').on('click', function() {
    if (userData.currentPage < userData.totalPages) {
      handlePageChange(userData.currentPage + 1);
    }
  });
}

// Handle pagination page change
function handlePageChange(page) {
  userData.currentPage = page;
  initMyPrizeSection();
}

// Export the initialization function
window.myPrizeSection = {
  init: initMyPrizeSection
};
