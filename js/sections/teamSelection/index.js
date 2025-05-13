
// Main entry point for team selection functionality
import { renderGames } from './render.js';
import { setupDateNavigationHandlers } from './handlers.js';

function initTeamSelectionSection() {
  const state = window.appState;
  const { today, currentDay } = state;
  const prevDay    = currentDay - 1;
  const nextDay    = currentDay + 1;
  const labelToday = currentDay === today ? 'Today' : currentDay;
  
  // Date Navigation
  const dateNavHtml = `
    <div class="date-navigation">
      <div class="date-nav-prev" id="date-nav-prev">
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-left"></div>
        </div>
        <span class="prev-day" id="prev-day">${prevDay}</span>
      </div>
      <span class="current-day" id="current-day">${labelToday}</span>
      <div class="date-nav-next" id="date-nav-next">
        <span class="next-day" id="next-day">${nextDay}</span>
        <div class="w-6 h-6 flex items-center justify-center">
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>
  `;
  
  // Container HTML
  let contentHtml = '';
  
  // Tomorrow's content (today + 1)
  if (state.currentDay === state.today + 1) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_FUv-qzayZ-hYSelKqB62YE0QJC6b3Co7TMQRKy6wzcvxhjpnbBIYUyB8zzMwICDTQtLb62Mfqbtcv6XmET7jvII8jvXwKYUQf5iFbc6Y9b6PjXWaCXtqQmw5KlcpvmlG1HhCa-MqgVChCvuu_tAlqWmwqNdPUdGcOHlyCKVHKaSr_NAD2IBU90iWoDd7nBZAsyyiTzBkUwyOYZr2RMlvxKutr_J0-JxHXLPz6itnJLQx06HXJfqsnKZ8H--Nz0Ia4ISpaVeRZTOu34nHw6EX9mMQ2mGiuojbjcrt1F5xhhIqFlqSfgaC6FjpMZL_7GFgplUwe9WGx8FH-Asob2yaUApoAVcOhpysOSp8PkZ-1fBagky3jKFmP8pM17ZU_5aPLzGyicZwccaXqZkyg0ZmIEM_YS7M6c9uj40bmNgWbXALH6T5hC8QlTTRoSryTtyEKbVMf3ilTqNmhF7NdZjU0hEyegCIpNCdjJR3q3NUClqxIlN4ECqIgItOJEUKsPPyxTF7VCevWcvwUjgHh4Hvt3oYS-B4aWDKsBMH4rq8HrqrF9bcXniVv_UUz1-gzV6_1ablX_T6vIHdMxEgY4mQ9pM09vGeZSSxRgvVMT4-WMw6YCP1zTkJ2Y5YQi8-zQNr22jnswUhdJk-XRZtw0YxwMVM-H_l5rRzHfZ_Z2El3nrBBIm_W0PdzbLz3Zx5rpBKG4-VLKqMA6pGWItBGLk4XGqwTuCKZKXOYDWNlWLdPDFO0aG6kDd_soboTLIxDS1Y1OdmEQLHXf9ohL7_rfE99So7AV60aUASW2VAQrsjzGarAyUNlU51CJ3FISVW87Gd8F00rFiMhc5FiEgnlvGKB_y6w9T9EosOI-WmrHtDi-9s7CL77O95VvJibEB_m3DvEpCz5OO2D2nkSQ4pYKmoQJ5Bmffr2zgDxI70KhVB_yOI7sf-DxQAALHLQA7-SW4HT05RGmBQL9LaWxY3WQAoGpvV4ZWu8XFb0FoNFEffIKFBPf6jD8T0dxO_493fr41RC0Ggb_IIXL0NNmVl78oNAtXjYsKA37DRYmIglhKDjifVXkUWIzLyorvjasLCZYMMU-Dpk0lykVp6Kl2j2P4GXhnAjWsnZ5axtFU70ONnC2w0H4woyrEcAjL9sHKjxm3dneOgtYKxLTlH3aXgKqtN6bF910o36D4zf4qEVuCBYZZxM8KLiAHSJDMADHGsM4wyKeqbXsTnkDSBrhGJMDPE9wuXvnvzM8qN2bC7kI0EwgZYU3c5mVxzXTTMY7urOoNv4DkvulNR952yFPt9OukOQ1khiQejnR0tgOHUc7lv276c_KrNlUR0rYu7yh0V_Yfi_MqX-SldMXDkOqNEoBSoTV3IcRIMe5EuSeFDbrl-9TWpiVQ_opL_clGYRh9mlmvnqdmUN17o3iiVUwMo9q9fhPSRsC-RBVEh6glAjaU8SRx4swTyNE2_tGawiWdnlxqko91e6U5pCH6Fs-81n3pKODbNGMK7ADtImhV73WqMvjN1_VKu2i4hwUOYOJsbhsYcGf8rjusgm5dqvqvgyNMrQG8rYSPE7oFMQz3HEG_pMERHPVc8VpT9RmY8AOzMcDZ0sRmgII-F653YZxumhoeO9Z=w1920-h911" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_ECFy69Sdqf5JwxTQB5o7WDkTuXRRIEvPFebie5nIAgqLmQe5R6WHaI6xzocXPJlSWLxSB6FTNB0eDe1FFjXMT6Guu-Z6V1Tk6APmqbKw0gw6Ze3wQAwgyGzvpsjJNorzpbrsbE4PLUgAsf6qlT9psBPiMggUot6wuIcW_VLxF1A9yX-ztZuC4WX1_j9qZJ_a5HGC0381G3i_bg5USY75zd7tzHZX6btC0bC4svChsQ_zsDZhFLPVSdNQBj9SS3wopEDjntAFLQ4N2wLCAeWVvKNpDLhjq9arzjF4vki4XwvaBADb1F62UMMPiKvQ2AABtWYtjFltE-GyYLUK3bn_3Nk-Zx_BhDpBuBrV_q4E8PTEEeCx1qUhmckj5I_r-f1uc__MWxqCSgzESZovT5NZzCXdX2gbNyBPo46nzjjnh7wTM5C3F7M9ZrpCWi77ArKBj82f-1vDth9hasGj5Gczbt-2URFQr2cvuZ3gnlMf9LaSp8APTyZBI5rF0iE-MS7-uPZrScdya0jKlml8nlqDXR6I8I59BRinTio6LOyOXfrnbNjHmxYYLkWlSIov9RNyotXwGMg8Lx6ILk0UCyedQEongt5VYKHU0QxV9iKPEJGtmQwe0aAyeNlJlt15eOIPBw3T1TVbVF_HBS30VHDz4UEKFko-ZZQCSNKSH760S7tBG5FV4tjH99uIbOUMKvFnxBTe9cm14cLFtmxB6Urf3AhV6YhdG4jWP7SKY3MFHoyl0Ywy8Zg0vzkfpix5vkmdp9Po7rTCtxhuBV1i6n4tScx9vs3i1XH-f5h8YFPCROS8YyNF08opaju9l9Sc6dhle1m7WYzvvufc2R0vgzxvVG_gzJb5Hb6qW7FWu0bdXsS6koQs4SUU9Q1QetwzbXR2OhESVaZpkZM-hq1M6Y6yZotyW4f-KpIxynlYudADkKAht7Xr6sGKLllHe5YF2sGKv24CgHJYuNlG7CQb97Kk3FONdX7IGaaZkbyQ8-4gDW_J2xrOQ8Aiq8SBA6zWsn-WQxai93bODtSWQ5zChVNXD6jjDTyZRVWRZJhXvNPOXB9ot3RLIPnO9CHv9uDWyifNX5AaahplCAMgh0WIAJal5Z_YwqPcTSRDPs2aw2eWK38BZNbBdF1zUFW8nP_9bS2ZF7X57xCtxL29rajX7T5_08YMhJygVWCm8e75GdBzrDGMybWDvBxAOlVt1cQf2-pxADz8Ai7p4ODhOyHmkj_dRjZBZzFeOoVqGykAJht6ZeKxlnHAUxiaF7NaD-yeJOOen-H9Hst3CB3Rr_Fjht6ZSvn8BMsCHIJosUilD5TfGjv81M_hBWXJbVstMat6R0NsqwklHLKhQqZnN1C_7kcZHrCdrqpZrBn0zZo8iKnn01sAvns1QkHMOJlOBhIkWylWFp2J_iQy1Y8yeT68diwKfG7tGKGJ4vnS2bf1WCvVlaM_4SVWf0Z2Ex88dynmpco3XT44xLt_xZqgn2xuhOtnDHpavNLLHSaa75tuBxJmLE0FOz_5qH3EyEypIEGS6kvyAOsu4svRsCeoksMCwJnKxoAJJLRYpvVEjznuamseNx0fE23JaatYBfE1sEWK1PSOHUqavofrKtqwfftoRo6yI=w1252-h911" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
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
  // Today's content (today)
  else if (state.currentDay === state.today) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_FUv-qzayZ-hYSelKqB62YE0QJC6b3Co7TMQRKy6wzcvxhjpnbBIYUyB8zzMwICDTQtLb62Mfqbtcv6XmET7jvII8jvXwKYUQf5iFbc6Y9b6PjXWaCXtqQmw5KlcpvmlG1HhCa-MqgVChCvuu_tAlqWmwqNdPUdGcOHlyCKVHKaSr_NAD2IBU90iWoDd7nBZAsyyiTzBkUwyOYZr2RMlvxKutr_J0-JxHXLPz6itnJLQx06HXJfqsnKZ8H--Nz0Ia4ISpaVeRZTOu34nHw6EX9mMQ2mGiuojbjcrt1F5xhhIqFlqSfgaC6FjpMZL_7GFgplUwe9WGx8FH-Asob2yaUApoAVcOhpysOSp8PkZ-1fBagky3jKFmP8pM17ZU_5aPLzGyicZwccaXqZkyg0ZmIEM_YS7M6c9uj40bmNgWbXALH6T5hC8QlTTRoSryTtyEKbVMf3ilTqNmhF7NdZjU0hEyegCIpNCdjJR3q3NUClqxIlN4ECqIgItOJEUKsPPyxTF7VCevWcvwUjgHh4Hvt3oYS-B4aWDKsBMH4rq8HrqrF9bcXniVv_UUz1-gzV6_1ablX_T6vIHdMxEgY4mQ9pM09vGeZSSxRgvVMT4-WMw6YCP1zTkJ2Y5YQi8-zQNr22jnswUhdJk-XRZtw0YxwMVM-H_l5rRzHfZ_Z2El3nrBBIm_W0PdzbLz3Zx5rpBKG4-VLKqMA6pGWItBGLk4XGqwTuCKZKXOYDWNlWLdPDFO0aG6kDd_soboTLIxDS1Y1OdmEQLHXf9ohL7_rfE99So7AV60aUASW2VAQrsjzGarAyUNlU51CJ3FISVW87Gd8F00rFiMhc5FiEgnlvGKB_y6w9T9EosOI-WmrHtDi-9s7CL77O95VvJibEB_m3DvEpCz5OO2D2nkSQ4pYKmoQJ5Bmffr2zgDxI70KhVB_yOI7sf-DxQAALHLQA7-SW4HT05RGmBQL9LaWxY3WQAoGpvV4ZWu8XFb0FoNFEffIKFBPf6jD8T0dxO_493fr41RC0Ggb_IIXL0NNmVl78oNAtXjYsKA37DRYmIglhKDjifVXkUWIzLyorvjasLCZYMMU-Dpk0lykVp6Kl2j2P4GXhnAjWsnZ5axtFU70ONnC2w0H4woyrEcAjL9sHKjxm3dneOgtYKxLTlH3aXgKqtN6bF910o36D4zf4qEVuCBYZZxM8KLiAHSJDMADHGsM4wyKeqbXsTnkDSBrhGJMDPE9wuXvnvzM8qN2bC7kI0EwgZYU3c5mVxzXTTMY7urOoNv4DkvulNR952yFPt9OukOQ1khiQejnR0tgOHUc7lv276c_KrNlUR0rYu7yh0V_Yfi_MqX-SldMXDkOqNEoBSoTV3IcRIMe5EuSeFDbrl-9TWpiVQ_opL_clGYRh9mlmvnqdmUN17o3iiVUwMo9q9fhPSRsC-RBVEh6glAjaU8SRx4swTyNE2_tGawiWdnlxqko91e6U5pCH6Fs-81n3pKODbNGMK7ADtImhV73WqMvjN1_VKu2i4hwUOYOJsbhsYcGf8rjusgm5dqvqvgyNMrQG8rYSPE7oFMQz3HEG_pMERHPVc8VpT9RmY8AOzMcDZ0sRmgII-F653YZxumhoeO9Z=w1920-h911" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_ECFy69Sdqf5JwxTQB5o7WDkTuXRRIEvPFebie5nIAgqLmQe5R6WHaI6xzocXPJlSWLxSB6FTNB0eDe1FFjXMT6Guu-Z6V1Tk6APmqbKw0gw6Ze3wQAwgyGzvpsjJNorzpbrsbE4PLUgAsf6qlT9psBPiMggUot6wuIcW_VLxF1A9yX-ztZuC4WX1_j9qZJ_a5HGC0381G3i_bg5USY75zd7tzHZX6btC0bC4svChsQ_zsDZhFLPVSdNQBj9SS3wopEDjntAFLQ4N2wLCAeWVvKNpDLhjq9arzjF4vki4XwvaBADb1F62UMMPiKvQ2AABtWYtjFltE-GyYLUK3bn_3Nk-Zx_BhDpBuBrV_q4E8PTEEeCx1qUhmckj5I_r-f1uc__MWxqCSgzESZovT5NZzCXdX2gbNyBPo46nzjjnh7wTM5C3F7M9ZrpCWi77ArKBj82f-1vDth9hasGj5Gczbt-2URFQr2cvuZ3gnlMf9LaSp8APTyZBI5rF0iE-MS7-uPZrScdya0jKlml8nlqDXR6I8I59BRinTio6LOyOXfrnbNjHmxYYLkWlSIov9RNyotXwGMg8Lx6ILk0UCyedQEongt5VYKHU0QxV9iKPEJGtmQwe0aAyeNlJlt15eOIPBw3T1TVbVF_HBS30VHDz4UEKFko-ZZQCSNKSH760S7tBG5FV4tjH99uIbOUMKvFnxBTe9cm14cLFtmxB6Urf3AhV6YhdG4jWP7SKY3MFHoyl0Ywy8Zg0vzkfpix5vkmdp9Po7rTCtxhuBV1i6n4tScx9vs3i1XH-f5h8YFPCROS8YyNF08opaju9l9Sc6dhle1m7WYzvvufc2R0vgzxvVG_gzJb5Hb6qW7FWu0bdXsS6koQs4SUU9Q1QetwzbXR2OhESVaZpkZM-hq1M6Y6yZotyW4f-KpIxynlYudADkKAht7Xr6sGKLllHe5YF2sGKv24CgHJYuNlG7CQb97Kk3FONdX7IGaaZkbyQ8-4gDW_J2xrOQ8Aiq8SBA6zWsn-WQxai93bODtSWQ5zChVNXD6jjDTyZRVWRZJhXvNPOXB9ot3RLIPnO9CHv9uDWyifNX5AaahplCAMgh0WIAJal5Z_YwqPcTSRDPs2aw2eWK38BZNbBdF1zUFW8nP_9bS2ZF7X57xCtxL29rajX7T5_08YMhJygVWCm8e75GdBzrDGMybWDvBxAOlVt1cQf2-pxADz8Ai7p4ODhOyHmkj_dRjZBZzFeOoVqGykAJht6ZeKxlnHAUxiaF7NaD-yeJOOen-H9Hst3CB3Rr_Fjht6ZSvn8BMsCHIJosUilD5TfGjv81M_hBWXJbVstMat6R0NsqwklHLKhQqZnN1C_7kcZHrCdrqpZrBn0zZo8iKnn01sAvns1QkHMOJlOBhIkWylWFp2J_iQy1Y8yeT68diwKfG7tGKGJ4vnS2bf1WCvVlaM_4SVWf0Z2Ex88dynmpco3XT44xLt_xZqgn2xuhOtnDHpavNLLHSaa75tuBxJmLE0FOz_5qH3EyEypIEGS6kvyAOsu4svRsCeoksMCwJnKxoAJJLRYpvVEjznuamseNx0fE23JaatYBfE1sEWK1PSOHUqavofrKtqwfftoRo6yI=w1252-h911" 
            alt="Pointing finger right" 
            class="pointing-finger pointing-finger-right"
          />
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            <span class="button-line">2경기 성공!</span>
            <span class="button-line">채점 중</span>
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  // Yesterday's content (today - 1)
  else if (state.currentDay === state.today - 1) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
       <h2 class="team-selection-title">
         다음 경기 도전!
         <img 
           src="https://lh3.googleusercontent.com/fife/ALs6j_HDqpSkW_tSXGLmnHJLh2DlvBwNtY7IQ49dGWXqy2m53PVXYtpiRhqXmfPN_YN6NxC13OX-WqKZO81M63eY4ls5iNSnPfR5WYYQpX_udEd3qZTAkhzzyMfgYp_-A0B6-Wf9rgou8ZgHEtteVflXllGseYJl73NC-BMqRP2BrRO_foDTYJC9Xihn8y9cIfb8Y8YrIdU4lh-8si4PbQKq54XmrGvBszMSarNUy8Weoo0o2kqbt4nG-kXFjwfvwWlNIZZn8eH6nPhtXl_mlemCiNE5MxLsBI0gbtYgTVxZcOOSuaKXdYzWznpQ2htjGpsjI--4cTayw9xyNPmP2qvd-bOQwoct0wsTfDqgYdqLFU6jY65oSadEJznxZOprbKTbM4edJ7bARkUaBGn4pospKNTB4F9R3gnXwL0pc20BkfUFbVJ6Wuj3yykmeDOGpw1u0TyhqeYVuonG2xHOelGVvD6p0m8-FIrZgtR00RMvDt3DZ_hyMA1sSoSGjOz_waxMCasGPJSIj76Ue5WSbNIArITprWw0pNoCDc_Wrof2LjoWxtXDvf626c0OtGxnqQVgESVCK7jEx5iEyEFY0Z9PViZEB-vZgC4FT6jqTzaQlhsWerwSzLgcR5SfaD5sW1BxrrJuLF2tRbsxgcCDeeXAjDi4j10FF1uSD9u2oq1r7I5wcv_FJiApHzisM-xLJFMRh2utmE8q6HKoFkgXRIxnCDcA56FR0qBzBUowtSmP6TrN565T9PjpRpd0iWDTRVww3dyu1Ie4u4xe_2zIhyInjdhueATgAgZNo1gu3T_rLGwA2id4MeLn-sQU_OoGAYdkfIkRbjmwMofUhwEBgsvskOY_CzUwcwCMSbdd5EJhXwBJjVG6exrBiMppm-3VOcp4uWPzWIzQGaXQ_D56jASJmSoKQcUiLatO4ONsaFSjQGugU0GEnuuaAPtcn6Ot9p4vNqFomQwP8tYxfZN0EKzVloRtvG9WST0jZWxQHGzzDBJEHq2cqmAzY-EyQ3efAH68l-yj2dVtypMJUo8V5HklcHcCl_qg5WAzStPRlnKOLkUBjaimDQ7-M_51Fm75FCaGbU4HXbSGEIyW-w18PLxay5w4_pTM1kg5HMaaJfJSOwm6HnGoEt4d3w1klOKqoZ55KMMzjjVQoCrBNVAxsJklKdMgGM804-fcvJN1OkuN6_-tSXDO3OKZ1pgbkqbOCGIWRktIjIND5JaeHhmTDdSIljZxXd5zVdvgZzIBWeUMHKNJs7D7q1sDX5ipBQyqAlkzKHylYQoXj4gkNZXGqIHt_PkdTDGzHhYNnMCWnzhjeq8wbYN-XSYke5RgUNKc6jpWVMpeWnPlDCGXMJpQe60ooRQ1HpOsYiXTPEBFVaBbXGpoPvdj8HCOk08RnN-z-TAuHv6QQ9Js6HzDyg9BShPR4eJk5hC4IwFum7zrVLbeO5hx6C7SET56egUwPeoCoakF9Qa5b-Zkw5_nTVPH-pyTiQen2K7U9lEZT5w_2WA6WbWjDy7wUK6vmBXzeMHoGPvc1fT4gHci79WwVc894Gb_mLzlxoF7-W24HCRSHV6l3Q0ia1MVWF4oSk0kJWwWYubNVaKVlh7reAXqgBhj0WJjcRZY=w1252-h911" 
           alt="결과 아이콘" 
           class="yesterday-icon right"
         />
       </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            다음 경기 도전!
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  // Day before yesterday's content (today - 2)
  else if (state.currentDay === state.today - 2) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day24" style="position: relative;">
        <h2 class="team-selection-title">올킬 성공!</h2>
        <img
          src="https://lh3.googleusercontent.com/fife/ALs6j_GT5YxcaSqX2iyIErjMVPJfQ7OmdMekwiRJkHYu7o62864VXkU8kAa1qGXFfQlawpn1aXsWd7fxwTVG7UKYGrnhXS_WIRvBNinyai6ywENf71nZe8tqQo50zLLSNiiyhhS5jABjfWH-iYtzbLhSaDpWN-1uVvid_bL1mza9hLBOpx7zGR8iGpaJUzFzE_OxJJoLSMUpkhli8Qmo4JKzlfXYc3Iy-2faGqk9H48VvJyM4qZ7GNsR7UrMrzBGD3plqyJiRYF-q317NvdSztBvdjgDMN-0ofMITg05X5bsu5-_oRp_LJ1gQcG3FC8DxbR1oqKuaaLm3cQCQAVg-tMUsJO4wbTa0KhEeuZUt7VV67fT_KIiizWhAbteM7e2c2fLwZlJTp5EDeQ97Ii7tuLjigsFgKX4Gjbkwcp1TJi9G4UGv2ZtzJsunfxXrmlExa5koIWTtaw-p9LAAnLy8RCcRWTZTBUjAmWePjBrbpHIGQbQ7RlKziiKyn8zGiqJF2oDDxTtMRxNwXn_62Lb-tl66vGwWLP8N0iHo5wML-DweBh5liRCzBCHqXjilkGkFSl182AtcDm-I4I07RUbBxPA6bdfI52D5fsEEWyFvGboNC4cUuehFsjmenlrheJWZrv5THl_S_1DugWAmxmnuujPQzGXyJz8w9qZCs26frtuU8g2p5v0MwDPuDhQrRFz-SxMbaTQnmLSWHJHeIasaEFaFvBCtylp9PCCm_eQu7HDqGIOw6iLPQuzps90uRKVkjVK3XeyVzAEHPdqgE9I_h8ySZJVlVU-vQ-rS_3LQF14Qgm87diTi6YBFtQGVKNqUBZib78m_p4ZMxAoNt4E2M38Q2bY6-rliCmsN76c2aQB32WMfVBdLpkPP6t0nZ1FKEoDONhLzcHCktrBaXuhTpjogs7nvrZ41hhrHCvtxMFP9t0kkQJ4yTuQnNTHbXNYtVJAAEGYIcvd9PQ_MgkXba4_cW_5L5N0kyKGPPCSUxPQUf4Zueb5ZV-Da93ERLGDTUzHENc1gWrdU4YFHh4YDOUP-2h9F_bEFxgzyAalPZOoNQIsgJ01-xksgJOfN5a2_x7BDkFuSYGtQf9dzz01rGXhhRtlahg25aIyGaIx8xY6Qm6jhz_RVK1SZoxQZxMFuhF9SwsYCXKs4T3mciVgzNpkvoAZP5CzGzJvgJD2a68f37RRzqyklpmrjchfKu6HsPLxLqjHfS1SYr58ZBbliAabIgFp6JTrnVWCWx1Clu3NCL23PAYwUMXWtbu2nl3tsMFBeK-rAj9tdSSLjAOEqbGn-Kr1Nq0vF1sz306ZK8zDaxirEpuAOT0lO5rHta1s3U3HdH1gYLDkBJ4-Ju1JeoeapkWm6V9jDTkGlb130CZfr8wueZSf7cxe_8rfl2os5FzLnEbCytFrQAhMInH68jtx0tlw-NEir0XtabwqvjLMBtZ7EEQYBHXQOKC7rTd5cbhFz8YKxqwgbb2r-I3U6rik9fbMjwUP8Z-QFuHHagp9Bh-Wd4oARj_-0RTkM2xPlL5HMXV2ZBImd4EhSC7NuUIqi-Qz3lJF6mCcjtUumWrucy_u1st_7WDHXxcGiVOqGXIqGr0xXpIejsi5FFwJmD-ILCCS=w1920-h911"
          alt="올킬 도장"
          class="allkill-stamp"
        />
        <div class="game-list" id="day24-game-list"></div>
         <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            올킬 성공!
            <div class="spark"></div>
            <div class="spark"></div>
            <div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  // Placeholder for other dates
  else {
    contentHtml = `
      <div class="team-selection-placeholder" id="team-selection-placeholder">
        <div class="flex justify-center items-center h-[400px] text-white text-lg">
          이 날짜의 데이터가 없습니다.
        </div>
      </div>
    `;
  }
  
  // Combine date navigation and content
  $('#kbo-selection-container').html(dateNavHtml + contentHtml);
  renderGames();
  setupDateNavigationHandlers();
}

// Export the module functions
export default {
  init: initTeamSelectionSection,
  updateTeamSelections: function() {
    const { updateTeamSelections } = require('./handlers.js');
    updateTeamSelections();
  }
};
