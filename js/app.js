/* js/app.js */

;(function(window, $) {
  // DOM이 준비되면 모든 섹션을 초기화
  $(document).ready(function() {
    try {
      // 오늘 날짜 기본 선택 팀 적용 (예: 26일)
      if (window.appState && window.appState.currentDay === 26) {
        // defaultSelectedTeams 전역 객체가 있다고 가정
        window.appState.selectedTeams = Object.assign({}, window.defaultSelectedTeams);
        // teamSelection 섹션이 초기화된 후 update 호출
        setTimeout(function() {
          if (window.teamSelectionSection && typeof window.teamSelectionSection.updateTeamSelections === 'function') {
            window.teamSelectionSection.updateTeamSelections();
          }
        }, 100);
      }

      // 이벤트 타이틀 섹션 초기화
      if (window.eventTitleSection && typeof window.eventTitleSection.init === 'function') {
        window.eventTitleSection.init();
      }
      // 우승자 섹션 초기화
      if (window.winnersSection && typeof window.winnersSection.init === 'function') {
        window.winnersSection.init();
      }
      // 팀 선택 섹션 초기화
      if (window.teamSelectionSection && typeof window.teamSelectionSection.init === 'function') {
        window.teamSelectionSection.init();
      }
      // 내 상금 섹션 초기화
      if (window.myPrizeSection && typeof window.myPrizeSection.init === 'function') {
        window.myPrizeSection.init();
      }
      // 상금 순위 섹션 초기화
      if (window.prizeRankingSection && typeof window.prizeRankingSection.init === 'function') {
        window.prizeRankingSection.init();
      }
      // 이벤트 설명 섹션 초기화
      if (window.eventDescriptionSection && typeof window.eventDescriptionSection.init === 'function') {
        window.eventDescriptionSection.init();
      }

    } catch (error) {
      console.error('섹션 초기화 중 오류:', error);
    }
  });
})(window, jQuery);
