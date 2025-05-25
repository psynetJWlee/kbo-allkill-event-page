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
    window.teamSelectionSection.init();
    window.myPrizeSection.init();
    window.prizeRankingSection.init();
    window.eventDescriptionSection.init();
    
  } catch (error) {
    console.error('섹션 초기화 중 오류:', error);
  }
});
