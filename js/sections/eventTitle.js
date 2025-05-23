
// Event Title Section
function initEventTitleSection() {
  const sectionHtml = `
    <img 
      src="/event-logo.png" 
      alt="LIVE Score Logo"
      class="event-logo"
    />
    <img 
      src="/event-title.png" 
      alt="KBO 올킬 이벤트"
      class="event-title"
    />
    <img 
      src="/event-emoticon.gif"
      alt="Event Emoticon"
      class="event-emoticon"
    />
  `;
  
  $('#event-title-section').html(sectionHtml);
  
  // Start animation
  window.animationUtils.startAnimation(document.getElementById('event-title-section'));
}

// Export the initialization function
window.eventTitleSection = {
  init: initEventTitleSection
};
