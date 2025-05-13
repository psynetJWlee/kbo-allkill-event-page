// js/sections/myPrizeSection.js

;(function(window, $) {
  // My Prize Section 초기화 함수
  function initMyPrizeSection() {
    const userData     = window.userData;
    const prizeHistory = window.prizeHistory;
    const { formatNumber } = window.utils;

    // 대상 컨테이너
    const $container = $('#my-prize-section');
    if ($container.length === 0) {
      console.error('[initMyPrizeSection] #my-prize-section not found');
      return;
    }

    // HTML 템플릿 생성
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
          
          <p class="prize-amount">${formatNumber(userData.totalAmount)} 원</p>
          
          <button class="request-button">상금 지급 신청</button>
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

    // 컨테이너에 삽입
    $container.html(sectionHtml);

    // 상금 내역 리스트 렌더링
    const historyItemsHtml = prizeHistory.map(item => `
      <div class="history-item">
        <p class="history-date">${item.date}</p>
        <p class="daily-prize">${formatNumber(item.amount)}</p>
      </div>
    `).join('');
    $('#prize-history-items').html(historyItemsHtml);

    // 페이지네이션 이벤트 바인딩
    setupPaginationHandlers();
  }

  // 페이지네이션 핸들러
  function setupPaginationHandlers() {
    // 개별 페이지 번호 클릭
    $('.page-item[data-page]')
      .off('click')
      .on('click', function() {
        const page = parseInt($(this).data('page'), 10);
        handlePageChange(page);
      });

    // 이전 버튼
    $('#prev-page')
      .off('click')
      .on('click', function() {
        if (window.userData.currentPage > 1) {
          handlePageChange(window.userData.currentPage - 1);
        }
      });

    // 다음 버튼
    $('#next-page')
      .off('click')
      .on('click', function() {
        if (window.userData.currentPage < window.userData.totalPages) {
          handlePageChange(window.userData.currentPage + 1);
        }
      });
  }

  // 페이지 변경 처리
  function handlePageChange(page) {
    window.userData.currentPage = page;
    initMyPrizeSection();
  }

  // 전역에 노출
  window.myPrizeSection = {
    init: initMyPrizeSection
  };

})(window, jQuery);
