// Wrap everything in DOMContentLoaded to ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  
  // Data objects
  const teamData = createTeamData();
  const gameData = createGameData(teamData.teamLogos);
  
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
  
  // Initial setup
  initializeApp();
  
  // ====== CORE INITIALIZATION FUNCTIONS ======
  
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
  
  function initializeElements() {
    // Get game list element
    elements.gameList = document.getElementById('game-list');
    if (!elements.gameList) {
      console.warn('Game list element not found');
      return false;
    }
    
    // Set the button reference
    elements.submitButton = document.getElementById('submit-allkill-btn');
    if (!elements.submitButton) {
      console.warn('Submit button element not found');
      return false;
    }
    
    // Get the team selection section
    elements.teamSelectionSection = document.getElementById('team-selection-section');
    if (!elements.teamSelectionSection) {
      console.warn('Team selection section not found');
      return false;
    }
    
    // Get the team selection placeholder
    elements.teamSelectionPlaceholder = document.getElementById('team-selection-placeholder');
    if (!elements.teamSelectionPlaceholder) {
      console.warn('Team selection placeholder not found');
      return false;
    }
    
    // <- 여기 ID를 일치시키도록 변경했습니다 ->
    // Get the yesterday state section
    elements.stateYesterday = document.getElementById('team-selection-section-yesterday');
    if (!elements.stateYesterday) {
      console.warn('Yesterday state section not found');
      return false;
    }
    
    // Mark as ready
    state.domReady = true;
    return true;
  }
  
  function setupEventListeners() {
    // Listen for React's custom event for button rendering
    document.addEventListener('react-rendered', function(event) {
      console.log('Vanilla JS: React rendered event received', event.detail);
      if (event.detail && event.detail.elementId === 'submit-allkill-btn') {
        setupSubmitButtonListener();
        updateSubmitButton();
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
    const dateNavigation = document.querySelector('#date-navigation');
    if (dateNavigation) {
      console.log('Date navigation found, initializing...');
      initDateNavigation();
    } else {
      // Try to find date-nav-prev and date-nav-next directly
      const prevDateBtn = document.querySelector('.date-nav-prev');
      const nextDateBtn = document.querySelector('.date-nav-next');
      
      if (prevDateBtn && nextDateBtn) {
        console.log('Date navigation buttons found, initializing...');
        setupDateNavigation(prevDateBtn, nextDateBtn);
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
        opt.addEventListener('change', updateSubmitButton);
        opt.addEventListener('click', updateSubmitButton);
      });
    });
  }
  
  // ====== DATA CREATION FUNCTIONS ======
  
  function createTeamData() {
    // KBO team logo URLs
    const teamLogos = {
      /* ... 동일 ... */
    };
    
    return { teamLogos };
  }
  
  function createGameData(teamLogos) {
    // KBO 팀 경기 데이터
    return [
      /* ... 동일 ... */
    ];
  }
  
  // DOM element references initialized outside DOMContentLoaded for wider scope
  const elements = {
    gameList: null,
    submitButton: null,
    teamSelectionSection: null,
    teamSelectionPlaceholder: null,
    stateYesterday: null
  };
  
  // ====== EVENT HANDLER FUNCTIONS ======
  
  function handleTeamSelect(gameId, teamSide) {
    /* ... 동일 ... */
  }
  
  function updateSubmitButton() {
    /* ... 동일 ... */
  }
  
  function setupSubmitButtonListener() {
    /* ... 동일 ... */
  }
  
  // ====== DATE NAVIGATION FUNCTIONS ======
  
  function initDateNavigation() {
    /* ... 동일 ... */
  }
  
  function setupDateNavigation(prevDateBtn, nextDateBtn) {
    /* ... 동일 ... */
  }
  
  function updateDateDisplay() {
    /* ... 동일 ... */
  }
  
  // ====== TEAM SELECTION TOGGLE FUNCTIONS ======
  
  function toggleSections(day) {
    if (!elements.teamSelectionSection || !elements.teamSelectionPlaceholder || !elements.stateYesterday) {
      console.warn('Team selection elements not found');
      return;
    }
    
    console.log(`Toggling team selection for day ${day}, realToday: ${state.realToday}, yesterdayDay: ${state.yesterdayDay}`);
    
    // Hide all sections first
    elements.teamSelectionSection.style.display = 'none';
    elements.teamSelectionPlaceholder.style.display = 'none';
    elements.stateYesterday.style.display = 'none';
    
    if (day === state.realToday) {
      elements.teamSelectionSection.style.display = 'block';
      console.log('Showing team selection section (Today)');
    } else if (day === state.yesterdayDay) {
      elements.stateYesterday.style.display = 'block';
      console.log('Showing yesterday state section');
    } else if (day > state.realToday) {
      elements.teamSelectionSection.style.display = 'block';
      console.log('Showing team selection section (Future)');
    } else {
      elements.teamSelectionPlaceholder.style.display = 'block';
      console.log('Showing team selection placeholder (Past)');
    }
  }
});
