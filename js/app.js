// js/app.js
import { initTeamSelection }           from './sections/teamselection/teamSelection.js';
import { initDateNavigation }          from './sections/teamselection/dateNavigation.js';
import { initMyPrizeSection }          from './sections/teamselection/myPrizeSection.js';
import { initPrizeRankingSection }     from './sections/teamselection/prizeRankingSection.js';
import { initEventDescriptionSection } from './sections/teamselection/eventDescriptionSection.js';

document.addEventListener('DOMContentLoaded', () => {
  initTeamSelection();
  initDateNavigation();
  initMyPrizeSection();
  initPrizeRankingSection();
  initEventDescriptionSection();
});

// Initialize the page when DOM is loaded
$(document).ready(function() {
  try {
    // Apply default selected teams for today view
    if (window.appState.currentDay === 26) {
      window.appState.selectedTeams = { ...defaultSelectedTeams };
      
      // Ensure teamSelectionSection is initialized before trying to update it
      setTimeout(() => {
        if (window.teamSelectionSection && window.teamSelectionSection.updateTeamSelections) {
          window.teamSelectionSection.updateTeamSelections();
        }
      }, 100);
    }

    // Initialize all sections
    window.eventTitleSection.init();
    window.winnersSection.init();
    
    // Initialize team selection section - this now uses the modular version
    if (window.teamSelectionSection && window.teamSelectionSection.init) {
      window.teamSelectionSection.init();
    }
    
    window.myPrizeSection.init();
    window.prizeRankingSection.init();
    window.eventDescriptionSection.init();
    
  } catch (error) {
    console.error('섹션 초기화 중 오류:', error);
  }
});
