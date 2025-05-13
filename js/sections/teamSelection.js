function initTeamSelectionSection() {
  const { today, currentDay } = window.appState;
  
  // 계산
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
  
  // Tomorrow’s content (today + 1)
  if (state.currentDay === state.today + 1) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_FUv-qzayZ-hYSelKqB62YE0QJC6b3Co7TMQRKy6wzcvxhjpnbBIYUyB8zzMwICDTQtLb62Mfqbtcv6XmET7jvII8jvXwKYUQf5iFbc6Y9b6PjXWaCXtqQmw5KlcpvmlG1HhCa-MqgVChCvuu_tAlqWmwqNdPUdGcOHlyCKVHKaSr_NAD2IBU90iWoDd7nBZAsyyiTzBkUwyOYZr2RMlvxKutr_J0-JxHXLPz6itnJLQx06HXJfqsnKZ8H--Nz0Ia4ISpaVeRZTOu34nHw6EX9mMQ2mGiuojbjcrt1F5xhhIqFlqSfgaC6FjpMZL_7GFgplUwe9WGx8FH-Asob2yaUApoAVcOhpysOSp8PkZ-1fBagky3jKFmP8pM17ZU_5aPLzGyicZwccaXqZkyg0ZmIEM_YS7M6c9uj40bmNgWbXALH6T5hC8QlTTRoSryTtyEKbVMf3ilTqNmhF7NdZjU0hEyegCIpNCdjJR3q3NUClqxIlN4ECqIgItOJEUKsPPyxTF7VCevWcvwUjgHh4Hvt3oYS-B4aWDKsBMH4rq8HrqrF9bcXniVv_UUz1-gzV6_1ablX_T6vIHdMxEgY4mQ9pM09vGeZSSxRgvVMT4-WMw6YCP1zTkJ2Y5YQi8-zQNr22jnswUhdJk-XRZtw0YxwMVM-H_l5rRzHfZ_Z2El3nrBBIm_W0PdzbLz3Zx5rpBKG4-VLKqMA6pGWItBGLk4XGqwTuCKZKXOYDWNlWLdPDFO0aG6kDd_soboTLIxDS1Y1OdmEQLHXf9ohL7_rfE99So7AV60aUASW2VAQrsjzGarAyUNlU51CJ3FISVW87Gd8F00rFiMhc5FiEgnlvGKB_y6w9T9EosOI-WmrHtDi-9s7CL77O95VvJibEB_m3DvEpCz5OO2D2nkSQ4pYKmoQJ5Bmffr2zgDxI70KhVB_yOI7sf-DxQAALHLQA7-SW4HT05RGmBQL9LaWxY3WQAoGpvV4ZWu8XFb0FoNFEffIKFBPf6jD8T0dxO_493fr41RC0Ggb_IIXL0NNmVl78oNAtXjYsKA37DRYmIglhKDjifVXkUWIzLyorvjasLCZYMMU-Dpk0lykVp6Kl2j2P4GXhnAjWsnZ5axtFU70ONnC2w0H4woyrEcAjL9sHKjxm3dneOgtYKxLTlH3aXgKqtN6bF910o36D4zf4qEVuCBYZZxM8KLiAHSJDMADHGsM4wyKeqbXsTnkDSBrhGJMDPE9wuXvnvzM8qN2bC7kI0EwgZYU3c5mVxzXTTMY7urOoNv4DkvulNR952yFPt9OukOQ1khiQejnR0tgOHUc7lv276c_KrNlUR0rYu7yh0V_Yfi_MqX-SldMXDkOqNEoBSoTV3IcRIMe5EuSeFDbrl-9TWpiVQ_opL_clGYRh9mlmvnqdmUN17o3iiVUwMo9q9fhPSRsC-RBVEh6glAjaU8SRx4swTyNE2_tGawiWdnlxqko91e6U5pCH6Fs-81n3pKODbNGMK7ADtImhV73WqMvjN1_VKu2i4hwUOYOJsbhsYcGf8rjusgm5dqvqvgyNMrQG8rYSPE7oFMQz3HEG_pMERHPVc8VpT9RmY8AOzMcDZ0sRmgII-F653YZxumhoeO9Z=w1920-h911?auditContext=prefetch" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_ECFy69Sdqf5JwxTQB5o7WDkTuXRRIEvPFebie5nIAgqLmQe5R6WHaI6xzocXPJlSWLxSB6FTNB0eDe1FFjXMT6Guu-Z6V1Tk6APmqbKw0gw6Ze3wQAwgyGzvpsjJNorzpbrsbE4PLUgAsf6qlT9psBPiMggUot6wuIcW_VLxF1A9yX-ztZuC4WX1_j9qZJ_a5HGC0381G3i_bg5USY75zd7tzHZX6btC0bC4svChsQ_zsDZhFLPVSdNQBj9SS3wopEDjntAFLQ4N2wLCAeWVvKNpDLhjq9arzjF4vki4XwvaBADb1F62UMMPiKvQ2AABtWYtjFltE-GyYLUK3bn_3Nk-Zx_BhDpBuBrV_q4E8PTEEeCx1qUhmckj5I_r-f1uc__MWxqCSgzESZovT5NZzCXdX2gbNyBPo46nzjjnh7wTM5C3F7M9ZrpCWi77ArKBj82f-1vDth9hasGj5Gczbt-2URFQr2cvuZ3gnlMf9LaSp8APTyZBI5rF0iE-MS7-uPZrScdya0jKlml8nlqDXR6I8I59BRinTio6LOyOXfrnbNjHmxYYLkWlSIov9RNyotXwGMg8Lx6ILk0UCyedQEongt5VYKHU0QxV9iKPEJGtmQwe0aAyeNlJlt15eOIPBw3T1TVbVF_HBS30VHDz4UEKFko-ZZQCSNKSH760S7tBG5FV4tjH99uIbOUMKvFnxBTe9cm14cLFtmxB6Urf3AhV6YhdG4jWP7SKY3MFHoyl0Ywy8Zg0vzkfpix5vkmdp9Po7rTCtxhuBV1i6n4tScx9vs3i1XH-f5h8YFPCROS8YyNF08opaju9l9Sc6dhle1m7WYzvvufc2R0vgzxvVG_gzJb5Hb6qW7FWu0bdXsS6koQs4SUU9Q1QetwzbXR2OhESVaZpkZM-hq1M6Y6yZotyW4f-KpIxynlYudADkKAht7Xr6sGKLllHe5YF2sGKv24CgHJYuNlG7CQb97Kk3FONdX7IGaaZkbyQ8-4gDW_J2xrOQ8Aiq8SBA6zWsn-WQxai93bODtSWQ5zChVNXD6jjDTyZRVWRZJhXvNPOXB9ot3RLIPnO9CHv9uDWyifNX5AaahplCAMgh0WIAJal5Z_YwqPcTSRDPs2aw2eWK38BZNbBdF1zUFW8nP_9bS2ZF7X57xCtxL29rajX7T5_08YMhJygVWCm8e75GdBzrDGMybWDvBxAOlVt1cQf2-pxADz8Ai7p4ODhOyHmkj_dRjZBZzFeOoVqGykAJht6ZeKxlnHAUxiaF7NaD-yeJOOen-H9Hst3CB3Rr_Fjht6ZSvn8BMsCHIJosUilD5TfGjv81M_hBWXJbVstMat6R0NsqwklHLKhQqZnN1C_7kcZHrCdrqpZrBn0zZo8iKnn01sAvns1QkHMOJlOBhIkWylWFp2J_iQy1Y8yeT68diwKfG7tGKGJ4vnS2bf1WCvVlaM_4SVWf0Z2Ex88dynmpco3XT44xLt_xZqgn2xuhOtnDHpavNLLHSaa75tuBxJmLE0FOz_5qH3EyEypIEGS6kvyAOsu4svRsCeoksMCwJnKxoAJJLRYpvVEjznuamseNx0fE23JaatYBfE1sEWK1PSOHUqavofrKtqwfftoRo6yI=w1252-h911?auditContext=prefetch" 
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
  // Today’s content (today)
  else if (state.currentDay === state.today) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_FUv-qzayZ-hYSelKqB62YE0QJC6b3Co7TMQRKy6wzcvxhjpnbBIYUyB8zzMwICDTQtLb62Mfqbtcv6XmET7jvII8jvXwKYUQf5iFbc6Y9b6PjXWaCXtqQmw5KlcpvmlG1HhCa-MqgVChCvuu_tAlqWmwqNdPUdGcOHlyCKVHKaSr_NAD2IBU90iWoDd7nBZAsyyiTzBkUwyOYZr2RMlvxKutr_J0-JxHXLPz6itnJLQx06HXJfqsnKZ8H--Nz0Ia4ISpaVeRZTOu34nHw6EX9mMQ2mGiuojbjcrt1F5xhhIqFlqSfgaC6FjpMZL_7GFgplUwe9WGx8FH-Asob2yaUApoAVcOhpysOSp8PkZ-1fBagky3jKFmP8pM17ZU_5aPLzGyicZwccaXqZkyg0ZmIEM_YS7M6c9uj40bmNgWbXALH6T5hC8QlTTRoSryTtyEKbVMf3ilTqNmhF7NdZjU0hEyegCIpNCdjJR3q3NUClqxIlN4ECqIgItOJEUKsPPyxTF7VCevWcvwUjgHh4Hvt3oYS-B4aWDKsBMH4rq8HrqrF9bcXniVv_UUz1-gzV6_1ablX_T6vIHdMxEgY4mQ9pM09vGeZSSxRgvVMT4-WMw6YCP1zTkJ2Y5YQi8-zQNr22jnswUhdJk-XRZtw0YxwMVM-H_l5rRzHfZ_Z2El3nrBBIm_W0PdzbLz3Zx5rpBKG4-VLKqMA6pGWItBGLk4XGqwTuCKZKXOYDWNlWLdPDFO0aG6kDd_soboTLIxDS1Y1OdmEQLHXf9ohL7_rfE99So7AV60aUASW2VAQrsjzGarAyUNlU51CJ3FISVW87Gd8F00rFiMhc5FiEgnlvGKB_y6w9T9EosOI-WmrHtDi-9s7CL77O95VvJibEB_m3DvEpCz5OO2D2nkSQ4pYKmoQJ5Bmffr2zgDxI70KhVB_yOI7sf-DxQAALHLQA7-SW4HT05RGmBQL9LaWxY3WQAoGpvV4ZWu8XFb0FoNFEffIKFBPf6jD8T0dxO_493fr41RC0Ggb_IIXL0NNmVl78oNAtXjYsKA37DRYmIglhKDjifVXkUWIzLyorvjasLCZYMMU-Dpk0lykVp6Kl2j2P4GXhnAjWsnZ5axtFU70ONnC2w0H4woyrEcAjL9sHKjxm3dneOgtYKxLTlH3aXgKqtN6bF910o36D4zf4qEVuCBYZZxM8KLiAHSJDMADHGsM4wyKeqbXsTnkDSBrhGJMDPE9wuXvnvzM8qN2bC7kI0EwgZYU3c5mVxzXTTMY7urOoNv4DkvulNR952yFPt9OukOQ1khiQejnR0tgOHUc7lv276c_KrNlUR0rYu7yh0V_Yfi_MqX-SldMXDkOqNEoBSoTV3IcRIMe5EuSeFDbrl-9TWpiVQ_opL_clGYRh9mlmvnqdmUN17o3iiVUwMo9q9fhPSRsC-RBVEh6glAjaU8SRx4swTyNE2_tGawiWdnlxqko91e6U5pCH6Fs-81n3pKODbNGMK7ADtImhV73WqMvjN1_VKu2i4hwUOYOJsbhsYcGf8rjusgm5dqvqvgyNMrQG8rYSPE7oFMQz3HEG_pMERHPVc8VpT9RmY8AOzMcDZ0sRmgII-F653YZxumhoeO9Z=w1920-h911?auditContext=prefetch" 
            alt="Pointing finger left" 
            class="pointing-finger pointing-finger-left"
          />
          올킬 도전!
          <img 
            src="https://lh3.googleusercontent.com/fife/ALs6j_ECFy69Sdqf5JwxTQB5o7WDkTuXRRIEvPFebie5nIAgqLmQe5R6WHaI6xzocXPJlSWLxSB6FTNB0eDe1FFjXMT6Guu-Z6V1Tk6APmqbKw0gw6Ze3wQAwgyGzvpsjJNorzpbrsbE4PLUgAsf6qlT9psBPiMggUot6wuIcW_VLxF1A9yX-ztZuC4WX1_j9qZJ_a5HGC0381G3i_bg5USY75zd7tzHZX6btC0bC4svChsQ_zsDZhFLPVSdNQBj9SS3wopEDjntAFLQ4N2wLCAeWVvKNpDLhjq9arzjF4vki4XwvaBADb1F62UMMPiKvQ2AABtWYtjFltE-GyYLUK3bn_3Nk-Zx_BhDpBuBrV_q4E8PTEEeCx1qUhmckj5I_r-f1uc__MWxqCSgzESZovT5NZzCXdX2gbNyBPo46nzjjnh7wTM5C3F7M9ZrpCWi77ArKBj82f-1vDth9hasGj5Gczbt-2URFQr2cvuZ3gnlMf9LaSp8APTyZBI5rF0iE-MS7-uPZrScdya0jKlml8nlqDXR6I8I59BRinTio6LOyOXfrnbNjHmxYYLkWlSIov9RNyotXwGMg8Lx6ILk0UCyedQEongt5VYKHU0QxV9iKPEJGtmQwe0aAyeNlJlt15eOIPBw3T1TVbVF_HBS30VHDz4UEKFko-ZZQCSNKSH760S7tBG5FV4tjH99uIbOUMKvFnxBTe9cm14cLFtmxB6Urf3AhV6YhdG4jWP7SKY3MFHoyl0Ywy8Zg0vzkfpix5vkmdp9Po7rTCtxhuBV1i6n4tScx9vs3i1XH-f5h8YFPCROS8YyNF08opaju9l9Sc6dhle1m7WYzvvufc2R0vgzxvVG_gzJb5Hb6qW7FWu0bdXsS6koQs4SUU9Q1QetwzbXR2OhESVaZpkZM-hq1M6Y6yZotyW4f-KpIxynlYudADkKAht7Xr6sGKLllHe5YF2sGKv24CgHJYuNlG7CQb97Kk3FONdX7IGaaZkbyQ8-4gDW_J2xrOQ8Aiq8SBA6zWsn-WQxai93bODtSWQ5zChVNXD6jjDTyZRVWRZJhXvNPOXB9ot3RLIPnO9CHv9uDWyifNX5AaahplCAMgh0WIAJal5Z_YwqPcTSRDPs2aw2eWK38BZNbBdF1zUFW8nP_9bS2ZF7X57xCtxL29rajX7T5_08YMhJygVWCm8e75GdBzrDGMybWDvBxAOlVt1cQf2-pxADz8Ai7p4ODhOyHmkj_dRjZBZzFeOoVqGykAJht6ZeKxlnHAUxiaF7NaD-yeJOOen-H9Hst3CB3Rr_Fjht6ZSvn8BMsCHIJosUilD5TfGjv81M_hBWXJbVstMat6R0NsqwklHLKhQqZnN1C_7kcZHrCdrqpZrBn0zZo8iKnn01sAvns1QkHMOJlOBhIkWylWFp2J_iQy1Y8yeT68diwKfG7tGKGJ4vnS2bf1WCvVlaM_4SVWf0Z2Ex88dynmpco3XT44xLt_xZqgn2xuhOtnDHpavNLLHSaa75tuBxJmLE0FOz_5qH3EyEypIEGS6kvyAOsu4svRsCeoksMCwJnKxoAJJLRYpvVEjznuamseNx0fE23JaatYBfE1sEWK1PSOHUqavofrKtqwfftoRo6yI=w1252-h911?auditContext=prefetch" 
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
  // Yesterday’s content (today - 1)
  else if (state.currentDay === state.today - 1) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
     <h2 class="team-selection-title">
       다음 경기 도전 !<br/>
       <span class="subtitle">3 경기 성공!</span>
         <img 
           src="https://lh3.googleusercontent.com/fife/ALs6j_HDqpSkW_tSXGLmnHJLh2DlvBwNtY7IQ49dGWXqy2m53PVXYtpiRhqXmfPN_YN6NxC13OX-WqKZO81M63eY4ls5iNSnPfR5WYYQpX_udEd3qZTAkhzzyMfgYp_-A0B6-Wf9rgou8ZgHEtteVflXllGseYJl73NC-BMqRP2BrRO_foDTYJC9Xihn8y9cIfb8Y8YrIdU4lh-8si4PbQKq54XmrGvBszMSarNUy8Weoo0o2kqbt4nG-kXFjwfvwWlNIZZn8eH6nPhtXl_mlemCiNE5MxLsBI0gbtYgTVxZcOOSuaKXdYzWznpQ2htjGpsjI--4cTayw9xyNPmP2qvd-bOQwoct0wsTfDqgYdqLFU6jY65oSadEJznxZOprbKTbM4edJ7bARkUaBGn4pospKNTB4F9R3gnXwL0pc20BkfUFbVJ6Wuj3yykmeDOGpw1u0TyhqeYVuonG2xHOelGVvD6p0m8-FIrZgtR00RMvDt3DZ_hyMA1sSoSGjOz_waxMCasGPJSIj76Ue5WSbNIArITprWw0pNoCDc_Wrof2LjoWxtXDvf626c0OtGxnqQVgESVCK7jEx5iEyEFY0Z9PViZEB-vZgC4FT6jqTzaQlhsWerwSzLgcR5SfaD5sW1BxrrJuLF2tRbsxgcCDeeXAjDi4j10FF1uSD9u2oq1r7I5wcv_FJiApHzisM-xLJFMRh2utmE8q6HKoFkgXRIxnCDcA56FR0qBzBUowtSmP6TrN565T9PjpRpd0iWDTRVww3dyu1Ie4u4xe_2zIhyInjdhueATgAgZNo1gu3T_rLGwA2id4MeLn-sQU_OoGAYdkfIkRbjmwMofUhwEBgsvskOY_CzUwcwCMSbdd5EJhXwBJjVG6exrBiMppm-3VOcp4uWPzWIzQGaXQ_D56jASJmSoKQcUiLatO4ONsaFSjQGugU0GEnuuaAPtcn6Ot9p4vNqFomQwP8tYxfZN0EKzVloRtvG9WST0jZWxQHGzzDBJEHq2cqmAzY-EyQ3efAH68l-yj2dVtypMJUo8V5HklcHcCl_qg5WAzStPRlnKOLkUBjaimDQ7-M_51Fm75FCaGbU4HXbSGEIyW-w18PLxay5w4_pTM1kg5HMaaJfJSOwm6HnGoEt4d3w1klOKqoZ55KMMzjjVQoCrBNVAxsJklKdMgGM804-fcvJN1OkuN6_-tSXDO3OKZ1pgbkqbOCGIWRktIjIND5JaeHhmTDdSIljZxXd5zVdvgZzIBWeUMHKNJs7D7q1sDX5ipBQyqAlkzKHylYQoXj4gkNZXGqIHt_PkdTDGzHhYNnMCWnzhjeq8wbYN-XSYke5RgUNKc6jpWVMpeWnPlDCGXMJpQe60ooRQ1HpOsYiXTPEBFVaBbXGpoPvdj8HCOk08RnN-z-TAuHv6QQ9Js6HzDyg9BShPR4eJk5hC4IwFum7zrVLbeO5hx6C7SET56egUwPeoCoakF9Qa5b-Zkw5_nTVPH-pyTiQen2K7U9lEZT5w_2WA6WbWjDy7wUK6vmBXzeMHoGPvc1fT4gHci79WwVc894Gb_mLzlxoF7-W24HCRSHV6l3Q0ia1MVWF4oSk0kJWwWYubNVaKVlh7reAXqgBhj0WJjcRZY=w1252-h911?auditContext=prefetch" 
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
  // Day before yesterday’s content (today - 2)
  else if (state.currentDay === state.today - 2) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day24" style="position: relative;">
        <h2 class="team-selection-title">올킬 성공!</h2>
        <img
          src="https://lh3.googleusercontent.com/fife/ALs6j_GT5YxcaSqX2iyIErjMVPJfQ7OmdMekwiRJkHYu7o62864VXkU8kAa1qGXFfQlawpn1aXsWd7fxwTVG7UKYGrnhXS_WIRvBNinyai6ywENf71nZe8tqQo50zLLSNiiyhhS5jABjfWH-iYtzbLhSaDpWN-1uVvid_bL1mza9hLBOpx7zGR8iGpaJUzFzE_OxJJoLSMUpkhli8Qmo4JKzlfXYc3Iy-2faGqk9H48VvJyM4qZ7GNsR7UrMrzBGD3plqyJiRYF-q317NvdSztBvdjgDMN-0ofMITg05X5bsu5-_oRp_LJ1gQcG3FC8DxbR1oqKuaaLm3cQCQAVg-tMUsJO4wbTa0KhEeuZUt7VV67fT_KIiizWhAbteM7e2c2fLwZlJTp5EDeQ97Ii7tuLjigsFgKX4Gjbkwcp1TJi9G4UGv2ZtzJsunfxXrmlExa5koIWTtaw-p9LAAnLy8RCcRWTZTBUjAmWePjBrbpHIGQbQ7RlKziiKyn8zGiqJF2oDDxTtMRxNwXn_62Lb-tl66vGwWLP8N0iHo5wML-DweBh5liRCzBCHqXjilkGkFSl182AtcDm-I4I07RUbBxPA6bdfI52D5fsEEWyFvGboNC4cUuehFsjmenlrheJWZrv5THl_S_1DugWAmxmnuujPQzGXyJz8w9qZCs26frtuU8g2p5v0MwDPuDhQrRFz-SxMbaTQnmLSWHJHeIasaEFaFvBCtylp9PCCm_eQu7HDqGIOw6iLPQuzps90uRKVkjVK3XeyVzAEHPdqgE9I_h8ySZJVlVU-vQ-rS_3LQF14Qgm87diTi6YBFtQGVKNqUBZib78m_p4ZMxAoNt4E2M38Q2bY6-rliCmsN76c2aQB32WMfVBdLpkPP6t0nZ1FKEoDONhLzcHCktrBaXuhTpjogs7nvrZ41hhrHCvtxMFP9t0kkQJ4yTuQnNTHbXNYtVJAAEGYIcvd9PQ_MgkXba4_cW_5L5N0kyKGPPCSUxPQUf4Zueb5ZV-Da93ERLGDTUzHENc1gWrdU4YFHh4YDOUP-2h9F_bEFxgzyAalPZOoNQIsgJ01-xksgJOfN5a2_x7BDkFuSYGtQf9dzz01rGXhhRtlahg25aIyGaIx8xY6Qm6jhz_RVK1SZoxQZxMFuhF9SwsYCXKs4T3mciVgzNpkvoAZP5CzGzJvgJD2a68f37RRzqyklpmrjchfKu6HsPLxLqjHfS1SYr58ZBbliAabIgFp6JTrnVWCWx1Clu3NCL23PAYwUMXWtbu2nl3tsMFBeK-rAj9tdSSLjAOEqbGn-Kr1Nq0vF1sz306ZK8zDaxirEpuAOT0lO5rHta1s3U3HdH1gYLDkBJ4-Ju1JeoeapkWm6V9jDTkGlb130CZfr8wueZSf7cxe_8rfl2os5FzLnEbCytFrQAhMInH68jtx0tlw-NEir0XtabwqvjLMBtZ7EEQYBHXQOKC7rTd5cbhFz8YKxqwgbb2r-I3U6rik9fbMjwUP8Z-QFuHHagp9Bh-Wd4oARj_-0RTkM2xPlL5HMXV2ZBImd4EhSC7NuUIqi-Qz3lJF6mCcjtUumWrucy_u1st_7WDHXxcGiVOqGXIqGr0xXpIejsi5FFwJmD-ILCCS=w1920-h911?auditContext=prefetch"
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

// Render games based on current day
function renderGames() {
  const { currentDay, today } = window.appState;

  if (currentDay === today + 1) {
    renderTomorrowGames();
  } else if (currentDay === today) {
    renderTodayGames();
  } else if (currentDay === today - 1) {
    renderYesterdayGames();
  } else if (currentDay === today - 2) {
    renderDay24Games();
  }
}

// Render tomorrow's games (27)
function renderTomorrowGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;
  
  const gamesHtml = kboGames.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeSelected = state.selectedTeams[game.id] === 'home';
    const awaySelected = state.selectedTeams[game.id] === 'away';
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    return `
      <div class="game-item ${isAlternateBackground ? 'alternate-bg' : ''}"
           data-index="${game.id}"
           ${index === 1 ? 'id="highlighted-game"' : ''}>
        
        <div class="team-column">
          <div class="team-box ${homeSelected ? 'selected-home' : ''}"
               data-game-id="${game.id}" data-team="home">
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="voting-text">${game.status}</div>
          <div class="game-time">${game.time}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${awaySelected ? 'selected-away' : ''}"
               data-game-id="${game.id}" data-team="away">
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  $('#game-list').html(gamesHtml);

  // Setup event handlers for team selection
  setupTeamSelectionHandlers();
}

// Render today's games (26)
function renderTodayGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;
  
  const gamesHtml = todayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeSelected = state.selectedTeams[game.id] === 'home';
    const awaySelected = state.selectedTeams[game.id] === 'away';
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    const homeScoreHigher = game.homeScore > game.awayScore;
    const awayScoreHigher = game.awayScore > game.homeScore;
    const scoreEqual = game.homeScore === game.awayScore;
    
    return `
      <div class="game-item ${isAlternateBackground ? 'alternate-bg' : ''}" data-index="${game.id}" ${index === 1 ? 'id="highlighted-game"' : ''}>
        ${index === 1 ? '<div class="red-circle-container"><img class="red-circle-image" src="https://lh3.googleusercontent.com/fife/ALs6j_HvzAxhqjA6ks4NNecsKoq5P6nR7I7Haaf-fIQcZ-UZzcLVWkFCbuSkN9eEP35B2sBF5o3KNy6Pewjn9OLZpXL1m-XR8MSJtPJMk6SgMFgcYY5fcuFrgiHJUCAAv73An68UCws-ZziPYpFgWIqDB99NeZ9hNMvamqA_tmJb5a49Xf3VWB0BPXQ3_QInYtc6P-CHuS1KEq1JKJOWlinVi9HNGO-JyRehIxM9S8oRiK_DIwnxngAF_WHRP8Z7QZ2Gi4nhuj9wFKWM9rTJVRd_AKW2T-Qrv7V5B53xWinMUQ10gqiszhGpfgd6sj7FKLj3GshsYhos56PZLpjaIeZzOzUgHZlIzoe6p5dOQU_bDIrP_ejdaMlq9jS6mQP0AjNiY0_LFCMKMWL87IMEfK04z0AasuPu11VMKCxmGDWyJGxCRp6LxO3J-X2NSKQJjio2bJjn27FCcZCRLfBhG-LKDBdybrlcXXbsQ2RaKQNZ-cb_aFsU-NqMxFscZKosShuorkwASJG65D6HZx_Sf3mqzIda6UCXGMJqRqOhgQbtGWqgXi-4ZRpBTY0-PiP2uy6UkYoYxKHFNNbY2T-c-FWJZwatjDDgwuMqBYm5Mr6LjGgPIHjNvHotCUpYB7_WYD4GvJRQwW8hhIr5Zabcbqf6dahH9xquVogTScxtvBKh0Tj_3BXs-VmPxAdTKlYWtmjuVeEXyV6Cmt9ihryHNHysDNeW4up7LdpiCw9T5cSmSRe-7cUdvA251Z168WofOW-C3Wdt5zxeTnDXcPOI_SkiiDDH6c4ZZYUlzsvLhjf__dx4n6UXUEwVBpS1euMThLlCGQp4hM4E8gNgdUdv0jO53GVOh-NKEpf6bA8PoK4CxdQboSEHgQi4xqKJIYxxzYoCxckA_FLsI-GroPg3fKjtFjw22EvdpfMBHwnyE9PIakNwMQ8dii4QNr3cH-wiO5voXslqvKW_NOzNiu9f24F19B5CiFM4HPsoslOWQlHUFw3skYfH6iE6IIPSY8add427x9nfYiXeTVxxo2koQaAflTmQkyK8tp152bYI3q-jZLwkmAbyw87Rf7Oi04xq0LGElRaMMHOuvToY3ki3tHjS0YhdwekjlPd_E1XRmRSnidkNTrPdUSC_cUjZoMAxS59GqOyXdJlpN_d3p0kUUxRtb9ZNZy_TPlDrvAaf5uLgH9O2ZYo25uvaEvBwqJvP-3IkImUS_TXbsG6ZA4U1VJmo-1cqjPCnO2KWDVXpdAF-gY3VUtowQK3xc_FBSZbo0UNGrjNuMY1H2tVjKBcTLPEip7u6TatMMknMHQyVia3Qc7TbU2Tvkxf2CbXarReV14ar1SET7SY8j0OsKAUwCMTMqqyEfJqJBjTcxNlXqbTOcd7rUG2tLi4aB3iGpm8_jdd3VP2cUd3ZRSA4DCz2D2WZcZeIGofgs0nNPwJs9kDmIkbYlZGVsm8FM9NRUnP_ApdtgFsviFGmifda5c5XrzEqXpd5k_DvJuPQorMpKdIKxxmFMyajf_skbpyz_7tHZXMc-4IYmn2z0rJDK1G8SmLKJx4ZUO_-xkoky7GU5gf85R344kLs0e3SjbvdOqnRXEITG24DVj1Pod6pTlLvs8mhjWnj=w1902-h910?auditContext=prefetch" alt="Red Circle"></div>' : ''}
        <div class="team-column">
          <div class="team-box ${homeSelected ? 'selected-home' : ''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        
        <div class="game-status">
          <div class="score-display">
            <span class="score ${homeScoreHigher ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${awayScoreHigher ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>
        
        <div class="team-column">
          <div class="team-box ${awaySelected ? 'selected-away' : ''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  $('#game-list').html(gamesHtml);
  
  // Setup event handlers for team selection
  setupTeamSelectionHandlers();
}

// Render yesterday's games (25)
function renderYesterdayGames() {
  const { formatNumber } = window.utils;
  
  const gamesHtml = yesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes     = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes     = game.awayTeam.votes >= game.homeTeam.votes;
    
    // Use game.correct flag directly to determine disabled class
    const disableCls = game.correct === false ? 'disabled' : '';
    
    return `
      <div
        class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
        data-index="${game.id}"
      >
        <div class="team-column">
          <div
            class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}"
            data-game-id="${game.id}"
            data-team="home"
          >
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>

        <div class="game-status">
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>

        <div class="team-column">
          <div
            class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}"
            data-game-id="${game.id}"
            data-team="away"
          >
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#yesterday-game-list').html(gamesHtml);
}

// Render day before yesterday's games (24)
function renderDay24Games() {
  const { formatNumber } = window.utils;
  
  const gamesHtml = dayBeforeYesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    
    // Use game.correct flag to determine disabled class
    const disableCls = game.correct === false ? 'disabled' : '';
    
    return `
      <div
        class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
        data-index="${game.id}"
      >
        <div class="team-column">
          <div
            class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}"
            data-game-id="${game.id}"
            data-team="home"
          >
            <img class="team-logo"
                 src="${game.homeTeam.logo}"
                 alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>

        <div class="game-status">
          <div class="score-display">
            <span class="score ${game.homeScore > game.awayScore ? 'winner' : 'regular'}">
              ${game.homeScore}
            </span>
            <span class="vs-text">vs</span>
            <span class="score ${game.awayScore > game.homeScore ? 'winner' : 'regular'}">
              ${game.awayScore}
            </span>
          </div>
          <div class="status-text">${game.status}</div>
        </div>

        <div class="team-column">
          <div
            class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}"
            data-game-id="${game.id}"
            data-team="away"
          >
            <img class="team-logo"
                 src="${game.awayTeam.logo}"
                 alt="${game.awayTeam.name} 로고" />
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.awayTeam.votes)}
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#day24-game-list').html(gamesHtml);
}

// Set up event handlers for date navigation
function setupDateNavigationHandlers() {
  const state = window.appState;
  
  $('#date-nav-prev').on('click', function() {
    state.currentDay--;
    // 이전·다음 이동할 때마다 선택 초기화
    state.selectedTeams = {};
    initTeamSelectionSection();
  });
  
  $('#date-nav-next').on('click', function() {
    state.currentDay++;
    // 이전·다음 이동할 때마다 선택 초기화
    state.selectedTeams = {};
    initTeamSelectionSection();
  });
  
  $('#current-day').on('click', function() {
    state.currentDay = state.today; // 오늘 날짜로
    state.selectedTeams = {};       // 선택 초기화
    initTeamSelectionSection();
  });
  
  $('#prev-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay - 1;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });
  
  $('#next-day').on('click', function(e) {
    e.stopPropagation();
    state.currentDay = state.currentDay + 1;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });
  
  $(document).off('click', '#yesterday-nav-btn')  // 중복 바인딩 방지
             .on('click', '#yesterday-nav-btn', function() {
    state.currentDay = 27;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });
    
  $(document).on('click',
    '#state-yesterday .team-selection-submit button, ' +
    '#team-selection-section-day24 .team-selection-submit button',
    function() {
      state.currentDay      = state.today + 1;
      state.selectedTeams   = {};
      initTeamSelectionSection();
    }
  );
}

// Set up event handlers for team selection
function setupTeamSelectionHandlers() {
  const state = window.appState;
  
  $('.team-box').on('click', function() {
    const gameId = parseInt($(this).data('game-id'));
    const team = $(this).data('team');
    
    state.selectedTeams[gameId] = team;
    updateTeamSelections();
    updateSubmitButton();
  });
}

// Update team selection UI
function updateTeamSelections() {
  const state = window.appState;
  
  Object.keys(state.selectedTeams).forEach(gameId => {
    const team = state.selectedTeams[gameId];
    
    // Remove previous selections for this game
    $(`.team-box[data-game-id="${gameId}"]`).removeClass('selected-home selected-away');
    
    // Add new selection
    $(`.team-box[data-game-id="${gameId}"][data-team="${team}"]`).addClass(`selected-${team}`);
  });
}

// Check if all teams are selected and update submit button - fixed to avoid null references
function updateSubmitButton() {
  const state = window.appState;
  
  // Make sure we're on tomorrow's view
  if (state.currentDay !== 27) {
    return;
  }
  
  // Check if the button exists
  const submitBtn = $('#submit-allkill-btn');
  if (submitBtn.length === 0) {
    return;
  }
  
  const allGamesCount = kboGames ? kboGames.length : 0;
  const allSelected = Object.keys(state.selectedTeams).length === allGamesCount;
  
  if (allSelected) {
    submitBtn.addClass('enabled');
    submitBtn.prop('disabled', false);
    submitBtn.css({
      opacity: 1,
      color: '#121212'
    });
  } else {
    submitBtn.removeClass('enabled');
    submitBtn.prop('disabled', true);
    submitBtn.css({
      opacity: 0.3,
      color: 'rgba(18, 18, 18, 0.7)'
    });
  }
}

// Export the initialization functions
window.teamSelectionSection = {
  init: initTeamSelectionSection,
  updateTeamSelections
};
