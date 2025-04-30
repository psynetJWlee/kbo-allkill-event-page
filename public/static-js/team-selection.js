
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
    
    // Mark as ready
    state.domReady = true;
    return true;
  }
  
  function setupEventListeners() {
    // Listen for React's custom event
    document.addEventListener('react-rendered', function(event) {
      console.log('Vanilla JS: React rendered event received', event.detail);
      if (event.detail && event.detail.elementId === 'submit-allkill-btn') {
        setupSubmitButtonListener();
        updateSubmitButton();
      }
    });
    
    // Set up date navigation if available
    const dateNavigation = document.querySelector('.date-navigation');
    if (dateNavigation) {
      initDateNavigation();
    }
  }
  
  // ====== DATA CREATION FUNCTIONS ======
  
  function createTeamData() {
    // KBO team logo URLs
    const teamLogos = {
      "KT": "https://i.namu.wiki/i/oBeeNjwnmWwfmQIVYLOMNprU2uRBNkrDFPUijjme-tifWUeeE0D8P652TlU8V7w7peExR5E-_lwv7jf0IGUKuw.svg",
      "LG": "https://i.namu.wiki/i/LxXhJtRrfucU3cBPgVME5T6MT6vjFCXGCMgLXkNv2AyAJTEP_zI9E1quP_IG2052hqxSgqD6qYMn_9rMCsTyiP5TqUG7IYjkllXSiywzU8ukzKRI954tqCDD0SQ-eZXKKcgOhqFD02PIYHAhWs5gxg.svg",
      "한화": "https://i.namu.wiki/i/8pj9ZIy7Q8FnbR4hLnZ7nkC7S8vVl5q32HRIBMZDimKTvYzwRYt_UEi-UYPG-wfQY5BjuAirfqG01clbziAQJw.svg",
      "두산": "https://i.namu.wiki/i/SM6pQeZzyF0Rf0mbz5gJ91IhCMRAvh2J-wcJfmVwMhqN_PhIB5swVLSeQdnf-zTtKRi5OuoMf1h4cUGuJObRaS6s9pFkfd7QPZX7SHgBjQrNoApf46RgfGWhf3q57yC6AH3GTDwTFdzT1gNOgd76VA.svg",
      "KIA": "https://i.namu.wiki/i/zWuonkrdoxBaxY6oe9RGf6u-YL0YJRUp3th5-fNkKGk7RqgNESeCtcbGl3HeR0LMP3SZ9IlYAsP3kSIjZhJgWUabnZCI4PwazHMbgxczAxOVJ_qZdcvxrOrITwsmnMQvUTTtIzPBfL9QX56ht0FPFQ.svg",
      "키움": "https://i.namu.wiki/i/iYY2lyEZKY3EpAtu2yUy9b1hDvQ3ijc8ivfkk6fBltP-LpJtQtudzC_LtkXfEKBBogFRAU4ETVrctfuN1UIt-5FaAcqvpMgKAbOTOFGxXB-XQ6wP_NqGndl5ChTxyqSzlJ6P9RWe6RkmM5ieuOXWbw.svg",
      "NC": "https://i.namu.wiki/i/N235-wD7Qzau4r3dfNwgqhqN1-4AEBCQey4tS-vqDgZuhLa_16KiGqbCHd-IWjrcDn2NtvZN7iT7X5eC9xekk7q5gYoJkxZ7pLoUBK8nGXGnfRE1UaP0QrxjCsoaKSOndKRyV1vhqHD0LLivZFM7wQ.svg",
      "삼성": "https://i.namu.wiki/i/oV_2e6_8-vFepLD0dHLsenkQEo0aj4nleb3xcilEZwi2Cfhr6jZMUZFb503MAlLmfapeHzMMR7DCEi3OJECz9LnJzb-Eic1W_-rNin-im1XlNDjGjbZsmQTmBueDFUvttyLHB2FA4QXIaDD9g0LeMw.svg",
      "SSG": "https://i.namu.wiki/i/TV5apmiATJX1d8xGgk6PtBctZeKxFCMZpUmFPaMcDkC36k1maJJokJ0Gpkuocah54nbKIQOAZUgyD9Ow-3512VLBwtDYyAN0Jm8JEe6_j-r534KUAVoCZ46NkOeJmI8y77ukV48NxCnbQ6KenB0UmQ.svg",
      "롯데": "https://i.namu.wiki/i/cFb8Ykp4kxvpk-foBdgeGyj3d2TGfYSW41KZ-k9SjjVsFSFgJnvAthnIjAND2AE____xihT73odP_H3LTi1UOjvyw5raOqh1biiza57RlobyEzf-ItioBNQEl8rtdqyY0Vw9hsk1CmUx7kNp3oddWw.svg"
    };
    
    return { teamLogos };
  }
  
  function createGameData(teamLogos) {
    // KBO 팀 경기 데이터
    return [
      {
        id: 0,
        homeTeam: { name: "KT", logo: teamLogos.KT, votes: 1941 },
        awayTeam: { name: "LG", logo: teamLogos.LG, votes: 3304 },
        time: "18:00",
        status: "투표 중"
      },
      {
        id: 1,
        homeTeam: { name: "한화", logo: teamLogos["한화"], votes: 4720 },
        awayTeam: { name: "NC", logo: teamLogos.NC, votes: 524 },
        time: "18:00",
        status: "투표 중"
      },
      {
        id: 2,
        homeTeam: { name: "두산", logo: teamLogos["두산"], votes: 0 },
        awayTeam: { name: "삼성", logo: teamLogos["삼성"], votes: 5245 },
        time: "18:00",
        status: "투표 중"
      },
      {
        id: 3,
        homeTeam: { name: "KIA", logo: teamLogos.KIA, votes: 4458 },
        awayTeam: { name: "SSG", logo: teamLogos.SSG, votes: 787 },
        time: "18:00",
        status: "투표 중"
      },
      {
        id: 4,
        homeTeam: { name: "키움", logo: teamLogos["키움"], votes: 787 },
        awayTeam: { name: "롯데", logo: teamLogos["롯데"], votes: 4458 },
        time: "18:00",
        status: "투표 중"
      }
    ];
  }
  
  // DOM element references initialized outside DOMContentLoaded for wider scope
  const elements = {
    gameList: null,
    submitButton: null
  };
  
  // ====== EVENT HANDLER FUNCTIONS ======
  
  function handleTeamSelect(gameId, teamSide) {
    // Game list check
    if (!elements.gameList) {
      console.warn('Game list not available for team selection');
      return;
    }
    
    // Find the game element
    const gameElement = document.querySelector(`.game-item[data-index="${gameId}"]`);
    if (!gameElement) {
      console.log(`Game element with ID ${gameId} not found`);
      return;
    }
    
    // Update state
    state.selectedTeams[gameId] = teamSide;
    
    // Update submit button state
    updateSubmitButton();
  }
  
  function updateSubmitButton() {
    try {
      // First check if submitButton exists
      const submitBtn = document.getElementById('submit-allkill-btn');
      if (!submitBtn) {
        console.warn('submit-allkill-btn 요소를 찾을 수 없습니다.');
        return;
      }
      
      // Check if all games have a selection
      const allSelected = Object.keys(state.selectedTeams).length === 5;
      
      // Update button attributes using style directly
      submitBtn.disabled = !allSelected;
      submitBtn.style.opacity = allSelected ? '1' : '0.3';
      submitBtn.style.color = allSelected ? '#121212' : 'rgba(18, 18, 18, 0.7)';
      
      console.log('Submit button updated successfully. All selected:', allSelected);
    } catch (error) {
      console.error('Error in updateSubmitButton:', error);
    }
  }
  
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
  
  // ====== DATE NAVIGATION FUNCTIONS ======
  
  function initDateNavigation() {
    const prevDateBtn = document.querySelector('.date-nav-prev');
    const nextDateBtn = document.querySelector('.date-nav-next');
    
    if (!prevDateBtn || !nextDateBtn) {
      console.warn('Date navigation buttons not found - will try again later');
      setTimeout(initDateNavigation, 500);
      return;
    }
    
    prevDateBtn.addEventListener('click', function() {
      state.currentDay--;
      updateDateDisplay();
    });
    
    nextDateBtn.addEventListener('click', function() {
      state.currentDay++;
      updateDateDisplay();
    });
    
    console.log('Date navigation initialized successfully');
    
    // Initial update of date display
    updateDateDisplay();
  }
  
  function updateDateDisplay() {
    const currentDayElement = document.getElementById('current-day');
    const prevDayElement = document.getElementById('prev-day');
    const nextDayElement = document.getElementById('next-day');
    
    if (currentDayElement) {
      currentDayElement.textContent = state.currentDay === state.realToday ? 'Today' : state.currentDay;
    }
    
    if (prevDayElement) {
      prevDayElement.textContent = state.currentDay - 1;
    }
    
    if (nextDayElement) {
      nextDayElement.textContent = state.currentDay + 1;
    }
  }
});
