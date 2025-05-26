
;(function($){
  // 페이지당 아이템 개수
  const PAGE_SIZE = 10;

  // 랭킹 리스트 렌더링
  function renderRankingList(page) {
    const { formatNumber } = window.utils;
    const data = totalrankingData;

    // 페이지 관련 처리
    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const currentPage = page || 1;
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const listItems = data.slice(startIdx, endIdx);

    // 내 아이템 찾아서 헤더 표시값용 랭크
    const me = data.find(item => item.isMe);
    const userRank = me ? me.rank : '-';
    const displayText = `${userRank}위 / ${data.length}명`;

    // 내 랭킹 숫자 갱신
    $('.my-ranking-number').text(displayText);

    // 리스트 HTML
    const listHtml = listItems.map(item => `
      <li class="ranking-item ${item.isMe ? 'is-me' : ''}">
        <div class="rank-number ${item.rank <= 3 ? 'top-rank' : ''}">
          ${item.rank}
        </div>
        <img src="${item.profileImg}" alt="${item.name} 프로필" class="profile-img" />
        <div class="ranking-info">
          <span class="ranking-nickname">${item.name}</span>
          <span class="ranking-streak">올킬 ${item.streak}회</span>
        </div>
        <div class="ranking-prize">${formatNumber(item.prize)}</div>
      </li>
    `).join('');
    $('#ranking-list').html(listHtml);

    // 페이징 UI
    const pagingHtml = `
      <div class="pagination prize-ranking-pagination">
        <div class="pagination-content">
          <div id="prize-ranking-prev-page" class="page-item ${currentPage === 1 ? 'disabled' : ''}">&lt;</div>
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(num => `
            <div class="page-item ${currentPage === num ? 'active' : ''}" data-page="${num}">${num}</div>
          `).join('')}
          <div id="prize-ranking-next-page" class="page-item ${currentPage === totalPages ? 'disabled' : ''}">&gt;</div>
        </div>
      </div>
    `;
    $('#prize-ranking-pagination').html(pagingHtml);

    // 페이징 이벤트 핸들러 (컨테이너 범위로 중복 방지)
    $('#prize-ranking-pagination').find('.page-item[data-page]')
      .off('click').on('click', function() {
        const page = parseInt($(this).data('page'), 10);
        renderRankingList(page);
      });

    $('#prize-ranking-pagination').find('#prize-ranking-prev-page')
      .off('click').on('click', function() {
        if (currentPage > 1) renderRankingList(currentPage - 1);
      });

    $('#prize-ranking-pagination').find('#prize-ranking-next-page')
      .off('click').on('click', function() {
        if (currentPage < totalPages) renderRankingList(currentPage + 1);
      });
  }

  // 섹션 초기화
  function initPrizeRankingSection() {
    const data = totalrankingData;
    // 헤더 및 기본 구조(탭X, 기간X)
    const sectionHtml = `
      <div class="ranking-header">
        <h2 class="ranking-title">상금 랭킹</h2>
        <p class="my-ranking">
          내 랭킹 <span class="my-ranking-number">-위 / ${data.length}명</span>
          <img src="/image/user-icon.png" alt="User icon" class="user-icon" />
        </p>
      </div>

      <ul class="ranking-list" id="ranking-list"></ul>

      <div id="prize-ranking-pagination"></div>
      <div class="ranking-note-title">
      매일 마지막 경기 종료 후 집계</div>
      
      <div class="ranking-note">
        * 누적 상금이 동일 할 경우 먼저 달성한 사용자가 우선 순위<br/>
        * 전체 랭킹은 30일까지 노출됩니다.
      </div>
    `;
    $('#prize-ranking-section').html(sectionHtml);

    renderRankingList(1);
  }

  // 외부 호출용
  window.prizeRankingSection = {
    init: initPrizeRankingSection
  };
})(jQuery);

