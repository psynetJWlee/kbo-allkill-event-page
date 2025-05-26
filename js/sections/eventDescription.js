
// Event Description Section
function initEventDescriptionSection() {
  const sectionHtml = `
    <div class="info-header">
      <img 
        src="/image/info-icon.png" 
        alt="Info icon" 
        class="info-icon"
      />
      <h3 class="info-title">상금 지급 안내</h3>
    </div>

    <ul class="info-list">
      <li class="info-item">
        My 상금 금액이 5만원 초과일 경우 지급신청이 가능
      </li>
      <li class="info-item">
        당첨자 세금신고를 위해 신분증 사본 제출 필요
      </li>
      <li class="info-item">
        상금 지급 후 개인 정보 즉시 파기
      </li>
      <li class="info-item">
        5만원 초과 시 제세공과금 (22%) 선공제 후 지급
      </li>
      <li class="info-item">
        다중 계정은 당첨자 정보 확인 후 당첨 취소 될 수 있음
      </li>
      <li class="info-item">
        당첨자 성명과 예금주명 불일치 시 당첨금 지급 불가
      </li>
    </ul>

    <a 
      href="https://home.psynet.co.kr/livescore" 
      target="_blank" 
      rel="noopener noreferrer"
      class="download-button"
    >
      LIVE스코어<br />다운 받기
    </a>
  `;
  
  $('#event-description-section').html(sectionHtml);
}

// Export the initialization function
window.eventDescriptionSection = {
  init: initEventDescriptionSection
};
