
// Team Selection Section
function initTeamSelectionSection() {
  const state = window.appState;
  
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
            src="https://lh3.googleusercontent.com/fife/ALs6j_HK2f0SJmA2JUlIBbhSSAdjsoC4w6uNFcfWrSH9Z8CjfHWdbIDG3VC4f0HDpVkJKPpxLFv8BBMO7orYLIgCqYXVMB_NasqBkL7KmPwaMN6QSerMesG0VIEcgbiYPAHBLll6afmTq7BbsjYgkUj3CEtsDf0SROoI0y7OkoW3JfrWtqQH567t9OP4sPrJDdZxvFp8wHYlk2HXmG96jfKPBSAG8ru8gbuUpzk--u0-3FtnmV8D_O9BsI10rjCtRPtfhTB1kWjCG24tDtweGX84AAyexb6mQ49lndGuJMYdtmbeD5z3-KOKt3-qCNFSMUDgzOBOPMHvDh3GoS-z2wyexKoDFFiXyOP6038TOraCdg6rPNOZG6n-JR3wtYenEFnUGXkgkSD35qeEfnxa3owCSXpuKpFsr-4cov5O9KbVDWlyzNjoREg0Z1X6sKZZ-fJpWoE3xlqazBZYHcnvrUjB2-crpGcw9nDco2dNSQUb3ScWGLM51Ul4Asc_ces4BGPK9n9h92hOJIubCsiYFqOfVvT6B8cCsyqMBhfHS8xOV7U5ZLRpgH1ukJ_gv_WbAWYdYWZJ_cWX9k2z3nbvV2Blu-8UHJJu3jKMYsbqcNsoJaRF3mC-QWqDqlzf7RLuIM6TRrBdaJ_x1l0yVfjHDM1YlO0k9WoHzITs07UJQs5PXK2gIkZpq9rO9wCCknbbJm-tdvsiZ3PPeNSTUHfx5-NA1uLSjnWxMcZGej3BezY1BJZoUvzvy3eqC3Q_xe_9mJevDoijZlTIde9ynL0DiBKXMQSmlzY34Mjnlaix5YPfhq2N0YNvtlzbIWT7sc49K8biAEJis8iVqYg7bWxRvOpK4bwwuCoApixp8v0JG4ZD3yGXXLreOg10zrxVAgZVUNR0b0nmNOy7hrLpqpQ2BuHKjIOT7O8rVs3wPCuKfLEqWJIy2RHgx0kYrLelgjc_lf2sAXjlutnP1OOEYGw0VeLtHTH15kR4btjdNpxCtGDxoka3x53riYfPiyvTg6ki3wO9g493WTG0NdMFE17JUiGBWnjbnmRsI1Yb3o3pcAxhInsbv8n-4maS5G2i_ybxOnT0uxWBXDZrg-AuNr61KB52l1lyfnpUU4eVd5SrwD8uUkShY09pBSIpQ6Pkcvo-Tj5SScyQ65auZhTRhMeIuiRYM1JRnVdvEXnZE2_X392gGuOX7gF5EsKIWd7L6JAbK9KytzvcI0_v4Ap6694r_mFmZSzvNBoMRkja3RbtMkgR_1-6B5fTYueVxrKPrSKCOi8I6jqlKM0ft1mIGN31gZtNqYAo6JF1UVCRVfWOFEqevt7JImFRTid7y1ajnG_P1rgWmaiovmT1Lv6LWBPtN7o-V9DYd8_SSTRXmDIjzwVkep2oSKWCe12p-Pu0-PASNHLHUzQt1YOQbekrsgGvUMuH_yzbZnxTgSgVkobfmFRoIJjud8AsGvddY3Vrasai1TXrRZpbzOkDBRt8aHjrxuN3zMwqA55_x0UxHgsxpE6KjHMFJDzBZ7e3ZX60zroDosM7-CDtzS5HMeyUXtnvCHzPJF7D1cNqX8oe5nqLRtbBJCjWpBD4QmJe7RiUxK-NOVfpfSVRaCfx4KAbN0FKrb94eaNW=w1122-h910?auditContext=prefetch" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_EZpWrkDqiooea5KVzMwhJR0-_5mX_xooq4hl0PR9sNnrsLQ0L50QnG3nsFK4pxYgY7XMvCGPneuruQ5_Wt_IztYziYBSRfAu8OXrRnKqSRL8zDQdp9aNjhIghVzW3FQRD0tTCre_6SLBv0hh-OVu_rgjQXh9aCNNHSsucUfODaA-dpLPAnw5KO2_m3gDjUuTrJ50AovtE7zfJUdDOBxWGaIyhsS2nDw2ncOF-HeuE3ZQSct1NSXzzuoe8LtI7wrxLT_j7YeJuDK_9-5Keyg-nztdpRTYkQHtfrj0Ctpji2e3PEveVb_nZOcuOYjDIeHkntaX8uDCRxBKDOdmdS1hu3ZHQHPlWHQ2xMSll_IqjR-XtpLTqnFy9bX2Q_c1UqPeIfPbOpWgo7CNp2J_i4nDFnCf3kc3Z6ijsJhyg82JAoD2oSPCbB4xaElYtzZhCXOEpVkpl1LcGmgao09jg7gb48WQcWaWi4jk1-qT_SPHP-Q4rPdA6qvsgU4lPlSc3sq2fGaIlXvKGmLjDPJpLwXxXPonwU6iu1-OKcZs87HQBz2UqFdlK7ibeMu5c3SyrsArEPfHod9wW1lARKrHDnozB5tlWdIblusAxPH-mB-05Fh0SMoazdJdfF3D94GPFvutczuR3g8A1ZsfZx8XbY2vXtXjGdRFYPyOcCns8KZ91v4aW_MasVev5SH7QVX-m6jMGhCspwWqgpFthOUqvwqQK34-75GDFpUuZ6pGjgpQYdvZteI-hV9rt2xXBi59AvZO7LDPxwdIomgSgaX1oRyEYgjK46k04vkfHOpKYfJZBweCuWu4W17af_RPclV3awS26LtWNI98CEZzjQfzltBJCbQBQRdXkus7nci4hlNcy7ex2s25iP9i7XycJJ3Tf145UEHQIcnv5zviP71P52BVoOhFyL8GJi3l6bvPO0l914NlIncl-yRDnGLfDOALY5p_BdYwuIy5PxYzxaeEimWvS4irAZ1HlB9sujaE2UZEJkKQkv4-KbmSqu-SNrBOpushsGW4PmRwlYXaXzVSKBigziK6GMzhv8n2IeTlUEe_dnTAhY9yl8OfPMntsDRFIF1rsw9fYms0GmehVRs6gQ-zoPHbzArq5qwL6E7TuJKj_jBWAyFZg9mDn6K7ve3sQ2nDcg6LTJm7UPdk5nQsGF7LRuHtdAePk2C2L-t9DFZnwrmJp1PilFvC7wE8ZrFZrRYDG9fGwGSSoOz0F5P_TH0d5C29QgehPQo_tlS9YBsAaSnhkPrAaL8KLtb5zZhiFnDVdw_5I0ENI_yL9lAjacsMp1Dqt6S9d_YazkbWg6ClSaqVnajLbUL99Kj-a0oa8VXIEj_m0S9z_mi0ct1z39iyy5yISTuvit6oipgDl_cMGQfxwRYHaPOk_l5AGDqvvd8D5yA6pMamUiy3nWVZUzSejIK6O0Pu9Z9VIq_nAiesDlGwsLkVEXBsOVksFMnzY-ZjJxC0qy-6WDztzSkG8IkPb5gRwIoj6XX43Xz8yCGFC2N7jfJcBePCaaXIRTL4TYnWXDQmqQpM8iy0m8LMaZdIBLcq96b6_jncYZaQP2k1j8StKq38uBaduCvWE-_giUgMSuJ3T-WZBtvfIvwf3Pm7Yb=w1122-h910?auditContext=prefetch" 
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
            src="https://lh3.googleusercontent.com/fife/ALs6j_HK2f0SJmA2JUlIBbhSSAdjsoC4w6uNFcfWrSH9Z8CjfHWdbIDG3VC4f0HDpVkJKPpxLFv8BBMO7orYLIgCqYXVMB_NasqBkL7KmPwaMN6QSerMesG0VIEcgbiYPAHBLll6afmTq7BbsjYgkUj3CEtsDf0SROoI0y7OkoW3JfrWtqQH567t9OP4sPrJDdZxvFp8wHYlk2HXmG96jfKPBSAG8ru8gbuUpzk--u0-3FtnmV8D_O9BsI10rjCtRPtfhTB1kWjCG24tDtweGX84AAyexb6mQ49lndGuJMYdtmbeD5z3-KOKt3-qCNFSMUDgzOBOPMHvDh3GoS-z2wyexKoDFFiXyOP6038TOraCdg6rPNOZG6n-JR3wtYenEFnUGXkgkSD35qeEfnxa3owCSXpuKpFsr-4cov5O9KbVDWlyzNjoREg0Z1X6sKZZ-fJpWoE3xlqazBZYHcnvrUjB2-crpGcw9nDco2dNSQUb3ScWGLM51Ul4Asc_ces4BGPK9n9h92hOJIubCsiYFqOfVvT6B8cCsyqMBhfHS8xOV7U5ZLRpgH1ukJ_gv_WbAWYdYWZJ_cWX9k2z3nbvV2Blu-8UHJJu3jKMYsbqcNsoJaRF3mC-QWqDqlzf7RLuIM6TRrBdaJ_x1l0yVfjHDM1YlO0k9WoHzITs07UJQs5PXK2gIkZpq9rO9wCCknbbJm-tdvsiZ3PPeNSTUHfx5-NA1uLSjnWxMcZGej3BezY1BJZoUvzvy3eqC3Q_xe_9mJevDoijZlTIde9ynL0DiBKXMQSmlzY34Mjnlaix5YPfhq2N0YNvtlzbIWT7sc49K8biAEJis8iVqYg7bWxRvOpK4bwwuCoApixp8v0JG4ZD3yGXXLreOg10zrxVAgZVUNR0b0nmNOy7hrLpqpQ2BuHKjIOT7O8rVs3wPCuKfLEqWJIy2RHgx0kYrLelgjc_lf2sAXjlutnP1OOEYGw0VeLtHTH15kR4btjdNpxCtGDxoka3x53riYfPiyvTg6ki3wO9g493WTG0NdMFE17JUiGBWnjbnmRsI1Yb3o3pcAxhInsbv8n-4maS5G2i_ybxOnT0uxWBXDZrg-AuNr61KB52l1lyfnpUU4eVd5SrwD8uUkShY09pBSIpQ6Pkcvo-Tj5SScyQ65auZhTRhMeIuiRYM1JRnVdvEXnZE2_X392gGuOX7gF5EsKIWd7L6JAbK9KytzvcI0_v4Ap6694r_mFmZSzvNBoMRkja3RbtMkgR_1-6B5fTYueVxrKPrSKCOi8I6jqlKM0ft1mIGN31gZtNqYAo6JF1UVCRVfWOFEqevt7JImFRTid7y1ajnG_P1rgWmaiovmT1Lv6LWBPtN7o-V9DYd8_SSTRXmDIjzwVkep2oSKWCe12p-Pu0-PASNHLHUzQt1YOQbekrsgGvUMuH_yzbZnxTgSgVkobfmFRoIJjud8AsGvddY3Vrasai1TXrRZpbzOkDBRt8aHjrxuN3zMwqA55_x0UxHgsxpE6KjHMFJDzBZ7e3ZX60zroDosM7-CDtzS5HMeyUXtnvCHzPJF7D1cNqX8oe5nqLRtbBJCjWpBD4QmJe7RiUxK-NOVfpfSVRaCfx4KAbN0FKrb94eaNW=w1122-h910?auditContext=prefetch" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_EZpWrkDqiooea5KVzMwhJR0-_5mX_xooq4hl0PR9sNnrsLQ0L50QnG3nsFK4pxYgY7XMvCGPneuruQ5_Wt_IztYziYBSRfAu8OXrRnKqSRL8zDQdp9aNjhIghVzW3FQRD0tTCre_6SLBv0hh-OVu_rgjQXh9aCNNHSsucUfODaA-dpLPAnw5KO2_m3gDjUuTrJ50AovtE7zfJUdDOBxWGaIyhsS2nDw2ncOF-HeuE3ZQSct1NSXzzuoe8LtI7wrxLT_j7YeJuDK_9-5Keyg-nztdpRTYkQHtfrj0Ctpji2e3PEveVb_nZOcuOYjDIeHkntaX8uDCRxBKDOdmdS1hu3ZHQHPlWHQ2xMSll_IqjR-XtpLTqnFy9bX2Q_c1UqPeIfPbOpWgo7CNp2J_i4nDFnCf3kc3Z6ijsJhyg82JAoD2oSPCbB4xaElYtzZhCXOEpVkpl1LcGmgao09jg7gb48WQcWaWi4jk1-qT_SPHP-Q4rPdA6qvsgU4lPlSc3sq2fGaIlXvKGmLjDPJpLwXxXPonwU6iu1-OKcZs87HQBz2UqFdlK7ibeMu5c3SyrsArEPfHod9wW1lARKrHDnozB5tlWdIblusAxPH-mB-05Fh0SMoazdJdfF3D94GPFvutczuR3g8A1ZsfZx8XbY2vXtXjGdRFYPyOcCns8KZ91v4aW_MasVev5SH7QVX-m6jMGhCspwWqgpFthOUqvwqQK34-75GDFpUuZ6pGjgpQYdvZteI-hV9rt2xXBi59AvZO7LDPxwdIomgSgaX1oRyEYgjK46k04vkfHOpKYfJZBweCuWu4W17af_RPclV3awS26LtWNI98CEZzjQfzltBJCbQBQRdXkus7nci4hlNcy7ex2s25iP9i7XycJJ3Tf145UEHQIcnv5zviP71P52BVoOhFyL8GJi3l6bvPO0l914NlIncl-yRDnGLfDOALY5p_BdYwuIy5PxYzxaeEimWvS4irAZ1HlB9sujaE2UZEJkKQkv4-KbmSqu-SNrBOpushsGW4PmRwlYXaXzVSKBigziK6GMzhv8n2IeTlUEe_dnTAhY9yl8OfPMntsDRFIF1rsw9fYms0GmehVRs6gQ-zoPHbzArq5qwL6E7TuJKj_jBWAyFZg9mDn6K7ve3sQ2nDcg6LTJm7UPdk5nQsGF7LRuHtdAePk2C2L-t9DFZnwrmJp1PilFvC7wE8ZrFZrRYDG9fGwGSSoOz0F5P_TH0d5C29QgehPQo_tlS9YBsAaSnhkPrAaL8KLtb5zZhiFnDVdw_5I0ENI_yL9lAjacsMp1Dqt6S9d_YazkbWg6ClSaqVnajLbUL99Kj-a0oa8VXIEj_m0S9z_mi0ct1z39iyy5yISTuvit6oipgDl_cMGQfxwRYHaPOk_l5AGDqvvd8D5yA6pMamUiy3nWVZUzSejIK6O0Pu9Z9VIq_nAiesDlGwsLkVEXBsOVksFMnzY-ZjJxC0qy-6WDztzSkG8IkPb5gRwIoj6XX43Xz8yCGFC2N7jfJcBePCaaXIRTL4TYnWXDQmqQpM8iy0m8LMaZdIBLcq96b6_jncYZaQP2k1j8StKq38uBaduCvWE-_giUgMSuJ3T-WZBtvfIvwf3Pm7Yb=w1122-h910?auditContext=prefetch" 
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
          ...올킬 결과...
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>        
        <div id="team-selection-submit" class="team-selection-submit">
          <button id="yesterday-nav-btn" class="submit-btn enabled">
            다음 경기 도전!
          </button>
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
  const state = window.appState;
  
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
  const { formatNumber } = window.utils;
  const state = window.appState;
  
  const gamesHtml = kboGames.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeSelected = state.selectedTeams[game.id] === 'home';
    const awaySelected = state.selectedTeams[game.id] === 'away';
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    return `
      <div class="game-item ${isAlternateBackground ? 'alternate-bg' : ''}"
           data-index="${game.id}"
           ${index === 1 ? 'id="highlighted-game"' : ''}>
        
        <div class="team-column">
          <div class="team-box ${homeSelected ? 'selected-home' : ''}"
               data-game-id="${game.id}" data-team="home">
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
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
          <div class="team-box ${awaySelected ? 'selected-away' : ''}"
               data-game-id="${game.id}" data-team="away">
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
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
  const { formatNumber } = window.utils;
  const state = window.appState;
  
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
        ${index === 1 ? '<div class="red-circle-container"><img class="red-circle-image" src="https://lh3.googleusercontent.com/fife/ALs6j_HvzAxhqjA6ks4NNecsKoq5P6nR7I7Haaf-fIQcZ-UZzcLVWkFCbuSkN9eEP35B2sBF5o3KNy6Pewjn9OLZpXL1m-XR8MSJtPJMk6SgMFgcYY5fcuFrgiHJUCAAv73An68UCws-ZziPYpFgWIqDB99NeZ9hNMvamqA_tmJb5a49Xf3VWB0BPXQ3_QInYtc6P-CHuS1KEq1JKJOWlinVi9HNGO-JyRehIxM9S8oRiK_DIwnxngAF_WHRP8Z7QZ2Gi4nhuj9wFKWM9rTJVRd_AKW2T-Qrv7V5B53xWinMUQ10gqiszhGpfgd6sj7FKLj3GshsYhos56PZLpjaIeZzOzUgHZlIzoe6p5dOQU_bDIrP_ejdaMlq9jS6mQP0AjNiY0_LFCMKMWL87IMEfK04z0AasuPu11VMKCxmGDWyJGxCRp6LxO3J-X2NSKQJjio2bJjn27FCcZCRLfBhG-LKDBdybrlcXXbsQ2RaKQNZ-cb_aFsU-NqMxFscZKosShuorkwASJG65D6HZx_Sf3mqzIda6UCXGMJqRqOhgQbtGWqgXi-4ZRpBTY0-PiP2uy6UkYoYxKHFNNbY2T-c-FWJZwatjDDgwuMqBYm5Mr6LjGgPIHjNvHotCUpYB7_WYD4GvJRQwW8hhIr5Zabcbqf6dahH9xquVogTScxtvBKh0Tj_3BXs-VmPxAdTKlYWtmjuVeEXyV6Cmt9ihryHNHysDNeW4up7LdpiCw9T5cSmSRe-7cUdvA251Z168WofOW-C3Wdt5zxeTnDXcPOI_SkiiDDH6c4ZZYUlzsvLhjf__dx4n6UXUEwVBpS1euMThLlCGQp4hM4E8gNgdUdv0jO53GVOh-NKEpf6bA8PoK4CxdQboSEHgQi4xqKJIYxxzYoCxckA_FLsI-GroPg3fKjtFjw22EvdpfMBHwnyE9PIakNwMQ8dii4QNr3cH-wiO5voXslqvKW_NOzNiu9f24F19B5CiFM4HPsoslOWQlHUFw3skYfH6iE6IIPSY8add427x9nfYiXeTVxxo2koQaAflTmQkyK8tp152bYI3q-jZLwkmAbyw87Rf7Oi04xq0LGElRaMMHOuvToY3ki3tHjS0YhdwekjlPd_E1XRmRSnidkNTrPdUSC_cUjZoMAxS59GqOyXdJlpN_d3p0kUUxRtb9ZNZy_TPlDrvAaf5uLgH9O2ZYo25uvaEvBwqJvP-3IkImUS_TXbsG6ZA4U1VJmo-1cqjPCnO2KWDVXpdAF-gY3VUtowQK3xc_FBSZbo0UNGrjNuMY1H2tVjKBcTLPEip7u6TatMMknMHQyVia3Qc7TbU2Tvkxf2CbXarReV14ar1SET7SY8j0OsKAUwCMTMqqyEfJqJBjTcxNlXqbTOcd7rUG2tLi4aB3iGpm8_jdd3VP2cUd3ZRSA4DCz2D2WZcZeIGofgs0nNPwJs9kDmIkbYlZGVsm8FM9NRUnP_ApdtgFsviFGmifda5c5XrzEqXpd5k_DvJuPQorMpKdIKxxmFMyajf_skbpyz_7tHZXMc-4IYmn2z0rJDK1G8SmLKJx4ZUO_-xkoky7GU5gf85R344kLs0e3SjbvdOqnRXEITG24DVj1Pod6pTlLvs8mhjWnj=w1902-h910?auditContext=prefetch" alt="Red Circle"></div>' : ''}
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
  const { formatNumber } = window.utils;
  const state = window.appState;

  const gamesHtml = yesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes     = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes     = game.awayTeam.votes >= game.homeTeam.votes;
  // 내가 예측한 팀의 득점이 작으면 disasbled
   const selected   = state.selectedTeams[game.id]; // 'home' | 'away' | undefined
   const myScore    = selected === 'home' ? game.homeScore : game.awayScore;
   const otherScore = selected === 'home' ? game.awayScore  : game.homeScore;
   const disableCls = (selected && myScore < otherScore) ? 'disabled' : '';
    
    return `
      <div
        class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
        data-index="${game.id}"
      >
        <div class="team-column">
          <div
            class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}"
            data-game-id="${game.id}"
            data-team="home"
          >
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>

        <div class="game-status">
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>

        <div class="team-column">
          <div
            class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}"
            data-game-id="${game.id}"
            data-team="away"
          >
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
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
  const state = window.appState;
  
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
  
  $(document).off('click', '#yesterday-nav-btn')  // 중복 바인딩 방지
             .on('click', '#yesterday-nav-btn', function() {
    state.currentDay = 27;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });
}

// Set up event handlers for team selection
function setupTeamSelectionHandlers() {
  const state = window.appState;
  
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
  const state = window.appState;
  
  Object.keys(state.selectedTeams).forEach(gameId => {
    const team = state.selectedTeams[gameId];
    
    // Remove previous selections for this game
    $(`.team-box[data-game-id="${gameId}"]`).removeClass('selected-home selected-away');
    
    // Add new selection
    $(`.team-box[data-game-id="${gameId}"][data-team="${team}"]`).addClass(`selected-${team}`);
  });
}

// Check if all teams are selected and update submit button - fixed to avoid null references
function updateSubmitButton() {
  const state = window.appState;
  
  // Make sure we're on tomorrow's view
  if (state.currentDay !== 27) {
    return;
  }
  
  // Check if the button exists
  const submitBtn = $('#submit-allkill-btn');
  if (submitBtn.length === 0) {
    return;
  }
  
  const allGamesCount = kboGames ? kboGames.length : 0;
  const allSelected = Object.keys(state.selectedTeams).length === allGamesCount;
  
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

// Export the initialization functions
window.teamSelectionSection = {
  init: initTeamSelectionSection,
  updateTeamSelections
};

