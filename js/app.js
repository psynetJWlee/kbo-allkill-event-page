
// Global state
let state = {
  currentDay: 26,  // Default to "Today" (26)
  selectedTeams: {},
  activeTab: 'weekly'
};

// Utility function to format numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize the page when DOM is loaded
$(document).ready(function() {
  // Initialize all sections
  initEventTitleSection();
  initWinnersSection();
  initTeamSelectionSection();
  initMyPrizeSection();
  initPrizeRankingSection();
  initEventDescriptionSection();
  
  // Apply today's selected teams
  if (state.currentDay === 26) {
    state.selectedTeams = { ...defaultSelectedTeams };
    updateTeamSelections();
  }
});

// 1. Event Title Section
function initEventTitleSection() {
  const sectionHtml = `
    <img 
      src="/lovable-uploads/238a9ac4-eb4e-4505-a699-a85abc7f50c4.png" 
      alt="LIVE Score Logo"
      class="event-logo"
    />
    <img 
      src="/lovable-uploads/c80cf187-d9ab-4ccd-a210-ab2049d9a23a.png" 
      alt="KBO 올킬 이벤트"
      class="event-title"
    />
    <img 
      src="https://lh3.googleusercontent.com/fife/ALs6j_G3HVt9xvQYgZhBkRCbQiqz0ffG7vC2yH0MvcrIpLnFPVkuAOVR-WbEPFmQsgSqaNTf4AxIrOKzSWG9t4Nyx9KVtLxhRY2VY07G570I3CnIRA8NU8kBwTBmgtrb1l5Z4MWziA150T56YdCJBSMdogxTTdn3JgPmQSaRcm7LqLyqRpw25JIJ5TWsUh-439sQZ86J8P4FPTYxGpP3S0POv7m89S7A6_gRZt3ItZqa-uuyt6o99mAv012Wep88W7xxyDC6CO42WgTXr1xKD_Hdo5YJWlEB4ZIiB08zoTJG7vgid0U2RYytHG1f4QRSwO_tFdu8f37tZR7dyftQnD40Ezhom-sx1wyoYGwuKyG46VZ5rQxifw57H7emLbJ-akMbwjYr2_gJ_zDUIlhqUFDwVFvWIAx7gfCOk6_Sq0gxg8USxEXDbd3vj0GoXRZryyfBxm_gMUmLHLmNd1JXAV6KoaysGHqGC9pm6Da5I41IiOPQsfMgDEewnPh6wvDXYXTqAGeQzOIbRWSd78R2ZRixlxspVZqKWVHzRajySe3FMm3shySayVMCJGN0BeuELWGzlSLycsKnREvGaMzQ8oMeVvA8AxHeYHXYlK81rNh7wpE0BslpYnyIfS2l6M3TBof4DynpG_InROra6Yo7ZrRbrBwLaQMsPzrzuilYIW_KmL-vtjaHTdS3I9SsOh5fDTsFv7rKfgcrM1UVx5r_yheDscYDh_gWqCs_81UaFPhoI8QGOTF3AShWO2c5L48rLG_qOTlIeZbyqVgqgM6BB8hqBNwhloI3a3UInLoxVF3jUvdqK4jYjRqDl1Zt9iGL01zxr499PVY8MPneRL1qLG7ivG6UbXlcRRi-37PtpZTGRbxWX_ycicB-NdBMPBhDVdY1z8nkAui8zj_GYTYDzYTeDYOrWPI_7clPbCheHwaaIpWBrQdd512JoORAi81tLs-xCYS_4MqHluMK3SJfINWFbvsHEZUVHw1gPiYTPqSx4iGZvvTlkKH4hX8wHW65N32IL0bHl6zc3WkabYGBhCp1xu5SExOb3KxAL1pK9auUHZoDGzbS7fUqYZHTWV24TS7aS8p7q41Msfyf4bVMSzndSqhHKn3MSHnLMxVUqSSn2nWwRO0OPgjxeAWeCf1XdB6OXbcTQwZERH0KwEBxRCKDIOJ7XdTapp5_d518oIooW2dhEcVPhIKoRJSC83Er05UCyZuzoMqV1Mh612NhDzbBWjvsHnmKC1rfGx5qlAP61JkPyJPSWeu-EFvnHuMJt7wn2bbWGVV899W9sNXjbRap8opDiCTtqMzO-XrIMEAtz5gfTIRb7DbI-SnTf0hf5dumDuUW6eJ-Eh-zyyw_O1AZCleVeL3hXpPSDNn1nrGsKTbDTOT7LaCmmQg0pA67KoVHPnga9xDudjqeUyHGIKkwtjLh0tuk-9Brm40t4_JSR554LFRrAkMbk1F-gxnZjsfTaPipNWwKnTNtA_lbgcUJKMSeRGum3OvoIW52BfFQpKyiAa5ctzyUBF5XcL47jbOs6NjmpveW6h2boO2GqvrhKaGJhT41NRRN-vT7dMEx8cGI7Wjdjvng0FgP30X4GyvOADueRVgBRhggnbgONzQHOUS_=w1920-h911?auditContext=prefetch"
      alt="Event Emoticon"
      class="event-emoticon"
    />
  `;
  
  $('#event-title-section').html(sectionHtml);
  
  // Start animation
  startAnimation(document.getElementById('event-title-section'));
}

// 2. Winners Section
function initWinnersSection() {
  // Container HTML
  const sectionHtml = `
    <div class="w-full flex flex-col items-center relative">
      <img 
        src="/lovable-uploads/2b49ee10-7baf-4d97-bde0-342af5344c35.png" 
        alt="오늘의 당첨자"
        class="winners-title"
      />
      <p class="winners-count">
        총 20명
      </p>
    </div>
    <div class="member-list" id="member-list"></div>
  `;
  
  $('#winners-section').html(sectionHtml);
  
  // Render member list
  const memberListHtml = members.map(member => {
    return `
      <div class="member-card">
        <div class="member-profile">
          <img
            src="${member.profileImage || '/placeholder.svg'}"
            alt="${member.nickname} 프로필"
            class="member-avatar"
          />
          <span class="member-nickname">${member.nickname}</span>
        </div>
        <span class="member-amount">
          ${formatNumber(member.amount)}원
        </span>
      </div>
    `;
  }).join('');
  
  $('#member-list').html(memberListHtml);
}

// 3. Team Selection Section
function initTeamSelectionSection() {
  // Date Navigation
  const dateNavHtml = `
    <div class="date-navigation">
      <div class="date-nav-prev" id="date-nav-prev">
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-left"></div>
        </div>
        <span class="prev-day" id="prev-day">${state.currentDay - 1}</span>
      </div>
      <span class="current-day" id="current-day">${state.currentDay === 26 ? 'Today' : state.currentDay}</span>
      <div class="date-nav-next" id="date-nav-next">
        <span class="next-day" id="next-day">${state.currentDay + 1}</span>
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>
  `;
  
  // Container HTML
  let contentHtml = '';
  
  // Tomorrow's content (27)
  if (state.currentDay === 27) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img 
            src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div id="team-selection-submit" class="team-selection-submit">
          <button
            class="submit-btn"
            id="submit-allkill-btn"
            disabled
          >
            올킬 제출
          </button>
        </div>
      </div>
    `;
  }
  // Today's content (26)
  else if (state.currentDay === 26) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img 
            src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div id="team-selection-submit" class="team-selection-submit">
          <button
            class="submit-btn enabled"
            id="submit-allkill-btn"
          >
            <span>2경기 성공!</span>
            <span>채점 중</span>
          </button>
        </div>
      </div>
    `;
  }
  // Yesterday's content (25)
  else if (state.currentDay === 25) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
        <h2 class="team-selection-title">
          <img 
            src="/lovable-uploads/0b039722-f115-4a24-9d6f-2ad5d4ed35b7.png" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 결과
          <img 
            src="/lovable-uploads/d9b8652f-78c0-41c0-beac-1e46e4375f4f.png" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="yesterday-footer w-full flex flex-col items-center mt-[50px] mb-[50px]">
          <!-- Footer content will be added -->
        </div>
      </div>
    `;
  }
  // Placeholder for other dates
  else {
    contentHtml = `
      <div class="team-selection-placeholder" id="team-selection-placeholder">
        <div class="flex justify-center items-center h-[400px] text-white text-lg">
          이 날짜의 데이터가 없습니다.
        </div>
      </div>
    `;
  }
  
  // Combine date navigation and content
  $('#kbo-selection-container').html(dateNavHtml + contentHtml);
  
  // Render games based on currentDay
  renderGames();
  
  // Set up event handlers for date navigation
  setupDateNavigationHandlers();
}

// Render games based on current day
function renderGames() {
  if (state.currentDay === 27) {
    // Tomorrow's games
    renderTomorrowGames();
  } else if (state.currentDay === 26) {
    // Today's games
    renderTodayGames();
  } else if (state.currentDay === 25) {
    // Yesterday's games
    renderYesterdayGames();
  }
}

// Render tomorrow's games (27)
function renderTomorrowGames() {
  const gamesHtml = kboGames.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeSelected = state.selectedTeams[game.id] === 'home';
    const awaySelected = state.selectedTeams[game.id] === 'away';
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    return `
      <div class="game-item ${isAlternateBackground ? 'alternate-bg' : ''}" data-index="${game.id}" ${index === 1 ? 'id="highlighted-game"' : ''}>
        ${index === 1 ? '<div class="red-circle-container"><img class="red-circle-image" src="/lovable-uploads/a9f0ccb5-f9ae-4444-9be4-2597208cc0d7.png" alt="Red Circle"></div>' : ''}
        <div class="team-column">
          <div class="team-box ${homeSelected ? 'selected-home' : ''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="voting-text">${game.status}</div>
          <div class="game-time">${game.time}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${awaySelected ? 'selected-away' : ''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  $('#game-list').html(gamesHtml);
  
  // Setup event handlers for team selection
  setupTeamSelectionHandlers();
}

// Render today's games (26)
function renderTodayGames() {
  const gamesHtml = todayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeSelected = state.selectedTeams[game.id] === 'home';
    const awaySelected = state.selectedTeams[game.id] === 'away';
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    const homeScoreHigher = game.homeScore > game.awayScore;
    const awayScoreHigher = game.awayScore > game.homeScore;
    const scoreEqual = game.homeScore === game.awayScore;
    
    return `
      <div class="game-item ${isAlternateBackground ? 'alternate-bg' : ''}" data-index="${game.id}" ${index === 1 ? 'id="highlighted-game"' : ''}>
        ${index === 1 ? '<div class="red-circle-container"><img class="red-circle-image" src="/lovable-uploads/a9f0ccb5-f9ae-4444-9be4-2597208cc0d7.png" alt="Red Circle"></div>' : ''}
        <div class="team-column">
          <div class="team-box ${homeSelected ? 'selected-home' : ''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="score-display">
            <span class="score ${homeScoreHigher ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${awayScoreHigher ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${awaySelected ? 'selected-away' : ''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  $('#game-list').html(gamesHtml);
  
  // Setup event handlers for team selection
  setupTeamSelectionHandlers();
}

// Render yesterday's games (25)
function renderYesterdayGames() {
  const gamesHtml = yesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    return `
      <div class="match-result ${isAlternateBackground ? 'alternate-bg' : ''}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="score-display">
            <span class="score ${game.homeTeam.winner ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${game.awayTeam.winner ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  $('#yesterday-game-list').html(gamesHtml);
}

// Set up event handlers for date navigation
function setupDateNavigationHandlers() {
  $('#date-nav-prev').on('click', function() {
    state.currentDay--;
    initTeamSelectionSection();
  });
  
  $('#date-nav-next').on('click', function() {
    state.currentDay++;
    initTeamSelectionSection();
  });
  
  $('#current-day').on('click', function() {
    state.currentDay = 26; // Today
    initTeamSelectionSection();
  });
  
  $('#prev-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay - 1;
    initTeamSelectionSection();
  });
  
  $('#next-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay + 1;
    initTeamSelectionSection();
  });
}

// Set up event handlers for team selection
function setupTeamSelectionHandlers() {
  $('.team-box').on('click', function() {
    const gameId = parseInt($(this).data('game-id'));
    const team = $(this).data('team');
    
    state.selectedTeams[gameId] = team;
    updateTeamSelections();
    updateSubmitButton();
  });
}

// Update team selection UI
function updateTeamSelections() {
  Object.keys(state.selectedTeams).forEach(gameId => {
    const team = state.selectedTeams[gameId];
    
    // Remove previous selections for this game
    $(`.team-box[data-game-id="${gameId}"]`).removeClass('selected-home selected-away');
    
    // Add new selection
    $(`.team-box[data-game-id="${gameId}"][data-team="${team}"]`).addClass(`selected-${team}`);
  });
}

// Check if all teams are selected and update submit button
function updateSubmitButton() {
  const allSelected = (state.currentDay === 27) && 
                     Object.keys(state.selectedTeams).length === kboGames.length;
  
  const submitBtn = $('#submit-allkill-btn');
  if (allSelected) {
    submitBtn.addClass('enabled');
    submitBtn.prop('disabled', false);
    submitBtn.css({
      opacity: 1,
      color: '#121212'
    });
  } else {
    submitBtn.removeClass('enabled');
    submitBtn.prop('disabled', true);
    submitBtn.css({
      opacity: 0.3,
      color: 'rgba(18, 18, 18, 0.7)'
    });
  }
}

// 4. My Prize Section
function initMyPrizeSection() {
  const sectionHtml = `
    <div class="my-prize-container">
      <div class="flex flex-col items-center">
        <h2 class="my-prize-title">
          My 상금
        </h2>
      </div>
      
      <div class="prize-group">
        <div class="member-info">
          <img src="/placeholder.svg" class="user-avatar" alt="사용자" />
          <div class="user-info">
            <p class="user-nickname">${userData.nickname}</p>
            <p class="user-text">님 보유상금</p>
          </div>
        </div>
        
        <p class="prize-amount">${formatNumber(userData.totalAmount)} 원</p>
        
        <button class="request-button">
          상금 지급 신청
        </button>
      </div>
      
      <div class="prize-history">
        <div class="history-header">
          <p class="history-title">상금 획득 내역 (₩)</p>
          <p class="total-prize">누적 ${formatNumber(userData.totalAmount)}</p>
        </div>
        
        <div class="history-items" id="prize-history-items"></div>
        
        <div class="pagination">
          <div class="pagination-content">
            <div id="prev-page" class="page-item ${userData.currentPage === 1 ? 'disabled' : ''}">
              &lt;
            </div>
            
            ${Array.from({ length: userData.totalPages }, (_, i) => i + 1).map(page => `
              <div class="page-item ${userData.currentPage === page ? 'active' : ''}" data-page="${page}">
                ${page}
              </div>
            `).join('')}
            
            <div id="next-page" class="page-item ${userData.currentPage === userData.totalPages ? 'disabled' : ''}">
              &gt;
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  $('#my-prize-section').html(sectionHtml);
  
  // Render prize history
  const historyItemsHtml = prizeHistory.map(item => {
    return `
      <div class="history-item">
        <p class="history-date">${item.date}</p>
        <p class="daily-prize">${formatNumber(item.amount)}</p>
      </div>
    `;
  }).join('');
  
  $('#prize-history-items').html(historyItemsHtml);
  
  // Set up pagination handlers
  setupPaginationHandlers();
}

// Set up pagination handlers
function setupPaginationHandlers() {
  $('.page-item[data-page]').on('click', function() {
    const page = parseInt($(this).data('page'));
    handlePageChange(page);
  });
  
  $('#prev-page').on('click', function() {
    if (userData.currentPage > 1) {
      handlePageChange(userData.currentPage - 1);
    }
  });
  
  $('#next-page').on('click', function() {
    if (userData.currentPage < userData.totalPages) {
      handlePageChange(userData.currentPage + 1);
    }
  });
}

// Handle pagination page change
function handlePageChange(page) {
  userData.currentPage = page;
  initMyPrizeSection();
}

// 5. Prize Ranking Section
function initPrizeRankingSection() {
  const sectionHtml = `
    <div class="ranking-header">
      <h2 class="ranking-title">상금 랭킹</h2>
      
      <p class="my-ranking">
        내 랭킹 <span class="my-ranking-number">6위 / 5,345</span>
        <img 
          src="/lovable-uploads/46e10f18-b741-49e5-809e-500ae37ffbd7.png" 
          alt="User icon" 
          class="user-icon" 
        />
      </p>
    </div>

    <div class="ranking-tabs">
      <div class="tabs-list">
        <div id="weekly-tab" class="tab ${state.activeTab === 'weekly' ? 'active' : 'inactive'}">
          주간
        </div>
        <div id="all-tab" class="tab ${state.activeTab === 'all' ? 'active' : 'inactive'}">
          전체
        </div>
      </div>
    </div>
    <p class="date-range">3월 20일 ~ 3월 26일 기준</p>

    <ul class="ranking-list" id="ranking-list"></ul>

    <div class="ranking-note">
      * 랭킹은 매일 오전 9시에 업데이트<br/>
      * 동일한 적중 횟수일 경우 먼저 달성한 사용자가 우선 순위
    </div>
  `;
  
  $('#prize-ranking-section').html(sectionHtml);
  
  // Render ranking list
  const rankingListHtml = rankingData.map(item => {
    return `
      <li class="ranking-item ${item.isMe ? 'is-me' : ''}">
        <div class="rank-number ${item.rank <= 3 ? 'top-rank' : ''}">
          ${item.rank}
        </div>
        <img src="${item.profileImg}" alt="${item.name}의 프로필" class="profile-img" />
        <div class="ranking-info">
          <span class="ranking-nickname">${item.name}</span>
          <span class="ranking-streak">올킬 ${item.streak}회</span>
        </div>
        <div class="ranking-prize">${formatNumber(item.prize)}원</div>
      </li>
    `;
  }).join('');
  
  $('#ranking-list').html(rankingListHtml);
  
  // Set up tab change handlers
  $('#weekly-tab').on('click', function() {
    state.activeTab = 'weekly';
    $(this).addClass('active').removeClass('inactive');
    $('#all-tab').addClass('inactive').removeClass('active');
  });
  
  $('#all-tab').on('click', function() {
    state.activeTab = 'all';
    $(this).addClass('active').removeClass('inactive');
    $('#weekly-tab').addClass('inactive').removeClass('active');
  });
}

// 6. Event Description Section
function initEventDescriptionSection() {
  const sectionHtml = `
    <div class="info-header">
      <img 
        src="/lovable-uploads/d85d06bb-3146-4fad-8560-d5f095fe350a.png" 
        alt="Info icon" 
        class="info-icon"
      />
      <h3 class="info-title">상금 지급 안내</h3>
    </div>

    <ul class="info-list">
      <li class="info-item">
        누적 금액이 3만원 이상일 경우 지급신청이 가능
      </li>
      <li class="info-item">
        당첨자 세금신고를 위해 신분증 사본 제출 필요
      </li>
      <li class="info-item">
        상금지급 후 개인정보 즉시 파기
      </li>
      <li class="info-item">
        5만원 초과 시 제세공과금 (22%) 선공제 후 지급
      </li>
      <li class="info-item">
        다중계정은 당첨자 정보 확인 후 당첨 취소 될 수 있음
      </li>
      <li class="info-item">
        당첨자명과 예금주명 불일치 시 당첨금 지급 불가
      </li>
    </ul>

    <a 
      href="https://home.psynet.co.kr/livescore" 
      target="_blank" 
      rel="noopener noreferrer"
      class="download-button"
    >
      LIVE 스코어<br />다운 받기
    </a>
  `;
  
  $('#event-description-section').html(sectionHtml);
}
