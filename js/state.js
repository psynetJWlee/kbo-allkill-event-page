// state.js
const seoulNow   = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
const seoulDate  = new Date(seoulNow);

let state = {
  today:        seoulDate.getDate(),   // 오늘 날짜(일)
  currentDay:   seoulDate.getDate(),   // 초기 currentDay도 오늘로 설정
  selectedTeams:{},                    // 오늘 경기 기본 선택값을 여기에 채웁니다
  activeTab:    'weekly'
};

window.appState = state;

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

// ────────────────────────────────────────────────────────────────────────────────
// ★ 오늘일 때 todayResults 배열의 실제 game.id로 기본 선택값 세팅
//   data.js 에서 window.todayResults 로 공개된 배열을 사용합니다.
if (state.currentDay === state.today && Array.isArray(window.todayResults)) {
  const todayGames = window.todayResults;
  state.selectedTeams = {
    [todayGames[0].id]: 'home',   // 첫 번째 경기 → 홈팀
    [todayGames[1].id]: 'away',   // 두 번째 경기 → 원정팀
    [todayGames[2].id]: 'away',   // 세 번째 경기 → 원정팀
    [todayGames[3].id]: 'home',   // 네 번째 경기 → 홈팀
    [todayGames[4].id]: 'home'    // 다섯 번째 경기 → 홈팀
  };
}
// ────────────────────────────────────────────────────────────────────────────────
