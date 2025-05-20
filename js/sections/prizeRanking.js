// js/sections/prizeRanking.js

;(function($){
  // ────────────────────────────────
  // 1) 리스트 렌더링 함수
  // ────────────────────────────────
  function renderRankingList() {
    const state         = window.appState;
    const { formatNumber } = window.utils;
    // data.js 에 선언된 변수 이름에 맞춤
    const data = (state.activeTab === 'weekly')
      ? weeklyrankingData
      : totalrankingData;

    // 탭 active/inactive 클래스 토글
    $('#weekly-tab')
      .toggleClass('active',   state.activeTab === 'weekly')
      .toggleClass('inactive', state.activeTab !== 'weekly');
    $('#all-tab')
      .toggleClass('active',   state.activeTab === 'all')
      .toggleClass('inactive', state.activeTab !== 'all');

    // 내 아이템(isMe:true) 찾아 랭킹/상금 표시
    const me       = data.find(item => item.isMe);
    const userRank = me ? me.rank : '-';
    const displayText = `${userRank}위 / 참여자수`;

    // 헤더의 내 랭킹 숫자 업데이트
    $('.my-ranking-number').text(displayText);

    // 실제 리스트 HTML 생성
    const listHtml = data.map(item => `
      <li class="ranking-item ${item.isMe ? 'is-me' : ''}">
        <div class="rank-number ${item.rank <= 3 ? 'top-rank' : ''}">
          ${item.rank}
        </div>
        <img src="${item.profileImg}" alt="${item.name} 프로필" class="profile-img" />
        <div class="ranking-info">
          <span class="ranking-nickname">${item.name}</span>
          <span class="ranking-streak">올킬 ${item.streak}회</span>
        </div>
        <div class="ranking-prize">${formatNumber(item.prize)}원</div>
      </li>
    `).join('');
    $('#ranking-list').html(listHtml);
  }

  // ────────────────────────────────
  // 2) 탭 클릭 핸들러
  // ────────────────────────────────
  function setupRankingTabHandlers() {
    const state = window.appState;

    $('#weekly-tab')
      .off('click')
      .on('click', () => {
        if (state.activeTab !== 'weekly') {
          state.activeTab = 'weekly';
          renderRankingList();
        }
      });

    $('#all-tab')
      .off('click')
      .on('click', () => {
        if (state.activeTab !== 'all') {
          state.activeTab = 'all';
          renderRankingList();
        }
      });
  }

  // ────────────────────────────────
  // 3) 섹션 초기화
  // ────────────────────────────────
  function initPrizeRankingSection() {
    const state = window.appState;
    // 최초 진입 시 기본 탭
    state.activeTab = state.activeTab || 'weekly';

    // 템플릿 HTML (랭킹 노트 포함)
    const sectionHtml = `
      <div class="ranking-header">
        <h2 class="ranking-title">상금 랭킹</h2>
        <p class="my-ranking">
          내 랭킹 <span class="my-ranking-number">-위 / 참여자수 </span>
          <img src="https://lh3.googleusercontent.com/fife/ALs6j_FnjYpj10t9Lfa4fEjfCilaDL5cHbJlFL0op8Z6QhLirHO3mEfnHdZaF4KyjXowWD9bIY7TuH9ir8IN_UwQKmhmRcOkGr_ggyIV_fTWp21u8g2gjUHk-79MtIuikYMe1f3n7CX5-57uJEDNmV3oUb6UsE2eea7XX-0QRU5oYY9MXnF0VHplKBSxXXSHMf6JYJAu2NV66wgi_MAs1K45SPUmpkwPI4G7SJPCvocfrTS2FycyUZJ7pT3O2lnzoraEFezvMGx5lekX80Zy2QrhRXwFr2Ln1w-tOzeIBAwRyav-cN0vu67fWO7LbfjuMOxEl33L5z1By1vZegiqDolZnwtHc5ssH3tVDU-McAJw0Bqyb_8V72Y-5TEMbI2tKiDCt6xaRcNL_Rf5IjZBRaUC3herHfKqCACCiW0xZKcZrH4r5LdRbCHONj_K-UON7lXpcv_yBlUTL3eMYvf7QygNSU8lE48Nxna04VUNJhEGlh2E9l2twVoNJnuEnkowGmOkPdiDuuup3H0oJ8zQOfd2Oadai0JWeFxtDnJqkHCLLw0cE1y6xs95Vcngl7oj2C0gzKxu0V8hiB0Z1Vp-NvkbTr8I2suG21aUOAbHgoFaBNlNbNuoypmET4DSbdNfvJAj1Yv9Pl6xStDHNmqbjQqGPaKe7_nN1OyhQTd1RamwAkz20Wm6dgZo-p0tnnEn4sQgGI6b-teM9Kix5-dv2e9xgmMQt1ITa7aM9a5gm1Fn81dXnKQ8P1RkNpvk2svh1YfO3AO-hOriGYVMVPOXauz2N1tP8iziwJhpm1hflEd3scGGIYiDkkUMa3bGFTiRVE-UGAwoRHzdzaSsuD2rLfy3ndDnYIj8si6KdzeOERcdYytbdvSXNJJ-RBWv81k-_7FRZLarWZ0SjlSN1voVCA7SCUcTXAPIz2e2IoUcjJ-MHQJ3SaDDmZqx1kz8h51bKy470DXE4Jd-KyNZw1oqUH-FG_M3_KMGvP93k_5ZOySAMWqNejqSCze_C87WKCiMQcHNct4py9-vsL5nmHL-Fpg4JB8RedhSdZuMovWpyuZPHDtgg_cXCgW-AaAD0ZIyI4bYCTvnMyNQPDTZ3DNS7N2VTb2C35K7hTQ8KwdtwqHprYnUIeWB1VFO-7kB6Hu-Aaloq4mbLMlGgD6slS2mBkmXVY9aEL9US7SuFZvPUIuz9ZCv1a2HiGzkhi875xP0nns4wplURgrdV5TisMAtfJWN1--MwZDrzzzyEjWA1M46rJYPdxs3JEEgM2hr819fEsRS4_BhqSL9w3nvgshgqHY5ImAOyxp91jIbWcL_v3Txl64qIk-rITVTwf9fziA1GRMLEE_FrSL-Xy7oxWtPHvp6I8JqnxcSP55iSIIZmTd20oodUX-RLGKFbamPB6zli-NAzubwgD5mE4OCEbeL69GEzYMcbIF4P96xEiOQxpDZ1UpJ50ZYVMRGwod2O7ycj8xiDdXjBKfcT24j_oPyjdGQfPrkSgY4FygvZUZFiR1XD9xjRNlBdid9TNgDY09DoRWaBeiRtnotmIDq5t1sLr9dYf6Y4Kk1pmuPrM8YOmmv2XlPWxuZVBFMt1FuNiFC4RsAtk4186X1eL_PrEUrFDHXsTNN=w1902-h910?auditContext=prefetch" alt="User icon" class="user-icon" />
        </p>
      </div>

      <div class="ranking-tabs">
        <div class="tabs-list">
          <div id="weekly-tab" class="tab">주간</div>
          <div id="all-tab"    class="tab">전체</div>
        </div>
      </div>
      ${state.activeTab === 'weekly'
        ? `<p class="date-range">${state.weeklyRangeText}</p>`
        : ''}

      <ul class="ranking-list" id="ranking-list"></ul>

      <div class="ranking-note">
        * 랭킹은 매일 마지막 경기 종료 후 30분 후 집계<br/>
        * 누적 상금이 동일 할 경우 먼저 달성한 사용자가 우선 순위
      </div>
    `;
    $('#prize-ranking-section').html(sectionHtml);

    setupRankingTabHandlers();
    renderRankingList();
  }

  // 외부 호출용
  window.prizeRankingSection = {
    init: initPrizeRankingSection
  };
})(jQuery);
