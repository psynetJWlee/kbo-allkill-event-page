
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Vanilla team selection script loaded');
  
  // Team data
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
  
  // Game data for today
  const todayGames = [
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
  
  // Yesterday's game results
  const yesterdayGames = [
    {
      id: 0,
      homeTeam: { name: "KT", logo: teamLogos.KT, score: 11, winner: true },
      awayTeam: { name: "LG", logo: teamLogos.LG, score: 5, winner: false },
      status: "종료",
      correct: true
    },
    {
      id: 1,
      homeTeam: { name: "한화", logo: teamLogos["한화"], score: 7, winner: true },
      awayTeam: { name: "NC", logo: teamLogos.NC, score: 2, winner: false },
      status: "종료",
      correct: true
    },
    {
      id: 2,
      homeTeam: { name: "두산", logo: teamLogos["두산"], score: 3, winner: false },
      awayTeam: { name: "삼성", logo: teamLogos["삼성"], score: 9, winner: true },
      status: "종료",
      correct: true
    },
    {
      id: 3,
      homeTeam: { name: "KIA", logo: teamLogos.KIA, score: 8, winner: true },
      awayTeam: { name: "SSG", logo: teamLogos.SSG, score: 4, winner: false },
      status: "종료",
      correct: true
    },
    {
      id: 4,
      homeTeam: { name: "키움", logo: teamLogos["키움"], score: 5, winner: false },
      awayTeam: { name: "롯데", logo: teamLogos["롯데"], score: 10, winner: true },
      status: "종료",
      correct: true
    }
  ];
  
  // Reference to HTML elements
  const sectToday = document.getElementById('section-today');
  const sectYesterday = document.getElementById('section-yesterday');
  const sectPlaceholder = document.getElementById('section-placeholder');
  const gameListToday = document.getElementById('game-list-today');
  const gameListYesterday = document.getElementById('game-list-yesterday');
  const navPrev = document.getElementById('nav-prev');
  const navToday = document.getElementById('nav-today');
  const navNext = document.getElementById('nav-next');
  const btnToday = document.getElementById('btn-today');
  const btnYesterday = document.getElementById('btn-yesterday');
  
  // Check if elements are found
  if (!sectToday) {
    console.warn('Element #section-today not found');
    return;
  }
  if (!sectYesterday) {
    console.warn('Element #section-yesterday not found');
    return;
  }
  if (!sectPlaceholder) {
    console.warn('Element #section-placeholder not found');
    return;
  }
  if (!gameListToday) {
    console.warn('Element #game-list-today not found');
    return;
  }
  if (!gameListYesterday) {
    console.warn('Element #game-list-yesterday not found');
    return;
  }
  if (!navPrev) {
    console.warn('Element #nav-prev not found');
    return;
  }
  if (!navToday) {
    console.warn('Element #nav-today not found');
    return;
  }
  if (!navNext) {
    console.warn('Element #nav-next not found');
    return;
  }
  if (!btnToday) {
    console.warn('Element #btn-today not found');
    return;
  }
  if (!btnYesterday) {
    console.warn('Element #btn-yesterday not found');
    return;
  }
  
  // Track selected teams
  const selectedTeams = {};
  
  // Initialize the page
  function init() {
    // Render today's games
    renderTodayGames();
    
    // Render yesterday's games
    renderYesterdayGames();
    
    // Setup navigation
    setupNavigation();
    
    // Setup button actions
    setupButtons();
    
    // Update button state
    updateTodayButtonState();
  }
  
  // Render today's games
  function renderTodayGames() {
    if (!gameListToday) {
      console.warn('gameListToday is null, cannot render today games');
      return;
    }
    
    gameListToday.innerHTML = '';
    
    todayGames.forEach((game, index) => {
      const isAlternateBg = index % 2 === 1;
      const homeVotesHigher = game.homeTeam.votes > game.awayTeam.votes;
      const awayVotesHigher = game.awayTeam.votes > game.homeTeam.votes;
      
      const gameItem = document.createElement('div');
      gameItem.className = `game-item match ${isAlternateBg ? 'alternate-bg' : ''}`;
      gameItem.dataset.gameId = game.id;
      
      gameItem.innerHTML = `
        <div class="team-column home">
          <div class="team-box" data-team="home" data-game-id="${game.id}">
            <img src="${game.homeTeam.logo}" alt="${game.homeTeam.name}" class="team-logo">
            <div class="team-name">${game.homeTeam.name}</div>
          </div>
          <div class="vote-count ${homeVotesHigher ? 'higher' : 'lower'}">${game.homeTeam.votes.toLocaleString()}</div>
        </div>
        
        <div class="game-status">
          <div class="voting-text">투표율</div>
          <div class="game-time">${game.time}</div>
        </div>
        
        <div class="team-column away">
          <div class="team-box" data-team="away" data-game-id="${game.id}">
            <img src="${game.awayTeam.logo}" alt="${game.awayTeam.name}" class="team-logo">
            <div class="team-name">${game.awayTeam.name}</div>
          </div>
          <div class="vote-count ${awayVotesHigher ? 'higher' : 'lower'}">${game.awayTeam.votes.toLocaleString()}</div>
        </div>
      `;
      
      // Add to game list
      gameListToday.appendChild(gameItem);
      
      // Add click event to team boxes
      const teamBoxes = gameItem.querySelectorAll('.team-box');
      if (teamBoxes && teamBoxes.length > 0) {
        teamBoxes.forEach(box => {
          box.addEventListener('click', handleTeamSelect);
        });
      }
    });
  }
  
  // Render yesterday's games
  function renderYesterdayGames() {
    if (!gameListYesterday) {
      console.warn('gameListYesterday is null, cannot render yesterday games');
      return;
    }
    
    gameListYesterday.innerHTML = '';
    
    yesterdayGames.forEach((game, index) => {
      const isAlternateBg = index % 2 === 1;
      
      const matchResult = document.createElement('div');
      matchResult.className = `match-result ${isAlternateBg ? 'alternate-bg' : ''}`;
      matchResult.dataset.gameId = game.id;
      
      matchResult.innerHTML = `
        <div class="team-column home">
          <img src="${game.homeTeam.logo}" alt="${game.homeTeam.name}" class="team-logo">
          <div class="team-name">${game.homeTeam.name}</div>
        </div>
        
        <div class="score-line">
          <div class="score home ${game.homeTeam.winner ? 'winner' : ''}">${game.homeTeam.score}</div>
          <div class="vs">:</div>
          <div class="score away ${game.awayTeam.winner ? 'winner' : ''}">${game.awayTeam.score}</div>
          <div class="match-status">${game.status}</div>
        </div>
        
        <div class="team-column away">
          <img src="${game.awayTeam.logo}" alt="${game.awayTeam.name}" class="team-logo">
          <div class="team-name">${game.awayTeam.name}</div>
        </div>
        
        ${game.correct ? '<img src="/public/lovable-uploads/c80cf187-d9ab-4ccd-a210-ab2049d9a23a.png" alt="Correct" class="correct-circle">' : ''}
      `;
      
      // Add to game list
      gameListYesterday.appendChild(matchResult);
    });
    
    // Set the stamp image
    const stampImage = document.querySelector('#section-yesterday img[alt="도장"]');
    if (stampImage) {
      stampImage.src = "/public/lovable-uploads/c80cf187-d9ab-4ccd-a210-ab2049d9a23a.png";
    }
  }
  
  // Handle team selection
  function handleTeamSelect(event) {
    const teamBox = event.currentTarget;
    if (!teamBox) {
      console.warn('Team box element is null');
      return;
    }
    
    const gameId = parseInt(teamBox.dataset.gameId);
    const team = teamBox.dataset.team;
    
    // Clear previous selection for this game
    const gameItem = document.querySelector(`.game-item[data-game-id="${gameId}"]`);
    if (gameItem) {
      const teamBoxes = gameItem.querySelectorAll('.team-box');
      if (teamBoxes && teamBoxes.length > 0) {
        teamBoxes.forEach(box => {
          box.classList.remove('selected-home', 'selected-away');
        });
      }
    }
    
    // Add selection class
    teamBox.classList.add(team === 'home' ? 'selected-home' : 'selected-away');
    
    // Update selected teams
    selectedTeams[gameId] = team;
    
    // Update button state
    updateTodayButtonState();
  }
  
  // Setup navigation
  function setupNavigation() {
    if (navPrev) {
      navPrev.addEventListener('click', function() {
        if (sectToday) sectToday.style.display = 'none';
        if (sectYesterday) sectYesterday.style.display = 'flex';
        if (sectPlaceholder) sectPlaceholder.style.display = 'none';
      });
    }
    
    if (navToday) {
      navToday.addEventListener('click', function() {
        if (sectToday) sectToday.style.display = 'flex';
        if (sectYesterday) sectYesterday.style.display = 'none';
        if (sectPlaceholder) sectPlaceholder.style.display = 'none';
      });
    }
    
    if (navNext) {
      navNext.addEventListener('click', function() {
        if (sectToday) sectToday.style.display = 'none';
        if (sectYesterday) sectYesterday.style.display = 'none';
        if (sectPlaceholder) sectPlaceholder.style.display = 'block';
      });
    }
  }
  
  // Setup buttons
  function setupButtons() {
    if (btnToday) {
      btnToday.addEventListener('click', function() {
        if (Object.keys(selectedTeams).length === 5) {
          if (sectToday) sectToday.style.display = 'none';
          if (sectYesterday) sectYesterday.style.display = 'flex';
          if (sectPlaceholder) sectPlaceholder.style.display = 'none';
          
          alert('올킬 투표가 제출되었습니다!');
        }
      });
    }
    
    if (btnYesterday) {
      btnYesterday.addEventListener('click', function() {
        alert('어제 올킬 성공!');
      });
    }
  }
  
  // Update today button state
  function updateTodayButtonState() {
    if (!btnToday) {
      console.warn('btnToday is null, cannot update button state');
      return;
    }
    
    const isAllSelected = Object.keys(selectedTeams).length === 5;
    
    btnToday.disabled = !isAllSelected;
    btnToday.style.opacity = isAllSelected ? '1' : '0.3';
    btnToday.style.color = isAllSelected ? '#121212' : 'rgba(18, 18, 18, 0.7)';
  }
  
  // Initialize
  init();
});
