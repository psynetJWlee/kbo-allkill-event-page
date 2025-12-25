//20251113 슈퍼올킬

(function($) {
  // ==============================
  // 1. 설정 및 상태 변수
  // ==============================

  const containerSelector = '#kbo-selection-container';
  const sectionId         = 'team-selection-section';
  const gameListId        = 'game-list';
  const submitBtnPlaceholder = '제출하기';

  window.appState.submissionTimes = window.appState.submissionTimes || {};

  // 제출자 수 애니메이션 관련 변수들
  let animationTimer = null;
  let animationFrameId = null; // requestAnimationFrame ID 저장
  let currentDisplayCount = 0;
  let realCount = 0;
  let isAnimationActive = false;
  let localEventStatusMap = {};
  let originalSelections = {};

  // ==============================
  // 제출자 수 애니메이션 함수들
  // ==============================
  
  // 카운트업 애니메이션 함수
  function animateCountUp(startNumber, endNumber) {
    let current = startNumber;
    const animationDuration = 100; // 30ms 지속
    const stepTime = 1;
    const increment = Math.ceil((endNumber - startNumber) / (animationDuration / stepTime));

    // 증가량이 0보다 작거나 같으면 애니메이션 없이 바로 표시
    if (increment <= 0) {
      updateSubmissionCountDisplay(endNumber);
      return;
    }

    function updateCount() {
      // 애니메이션이 중지되었으면 즉시 종료
      if (!isAnimationActive) {
        return;
      }
      
      current += increment;
      if (current >= endNumber) {
        updateSubmissionCountDisplay(endNumber);
        currentDisplayCount = endNumber;
      } else {
        updateSubmissionCountDisplay(Math.ceil(current));
        animationFrameId = requestAnimationFrame(updateCount); // ID 저장
      }
    }
    updateCount();
  }

  // 제출자 수 표시 업데이트 함수
  function updateSubmissionCountDisplay(count) {
    const $submissionCount = $('.submission-count');
    if ($submissionCount.length > 0) {
      $submissionCount.html(`${count.toLocaleString('ko-KR')} 명`);
    }
  }
  
  // 총 제출자 수 증감 함수
  function updateTotalSubmissionCount(increment) {
    const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const games = data.games || [];
    
    // 첫 번째 게임의 투표 합계 재계산
    if (games.length > 0 && games[0].gameId !== 'null') {
      const firstGame = games[0];
      const currentTotal = (firstGame.home?.votes || 0) + 
                          (firstGame.away?.votes || 0) + 
                          (firstGame.draw?.votes || 0);
      
      updateSubmissionCountDisplay(currentTotal);
    }
  }

  // 제출자 수 증가 애니메이션 시작
  function startSubmissionAnimation(initialCount) {
    if (isAnimationActive) return;
    
    isAnimationActive = true;
    animationFrameId = null; // 초기화
    realCount = initialCount;
    currentDisplayCount = initialCount;
    
    // 첫 로드시 0부터 초기값까지 애니메이션
    animateCountUp(0, initialCount);
  }

  // 제출자 수 애니메이션 중지
  function stopSubmissionAnimation() {
    isAnimationActive = false;
    
    // requestAnimationFrame 취소
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    
    // setTimeout 취소
    if (animationTimer) {
      clearTimeout(animationTimer);
      animationTimer = null;
    }
  }

  // ==============================
  // 2. 날짜 키 배열 생성 (정렬 보장)
  // ==============================
  function formatLocalDate(d) {
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    return `${Y}-${M}-${D}`;
  }
  
  // 날짜 키 초기화 (API에서 동적으로 로드)
  async function initializeDateKeys() {
    try {
      // API에서 이벤트 날짜 목록 조회
      const response = await window.apiUtils.getEventDates();
      
      if (response.success && response.eventDates) {
        // API에서 받은 날짜들을 정렬
        const eventDates = response.eventDates.slice().sort((a, b) => new Date(a) - new Date(b));
        
        if (eventDates.length === 0) {
          // 이벤트 날짜가 없으면 오늘 날짜만 생성
          return getTodayOnlyDateKeys();
        }
        
        const dateKeys = [];
        
        for(var i=0; i<eventDates.length; i++){
        	dateKeys.push(eventDates[i]);
        }
        
        return dateKeys;
      } else {
        console.warn('이벤트 날짜 API 응답 실패, 오늘 날짜만 사용');
        return getTodayOnlyDateKeys();
      }
    } catch (error) {
      console.error('이벤트 날짜 로드 오류:', error);
      return getTodayOnlyDateKeys();
    }
  }
  
  // 오늘 날짜만 생성 (경기가 없을 때)
  function getTodayOnlyDateKeys() {
    const dateKeys = [];
    const today = new Date();
    
    dateKeys.push(formatLocalDate(today));
    
    return dateKeys;
  }
  
  // 기본 날짜 키 생성 (API 실패시 폴백)
  function getDefaultDateKeys() {
    const dateKeys = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dateKeys.push(formatLocalDate(date));
    }
    
    return dateKeys;
  }

  // 전역 변수들
  let dateKeys = [];
  let todayKey = '';
  let currentIndex = 0;
  let cachedEventInfo = null; // 이벤트 정보 캐싱
  
  // 날짜에 유효한 경기 데이터가 있는지 확인하는 함수
  function hasValidGameData(dateKey) {
    const data = window.matchData[dateKey];
    if (!data || !data.games) return false;
    
    // games가 있고, 모든 게임이 'null'이 아닌 경우만 유효
    return data.games.length > 0 && !data.games.every(g => g.gameId === 'null');
  }
  
  // 특정 날짜에서 가장 가까운 유효한 날짜를 찾는 함수
  async function findNearestValidDate(startDate, direction = 'prev') {
    const currentDate = new Date(startDate);
    const maxAttempts = 30; // 최대 30일까지 검사
    
    for (let i = 0; i < maxAttempts; i++) {
      if (direction === 'prev') {
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      const dateKey = formatLocalDate(currentDate);
      
      // 이미 로드된 데이터가 있으면 바로 확인
      if (window.matchData[dateKey]) {
        if (hasValidGameData(dateKey)) {
          return dateKey;
        }
      } else {
        // 데이터가 없으면 API 호출해서 확인
        try {
          const response = await window.apiUtils.getGames(dateKey);
          if (response.success && response.games && 
              response.games.length > 0 && 
              !response.games.every(g => g.gameId === 'null')) {
            
            // 유효한 데이터가 있으면 저장
            if (!window.matchData) {
              window.matchData = {};
            }
            window.matchData[dateKey] = {
              eventStatus: determineEventStatus(response.games),
              totalParticipants: response.totalParticipants || 0,
              winners: response.winners || 0,
              gradings: response.gradings || 0,
              games: response.games
            };
            
            return dateKey;
          }
        } catch (error) {
          console.error(`날짜 ${dateKey} 데이터 확인 오류:`, error);
        }
      }
    }
    
    return null; // 유효한 날짜를 찾지 못함
  }

  // API에서 특정 날짜의 경기 데이터 로드
  async function loadGameDataForDate(date) {
    try {
      const response = await window.apiUtils.getGames(date);
      if (response.success && response.games) {
        // matchData 전역 변수에 API 데이터 할당
        if (!window.matchData) {
          window.matchData = {};
        }
        
        // Controller에서 받은 데이터를 gamedata.js 형식에 맞게 변환
        window.matchData[date] = {
          eventStatus: determineEventStatus(response.games),
          totalParticipants: response.totalParticipants || 0,
          winners: response.winners || 0,
          gradings: response.gradings || 0,
          games: response.games
        };
        
        // submissionTimes가 있으면 appState에 반영
        if (response.submissionTimes) {
          Object.assign(window.appState.submissionTimes, response.submissionTimes);
        }
        
        // userSelection 값들을 appState.selectedTeams에 복원
        if (response.games) {
          if (!window.appState.selectedTeams) {
            window.appState.selectedTeams = {};
          }
          
          response.games.forEach(game => {
            if (game.userSelection && game.userSelection !== 'none') {
              window.appState.selectedTeams[game.gameId] = game.userSelection;
            }
          });
        }
        
        // 로딩 단계 완료 신호
        if (window.loadingUtils) {
          window.loadingUtils.completeStep('gameData');
        }
      } else {
        // API 응답은 성공했지만 데이터가 없는 경우
        if (!window.matchData) {
          window.matchData = {};
        }
        window.matchData[date] = {
          eventStatus: 'NO_GAMES_EVENT_DISABLED',
          totalParticipants: 0,
          winners: 0,
          gradings: 0,
          games: []
        };
      }
    } catch (error) {
      console.error(`경기 데이터 로드 오류 (${date}):`, error);
      window.apiUtils.handleError(error, `경기 데이터 로드 (${date})`);
      
      // 오류 발생 시에도 빈 데이터로 설정
      if (!window.matchData) {
        window.matchData = {};
      }
      window.matchData[date] = {
        eventStatus: 'NO_GAMES_EVENT_DISABLED',
        totalParticipants: 0,
        winners: 0,
        gradings: 0,
        games: []
      };
    }
  }

  // 경기 상태에 따른 이벤트 상태 결정
  function determineEventStatus(games) {
    if (!games || games.length === 0 || games.every(g => g.gameId === 'null')) {
      return 'NO_GAMES_EVENT_DISABLED';
    }

    const cancelledStatuses = ['서스펜드', '경기취소'];
    const cancelledCount = games.filter(g => 
      g.gameId !== 'null' && cancelledStatuses.includes(g.status)
    ).length;

    if (cancelledCount >= 3) {
      return 'EVENT_CANCELLED_MULTI_GAMES';
    }

    const hasUserSelection = games.some(g => 
      g.gameId !== 'null' && g.userSelection && g.userSelection !== 'none'
    );

    const allFinished = games.every(g => 
      g.gameId === 'null' || g.status === '경기종료' || cancelledStatuses.includes(g.status)
    );

    const allSuccess = games.every(g => {
      if (g.gameId === 'null') return true;
      
      // 취소된 경기는 올킬 판정에서 자동 성공 처리
      const cancelledStatuses = [ '서스펜드', '경기취소'];
      if (cancelledStatuses.includes(g.status)) return true;
      
      return g.eventResult === 'success';
    });

    if (allFinished) {
      if (hasUserSelection) {
        return allSuccess ? 'COMPLETED_USER_SUCCESS' : 'COMPLETED_USER_FAIL';
      } else {
        return 'COMPLETED_USER_NOT_SELECTED';
      }
    }

    const hasInProgress = games.some(g => 
      g.gameId !== 'null' && (g.status === '경기중' || g.status === '경기중지' || g.status === '우천중지')
    );

    // 일부 경기가 종료되었고 나머지 경기가 아직 시작하지 않은 경우
    const hasFinished = games.some(g => 
      g.gameId !== 'null' && g.status === '경기종료'
    );

    const hasNotStarted = games.some(g => 
      g.gameId !== 'null' && g.status === '경기전'
    );

    // 일부 경기가 종료되었고 나머지 경기가 아직 시작하지 않은 경우 "채점 중!"
    if (hasFinished && hasNotStarted && !hasInProgress) {
      return hasUserSelection ? 'IN_PROGRESS_USER_SELECTED' : 'IN_PROGRESS_USER_NOT_SELECTED';
    }

    if (hasInProgress) {
      return hasUserSelection ? 'IN_PROGRESS_USER_SELECTED' : 'IN_PROGRESS_USER_NOT_SELECTED';
    }

    return hasUserSelection ? 'PENDING_USER_SELECTED' : 'PENDING_USER_NOT_SELECTED';
  }

  // ==============================
  // 3~5. 초기화/네비/섹션 렌더링
  // ==============================
  async function initTeamSelectionSection() {
    // 이벤트 정보 조회하여 전체 이벤트 기간 종료 여부 확인 및 캐싱
    try {
      const eventInfoResponse = await window.apiUtils.getEventInfo();
      
      // 이벤트 정보 캐싱
      if (eventInfoResponse.success) {
        cachedEventInfo = eventInfoResponse.eventInfo || eventInfoResponse;
      }
      
      // 이벤트 날짜 목록 조회 (event-info.do에는 eventDates가 없음)
      const eventDatesResponse = await window.apiUtils.getEventDates();
      
      if (eventDatesResponse.success && eventDatesResponse.eventDates) {
        if (!cachedEventInfo) cachedEventInfo = {};
        cachedEventInfo.eventDates = eventDatesResponse.eventDates;
      }
      
      if (eventInfoResponse.success && eventInfoResponse.isEventEnded) {
        window.appState.isEventEnded = true;
      } else {
        window.appState.isEventEnded = false;
      }
    } catch (error) {
      console.error('이벤트 정보 조회 오류:', error);
      window.appState.isEventEnded = false;
    }
    
    // API에서 이벤트 날짜 키 초기화
    dateKeys = await initializeDateKeys();
    
    // 오늘 날짜 인덱스 찾기
    todayKey = formatLocalDate(new Date());
    currentIndex = dateKeys.indexOf(todayKey);
    if (currentIndex === -1) {
      const pastDateKeys = getPastDateKeys();
      // 오늘이 없으면 오늘 이전의 최근날짜로 이동
      if (pastDateKeys.length > 0) {
        // 오늘 이전 날짜 중 가장 최근 날짜를 찾아서 해당 인덱스로 설정
        const mostRecentPastDate = pastDateKeys[pastDateKeys.length - 1];
        currentIndex = dateKeys.indexOf(mostRecentPastDate);
      } else {
        // 과거 날짜도 없고 오늘 날짜도 없으면 (미래 날짜만 있는 경우)
        // 오늘 날짜를 dateKeys에 추가하고 오늘 날짜로 설정
        const todayKey = formatLocalDate(new Date());
        dateKeys.unshift(todayKey); // 배열 맨 앞에 오늘 날짜 추가
        currentIndex = 0; // 오늘 날짜 인덱스로 설정
      }
    }
    
    // 현재 날짜의 경기 데이터 로드
    await loadGameDataForDate(dateKeys[currentIndex]);
    
    await renderDateNavigation();
    renderSection();
    setupDateNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
    
    // === 추가: 로딩 완료 후 애니메이션 시작 ===
    if (window.loadingUtils && !window.loadingUtils.isActive()) {
      // 로딩이 이미 완료된 경우 바로 시작
      startSubmissionAnimationIfReady();
    } else {
      // 로딩이 진행 중인 경우 완료 후 시작
      const checkLoadingComplete = setInterval(() => {
        if (window.loadingUtils && !window.loadingUtils.isActive()) {
          clearInterval(checkLoadingComplete);
          startSubmissionAnimationIfReady();
        }
      }, 100);
    }
  }

  // 애니메이션 시작 조건 확인 및 실행 함수
  function startSubmissionAnimationIfReady() {
    const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    
    // 모든 상태에서 제출자 수 애니메이션 표시
    const games = data.games || [];
    let firstGameVoteTotal = 0;
//    if (games.length > 0 && games[0].gameId !== 'null') {
//      
//      const firstGame = games[0];
//      firstGameVoteTotal = (firstGame.home?.votes || 0) + 
//                          (firstGame.away?.votes || 0) + 
//                          (firstGame.draw?.votes || 0);
//    }
//    console.log("gamesgamesgames2", games);
    if (games.length > 0){
    	for(var i=0; i<games.length; i++){
    		const isSuspended = ["서스펜드","우천취소","경기취소"].includes(games[i].status);
    		if(games[i].gameId !== 'null' && !isSuspended){
    			 const firstGame = games[i];
    		     firstGameVoteTotal = (firstGame.home?.votes || 0) + 
    		                          (firstGame.away?.votes || 0) + 
    		                          (firstGame.draw?.votes || 0);
    		     break;
    		}
    	}
    }
    
    // 제출자 수 표시 초기화 
    $('.submission-count').html("0 명");
    // 제출자 수가 0이어도 애니메이션 시작 (실제 값으로 업데이트)
    startSubmissionAnimation(firstGameVoteTotal);
  }

  //오늘 이전 날짜만 추출
  function getPastDateKeys() {
    const today = new Date();
    today.setHours(0,0,0,0);
    return dateKeys.filter(k => {
      const d = new Date(k);
      d.setHours(0,0,0,0);
      return d <= today;
    });
  }
  
  // 날짜 포맷 변환 (mm월 dd일)
  function getDisplayDate(dateKey) {
    const [year, month, day] = dateKey.split('-');
    return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
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
//체크 아이콘 노출 조건
  function shouldShowCheckIcon(eventStatus) {
    return [
      'PENDING_USER_NOT_SELECTED',
      'PENDING_USER_SELECTED'
    ].includes(eventStatus);
  }

  // 헬퍼 함수: 특정 날짜가 이벤트 날짜에 포함되는지 확인
  function hasGamesForDate(dateKey) {
    const eventInfo = cachedEventInfo;
    if (!eventInfo || !eventInfo.eventDates) return false;
    
    // API가 YYYY-MM-DD 형식으로 반환하므로 그대로 비교
    return eventInfo.eventDates.includes(dateKey);
  }

  // 헬퍼 함수: 이벤트 마지막 날짜인지 확인
  function isLastEventDate(dateKey) {
    const eventInfo = cachedEventInfo;
    if (!eventInfo || !eventInfo.eventEndDate) return false;
    
    const dateKeyFormatted = dateKey.replace(/-/g, '');
    return dateKeyFormatted === eventInfo.eventEndDate;
  }

  // 오늘이 이벤트 마지막 날인지 확인
  function isTodayLastEventDate() {
    const eventInfo = cachedEventInfo;
    if (!eventInfo || !eventInfo.eventEndDate) return false;
    
    const today = new Date();
    const todayFormatted = formatLocalDate(today).replace(/-/g, ''); // YYYYMMDD
    return todayFormatted === eventInfo.eventEndDate;
  }

  // 날짜 네비게이션 크기 동기화
  function syncNavArrowWidths() {
    // DOM 렌더링 완료 후 실행되도록 requestAnimationFrame 사용
    requestAnimationFrame(() => {
      const prevGroup = document.querySelector('.nav-arrow-with-date.prev-group');
      const nextGroup = document.querySelector('.nav-arrow-with-date.next-group');
      
      // 기준이 될 활성화된 요소 찾기
      let referenceElement = null;
      let referenceWidth = 0;
      
      // prev-group이 활성화(disabled가 아님)되어 있으면 그것을 기준으로
      if (prevGroup && !prevGroup.classList.contains('disabled')) {
        referenceElement = prevGroup;
        referenceWidth = prevGroup.offsetWidth;
      } 
      // prev-group이 disabled이고 next-group이 활성화되어 있으면 next-group을 기준으로
      else if (nextGroup && !nextGroup.classList.contains('disabled')) {
        referenceElement = nextGroup;
        referenceWidth = nextGroup.offsetWidth;
      }
      
      // 기준 크기가 있으면 disabled 요소들에 적용
      if (referenceWidth > 0) {
        const disabledElements = document.querySelectorAll('.nav-arrow-with-date.disabled');
        disabledElements.forEach(el => {
          el.style.minWidth = `${referenceWidth}px`;
        });
      }
    });
  }

  // 날짜 내비게이션 렌더링
  async function renderDateNavigation(targetKey = null) {
    
    // targetKey가 제공되면 해당 날짜를 사용, 아니면 현재 인덱스의 날짜 사용
    let key;
    if (targetKey) {
      key = targetKey;
      // targetKey가 dateKeys에 있는지 확인하고 currentIndex 업데이트
      const idx = dateKeys.indexOf(targetKey);
      if (idx !== -1) {
        currentIndex = idx;
      }
    } else {
      key = dateKeys[currentIndex];
    }
    
    // 절대적인 오늘/내일 날짜 계산 (먼저 정의)
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayKey = formatLocalDate(today);
    const realTomorrow = new Date(today);
    realTomorrow.setDate(today.getDate() + 1);
    const realTomorrowKey = formatLocalDate(realTomorrow);
    
    const d = new Date(key);
    d.setHours(0,0,0,0);
    const isToday = d.getTime() === today.getTime();
    
    // 현재 날짜 기준으로 어제/내일 계산
    const currentDate = new Date(key);
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    
    const yesterdayKey = formatLocalDate(yesterdayDate);
    const tomorrowKey = formatLocalDate(tomorrowDate);
    
    const data = window.matchData[key] || {};
    const eventStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : data.eventStatus;
    
    // 날짜 내비게이션 정책에 따른 화살표 결정
    let prevArrowKey = '';
    let nextArrowKey = '';
    let showPrevArrow = false;
    let showNextArrow = false;
    
    // dateKeys 배열에서 현재 인덱스 찾기
    const currentIdx = dateKeys.indexOf(key);
    const firstDate = dateKeys[0];
    const lastDate = dateKeys[dateKeys.length - 1];
    
    // 좌측 화살표 (이전 날짜) 로직 - dateKeys 배열 기반
    let prevDateDisplay = '';
    if (currentIdx > 0) {
      // dateKeys 배열에 이전 날짜가 있으면 표시
      prevArrowKey = dateKeys[currentIdx - 1];
      showPrevArrow = true;
      prevDateDisplay = formatEventDate(prevArrowKey);
    } else {
      // 첫 번째 날짜일 때: 좌측 화살표 미표기
      showPrevArrow = false;
      prevDateDisplay = '';
    }
    
    // 우측 화살표 (다음 날짜) 로직 - dateKeys 배열 기반
    let nextDateDisplay = '';
    let nextDateSubLabel = ''; // 다음 날짜 보조 텍스트
    let nextDateSubClass = ''; // 다음 날짜 보조 텍스트 클래스
    let nextDateClass = 'next-date';
    let nextArrowSrc = '/image/nav-arrow next.png';
    if (currentIdx < dateKeys.length - 1) {
      // dateKeys 배열에 다음 날짜가 있으면 표시
      nextArrowKey = dateKeys[currentIdx + 1];
      
      // 오늘, 내일, 내일모레 체크
      const nextKeyDate = new Date(nextArrowKey);
      nextKeyDate.setHours(0,0,0,0);
      const dayAfterTomorrow = new Date(realTomorrow);
      dayAfterTomorrow.setDate(realTomorrow.getDate() + 1);
      dayAfterTomorrow.setHours(0,0,0,0);
      
      // 미래 날짜인지 확인 (오늘보다 미래)
      const isFutureDate = nextKeyDate > today;
      
      // 내일모레 이후 날짜는 화살표 표시하지 않음
      if (nextKeyDate >= dayAfterTomorrow) {
        showNextArrow = false;
      } else {
        showNextArrow = true;
        nextDateDisplay = formatEventDate(nextArrowKey);
        // 미래 날짜이면 보조 텍스트 표시
        if (isFutureDate) {
        	//한일전 기간 체크 필요시 여기만 수정
          const superAllKillDates = ['2025-11-15', '2025-11-16'];
          const isSuperAllKill = superAllKillDates.includes(nextArrowKey);
          nextDateSubLabel = isSuperAllKill ? '한일전' : '사전투표';
          nextDateSubClass = isSuperAllKill ? 'next-date-super' : 'next-date-prevote';
          nextDateClass = isSuperAllKill ? 'next-date-super' : 'next-date';
          nextArrowSrc = isSuperAllKill ? '/image/nav-arrow next2.png' : '/image/nav-arrow next.png';
        }
      }
    } else {
      // 마지막 날짜일 때: 다음 날짜 없음
      showNextArrow = false;
    }
    
    // 제출자 수 정보 - 모든 상태에서 표시
    let submissionCount = '';
    const games = data.games || [];
//    let firstGameVoteTotal = 0;
//    if (games.length > 0 && games[0].gameId !== 'null') {
//      const firstGame = games[0];
//      firstGameVoteTotal = (firstGame.home?.votes || 0) + 
//                          (firstGame.away?.votes || 0) + 
//                          (firstGame.draw?.votes || 0);
//    }
    
    // 제출자 수가 0이어도 표시 (애니메이션을 위해 0으로 초기화)
    submissionCount = `0 명`;
    
    // 중앙 컨테이너 - 새로운 구조
    const centerContainer = `
      <div class="nav-center-container">
        <div class="nav-date-row">
          <div class="nav-arrow-with-date prev-group${!showPrevArrow ? ' disabled' : ''}">
            ${showPrevArrow ? `<img class="nav-arrow prev" src="/image/nav-arrow prev.png" alt="이전" data-key="${prevArrowKey}" />` : '<div class="placeholder"></div>'}
            <span class="prev-date" style="color: #5D5D5D;">${prevDateDisplay}</span>
          </div>
          <div class="current-date-with-count">
            <span class="current-date" style="font-weight: bold;">${getDisplayDate(key)}</span>
            <div class="submission-count">${submissionCount}</div>
          </div>
          <div class="nav-arrow-with-date next-group${!showNextArrow ? ' disabled no-data' : ''}">
            ${showNextArrow ? `
              <div class="next-date-container">
                <span class="${nextDateClass}">${nextDateDisplay}</span>
                ${nextDateSubLabel ? `<span class="next-date-sub ${nextDateSubClass}">${nextDateSubLabel}</span>` : ''}
              </div>
              <img class="nav-arrow next" src="${nextArrowSrc}" alt="다음" data-key="${nextArrowKey}" />
            ` : '<div class="placeholder"></div>'}
          </div>
        </div>
      </div>
    `;

    const html = `
      <div class="date-navigation">
        ${centerContainer}
      </div>
    `;
    
    $(containerSelector).html(html);
    
    // 날짜 텍스트 길이 변경에 따른 크기 동기화
    syncNavArrowWidths();
  }

  function renderSection() {
    // 현재 날짜의 eventStatus 확인
    const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' 
      ? localEventStatusMap[key] 
      : data.eventStatus;

    // IN_PROGRESS_USER_SELECTED일 때만 spinner 추가
    
    // NO_GAMES_EVENT_DISABLED 상태면 숨김 처리용 스타일 추가
    const hideGameList = effStatus === 'NO_GAMES_EVENT_DISABLED' ? 'style="display:none"' : '';

    // 전체 이벤트 기간이 끝났는지 확인
    const isEventPeriodEnded = window.appState.isEventEnded || false;

    const html = `
      <div id="${sectionId}" class="team-selection-section">
        <div class="title-wrapper">
          <h2 class="team-selection-title">
            <div class="title-main-row">
              <span class="title-main"></span>
            </div>
            <span class="title-sub"></span>
          </h2>
        </div>
       <div id="${gameListId}" class="game-list" ${hideGameList}></div>
       ${effStatus !== 'PENDING_USER_SELECTED' && !isEventPeriodEnded ? `
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            <span class="btn-text">${submitBtnPlaceholder}</span>
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
         ` : ''}
        ${!isEventPeriodEnded ? `
        <a 
          href="javascript:void(0);" 
          class="download-button copy-link-button team-selection-copy-link"
        >
          링크 복사
        </a>
        ` : ''}
      </div>
    `;
    // 기존 섹션이 있으면 제거 후 추가
    $(`#${sectionId}`).remove();
    $(containerSelector).append(html);
    renderGames();
    // === 추가: PENDING_USER_SELECTED 상태면 바로 edit-btn-row 렌더링 ===
    if (effStatus === 'PENDING_USER_SELECTED') {
      // userSelection을 appState.selectedTeams에 동기화
      const games = (window.matchData[key]?.games) || [];
      games.forEach(g => {
        if (!window.appState.selectedTeams) window.appState.selectedTeams = {};
        window.appState.selectedTeams[g.gameId] = g.userSelection;
      });
      // originalSelections 세팅
      originalSelections = {};
      games.forEach(g => { originalSelections[g.gameId] = g.userSelection; });
      // edit-btn-row 렌더링
      if ($('.edit-btn-row').length === 0) {
        const btnRow = `
          <div class="edit-btn-row">
            <button class="edit-btn cancel-btn">취소</button>
            <button class="edit-btn submit-edit-btn">수정</button>
          </div>
        `;
        $('.team-selection-copy-link').before(btnRow);
      }
      // 핸들러 연결
      setupEditButtonHandlers();
    }
  }

  // ==============================
  // 6. 경기 리스트 렌더링 (overlay 복원)
  // ==============================
  // 한글 기준 엘립시스 처리 함수
  function truncateKoreanText(text, maxLength = 6) {
    if (!text || text.length <= maxLength) return text;
    
    // 한글, 영문, 숫자, 공백을 포함한 문자를 개별적으로 처리
    let charCount = 0;
    let truncatedText = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = char.charCodeAt(0);
      
      // 한글인지 확인 (가-힣: 44032-55203)
      const isKorean = charCode >= 44032 && charCode <= 55203;
      
      if (charCount >= maxLength) {
        break;
      }
      
      truncatedText += char;
      charCount++;
    }
    
    return truncatedText + '..';
  }
  function renderGames() {
    const key     = dateKeys[currentIndex];
    const data    = window.matchData[key] || { eventStatus: '', games: [] };
    const matches = data.games || [];
    const eventStatus = data.eventStatus;
    const $list   = $(`#${gameListId}`).empty();
    
    // 오늘과 내일 날짜 계산
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const keyDate = new Date(key);
    keyDate.setHours(0,0,0,0);
    // 투표수를 항상 표시 (팀 선택 시 실시간 업데이트를 위해)
    let showVoteCount = true;

    if (!matches.length || matches.every(m => m.gameId === 'null')) {
      $list.html('<div class="no-game">경기가 없습니다.</div>');
      updateSubmitButton();
      updateTitleAndCountdown();
      return;
    }

    matches.forEach(match => {
      if (match.gameId === 'null') {
    	$list.append(`<div class="game-item placeholder"><div class="game-row row1"></div><div class="game-row row2"></div></div>`);
        return;
      }

      const isSuspended = ["서스펜드","우천취소","경기취소"].includes(match.status);
      const fadeClass   = match.eventResult==='fail' ? 'faded' : '';

      const $item = $('<div>')
        .addClass('game-item')
        .toggleClass('disabled', isSuspended)
        .addClass(fadeClass)
        .attr('data-game-id', match.gameId);

      // === overlay logic (클래스명 통합) ===
      if (eventStatus !== 'EVENT_CANCELLED_MULTI_GAMES') {
          if (match.eventResult === 'success') {
            $item.append('<img class="event-overlay success" src="/image/event-overlay%20success.png" alt="성공" />');
          } else if (match.eventResult === 'fail') {
            $item.append('<img class="event-overlay fail" src="/image/event-overlay%20fail.png" alt="실패" />');
          }
      }

      // ─── row1: 홈/시간/원정 ─────────────────────────────
      const $row1 = $('<div>').addClass('game-row row1');
      // league 표시 div 생성
      let $leagueDiv = null;
      if (match.league) {
        $leagueDiv = $('<div>').addClass('league').text(truncateKoreanText(match.league));
      }
      // score 표시
      let homeScore = null, awayScore = null, isDraw = false;
      if (match.score && typeof match.score.home === 'number' && typeof match.score.away === 'number') {
        homeScore = match.score.home;
        awayScore = match.score.away;
        isDraw = homeScore === awayScore;
      }
      // home
      const $home = $('<div>').addClass('home')
        .append(
          $('<img>').addClass('team-logo-small').attr('src', match.home.logo).attr('alt', match.home.teamName),
          $('<div>').addClass('team-name').text(match.home.teamName)
        );
      // team-score(home)
      let $homeScore = $('<div>').addClass('team-score');
      if (homeScore !== null) {
        $homeScore.text(homeScore)
          .css('color', isDraw ? '#000' : (homeScore > awayScore ? '#FF3B30' : '#000'));
      }
      // team-score(away)
      let $awayScore = $('<div>').addClass('team-score');
      if (awayScore !== null) {
        $awayScore.text(awayScore)
          .css('color', isDraw ? '#000' : (awayScore > homeScore ? '#FF3B30' : '#000'));
      }
      // away
      const $away = $('<div>').addClass('away')
        .append(
          $('<img>').addClass('team-logo-small').attr('src', match.away.logo).attr('alt', match.away.teamName),
          $('<div>').addClass('team-name').text(match.away.teamName)
        );
      // start-time 또는 status-text와 league를 묶어서 표시
      let $leagueStatusWrap;
      if (match.status === '경기전') {
        $leagueStatusWrap = $('<div>').addClass('league-status-wrap')
          .append(
            $leagueDiv ? $leagueDiv : '',
            $('<div>').addClass('start-time').text(match.startTime)
          );
      } else {
        $leagueStatusWrap = $('<div>').addClass('league-status-wrap')
          .append(
            $leagueDiv ? $leagueDiv : '',
            $('<div>').addClass('status-text').text(match.status)
          );
      }
      // home 다음에 team-score(home), league-status-wrap, team-score(away), away 순서로 추가
      
      if(match.compe == "baseball"){
    	  $row1.append( $away, $awayScore, $leagueStatusWrap, $homeScore ,$home);
      }else{
    	  $row1.append($home, $homeScore, $leagueStatusWrap, $awayScore, $away);
      }
      
      
      
      // 반드시 $item에 $row1 append
      $item.append($row1);

      // ─── row2: 팀 선택 박스 3개(승/무/패, 내부에 팀명+득표수) ─────────────
      let sel = window.appState.selectedTeams?.[match.gameId];
      if (!sel || sel === 'none') sel = match.userSelection;
      const $row2 = $('<div>').addClass('game-row row2');
      
      // 경기종료 상태에서 스코어 비교하여 승리팀 결정
      let winnerTeam = null;
      if (match.status === '경기종료' && match.score && 
          typeof match.score.home === 'number' && typeof match.score.away === 'number') {
        const homeScore = match.score.home;
        const awayScore = match.score.away;
        
        if (homeScore > awayScore) {
          winnerTeam = 'home';
        } else if (awayScore > homeScore) {
          winnerTeam = 'away';
        } else {
          winnerTeam = 'draw';
        }
      }
      
      // vote-count 배열 준비
      const voteArr = [
        { key: 'home', value: match.home.votes },
        { key: 'draw', value: match.draw ? match.draw.votes : null },
        { key: 'away', value: match.away.votes }
      ].filter(v => v.value !== null);
      const maxVote = Math.max(...voteArr.map(v => v.value));
      // 동점 모두 top-vote
      
      var hdaArray = ['home','draw','away'];
      if(match.compe == "baseball"){
    	  hdaArray = ['away','draw','home'];
      }
      hdaArray.forEach(k => {
        if (k==='draw' && !match.draw) return;
        const obj = k==='draw'? match.draw : match[k];
        let isSelected = sel===k;
        let cls = isSelected ? 'selected' : '';
        
        // 경기종료 상태에서 승리팀 표기
        if (match.status === '경기종료' && winnerTeam === k) {
          cls += ' winner-team';
        }
        
        // top-vote 클래스 조건: 경기종료가 아닐 때만 최대값이 1개만 있을 때 적용
        const maxVoteCount = voteArr.filter(v => v.value === maxVote).length;
        if (match.status !== '경기종료' && obj.votes === maxVote && maxVote > 0 && maxVoteCount === 1) {
          cls += ' top-vote';
        }
        // 승/무/패 텍스트 및 team-name 클래스 지정
        let label, nameClass;
        if (k === 'home') {
          label = '승';
          nameClass = 'win button';
        } else if (k === 'draw') {
          label = '무';
          nameClass = 'draw button';
        } else {
          label = '승';
          nameClass = 'lose button';
        }
        const $box = $('<div>')
          .addClass(`team-box${cls ? ' ' + cls : ''}`)
          .attr('data-game-id', match.gameId)
          .attr('data-team', k)
          .append(
        	 $('<div>').addClass(nameClass).text(label)
          );
        if (showVoteCount) {
        	$box.append($('<div>').addClass('vote-count').text(obj.votes.toLocaleString()));
          }
        if (isSelected) {
          $box.append('<img class="check-icon" src="/image/check.png" alt="check" />');
        }
        $row2.append($box);
      });
      $item.append($row2);

      $list.append($item);
    });

    updateSubmitButton();
    updateTitleAndCountdown();
  }

  // ==============================
  // 7. eventStatus 기반 title/sub 계산 (동적 시간 자릿수 지원)
  // ==============================
  function computeTitleParts() {
	const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const status = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : data.eventStatus;
    const totalParticipants = data.totalParticipants || 0;
    const winners = data.winners;
    const gradings = data.gradings;
    
    let main = '', sub = '', statusClass = '', btnText = '', mainClass = '', btnTextClass = '', subClass = '';
    
    const todayKey = formatLocalDate(new Date());
    const todayStatus = window.matchData?.[todayKey]?.eventStatus;

    const smallTextStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED',
      'NO_GAMES_EVENT_DISABLED',
      'EVENT_CANCELLED_MULTI_GAMES'
    ];
    // 내일 날짜 계산 및 표기 (현실 오늘 기준)
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayViewKey = formatLocalDate(today);
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const tomorrowKey = formatLocalDate(tomorrow);
    const tomorrowDisplay = getDisplayDate(tomorrowKey);
    const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
    const dayAfterTomorrowKey = formatLocalDate(dayAfterTomorrow);
    const dayAfterTomorrowDisplay = getDisplayDate(dayAfterTomorrowKey);
    const isTodayView = key === todayViewKey;
    const isTomorrowView = key === tomorrowKey;

    // 첫 번째 게임의 투표 합계 계산
    const games = data.games || [];
//    let firstGameVoteTotal = 0;
//    if (games.length > 0 && games[0].gameId !== 'null') {
//      const firstGame = games[0];
//      firstGameVoteTotal = (firstGame.home?.votes || 0) + 
//                          (firstGame.away?.votes || 0) + 
//                          (firstGame.draw?.votes || 0);
//    }

    const basePrize = 1000000;
    const prizeLabel = `${(basePrize / 10000).toLocaleString()} 만원`;
    const buildPrizeSub = (winnerCount) => {
      const realPrize = Math.ceil((basePrize / winnerCount) / 10) * 10;
      return `<span class="prize-label">${prizeLabel} / ${winnerCount.toLocaleString()} 명 = </span><span class="real-prize-amount">${realPrize.toLocaleString()} 원</span>`;
    };

    switch (status) {
      case 'PENDING_USER_NOT_SELECTED':
        main = '';
        sub = '';
        mainClass = '';        
        btnText = '올킬 제출';
        btnTextClass = '';
        break;
      case 'PENDING_USER_SELECTED':
        main = '';
        sub = '첫 경기 시작전까지 수정 가능';
        mainClass = '';        
        statusClass = 'status-pending-selected';
        btnText = '';
        btnTextClass = '';
        break;
      case 'IN_PROGRESS_USER_NOT_SELECTED':
        main = '';
        sub = '제출 마감';
        mainClass = '';
        btnText = `제출 마감`;
        btnTextClass = 'small-text';
        subClass = 'IN_PROGRESS';
        break;
      case 'IN_PROGRESS_USER_SELECTED':
        main = '';
        sub = '제출 마감';
        mainClass = '';
        btnText = `제출 마감`;
        btnTextClass = 'small-text';
        subClass = 'IN_PROGRESS';
        break;
      case 'COMPLETED_USER_SUCCESS':
        main = '당첨';
        mainClass = 'success';
        if (winners && winners > 0) {
          sub = buildPrizeSub(winners);
        } else {
          if(gradings > 0){
        	  sub = '집계 중 ( 30분 이내 발표 )';
//        	  sub = '집계 중 ';
          }else{
        	  sub = '당첨자 없음';
          }
        }
        if(todayStatus == "PENDING_USER_NOT_SELECTED"){
        	const today = new Date();
        	const todayDisplay = `${today.getMonth() + 1}월 ${today.getDate()}일`;
        	btnText = `<span class="btn-date">${todayDisplay}</span><br><span class="btn-challenge">올킬 도전</span>`;
            btnTextClass = '';
            $('#submit-allkill-btn').removeAttr('disabled').addClass('active');
       }else{
	        btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
	        btnTextClass = 'small-text';
       }
        break;
      case 'COMPLETED_USER_FAIL':
      case 'COMPLETED_USER_NOT_SELECTED':
        main = '땡';
        mainClass = 'fail';
        if (winners && winners > 0) {
          sub = buildPrizeSub(winners);
        } else {
        	if(gradings > 0){
        		sub = '집계 중 ( 30분 이내 발표 )';
//        		sub = '집계 중';
        	}else{
        		sub = '당첨자 없음';
        	}
        }
        if(todayStatus == "PENDING_USER_NOT_SELECTED"){
        	 const today = new Date();
             const todayDisplay = `${today.getMonth() + 1}월 ${today.getDate()}일`;
        	 btnText = `<span class="btn-date">${todayDisplay}</span><br><span class="btn-challenge">올킬 도전</span>`;
             btnTextClass = '';
        	$('#submit-allkill-btn').removeAttr('disabled').addClass('active');
        }else{
        	btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
            btnTextClass = 'small-text';
        }
        
        break;
      case 'NO_GAMES_EVENT_DISABLED':
        main = '';
        sub = '';
        mainClass = '';
        if(todayStatus == "PENDING_USER_NOT_SELECTED"){
       	 const today = new Date();
            const todayDisplay = `${today.getMonth() + 1}월 ${today.getDate()}일`;
            btnText = `<span class="btn-date">${todayDisplay}</span><br><span class="btn-challenge">올킬 도전</span>`;
            btnTextClass = '';
            $('#submit-allkill-btn').removeAttr('disabled').addClass('active');
       }else{
    	   btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
           btnTextClass = 'small-text';
       }
        break;
      case 'EVENT_CANCELLED_MULTI_GAMES':
        main = '무효';
        sub = '3 경기 이상 취소';
        mainClass = 'cancelled';
        if(todayStatus == "PENDING_USER_NOT_SELECTED"){
       	 	const today = new Date();
            const todayDisplay = `${today.getMonth() + 1}월 ${today.getDate()}일`;
       	 	btnText = `<span class="btn-date">${todayDisplay}</span><br><span class="btn-challenge">올킬 도전</span>`;
            btnTextClass = '';
            $('#submit-allkill-btn').removeAttr('disabled').addClass('active');
       }else{
       		btnText = `<span class="btn-date">${tomorrowDisplay} 올킬</span><br><span class="btn-open">당일 00시 오픈</span>`;
            btnTextClass = 'small-text';
       }
        subClass = 'cancelled-subtitle';
        break;
      default:
        main = '';
        sub = '';
        mainClass = '';
        btnText = '';
        btnTextClass = '';
    }
    // ===== 날짜별 버튼 정책 오버라이드 =====
    const postPendingStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED',
      'NO_GAMES_EVENT_DISABLED',
      'EVENT_CANCELLED_MULTI_GAMES'
    ];
    
    // === 이벤트 마지막 날 전용 정책 (최우선) ===
    const eventEndStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED'
    ];
    
    if (isTodayView && eventEndStatuses.includes(status) && isTodayLastEventDate()) {
      // 오늘이 이벤트 마지막 날이고 특정 상태일 때
      const tomorrowDate = new Date(today);
      tomorrowDate.setDate(today.getDate() + 1);
      const tomorrowDisplay = `${tomorrowDate.getMonth() + 1}월 ${tomorrowDate.getDate()}일`;
      const nextMonth = tomorrowDate.getMonth() + 1;
      
      btnText = `<span class="btn-date">${tomorrowDisplay} 00시</span><br><span class="btn-open">올킬 오픈 예정</span>`;
      btnTextClass = 'small-text';
    } else if (postPendingStatuses.includes(status)) {
      if (isTodayView) {
        // 오늘 리스트: 내일 날짜 + 올킬 참여하기 (활성화 처리는 updateSubmitButton에서 강제)
        btnText = `<span class="btn-date">${tomorrowDisplay}</span><br><span class="btn-challenge">올킬 참여하기</span>`;
        btnTextClass = '';
      } else if (isTomorrowView) {
        // 내일 리스트: 모레 날짜 + 당일 00시 오픈 (비활성은 updateSubmitButton에서 강제)
        btnText = `<span class="btn-date">${dayAfterTomorrowDisplay}</span><br><span class="btn-open">당일 00시 오픈</span>`;
        btnTextClass = 'small-text';
      } else {
        // 과거 날짜: 내일 날짜 + 올킬 참여하기
        const todayForText = new Date();
        todayForText.setHours(0,0,0,0);
        const currentDate = new Date(key);
        currentDate.setHours(0,0,0,0);
        const isPastDate = currentDate < todayForText;
        
        if (isPastDate) {
          btnText = `<span class="btn-date">${tomorrowDisplay}</span><br><span class="btn-challenge">올킬 참여하기</span>`;
          btnTextClass = '';
        }
      }
    }
    return { main, sub, statusClass, btnText, mainClass, btnTextClass, subClass };
  }

  // ==============================
  // 8. 제목·버튼·카운트다운 동기화 (동적 시간 자릿수 애니메이션)
  // ==============================
  function updateTitleAndCountdown() {
    const parts = computeTitleParts();
    
    // 제출자 수 애니메이션 제어
    const key = dateKeys[currentIndex];
    const data = window.matchData[key] || {};
    const status = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : data.eventStatus;

    
    // 모든 상태에서 제출자 수 표시 (애니메이션은 startSubmissionAnimationIfReady에서 처리)
    
    // 메인 타이틀 처리
    if (parts.main) {
      $('.title-main')
        .html(parts.main)
        .removeClass('success fail cancelled')
        .addClass(parts.mainClass || '')
        .show();
    } else {
      $('.title-main').removeClass('success fail cancelled').hide();
    }
    // 서브타이틀 처리
    if (parts.sub) {
      $('.title-sub')
        .removeClass('cancelled-subtitle')
        .addClass(parts.subClass || '')
        .html(parts.sub)
        .show();
    } else {
      $('.title-sub').removeClass('cancelled-subtitle').hide();
    }
    // 기존 status 클래스 제거 후 새로운 클래스 적용
    const $titleWrapper = $('.title-wrapper');
    $titleWrapper.removeClass(function(index, className) {
      return (className.match(/\bstatus-\S+/g) || []).join(' ');
    });
    if (parts.statusClass) {
      $titleWrapper.addClass(parts.statusClass);
    }
    // 버튼 텍스트도 상태별로 변경 및 클래스 적용
    $('.btn-text')
      .removeClass('small-text')
      .addClass(parts.btnTextClass || '')
      .html(parts.btnText || '');
  }

  // ==============================
  // 9. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]||{}).games||[];
    const baseStatus = (window.matchData[key]||{}).eventStatus;
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : baseStatus;
    // 날짜 컨텍스트 계산
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayKey = formatLocalDate(today);
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const tomorrowKey = formatLocalDate(tomorrow);
    const isTodayView = key === todayKey;
    const isTomorrowView = key === tomorrowKey;

    // 비활성화해야 하는 상태값 목록
    const alwaysDisabledStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED',
      'NO_GAMES_EVENT_DISABLED',
      'EVENT_CANCELLED_MULTI_GAMES'
    ];

    const postPendingStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED',
      'NO_GAMES_EVENT_DISABLED',
      'EVENT_CANCELLED_MULTI_GAMES'
    ];
    
    // === 이벤트 마지막 날 전용 정책 (최우선) ===
    const eventEndStatuses = [
      'IN_PROGRESS_USER_NOT_SELECTED',
      'IN_PROGRESS_USER_SELECTED',
      'COMPLETED_USER_SUCCESS',
      'COMPLETED_USER_FAIL',
      'COMPLETED_USER_NOT_SELECTED'
    ];
    
    if (isTodayView && eventEndStatuses.includes(effStatus) && isTodayLastEventDate()) {
      // 오늘이 이벤트 마지막 날이고 특정 상태일 때: 강제 비활성화
      $('#submit-allkill-btn').attr('disabled', true).removeClass('active').show();
      return;
    }
    
    // 날짜별 강제 정책 우선 적용
    if (postPendingStatuses.includes(effStatus)) {
      if (isTodayView) {
        $('#submit-allkill-btn').removeAttr('disabled').addClass('active').show();
        return;
      }
      if (isTomorrowView) {
        $('#submit-allkill-btn').attr('disabled', true).removeClass('active').show();
        return;
      }
      // 과거 날짜에서도 내일 올킬 참여 가능하도록 활성화
      const todayForButton = new Date();
      todayForButton.setHours(0,0,0,0);
      const currentDate = new Date(key);
      currentDate.setHours(0,0,0,0);
      const isPastDate = currentDate < todayForButton;
      
      if (isPastDate) {
        $('#submit-allkill-btn').removeAttr('disabled').addClass('active').show();
        return;
      }
    }
    // 기본 비활성 상태 처리
    if (alwaysDisabledStatuses.includes(effStatus)) {
      $('#submit-allkill-btn').attr('disabled', true).removeClass('active');
      return;
    }
    
    // COMPLETED_USER_NOT_SELECTED 상태에서는 투표 마감으로 버튼 활성화 (다음 날로 이동 가능)
//    if (effStatus === 'COMPLETED_USER_NOT_SELECTED') {
//      $('#submit-allkill-btn')
//        .prop('disabled', false)
//        .toggleClass('enabled', true)
//        .css('opacity', 1)
//        .show();
//      return;
//    }

    if (effStatus === 'PENDING_USER_NOT_SELECTED') {
    	  // 경기전 상태인 경기들만 필터링
    	  const availableGames = games.filter(g => g.status === '경기전');
    	  
    	  // 경기전 경기가 있고, 모든 경기전 경기를 선택했는지 확인
    	  const allSel = availableGames.length > 0 && availableGames.every(g =>
    	    (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== 'none'
    	  );
    	  if (allSel) {
    	    $('#submit-allkill-btn').removeAttr('disabled').addClass('active');
    	  } else {
    	    $('#submit-allkill-btn').attr('disabled', true).removeClass('active');
    	  }
    	  $('#submit-allkill-btn').show();
    	} else {
    	  $('#submit-allkill-btn').removeAttr('disabled').addClass('active').show();
    	}
  }

  // ==============================
  // 10. 내비게이션 핸들러
  // ==============================
  function setupDateNavHandlers() {
    $(containerSelector)
       .off('click', '.nav-arrow-with-date')
      .on('click', '.nav-arrow-with-date:not(.disabled)', async function() {
        const $img = $(this).find('img.nav-arrow');
        const key = $img.data('key');
        
        if (!key) return;
        
        // 기존 애니메이션 즉시 중지
        stopSubmissionAnimation();
        
        // 해당 날짜의 데이터 로드
        await loadGameDataForDate(key);
        // 네비게이션과 UI 갱신
        await renderDateNavigation(key);
        renderSection();
        setupTeamSelectionHandlers();
        setupSubmitHandler();
        
        // 새로운 날짜의 애니메이션 시작
        startSubmissionAnimationIfReady();
      });
  }

  // ==============================
  // 11. top-vote 클래스 업데이트 함수
  // ==============================
  function updateTopVoteClasses(gameId) {
    const match = window.matchData[dateKeys[currentIndex]].games.find(g => String(g.gameId).trim() === String(gameId).trim());
    if (!match) {
      console.warn('updateTopVoteClasses: 경기를 찾을 수 없음:', gameId);
      return;
    }
    
    // 현재 게임의 모든 팀 박스에서 top-vote 클래스 제거
    $(`[data-game-id="${gameId}"]`).removeClass('top-vote');
    
    // 경기종료 상태에서 스코어 비교하여 승리팀 결정
    let winnerTeam = null;
    if (match.status === '경기종료' && match.score && 
        typeof match.score.home === 'number' && typeof match.score.away === 'number') {
      const homeScore = match.score.home;
      const awayScore = match.score.away;
      
      if (homeScore > awayScore) {
        winnerTeam = 'home';
      } else if (awayScore > homeScore) {
        winnerTeam = 'away';
      } else {
        winnerTeam = 'draw';
      }
    }
    
    // vote-count 배열 준비
    const voteArr = [
      { key: 'home', value: match.home.votes },
      { key: 'draw', value: match.draw ? match.draw.votes : null },
      { key: 'away', value: match.away.votes }
    ].filter(v => v.value !== null);
    
    const maxVote = Math.max(...voteArr.map(v => v.value));
    
    // 디버깅 로그
    //console.log('updateTopVoteClasses:', { gameId, votes: voteArr, maxVote });
    
    // 최고 득표팀에만 top-vote 클래스 추가 (동점일 때는 제외)
    var hdaArray = ['home','draw','away'];
    if(match.compe == "baseball"){
      hdaArray = ['away','draw','home'];
    }
    
    hdaArray.forEach(k => {
      if (k === 'draw' && !match.draw) return;
      const obj = k === 'draw' ? match.draw : match[k];
      const maxVoteCount = voteArr.filter(v => v.value === maxVote).length;
      
      if (match.status !== '경기종료' && obj.votes === maxVote && maxVote > 0 && maxVoteCount === 1) {
        $(`[data-game-id="${gameId}"][data-team="${k}"]`).addClass('top-vote');
      }
      
      // 경기종료 상태에서 승리팀 표기
      if (match.status === '경기종료' && winnerTeam === k) {
        $(`[data-game-id="${gameId}"][data-team="${k}"]`).addClass('winner-team');
      } else {
        $(`[data-game-id="${gameId}"][data-team="${k}"]`).removeClass('winner-team');
      }
    });
  }

  // ==============================
  // 12. 팀 선택 핸들러
  // ==============================
  function canEditSelections() {
    const key = dateKeys[currentIndex];
    const baseStatus = (window.matchData[key]||{}).eventStatus;
    const effStatus = typeof localEventStatusMap[key] !== 'undefined' ? localEventStatusMap[key] : baseStatus;
    // PENDING_USER_NOT_SELECTED 또는 PENDING_USER_SELECTED에서 선택 가능,
    // EVENT_CANCELLED_MULTI_GAMES에서는 선택 불가!
    return (
      effStatus === 'PENDING_USER_NOT_SELECTED' ||
      effStatus === 'PENDING_USER_SELECTED'
    );
  }

  function isSelectionChanged() {
    // 제출된 값과 현재 선택값 비교
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]?.games) || [];
    // 제출된 값 복원: userSelection
    return games.some(g => {
      const currentSelection = window.appState.selectedTeams?.[g.gameId] || g.userSelection;
      return currentSelection !== g.userSelection;
    });
  }

  function setupTeamSelectionHandlers() {
    $(`#${gameListId}`)
      .off('click', '.team-box')
            .off('mousedown', '.team-box')
      .off('touchstart', '.team-box')
      .off('pointerdown', '.team-box')
      .on('click', '.team-box', function(e) {
        if (!canEditSelections()) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        
        const id = $(this).data('game-id');
        const tm = $(this).data('team');
       
        
        // 이미 선택한 팀을 다시 클릭하면 해제 (vote-count는 그대로)
        if (window.appState.selectedTeams[id] === tm) {
        	// 선택 취소 시 vote-count -1
            const match = window.matchData[dateKeys[currentIndex]].games.find(g => String(g.gameId).trim() === String(id).trim());
            
            if (match[tm]) match[tm].votes = Math.max(0, (match[tm].votes || 0) - 1);
            delete window.appState.selectedTeams[id];
            match.userSelection = 'none'; // 선택 해제 시 userSelection도 none으로

            // === 부분 업데이트: 해당 박스에서만 체크 이미지 제거 ===
            $(this).find('.check-icon').remove();
            $(this).removeClass('selected');
            
            // === vote-count 실시간 업데이트 ===
            const $voteCount = $(this).find('.vote-count');
            if ($voteCount.length > 0) {
            	$voteCount.text(match[tm].votes.toLocaleString());
            }
            
            // === 총 제출자 수 업데이트 (-1) ===
            updateTotalSubmissionCount(-1);
            
            // === top-vote 클래스 업데이트 (선택 취소 시에도 필요) ===
            updateTopVoteClasses(id);
            
            // === 상태 동기화 함수 호출 ===
            updateSubmitButton();
            updateTitleAndCountdown();
            return;
        } else {
        	// 기존 선택이 있으면 vote-count 복원
            const match = window.matchData[dateKeys[currentIndex]].games.find(g => String(g.gameId).trim() === String(id).trim());
            
            const isNewSelection = !window.appState.selectedTeams[id];
            
            if (window.appState.selectedTeams[id]) {
              const prevTeam = window.appState.selectedTeams[id];
              
              if (match[prevTeam]) match[prevTeam].votes = Math.max(0, match[prevTeam].votes - 1);
              
              // === 부분 업데이트: 이전 선택된 박스에서 체크 이미지 제거 ===
              $(`[data-game-id="${id}"][data-team="${prevTeam}"]`).find('.check-icon').remove();
              $(`[data-game-id="${id}"][data-team="${prevTeam}"]`).removeClass('selected');
              
              // === 이전 팀 vote-count 실시간 업데이트 ===
              const $prevVoteCount = $(`[data-game-id="${id}"][data-team="${prevTeam}"]`).find('.vote-count');
              if ($prevVoteCount.length > 0) {
                $prevVoteCount.text(match[prevTeam].votes.toLocaleString());
              }
            }
            
            // 새로 선택한 팀 vote-count +1
            if (match[tm]) match[tm].votes = (match[tm].votes || 0) + 1;
            window.appState.selectedTeams[id] = tm;
            
            // === 부분 업데이트: 현재 박스에 체크 이미지 추가 ===
            $(this).append('<img class="check-icon" src="/image/check.png" alt="check" />');
            $(this).addClass('selected');
            
            // === 현재 팀 vote-count 실시간 업데이트 ===
            const $currentVoteCount = $(this).find('.vote-count');
            if ($currentVoteCount.length > 0) {
            	$currentVoteCount.text(match[tm].votes.toLocaleString());
            }
            
            // === 총 제출자 수 업데이트 (새로 선택한 경우만 +1) ===
            if (isNewSelection) {
              updateTotalSubmissionCount(1);
            }
        }
        
        // === 하이브리드 방식: 체크 이미지는 부분 업데이트, 상태는 전체 동기화 ===
        // renderGames() 호출 제거로 깜박임 현상 해결
        // 필요한 상태 동기화 함수들만 호출
        
        // === top-vote 클래스 업데이트 ===
        updateTopVoteClasses(id);
        
        // === 상태 동기화 함수 호출 ===
        updateSubmitButton();
        updateTitleAndCountdown();
      })
      .on('mousedown touchstart pointerdown', '.team-box', function(e) {
        if (!canEditSelections()) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      });
  }

  // ==============================
  // 12. 제출 핸들러 (올킬 도전)
  // ==============================
  function setupSubmitHandler() {
    $('#submit-allkill-btn').off('click').on('click', async function() {
      const key    = dateKeys[currentIndex];
      const status = (window.matchData[key]?.eventStatus);
      const games  = window.matchData[key]?.games || [];
      // 현재 버튼 텍스트 확인
      const currentBtnText = $('.btn-text').text();
      // 날짜 컨텍스트와 상태셋 계산
      const today = new Date();
      today.setHours(0,0,0,0);
      const todayKey = formatLocalDate(today);
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      const tomorrowKey = formatLocalDate(tomorrow);
      const isTodayView = key === todayKey;
      const postPendingStatuses = [
        'IN_PROGRESS_USER_NOT_SELECTED',
        'IN_PROGRESS_USER_SELECTED',
        'COMPLETED_USER_SUCCESS',
        'COMPLETED_USER_FAIL',
        'COMPLETED_USER_NOT_SELECTED',
        'NO_GAMES_EVENT_DISABLED',
        'EVENT_CANCELLED_MULTI_GAMES'
      ];
      
      // '다음 올킬 도전', '올킬 도전', 또는 '날짜\n올킬 도전'으로 시작하는 경우 오늘일로 이동 (최우선)
      const isGoToToday =
        currentBtnText.startsWith('다음 올킬 도전') ||
        currentBtnText.startsWith('올킬 도전') ||
        /\d+월\s*\d+일\s*올킬 도전/.test(currentBtnText.replace(/\n/g, ''));
      
      // 내일 날짜로 이동하는 경우 ('날짜 올킬\n당일 00시 오픈' 패턴)
      const isGoToTomorrow = /\d+월\s*\d+일\s*올킬[\s\S]*당일 00시 오픈/.test(currentBtnText.replace(/\n/g, ' '));

      // 오늘 리스트에서 특정 상태면 텍스트 패턴과 무관하게 내일로 이동
      if (isTodayView && postPendingStatuses.includes(status)) {
        const tomorrowIndex = dateKeys.indexOf(tomorrowKey);
        if (tomorrowIndex !== -1) {
          currentIndex = tomorrowIndex;
          await loadGameDataForDate(dateKeys[currentIndex]);
          await refreshAll();
          setTimeout(() => {
            const el = document.getElementById('kbo-selection-container');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
        return;
      }
      
      // 과거 날짜에서 특정 상태면 내일로 이동
      const todayForPast = new Date();
      todayForPast.setHours(0,0,0,0);
      const currentDate = new Date(key);
      currentDate.setHours(0,0,0,0);
      const isPastDate = currentDate < todayForPast;
      
      if (isPastDate && postPendingStatuses.includes(status)) {
        const tomorrowIndex = dateKeys.indexOf(tomorrowKey);
        if (tomorrowIndex !== -1) {
          currentIndex = tomorrowIndex;
          await loadGameDataForDate(dateKeys[currentIndex]);
          await refreshAll();
          setTimeout(() => {
            const el = document.getElementById('kbo-selection-container');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
        return;
      }
      
      if (isGoToToday) {
    	  const today = new Date();
          const todayKey = formatLocalDate(today);
          const todayIndex = dateKeys.indexOf(todayKey);
          
          if (todayIndex !== -1) {
            currentIndex = todayIndex;
            // 새로운 날짜의 경기 데이터 로드 후 UI 갱신
            await loadGameDataForDate(dateKeys[currentIndex]);
            await refreshAll();
            // 스크롤 이동 추가
            setTimeout(() => {
              const el = document.getElementById('kbo-selection-container');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        return;
      } else if (isGoToTomorrow) {
        // 내일 날짜로 이동
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const tomorrowKey = formatLocalDate(tomorrow);
        const tomorrowIndex = dateKeys.indexOf(tomorrowKey);
        
        if (tomorrowIndex !== -1) {
          currentIndex = tomorrowIndex;
          // 새로운 날짜의 경기 데이터 로드 후 UI 갱신
          await loadGameDataForDate(dateKeys[currentIndex]);
          await refreshAll();
          // 스크롤 이동 추가
          setTimeout(() => {
            const el = document.getElementById('kbo-selection-container');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
        return;
      }

      // 현재 상태값
      const effStatus = typeof localEventStatusMap[key] !== 'undefined' 
        ? localEventStatusMap[key] 
        : status;

      // 사용자 로그인 상태 확인
      try {
        const loginResponse = await window.apiUtils.checkLogin();
        if (!loginResponse.success || !loginResponse.isLoggedIn) {
          // 일반 브라우저에서 실행 중인지 확인
          const ua = navigator.userAgent;
          
          // LIVE스코어 앱 WebView가 아닌 경우
          if (!ua.includes('LIVESCORE_WEBVIEW')) {
            // iOS Safari/Chrome 등
            if (/iPhone|iPad|iPod/i.test(ua)) {
              alert('LIVE스코어 APP 에서만 참여 가능합니다');
              // App Store로 이동
              window.location.href = 'https://apps.apple.com/us/app/live-score-the-fastest-score/id458056343?ppid=bb43275c-507e-4c1c-9fe7-6f7d9c2563f6';
            }
            // Android Chrome/Samsung Internet 등
            else if (/Android/i.test(ua)) {
              alert('LIVE스코어 APP 에서만 참여 가능합니다');
              // Google Play Store로 이동
              window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.psynet&listing=allkill';
            }
            // PC 브라우저
            else {
              alert('LIVE스코어 APP 에서만 참여 가능합니다');
            }
            return;
          } else {
            // 앱 WebView에서 로그인 실패
            alert('LIVE스코어 APP 에서만 참여 가능합니다.');
            return;
          }
        }
      } catch (error) {
        console.error('로그인 상태 확인 오류:', error);
        
        // 일반 브라우저에서 실행 중인지 확인
        const ua = navigator.userAgent;
        if (!ua.includes('LIVESCORE_WEBVIEW')) {
          // iOS Safari/Chrome 등
          if (/iPhone|iPad|iPod/i.test(ua)) {
            alert('LIVE스코어 APP 에서만 참여 가능합니다');
            // App Store로 이동
            window.location.href = 'https://apps.apple.com/us/app/live-score-the-fastest-score/id458056343?ppid=bb43275c-507e-4c1c-9fe7-6f7d9c2563f6';
          }
          // Android Chrome/Samsung Internet 등
          else if (/Android/i.test(ua)) {
            alert('LIVE스코어 APP 에서만 참여 가능합니다');
            // Google Play Store로 이동
            window.location.href = 'https://play.google.com/store/apps/details?id=kr.co.psynet&listing=allkill';
          }
          // PC 브라우저
          else {
            alert('LIVE스코어 APP 에서만 참여 가능합니다');
          }
        } else {
          // 앱 WebView에서 오류 발생
          alert('LIVE스코어 APP 에서만 참여 가능합니다.');
        }
        return;
      }
      
     
      
     

      // 제출 전 경기 상태 재확인 (실시간 최신 상태 조회 - 캐시 무시)
      try {
        const currentDate = dateKeys[currentIndex]; // YYYY-MM-DD 형식 유지
        const latestGameResponse = await window.apiUtils.getGamesNoCache(currentDate);
        
        if (latestGameResponse.success && latestGameResponse.games) {
          // 경기중인 경기가 하나라도 있는지 확인
          const hasInProgressGame = latestGameResponse.games.some(game => 
            game.gameId !== 'null' && (game.status === '경기중' || game.status === '경기종료') 
          );
          
          if (hasInProgressGame) {
//            alert('제출 마감되었습니다.');
//            showToast('제출 마감되었습니다.', '');
            showToast('', '제출 마감되었습니다.');
            return;
          }
        }
      } catch (error) {
        console.error('경기 상태 재확인 오류:', error);
        // 오류 발생 시에도 제출 진행 (기존 동작 유지)
      }
      
      

      // (1) 'PENDING_USER_NOT_SELECTED' 최초 제출
      // 모든 팀 선택 여부 확인 (팀 선택 필요 상태에서만 체크)
      const availableGames = games.filter(g => g.status === '경기전');
      const allSelected = availableGames.length > 0 && availableGames.every(g =>
        (window.appState.selectedTeams?.[g.gameId] || g.userSelection) !== 'none'
      );
      if (allSelected) {
        try {
          // 전체 선택 정보 수집
          const selections = collectAllSelections();
          
          // 서버에 전체 선택 정보 저장 (현재 선택된 날짜 포함)
          const currentDate = dateKeys[currentIndex].replace(/-/g, ''); // YYYY-MM-DD -> YYYYMMDD
          await window.apiUtils.saveAllSelections(selections, currentDate);
          games.forEach(g => { g.userSelection = window.appState.selectedTeams?.[g.gameId]; });
          localEventStatusMap[key] = 'PENDING_USER_SELECTED';
          window.appState.submissionTimes[key] = new Date();
          updateSubmitButton();
          updateTitleAndCountdown();
          
          // 제출 직전 선택값 저장
          originalSelections = {};
          games.forEach(g => { originalSelections[g.gameId] = window.appState.selectedTeams[g.gameId]; });
          // 기존 제출 버튼 숨기고, 취소/수정 버튼 추가
          $('.team-selection-submit').hide();
          if ($('.edit-btn-row').length === 0) {
            const btnRow = `
              <div class="edit-btn-row">
                <button class="edit-btn cancel-btn">취소</button>
                <button class="edit-btn submit-edit-btn">수정</button>
              </div>
            `;
            $('.team-selection-copy-link').before(btnRow);
          }
        } catch (error) {
          console.error('올킬 도전 저장 오류:', error);
          window.apiUtils.handleError(error, '올킬 도전');
          showToast('', error.message || '올킬 도전 저장 중 오류가 발생했습니다.', 2000, 'toast-warning');
          return;
        }
        // 수정 버튼 상태 갱신 함수
        function updateEditBtnState() {
          let changed = false;
          games.forEach(g => {
            if ((window.appState.selectedTeams[g.gameId] || 'none') !== (originalSelections[g.gameId] || 'none')) changed = true;
          });
          if (changed) {
            $('.submit-edit-btn').addClass('active');
            $('.cancel-btn').addClass('active');
          } else {
            $('.submit-edit-btn').removeClass('active');
            $('.cancel-btn').removeClass('active');
          }
        }
        // 팀 선택 변경 시 수정 버튼 색상 갱신
        $(document).off('click.editBtn').on('click.editBtn', '.team-box', function() {
          setTimeout(updateEditBtnState, 0);
        });
        // 취소 버튼 클릭 시 원래 선택값 복원
        $(document).off('click.cancelBtn').on('click.cancelBtn', '.cancel-btn', function() {
          games.forEach(g => {
            window.appState.selectedTeams[g.gameId] = originalSelections[g.gameId];
          });
          renderGames();
          updateEditBtnState();
        });
        // 수정 버튼 클릭 시 재제출 및 토스트
        $(document).off('click.submitEditBtn').on('click.submitEditBtn', '.submit-edit-btn', async function() {
          let changed = false;
          games.forEach(g => {
            if ((window.appState.selectedTeams[g.gameId] || 'none') !== (originalSelections[g.gameId] || 'none')) changed = true;
          });
          // 미선택 경기 검사 (경기전 경기만 체크)
          const availableGames = games.filter(g => g.status === '경기전');
          const hasUnselected = availableGames.some(g => (window.appState.selectedTeams[g.gameId] || 'none') === 'none');
          if (hasUnselected) {
            showToast(`${availableGames.length} 경기 모두 체크 필요`, '', 1500, 'toast-warning');
            return;
          }
          if (!changed) return;
          // 제출 전 경기 상태 재확인 (DB에서 최신 상태 조회)
          try {
            const currentDate = dateKeys[currentIndex].replace(/-/g, ''); // YYYY-MM-DD -> YYYYMMDD
            const latestGameResponse = await window.apiUtils.getGamesNoCache(currentDate);
            
            if (latestGameResponse.success && latestGameResponse.games) {
              // 경기중인 경기가 하나라도 있는지 확인
              const hasInProgressGame = latestGameResponse.games.some(game => 
                game.gameId !== 'null' && (game.status === '경기중' || game.status === '경기종료') 
              );
              
              if (hasInProgressGame) {
//                alert('제출 마감되었습니다.');
//                showToast('제출 마감되었습니다.', '');
                showToast('', '제출 마감되었습니다.');
                return;
              }
            }
          } catch (error) {
            console.error('경기 상태 재확인 오류:', error);
            // 오류 발생 시에도 제출 진행 (기존 동작 유지)
          }
          
          games.forEach(g => { g.userSelection = window.appState.selectedTeams?.[g.gameId]; });
          // 선택값을 다시 저장
          originalSelections = {};
          games.forEach(g => { originalSelections[g.gameId] = window.appState.selectedTeams[g.gameId]; });
          
          
          
          
          // 전체 선택 정보 수집
          const selections = collectAllSelections();
          
          try {
            // 서버에 전체 선택 정보 저장 (현재 선택된 날짜 포함)
            const currentDate = dateKeys[currentIndex].replace(/-/g, ''); // YYYY-MM-DD -> YYYYMMDD
            await window.apiUtils.saveAllSelections(selections, currentDate);
            showToast('수정 완료', '첫경기 시작 전까지 수정 가능');
            updateEditBtnState();
            scrollToTeamSelectionBottom();
          } catch (error) {
            console.error('올킬 수정 저장 오류:', error);
            showToast('', error.message || '수정 저장 중 오류가 발생했습니다.', 2000, 'toast-warning');
          }
        });
        // 최초 상태 갱신
        updateEditBtnState();
        // 스크롤
        scrollToTeamSelectionBottom();
        showToast('제출 완료', '첫 경기 시작 전까지 수정 가능');
        return;
      }
      // 실패 시 기존 제출 버튼 보이기, edit-btn-row 제거
      else {
    	  const games = window.matchData[key]?.games || [];
    	  const availableGames = games.filter(g => g.status === '경기전');
    	  const totalGames = availableGames.length;
    	  showToast(`${totalGames} 경기 모두 체크 필요`, '', 1500, 'toast-warning');
          scrollToTeamSelectionBottom();
        $('.team-selection-submit').show();
        $('.edit-btn-row').remove();
      }
    });
  }
  
//=== edit-btn-row 핸들러 함수 분리 ===
  function setupEditButtonHandlers() {
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]?.games) || [];
    // 최초 상태 갱신 함수
    function updateEditBtnState() {
      let changed = false;
      games.forEach(g => {
        if ((window.appState.selectedTeams[g.gameId] || 'none') !== (g.userSelection || 'none')) changed = true;
      });
      if (changed) {
        $('.submit-edit-btn').addClass('active').prop('disabled', false);
        $('.cancel-btn').addClass('active').prop('disabled', false);
      } else {
        $('.submit-edit-btn').removeClass('active').prop('disabled', true);
        $('.cancel-btn').removeClass('active').prop('disabled', true);
      }
    }
    // 팀 선택 변경 시 수정 버튼 색상 갱신
    $(document).off('click.editBtn').on('click.editBtn', '.team-box', function() {
      setTimeout(updateEditBtnState, 0);
    });
    // 취소 버튼 클릭 시 원래 선택값 복원
    $(document).off('click.cancelBtn').on('click.cancelBtn', '.cancel-btn', function() {
      games.forEach(g => {
        window.appState.selectedTeams[g.gameId] = originalSelections[g.gameId];
      });
      renderGames();
      updateEditBtnState();
    });
    // 수정 버튼 클릭 시 재제출 및 토스트
    $(document).off('click.submitEditBtn').on('click.submitEditBtn', '.submit-edit-btn', async function() {
      let changed = false;
      games.forEach(g => {
        if ((window.appState.selectedTeams[g.gameId] || 'none') !== (originalSelections[g.gameId] || 'none')) changed = true;
      });
      // 미선택 경기 검사 (경기전 경기만 체크)
      const availableGames = games.filter(g => g.status === '경기전');
      const hasUnselected = availableGames.some(g => (window.appState.selectedTeams[g.gameId] || 'none') === 'none');
      if (hasUnselected) {
        showToast(`${availableGames.length} 경기 모두 체크 필요`, '', 1500, 'toast-warning');
        return;
      }
      if (!changed) return;
      
      // 제출 전 경기 상태 재확인 (DB에서 최신 상태 조회)
      try {
        const currentDate = dateKeys[currentIndex].replace(/-/g, ''); // YYYY-MM-DD -> YYYYMMDD
        const latestGameResponse = await window.apiUtils.getGamesNoCache(currentDate);
        if (latestGameResponse.success && latestGameResponse.games) {
          // 경기중인 경기가 하나라도 있는지 확인
          const hasInProgressGame = latestGameResponse.games.some(game => 
            game.gameId !== 'null' && (game.status === '경기중' || game.status === '경기종료') 
          );
          
          if (hasInProgressGame) {
            //alert('제출 마감되었습니다.');
//        	  showToast('제출 마감되었습니다.', '');
        	  showToast('', '제출 마감되었습니다.');
            return;
          }
        }
      } catch (error) {
        console.error('경기 상태 재확인 오류:', error);
        // 오류 발생 시에도 제출 진행 (기존 동작 유지)
      }
      
      
      games.forEach(g => { g.userSelection = window.appState.selectedTeams?.[g.gameId]; });
      // 선택값을 다시 저장
      originalSelections = {};
      games.forEach(g => { originalSelections[g.gameId] = window.appState.selectedTeams[g.gameId]; });
      const selections = collectAllSelections();
      
      try {
        // 서버에 전체 선택 정보 저장 (현재 선택된 날짜 포함)
        const currentDate = dateKeys[currentIndex].replace(/-/g, ''); // YYYY-MM-DD -> YYYYMMDD
        await window.apiUtils.saveAllSelections(selections, currentDate);
        showToast('수정 완료', '첫경기 시작 전까지 수정 가능');
        updateEditBtnState();
        scrollToTeamSelectionBottom();
      } catch (error) {
        console.error('올킬 수정 저장 오류:', error);
        showToast('', error.message || '수정 저장 중 오류가 발생했습니다.', 2000, 'toast-warning');
      }
    });
    // 최초 상태 갱신
    updateEditBtnState();
  }
  
  //전체 선택 정보 수집
  function collectAllSelections() {
    const selections = {};
    const key = dateKeys[currentIndex];
    const games = (window.matchData[key]?.games) || [];
    
    games.forEach((game, index) => {
      // 경기 취소 상태 확인
      const cancelledStatuses = ['서스펜드', '우천취소', '경기취소'];
      const isCancelled = cancelledStatuses.includes(game.status);
      
      let selection;
      if (isCancelled) {
        // 경기가 취소된 경우 'cancelled'로 설정
        selection = 'cancelled';
      } else {
        // 현재 선택값 우선, 없으면 userSelection 사용
        selection = window.appState.selectedTeams?.[game.gameId] || game.userSelection;
      }
      
      if (selection && selection !== 'none') {
        selections[game.gameId] = selection;
      }
    });
    
    return selections;
  }

  // ==============================
  // 13. 전체 갱신
  // ==============================
  async function refreshAll() {
    stopSubmissionAnimation();
	  await renderDateNavigation();
    renderSection();
    setupDateNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
    
    // 새로운 날짜의 애니메이션 시작
    startSubmissionAnimationIfReady();
  }

  // ==============================
  // 14. 외부 API 노출
  // ==============================
  window.teamSelectionSection = {
    init: initTeamSelectionSection,
    updateTeamSelections: (gameId, team) => {
      window.appState.selectedTeams[gameId] = team;
    }
  };
  
  //===== 토스트 팝업 함수 추가 =====
  function showToast(mainText, subText = '', duration = 1500, extraClass = '') {
    // 기존 토스트 제거
    $("#toast-popup").remove();
    // 토스트 HTML 생성
    const toastHtml = `
      <div id="toast-popup" class="toast-popup${extraClass ? ' ' + extraClass : ''}">
        <div class="toast-main-text">${mainText}</div>
        ${subText ? `<div class="toast-sub-text">${subText}</div>` : ''}
      </div>
    `;
    $("body").append(toastHtml);
    // 1.5초 후 자동 제거
    let toastTimeout = setTimeout(() => {
      $("#toast-popup").fadeOut(200, function() { $(this).remove(); });
    }, duration);
    // 1.5초 내 터치 시 즉시 제거
    $("#toast-popup").on('touchstart mousedown', function() {
      clearTimeout(toastTimeout);
      $(this).fadeOut(100, function() { $(this).remove(); });
    });
  }

  function scrollToTeamSelectionBottom() {
    const section = document.getElementById('kbo-selection-container');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  // 문서 준비 후 초기화
  //$(document).ready(window.teamSelectionSection.init);
  
  //링크 복사 버튼 클릭 시 클립보드에 URL 복사
  $(document).off('click.copylink').on('click.copylink', '.copy-link-button', function() {
    const urlToCopy = window.location.href;
    
    
    const ua = navigator.userAgent;
    // iOS WKWebView
    if (/iPhone|iPad|iPod/i.test(ua) && ua.includes('LIVESCORE_WEBVIEW')) {
      webkit.messageHandlers.copylink.postMessage({
        func: 'copylink',
        data: {
        	link:urlToCopy
        }
      });
    }else{
    	if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
	      // 최신 브라우저, HTTPS 환경
	      navigator.clipboard.writeText(urlToCopy)
	        .then(function() {
//	          alert('링크가 복사되었습니다');
	        })
	        .catch(function(err) {
	          alert('복사에 실패했습니다. 브라우저를 확인해주세요.');
	        });
	    } else {
	    	// 구형 브라우저 또는 HTTP 환경
	    	const textArea = document.createElement('textarea');
	    	textArea.value = urlToCopy;
	    	textArea.readOnly = true; // 읽기 전용
//    	    	textArea.disabled = true; // 비활성화
	    	textArea.style.position = 'fixed';
	    	textArea.style.left = '-9999px';
	    	textArea.style.top = '-9999px';
	    	textArea.style.opacity = '0';
	    	textArea.style.pointerEvents = 'none';
	    	textArea.style.userSelect = 'none';
	    	textArea.style.webkitUserSelect = 'none';
	    	textArea.style.mozUserSelect = 'none';
	    	textArea.style.msUserSelect = 'none';
	    	textArea.style.transform = 'translateX(-9999px)'; // 추가 이동
	    	textArea.style.zIndex = '-9999'; // 최하단으로

	    	document.body.appendChild(textArea);

	    	// 약간의 지연 후 실행
	    	setTimeout(() => {
	    	  textArea.focus();
	    	  textArea.select();
	    	  
	    	  try {
	    	    const successful = document.execCommand('copy');
	    	    if (successful) {
//	    	      alert('링크가 복사되었습니다!');
	    	    } else {
	    	      alert('복사에 실패했습니다. 브라우저를 확인해주세요.');
	    	    }
	    	  } catch (err) {
	    	    alert('복사에 실패했습니다. 브라우저를 확인해주세요.');
	    	  }
	    	  
	    	  document.body.removeChild(textArea);
	    	}, 10);
	    }
    }

    
  });
})(jQuery);
