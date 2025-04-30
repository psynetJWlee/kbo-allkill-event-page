
document.addEventListener('DOMContentLoaded', function() {
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
  
  // DOM element references
  const elements = {
    gameList: null,
    submitButton: null
  };
  
  // Initialize the application
  initializeApp();
  
  // ====== CORE INITIALIZATION FUNCTIONS ======
  
  function initializeApp() {
    console.log('Initializing vanilla JS app...');
    
    // Make multiple attempts to initialize elements
    let initAttempts = 0;
    const maxAttempts = 20; // Increase max attempts
    
    const attemptInit = () => {
      initAttempts++;
      console.log(`Initialization attempt ${initAttempts}/${maxAttempts}`);
      
      if (initializeElements()) {
        console.log('Elements initialized, proceeding with app setup');
        renderGameList();
        initDateNavigation();
        setupSubmitButtonListener();
        state.domReady = true;
      } else if (initAttempts < maxAttempts) {
        // If we haven't reached max attempts, try again with increasing delays
        const delay = Math.min(500, 100 * initAttempts);
        console.log(`Elements not ready, retrying initialization in ${delay}ms...`);
        setTimeout(attemptInit, delay);
      } else {
        console.warn('Failed to initialize after maximum attempts');
      }
    };
    
    // Start the first attempt
    attemptInit();
    
    // Also listen for React's custom event to know when the button is definitely available
    document.addEventListener('react-rendered', function(event) {
      console.log('Vanilla JS: React rendered event received', event.detail);
      if (event.detail && event.detail.elementId === 'submit-allkill-btn') {
        // React has rendered the button, we can safely initialize it now
        initializeElements();
        setupSubmitButtonListener();
        updateSubmitButton();
      }
    });
  }
  
  function initializeElements() {
    try {
      elements.gameList = document.getElementById('game-list');
      elements.submitButton = document.getElementById('submit-allkill-btn');
      
      // Check if elements are available
      let allReady = true;
      
      if (!elements.gameList) {
        console.log('Game list element not found yet');
        allReady = false;
      }
      
      if (!elements.submitButton) {
        console.log('Submit button element not found yet');
        allReady = false;
      } else if (!state.buttonInitialized) {
        console.log('Submit button found, marking as initialized');
        state.buttonInitialized = true;
      }
      
      return allReady;
    } catch (error) {
      console.error('Error during element initialization:', error);
      return false;
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
  
  // ====== UI RENDERING FUNCTIONS ======
  
  function renderGameList() {
    if (!elements.gameList) {
      console.warn('Game list element not available for rendering');
      return;
    }
    
    // Clear existing content
    elements.gameList.innerHTML = '';
    state.gameElements = [];
    
    gameData.forEach((game, index) => {
      const gameElement = createGameElement(game, index);
      elements.gameList.appendChild(gameElement);
      state.gameElements.push(gameElement);
    });
  }
  
  function createGameElement(game, index) {
    const gameItemElement = document.createElement('div');
    gameItemElement.className = index % 2 === 0 ? 'game-item alternate-bg' : 'game-item';
    gameItemElement.setAttribute('data-index', game.id);
    
    // Add home team column
    gameItemElement.appendChild(createTeamColumn(game, 'home'));
    
    // Add game status column
    gameItemElement.appendChild(createGameStatusColumn(game));
    
    // Add away team column
    gameItemElement.appendChild(createTeamColumn(game, 'away'));
    
    return gameItemElement;
  }
  
  function createTeamColumn(game, side) {
    const team = side === 'home' ? game.homeTeam : game.awayTeam;
    const oppositeTeam = side === 'home' ? game.awayTeam : game.homeTeam;
    
    const teamColumn = document.createElement('div');
    teamColumn.className = 'team-column';
    
    const teamBox = document.createElement('button');
    teamBox.className = 'team-box';
    teamBox.setAttribute('data-team', side);
    teamBox.innerHTML = `
      <img class="team-logo" src="${team.logo}" alt="${team.name} 로고">
      <span class="team-name">${team.name}</span>
    `;
    teamBox.addEventListener('click', () => handleTeamSelect(game.id, side));
    
    const voteCount = document.createElement('div');
    voteCount.className = `vote-count ${team.votes >= oppositeTeam.votes ? 'higher' : 'lower'}`;
    voteCount.textContent = team.votes.toLocaleString();
    
    teamColumn.appendChild(teamBox);
    teamColumn.appendChild(voteCount);
    
    return teamColumn;
  }
  
  function createGameStatusColumn(game) {
    const gameStatus = document.createElement('div');
    gameStatus.className = 'game-status';
    
    const votingText = document.createElement('div');
    votingText.className = 'voting-text';
    votingText.textContent = game.status;
    
    const gameTime = document.createElement('div');
    gameTime.className = 'game-time';
    gameTime.textContent = game.time;
    
    gameStatus.appendChild(votingText);
    gameStatus.appendChild(gameTime);
    
    return gameStatus;
  }
  
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
    
    // Remove previous selection
    removeTeamSelection(gameElement);
    
    // Add new selection
    addTeamSelection(gameElement, teamSide, gameId);
    
    // Update submit button state
    updateSubmitButton();
  }
  
  function removeTeamSelection(gameElement) {
    const previousSelected = gameElement.querySelector('.team-box.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
      previousSelected.classList.remove(`selected-${previousSelected.getAttribute('data-team')}`);
    }
  }
  
  function addTeamSelection(gameElement, teamSide, gameId) {
    const teamBox = gameElement.querySelector(`.team-box[data-team="${teamSide}"]`);
    if (!teamBox) {
      console.log(`Team box for ${teamSide} in game ${gameId} not found`);
      return;
    }
    
    teamBox.classList.add('selected');
    teamBox.classList.add(`selected-${teamSide}`);
    state.selectedTeams[gameId] = teamSide;
  }
  
  function updateSubmitButton() {
    try {
      // Re-initialize elements if needed
      if (!elements.submitButton) {
        if (!initializeElements()) {
          console.warn('올킬 제출 버튼을 찾을 수 없습니다.');
          return;
        }
      }
      
      // If button is still not available, exit function
      if (!elements.submitButton) {
        console.warn('올킬 제출 버튼을 초기화할 수 없습니다.');
        return;
      }
      
      const isAllSelected = Object.keys(state.selectedTeams).length === 5;
      
      // Update button attributes safely
      elements.submitButton.disabled = !isAllSelected;
      
      if (elements.submitButton.style) {
        elements.submitButton.style.opacity = isAllSelected ? '1' : '0.3';
        elements.submitButton.style.color = isAllSelected ? '#121212' : 'rgba(18, 18, 18, 0.7)';
      }
      
      console.log('Submit button updated successfully. All selected:', isAllSelected);
    } catch (error) {
      console.error('Error in updateSubmitButton:', error);
    }
  }
  
  function setupSubmitButtonListener() {
    try {
      // First make sure the button is available
      if (!elements.submitButton) {
        console.log('Submit button not available yet for listener setup');
        return false;
      }
      
      // Check if we've already set up the listener to avoid duplicates
      if (!elements.submitButton.dataset.listenerAdded) {
        elements.submitButton.addEventListener('click', function() {
          if (Object.keys(state.selectedTeams).length === 5) {
            alert('올킬 투표가 제출되었습니다!');
          }
        });
        // Mark that we've added the listener
        elements.submitButton.dataset.listenerAdded = 'true';
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
