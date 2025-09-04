// js/sections/eventCompletion.js

// 이벤트 완료 섹션
function initEventCompletionSection(completionData) {
  const { formatNumber } = window.utils;

  // 기본값 설정
  const data = completionData || {
    totalPrizeAmount: 0,
    totalParticipants: 0
  };

  // ────────────── 컨테이너 HTML ──────────────
  const sectionHtml = `
    <div class="event-completion-container">
      <div class="end-btn">이벤트 종료</div>
      <div class="completion-stats">
        <div class="stat-item">
          <div class="stat-label">총 상금</div>
          <div class="stat-value">${formatNumber(data.totalPrizeAmount)} 원</div>
        </div>
        <div class="stat-item">
          <div class="stat-value2">${formatNumber(data.totalParticipants)} 명 참여</div>
        </div>
      </div>
      
      <div class="completion-message">
        <p class="message-text">다음 이벤트 기대해주세요 !</p>
        <p class="thank-you-text">감사합니다 !</p>
        <div class="thanks-images">
          <img src="/image/thanks1.gif" alt="감사1" class="thanks-img1" />
          <img src="/image/thanks2.gif" alt="감사2" class="thanks-img2" />
          <img src="/image/thanks1.gif" alt="감사3" class="thanks-img3" />
        </div>
      </div>
    </div>
  `;
  
  $('#event-completion-section').html(sectionHtml);
}

// 초기화 함수 내보내기
window.eventCompletionSection = {
  init: initEventCompletionSection
}; 