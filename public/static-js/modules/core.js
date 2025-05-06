
// Core module for initialization and app coordination
const TeamSelectionCore = (function() {
  // Import dependencies
  const { teamData, gameData } = DataManager;
  const { setupEventListeners } = EventManager;
  const { initializeElements, toggleSections, updateSubmitButton } = DOMManager;
  
  // State management
  const state = {
    selectedTeams: {},
    currentDay: 26,
    realToday: 26,
    yesterdayDay: 25,
    gameElements: [],
    domReady: false,
    buttonInitialized: false
  };
  
  // Core initialization function
  function initializeApp() {
    console.log('Initializing vanilla JS app...');
    
    // Check if the submit button exists
    const submitBtn = document.getElementById('submit-allkill-btn');
    if (!submitBtn) {
      console.warn('submit-allkill-btn 요소를 찾을 수 없습니다.');
      // Retry after a short delay
      setTimeout(initializeApp, 500);
      return;
    }
    
    // Setup the submit button
    setupSubmitButtonListener();
    
    // Initialize other elements
    initializeElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update submit button state initially
    updateSubmitButton();
  }
  
  // Setup submit button listener
  function setupSubmitButtonListener() {
    try {
      // First check if button exists
      const submitBtn = document.getElementById('submit-allkill-btn');
      if (!submitBtn) {
        console.warn('submit-allkill-btn 요소를 찾을 수 없습니다.');
        return false;
      }
      
      // Check if we've already set up the listener
      if (!submitBtn.dataset.listenerAdded) {
        submitBtn.addEventListener('click', function() {
          if (Object.keys(state.selectedTeams).length === 5) {
            alert('올킬 투표가 제출되었습니다!');
          }
        });
        // Mark that we've added the listener
        submitBtn.dataset.listenerAdded = 'true';
        console.log('Submit button listener added successfully');
        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Error in setupSubmitButtonListener:', error);
      return false;
    }
  }
  
  // Handle team selection
  function handleTeamSelect(gameId, teamSide) {
    state.selectedTeams[gameId] = teamSide;
    updateSubmitButton();
  }
  
  // Public API
  return {
    initializeApp,
    setupSubmitButtonListener,
    handleTeamSelect,
    state
  };
})();
