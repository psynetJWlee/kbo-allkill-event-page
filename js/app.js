// Initialize the page when DOM is loaded
$(document).ready(function() {
  try {
    // Apply default selected teams for today view
    if (window.appState.currentDay === 26) {
      window.teamSelectionSection.updateTeamSelections();
    }

    // Initialize all sections
    window.eventTitleSection.init();
    window.winnersSection.init();
    // window.teamSelectionSection.init(); // 중복 실행 제거
    window.myPrizeSection.init();
    window.prizeRankingSection.init();
    window.eventDescriptionSection.init();
    
  } catch (error) {
    console.error('섹션 초기화 중 오류:', error);
  }
});


// === [내역 보기 자동 스크롤 기능 - URL 파라미터 방식] ===
function scrollToMyPrizeIfNeeded() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('scrollToMyPrize')) {
      // 스크롤 대상 섹션 선택 (class는 index.html 기준)
      const elem = document.querySelector('.my-prize-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  } catch (e) {
    console.error('내역 자동 스크롤 오류:', e);
  }
}

// 기존 초기화 코드 등과 함께 실행
$(document).ready(function() {
  try {
    // Apply default selected teams for today view
    if (window.appState.currentDay === 26) {
      window.teamSelectionSection.updateTeamSelections();
    }

    // Initialize all sections
    window.eventTitleSection.init();
    window.winnersSection.init();
    // window.teamSelectionSection.init(); // 중복 실행 제거
    window.myPrizeSection.init();
    window.prizeRankingSection.init();
    window.eventDescriptionSection.init();

    // ✅ 내역보기 자동 스크롤 트리거 실행
    scrollToMyPrizeIfNeeded();
  } catch (error) {
    console.error('섹션 초기화 중 오류:', error);
  }
});
