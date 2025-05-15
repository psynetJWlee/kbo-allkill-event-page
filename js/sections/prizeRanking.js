
// Prize Ranking Section
function initPrizeRankingSection() {
  const state = window.appState;
  const { formatNumber } = window.utils;
  
  const sectionHtml = `
    <div class="ranking-header">
      <h2 class="ranking-title">상금 랭킹</h2>
      
      <p class="my-ranking">
        내 랭킹 <span class="my-ranking-number">6위 / 5,345</span>
        <img 
          src="https://lh3.googleusercontent.com/fife/ALs6j_GyvmT1VHx9oypn1oqbOGkj_hMHHfVs8ynY836yCFL4yz5Tohme-qFQES0kC0qV60gnddlHnmkznArKKICq5TZKOzQPQHnqrfre8H7fCkmhJdDj2yTLvY8xTEeX1i2dxeLTxPj8sJyRPVb7OHLh3YTJ2xJIw0hNMCq6CXwSl5_BDBDT7prqPgs0tbwJ7ODnvhaII6Dk0RnPxVYH1eMs-CmQ3JPvmRSJYXKL1XdG7nCANaGfCeouNZwVgriB8SxBKeZl3gu9iw4JFUyFe1n_Hilgy9S0FThvY_QmatamLrhnhLUOVEJ-eh7SPndpz6WfR61uk-NQDHb1z-9JtQw3aTNW6973fbGiaSsXJI1nEIocjKpoF0oJ23eyzngDBF2A1PL-2KJHBvsbNDGGcEIVN_oxmTaUfZF3v3_vqgqa23lOHYjsMcQCosrefOz8NoJbw0F2uey8ALX3hamnpOxYngjkd7_4wKrBMma4PhNbZtGr5CQPMfN5ZZ6GR3sjAztIAmzvPOTbBPMZsLMLhMxz-SXTiuUtobCtvZOVRIDYK4VpCmiAHOqpqtrLUv_3ioPmAOObDTkTH3HjZEHY5Uk2EzGDfvN1HZwukaw7p-xm_oGVKptb-A85dDjqDhShq0bJidSJsiEAGIRY3PoXFH41042yg-qvzipMPsPepzDIHtczpX1X6k823GaXS-UWHdaiAM1evGfGcZfMTgrm9jjSjLTfDrKlhzfAxOCD9l_KyFqN55C5sCeC_KBTmLJkgmx4ymni4cRP9cBR69-Nl8Tb5tAR6FQAmtu45mmsIPdazIT8E6DVSBESWU6bJelU-WVWzd3E38eYFuftrAw9qvvVdqlfdpLV3ErQx17AbY8Dnw7LdJim1jTDKDGTCYbHWrQpmebOYgE09tZ5nuBoN8u2cCaiXLr730VC1_LUNi1SVksf4XHS46T9EM5aPbn7SdX9sskTNbsWv013yvYKdqKOqf-nruTaRDokt8YXEbf0J1NuAGYp7IDrXDJ9ae65cCXYUt96oAh6IPwhAuMWOd_kAzLE-lFtHcf97YmDrgmMH4YTH7aZKCaMj952SQrXaSKap52t3kptF6Dfb2l5hWaZmh7v-VqtPuHjw8AzwMsOqvgd_dFais4E6vfVqgzKqIBBtN2bfTGyB93GVp1on-79Gxd9bpL-A_YxLoASJyYcU0S6SavjluEIX9OsSyJ5qGEwvjEC46Yn32k4-iK322zO20qTXDqodqqqSLy-F18Eqn9BM_6XoNH8VIy75dHaPnUFrDmWFtF434hEWQt4dAjd1-c5D_-hY1la8bpxdMPGCbjhxjLmIhZEd2G9k6WLP3AeQwi0ywUMdsjTgPgGUTpHPM4NXqshxbu4uEjPoSPRwXRbdi_y2WI3s82FpdILRLXPu9WhQkC7bJ6rswqgTa0NZ7jAS-DnQWWRuXJsIl4fdXrUTwH7kB9vK4m0HJVue7ee25UXHU_18U2ZpfYGeg3hcWXAdwNyDVLHC_SyJ30-K_SNVwfxLjdunY-K6NXl2_-_YbesL41Wu3Kc_P5Wzjg5Tgkj84ELJ2_SMwJk6bBozwZc_7yjULQdkHeS9JjTnjEvweijOW7bB-ayblViNXj8MG0M=w1902-h910?auditContext=prefetch" 
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
      * 랭킹은 매일 마지막 경기 종료 후 30분 후 집계
      * 누적 상금이 동일 할 경우 먼저 달성한 사용자가 우선 순위      
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
  setupRankingTabHandlers();
}

// Set up tab change handlers
function setupRankingTabHandlers() {
  const state = window.appState;
  
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

// Export the initialization function
window.prizeRankingSection = {
  init: initPrizeRankingSection
};
