// js/section/winners.js

// Winners Section
function initWinnersSection() {
  const { formatNumber } = window.utils;
  
  // Container HTML
  const sectionHtml = `
    <div class="w-full flex flex-col items-center relative">
      <img 
        src="/lovable-uploads/2b49ee10-7baf-4d97-bde0-342af5344c35.png" 
        alt="오늘의 당첨자"
        class="winners-title"
      />
      <p class="winners-count inline-block mx-auto">
        총 20명
      </p>
    </div>
    <div class="member-list" id="member-list"></div>
  `;
  
  $('#winners-section').html(sectionHtml);
  
  // Render member list
  const memberListHtml = members.map(member => {
    return `
      <div class="member-card" style="border: 0.5px solid #FFFFFF;">
        <div class="member-profile">
          <img
            src="${member.profileImage || '/placeholder.svg'}"
            alt="${member.nickname} 프로필"
            class="member-avatar"
          />
          <span class="member-nickname">${member.nickname}</span>
        </div>
        <span class="member-amount">
          ${formatNumber(member.amount)}원
        </span>
      </div>
    `;
  }).join('');
  
  $('#member-list').html(memberListHtml);
}

// Export the initialization function
window.winnersSection = {
  init: initWinnersSection
};
