
// eventTitle.js

// 날짜 키를 "YYYY-MM-DD" 형태로 포맷하는 함수
function formatLocalDate(d) {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  return `${Y}-${M}-${D}`;
}

// 이벤트 타이틀 섹션 초기화 함수
function initEventTitleSection() {
  const rawKeys = Object.keys(window.matchData);
  const dates = rawKeys.map(k => new Date(k).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  const dateKeys = [];
  let cursor = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
  const end = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
  while (cursor <= end) {
    dateKeys.push(formatLocalDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  const todayKey = formatLocalDate(new Date());
  let currentIndex = dateKeys.indexOf(todayKey);
  if (currentIndex === -1) currentIndex = 0;

  // [업데이트] 경기수 n: 최신 gamedata 구조 반영(matches -> games)
  const key = dateKeys[currentIndex];
  const gamesArr = (window.matchData[key] && window.matchData[key].games) || [];
  const n = gamesArr.length;

  const sectionHtml = `
    <img 
      src="/image/event-logo.png" 
      alt="LIVE Score Logo"
      class="event-logo"
    />
    <div class="event-title-text">
      <div class="event-title-line1">라스 올킬</div>
      <div class="event-title-line2">
        <span class="dynamic-count">매일 '${n}</span>경기' 맞추면
      </div>
      <div class="event-title-line3">
        매일 100 / n 만원 !
      </div>
      <div class="event-title-line4">
      총 3천만원
    </div>
    </div>
    <img 
      src="/image/image_fx.png"
      alt="Event FX"
      class="event-fx-image"
    />
    <img 
      src="/image/event-emoticon.gif"
      alt="Event Emoticon"
      class="event-emoticon"
    />
  `;

  $('#event-title-section').html(sectionHtml);

  // 타이틀 섹션에 애니메이션 적용
  // window.animationUtils.startAnimation(
  //   document.getElementById('event-title-section')
  // );
}

// 초기화 함수 내보내기
window.eventTitleSection = {
  init: initEventTitleSection
};
