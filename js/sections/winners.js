
// js/section/winners.js

// Winners Section
function initWinnersSection() {
  console.log("Initializing winners section");
  
  try {
    const { formatNumber } = window.utils || { formatNumber: (num) => num.toString() };
    
    // Check if members array exists
    if (!Array.isArray(members)) {
      console.error("Members array is not available");
      return;
    }
    
    // Container HTML
    const sectionHtml = `
      <div class="w-full flex flex-col items-center relative">
        <img 
          src="https://lh3.googleusercontent.com/fife/ALs6j_FacrWtWYijSwVbTqua0DDRtUbXaYh1kCfZdJqIAgdSDXYowtjvyQPloHVynbjthBc0mwTa-Jy8oGPo4VgPErfvXXm21Y8YXln5gIz3XMev7te7lH912hVsL2IX4vgt97krVtNvVoSnhL43bwHxYZN7asNsHSNtTPxgXAqBTIum4cHtfrdqTQCEWhHo25j0xE2ceqgrwEt0estpCidJs8CGIkcD-4JEwHYYUZMOOJKY9JmfdoR1HvKNhCgHdO1BJ3l-M217oNw63g8n42lx8qN_FSW68S3nHUv3hAR-vi0iS-4UDZOIC-1xFhlRGohAz73VwFDIoKnqkPhBmfETCo1PMJtx8gj9UwggYDA97tmBgGbDnbO65-KVv8bFLF_SKt_ynLCJK9T05a8IJ94k0zgLn0kS8seAHupCs66jkFVzvai_j46SSr4VpYFem6NI3rxSYTXOFrcdULcc-rO8976eADMpR6VkVvvpzDGs0B-JAyzAyUMUykpCBojfLEbVrKY6GtLoZFHMN7B3VAdw4PZJcJ9xPN2N5EhQhQYyPI5_y9rcwWxdp8yeH3w5VTtune4y36ug0oOb0XEZr5NSAn48fNq_SsyKdC7U8u_U4UwU1PzteI4QSXL5JiZUrN4SnTCdkxspCC0xLcBby2oO4f0BDPgFL8s2HoP76qOYbgFQnPmmgBMSWEiCJrmj-c9RUWcZNlgVO1iKJ8NWLxZTweTKOlztlJifVsWcIC1ZXi01WMfHeCVPgt1e9RIeq8OzXpR6nntiUewEjMCIH2cxlgSsRgQymmLa02aUvejlCwW38VnBPLC1uEY3BJgKU4KhV01SP2kEcWyQlevmD6RdTFTRn50pKvAsNXjLbB8j2jE0zZKR9qp8ZqnBCyV1QrsQcvSvB4g7XtBVXg8GALp-Fcxqem_uGkmnGnDVfo426Gps-k8kkEV-xt1C-SL9kCb1abOcImJ9l3tORqFVSZznjVvhca2jJnkZCXNUpXW1qFkiMV_zp7kqmGwoHrE1ao3k16ymXTfvTtWsGsf-UNnr5FYlw_DLOfZbKtspkou627oiWzZiQIXqxarjpEpM_G0NOA9-2goPcQd8pNEYr0iju4KdAvRK_DZhCyUbt-rPZH-e6e2SMpez3RJ07iNr1JSDMYK2UkJiAshH1rGfnhA8G3EyS4Cxg2NhLtOPMDFR5MniV9o1eH4ixGQnzUq7l5z0URbZTNsRC7El12FoVrJMdttHZGrrIxAUfPRvnjBIKyiHHJvXsuKp3hpqcgG6UGjlBh8EdkgdXfQrBh64fsQR4oDErF7D36ttYYg7uG9wPfVBdZ8tl2NiKS8LhnCe7V1pJ0SljiebKH9yoLjn407pY5IuT2TvJvvg7us8F4g0-F6YDNbmg-O_ray0l-b0OKtDASGcjB08TUUGy-uB_YFHGTR7UwlG-J4_QyqLtapiL5lQu4IjV1vKnZMdyF5PYz_I3WNXk3DNEx_P-K-8yEKO4kb20195vLLdukbgHLUyWFV3vTabBxJbE4sqysSXgLDk89Siazd-Meys5RPV2Dz2wDZz2qGrbXJrr7SFOzqYJ0Rr6LHFp4ZL5FXQTA_dG0BBZCVq6pIUbCBDcwAKnuXQQ4Dl=w1122-h910?auditContext=prefetch" 
          alt="오늘의 당첨자"
          class="winners-title"
        />
        <p class="winners-count w-full text-center">
          총 ${members.length}명
        </p>
      </div>
      <div class="member-list" id="member-list"></div>
    `;
    
    // Check if the winners section element exists
    const winnersSection = $('#winners-section');
    if (winnersSection.length === 0) {
      console.error("Winners section element not found");
      return;
    }
    
    // Add section HTML
    winnersSection.html(sectionHtml);
    
    console.log("Rendering member list with", members.length, "members");
    
    // Render member list
    const memberListElement = $('#member-list');
    if (memberListElement.length === 0) {
      console.error("Member list element not found");
      return;
    }
    
    const memberListHtml = members.map(member => {
      return `
        <div class="member-card" style="border: 0.5px solid #FFFFFF;">
          <div class="member-profile">
            <img
              src="${member.profileImage || '/placeholder.svg'}"
              alt="${member.nickname} 프로필"
              class="member-avatar"
              onerror="this.onerror=null; this.src='/placeholder.svg';"
            />
            <span class="member-nickname">${member.nickname}</span>
          </div>
          <span class="member-amount">
            ${formatNumber(member.amount)}원
          </span>
        </div>
      `;
    }).join('');
    
    memberListElement.html(memberListHtml);
    console.log("Winners section initialized successfully");
  } catch (error) {
    console.error("Error initializing winners section:", error);
    console.error("Error stack:", error.stack);
  }
}

// Export the initialization function
window.winnersSection = {
  init: initWinnersSection
};
