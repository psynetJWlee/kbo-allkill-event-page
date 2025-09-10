// Event Description Section
// 이벤트 설명 섹션
// PENDING_USER_NOT_SELECTED 상태의 가장 가까운 날짜로 올킬 도전 버튼 텍스트 반환
function getNextPendingAllkillText() {
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
      btnText = `${parseInt(mm)}월 ${parseInt(dd)}일<br>올킬 도전`;
    }
  }
  return btnText;
}

//공통 go-to-team-selection 버튼 생성 함수
function createGoToTeamSelectionButton(targetSelector) {
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
      // 기존 버튼 제거
      $(targetSelector + ' #go-to-team-selection').remove();
      const btnHtml = `<button id="go-to-team-selection" class="${goToBtnClass}">${goToBtnText}</button>`;
      $(targetSelector).append(btnHtml);
      // 반드시 enabled 상태로 렌더링
      $('#go-to-team-selection').prop('disabled', false);
      // 기존 직접 바인딩 삭제
      // $('#go-to-team-selection').off('click').on('click', function(e) {
      //   e.preventDefault();
      //   const section = document.getElementById('kbo-selection-container');
      //   if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // });
      // document 위임 방식으로 바인딩 (중복 방지)
      $(document).off('click.goToTeamSelection').on('click.goToTeamSelection', '#go-to-team-selection', function(e) {
        e.preventDefault();
        console.log('버튼 클릭됨! (위임)');
        if($("#go-to-team-selection").hasClass("grey-btn")){
        	return;
        }else{
//        	setTimeout(function(){window.location.reload(true);}, 800);
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
//           	 alert($("#kbo-selection-container > div.date-navigation > div.nav-arrow.next").attr("data-key")); 
           	 $("#kbo-selection-container > div.date-navigation > div.nav-arrow.next").click();
            }
        }
        
        const section = document.getElementById('kbo-selection-container');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  } catch (error) {
    console.error('createGoToTeamSelectionButton 오류:', error);
  }
}

// 이벤트 설명 섹션 초기화 함수
async function initEventDescriptionSection() {
	// User Agent 체크
	const ua = navigator.userAgent;
	const isAppWebView = ua.includes('LIVESCORE_WEBVIEW');
	
	// 다운 받기 버튼 HTML (앱 웹뷰가 아닐 때만 표시)
	const downloadButtonHtml = isAppWebView ? '' : `
	    <a 
	      href="javascript:void(0);" 
	      class="download-button download-app-button"
	    >
	      LIVE 스코어<br />다운 받기
	    </a>
	`;

	// 이벤트 정보를 API에서 조회
	let eventNotice = '';
	let eventPayNotice = '';
	
	try {
		if (window.apiUtils) {
			const response = await window.apiUtils.getEventInfo();
			if (response.success && response.eventInfo) {
				eventNotice = response.eventInfo.eventNotice || '';
				eventPayNotice = response.eventInfo.eventPayNotice || '';
			}
		}
	} catch (error) {
		console.warn('이벤트 정보 조회 실패, 기본값 사용:', error);
	}

	// 줄바꿈을 li 태그로 변환하는 함수
	function convertToLiTags(text) {
		if (!text || text.trim() === '') {
			return '';
		}
		
		// char(13)char(10) 또는 \r\n으로 구분된 줄을 분리
		const lines = text.split(/\r\n|\r|\n/);
		
		return lines
			.map(line => line.trim())
			.filter(line => line.length > 0)
			.map(line => `<li class="info-item">${line}</li>`)
			.join('');
	}

	// 기본값 설정 (API에서 데이터를 가져오지 못한 경우)
	if (!eventNotice) {
		eventNotice = `이벤트 기간 : 7월 17일 ~ 8월 17일까지
당일 대상 경기의 승/무/패를 모두 예측하여 제출
매일 100만원을 올킬 성공자 수 N명에 따라 1/N 분배 지급
1 ~ 2개 경기 취소 시 나머지 경기 결과로 올킬 선정
3개 이상 경기 취소 시 해당일 이벤트 무효
당일 정상적으로 종료되지 않은 경기는 '경기 취소'로 처리
당일 첫 경기 시작전까지 제출 가능
무승부는 실제 경기 결과가 무승부일 때 한정
프로토 승무, 승패와 무관`;
	}

	if (!eventPayNotice) {
		eventPayNotice = `My 상금 금액이 5만원 초과일 경우 지급신청이 가능
당첨자 세금신고를 위해 신분증 사본 제출 필요
상금 지급 후 개인 정보 즉시 파기
5만원 초과 시 제세공과금 (22%) 선공제 후 지급
지급 완료까지는 영업일 기준 약 1일 ~ 2일 소요
금요일, 토요일 신청 건은 차주 월요일 순차 처리
다중 계정은 당첨자 정보 확인 후 당첨 취소 될 수 있음
당첨자 성명과 예금주명 불일치 시 당첨금 지급 불가
이벤트 종료 후 미신청 상금은 소멸을 원칙으로 함
단, 추후 유사 이벤트 진행 시 이월될 수 있음`;
	}
	 const btnText = getNextPendingAllkillText();
	const sectionHtml = `
	    <!-- 상금 지급 안내내 -->
	    <div class="info-header">
	      <img 
	        src="/image/info-icon.png" 
	        alt="정보 아이콘" 
	        class="info-icon"
	      />
	      <h3 class="info-title">상금 지급 안내내</h3>
	    </div>
	    <ul class="info-list">
	      ${convertToLiTags(eventNotice)}
	    </ul>

	    <!-- 올킬 이벤트 안내 -->
	    <div class="info-header">
	      <img 
	        src="/image/info-icon.png" 
	        alt="정보 아이콘" 
	        class="info-icon"
	      />
	      <h3 class="info-title">올킬 이벤트 안내</h3>
	    </div>
	    <ul class="info-list">
	      ${convertToLiTags(eventPayNotice)}
	    </ul>
	  `;
  
  $('#event-description-section').html(sectionHtml);
  
  //올킬 도전 버튼 추가 (템플릿 내가 아니라 여기서!)
  // createGoToTeamSelectionButton('#event-description-section');
//다운로드 버튼을 제일 아래에 추가
  $('#event-description-section').append(`
		  ${downloadButtonHtml}
  `);
  
  //올킬 도전 버튼 클릭 시 team selection 상단으로 스크롤 이동
  
  // 다운 받기 버튼 클릭 이벤트
  $(document).off('click.downloadapp').on('click.downloadapp', '.download-app-button', function() {
    const ua = navigator.userAgent;
    
    // iOS Safari/Chrome 등
    if (/iPhone|iPad|iPod/i.test(ua)) {
      window.location.href = 'https://apps.apple.com/us/app/live-score-the-fastest-score/id458056343?ppid=bb43275c-507e-4c1c-9fe7-6f7d9c2563f6';
    }
    // Android Chrome/Samsung Internet 등
    else if (/Android/i.test(ua)) {
      window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.psynet&listing=allkill';
    }
    // PC 브라우저
    else {
     // window.location.href = 'https://home.psynet.co.kr/livescore';
    	window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.psynet&listing=allkill';
    }
  });
  

}

//초기화 함수 내보내기
window.eventDescriptionSection = {
  init: initEventDescriptionSection
};
