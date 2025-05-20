// state.js

const seoulNow  = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
const seoulDate = new Date(seoulNow);

let state = {
  today:        seoulDate.getDate(),
  currentDay:   seoulDate.getDate(),
  selectedTeams:{},
  activeTab:    'weekly',
  weeklyRangeText: '3월 20일 ~ 3월 26일 기준'
};

// 전역에 노출
window.appState = state;

// ────────────────────────────────────────────────────────────────────────────────
// ★ 오늘일 때 기본 선택값 미리 채우기
if (window.appState.currentDay === window.appState.today) {
  // data.js 의 todayResults 배열 안 game.id 값에 맞춰서 설정
  window.appState.selectedTeams = {
    0: 'home',   // 1번 경기 → 홈팀
    1: 'away',   // 2번 경기 → 원정팀
    2: 'away',   // 3번 경기 → 원정팀
    3: 'home',   // 4번 경기 → 홈팀
    4: 'home'    // 5번 경기 → 홈팀
  };
}
// ────────────────────────────────────────────────────────────────────────────────

// 숫자 천 단위 콤마 포맷터
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Export utility functions
window.utils = {
  formatNumber
};

// 안전 DOM 조작 헬퍼
window.safeDOM = {
  getElement: function(selector) {
    return document.querySelector(selector);
  },
  hasElement: function(selector) {
    return document.querySelector(selector) !== null;
  },
  addClass: function(selector, className) {
    const el = this.getElement(selector);
    if (el) el.classList.add(className);
  },
  removeClass: function(selector, className) {
    const el = this.getElement(selector);
    if (el) el.classList.remove(className);
  }
};
