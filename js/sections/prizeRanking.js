//v2.1

;(function($){
  // 페이지당 아이템 개수
  const PAGE_SIZE = 10;

  //랭킹 리스트 렌더링 함수
  async function renderRankingList(page) {
    const { formatNumber } = window.utils;
    

    try {
      // API에서 랭킹 데이터 로드 (페이징 파라미터 포함)
      const response = await window.apiUtils.getRankings(page, PAGE_SIZE);
      
      if (response.success && response.rankings && response.rankings.length > 0) {
        // API 응답 데이터 사용
        const data = response.rankings;
        const totalPages = response.totalPages || 1;
        const currentPage = response.currentPage || page || 1;
        const totalItems = response.totalItems || 0;
        
        // 내 랭킹 정보 (API에서 제공하는 경우)
        const userRank = response.myRank || '-';
        const totalCount = response.myTotalCount || totalItems;
        const displayText = `${formatNumber(userRank)} 위 / ${formatNumber(totalCount)} 명`;

        var unitLabel = "";
        if(data.length > 0){
           unitLabel = data[0].refDate;
        }
        //unitLabel값을 표시..
        $('.unit-label').text(unitLabel+" 기준");

        // 내 랭킹 숫자 갱신
        $('.my-ranking-number').text(displayText);

        // 리스트 HTML
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
            <div class="ranking-prize">${formatNumber(item.prize)} 원</div>
          </li>
        `).join('');
        $('#ranking-list').html(listHtml);

        // 페이징 UI
        const pagingHtml = `
          <div class="pagination prize-ranking-pagination">
            <div class="pagination-content">
              <div id="prize-ranking-prev-page" class="page-item ${currentPage === 1 ? 'disabled' : ''}">&lt;</div>
               ${getPaginationPages(currentPage, totalPages, 5).map(num => `
                <div class="page-item ${currentPage === num ? 'active' : ''}" data-page="${num}">${num}</div>
              `).join('')}
              <div id="prize-ranking-next-page" class="page-item ${currentPage === totalPages ? 'disabled' : ''}">&gt;</div>
            </div>
          </div>
        `;
        $('#prize-ranking-pagination').html(pagingHtml);

        // 페이징 이벤트 핸들러 (컨테이너 범위로 중복 방지)
        $('#prize-ranking-pagination').find('.page-item[data-page]')
          .off('click').on('click', async function() {
            const page = parseInt($(this).data('page'), 10);
            await renderRankingList(page);
            await scrollRankingSectionToBottom();
          });

        $('#prize-ranking-pagination').find('#prize-ranking-prev-page')
          .off('click').on('click', async function() {
            if (currentPage > 1){
            	await renderRankingList(currentPage - 1);
            	await scrollRankingSectionToBottom();
            } 
          });

        $('#prize-ranking-pagination').find('#prize-ranking-next-page')
          .off('click').on('click', async function() {
            if (currentPage < totalPages){
            	await renderRankingList(currentPage + 1);
            	await scrollRankingSectionToBottom();
            }
          });
      } else {
        // 랭킹 데이터가 없으면 섹션 숨기기
        $('#prize-ranking-section').hide();
        return;
      }
    } catch (error) {
      console.error('랭킹 데이터 로드 오류:', error);
      window.apiUtils.handleError(error, '랭킹 데이터 로드');
      
      // 에러 시 기존 데이터로 fallback
      renderWithExistingData(page);
    }
  }

  // 기존 데이터로 렌더링하는 함수
  function renderWithExistingData(page) {
    const { formatNumber } = window.utils;
    const data = window.totalrankingData || [];

    // 데이터가 없으면 섹션 숨기기
    if (!data || data.length === 0) {
      $('#prize-ranking-section').hide();
      return;
    }

    // 페이지 관련 처리
    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const currentPage = page || 1;
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const listItems = data.slice(startIdx, endIdx);

    // 내 아이템 찾아서 헤더 표시값용 랭크
    const me = data.find(item => item.isMe);
    const userRank = me ? me.rank : '-';
    const displayText = `${formatNumber(userRank)} 위 / ${formatNumber(data.length)} 명`;

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
        <div class="ranking-prize">${formatNumber(item.prize)} 원</div>
      </li>
    `).join('');
    $('#ranking-list').html(listHtml);

    // 페이징 UI
    const pagingHtml = `
      <div class="pagination prize-ranking-pagination">
        <div class="pagination-content">
          <div id="prize-ranking-prev-page" class="page-item ${currentPage === 1 ? 'disabled' : ''}">&lt;</div>
           ${getPaginationPages(currentPage, totalPages, 5).map(num => `
            <div class="page-item ${currentPage === num ? 'active' : ''}" data-page="${num}">${num}</div>
          `).join('')}
          <div id="prize-ranking-next-page" class="page-item ${currentPage === totalPages ? 'disabled' : ''}">&gt;</div>
        </div>
      </div>
    `;
    $('#prize-ranking-pagination').html(pagingHtml);

    // 페이징 이벤트 핸들러
    $('#prize-ranking-pagination').find('.page-item[data-page]')
      .off('click').on('click', function() {
        const page = parseInt($(this).data('page'), 10);
        renderWithExistingData(page);
        scrollRankingSectionToBottom();
      });

    $('#prize-ranking-pagination').find('#prize-ranking-prev-page')
      .off('click').on('click', function() {
        if (currentPage > 1){
        	renderWithExistingData(currentPage - 1);
        	scrollRankingSectionToBottom();
        } 
      });

    $('#prize-ranking-pagination').find('#prize-ranking-next-page')
      .off('click').on('click', function() {
        if (currentPage < totalPages){
        	renderWithExistingData(currentPage + 1);
        	scrollRankingSectionToBottom();
        } 
      });
  }
  
  
  //랭킹 섹션 하단으로 스크롤
  function scrollRankingSectionToBottom() {
    const section = $('#prize-ranking-section');
    const sectionBottom = section.offset().top + section.outerHeight();
    const viewportHeight = window.innerHeight;
    const scrollTo = sectionBottom - viewportHeight;
    window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'auto' });
  }

  // 섹션 초기화 함수
  async  function initPrizeRankingSection() {
    // CPU 사용률 체크 - 70% 이상이면 대체 화면 표시
    if (window.currentCpuUsage > 75 ) {
      console.warn('PrizeRanking - 높은 CPU 사용률로 인해 랭킹 데이터를 로드하지 않습니다.');
      window.eventJoinInfo = 0;
	  try {
	      const eventInfoResponse =  await window.apiUtils.getEventInfo();
	      if (eventInfoResponse.success && eventInfoResponse.eventInfo) {
	    	  window.eventJoinInfo = eventInfoResponse.eventInfo.eventJoinInfo || 0;
	      }
	      
	  }catch (error) {
	      console.error('이벤트 정보 조회 오류:', error);
	      eventJoinInfo = "-";
	  }
      displayRankingLowLoadAlternative();
      $('#prize-ranking-section').show();
      return;
    }
    
    // 현재 월 가져오기
    const currentMonth = new Date().getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    
    // 헤더 및 기본 구조(탭X, 기간X)
    const sectionHtml = `
      <div class="ranking-header">
        <div class="ranking-title">
          <span class="title-text">${currentMonth}월 상금 랭킹</span>
          <div class="title-underline"></div>
        </div>
        <p class="my-ranking">My랭킹 <span class="my-ranking-number">- 위 / - 명</span>  
        </p>
      </div>
      <p class="unit-label">10/1 기준</p>
      <ul class="ranking-list" id="ranking-list"></ul>
      <div id="prize-ranking-pagination"></div>
      <div class="ranking-note-title">매일 마지막 경기 종료 후 집계</div>
    `;
    $('#prize-ranking-section').html(sectionHtml);

    renderRankingList(1);
  }
  
  // DB를 사용하지 않는 대체 화면 표시 함수 (랭킹용)
  function displayRankingLowLoadAlternative() {
	  
    // 원래 목록 화면 구조를 유지하되 리스트 대신 메시지 표시
    const currentMonth = new Date().getMonth() + 1;
    
    const alternativeHtml = `
      <div class="ranking-header">
        <div class="ranking-title">
          <span class="title-text">${currentMonth}월 상금 랭킹</span>
          <div class="title-underline"></div>
        </div>
      </div>
      <ul class="ranking-list" id="ranking-list">
        <div style="text-align: center; padding: 36px 20px 0px 20px; color: #666; font-size: 16px; line-height: 1.8;">          
          <div style="font-size: 21px; color: #FFF;">
            ${currentMonth}월 총 당첨자 ${Number(window.eventJoinInfo || 0).toLocaleString('ko-KR')}명 중 <br>정확한 랭킹을 재집계 중입니다.<br>잠시만 기다려주세요.</br>
          </div>         
          <button 
            onclick="location.reload();" 
            style="margin-top: 30px; padding: 13px 25px 16px 25px; background-color: #FFD700; border: none; border-radius: 34px; font-size: 25px; cursor: pointer; width: 154px; height: 65px; color: #000;"
            onmouseover="this.style.backgroundColor='#9F9F9F'" 
            onmouseout="this.style.backgroundColor='#FFD700'">
            새로고침
          </button>
        </div>
      </ul>
      <div class="ranking-note-title"></div>
    `;
    
    $('#prize-ranking-section').html(alternativeHtml);
  }
  
  //==============================
  // 공통 페이지네이션 번호 계산 함수
  // ==============================
  function getPaginationPages(currentPage, totalPages, maxPages = 5) {
    const pages = [];
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let end = start + maxPages - 1;
    if (end > totalPages) {
      end = totalPages;
      start = end - maxPages + 1;
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // 외부 호출용
  window.prizeRankingSection = {
    init: initPrizeRankingSection
  };
})(jQuery);

