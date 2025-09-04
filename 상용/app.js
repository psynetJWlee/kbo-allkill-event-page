// 전역 객체가 로드될 때까지 대기하는 헬퍼 함수
function waitForGlobal(globalName, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    function check() {
      if (window[globalName]) {
        console.log(`${globalName} 로드 완료`);
        resolve(window[globalName]);
      } else if (Date.now() - startTime > timeout) {
        console.error(`${globalName} 로드 타임아웃 (${timeout}ms)`);
        reject(new Error(`${globalName} load timeout`));
      } else {
        setTimeout(check, 50); // 50ms 후 다시 확인
      }
    }
    
    check();
  });
}

// Initialize the page when DOM is loaded
$(document).ready(async function() {
  try {
    console.log('앱 초기화 시작');
    
    // API 연결 단계 완료
    if (window.loadingUtils) {
      window.loadingUtils.completeStep('api');
    }
    
    // 기본 API 데이터 초기화 (경기 데이터만)
    await initializeBasicApiData();
    
    // Apply default selected teams for today view
    if (window.appState.currentDay === 26) {
      window.teamSelectionSection.updateTeamSelections();
    }

    // Initialize all sections - 섹션이 로드될 때까지 대기
    console.log('🎯 이벤트 타이틀 섹션 초기화 시작');
    
    // eventTitleSection이 로드될 때까지 대기
    if (!window.eventTitleSection) {
      console.log('📥 eventTitleSection 로드 대기 중...');
      await waitForGlobal('eventTitleSection', 5000);
    }
    
    console.log('✅ eventTitleSection 객체 확인됨:', !!window.eventTitleSection);
    console.log('✅ eventTitleSection.init 함수 확인됨:', !!window.eventTitleSection?.init);
    
    if (window.eventTitleSection && window.eventTitleSection.init) {
      console.log('🚀 eventTitleSection.init() 호출 시작');
      await window.eventTitleSection.init();
      console.log('✅ eventTitleSection.init() 완료');
    } else {
      console.error('❌ eventTitleSection.init을 찾을 수 없습니다.');
      // 로딩 단계만 완료하고 계속 진행
      if (window.loadingUtils) {
        console.log('🔧 eventInfo 단계 강제 완료');
        window.loadingUtils.completeStep('eventInfo');
      }
    }
    
    // teamSelectionSection을 먼저 초기화 (경기 데이터 로드)
    console.log('팀 선택 섹션 초기화 시작');
    
    // teamSelectionSection이 로드될 때까지 대기
    if (!window.teamSelectionSection) {
      console.log('teamSelectionSection 로드 대기 중...');
      await waitForGlobal('teamSelectionSection', 5000);
    }
    
    if (window.teamSelectionSection && window.teamSelectionSection.init) {
      await window.teamSelectionSection.init();
    } else {
      console.error('teamSelectionSection.init을 찾을 수 없습니다.');
      // 로딩 단계만 완료하고 계속 진행
      if (window.loadingUtils) {
        window.loadingUtils.completeStep('gameData');
      }
    }
    
    // My Prize Section은 로그인 상태 확인 후 초기화
    // await window.myPrizeSection.init(); // 로그인 상태 확인 후 조건부 초기화로 변경
    
    // 다른 섹션들 안전하게 초기화
    if (window.prizeRankingSection && window.prizeRankingSection.init) {
      window.prizeRankingSection.init();
    } else {
      console.warn('prizeRankingSection을 찾을 수 없습니다.');
    }
    
    if (window.eventDescriptionSection && window.eventDescriptionSection.init) {
      window.eventDescriptionSection.init();
    } else {
      console.warn('eventDescriptionSection을 찾을 수 없습니다.');
    }

    if (window.winnersSection && window.winnersSection.init) {
      await window.winnersSection.init();
    } else {
      console.warn('winnersSection을 찾을 수 없습니다.');
    }
    
    // 이벤트 완료 상태 확인 및 완료 섹션 초기화
    await checkEventCompletionStatus();
    
    // 섹션 초기화 후 사용자 데이터 로드 (페이징 상태 덮어쓰기 방지)
    await loadUserDataAfterInit();
    
    // ✅ 내역보기 자동 스크롤 트리거 실행
    scrollToMyPrizeIfNeeded();
    
    // 모든 초기화 완료 후 로딩 단계들 완료
    if (window.loadingUtils) {
      console.log('앱 초기화 완료, 나머지 로딩 단계 완료 처리');
      window.loadingUtils.completeStep('userInfo');
      window.loadingUtils.completeStep('ui');
      window.loadingUtils.completeStep('complete');
    }
    
  } catch (error) {
    console.error('❌ 섹션 초기화 중 오류:', error);
    console.error('오류 스택:', error.stack);
    
    // 에러 타입별 상세 로그
    if (error.message.includes('load timeout')) {
      console.error('스크립트 로드 타임아웃 오류 - 파일 경로나 네트워크를 확인하세요');
    } else if (error.message.includes('Cannot read properties')) {
      console.error('객체 속성 접근 오류 - 스크립트 로드 순서를 확인하세요');
    }
    
    // 에러 발생시 로딩 강제 완료
    if (window.loadingUtils) {
      console.log('에러로 인한 로딩 강제 완료 실행');
      window.loadingUtils.forceComplete();
    }
  }
});

// 기본 API 데이터 초기화 함수 (경기 데이터만)
async function initializeBasicApiData() {
  try {
    console.log('기본 API 데이터 초기화 시작...');
    
    // teamSelection.js에서 API로 날짜와 경기 데이터를 모두 로드하므로
    // 여기서는 기본 설정만 수행
    
    // matchData 전역 변수 초기화
    if (!window.matchData) {
      window.matchData = {};
    }
    
    console.log('기본 API 데이터 초기화 완료');
  } catch (error) {
    console.error('기본 API 데이터 초기화 오류:', error);
  }
}

// 이벤트 완료 상태 확인 및 완료 섹션 초기화
async function checkEventCompletionStatus() {
  try {
    console.log('이벤트 완료 상태 확인 시작...');
    
    // 이벤트 정보 조회
    const eventInfoResponse = await window.apiUtils.getEventInfo();
    
    if (eventInfoResponse.success && eventInfoResponse.isEventEnded) {
      console.log('이벤트가 종료되었습니다. 완료 섹션을 표시합니다.');
      
      // 이벤트 완료 데이터 가져오기
      const completionData = eventInfoResponse.completionData || {
        totalPrizeAmount: 0,
        totalParticipants: 0
      };
      
      // 이벤트 완료 섹션 초기화
      if (window.eventCompletionSection && window.eventCompletionSection.init) {
        await window.eventCompletionSection.init(completionData);
      } else {
        console.warn('eventCompletionSection을 찾을 수 없습니다.');
      }
      
      
      // 완료 섹션 표시
      showEventCompletionSection();
      
    } else {
      console.log('이벤트가 진행 중입니다.');
      // 이벤트 완료 섹션 숨기기
      hideEventCompletionSection();
    }
    
  } catch (error) {
    console.error('이벤트 완료 상태 확인 오류:', error);
    // 오류 발생시 완료 섹션 숨기기
    hideEventCompletionSection();
  }
}

// 다른 섹션들 숨기기
function hideOtherSections() {
  const sectionsToHide = [
    '.team-selection-section',
    '.prize-ranking-section',
    '.event-description-section',
    '.winners-section',
    '.my-prize-section'
  ];
  
  sectionsToHide.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.display = 'none';
    }
  });
}

// 이벤트 완료 섹션 표시
function showEventCompletionSection() {
  const completionSection = document.querySelector('#event-completion-section');
  if (completionSection) {
    completionSection.style.display = 'block';
    console.log('이벤트 완료 섹션 표시됨');
  }
}

// 이벤트 완료 섹션 숨기기
function hideEventCompletionSection() {
  const completionSection = document.querySelector('#event-completion-section');
  if (completionSection) {
    completionSection.style.display = 'none';
    console.log('이벤트 완료 섹션 숨김');
  }
}

// 섹션 초기화 후 사용자 데이터 로드
async function loadUserDataAfterInit() {
  try {
    console.log('사용자 데이터 로드 시작...');
    
    // 로그인 상태 확인 및 사용자 정보 로드
    const loginResponse = await window.apiUtils.checkLogin();
    if (loginResponse.success) {
      if (loginResponse.isLoggedIn && loginResponse.userData) {
        // 로그인된 경우: 페이징 관련 필드는 덮어쓰지 않음
        const { winners, myPrize, ...otherUserData } = loginResponse.userData;
        
        // 페이징 상태 이외의 사용자 데이터만 업데이트
        Object.assign(window.userData, otherUserData);
        
        console.log('사용자 데이터 로드 완료 (페이징 상태 보존):', window.userData);
        
        // My Prize Section 초기화 및 표시
        if (window.myPrizeSection && window.myPrizeSection.init) {
          await window.myPrizeSection.init();
          showMyPrizeSection();
        } else {
          console.warn('myPrizeSection을 찾을 수 없습니다.');
          hideMyPrizeSection();
        }
      } else {
        // 로그인되지 않은 경우: My Prize Section 숨김
        console.log('사용자 로그인되지 않음 - My Prize Section 숨김');
        hideMyPrizeSection();
      }
    }
    
  } catch (error) {
    console.error('사용자 데이터 로드 오류:', error);
    // 오류 발생시에도 My Prize Section 숨김
    hideMyPrizeSection();
  }
}

// My Prize Section 표시 함수
function showMyPrizeSection() {
  const myPrizeSection = document.querySelector('.my-prize-section');
  if (myPrizeSection) {
    myPrizeSection.style.display = 'block';
    console.log('My Prize Section 표시됨');
  }
}

// My Prize Section 숨김 함수
function hideMyPrizeSection() {
  const myPrizeSection = document.querySelector('.my-prize-section');
  if (myPrizeSection) {
    myPrizeSection.style.display = 'none';
    console.log('My Prize Section 숨겨짐');
  }
}

// 경기 상태에 따른 이벤트 상태 결정 (teamSelection.js와 동일한 로직)
function determineEventStatus(games) {
  if (!games || games.length === 0 || games.every(g => g.gameId === 'null')) {
    return 'NO_GAMES_EVENT_DISABLED';
  }

  const cancelledStatuses = ['경기지연', '경기중지', '서스펜드', '경기취소'];
  const cancelledCount = games.filter(g => 
    g.gameId !== 'null' && cancelledStatuses.includes(g.status)
  ).length;

  if (cancelledCount >= 2) {
    return 'EVENT_CANCELLED_MULTI_GAMES';
  }

  const hasUserSelection = games.some(g => 
    g.gameId !== 'null' && g.userSelection && g.userSelection !== 'none'
  );

  const allFinished = games.every(g => 
    g.gameId === 'null' || g.status === '경기종료' || cancelledStatuses.includes(g.status)
  );

  const allSuccess = games.every(g => 
    g.gameId === 'null' || g.eventResult === 'success'
  );

  if (allFinished) {
    if (hasUserSelection) {
      return allSuccess ? 'COMPLETED_USER_SUCCESS' : 'COMPLETED_USER_FAIL';
    } else {
      return 'COMPLETED_USER_NOT_SELECTED';
    }
  }

  const hasInProgress = games.some(g => 
    g.gameId !== 'null' && g.status === '경기중'
  );

  if (hasInProgress) {
    return hasUserSelection ? 'IN_PROGRESS_USER_SELECTED' : 'IN_PROGRESS_USER_NOT_SELECTED';
  }

  return hasUserSelection ? 'PENDING_USER_SELECTED' : 'PENDING_USER_NOT_SELECTED';
}

// === [내역 보기 자동 스크롤 기능 - URL 파라미터 방식] ===
function scrollToMyPrizeIfNeeded() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('scrollToMyPrize')) {
      // 스크롤 대상 섹션 선택 (class는 index.html 기준)
      const elem = document.querySelector('.my-prize-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }else {
        console.warn('My Prize section not found for auto-scroll');
      }
    }
 // 팀 선택 영역 스크롤 추가
    if (params.get('scrollToTeamSelection')) {
      console.log('Auto-scrolling to Team Selection section');
      const elem = document.querySelector('.kbo-selection-container');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn('Team Selection section not found for auto-scroll');
      }
    }
    // 우승자 영역 스크롤 추가
    if (params.get('scrollToWinnersSection')) {
      console.log('Auto-scrolling to Winners section');
      const elem = document.querySelector('.winners-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn('Winners section not found for auto-scroll');
      }
    }
  } catch (e) {
    console.error('내역 자동 스크롤 오류:', e);
  }
}
