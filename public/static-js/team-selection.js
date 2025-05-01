
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

    // Set initial state visibility
    updateStateVisibility();
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

    // Get state containers
    elements.stateDefault = document.getElementById('state-default');
    elements.stateToday = document.getElementById('state-today');
    elements.stateYesterday = document.getElementById('state-yesterday');
    
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
    const dateNavigation = document.querySelector('#date-navigation');
    if (dateNavigation) {
      initDateNavigation();
    } else {
      // Try to find the date navigation elements directly
      setupDateNavigationListeners();
    }
    
    // Set up event listeners for game selection
    const matchContainers = document.querySelectorAll('.match') || [];
    matchContainers.forEach(match => {
      const opts = match.querySelectorAll('input[type="radio"], .team-option') || [];
      opts.forEach(opt => {
        opt.addEventListener('change', updateSubmitButton);
        opt.addEventListener('click', updateSubmitButton);
      });
    });

    // Set up team box click listeners
    setupTeamBoxListeners();
  }

  function setupTeamBoxListeners() {
    const teamBoxes = document.querySelectorAll('.team-box');
    teamBoxes.forEach(box => {
      box.addEventListener('click', function() {
        const gameItem = this.closest('.game-item');
        if (gameItem) {
          const gameId = parseInt(gameItem.dataset.index || '0', 10);
          const teamSide = this.dataset.team;
          if (teamSide) {
            handleTeamSelect(gameId, teamSide);
          }
        }
      });
    });
  }

  function setupDateNavigationListeners() {
    const prevBtn = document.querySelector('.date-nav-prev');
    const nextBtn = document.querySelector('.date-nav-next');
    const currentDayEl = document.getElementById('current-day');
    const prevDayEl = document.getElementById('prev-day');
    const nextDayEl = document.getElementById('next-day');

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        state.currentDay--;
        updateDateDisplay();
        updateStateVisibility();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        state.currentDay++;
        updateDateDisplay();
        updateStateVisibility();
      });
    }

    // Add click events for day numbers
    if (prevDayEl) {
      prevDayEl.addEventListener('click', function(e) {
        e.stopPropagation();
        state.currentDay--;
        updateDateDisplay();
        updateStateVisibility();
      });
    }

    if (nextDayEl) {
      nextDayEl.addEventListener('click', function(e) {
        e.stopPropagation();
        state.currentDay++;
        updateDateDisplay();
        updateStateVisibility();
      });
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
    submitButton: null,
    stateDefault: null,
    stateToday: null,
    stateYesterday: null
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
    // 3-1. 버튼 엘리먼트 안전하게 가져오기
    const submitBtn = document.getElementById('submit-allkill-btn');
    if (!submitBtn) {
      console.warn('submit-allkill-btn not found');
      return;
    }
    
    // 3-2. 모든 경기에 선택된 옵션이 있는지 검사
    const allSelected = Object.keys(state.selectedTeams).length === 5;
    
    // 3-3. classList 사용 제거 → style과 disabled로 제어
    submitBtn.disabled = !allSelected;
    submitBtn.style.opacity = allSelected ? '1' : '0.3';
    submitBtn.style.color = allSelected ? '#121212' : 'rgba(18, 18, 18, 0.7)';
    
    // Update button based on current day
    updateButtonForCurrentDay(submitBtn);
    
    console.log('Submit button updated. All selected:', allSelected);
  }
  
  function updateButtonForCurrentDay(submitBtn) {
    if (!submitBtn) return;

    if (state.currentDay === 27) {
      // Tomorrow - always disabled
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.3';
      submitBtn.style.color = 'rgba(18, 18, 18, 0.7)';
      submitBtn.innerHTML = '올킬 제출';
    } else if (state.currentDay === 25) {
      // Yesterday - show success
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.color = '#121212';
      submitBtn.innerHTML = '올킬 성공!';
    } else if (state.currentDay === 26) {
      // Today - show regular or results
      if (elements.stateToday && elements.stateToday.style.display === 'block') {
        // After submission
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.color = '#121212';
        submitBtn.innerHTML = '2 경기 성공!<br>채점 중';
      }
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
            if (state.currentDay === 26) { // Only for today
              showTodayResults();
            } else {
              alert('올킬 투표가 제출되었습니다!');
            }
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
      updateStateVisibility();
    });
    
    nextDateBtn.addEventListener('click', function() {
      state.currentDay++;
      updateDateDisplay();
      updateStateVisibility();
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

  // ====== STATE VISIBILITY FUNCTIONS ======

  function updateStateVisibility() {
    // First make sure we have our elements
    if (!elements.stateDefault || !elements.stateToday || !elements.stateYesterday) {
      // Try to get them if not already set
      elements.stateDefault = document.getElementById('state-default');
      elements.stateToday = document.getElementById('state-today');
      elements.stateYesterday = document.getElementById('state-yesterday');
      
      // If still not found, we'll retry later
      if (!elements.stateDefault || !elements.stateToday || !elements.stateYesterday) {
        console.warn('State containers not found yet, will retry');
        setTimeout(updateStateVisibility, 500);
        return;
      }
    }

    // Hide all states first
    elements.stateDefault.style.display = 'none';
    elements.stateToday.style.display = 'none';
    elements.stateYesterday.style.display = 'none';

    // Show appropriate state based on current day
    if (state.currentDay === 25) {
      // Yesterday
      elements.stateYesterday.style.display = 'block';
    } else if (state.currentDay === 27) {
      // Tomorrow
      elements.stateDefault.style.display = 'block';
    } else {
      // Today - default to selection state unless already submitted
      elements.stateDefault.style.display = 'block';
    }

    // Update button appearance based on state
    updateSubmitButton();
  }

  function showTodayResults() {
    if (!elements.stateDefault || !elements.stateToday) {
      console.warn('State containers not found');
      return;
    }

    // Hide selection UI and show results
    elements.stateDefault.style.display = 'none';
    elements.stateToday.style.display = 'block';

    // Update button text
    const submitBtn = document.getElementById('submit-allkill-btn');
    if (submitBtn) {
      submitBtn.innerHTML = '2 경기 성공!<br>채점 중';
      submitBtn.style.lineHeight = '1.2';
    }
  }
});
