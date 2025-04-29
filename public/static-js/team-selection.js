
document.addEventListener('DOMContentLoaded', function() {
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

  // KBO 팀 경기 데이터
  const kboGames = [
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
  
  // 현재 선택된 팀을 저장
  const selectedTeams = {};
  
  // 팀 선택 핸들러 함수
  function handleTeamSelect(gameId, teamSide) {
    // 이전 선택 제거
    const gameElement = document.querySelector(`.game-item[data-index="${gameId}"]`);
    if (gameElement) {
      const previousSelected = gameElement.querySelector('.team-box.selected');
      if (previousSelected) {
        previousSelected.classList.remove('selected');
        previousSelected.classList.remove(`selected-${previousSelected.getAttribute('data-team')}`);
      }
    }
    
    // 새 선택 추가
    const teamBox = gameElement.querySelector(`.team-box[data-team="${teamSide}"]`);
    if (teamBox) {
      teamBox.classList.add('selected');
      teamBox.classList.add(`selected-${teamSide}`);
      selectedTeams[gameId] = teamSide;
    }
    
    // 제출 버튼 상태 업데이트
    updateSubmitButton();
  }
  
  // 제출 버튼 상태 업데이트 함수
  function updateSubmitButton() {
    const submitButton = document.getElementById('submit-allkill-btn');
    const isAllSelected = Object.keys(selectedTeams).length === 5;
    
    if (isAllSelected) {
      submitButton.classList.add('enabled');
      submitButton.disabled = false;
    } else {
      submitButton.classList.remove('enabled');
      submitButton.disabled = true;
    }
  }
  
  // 초기 게임 목록 렌더링
  function renderGameList() {
    const gameListElement = document.getElementById('game-list');
    if (!gameListElement) return;
    
    kboGames.forEach(game => {
      const gameItemElement = document.createElement('div');
      gameItemElement.className = 'game-item';
      gameItemElement.setAttribute('data-index', game.id);
      
      // Home Team Column
      const homeTeamColumn = document.createElement('div');
      homeTeamColumn.className = 'team-column';
      
      const homeTeamBox = document.createElement('button');
      homeTeamBox.className = 'team-box';
      homeTeamBox.setAttribute('data-team', 'home');
      homeTeamBox.innerHTML = `
        <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고">
        <span class="team-name">${game.homeTeam.name}</span>
      `;
      homeTeamBox.addEventListener('click', () => handleTeamSelect(game.id, 'home'));
      
      const homeVoteCount = document.createElement('div');
      homeVoteCount.className = `vote-count ${game.homeTeam.votes >= game.awayTeam.votes ? 'higher' : 'lower'}`;
      homeVoteCount.textContent = game.homeTeam.votes.toLocaleString();
      
      homeTeamColumn.appendChild(homeTeamBox);
      homeTeamColumn.appendChild(homeVoteCount);
      
      // Game Status Column
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
      
      // Away Team Column
      const awayTeamColumn = document.createElement('div');
      awayTeamColumn.className = 'team-column';
      
      const awayTeamBox = document.createElement('button');
      awayTeamBox.className = 'team-box';
      awayTeamBox.setAttribute('data-team', 'away');
      awayTeamBox.innerHTML = `
        <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name} 로고">
        <span class="team-name">${game.awayTeam.name}</span>
      `;
      awayTeamBox.addEventListener('click', () => handleTeamSelect(game.id, 'away'));
      
      const awayVoteCount = document.createElement('div');
      awayVoteCount.className = `vote-count ${game.awayTeam.votes >= game.homeTeam.votes ? 'higher' : 'lower'}`;
      awayVoteCount.textContent = game.awayTeam.votes.toLocaleString();
      
      awayTeamColumn.appendChild(awayTeamBox);
      awayTeamColumn.appendChild(awayVoteCount);
      
      // Append all columns to the game item
      gameItemElement.appendChild(homeTeamColumn);
      gameItemElement.appendChild(gameStatus);
      gameItemElement.appendChild(awayTeamColumn);
      
      // Append game item to the game list
      gameListElement.appendChild(gameItemElement);
    });
    
    // Add submit button
    const submitButton = document.getElementById('submit-allkill-btn');
    submitButton.addEventListener('click', function() {
      if (Object.keys(selectedTeams).length === 5) {
        alert('올킬 투표가 제출되었습니다!');
      }
    });
  }
  
  // 날짜 네비게이션 초기화
  function initDateNavigation() {
    const prevDateBtn = document.querySelector('.date-nav-prev');
    const nextDateBtn = document.querySelector('.date-nav-next');
    let currentDay = 26; // 현재 날짜 설정
    const REAL_TODAY = 26; // 실제 오늘 날짜
    
    if (prevDateBtn && nextDateBtn) {
      prevDateBtn.addEventListener('click', function() {
        currentDay--;
        updateDateDisplay(currentDay, REAL_TODAY);
      });
      
      nextDateBtn.addEventListener('click', function() {
        currentDay++;
        updateDateDisplay(currentDay, REAL_TODAY);
      });
    }
  }
  
  function updateDateDisplay(day, realToday) {
    const currentDayElement = document.getElementById('current-day');
    const prevDayElement = document.getElementById('prev-day');
    const nextDayElement = document.getElementById('next-day');
    
    if (currentDayElement) {
      currentDayElement.textContent = day === realToday ? 'Today' : day;
    }
    
    if (prevDayElement) {
      prevDayElement.textContent = day - 1;
    }
    
    if (nextDayElement) {
      nextDayElement.textContent = day + 1;
    }
  }
  
  // 초기화 함수 실행
  renderGameList();
  initDateNavigation();
  updateSubmitButton();
});
