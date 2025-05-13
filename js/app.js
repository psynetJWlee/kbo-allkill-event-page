
// Initialize the page when DOM is loaded
$(document).ready(function() {
  console.log("DOM ready, initializing application...");
  
  try {
    console.log("Current day:", window.appState.currentDay);
    
    // Apply default selected teams for today view
    if (window.appState.currentDay === 26) {
      console.log("Setting default team selections for today (day 26)");
      window.appState.selectedTeams = { ...defaultSelectedTeams };
      
      // Only call updateTeamSelections if the function exists
      if (window.teamSelectionSection && typeof window.teamSelectionSection.updateTeamSelections === 'function') {
        window.teamSelectionSection.updateTeamSelections();
      } else {
        console.error("teamSelectionSection.updateTeamSelections is not available");
      }
    }

    // Initialize all sections with proper error handling
    console.log("Initializing event title section");
    if (window.eventTitleSection && typeof window.eventTitleSection.init === 'function') {
      window.eventTitleSection.init();
    } else {
      console.error("eventTitleSection.init is not available");
    }
    
    console.log("Initializing winners section");
    if (window.winnersSection && typeof window.winnersSection.init === 'function') {
      window.winnersSection.init();
    } else {
      console.error("winnersSection.init is not available");
    }
    
    console.log("Initializing team selection section");
    if (window.teamSelectionSection && typeof window.teamSelectionSection.init === 'function') {
      window.teamSelectionSection.init();
    } else {
      console.error("teamSelectionSection.init is not available");
    }
    
    console.log("Initializing prize section");
    if (window.myPrizeSection && typeof window.myPrizeSection.init === 'function') {
      window.myPrizeSection.init();
    } else {
      console.error("myPrizeSection.init is not available");
    }
    
    console.log("Initializing prize ranking section");
    if (window.prizeRankingSection && typeof window.prizeRankingSection.init === 'function') {
      window.prizeRankingSection.init();
    } else {
      console.error("prizeRankingSection.init is not available");
    }
    
    console.log("Initializing event description section");
    if (window.eventDescriptionSection && typeof window.eventDescriptionSection.init === 'function') {
      window.eventDescriptionSection.init();
    } else {
      console.error("eventDescriptionSection.init is not available");
    }
    
  } catch (error) {
    console.error('섹션 초기화 중 오류:', error);
    console.error('Error stack:', error.stack);
  }
});
