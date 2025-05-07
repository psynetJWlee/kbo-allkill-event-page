
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
