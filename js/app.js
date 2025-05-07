
// Initialize the page when DOM is loaded
$(document).ready(function() {
  // Apply default selected teams for today view
  if (window.appState.currentDay === 26) {
    window.appState.selectedTeams = { ...defaultSelectedTeams };
    window.teamSelectionSection.updateTeamSelections();
  }
  
  // Initialize all sections
  window.eventTitleSection.init();
  window.winnersSection.init();
  window.teamSelectionSection.init();
  window.myPrizeSection.init();
  window.prizeRankingSection.init();
  window.eventDescriptionSection.init();
});
