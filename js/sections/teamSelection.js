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
            src="https://lh3.googleusercontent.com/fife/ALs6j_FUv-qzayZ-hYSelKqB62YE0QJC6b3Co7TMQRKy6wzcvxhjpnbBIYUyB8zzMwICDTQtLb62Mfqbtcv6XmET7jvII8jvXwKYUQf5iFbc6Y9b6PjXWaCXtqQmw5KlcpvmlG1HhCa-MqgVChCvuu_tAlqWmwqNdPUdGcOHlyCKVHKaSr_NAD2IBU90iWoDd7nBZAsyyiTzBkUwyOYZr2RMlvxKutr_J0-JxHXLPz6itnJLQx06HXJfqsnKZ8H--Nz0Ia4ISpaVeRZTOu34nHw6EX9mMQ2mGiuojbjcrt1F5xhhIqFlqSfgaC6FjpMZL_7GFgplUwe9WGx8FH-Asob2yaUApoAVcOhpysOSp8PkZ-1fBagky3jKFmP8pM17ZU_5aPLzGyicZwccaXqZkyg0ZmIEM_YS7M6c9uj40bmNgWbXALH6T5hC8QlTTRoSryTtyEKbVMf3ilTqNmhF7NdZjU0hEyegCIpNCdjJR3q3NUClqxIlN4ECqIgItOJEUKsPPyxTF7VCevWcvwUjgHh4Hvt3oYS-B4aWDKsBMH4rq8HrqrF9bcXniVv_UUz1-gzV6_1ablX_T6vIHdMxEgY4mQ9pM09vGeZSSxRgvVMT4-WMw6YCP1zTkJ2Y5YQi8-zQNr22jnswUhdJk-XRZtw0YxwMVM-H_l5rRzHfZ_Z2El3nrBBIm_W0PdzbLz3Zx5rpBKG4-VLKqMA6pGWItBGLk4XGqwTuCKZKXOYDWNlWLdPDFO0aG6kDd_soboTLIxDS1Y1OdmEQLHXf9ohL7_rfE99So7AV60aUASW2VAQrsjzGarAyUNlU51CJ3FISVW87Gd8F00rFiMhc5FiEgnlvGKB_y6w9T9EosOI-WmrHtDi-9s7CL77O95VvJibEB_m3DvEpCz5OO2D2nkSQ4pYKmoQJ5Bmffr2zgDxI70KhVB_yOI7sf-DxQAALHLQA7-SW4HT05RGmBQL9LaWxY3WQAoGpvV4ZWu8XFb0FoNFEffIKFBPf6jD8T0dxO_493fr41RC0Ggb_IIXL0NNmVl78oNAtXjYsKA37DRYmIglhKDjifVXkUWIzLyorvjasLCZYMMU-Dpk0lykVp6Kl2j2P4GXhnAjWsnZ5axtFU70ONnC2w0H4woyrEcAjL9sHKjxm3dneOgtYKxLTlH3aXgKqtN6bF910o36D4zf4qEVuCBYZZxM8KLiAHSJDMADHGsM4wyKeqbXsTnkDSBrhGJMDPE9wuXvnvzM8qN2bC7kI0EwgZYU3c5mVxzXTTMY7urOoNv4DkvulNR952yFPt9OukOQ1khiQejnR0tgOHUc7lv276c_KrNlUR0rYu7yh0V_Yfi_MqX-SldMXDkOqNEoBSoTV3IcRIMe5EuSeFDbrl-9TWpiVQ_opL_clGYRh9mlmvnqdmUN17o3iiVUwMo9q9fhPSRsC-RBVEh6glAjaU8SRx4swTyNE2_tGawiWdnlxqko91e6U5pCH6Fs-81n3pKODbNGMK7ADtImhV73WqMvjN1_VKu2i4hwUOYOJsbhsYcGf8rjusgm5dqvqvgyNMrQG8rYSPE7oFMQz3HEG_pMERHPVc8VpT9RmY8AOzMcDZ0sRmgII-F653YZxumhoeO9Z=w1920-h911?auditContext=prefetch" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_ECFy69Sdqf5JwxTQB5o7WDkTuXRRIEvPFebie5nIAgqLmQe5R6WHaI6xzocXPJlSWLxSB6FTNB0eDe1FFjXMT6Guu-Z6V1Tk6APmqbKw0gw6Ze3wQAwgyGzvpsjJNorzpbrsbE4PLUgAsf6qlT9psBPiMggUot6wuIcW_VLxF1A9yX-ztZuC4WX1_j9qZJ_a5HGC0381G3i_bg5USY75zd7tzHZX6btC0bC4svChsQ_zsDZhFLPVSdNQBj9SS3wopEDjntAFLQ4N2wLCAeWVvKNpDLhjq9arzjF4vki4XwvaBADb1F62UMMPiKvQ2AABtWYtjFltE-GyYLUK3bn_3Nk-Zx_BhDpBuBrV_q4E8PTEEeCx1qUhmckj5I_r-f1uc__MWxqCSgzESZovT5NZzCXdX2gbNyBPo46nzjjnh7wTM5C3F7M9ZrpCWi77ArKBj82f-1vDth9hasGj5Gczbt-2URFQr2cvuZ3gnlMf9LaSp8APTyZBI5rF0iE-MS7-uPZrScdya0jKlml8nlqDXR6I8I59BRinTio6LOyOXfrnbNjHmxYYLkWlSIov9RNyotXwGMg8Lx6ILk0UCyedQEongt5VYKHU0QxV9iKPEJGtmQwe0aAyeNlJlt15eOIPBw3T1TVbVF_HBS30VHDz4UEKFko-ZZQCSNKSH760S7tBG5FV4tjH99uIbOUMKvFnxBTe9cm14cLFtmxB6Urf3AhV6YhdG4jWP7SKY3MFHoyl0Ywy8Zg0vzkfpix5vkmdp9Po7rTCtxhuBV1i6n4tScx9vs3i1XH-f5h8YFPCROS8YyNF08opaju9l9Sc6dhle1m7WYzvvufc2R0vgzxvVG_gzJb5Hb6qW7FWu0bdXsS6koQs4SUU9Q1QetwzbXR2OhESVaZpkZM-hq1M6Y6yZotyW4f-KpIxynlYudADkKAht7Xr6sGKLllHe5YF2sGKv24CgHJYuNlG7CQb97Kk3FONdX7IGaaZkbyQ8-4gDW_J2xrOQ8Aiq8SBA6zWsn-WQxai93bODtSWQ5zChVNXD6jjDTyZRVWRZJhXvNPOXB9ot3RLIPnO9CHv9uDWyifNX5AaahplCAMgh0WIAJal5Z_YwqPcTSRDPs2aw2eWK38BZNbBdF1zUFW8nP_9bS2ZF7X57xCtxL29rajX7T5_08YMhJygVWCm8e75GdBzrDGMybWDvBxAOlVt1cQf2-pxADz8Ai7p4ODhOyHmkj_dRjZBZzFeOoVqGykAJht6ZeKxlnHAUxiaF7NaD-yeJOOen-H9Hst3CB3Rr_Fjht6ZSvn8BMsCHIJosUilD5TfGjv81M_hBWXJbVstMat6R0NsqwklHLKhQqZnN1C_7kcZHrCdrqpZrBn0zZo8iKnn01sAvns1QkHMOJlOBhIkWylWFp2J_iQy1Y8yeT68diwKfG7tGKGJ4vnS2bf1WCvVlaM_4SVWf0Z2Ex88dynmpco3XT44xLt_xZqgn2xuhOtnDHpavNLLHSaa75tuBxJmLE0FOz_5qH3EyEypIEGS6kvyAOsu4svRsCeoksMCwJnKxoAJJLRYpvVEjznuamseNx0fE23JaatYBfE1sEWK1PSOHUqavofrKtqwfftoRo6yI=w1252-h911?auditContext=prefetch" 
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
            src="https://lh3.googleusercontent.com/fife/ALs6j_FUv-qzayZ-hYSelKqB62YE0QJC6b3Co7TMQRKy6wzcvxhjpnbBIYUyB8zzMwICDTQtLb62Mfqbtcv6XmET7jvII8jvXwKYUQf5iFbc6Y9b6PjXWaCXtqQmw5KlcpvmlG1HhCa-MqgVChCvuu_tAlqWmwqNdPUdGcOHlyCKVHKaSr_NAD2IBU90iWoDd7nBZAsyyiTzBkUwyOYZr2RMlvxKutr_J0-JxHXLPz6itnJLQx06HXJfqsnKZ8H--Nz0Ia4ISpaVeRZTOu34nHw6EX9mMQ2mGiuojbjcrt1F5xhhIqFlqSfgaC6FjpMZL_7GFgplUwe9WGx8FH-Asob2yaUApoAVcOhpysOSp8PkZ-1fBagky3jKFmP8pM17ZU_5aPLzGyicZwccaXqZkyg0ZmIEM_YS7M6c9uj40bmNgWbXALH6T5hC8QlTTRoSryTtyEKbVMf3ilTqNmhF7NdZjU0hEyegCIpNCdjJR3q3NUClqxIlN4ECqIgItOJEUKsPPyxTF7VCevWcvwUjgHh4Hvt3oYS-B4aWDKsBMH4rq8HrqrF9bcXniVv_UUz1-gzV6_1ablX_T6vIHdMxEgY4mQ9pM09vGeZSSxRgvVMT4-WMw6YCP1zTkJ2Y5YQi8-zQNr22jnswUhdJk-XRZtw0YxwMVM-H_l5rRzHfZ_Z2El3nrBBIm_W0PdzbLz3Zx5rpBKG4-VLKqMA6pGWItBGLk4XGqwTuCKZKXOYDWNlWLdPDFO0aG6kDd_soboTLIxDS1Y1OdmEQLHXf9ohL7_rfE99So7AV60aUASW2VAQrsjzGarAyUNlU51CJ3FISVW87Gd8F00rFiMhc5FiEgnlvGKB_y6w9T9EosOI-WmrHtDi-9s7CL77O95VvJibEB_m3DvEpCz5OO2D2nkSQ4pYKmoQJ5Bmffr2zgDxI70KhVB_yOI7sf-DxQAALHLQA7-SW4HT05RGmBQL9LaWxY3WQAoGpvV4ZWu8XFb0FoNFEffIKFBPf6jD8T0dxO_493fr41RC0Ggb_IIXL0NNmVl78oNAtXjYsKA37DRYmIglhKDjifVXkUWIzLyorvjasLCZYMMU-Dpk0lykVp6Kl2j2P4GXhnAjWsnZ5axtFU70ONnC2w0H4woyrEcAjL9sHKjxm3dneOgtYKxLTlH3aXgKqtN6bF910o36D4zf4qEVuCBYZZxM8KLiAHSJDMADHGsM4wyKeqbXsTnkDSBrhGJMDPE9wuXvnvzM8qN2bC7kI0EwgZYU3c5mVxzXTTMY7urOoNv4DkvulNR952yFPt9OukOQ1khiQejnR0tgOHUc7lv276c_KrNlUR0rYu7yh0V_Yfi_MqX-SldMXDkOqNEoBSoTV3IcRIMe5EuSeFDbrl-9TWpiVQ_opL_clGYRh9mlmvnqdmUN17o3iiVUwMo9q9fhPSRsC-RBVEh6glAjaU8SRx4swTyNE2_tGawiWdnlxqko91e6U5pCH6Fs-81n3pKODbNGMK7ADtImhV73WqMvjN1_VKu2i4hwUOYOJsbhsYcGf8rjusgm5dqvqvgyNMrQG8rYSPE7oFMQz3HEG_pMERHPVc8VpT9RmY8AOzMcDZ0sRmgII-F653YZxumhoeO9Z=w1920-h911?auditContext=prefetch" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_ECFy69Sdqf5JwxTQB5o7WDkTuXRRIEvPFebie5nIAgqLmQe5R6WHaI6xzocXPJlSWLxSB6FTNB0eDe1FFjXMT6Guu-Z6V1Tk6APmqbKw0gw6Ze3wQAwgyGzvpsjJNorzpbrsbE4PLUgAsf6qlT9psBPiMggUot6wuIcW_VLxF1A9yX-ztZuC4WX1_j9qZJ_a5HGC0381G3i_bg5USY75zd7tzHZX6btC0bC4svChsQ_zsDZhFLPVSdNQBj9SS3wopEDjntAFLQ4N2wLCAeWVvKNpDLhjq9arzjF4vki4XwvaBADb1F62UMMPiKvQ2AABtWYtjFltE-GyYLUK3bn_3Nk-Zx_BhDpBuBrV_q4E8PTEEeCx1qUhmckj5I_r-f1uc__MWxqCSgzESZovT5NZzCXdX2gbNyBPo46nzjjnh7wTM5C3F7M9ZrpCWi77ArKBj82f-1vDth9hasGj5Gczbt-2URFQr2cvuZ3gnlMf9LaSp8APTyZBI5rF0iE-MS7-uPZrScdya0jKlml8nlqDXR6I8I59BRinTio6LOyOXfrnbNjHmxYYLkWlSIov9RNyotXwGMg8Lx6ILk0UCyedQEongt5VYKHU0QxV9iKPEJGtmQwe0aAyeNlJlt15eOIPBw3T1TVbVF_HBS30VHDz4UEKFko-ZZQCSNKSH760S7tBG5FV4tjH99uIbOUMKvFnxBTe9cm14cLFtmxB6Urf3AhV6YhdG4jWP7SKY3MFHoyl0Ywy8Zg0vzkfpix5vkmdp9Po7rTCtxhuBV1i6n4tScx9vs3i1XH-f5h8YFPCROS8YyNF08opaju9l9Sc6dhle1m7WYzvvufc2R0vgzxvVG_gzJb5Hb6qW7FWu0bdXsS6koQs4SUU9Q1QetwzbXR2OhESVaZpkZM-hq1M6Y6yZotyW4f-KpIxynlYudADkKAht7Xr6sGKLllHe5YF2sGKv24CgHJYuNlG7CQb97Kk3FONdX7IGaaZkbyQ8-4gDW_J2xrOQ8Aiq8SBA6zWsn-WQxai93bODtSWQ5zChVNXD6jjDTyZRVWRZJhXvNPOXB9ot3RLIPnO9CHv9uDWyifNX5AaahplCAMgh0WIAJal5Z_YwqPcTSRDPs2aw2eWK38BZNbBdF1zUFW8nP_9bS2ZF7X57xCtxL29rajX7T5_08YMhJygVWCm8e75GdBzrDGMybWDvBxAOlVt1cQf2-pxADz8Ai7p4ODhOyHmkj_dRjZBZzFeOoVqGykAJht6ZeKxlnHAUxiaF7NaD-yeJOOen-H9Hst3CB3Rr_Fjht6ZSvn8BMsCHIJosUilD5TfGjv81M_hBWXJbVstMat6R0NsqwklHLKhQqZnN1C_7kcZHrCdrqpZrBn0zZo8iKnn01sAvns1QkHMOJlOBhIkWylWFp2J_iQy1Y8yeT68diwKfG7tGKGJ4vnS2bf1WCvVlaM_4SVWf0Z2Ex88dynmpco3XT44xLt_xZqgn2xuhOtnDHpavNLLHSaa75tuBxJmLE0FOz_5qH3EyEypIEGS6kvyAOsu4svRsCeoksMCwJnKxoAJJLRYpvVEjznuamseNx0fE23JaatYBfE1sEWK1PSOHUqavofrKtqwfftoRo6yI=w1252-h911?auditContext=prefetch" 
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
         다음 경기 도전!
         <img 
           src="https://…결과 아이콘 URL…" 
           alt="결과 아이콘" 
           class="yesterday-icon right"
         />
       </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="team-selection-submit">
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
  
  const gamesHtml = yesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes     = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes     = game.awayTeam.votes >= game.homeTeam.votes;
    
    // Use game.correct flag directly to determine disabled class
    const disableCls = game.correct === false ? 'disabled' : '';
    
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
