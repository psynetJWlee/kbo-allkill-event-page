
// Initialize the page when DOM is loaded
$(document).ready(function() {
  console.log('DOM ready - starting initialization');
  
  try {
    // Check if required dependencies are loaded
    if (typeof window.appState === 'undefined') {
      console.error('appState not loaded');
      return;
    }
    
    if (typeof window.matchData === 'undefined') {
      console.error('matchData not loaded');
      return;
    }

    console.log('Dependencies loaded successfully');

    // Apply default selected teams for today view
    if (window.appState.currentDay === 26) {
      console.log('Applying default team selections for today');
      if (window.teamSelectionSection && window.teamSelectionSection.updateTeamSelections) {
        window.teamSelectionSection.updateTeamSelections();
      } else {
        console.warn('teamSelectionSection not available yet');
      }
    }

    // Initialize all sections with error handling
    const sections = [
      { name: 'eventTitleSection', obj: window.eventTitleSection },
      { name: 'winnersSection', obj: window.winnersSection },
      { name: 'myPrizeSection', obj: window.myPrizeSection },
      { name: 'prizeRankingSection', obj: window.prizeRankingSection },
      { name: 'eventDescriptionSection', obj: window.eventDescriptionSection }
    ];

    sections.forEach(section => {
      try {
        if (section.obj && typeof section.obj.init === 'function') {
          console.log(`Initializing ${section.name}`);
          section.obj.init();
          console.log(`${section.name} initialized successfully`);
        } else {
          console.error(`${section.name} not available or missing init method`);
        }
      } catch (error) {
        console.error(`Error initializing ${section.name}:`, error);
      }
    });

    // Initialize team selection section after other sections
    try {
      if (window.teamSelectionSection && typeof window.teamSelectionSection.init === 'function') {
        console.log('Initializing teamSelectionSection');
        window.teamSelectionSection.init();
        console.log('teamSelectionSection initialized successfully');
      } else {
        console.error('teamSelectionSection not available');
      }
    } catch (error) {
      console.error('Error initializing teamSelectionSection:', error);
    }

    // Auto scroll to My Prize if needed
    scrollToMyPrizeIfNeeded();
    
  } catch (error) {
    console.error('섹션 초기화 중 오류:', error);
  }
});

// === [내역 보기 자동 스크롤 기능 - URL 파라미터 방식] ===
function scrollToMyPrizeIfNeeded() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('scrollToMyPrize')) {
      console.log('Auto-scrolling to My Prize section');
      // 스크롤 대상 섹션 선택 (class는 index.html 기준)
      const elem = document.querySelector('.my-prize-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.warn('My Prize section not found for auto-scroll');
      }
    }
  } catch (e) {
    console.error('내역 자동 스크롤 오류:', e);
  }
}
