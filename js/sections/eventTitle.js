// eventTitle.js

// 날짜 키를 "YYYY-MM-DD" 형태로 포맷하는 함수 (teamSelection.js와 동일 로직) :contentReference[oaicite:0]{index=0}
function formatLocalDate(d) {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  return `${Y}-${M}-${D}`;
}

// Event Title Section
function initEventTitleSection() {
  // 1) matchData에서 날짜 키 목록 뽑기 :contentReference[oaicite:1]{index=1}
  const rawKeys = Object.keys(window.matchData);
  // 2) 최소·최대 날짜 계산
  const dates = rawKeys.map(k => new Date(k).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  // 3) dateKeys 배열 생성 :contentReference[oaicite:2]{index=2}
  const dateKeys = [];
  let cursor = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
  const end = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
  while (cursor <= end) {
    dateKeys.push(formatLocalDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  // 4) 현재 표시 중인 인덱스(오늘 기준) :contentReference[oaicite:3]{index=3}
  const todayKey = formatLocalDate(new Date());
  let currentIndex = dateKeys.indexOf(todayKey);
  if (currentIndex === -1) currentIndex = 0;
  // → 만약 네비게이션 클릭시마다 다시 렌더링하고 싶다면, 
  //   window.teamSelectionSection.init 내부 refreshAll() 후에 이 함수를 다시 호출하세요.

  // 5) 경기 수 n 계산
  const key = dateKeys[currentIndex];
  const matches = window.matchData[key] || [];
  const n = matches.length;

  // 6) HTML 템플릿: 이미지 사이에 3줄 텍스트 삽입
  const sectionHtml = `
    <img 
      src="/image/event-logo.png" 
      alt="LIVE Score Logo"
      class="event-logo"
    />
    <div class="event-title-text">
      <div class="event-title-line1">라스 올킬</div>
      <div class="event-title-line2">
        <span class="dynamic-count">${n}</span>경기 맞추면
      </div>
      <div class="event-title-line3">
        매일 100/n 만원
      </div>
    </div>
    <img 
      src="/image/event-emoticon.gif"
      alt="Event Emoticon"
      class="event-emoticon"
    />
  `;

  $('#event-title-section').html(sectionHtml);

  // Start animation (기존 그대로) 
  window.animationUtils.startAnimation(
    document.getElementById('event-title-section')
  );
}

// Export the initialization function
window.eventTitleSection = {
  init: initEventTitleSection
};
