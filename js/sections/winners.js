// js/section/winners.js 2025-10-13
window.userData = window.userData || {};
const PAGE_SIZE = 10;

// 당첨자 날짜 네비게이션 관련 변수
let winnerDateKeys = [];
let currentWinnerDateIndex = 0;

// 날짜 포맷 함수
function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 당첨자가 있는 날짜 목록 로드
async function loadWinnerDates() {
  try {
    const response = await window.apiUtils.getWinnerDates();
    if (response.success && response.winnerDates) {
      winnerDateKeys = response.winnerDates.slice().sort((a, b) => new Date(b) - new Date(a)); // 최신 날짜부터
      currentWinnerDateIndex = 0; // 최신 날짜부터 시작
      //console.log('Winners - 당첨자 날짜 로드 완료:', winnerDateKeys);
      return winnerDateKeys;
    } else {
      console.warn('Winners - 당첨자 날짜 API 응답 실패, 오늘 날짜만 사용');
      // fallback: 어제 날짜 사용 (당첨자는 보통 전날 결과)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      winnerDateKeys = [formatLocalDate(yesterday)];
      currentWinnerDateIndex = 0;
      return winnerDateKeys;
    }
  } catch (error) {
    console.error('Winners - 당첨자 날짜 로드 오류:', error);
    // fallback: 어제 날짜 사용
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    winnerDateKeys = [formatLocalDate(yesterday)];
    currentWinnerDateIndex = 0;
    return winnerDateKeys;
  }
}

// 당첨자 리스트 폴딩 상태 관리
let isWinnersListFolded = true;

// 당첨자 리스트 폴딩 토글 함수
window.toggleWinnersList = function() {
  isWinnersListFolded = !isWinnersListFolded;
  const memberList = $('#member-list');
  const foldingBtn = $('.winners-folding-btn');
  
  if (isWinnersListFolded) {
    memberList.hide();
    foldingBtn.text('명단 보기');
  } else {
    memberList.show();
    foldingBtn.text('명단 접기');
  }
};

// 날짜 네비게이션 HTML 생성
function createWinnerDateNavigation(totalCount = 0, customMessage = null) {
  if (winnerDateKeys.length === 0) {
    const message = customMessage || `총 ${totalCount.toLocaleString()}명`;
    // 금액 계산 (예시: 100만원을 인원수로 나눈 값)
    const totalAmount = 1000000; // 100만원
    const amountPerPerson = Math.floor(totalAmount / totalCount);
    const amountDisplay = `${(totalAmount / 10000).toLocaleString()}만원/${totalCount}명 = ${amountPerPerson.toLocaleString()}원`;
    
    return `
      <div class="w-full flex flex-col items-center relative" style="position: relative;">
        <div class="winners-title">
          <div class="winners-title-content">
            <span class="title-text">오늘의 당첨자 (${totalCount}명)</span>
            <div class="title-underline"></div>
            <p class="winners-calculation">
              ${amountDisplay}
            </p>
          </div>
          <div class="winners-folding-btn" onclick="toggleWinnersList()">
            ${isWinnersListFolded ? '명단 보기' : '명단 접기'}
          </div>
        </div>
      </div>
    `;
  }
  
  const currentDate = winnerDateKeys[currentWinnerDateIndex];
  const [year, month, day] = currentDate.split('-');
  const dateDisplay = `${parseInt(month, 10)}월 ${parseInt(day, 10)}일 당첨자`;
  
  // 이전 날짜 (더 과거) 버튼 - 인덱스가 증가하면 과거로 이동
  const hasPrevDate = currentWinnerDateIndex < winnerDateKeys.length - 1;
  // const prevArrow = hasPrevDate 
  //   ? `<div style="position: absolute; left: 5px; height: 120px; background-color: transparent; width: 65px; cursor: pointer; display: flex; align-items: center; justify-content: center;" onclick="winnersGoToPrevDate()"></div>`
  //   : '';
  const prevArrow = ''; // 이전 날짜 버튼 비활성화
  
  // 다음 날짜 (더 최근) 버튼 - 인덱스가 감소하면 최근으로 이동
  const hasNextDate = currentWinnerDateIndex > 0;
  const nextArrow = hasNextDate
    ? `<div style="position: absolute; right: 5px; height: 120px; background-color: transparent; width: 65px; cursor: pointer; display: flex; align-items: center; justify-content: center;" onclick="winnersGoToNextDate()"></div>`
    : '';
  
  // 금액 계산 (예시: 100만원을 인원수로 나눈 값)
  const totalAmount = 1000000; // 100만원
//  const amountPerPerson = Math.floor(totalAmount / totalCount);
  const amountPerPerson = Math.ceil(totalAmount / totalCount / 10) * 10;
  const amountDisplay = `${(totalAmount / 10000).toLocaleString()}/${totalCount.toLocaleString()} = ${amountPerPerson.toLocaleString()}원`;
  
  return `
    <div class="w-full flex flex-col items-center relative" style="position: relative;">
      ${prevArrow}
      <div class="winners-title">
        <div class="winners-title-content">
          <span class="winners-title-text">${dateDisplay}  ${totalCount.toLocaleString()}명 </span>
          
          <p class="winners-calculation">
            ${amountDisplay}
          </p>
        </div>
        <div class="winners-folding-btn" onclick="toggleWinnersList()">
          ${isWinnersListFolded ? '명단 보기' : '명단 접기'}
        </div>
      </div>
      ${nextArrow}
    </div>
  `;
}

// 안전한 숫자 포맷팅 함수
function safeFormatNumber(num) {
  if (window.utils && window.utils.formatNumber) {
    return window.utils.formatNumber(num);
  }
  // fallback: 기본 3자리 쉼표 포맷팅
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//Winners(당첨자) 섹션 초기화 함수
async function initWinnersSection() {
  const { formatNumber } = window.utils;
  const $sec = $('#winners-section');
  
  //console.log('Winners - initWinnersSection 시작');
  
  // 폴딩 상태 초기화 (날짜 변경시에만 초기화, 페이지 이동시에는 유지)
  // 날짜 변경시에는 userData.winners가 새로 생성되므로 이를 기준으로 판단
  if (!userData.winners || userData.winners.currentPage === undefined) {
    isWinnersListFolded = true;
  }
  // 페이지 이동시에는 기존 폴딩 상태 유지
  
  try {
    // 당첨자 날짜 목록 로드 (최초에만)
    if (winnerDateKeys.length === 0) {
      await loadWinnerDates();
    }
    
    // userData.winners 초기화 - 기존 값 보존
    if (!userData.winners) {
      userData.winners = { currentPage: 1, totalPages: 1 };
      //console.log('Winners - userData.winners 새로 생성:', userData.winners);
    } else {
      // 기존 userData.winners가 있으면 currentPage만 기본값 설정
      userData.winners.currentPage = userData.winners.currentPage || 1;
      //console.log('Winners - 기존 userData.winners 사용:', userData.winners);
    }
    
    // 현재 선택된 날짜의 당첨자 데이터 로드
    const currentPage = userData.winners?.currentPage || 1;
    const currentDate = winnerDateKeys[currentWinnerDateIndex];
    //console.log('Winners - API 호출 시도, 날짜:', currentDate, '인덱스:', currentWinnerDateIndex, '페이지:', currentPage);
    //console.log('Winners - 전체 날짜 목록:', winnerDateKeys);
    
    let response;
    try {
      if (currentDate) {
        // 날짜를 YYYYMMDD 형식으로 변환하여 전달
        const dateParam = currentDate.replace(/-/g, '');
        //console.log('Winners - API 호출 URL: /api/winners.do?page=' + currentPage + '&pageSize=' + PAGE_SIZE + '&winnerDate=' + dateParam);
        response = await window.apiUtils.getWinnersByDate(dateParam, currentPage, PAGE_SIZE);
      } else {
        //console.log('Winners - 날짜가 없어서 기본 API 호출');
        response = await window.apiUtils.getWinners(currentPage, PAGE_SIZE);
      }
      //console.log('Winners - API 응답 성공:', response);
    } catch (apiError) {
      //console.log('Winners - API 호출 실패, fallback 사용:', apiError);
      response = { success: false };
    }
    
    let currentMembers = [];
    let totalCount = 0;
    
    //console.log('Winners - API 응답 상세 분석:', {
//      success: response.success,
//      winners: response.winners ? response.winners.length : 'null/undefined',
//      totalItems: response.totalItems,
//      totalPages: response.totalPages,
//      hasWinners: response.hasWinners
//    });
    
    if (response.success) {
      // API 성공 시 데이터 처리
      currentMembers = response.winners || [];
      totalCount = response.totalItems || 0;
      
      // userData 업데이트 - API 응답의 totalPages 사용
      userData.winners.currentPage = currentPage;
      userData.winners.totalPages = response.totalPages || 1;
      userData.winners.hasWinners = response.hasWinners !== false && totalCount > 0; // hasWinners가 false가 아니고 실제 데이터가 있으면 true
      //console.log('Winners - API 데이터 사용, currentMembers:', currentMembers.length, 'totalCount:', totalCount, 'totalPages:', response.totalPages, 'hasWinners:', userData.winners.hasWinners);
    } else {
      // API 실패시 fallback: 더 강력한 기본 데이터 사용
      //console.log('Winners - API 실패, fallback 처리');
      userData.winners.hasWinners = false;
//      console.log('Winners - Fallback 데이터 생성');
//      const allMembers = generateFallbackWinners(); // 임시 데이터 생성
//      const calculatedTotalPages = Math.ceil(allMembers.length / PAGE_SIZE);
//      userData.winners.totalPages = calculatedTotalPages;
//      userData.winners.currentPage = Math.min(currentPage, calculatedTotalPages); // 현재 페이지가 범위를 벗어나지 않도록
//      userData.winners.hasWinners = true; // fallback에서는 항상 당첨자가 있다고 가정
//      const startIdx = (userData.winners.currentPage - 1) * PAGE_SIZE;
//      const endIdx = startIdx + PAGE_SIZE;
//      currentMembers = allMembers.slice(startIdx, endIdx);
//      totalCount = allMembers.length;
//      console.log('Winners - Fallback 데이터 사용, 계산된 totalPages:', calculatedTotalPages);
    }

    //console.log('Winners - 최종 데이터:', {
    //  currentMembers: currentMembers.length,
    //  totalCount,
    //  currentPage: userData.winners.currentPage,
    //  totalPages: userData.winners.totalPages,
    //  hasWinners: userData.winners.hasWinners
    //});

    // 당첨자가 없으면 섹션 숨기기
    if (!userData.winners.hasWinners) {
      //console.log('Winners - 당첨자가 없음, 섹션 숨김');
      $sec.hide();
      return;
    }

    // 날짜 정보 추출 및 포맷팅 - 현재 선택된 날짜 사용
    let dateDisplay = '오늘의 당첨자';
    if (currentDate) {
      // currentDate는 YYYY-MM-DD 형식이므로 월/일 형식으로 변환
      const [year, month, day] = currentDate.split('-');
      dateDisplay = `${parseInt(month, 10)}월 ${parseInt(day, 10)}일 당첨자`;
      //console.log('Winners - 날짜 표시:', dateDisplay, '(원본:', currentDate, ')');
    } else if (response.success && response.pointDate) {
      // fallback: API 응답의 pointDate 사용
      const pointDate = response.pointDate;
      if (pointDate && pointDate.length === 8) {
        const month = pointDate.substring(4, 6); // 5-6번째 자리가 월
        const day = pointDate.substring(6, 8); // 마지막 2자리가 일자
        dateDisplay = `${parseInt(month, 10)}월 ${parseInt(day, 10)}일 당첨자`;
      }
      //console.log('Winners - fallback 날짜 표시:', dateDisplay, '(원본:', pointDate, ')');
    }

    // 날짜 네비게이션 생성 (totalCount 포함)
    const navigationHtml = createWinnerDateNavigation(totalCount);
    
    // Container HTML
    const sectionHtml = `
      ${navigationHtml}
      <div class="member-list" id="member-list"></div>
    `;
    
    $sec.html(sectionHtml);
    $sec.show(); // 당첨자가 있으면 섹션 표시
    //console.log('Winners - HTML 컨테이너 설정 완료');
    
    // 초기 폴딩 상태 적용
    if (isWinnersListFolded) {
      $('#member-list').hide();
    }
    
    // Render member list (현재 페이지 멤버만)
    const memberListHtml = currentMembers
      .map(member => {
        const displayName = member.nickname || '알수없음';
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
    
    //console.log('Winners - 멤버 리스트 HTML 생성 완료');
    
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
    
    // 페이징 HTML 생성 - 현재 페이지 상태를 정확히 반영
    let paginationHtml = '';
    if (userData.winners && userData.winners.totalPages > 0) {
      const currentP = userData.winners.currentPage;
      const totalP = userData.winners.totalPages;
      
      //console.log('Winners - 페이지네이션 생성:', { currentP, totalP });
      
      paginationHtml = `
        <div class="pagination">
          <div class="pagination-content">
            <div id="prev-page" class="page-item ${currentP === 1 ? 'disabled' : ''}" onclick="winnersPrevPage()">&lt;</div>
            
            ${getPaginationPages(currentP, totalP, 5).map(page => `
	          <div class="page-item ${currentP === page ? 'active' : ''}" data-page="${page}" onclick="winnersGoToPage(${page})">
	            ${page}
	          </div>
	        `).join('')}
            <div id="next-page" class="page-item ${currentP === totalP ? 'disabled' : ''}" onclick="winnersNextPage()">&gt;</div>
          </div>
        </div>
      `;
    }
    
    $sec.find('#member-list').html(memberListHtml + paginationHtml);
    //console.log('Winners - 멤버 리스트 + 페이지네이션 HTML 삽입 완료');

    // 실제 생성된 페이지 버튼 확인
    setTimeout(() => {
      const pageButtons = $sec.find('.page-item[data-page]');
      //console.log('Winners - 실제 생성된 페이지 버튼 개수:', pageButtons.length);
      pageButtons.each(function(index) {
        //console.log(`Winners - 버튼 ${index + 1}: 페이지 ${$(this).data('page')}, 텍스트: "${$(this).text()}"`);
      });
     
    }, 100);
    
    
    //페이징 하단에 올킬 도전 버튼 추가 (기존 로직 삭제)
    // await createGoToTeamSelectionButton2('#winners-section');
    

    // 페이지네이션은 onclick 방식이므로 별도 바인딩 불필요
    //console.log('Winners - onclick 기반 페이지네이션 설정 완료');
    //console.log('Winners - initWinnersSection 완료');
    
  } catch (error) {
    console.error('당첨자 섹션 초기화 오류:', error);
    
    // 완전한 fallback: 최소한의 기본 UI라도 표시
    try {
      renderMinimalFallback($sec);
    } catch (fallbackError) {
      console.error('Fallback 렌더링도 실패:', fallbackError);
    }
  }
}

//공통 go-to-team-selection 버튼 생성 함수
async function createGoToTeamSelectionButton2(targetSelector) {
  try {
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
    if (showGoToBtn) {
        const btnHtml = `<button id="go-to-team-selection" class="${goToBtnClass}">${goToBtnText}</button>`;
        $(targetSelector).append(btnHtml);
        document.getElementById('go-to-team-selection').onclick = function() {
        	if($("#go-to-team-selection").hasClass("grey-btn")){
        		return;
        	}else{
//        		window.location.reload(true);
//        		setTimeout(function(){window.location.reload(true);}, 800);
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
//               	 alert($("#kbo-selection-container > div.date-navigation > div.nav-arrow.next").attr("data-key")); 
               	 $("#kbo-selection-container > div.date-navigation > div.nav-arrow.next").click();
                }
        	}
        	
          const section = document.getElementById('kbo-selection-container');
          if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
      }
  } catch (error) {
    console.error('createGoToTeamSelectionButton 오류:', error);
  }
}

// 더 강력한 fallback 데이터 생성
function generateFallbackWinners() {
  const winners = [];
  for (let i = 1; i <= 50; i++) {
    winners.push({
      nickname: `테스트사용자${i}`,
      profileImage: '/image/profile.png',
      amount: Math.floor(Math.random() * 50000) + 10000
    });
  }
  return winners;
}

// 최소한의 fallback UI
function renderMinimalFallback($sec) {
  //console.log('Winners - 최소한의 fallback UI 렌더링');
  
  // userData.winners가 없거나 잘못된 경우만 초기화
  if (!userData.winners || !userData.winners.totalPages) {
    userData.winners = { currentPage: 1, totalPages: 3, hasWinners: true };
    //console.log('Winners - fallback에서 userData.winners 초기화:', userData.winners);
  } else {
    //console.log('Winners - fallback에서 기존 userData.winners 유지:', userData.winners);
  }
  
  // 당첨자가 없으면 섹션 숨기기
  if (!userData.winners.hasWinners) {
    //console.log('Winners - fallback에서도 당첨자가 없음, 섹션 숨김');
    $sec.hide();
    return;
  }
  
  const sectionHtml = `
    <div class="w-full flex flex-col items-center relative">
      <div class="winners-title">
        <div class="winners-title-content">
          <span class="title-text">오늘의 당첨자 (30명)</span>
          <div class="title-underline"></div>
          <p class="winners-calculation">
            100만원/30명 = 33,333원
          </p>
        </div>
        <div class="winners-folding-btn" onclick="toggleWinnersList()">
          ${isWinnersListFolded ? '명단 보기' : '명단 접기'}
        </div>
      </div>
    </div>
    <div class="member-list" id="member-list">
      <div class="member-card">
        <div class="member-profile">
          <img src="/image/profile.png" alt="프로필" class="member-avatar" />
          <span class="member-nickname">테스트사용자1</span>
        </div>
        <span class="member-amount">50,000</span>
      </div>
      <div class="pagination">
        <div class="pagination-content">
          <div id="prev-page" class="page-item disabled" onclick="winnersPrevPage()">&lt;</div>
          <div class="page-item active" data-page="1" onclick="winnersGoToPage(1)">1</div>
          <div class="page-item" data-page="2" onclick="winnersGoToPage(2)">2</div>
          <div class="page-item" data-page="3" onclick="winnersGoToPage(3)">3</div>
          <div id="next-page" class="page-item" onclick="winnersNextPage()">&gt;</div>
        </div>
      </div>
    </div>
  `;
  
  $sec.html(sectionHtml);
  $sec.show(); // fallback에서도 섹션 표시
  
  // 초기 폴딩 상태 적용
  if (isWinnersListFolded) {
    $('#member-list').hide();
  }
  
  //console.log('Winners - fallback UI에서도 onclick 방식 사용');
}

// 날짜 네비게이션 전역 함수들
window.winnersGoToPrevDate = async function() {
  //console.log('winnersGoToPrevDate 호출, 현재 인덱스:', currentWinnerDateIndex, '날짜:', winnerDateKeys[currentWinnerDateIndex]);
  if (currentWinnerDateIndex < winnerDateKeys.length - 1) {
    currentWinnerDateIndex++;
    //console.log('winnersGoToPrevDate 인덱스 변경 후:', currentWinnerDateIndex, '새 날짜:', winnerDateKeys[currentWinnerDateIndex]);
    // 새 날짜로 변경시 userData.winners를 완전히 초기화
    userData.winners = { currentPage: 1, totalPages: 1 };
    await initWinnersSection();
    // 날짜 네비게이션에서는 스크롤하지 않음
  } else {
    //console.log('winnersGoToPrevDate 더 이상 과거 날짜가 없음');
  }
};

window.winnersGoToNextDate = async function() {
  //console.log('winnersGoToNextDate 호출, 현재 인덱스:', currentWinnerDateIndex, '날짜:', winnerDateKeys[currentWinnerDateIndex]);
  if (currentWinnerDateIndex > 0) {
    currentWinnerDateIndex--;
    //console.log('winnersGoToNextDate 인덱스 변경 후:', currentWinnerDateIndex, '새 날짜:', winnerDateKeys[currentWinnerDateIndex]);
    // 새 날짜로 변경시 userData.winners를 완전히 초기화
    userData.winners = { currentPage: 1, totalPages: 1 };
    await initWinnersSection();
    // 날짜 네비게이션에서는 스크롤하지 않음
  } else {
    //console.log('winnersGoToNextDate 더 이상 최근 날짜가 없음');
  }
};

// 전역 페이지 네비게이션 함수들 (onclick에서 직접 호출)
window.winnersGoToPage = async function(page) {
  //console.log('winnersGoToPage 호출:', page);
  //console.log('현재 userData.winners 상태:', userData.winners);
  
  if (!userData.winners) {
    console.error('userData.winners가 없습니다!');
    return;
  }
  
  //console.log('조건 체크:');
  //console.log('- page !== userData.winners.currentPage:', page !== userData.winners.currentPage);
  //console.log('- page >= 1:', page >= 1);
  //console.log('- page <= userData.winners.totalPages:', page <= userData.winners.totalPages);
  //console.log('- 현재 페이지:', userData.winners.currentPage);
  //console.log('- 총 페이지:', userData.winners.totalPages);
  
  if (userData.winners && page !== userData.winners.currentPage && page >= 1 && page <= userData.winners.totalPages) {
    //console.log('조건 만족 - changePage 호출');
    await changePage(page);
  } else {
    //console.log('조건 불만족 - changePage 호출하지 않음');
  }
};

window.winnersPrevPage = async function() {
  //console.log('winnersPrevPage 호출, 현재 페이지:', userData.winners?.currentPage);
  if (userData.winners && userData.winners.currentPage > 1) {
    await changePage(userData.winners.currentPage - 1);
  }
};

window.winnersNextPage = async function() {
  //console.log('winnersNextPage 호출, 현재 페이지:', userData.winners?.currentPage);
  if (userData.winners && userData.winners.currentPage < userData.winners.totalPages) {
    await changePage(userData.winners.currentPage + 1);
  }
};

// 페이지 변경 처리
async function changePage(page) {
  try {
    //console.log('Winners - changePage 호출:', page);
    //console.log('Winners - 변경 전 userData.winners.currentPage:', userData.winners.currentPage);
    userData.winners.currentPage = page;
    //console.log('Winners - 변경 후 userData.winners.currentPage:', userData.winners.currentPage);
    //console.log('Winners - initWinnersSection 호출 시작');
    await initWinnersSection();
    scrollWinnersSectionToBottom();
    //console.log('Winners - initWinnersSection 완료');
  } catch (error) {
    console.error('Winners - 페이지 변경 오류:', error);
  }
}

//당첨자 섹션 하단으로 스크롤
function scrollWinnersSectionToBottom() {
  const section = $('#winners-section');
  const sectionBottom = section.offset().top + section.outerHeight();
  const viewportHeight = window.innerHeight;
  const scrollTo = sectionBottom - viewportHeight;
  window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'auto' });
}

//초기화 함수 내보내기
window.winnersSection = {
  init: initWinnersSection
};
