// js/sections/myPrize.js

// My Prize Section
const MY_PRIZE_PAGE_SIZE = 10;

// 숫자 3자리마다 쉼표 삽입 유틸(폴백)
window.utils = window.utils || {};
window.utils.formatNumber = window.utils.formatNumber || function(num) {
  return num.toString().replace(/\B(?=(\d{3})+ (?!\d))/g, ',');
};

// ==============================
// 1) 페이지 핸들러 정의 (반드시 initMyPrizeSection보다 위에)
// ==============================
function scrollMyPrizeSectionToBottom() {
  const section = $('#my-prize-section');
  const sectionBottom = section.offset().top + section.outerHeight();
  const viewportHeight = window.innerHeight;
  const scrollTo = sectionBottom - viewportHeight;
  window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'auto' });
}

function setupPaginationHandlers() {
  const $sec = $('#my-prize-section');
  $sec.find('.page-item[data-page]')
    .off('click')
    .on('click', function() {
      const page = parseInt($(this).data('page'), 10);
      handlePageChange(page);
      scrollMyPrizeSectionToBottom();
    });

  $sec.find('#prev-page')
    .off('click')
    .on('click', function() {
      if (userData.myPrize.currentPage > 1) {
        handlePageChange(userData.myPrize.currentPage - 1);
        scrollMyPrizeSectionToBottom();
      }
    });

  $sec.find('#next-page')
    .off('click')
    .on('click', function() {
      if (userData.myPrize.currentPage < userData.myPrize.totalPages) {
        handlePageChange(userData.myPrize.currentPage + 1);
        scrollMyPrizeSectionToBottom();
      }
    });
}

function handlePageChange(page) {
  userData.myPrize.currentPage = page;
  initMyPrizeSection();
}

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

// ==============================
// 2) 실제 섹션 초기화 함수
// ==============================
function initMyPrizeSection() {
  const { formatNumber } = window.utils;

  // ─── 페이지 상태 초기화 ───
  const allHistory     = prizeHistory;
  userData.myPrize.totalPages  = Math.ceil(allHistory.length / MY_PRIZE_PAGE_SIZE);
  userData.myPrize.currentPage = userData.myPrize.currentPage || 1;

  const startIdx       = (userData.myPrize.currentPage - 1) * MY_PRIZE_PAGE_SIZE;
  const endIdx         = startIdx + MY_PRIZE_PAGE_SIZE;
  const currentHistory = allHistory.slice(startIdx, endIdx);

  // ─── Container HTML ─────────────────────────────────────
  const sectionHtml = `
    <div class="my-prize-container">
      <div class="flex flex-col items-center">
        <div class="my-prize-title">
          <span class="title-text">My 상금</span>
          <div class="title-underline"></div>
        </div>
      </div>
      <div class="prize-group">
        <div class="member-info">
          <img src="/image/profile.jpg" class="user-avatar" alt="사용자" />
          <div class="user-info">
            <p class="user-nickname">${userData.nickname}</p>            
          </div>
        </div>
        <p class="prize-amount">${formatNumber(userData.totalAmount)} 원</p>
        <button class="request-button">상금 지급 신청</button>
      </div><!-- /.prize-group -->
      <div class="prize-history">
        <div class="history-header">
          <p class="history-title">상금 내역</p>
          <p class="total-prize">누적 ${formatNumber(userData.totalAmount)}</p>
        </div>
        <div class="history-items" id="prize-history-items"></div>
        <div class="pagination">
          <div class="pagination-content">
            <div id="prev-page" class="page-item ${userData.myPrize.currentPage === 1 ? 'disabled' : ''}">&lt;</div>
            ${getPaginationPages(userData.myPrize.currentPage, userData.myPrize.totalPages, 5).map(page => `
              <div class="page-item ${userData.myPrize.currentPage === page ? 'active' : ''}" data-page="${page}">
                ${page}
              </div>
            `).join('')}
            <div id="next-page" class="page-item ${userData.myPrize.currentPage === userData.myPrize.totalPages ? 'disabled' : ''}">&gt;</div>
          </div>
        </div>
      </div><!-- /.prize-history -->
    </div><!-- /.my-prize-container -->
  `;
  $('#my-prize-section').html(sectionHtml);

  // ─── 3) 히스토리 렌더 ───────────────────────────────────
    const historyItemsHtml = currentHistory.map(item => {
    const d     = new Date(item.date);
    const mm    = String(d.getMonth() + 1).padStart(2, '0');
    const dd    = String(d.getDate()).padStart(2, '0');
    const wk    = ['일','월','화','수','목','금','토'][d.getDay()];
    const sign = item.amount >= 0 ? '+' : '-';
    const absAmt= Math.abs(item.amount);
    const prizeClass = item.amount < 0 ? 'daily-prize negative' : 'daily-prize';

    return `
      <div class="history-item">
        <p class="history-date">${mm}.${dd} ( ${wk} )</p>
        <p class="${prizeClass}">${sign} ${formatNumber(absAmt)}</p>
      </div>
    `;
  }).join('');
  $('#prize-history-items').html(historyItemsHtml);

  // ─── 4) 페이징 핸들러 바인딩 ───────────────────────────
  setupPaginationHandlers();

  // ─── 5) '상금 지급 신청' 버튼 클릭 핸들러 ─────────────────
  const reqBtn = document.querySelector('.request-button');
  if (reqBtn) {
  reqBtn.addEventListener('click', () => {
    // ─── 추가: 총액이 50,000원 이하면 신청 불가 ────────────
    if (userData.totalAmount <= 50000) {
      alert('상금 신청은 50,000원 초과부터 가능합니다.');
      return;
    }

    const ua = navigator.userAgent;

    // iOS WKWebView
    if (/iPhone|iPad|iPod/i.test(ua)) {
      webkit.messageHandlers.hanpass.postMessage({
        func: 'requestPrize',
        data: {
          amount: userData.totalAmount,   // 신청할 상금 액수
          nickname: userData.nickname         // 사용자 닉네임
        }
      });
    }
    // Android WebView
    else if (/Android/i.test(ua)) {
      window.hanpass.requestPrize();
    }
      // 그 외 웹
      else {
        alert('LIVE스코어 APP 에서만 신청 가능합니다');
      }
    });
  }
}

// Export the initialization function
window.myPrizeSection = {
  init: initMyPrizeSection
};