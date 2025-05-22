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
          <img src="/user-icon.png" alt="User icon" class="user-icon" />
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
