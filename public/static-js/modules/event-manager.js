
// Event Manager module for handling events
const EventManager = (function() {
  // Import dependencies
  const { state } = TeamSelectionCore;
  const { updateDateDisplay, toggleSections } = DOMManager;
  
  // Setup event listeners
  function setupEventListeners() {
    // Listen for React's custom event for button rendering
    document.addEventListener('react-rendered', function(event) {
      console.log('Vanilla JS: React rendered event received', event.detail);
      if (event.detail && event.detail.elementId === 'submit-allkill-btn') {
        TeamSelectionCore.setupSubmitButtonListener();
        DOMManager.updateSubmitButton();
      }
    });
    
    // Listen for React's custom event for date changes
    document.addEventListener('reactDateChanged', function(event) {
      console.log('Vanilla JS: React date changed event received', event.detail);
      if (event.detail) {
        state.currentDay = event.detail.currentDay;
        state.realToday = event.detail.realToday;
        toggleSections(state.currentDay);
      }
    });
    
    // Set up date navigation if available
    const dateNavigation = document.querySelector('.date-navigation');
    if (dateNavigation) {
      console.log('Date navigation found, initializing...');
      initDateNavigation();
    } else {
      // Try to find date-nav-prev and date-nav-next directly
      const prevDateBtn = document.getElementById('nav-prev');
      const nextDateBtn = document.getElementById('nav-next');
      const todayBtn = document.getElementById('nav-today');
      
      if (prevDateBtn && nextDateBtn && todayBtn) {
        console.log('Date navigation buttons found, initializing...');
        setupDateNavigation(prevDateBtn, nextDateBtn, todayBtn);
      } else {
        console.warn('Date navigation elements not found, will retry');
        setTimeout(() => {
          setupEventListeners();
        }, 500);
      }
    }
    
    // Set up event listeners for game selection using the new null-safe approach
    const matchContainers = document.querySelectorAll('.match') || [];
    if (matchContainers.length === 0) {
      console.warn('[팀 선택] .match 컨테이너를 찾을 수 없습니다.');
      return;
    }
    
    matchContainers.forEach(match => {
      const opts = match.querySelectorAll('input[type="radio"], .team-option') || [];
      opts.forEach(opt => {
        opt.addEventListener('change', DOMManager.updateSubmitButton);
        opt.addEventListener('click', DOMManager.updateSubmitButton);
      });
    });
  }
  
  // Initialize date navigation
  function initDateNavigation() {
    const prevDateBtn = document.getElementById('nav-prev');
    const nextDateBtn = document.getElementById('nav-next');
    const todayBtn = document.getElementById('nav-today');
    
    if (!prevDateBtn || !nextDateBtn || !todayBtn) {
      console.warn('Date navigation buttons not found - will try again later');
      setTimeout(initDateNavigation, 500);
      return;
    }
    
    setupDateNavigation(prevDateBtn, nextDateBtn, todayBtn);
    
    // Initial update of date display
    updateDateDisplay();
  }
  
  // Setup date navigation
  function setupDateNavigation(prevDateBtn, nextDateBtn, todayBtn) {
    // Add click event for previous date button
    prevDateBtn.addEventListener('click', function() {
      state.currentDay--;
      updateDateDisplay();
      toggleSections(state.currentDay);
    });
    
    // Add click event for today button
    todayBtn.addEventListener('click', function() {
      state.currentDay = state.realToday;
      updateDateDisplay();
      toggleSections(state.currentDay);
    });
    
    // Add click event for next date button
    nextDateBtn.addEventListener('click', function() {
      state.currentDay++;
      updateDateDisplay();
      toggleSections(state.currentDay);
    });
    
    console.log('Date navigation initialized successfully');
  }
  
  // Public API
  return {
    setupEventListeners,
    initDateNavigation,
    setupDateNavigation
  };
})();
