// Event Description Section
function initEventDescriptionSection() {
  const sectionHtml = `
    <!-- 올킬 이벤트 안내 -->
    <div class="info-header">
      <img 
        src="/image/info-icon.png" 
        alt="Info icon" 
        class="info-icon"
      />
      <h3 class="info-title">올킬 이벤트 안내</h3>
    </div>
    <ul class="info-list">
      <li class="info-item">이벤트 기간 : 7월 17일 ~ 8월 17일 까지</li>
      <li class="info-item">당일 대상 경기의 승/무/패를 모두 예측하여 제출</li>
      <li class="info-item">매일 100만원을 올킬 성공자 수 N명에 따라 1/N 분배 지급</li>
      <li class="info-item">1 ~ 2개 경기 취소 시 나머지 경기 결과로 올킬 선정</li>
      <li class="info-item">3개 이상 경기 취소 시 해당일 이벤트 무효</li>
      <li class="info-item">당일 정상적으로 종료되지 않은 경기는 '경기 취소'로 처리</li>
      <li class="info-item">당일 첫 경기 시작전까지 제출 가능</li>
      <li class="info-item">무승부는 실제 경기 결과가 무승부일 때 한정</li>
      <li class="info-item no-marker">프로토 승1패, 승5패와 무관</li>
    </ul>

    <!-- 상금 지급 안내 -->
    <div class="info-header">
      <img 
        src="/image/info-icon.png" 
        alt="Info icon" 
        class="info-icon"
      />
      <h3 class="info-title">상금 지급 안내</h3>
    </div>
    <ul class="info-list">
      <li class="info-item">My 상금 금액이 5만원 초과일 경우 지급신청이 가능</li>
      <li class="info-item">당첨자 세금신고를 위해 신분증 사본 제출 필요</li>
      <li class="info-item">상금 지급 후 개인 정보 즉시 파기</li>
      <li class="info-item">5만원 초과 시 제세공과금 (22%) 선공제 후 지급</li>
      <li class="info-item">지급 완료까지는 영업일 기준 약 1일 ~ 2일 소요</li>
      <li class="info-item">금요일, 토요일 신청 건은 차주 월요일 순차 처리</li>
      <li class="info-item">다중 계정은 당첨자 정보 확인 후 당첨 취소 될 수 있음</li>
      <li class="info-item">당첨자 성명과 예금주명 불일치 시 당첨금 지급 불가</li>
      <li class="info-item">이벤트 종료 후 미신청 상금은 소멸을 원칙으로 함</li>
      <li class="info-item">단, 추후 유사 이벤트 진행 시 이월될 수 있음</li>
    </ul>

    <a 
      href="https://home.psynet.co.kr/livescore" 
      target="_blank" 
      rel="noopener noreferrer"
      class="download-button"
    >
      LIVE 스코어<br />다운 받기
    </a>

  `;
  
  $('#event-description-section').html(sectionHtml);

  // 링크 복사 버튼 클릭 시 클립보드에 URL 복사
  $(document).off('click.copylink').on('click.copylink', '.copy-link-button', function() {
    const urlToCopy = window.location.href;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      // 최신 브라우저, HTTPS 환경
      navigator.clipboard.writeText(urlToCopy)
        .then(function() {
          alert('링크가 복사되었습니다!');
        })
        .catch(function(err) {
          alert('복사에 실패했습니다. 브라우저를 확인해주세요.');
        });
    } else {
      // 구형 브라우저 또는 HTTP 환경
      const textArea = document.createElement('textarea');
      textArea.value = urlToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          alert('링크가 복사되었습니다!');
        } else {
          alert('복사에 실패했습니다. 브라우저를 확인해주세요.');
        }
      } catch (err) {
        alert('복사에 실패했습니다. 브라우저를 확인해주세요.');
      }
      document.body.removeChild(textArea);
    }
  });
}

// Export the initialization function
window.eventDescriptionSection = {
  init: initEventDescriptionSection
};
