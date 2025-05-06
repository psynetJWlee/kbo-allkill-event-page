
// DOM Manager module for DOM manipulations
const DOMManager = (function() {
  // Import dependencies
  const { elements } = DOMElements;
  const { state } = TeamSelectionCore;
  const { gameData } = DataManager;
  
  // Initialize elements
  function initializeElements() {
    // Get game list elements with the correct IDs
    elements.gameList = document.getElementById('game-list-today');
    elements.yesterdayList = document.getElementById('game-list-yesterday');
    
    if (!elements.gameList) {
      console.warn('Game list today element not found');
      return false;
    }
    
    if (!elements.yesterdayList) {
      console.warn('Game list yesterday element not found');
      // Not critical, so continue
    }
    
    // Set the button reference
    elements.submitButton = document.getElementById('submit-allkill-btn');
    if (!elements.submitButton) {
      console.warn('Submit button element not found');
      return false;
    }
    
    // Get the team selection section
    elements.teamSelectionSection = document.getElementById('section-today');
    if (!elements.teamSelectionSection) {
      console.warn('Team selection section not found');
      return false;
    }
    
    // Get the team selection placeholder
    elements.teamSelectionPlaceholder = document.getElementById('section-placeholder');
    if (!elements.teamSelectionPlaceholder) {
      console.warn('Team selection placeholder not found');
      return false;
    }
    
    // Get the yesterday state section
    elements.stateYesterday = document.getElementById('section-yesterday');
    if (!elements.stateYesterday) {
      console.warn('Yesterday state section not found');
      return false;
    }
    
    // Mark as ready
    state.domReady = true;
    return true;
  }
  
  // Update submit button
  function updateSubmitButton() {
    // Always check for null before accessing properties
    const submitBtn = document.getElementById('submit-allkill-btn');
    if (!submitBtn) {
      console.warn('[updateSubmitButton] submit-allkill-btn 요소를 찾을 수 없습니다.');
      return;
    }
    
    // Get all matches and verify they exist
    const matches = document.querySelectorAll('.match');
    if (!matches || matches.length === 0) {
      console.warn('[팀 선택] .match 컨테이너를 찾을 수 없습니다.');
      return;
    }
    
    // Check if all matches have a selected option
    const allSelected = Array.from(matches).every(match =>
      !!match.querySelector('input[type="radio"]:checked')
    );
    
    // Use direct style manipulation instead of classList to avoid null errors
    if (submitBtn.classList) {
      submitBtn.classList.toggle('opacity-100', allSelected);
    }
    
    submitBtn.disabled = !allSelected;
    submitBtn.style.opacity = allSelected ? '1' : '0.3';
    submitBtn.style.color = allSelected ? '#121212' : 'rgba(18, 18, 18, 0.7)';
    
    console.log('Submit button updated. All selected:', allSelected);
  }
  
  // Toggle sections based on the day
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
      // Today: Show team selection section
      elements.teamSelectionSection.style.display = 'block';
      console.log('Showing team selection section (Today)');
    } else if (day === state.yesterdayDay) {
      // Yesterday: Show yesterday state
      elements.stateYesterday.style.display = 'block';
      console.log('Showing yesterday state section');
    } else if (day > state.realToday) {
      // Future: Show team selection section (for future days)
      elements.teamSelectionSection.style.display = 'block';
      console.log('Showing team selection section (Future)');
    } else {
      // Past before yesterday: Show placeholder
      elements.teamSelectionPlaceholder.style.display = 'block';
      console.log('Showing team selection placeholder (Past)');
    }
  }
  
  // Function to render today's games
  function renderTodayGames() {
    if (!elements.gameList) {
      console.warn('Cannot render today games: game list element not found');
      return;
    }
    
    let html = '';
    gameData.forEach((game, index) => {
      // Generate game HTML
      html += `
        <div class="game-item match" data-index="${game.id}">
          <!-- Game content -->
        </div>
      `;
    });
    
    elements.gameList.innerHTML = html;
    console.log('Today games rendered');
  }
  
  // Function to render yesterday's results
  function renderYesterdayResults() {
    if (!elements.yesterdayList) {
      console.warn('Cannot render yesterday results: yesterday game list element not found');
      return;
    }
    
    let html = '';
    gameData.forEach((game, index) => {
      // Generate yesterday results HTML
      html += `
        <div class="game-item result" data-index="${game.id}">
          <!-- Result content -->
        </div>
      `;
    });
    
    elements.yesterdayList.innerHTML = html;
    console.log('Yesterday results rendered');
  }
  
  // Update date display
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
  
  // Public API
  return {
    initializeElements,
    updateSubmitButton,
    toggleSections,
    renderTodayGames,
    renderYesterdayResults,
    updateDateDisplay
  };
})();
