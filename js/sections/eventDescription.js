
// Event Description Section
function initEventDescriptionSection() {
  const sectionHtml = `
    <div class="info-header">
      <img 
        src="https://lh3.googleusercontent.com/fife/ALs6j_FVIYB0AWBKsaeNPcqocoi66UrqgoS29URTVVNDoDy6KrdHiotNf-CqmLR2ZVoYP0rjnRfwNa-NMVkm76SBLjc3K4qx9lTTv96MAqzEOMuAT7Om8DJVpmKAhWPLzIdFQbvlWHofhh99ZXetJkjlfurRUN8qRhb096WwuQi__XVu9ot3iDYPQbaVWSYQ3iezUGUq8kDvKBYdo8_BKVNnbfD_PETsyBP9gOO9QwGWqF4XRK4MP95vd-vYfzw-r51o7ZmkeZOXX3JJxdjh5UApQkfSCzTik8dNyalfQJGM6lmAt97bZquSMCBetULhFzFKODfsQE1-R_e295UbAIzVUmt6LVXEoMXzhlL2rf3n4nZm6P-ePn7dekJw2sip9tXiFqzu1Zj42ogTecAl4xOPglmFQVrrVmACRBvMJA2UvltkW2bHTwREUEPP4IhFkn3DoNB88BJuBbFlqk7IHzUnLibHVphz7JPGly0OSOFdF_928jpnfP45ByRhaScukxxWBl05aO17YHfnxykEFMF0G_ZRAMLtdL6wLzhhjVQsJt-iWscDbJd-9v5e8vncMTapEeWFvzweToVScM5pm1VD6v6ecdGFOfKScQTd1OxH7NlMYmc8R80a_GkZey_FULiQRBxH1reuVRH_evItaDpGFPCWrsue8uNac5dHFnJbK1wddy9uRIu1mOOrnT6QtDKozrZtjCnlr7OXqvyuvCsdCEMiuylWxerSbrFVA095M77pGgn5yxxPtxxGzkUO5te3n6hfSKA1KkSpQgQ3ymA4io4uadz6GU6z5bQ9NfJ656POqR8w8qr5KY4YE4A72NRRsX62GGFKH73mzSvrbge39tjuu_GyTVjZV_TGmBECupPmsqrN_uy1FB6-QqKn68aPZOCC-cdTo_f6gGKbjMv_cb86I6_WoXUDIb0x0P3MG-ug6M4zGlZWc30WZCrMkFeGi816NIXPf3uZzS7Di9-sf1U19ZZxSgqHLJCvOW2S3Ka-HWb6yxrNC5RNmlXjLRoBN1AO16kXZmox2Hs5cdjYPbpIhO0tYwVAQipTa5F1eG3fMiDxCY9dYYirrUq4rqzGDs2ngZamI6YpcTJGH4d0o_kBVzjuyofsIheIsJ3Pa3XpxebYH0FwYaVaJfWxbpwMN-EfrUPs4AQlzoD5aDILnFfwlPaV9gbHKuyirgnT5iQHV856wKCzZoJ9SjOh36W2HqLLun06cvzGoVpLglysmstDOtK1GKcmCUMGcoeSS4CZGqtB3Rh-nl92zf4pjVbbJWTo9cfOKFEk5bBJSjDd2srB5SbDsCOgjbT0_9YNzxQ-flSsrUDNJMVDvWrBynUly8vS0dMSfw9ZbepOdzzHzqyn674ssgVf18Q5RWep0xOoD9AnQjPg5-aOLZerhwy6VayQRyeqeS4zRBfmLYW1YqP1GJeyANfK0UpUQUXURPNJg0sELmBA8bBDKebKlSnX7xpdm_MQZMn7k0CjFjFLUs6nT-GVeVdbhEjQk2g6tW_mw-nY3r5xPY5bZfcgWmzfwh2dfJ0KWmmdl8rlUMpdOO7snfFXLjt87i2z27esJyynLO_Fok3wnLZ7Oz4BdWiXrL8kOnXcwxGYCyl0wum_VVc=w1122-h910?auditContext=prefetch" 
        alt="Info icon" 
        class="info-icon"
      />
      <h3 class="info-title">상금 지급 안내</h3>
    </div>

    <ul class="info-list">
      <li class="info-item">
        누적 금액이 3만원 이상일 경우 지급신청이 가능
      </li>
      <li class="info-item">
        당첨자 세금신고를 위해 신분증 사본 제출 필요
      </li>
      <li class="info-item">
        상금지급 후 개인정보 즉시 파기
      </li>
      <li class="info-item">
        5만원 초과 시 제세공과금 (22%) 선공제 후 지급
      </li>
      <li class="info-item">
        다중계정은 당첨자 정보 확인 후 당첨 취소 될 수 있음
      </li>
      <li class="info-item">
        당첨자명과 예금주명 불일치 시 당첨금 지급 불가
      </li>
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
}

// Export the initialization function
window.eventDescriptionSection = {
  init: initEventDescriptionSection
};
