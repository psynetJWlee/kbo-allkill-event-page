// Team Selection Section
function initTeamSelectionSection() {
  const state = window.appState;

  // 1) Date Navigation HTML
  const dateNavHtml = `
    <div class="date-navigation">
      <div class="date-nav-prev" id="date-nav-prev">
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-left"></div>
        </div>
        <span class="prev-day" id="prev-day">${state.currentDay - 1}</span>
      </div>
      <span class="current-day" id="current-day">
        ${state.currentDay === 26 ? 'Today' : state.currentDay}
      </span>
      <div class="date-nav-next" id="date-nav-next">
        <span class="next-day" id="next-day">${state.currentDay + 1}</span>
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>
  `;

  // 2) contentHtml 분기
  let contentHtml = '';
  if (state.currentDay === 27) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img src="…left-finger-url…" class="pointing-finger pointing-finger-left" alt="Left Finger" />
          올킬 도전!
          <img src="…right-finger-url…" class="pointing-finger pointing-finger-right" alt="Right Finger" />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            올킬 제출
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (state.currentDay === 26) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img src="…left-finger-url…" class="pointing-finger pointing-finger-left" alt="Left Finger" />
          올킬 도전!
          <img src="…right-finger-url…" class="pointing-finger pointing-finger-right" alt="Right Finger" />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="submit-btn" disabled>올킬 제출</button>
        </div>
      </div>
    `;
  }
  else if (state.currentDay === 25) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
        <h2 class="team-selection-title">
          다음 경기 도전!
          <img src="…yesterday-icon-url…" class="yesterday-icon right" alt="결과 아이콘" />
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="team-selection-submit">
          <button id="yesterday-nav-btn" class="submit-btn enabled">다음 경기 도전!</button>
        </div>
      </div>
    `;
  }
  else if (state.currentDay === 24) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day24" style="position: relative;">
        <h2 class="team-selection-title">올킬 성공!</h2>
        <img src="YOUR_STAMP_IMAGE_URL" class="allkill-stamp" alt="올킬 도장" />
        <div class="game-list" id="day24-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-day24-btn" class="submit-btn enabled">올킬 성공!</button>
        </div>
      </div>
    `;
  }
  else {
    contentHtml = `
      <div class="team-selection-placeholder" id="team-selection-placeholder">
        <div class="flex justify-center items-center h-[400px] text-white text-lg">
          이 날짜의 데이터가 없습니다.
        </div>
      </div>
    `;
  }

  // 3) 한 번만 HTML 주입
  $('#kbo-selection-container').html(dateNavHtml + contentHtml);

  // 4) sparkle 효과 (내일일 때만)
  if (state.currentDay === 27) {
    initSparkleEffect();
  }

  // 5) 게임 렌더링 & 이벤트 바인딩
  renderGames();
  setupDateNavigationHandlers();
}
