// eventTitle.js

// 날짜 키를 "YYYY-MM-DD" 형태로 포맷하는 함수
function formatLocalDate(d) {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  return `${Y}-${M}-${D}`;
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

    const sectionHtml = `
      
      <div class="event-title-text">
    	<img 
	        src="/image/event-logo.png" 
	        alt="LIVE Score Logo"
	        class="event-logo"
	      />
        <div class="event-title-line1">라스 올킬</div>
        <div class="event-title-line2">
           <span class="dynamic-count">매일 '${gamesCount}</span>경기' 맞추면
        </div>
        <div class="event-title-line3">
          		매일 100 / n 만원 
        </div>
         <div class="event-title-line4">
	      		총 4천만원
	    </div>
      </div>
      <img 
	      src="/image/image_fx.png"
	      alt="Event FX"
	      class="event-fx-image"
	    />
      <img 
        src="/image/event-emoticon.gif"
        alt="Event Emoticon"
        class="event-emoticon"
      />
    `;

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
       <img 
        src="/image/event-logo.png" 
        alt="LIVE Score Logo"
        class="event-logo"
      />
      <div class="event-title-text">
        <div class="event-title-line1">라스 올킬</div>
        <div class="event-title-line2">
          <span class="dynamic-count">5</span>경기 맞추면
        </div>
        <div class="event-title-line3">
          매일 100/n 만원
        </div>
      </div>
      <img 
	      src="/image/image_fx.png"
	      alt="Event FX"
	      class="event-fx-image"
	    />
      <img 
        src="/image/event-emoticon.gif"
        alt="Event Emoticon"
        class="event-emoticon"
      />
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

