// eventTitle.js 20251125

// ============================================
// 골든타임 설정 (필요시 여기만 수정하세요) 
// ============================================
const GOLDEN_TIME_DAYS = 5; // 이벤트 시작일로부터 골든타임 일수 (변경 가능)

// 날짜 키를 "YYYY-MM-DD" 형태로 포맷하는 함수
function formatLocalDate(d) {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  return `${Y}-${M}-${D}`;
}

// 대한민국(KST) 기준 오늘 날짜 반환 함수
function getTodayInKST() {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const kstDate = new Date(utcTime + 9 * 60 * 60000); // UTC+9
  return formatLocalDate(kstDate);
}

// 날짜 포맷 변환 (YYYYMMDD -> M/D)
function formatEventDate(dateStr) {
  if (!dateStr) return '';
  
  // YYYYMMDD 형식인 경우
  if (dateStr.length === 8) {
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);
    return `${month}/${day}`;
  }
  
  // YYYY-MM-DD 형식인 경우
  if (dateStr.length === 10 && dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      return `${month}/${day}`;
    }
  }
  
  console.warn('지원하지 않는 날짜 형식:', dateStr);
  return dateStr; // 원본 반환
}

// 날짜 포맷 변환 (YYYYMMDD -> M월 D일)
function formatEventDateKorean(dateStr) {
  if (!dateStr) return '';
  
  let month, day;
  
  // YYYYMMDD 형식인 경우
  if (dateStr.length === 8) {
    month = parseInt(dateStr.substring(4, 6), 10);
    day = parseInt(dateStr.substring(6, 8), 10);
  }
  // YYYY-MM-DD 형식인 경우
  else if (dateStr.length === 10 && dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else {
      console.warn('지원하지 않는 날짜 형식:', dateStr);
      return dateStr;
    }
  } else {
    console.warn('지원하지 않는 날짜 형식:', dateStr);
    return dateStr;
  }
  
  return `${month}월 ${day}일`;
}

// 날짜 범위 포맷 (시작일 ~ 종료일)
// 같은 월이면: "11월 1일 ~ 30일"
// 다른 월이면: "11월 1일 ~ 12월 5일"
function formatEventDateRange(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return '';
  
  let startMonth, startDay, endMonth, endDay;
  
  // 시작일 파싱
  if (startDateStr.length === 8) {
    startMonth = parseInt(startDateStr.substring(4, 6), 10);
    startDay = parseInt(startDateStr.substring(6, 8), 10);
  } else if (startDateStr.length === 10 && startDateStr.includes('-')) {
    const parts = startDateStr.split('-');
    if (parts.length === 3) {
      startMonth = parseInt(parts[1], 10);
      startDay = parseInt(parts[2], 10);
    } else {
      return `${startDateStr} ~ ${endDateStr}`;
    }
  } else {
    return `${startDateStr} ~ ${endDateStr}`;
  }
  
  // 종료일 파싱
  if (endDateStr.length === 8) {
    endMonth = parseInt(endDateStr.substring(4, 6), 10);
    endDay = parseInt(endDateStr.substring(6, 8), 10);
  } else if (endDateStr.length === 10 && endDateStr.includes('-')) {
    const parts = endDateStr.split('-');
    if (parts.length === 3) {
      endMonth = parseInt(parts[1], 10);
      endDay = parseInt(parts[2], 10);
    } else {
      return `${startDateStr} ~ ${endDateStr}`;
    }
  } else {
    return `${startDateStr} ~ ${endDateStr}`;
  }
  
  // 같은 월이면 종료일은 일만 표시
  if (startMonth === endMonth) {
    return `${startMonth}월 ${startDay}일 ~ ${endDay}일`;
  } else {
    // 다른 월이면 각각 월과 일 표시
    return `${startMonth}월 ${startDay}일 ~ ${endMonth}월 ${endDay}일`;
  }
}

// YYYYMMDD 형식을 Date 객체로 변환
function parseEventDate(dateStr) {
  if (!dateStr || dateStr.length !== 8) return null;
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1; // 0-based
  const day = parseInt(dateStr.substring(6, 8), 10);
  return new Date(year, month, day);
}

// 골든타임 기간 체크 함수
function isGoldenTimePeriod(eventStartDate) {
  if (!eventStartDate) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 제거
  
  const startDate = parseEventDate(eventStartDate);
  if (!startDate) return false;
  
  // 골든타임 종료일 계산 (시작일 + GOLDEN_TIME_DAYS - 1)
  const goldenTimeEnd = new Date(startDate);
  goldenTimeEnd.setDate(goldenTimeEnd.getDate() + GOLDEN_TIME_DAYS - 1);
  
  // 이벤트 시작일 <= 오늘 <= 골든타임 종료일
  return today >= startDate && today <= goldenTimeEnd;
}

// 골든타임 기간 포맷 (M/D ~ M/D)
function formatGoldenTimeRange(eventStartDate) {
  if (!eventStartDate) return '';
  
  const startDate = parseEventDate(eventStartDate);
  if (!startDate) return '';
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + GOLDEN_TIME_DAYS - 1);
  
  const startMonth = startDate.getMonth() + 1;
  const startDay = startDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();
  
  return `${startMonth}/${startDay} ~ ${endMonth}/${endDay}`;
}

// 특정 날짜 이후인지 체크하는 함수 (2025년 11월 6일 이후)
function isAfterTargetDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 제거
  
  const targetDate = new Date(2025, 10, 6); // 2025년 11월 6일 (month는 0-based)
  targetDate.setHours(0, 0, 0, 0);
  
  return today >= targetDate;
}

// 날짜에 따라 이모티콘 이미지 경로를 반환하는 함수
function getEventEmoticonPath() {
  return isAfterTargetDate() ? '/image/event-emoticon.gif' : '/image/event-emoticon2.gif';
}

//이벤트 타이틀 섹션 초기화 함수
async function initEventTitleSection() {
  try {
    //console.log('이벤트 타이틀 섹션 초기화 시작');
    
    // 오늘 날짜 계산
    const today = formatLocalDate(new Date());
    
    // 오늘 날짜의 경기 데이터를 API에서 로드
    let gamesCount = 0;
    
    if (window.apiUtils) {
      try {
        const response = await window.apiUtils.getGames(today);
        if (response.success && response.games) {
          // null 게임이 아닌 실제 경기만 카운트
          gamesCount = response.games.filter(game => game.gameId !== 'null').length;
          //console.log(`이벤트 타이틀: API에서 ${gamesCount}개 경기 로드 완료`);
        }
      } catch (error) {
        console.warn('오늘 경기 데이터 로드 실패, 폴백 사용:', error);
        // API 실패시 기존 방식으로 폴백
        const gamesArr = (window.matchData[today] && window.matchData[today].games) || [];
        gamesCount = gamesArr.filter(game => game.gameId !== 'null').length;
        //console.log(`이벤트 타이틀: 폴백에서 ${gamesCount}개 경기 로드`);
      }
    } else {
      // apiUtils가 없으면 기존 방식으로 폴백
      const gamesArr = (window.matchData[today] && window.matchData[today].games) || [];
      gamesCount = gamesArr.filter(game => game.gameId !== 'null').length;
      //console.log(`이벤트 타이틀: apiUtils 없음, 폴백에서 ${gamesCount}개 경기 로드`);
    }
    
    //console.log(`오늘(${today}) 경기 수:`, gamesCount);
    
    // 이벤트 정보 조회 및 전체 HTML 생성
    let sectionHtml = '';
    try {
      const eventInfoResponse = await window.apiUtils.getEventInfo();
      
      if (eventInfoResponse.success) {
        const eventInfo = eventInfoResponse.eventInfo || eventInfoResponse;
        
        if (eventInfo && eventInfo.eventStartDate && eventInfo.eventEndDate) {
          const startDate = formatEventDate(eventInfo.eventStartDate);
          const endDate = formatEventDate(eventInfo.eventEndDate);
          const resultEndDate = eventInfo.eventResultEndDate ? formatEventDate(eventInfo.eventResultEndDate) : '';
          const eventDateRange = formatEventDateRange(eventInfo.eventStartDate, eventInfo.eventEndDate);
          
          // 골든타임 기간 체크
          const isGoldenTime = isGoldenTimePeriod(eventInfo.eventStartDate);
          // 한일전 기간 체크 필요시 여기만 수정
          const superAllKillDates = ['2025-11-14', '2025-11-15', '2025-11-16'];
          const todayKst = getTodayInKST();
          const isSpecialDate = superAllKillDates.includes(todayKst);
          
          if (isSpecialDate) {
            // ==========================================
            // 11/15, 11/16 한일전 한정 템플릿 (일반 모드와 동일)
            // ==========================================
            sectionHtml = `
              <img src="/image/KJmatch_loading_image.png" alt="KJmatch_info" class="KJmatch_infoimage">
            `;
          } else if (isGoldenTime) {
            // ==========================================
            // 골든타임 모드: 골드 테마 + 금발 캐릭터
            // ==========================================
            const goldenTimeRange = formatGoldenTimeRange(eventInfo.eventStartDate);
            const prevMonth = new Date(parseEventDate(eventInfo.eventStartDate));
            prevMonth.setMonth(prevMonth.getMonth() - 1);
            const prevMonthName = prevMonth.getMonth() + 1;
            const currentMonthName = new Date(parseEventDate(eventInfo.eventStartDate)).getMonth() + 1;
            
            sectionHtml = `
              <img src="/image/golden_loading_image.png" alt="KJmatch_info" class="KJmatch_infoimage">
              `;
          } else {
            // ==========================================
            // 일반 모드: 흰색 테마 + 분홍 우산 캐릭터
            // ==========================================
            sectionHtml = `
              <!-- 헤더 -->
              <div class="event-title">
                <img src="/image/loading_image.png" alt="LIVE Score Logo" class="event-logo"/>
              </div>
              
              <!-- 프로모션 블록 (흰색 테마) -->
              <div class="event-title-text normal-theme">
                <div class="event-title-line2">
                  <span class="dynamic-count">매일 '${gamesCount}</span>경기' 맞추면</div>
                <div class="event-title-line3">매일 100 / n 만원 !</div>
                <div class="event-title-line4">총 3천만원 !</div>
                <img src="${getEventEmoticonPath()}" alt="Event Emoticon" class="event-emoticon normal"/>
              </div>
              
              <!-- 이벤트 정보 -->
              <div class="event-info-section">
                <div class="event-info-line1">이벤트 기간 : ${eventDateRange}</div>                
              </div>
            `;
          }
        } else {
          // API 응답이 있지만 날짜 정보가 없는 경우 기본값
          sectionHtml = `
            <div class="event-title">
              <img src="/image/event-logo.png" alt="LIVE Score Logo" class="event-logo"/>
              <div class="event-title-line1">라스 올킬 !</div>
            </div>
            <div class="event-title-text normal-theme">
              <div class="event-title-line2">
                <span class="dynamic-count">매일 '${gamesCount}</span>경기' 맞추면</div>
              <div class="event-title-line3">매일 100 / n 만원 !</div>
              <div class="event-title-line4">총 3천만원 !</div>
              <img src="${getEventEmoticonPath()}" alt="Event Emoticon" class="event-emoticon normal"/>
            </div>
            <div class="event-info-section">
              <div class="event-info-line1">이벤트 기간 : 11월 1일 ~ 30일</div>
              
            </div>
          `;
        }
      } else {
        // API 실패 시 기본값
        sectionHtml = `
          <div class="event-title">
            <img src="/image/event-logo.png" alt="LIVE Score Logo" class="event-logo"/>
            <div class="event-title-line1">라스 올킬 !</div>
          </div>
          <div class="event-title-text normal-theme">
            <div class="event-title-line2">
              <span class="dynamic-count">매일 '${gamesCount}</span>경기' 맞추면</div>
            <div class="event-title-line3">매일 100 / n 만원 !</div>
            <div class="event-title-line4">총 3천만원 !</div>
            <img src="${getEventEmoticonPath()}" alt="Event Emoticon" class="event-emoticon normal"/>
          </div>
          <div class="event-info-section">
            <div class="event-info-line1">이벤트 기간 : 11월 1일 ~ 30일</div>            
          </div>
        `;
      }
    } catch (error) {
      console.warn('이벤트 정보 조회 실패, 기본값 사용:', error);
      // 오류 시 기본값
      sectionHtml = `
        <div class="event-title">
          <img src="/image/event-logo.png" alt="LIVE Score Logo" class="event-logo"/>
          <div class="event-title-line1">라스 올킬 !</div>
        </div>
        <div class="event-title-text normal-theme">
          <div class="event-title-line2">
            <span class="dynamic-count">매일 '${gamesCount}</span>경기' 맞추면</div>
          <div class="event-title-line3">매일 100 / n 만원 !</div>
          <div class="event-title-line4">총 3천만원 !</div>
          <img src="${getEventEmoticonPath()}" alt="Event Emoticon" class="event-emoticon normal"/>
        </div>
          <div class="event-info-section">
            <div class="event-info-line1">이벤트 기간 : 11월 1일 ~ 30일</div>
            
          </div>
      `;
    }

    $('#event-title-section').html(sectionHtml);

    // 타이틀 섹션에 애니메이션 적용
//    window.animationUtils.startAnimation(
//      document.getElementById('event-title-section')
//    );
    
    //console.log('이벤트 타이틀 섹션 HTML 렌더링 완료');
    
    // 로딩 단계 완료 신호 (정상 케이스)
    if (window.loadingUtils) {
      //console.log('이벤트 정보 로딩 단계 완료 신호 전송 (정상)');
      window.loadingUtils.completeStep('eventInfo');
    }
    
  } catch (error) {
    console.error('Event Title 초기화 오류:', error);
    
    // 에러 시 기본값으로 처리
    const sectionHtml = `
      <div class="event-title">
       <img 
        src="/image/event-logo.png" 
        alt="LIVE Score Logo"
        class="event-logo"
      />
        <div class="event-title-line1">라스 올킬 !</div>
      </div>
      <div class="event-title-text normal-theme">
        <div class="event-title-line2">
          <span class="dynamic-count">5</span>경기 맞추면
        </div>
        <div class="event-title-line3">
          매일 100/n 만원
        </div>
        <img src="${getEventEmoticonPath()}" alt="Event Emoticon" class="event-emoticon normal"/>
      </div>
          <div class="event-info-section">
            <div class="event-info-line1">이벤트 기간 : 10월 1일 ~ 31일</div>
            
          </div>
    `;

    $('#event-title-section').html(sectionHtml);
    
    //console.log('이벤트 타이틀 섹션 HTML 렌더링 완료 (에러 발생으로 기본값 사용)');
    
    // 로딩 단계 완료 신호 (에러 발생시에도 전송)
    if (window.loadingUtils) {
      //console.log('이벤트 정보 로딩 오류 발생, 강제 완료 신호 전송');
      window.loadingUtils.completeStep('eventInfo');
    }
  }
}

//초기화 함수 내보내기
window.eventTitleSection = {
  init: initEventTitleSection
};

