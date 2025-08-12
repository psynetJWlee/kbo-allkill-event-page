// js/sections/myPrize.js

// My Prize(내 상금) 섹션
const MY_PRIZE_PAGE_SIZE = 10;

// 숫자 3자리마다 쉼표 삽입 유틸(폴백)
window.utils = window.utils || {};
window.utils.formatNumber = window.utils.formatNumber || function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// ==============================
// 토스트 알림 관련 함수들
// ==============================
function createToast(title, description) {
  // 기존 토스트가 있다면 제거
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  const toastHtml = `
    <div class="toast-notification">
      <h3 class="toast-title">${title}</h3>
      <p class="toast-description">${description}</p>
      <div class="toast-buttons">
        <button class="toast-btn" id="inquiry-btn">문의하기</button>
        <button class="toast-btn" id="confirm-btn">확인</button>
      </div>
    </div>
  `;

  // My Prize Container에 토스트 추가
  const container = document.querySelector('.my-prize-container');
  if (container) {
    container.insertAdjacentHTML('beforeend', toastHtml);
    
    // 토스트 표시 애니메이션
    setTimeout(() => {
      const toast = document.querySelector('.toast-notification');
      toast.classList.add('show');
    }, 10);

    // 버튼 이벤트 리스너
    document.getElementById('confirm-btn').addEventListener('click', closeToast);
    document.getElementById('inquiry-btn').addEventListener('click', handleInquiry);
  }
}

function closeToast() {
  const toast = document.querySelector('.toast-notification');
  if (toast) {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
      // 마지막(가장 뒤쪽)에 등장하는 '상금 지급 신청' 내역만 삭제 및 UI 갱신
      if (prizeHistory.length > 0) {
        const idx = prizeHistory.map(x => x.history).lastIndexOf("상금 지급 신청");
        if (idx !== -1) {
          prizeHistory.splice(idx, 1);
          initMyPrizeSection();
        }
      }
    }, 300);
  }
}

function handleInquiry() {
  // 문의하기 기능 - 현재는 버튼만 표시
  console.log('문의하기 버튼 클릭됨');
  // 여기에 실제 문의하기 기능을 추가할 수 있습니다
}

function showPrizeWarningToast() {
  // 기존 경고 토스트가 있다면 제거
  const existing = document.querySelector('.prize-toast-warning');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'prize-toast-warning';
  toast.innerHTML = '<span class="prize-toast-warning-text">5만원 초과시 지급신청 가능</span>';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 1500);
}

// ==============================
// 1) 페이지 핸들러 정의 (바로 아래 initMyPrizeSection보다 위에)
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

function getLastGameDateStr() {
  if (!window.matchData) return '';
  const dates = Object.keys(window.matchData).sort();
  if (dates.length === 0) return '';
  const last = dates[dates.length - 1];
  const [yyyy, mm, dd] = last.split('-');
  return `${parseInt(mm, 10)}월 ${parseInt(dd, 10)}일`;
}

// ==============================
// 2) 실제 섹션 초기화 함수
// ==============================
function initMyPrizeSection() {
  const { formatNumber } = window.utils;

  // ───── 페이지 상태 초기화 ─────
  const allHistory     = prizeHistory;
  userData.myPrize.totalPages  = Math.ceil(allHistory.length / MY_PRIZE_PAGE_SIZE);
  userData.myPrize.currentPage = userData.myPrize.currentPage || 1;

  const startIdx       = (userData.myPrize.currentPage - 1) * MY_PRIZE_PAGE_SIZE;
  const endIdx         = startIdx + MY_PRIZE_PAGE_SIZE;
  const currentHistory = allHistory.slice(startIdx, endIdx);

  // ───── 3) 올킬 도전 버튼 텍스트 동적 생성 ─────
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
      btnText = `${parseInt(mm, 10)}월 ${parseInt(dd, 10)}일<br>올킬 도전`;
    }
  }

  // ───── 컨테이너 HTML ─────
  const expireDateStr = getLastGameDateStr();
  // 버튼 노출/비노출 및 상태별 텍스트/비활성화 처리
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
            <p class="user-nickname">
              
              
              ${userData.nickname}</p>            
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <p class="prize-amount">${formatNumber(userData.totalAmount)} 원</p>
          <span class="expire-badge">소멸 예정</span>
        </div>
        <div class="expire-info">
          <span class="expire-date">${expireDateStr}</span><br>
          미지급 상금 <span class="expire-badge-text">소멸 예정</span>
        </div>
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
      ${showGoToBtn ? `<button id="go-to-team-selection" class="${goToBtnClass}">${goToBtnText}</button>` : ''}
    </div><!-- /.my-prize-container -->
  `;
  $('#my-prize-section').html(sectionHtml);

  // ───── 3) 히스토리 렌더 ─────
    const historyItemsHtml = currentHistory.map(item => {
    const d     = new Date(item.date);
    const mm    = d.getMonth() + 1; // 0이 나오지 않게
    const dd    = String(d.getDate()).padStart(2, '0');
    const absAmt= Math.abs(item.amount);
    let prizeClass = 'daily-prize';
    let sign = '';
    if (item.history === '올킬 당첨') {
      prizeClass = 'daily-prize';
      sign = '+';
    } else if (item.history === '상금 지급 신청' || item.history === '지급 정보 불일치') {
      prizeClass = 'daily-prize request';
      sign = '';
    } else if (item.history === '상금 지급 완료') {
      prizeClass = 'daily-prize negative';
      sign = '-';
    }

    return `
      <div class="history-item">
        <div class="history-info">
          <span class="history-date">${parseInt(mm, 10)} / ${parseInt(dd, 10)}</span>
          <span class="history-detail">${item.history}</span>
        </div>
        <p class="${prizeClass}">${sign} ${formatNumber(absAmt)}</p>
      </div>
    `;
  }).join('');
  $('#prize-history-items').html(historyItemsHtml);

  // ───── 4) 페이징 핸들러 바인딩 ─────
  setupPaginationHandlers();

  // ───── 5) '상금 지급 신청' 버튼 클릭 핸들러 ─────
  const reqBtn = document.querySelector('.request-button');
  if (reqBtn) {
  reqBtn.addEventListener('click', () => {
    // 스크롤을 my-prize-section 상단으로 이동
    const section = document.querySelector('.my-prize-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // ───── 추가: 총액이 50,000원 이하이면 신청 불가 ─────
    if (userData.totalAmount <= 50000) {
      showPrizeWarningToast();
      return;
    }

    // 버튼 상태 변경
    reqBtn.classList.add('clicked');
    reqBtn.textContent = '지급 진행 중';
    reqBtn.disabled = true;

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
        alert('LIVE스코어 APP 에서 신청 가능합니다');
        // 웹에서는 3초 후 버튼 원래대로 복원
        setTimeout(() => {
          reqBtn.classList.remove('clicked');
          reqBtn.textContent = '상금 지급 신청';
          reqBtn.disabled = false;
        }, 3000);
      }
    });
  }

  // ───── 5) 올킬 도전 버튼 클릭 시 team selection 상단으로 스크롤 이동 ─────
  const goToBtn = document.getElementById('go-to-team-selection');
  if (goToBtn) {
    goToBtn.addEventListener('click', () => {
      // 회색 버튼(grey-btn)인 경우 스크롤 기능 비활성화
      if (goToBtn.classList.contains('grey-btn')) {
        return;
      }
      const section = document.getElementById('kbo-selection-container');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ───── 6) 페이지 접속 시 토스트 알림 표시 ─────
  if (prizeHistory.some(item => item.history === "상금 지급 신청")) {
    setTimeout(() => {
      createToast(
        '상금 지급 재신청 필요',
        '신청시 이메일의 지급 시 정보를\n정확하게 입력 후 다시 신청해주세요.'
      );
    }, 500); // 0.5초 후 토스트 표시
  }
}

// 초기화 함수 내보내기
window.myPrizeSection = {
  init: initMyPrizeSection
};