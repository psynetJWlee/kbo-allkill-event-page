// js/sections/myPrize.js

// My Prize(내 상금) 섹션
const MY_PRIZE_PAGE_SIZE = 10;

// 숫자 3자리마다 쉼표 삽입 유틸(폴백)
window.utils = window.utils || {};
window.utils.formatNumber = window.utils.formatNumber || function(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 안전한 숫자 포맷팅 함수
function safeFormatNumber(num) {
  if (window.utils && window.utils.formatNumber) {
    return window.utils.formatNumber(num);
  }
  // fallback: 기본 3자리 쉼표 포맷팅
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// fallback 데이터 생성 함수
function generateFallbackPrizeHistory() {
  const history = [];
  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split('T')[0],
      amount: i % 5 === 0 ? -300000 : 50000
    });
  }
  return history;
}

//토스트 알림 관련 함수들
//==============================
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
	
	 setTimeout(() => {
	 
	   const ua = navigator.userAgent;
	   //console.log('User Agent:', ua);
	   if (ua.includes('LIVESCORE_WEBVIEW')) {
	    //console.log('LIVE스코어 앱 WebView에서 실행');
	    // iOS WKWebView
	    if (/iPhone|iPad|iPod/i.test(ua)) {
//			      webkit.messageHandlers.applycost();
	      webkit.messageHandlers.onClickConfirm.postMessage({
	        func: 'onClickConfirm',
	        data: {
	          nickname: userData.nickname     // 사용자 닉네임
	        }
	      });
	    }
	    // Android WebView
	    else if (/Android/i.test(ua)) {
	      WebviewEvent.onClickConfirm();
	    }
	    toast.classList.remove('show');
	    toast.remove();
	    setTimeout(function(){initMyPrizeSection();}, 1000);
	  }
	  // 일반 브라우저에서 실행
	  else {
	    //console.log('일반 브라우저에서 실행');
	    // iOS Safari/Chrome 등
	    if (/iPhone|iPad|iPod/i.test(ua)) {
	    	 alert('LIVE스코어 APP 에서 가능합니다');
		      // App Store로 이동
		      window.location.href = 'https://apps.apple.com/us/app/live-score-the-fastest-score/id458056343?ppid=bb43275c-507e-4c1c-9fe7-6f7d9c2563f6';
	    }
	    // Android Chrome/Samsung Internet 등
	    else if (/Android/i.test(ua)) {
	    	alert('LIVE스코어 APP 에서  가능합니다');
	      // Google Play Store로 이동
	      window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.psynet&listing=allkill';
	    }
	    // PC 브라우저
	    else {
	    	alert('LIVE스코어 APP 에서  가능합니다');
	    }
	  }
	  
//	   // 마지막(가장 뒤쪽)에 등장하는 '상금 지급 신청' 내역만 삭제 및 UI 갱신
//	      if (prizeHistory.length > 0) {
//	        const idx = prizeHistory.map(x => x.history).lastIndexOf("지급 정보 불일치");
//	        if (idx !== -1) {
//	          prizeHistory.splice(idx, 1);
//	          initMyPrizeSection();
//	        }
//	      }
	 }, 300);
	}
}

function handleInquiry() {
	// 문의하기 기능 - 현재는 버튼만 표시
	//console.log('문의하기 버튼 클릭됨');
	// 여기에 실제 문의하기 기능을 추가할 수 있습니다
	
	//onClickInquiry()
	
  const ua = navigator.userAgent;
  //console.log('User Agent:', ua);

  // LIVE스코어 앱 WebView인지 확인 (custom userAgent)
  if (ua.includes('LIVESCORE_WEBVIEW')) {
    //console.log('LIVE스코어 앱 WebView에서 실행');
    
    // iOS WKWebView
    if (/iPhone|iPad|iPod/i.test(ua)) {
//	      webkit.messageHandlers.applycost();
      webkit.messageHandlers.onClickInquiry.postMessage({
        func: 'onClickInquiry',
        data: {
          nickname: userData.nickname     // 사용자 닉네임
        }
      });
    }
    // Android WebView
    else if (/Android/i.test(ua)) {
      WebviewEvent.onClickInquiry();
    }
  }
  // 일반 브라우저에서 실행
  else {
    //console.log('일반 브라우저에서 실행');
    
    // iOS Safari/Chrome 등
    if (/iPhone|iPad|iPod/i.test(ua)) {
    	 alert('LIVE스코어 APP 에서 가능합니다');
	      // App Store로 이동
	      window.location.href = 'https://apps.apple.com/us/app/live-score-the-fastest-score/id458056343?ppid=bb43275c-507e-4c1c-9fe7-6f7d9c2563f6';
    }
    // Android Chrome/Samsung Internet 등
    else if (/Android/i.test(ua)) {
    	alert('LIVE스코어 APP 에서  가능합니다');
      // Google Play Store로 이동
      window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.psynet&listing=allkill';
    }
    // PC 브라우저
    else {
    	alert('LIVE스코어 APP 에서 신청 가능합니다');
    }
  }
}

function showPrizeWarningToast() {
	// 기존 경고 토스트가 있다면 제거
	const existing = document.querySelector('.prize-toast-warning');
	if (existing) existing.remove();
	const toast = document.createElement('div');
	toast.className = 'prize-toast-warning';
	toast.innerHTML = '<span class="prize-toast-warning-text">5천원 이상부터 지급신청 가능</span>';
	document.body.appendChild(toast);
	setTimeout(() => {
	 toast.remove();
	}, 1500);
}

function scrollMyPrizeSectionToBottom() {
  const section = $('#my-prize-section');
  const sectionBottom = section.offset().top + section.outerHeight();
  const viewportHeight = window.innerHeight;
  const scrollTo = sectionBottom - viewportHeight;
  window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'auto' });
}



// 전역 상금 지급 신청 함수
window.requestPrizePayment = function() {
const reqBtn = document.querySelector('.request-button');
  //console.log('requestPrizePayment 호출');
  // 스크롤을 my-prize-section 상단으로 이동
  const section = document.querySelector('.my-prize-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // ───── 추가: 총액이 5,000원 미만이면 신청 불가 ─────
  if ((userData.currentAmount || 0) < 5000) {
    //alert('상금 신청은 5,000원 이상부터 가능합니다.');
	showPrizeWarningToast();
    return;
  }
  
  //버튼 상태 변경
  reqBtn.classList.add('clicked');
  reqBtn.textContent = '지급 진행 중';
  reqBtn.disabled = true;

  const ua = navigator.userAgent;
  //console.log('User Agent:', ua);

  // LIVE스코어 앱 WebView인지 확인 (custom userAgent)
  if (ua.includes('LIVESCORE_WEBVIEW')) {
    //console.log('LIVE스코어 앱 WebView에서 실행');
    
    // iOS WKWebView
    if (/iPhone|iPad|iPod/i.test(ua)) {
//      webkit.messageHandlers.applycost();
      webkit.messageHandlers.applycost.postMessage({
        func: 'requestPrize',
        data: {
          amount: userData.currentAmount,   // 신청할 상금 액수
          nickname: userData.nickname     // 사용자 닉네임
        }
      });
    }
    // Android WebView
    else if (/Android/i.test(ua)) {
      WebviewEvent.onClickPayoutRequest();
    }
  }
  // 일반 브라우저에서 실행
  else {
    //console.log('일반 브라우저에서 실행');
    
    // iOS Safari/Chrome 등
    if (/iPhone|iPad|iPod/i.test(ua)) {
    	 reqBtn.classList.remove('clicked');
         reqBtn.textContent = '상금 지급 신청';
         reqBtn.disabled = false;
    	alert('LIVE스코어 APP 에서 신청 가능합니다');
      // App Store로 이동
      window.location.href = 'https://apps.apple.com/us/app/live-score-the-fastest-score/id458056343?ppid=bb43275c-507e-4c1c-9fe7-6f7d9c2563f6';
    }
    // Android Chrome/Samsung Internet 등
    else if (/Android/i.test(ua)) {
    	 reqBtn.classList.remove('clicked');
         reqBtn.textContent = '상금 지급 신청';
         reqBtn.disabled = false;
    	alert('LIVE스코어 APP 에서 신청 가능합니다');
      // Google Play Store로 이동
      window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.psynet&listing=allkill';
    }
    // PC 브라우저
    else {
    	alert('LIVE스코어 APP 에서 신청 가능합니다');
//    	setTimeout(() => {
            reqBtn.classList.remove('clicked');
            reqBtn.textContent = '상금 지급 신청';
            reqBtn.disabled = false;
//          }, 1);
    }
  }
};

// 전역 페이지 네비게이션 함수들 (onclick에서 직접 호출)
window.myPrizeGoToPage = async function(page) {
  //console.log('myPrizeGoToPage 호출:', page);
  //console.log('현재 userData.myPrize 상태:', userData.myPrize);
  
  if (!userData.myPrize) {
    console.error('userData.myPrize가 없습니다!');
    return;
  }
  
  //console.log('조건 체크:');
  //console.log('- page !== userData.myPrize.currentPage:', page !== userData.myPrize.currentPage);
  //console.log('- page >= 1:', page >= 1);
  //console.log('- page <= userData.myPrize.totalPages:', page <= userData.myPrize.totalPages);
  //console.log('- 현재 페이지:', userData.myPrize.currentPage);
  //console.log('- 총 페이지:', userData.myPrize.totalPages);
  
  if (userData.myPrize && page !== userData.myPrize.currentPage && page >= 1 && page <= userData.myPrize.totalPages) {
    //console.log('조건 만족 - handlePageChange 호출');
    await handlePageChange(page);
  } else {
    //console.log('조건 불만족 - handlePageChange 호출하지 않음');
    scrollMyPrizeSectionToBottom();
  }
};

window.myPrizePrevPage = async function() {
  //console.log('myPrizePrevPage 호출, 현재 페이지:', userData.myPrize?.currentPage);
  if (userData.myPrize && userData.myPrize.currentPage > 1) {
    await handlePageChange(userData.myPrize.currentPage - 1);
  }
};

window.myPrizeNextPage = async function() {
  //console.log('myPrizeNextPage 호출, 현재 페이지:', userData.myPrize?.currentPage);
  if (userData.myPrize && userData.myPrize.currentPage < userData.myPrize.totalPages) {
    await handlePageChange(userData.myPrize.currentPage + 1);
  }
};

// ==============================
// 1) 페이지 변경 핸들러
// ==============================
async function handlePageChange(page) {
  try {
    //console.log('MyPrize - handlePageChange 호출:', page);
    //console.log('MyPrize - 변경 전 userData.myPrize.currentPage:', userData.myPrize.currentPage);
    userData.myPrize.currentPage = page;
    //console.log('MyPrize - 변경 후 userData.myPrize.currentPage:', userData.myPrize.currentPage);
    //console.log('MyPrize - initMyPrizeSection 호출 시작');
    await initMyPrizeSection();
    scrollMyPrizeSectionToBottom();
    //console.log('MyPrize - initMyPrizeSection 완료');
  } catch (error) {
    console.error('MyPrize - 페이지 변경 오류:', error);
  }
}

//==============================
//공통 페이지네이션 번호 계산 함수
//==============================
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
async function initMyPrizeSection() {
  const { formatNumber } = window.utils;

  try {
    // userData.myPrize 초기화 - 기존 값 보존
    if (!userData.myPrize) {
      userData.myPrize = { currentPage: 1, totalPages: 1 };
      //console.log('MyPrize - userData.myPrize 새로 생성:', userData.myPrize);
    } else {
      // 기존 userData.myPrize가 있으면 currentPage만 기본값 설정
      userData.myPrize.currentPage = userData.myPrize.currentPage || 1;
      //console.log('MyPrize - 기존 userData.myPrize 사용:', userData.myPrize);
    }

    // 로그인 상태 및 사용자 정보 확인
    const loginResponse = await window.apiUtils.checkLogin();
    if (loginResponse.success && loginResponse.userData) {
      // 기존 전역 변수 업데이트
      Object.assign(userData, loginResponse.userData);
    }

    // API에서 상금 내역 데이터 로드
    const currentPage = userData.myPrize?.currentPage || 1;
    const prizeResponse = await window.apiUtils.getPrizeHistory(currentPage, MY_PRIZE_PAGE_SIZE);
    
    let currentHistory = [];
    if (prizeResponse.success && prizeResponse.prizeHistory) {
      // API에서 받은 데이터는 이미 페이징된 결과이므로 그대로 사용
      currentHistory = prizeResponse.prizeHistory;
      userData.totalAmount = prizeResponse.totalAmount;
      userData.currentAmount = prizeResponse.currentAmount;
      // userData 업데이트 - API 응답의 totalPages 사용
      userData.myPrize.currentPage = currentPage;
      userData.myPrize.totalPages = prizeResponse.totalPages || 1;
      //console.log('MyPrize - API 데이터 사용, totalPages:', prizeResponse.totalPages);
    } else {
      // API 실패시 fallback: 기존 데이터 사용
//      //console.log('MyPrize - Fallback 데이터 사용');
//      const allHistory = window.prizeHistory || generateFallbackPrizeHistory();
//      const calculatedTotalPages = Math.ceil(allHistory.length / MY_PRIZE_PAGE_SIZE);
//      userData.myPrize.totalPages = calculatedTotalPages;
//      userData.myPrize.currentPage = Math.min(currentPage, calculatedTotalPages); // 현재 페이지가 범위를 벗어나지 않도록
//      const startIdx = (userData.myPrize.currentPage - 1) * MY_PRIZE_PAGE_SIZE;
//      const endIdx = startIdx + MY_PRIZE_PAGE_SIZE;
//      currentHistory = allHistory.slice(startIdx, endIdx);
//      //console.log('MyPrize - Fallback 데이터 사용, 계산된 totalPages:', calculatedTotalPages);
    }

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
    // 이벤트 정보에서 eventResultEndDate 가져오기
    let expireDateStr = '';
    let showExpireInfo = false;
    try {
      const eventInfoResponse = await window.apiUtils.getEventInfo();
      if (eventInfoResponse.success && eventInfoResponse.eventInfo) {
        const eventInfo = eventInfoResponse.eventInfo;
        const eventEndDate = eventInfo.eventEndDate;
        const eventResultEndDate = eventInfo.eventResultEndDate;
        
        if (eventResultEndDate) {
          // YYYYMMDD 형식을 YYYY-MM-DD 형식으로 변환
          const year = eventResultEndDate.substring(0, 4);
          const month = eventResultEndDate.substring(4, 6);
          const day = eventResultEndDate.substring(6, 8);
          const formattedDate = `${year}-${month}-${day}`;
          
          // 날짜 포맷팅 (mm월 dd일)
          const [yyyy, mm, dd] = formattedDate.split('-');
          expireDateStr = `${parseInt(mm, 10)}월 ${parseInt(dd, 10)}일`;
          
          // 현재 날짜가 EVENT_END_DATE와 EVENT_RESULT_END_DATE 사이인지 확인
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          
          const eventEnd = new Date();
          eventEnd.setFullYear(parseInt(eventEndDate.substring(0, 4)));
          eventEnd.setMonth(parseInt(eventEndDate.substring(4, 6)) - 1);
          eventEnd.setDate(parseInt(eventEndDate.substring(6, 8)));
          eventEnd.setHours(0, 0, 0, 0);
          
          const resultEnd = new Date();
          resultEnd.setFullYear(parseInt(eventResultEndDate.substring(0, 4)));
          resultEnd.setMonth(parseInt(eventResultEndDate.substring(4, 6)) - 1);
          resultEnd.setDate(parseInt(eventResultEndDate.substring(6, 8)));
          resultEnd.setHours(0, 0, 0, 0);
          
          // 현재 날짜가 이벤트 종료일 이후이고 결과 종료일 이전인 경우에만 표시
          showExpireInfo = currentDate >= eventEnd && currentDate <= resultEnd;
        } else {
          // eventResultEndDate가 없는 경우 기존 함수 사용
          expireDateStr = getLastGameDateStr();
          showExpireInfo = true;
        }
      } else {
        // API에서 데이터를 가져올 수 없는 경우 기존 함수 사용
        expireDateStr = getLastGameDateStr();
        showExpireInfo = true;
      }
    } catch (error) {
      console.error('이벤트 정보 조회 오류:', error);
      // 오류 발생 시 기존 함수 사용
      expireDateStr = getLastGameDateStr();
      showExpireInfo = true;
    }
    
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
            <img 
            src="${userData.profileImage || '/image/profile.png'}" 
            class="user-avatar" alt="사용자" />
            <div class="user-info">
              <p class="user-nickname">
              
              
              ${userData.nickname}</p>      
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;">
	          <p class="prize-amount">${formatNumber(userData.currentAmount)} 원</p>
	          ${showExpireInfo ? '<span class="expire-badge">소멸 예정</span>' : ''}
	        </div>
	        ${showExpireInfo ? `
	        <div class="expire-info">
	          <span class="expire-date">${expireDateStr}</span><br>
	          미지급 상금 <span class="expire-badge-text">소멸 예정</span>
	        </div>
	        ` : ''}
          <button class="request-button" onclick="requestPrizePayment()">상금 지급 신청</button>
        </div><!-- /.prize-group -->
        <div class="prize-history">
          <div class="history-header">
            <p class="history-title">My 상금 내역</p>
            <p class="total-prize">누적 ${safeFormatNumber(userData.totalAmount || 0)}</p>
          </div>
          <div class="history-items" id="prize-history-items"></div>
          <div class="pagination">
            <div class="pagination-content">
              <div id="prev-page" class="page-item ${userData.myPrize && userData.myPrize.currentPage === 1 ? 'disabled' : ''}" onclick="myPrizePrevPage()">&lt;</div>
               ${getPaginationPages(userData.myPrize.currentPage, userData.myPrize.totalPages, 5).map(page => `
	              <div class="page-item ${userData.myPrize.currentPage === page ? 'active' : ''}" data-page="${page}" onclick="myPrizeGoToPage(${page})">
	                ${page}
	              </div>
	            `).join('')}
              <div id="next-page" class="page-item ${userData.myPrize && userData.myPrize.currentPage === userData.myPrize.totalPages ? 'disabled' : ''}" onclick="myPrizeNextPage()">&gt;</div>
            </div>
          </div>
        </div><!-- /.prize-history -->
         ${showGoToBtn ? `<!-- <button id="go-to-team-selection" class="${goToBtnClass}">${goToBtnText}</button> -->` : ''}
      </div><!-- /.my-prize-container -->
    `;
    $('#my-prize-section').html(sectionHtml);
    
    //상금지급신청 내역이 있으면 상금 지급신청 버튼을 비활성화 하고 텍스트를 변경
    const reqBtn = document.querySelector('.request-button');
    if (currentHistory.some(item => item.history === "상금 지급 신청")) {
        reqBtn.classList.add('clicked');
        reqBtn.textContent = '지급 진행 중';
        reqBtn.disabled = true;
    }  

    // 히스토리 렌더링
    const historyItemsHtml = currentHistory.map(item => {
      const d = new Date(item.date);
      const mm    = d.getMonth() + 1; // 0이 나오지 않게
      const dd = String(d.getDate()).padStart(2, '0');
      const absAmt = Math.abs(item.amount);
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

    // 페이징 핸들러는 onclick 방식이므로 별도 바인딩 불필요
    //console.log('MyPrize - 페이지네이션은 onclick 방식으로 설정됨');
    
    // ───── 6) 페이지 접속 시 토스트 알림 표시 ─────
  	if (currentHistory.some(item => item.history === "지급 정보 불일치")) {
	    setTimeout(() => {
	      $(".request-button").attr("disabled",true);
	      createToast(
	        '상금 지급 재신청 필요',
	        '신청시 이메일의 지급 시 정보를\n정확하게 입력 후 다시 신청해주세요.'
	      );
	    }, 500); // 0.5초 후 토스트 표시
	  }
    
  } catch (error) {
    console.error('상금 내역 섹션 초기화 오류:', error);
    window.apiUtils.handleError(error, '상금 내역 데이터 로드');
    
    // 에러 시 기존 데이터로 fallback
    renderWithExistingData();
  }
  
  // ───── 5) 올킬 도전 버튼 클릭 시 team selection 상단으로 스크롤 이동 ─────
  const goToBtn = document.getElementById('go-to-team-selection');
  if (goToBtn) {
    goToBtn.addEventListener('click', () => {
	 if($("#go-to-team-selection").hasClass("grey-btn")){
     	return false;
     }else{
//    	setTimeout(function(){window.location.reload(true);
//    	}, 10);
    	 
    	
//    	 
//    	 alert(currentBtnText);
    	 
    	 // 현재 버튼 텍스트 확인
    	 const currentBtnText = $('#go-to-team-selection').text();
         // '다음 올킬 도전', '올킬 도전', 또는 '날짜\n올킬 도전'으로 시작하는 경우 오늘일로 이동 (최우선)
         const isGoToToday =
           currentBtnText.startsWith('다음 올킬 도전') ||
           currentBtnText.startsWith('올킬 도전') ||
           /\d+월\s*\d+일\s*올킬 도전/.test(currentBtnText.replace(/\n/g, ''));
         
         if(isGoToToday){
        	 const todayKey = formatLocalDate(new Date());
        	 $("#kbo-selection-container > div.date-navigation > div.nav-arrow.next").attr("data-key", todayKey);
//        	 alert($("#kbo-selection-container > div.date-navigation > div.nav-arrow.next").attr("data-key")); 
        	 $("#kbo-selection-container > div.date-navigation > div.nav-arrow.next").click();
         }
         
         
     }	
     const section = document.getElementById('kbo-selection-container');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    
    });
  }

 
}

// 기존 데이터로 렌더링하는 함수
function renderWithExistingData() {
  const { formatNumber } = window.utils;
  
  // 페이지 상태 초기화
  const allHistory = window.prizeHistory || [];
  userData.myPrize = userData.myPrize || {};
  userData.myPrize.totalPages = Math.ceil(allHistory.length / MY_PRIZE_PAGE_SIZE);
  userData.myPrize.currentPage = userData.myPrize.currentPage || 1;

  const startIdx = (userData.myPrize.currentPage - 1) * MY_PRIZE_PAGE_SIZE;
  const endIdx = startIdx + MY_PRIZE_PAGE_SIZE;
  const currentHistory = allHistory.slice(startIdx, endIdx);

  // Container HTML
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
          <img 
          src="${userData.profileImage || '/image/profile.png'}" 
          class="user-avatar" alt="사용자" />
          <div class="user-info">
            <p class="user-nickname">${userData.nickname || '사용자'}</p>
            <p class="user-text">님 보유상금</p>
          </div>
        </div>
        <p class="prize-amount">${safeFormatNumber(userData.totalAmount || 0)} 원</p>
        <button class="request-button" onclick="requestPrizePayment()">상금 지급 신청</button>
      </div><!-- /.prize-group -->
      <div class="prize-history">
        <div class="history-header">
          <p class="history-title">My 상금 내역</p>
          <p class="total-prize">누적 ${safeFormatNumber(userData.totalAmount || 0)}</p>
        </div>
        <div class="history-items" id="prize-history-items"></div>
        <div class="pagination">
          <div class="pagination-content">
            <div id="prev-page" class="page-item ${userData.myPrize && userData.myPrize.currentPage === 1 ? 'disabled' : ''}" onclick="myPrizePrevPage()">&lt;</div>
            ${userData.myPrize && userData.myPrize.totalPages > 0 ? Array.from({ length: userData.myPrize.totalPages }, (_, i) => {
              const pageNum = i + 1;
              const currentP = userData.myPrize.currentPage;
              return `<div class="page-item ${currentP === pageNum ? 'active' : ''}" data-page="${pageNum}" onclick="myPrizeGoToPage(${pageNum})">${pageNum}</div>`;
            }).join('') : ''}
            <div id="next-page" class="page-item ${userData.myPrize && userData.myPrize.currentPage === userData.myPrize.totalPages ? 'disabled' : ''}" onclick="myPrizeNextPage()">&gt;</div>
          </div>
        </div>
      </div><!-- /.prize-history -->
    </div><!-- /.my-prize-container -->
  `;
  $('#my-prize-section').html(sectionHtml);

//상금지급신청 내역이 있으면 상금 지급신청 버튼을 비활성화 하고 텍스트를 변경
  const reqBtn = document.querySelector('.request-button');
  if (allHistory.some(item => item.history === "상금 지급 신청")) {
      reqBtn.classList.add('clicked');
      reqBtn.textContent = '지급 진행 중';
      reqBtn.disabled = true;
  }  

  // 히스토리 렌더링
  const historyItemsHtml = currentHistory.map(item => {
    const d = new Date(item.date);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const wk = ['일','월','화','수','목','금','토'][d.getDay()];
    const sign = item.amount >= 0 ? '+' : '';
    const absAmt = Math.abs(item.amount);
    const prizeClass = item.amount < 0 ? 'daily-prize negative' : 'daily-prize';

    return `
      <div class="history-item">
        <p class="history-date">${mm}.${dd} ( ${wk} )</p>
        <p class="${prizeClass}">${sign}${safeFormatNumber(absAmt)}</p>
      </div>
    `;
  }).join('');
  $('#prize-history-items').html(historyItemsHtml);

  // 페이징 핸들러는 onclick 방식이므로 별도 바인딩 불필요
  //console.log('MyPrize - 페이지네이션은 onclick 방식으로 설정됨');
}

// Export the initialization function
window.myPrizeSection = {
  init: initMyPrizeSection
};