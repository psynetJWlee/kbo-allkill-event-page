// teamSelection.js

(function($) {
  // ==============================
  // 1. 설정 및 상태 변수
  // ==============================
    // 양옆에 들어갈 아이콘 (채점 중, 올킬 도전, 제출 완료)
  const iconBothLeft   = 'https://lh3.googleusercontent.com/fife/ALs6j_HdinySrdpXDj_UCxen3QfT7A_xYH1ky3qIy-ATyL3XHf4YWCi74DNMNqaNlo_jEKOYzemqxyULCS30v6piy8_FTTE3efTki4-wDuCf_hFpMp6vUCltrjZWLqIv8gNLub04krHbrwoovlo2EiZ7W30gPHp_z1gVRFdM_WTE28A0QBoybw2rBYNuRDr1QD5hzkKbFyupjMv2Q2aAOf14ihqRGgL7gie_dsA26r3m68nFLHO6J0BU6_n19NdIcQpkoEVY-charTtuqAqyC9f1hQiJc3QkD8CSCcATNQ54eQ3xBPY_Dskq6YF-yYm7bbp9i8sO_U-ryW8ieBqCnhGhOnykdZ3gjx-WPOSzoGkgQMEUlaRD_HsnCx4QHIVlyfPmKeVVxykuqON_9Zp4WJEpCkXyL9jx9HRin8Tty1IpTpJ7XXpKtqRuUKJ7AsbQY9BbaCXL_EkEIDe-83DOFxiO75p3u2LbyAhgpALfZQkXaI0pvNeezvwCn4ZjhohmGjRrsq0gBu-af9ty8dGxiP_tXSH5qyfhGpStRX1ouzX95A34_OEKWN64VzxRkh_KAOMla1tEpdFVLW4Cdj_51ZCjgcJzFpjzs4ACOKBKqclTEUlDRq3felHYGgOAz76yf89-LMEyy6Flr00UP791ZzxeYgie-qRtmniNjW6csrw6KTYZLYYZXyctA9cgltpgwnfJtwIIJ2lhtpU7U4WU6tZpFp6YpODdqzlhXHCZmkYqYtdh3Pphbekfz45EBfMZFkPk72DjakZJ-hkvg4ht7duN4TFkP2zdj-DpBPBc9VT5B_-4E7E-UuJCQBW7mxkEm5D9WxWcz4WZpjm-XNyATQOZz_6dhI8iG9SsvKmaE9DPPI_Y1Hvp5oiMlGIdl-6iDpNCbRJ1FQoSmCHUmBQTlDCk-uoy6wGs9hMJDn7Y9Xxjl5eeZSrBO6IkvdmEtTmsRKNFc_Pc2ZKvg5ShRJ_Y7YWU2VDJgWgZGs52T-ukut0CCj-EIcvnB2-WE1GpEiX2iY-OwlSP1cfqJEsYFFkoAXqpuTiD_i6K2GeBnoaxJch2t8JZw-fqTXQEJkgfCpgC6CL-vZpKHF9SaZ3DwwSxqfipMn4k8ckBvBGMkV-tjEF-Lk66WGM2bejCgVRoEySec6WzaEluLnoHwJ03W66mYuWwBIrLqPaH_6EwwcsSXpuD385qEIjPZREVScPyUtztcuEaWgLWl1iiXE4u7tiXdkgAaeX4kieMN8R6iFe4-9opcbYzouaYBqIxhweRBVcbhu879Qdz_zhSL8nueva-KsSMea28SIq7GsaHY7DJ0-vaHLru9uPrH8MP1nl1lOVMO96jYqPcwUbW6uuIQV94FrcfxH-4Je9gs5Z854TDkSrYt1rBKtxffhL0s7lm1aq2HtV9jIMAhag75PP-BgIHjfg2p_u67KJcEdXAYgqHDNG5aJ9sgW4VZ73nNc4eTSo5KqzV_8QSMflELG4hPd8oOhxfRL8knwo2RyWVmV-iuoIuNiJRDGpLoS_munEaFtM65AVG4FQ0ZnHteXQwsSSCg1-7ffyi12ThGrPB4MEZIlrLsbetDYt7A_eWL4TOblv6hZ3YWwgofTlA3gKXO5unI9Yr-A4=w1082-h910?auditContext=prefetch';
  const iconBothRight  = 'https://lh3.googleusercontent.com/fife/ALs6j_GZvyQ_yfZv82LCjd7vnWHMK-FyIVrguAd2BFXr6M3pdXw4P_hShrtZsC0E_-_zsBQ61x2TJkmd3gQnJ6v1S05g8V9trvWWc17NPJ8z3wTu9hzhVOowm8SKrTj0OPl6B-CDuHuYJnywh35GIRH5GgOOZjnfuI6wi4nWl5E0nRJFf0kRbbK_68ozIJPVlqqtmmn-p1c1x7UJgrkT0g4VzLoOcSrbgrDv16HiQ14IKHvpS7By54i4z4FkgNuQF0EgBmsvNKwoJ0bsmSBHQMV_6Mb5D8v7rHbu8RwFUJNLumP09S-0knGDZ_IoDEg5I9pXOM4WdQfyaqwRVO4ALurSQ-eShhqq5gmix8bOJMUIpSV7nUjZZ4dBSG6Oy2Wgy6NvR55BQNRolmHGUpzLVQGjQGvJWbdRw_tQ6sAUryh2bGhMeWlt1J8dZZFfnitn6sKj1DOIX1xHnZx9C7CX4j0VXRgkh_oXIF1uUu71-gnrYP0HsfbhUVrFwfGSpXxIuPq4v7LFfi3QXxh_Lf6G6ohO_v0r1dkiV937vLI97W8qJJYErbCAVKbb1PDdCW21czCwIow2pi0JRb6g_K9exIE1mEi2AKii5ZIkTsVgpS5uHQfw-iCMpby1wJTgZK7_MZZRCaRTMmSLJTpMu3wCw8_I5v_9MIesGoPT98vvIi1n7xO26yw5VfvvorBPt1i5r2wq3ns7dqCcapO2Gq8ZiVoAiYbpm8Nav1k910SvAoTWRVYsXYX2jTb2of-f-w3IIN6mjrAjL9TM8YcsTUmAQUTVyVjPK9MKCel6eeyZ9LnsEr-KLMYEY4YyOxjWRX_De34Ab87i7R1B2c1E60R7S8OLRlsEQfjimjKJV-DE-2jB1PfIoRl45eLh5SD7716KhqMOD_Q54PCo__w92qt40mGbxCP2dYfmTZGg-5HORkLCKAeay80WMXLMYuq6SNHrU4SaLb6T3PaIKKR-_arRb2XdKOctN9eYWvlyyZmncmGXkL61rPr54_Jmod-c9go43cwQvWHTv_kxfMgLFIyIyGFngvDx9uIbjPV0sYubWzwcOi4WtP4zrhjSSpr8ysn-GZyrn-dqwqxvWM338dYxm26L1tbxHWYTAZO5HvaUUyimt0uJFc2zg_LxRUmu7uttkYxSaxfkw7Rp9zu1kciUu6c-ODKii8xqqCI-nsVyXrnXwkICue2z-7L7QqIG-57Rwz_dinSV0JvuJUeyOy9LaNMkn0jjX9k7Me9voJ5IGPRxue16Eu2b-hUntkMlXfLBxnP4IUMJWy2eDujkQ6eojBe7dSc9OWSxYg6SQrwbmNXvVPCzWA-b881l61NLo53TINk0FMPEa6f5fucYEyxYLLd7MZTGGw-XzBkAXqMwiN4tbH8IOyOjCvDB3HtPsdQ7TPkfxhlPsi8-T5zL3crzTXK_7CpzB_slZMvdVJzT2Zv2ibLMGwi-Hkkio5Ut1yWLf6hASjWR9s7mm1YIk_w8lNP4Fyfcz3wyZ7lCJ02gyDIJ9AMgx170wEg9yeqqOYsNpenG3xvnxYFdLZB6c0Kl5wb_9hq7j7XkGK76LvPnMUuIztFes1yMqv_vYn5td_kch_ePrCDFnesxLVlkkdj0rDP0dW_M=w1735-h910?auditContext=prefetch';
  // 오른쪽에만 들어갈 아이콘 (다음 경기 도전, 올킬 성공)
  const iconSingle     = 'https://lh3.googleusercontent.com/fife/ALs6j_GqKAPuGUp8o41mhDqFED4XRD6J_7cRxo4kzhpclNoLy9QfR-UiLOxFWWjuugmWoJviChX2l6MlUujN31aMtBuyUSfBPLhVah2wZdrKquyvlDtNrwjtVXYtUOSuhRhK8-GmCkvAffZSul-ewVydXCqzbdRvQq8rgGzz4yZObJ0l_cVvpyQA9_KVxWIniYAr-HmPqZupSD8maEcTHn7L2BKQ4pdrDeAonHbEjpCIYn7QrBpcNfsjOeJwmearScjNfI_y2su-cUA3NjhsWO0ZLKTXDDtQKIJOQkVvfkPZlv2K0Lf77BBEFmnEJaM_T8zfsOzfflBl5jVdBW8cbaN-YTgt1t9nzFaiLjjufk04JVyjetJ_9T2OgCM9clkiMSA_rJMX9VkkWwExja87LEAboJnIYM6ZwPSYJhyMnvV0zXlgINIuYof-QC-zugeIF_hf8tryeZPvlAS36t7mfgK4my1ncTgF4adjlhduAHk5AiS2__jjh6qEdQvjoO5WesyhcBxSqWj2ts46hx7MrwusYBnfPsyn6AsOFNSiAqyH6NUheEH5KF4fmfDZe28qgb0nlhOSUiaQ5dRSkVM1KW6XVZJqLPKkHU4jHseh8nsL94hYUP_gF81FTXggvBKXi76yWv7xZWGfJl9hOWgTaVH2i8thdR6vl8pgYl0ydCeSE3-f3Nk-H3f8BLY7Ege88pp7T8jenJibtqRH8mXDNJWzxy88UqLrvp93XOxOD1VKcAdOPIUf-5nxsen_aUaXfNKfGO6QM-kPy3ySwZkDjM-Tf0ppGgLZtlB4Vyc9ef2405Jk0Ou3gKwLu6mY10A4MlKcqA6xCXjZY6J7qwwkB-WHsu9fg08qCutxDSVHvP4trsVRAqW_4RTgueiq9QooXDgmQNDdAiC3-tYtTF_v5R1JeklaaInjy_lVThUfVdf4DpBASFtHTblY0hloG5xPNKkIYFqIHJOX9BPy--v23xv9XPGYQjpqN-Njs4tynJV0HDHReC3opUF_aZPDkAs8lYQxl4K6fg-XEpmDaX9eYFsb-ZVPjFaF_RVL8urZZZq9-HNMTBRfeOa8oSgEz_3B3hJGdXzfcE_9o8ILslOgjaX0cDdbxitVAYymtyTEGwzux2MTGQl6GthmInqfKsHCzryVEuUN5LtNJ_ltQjEk_8hj0NIaopxiV17Fok2XTzWQ2EtjHD9iJBiC01jdqwJSdtlFOZDTb5wnVMvYKweSWEoytyQahHSILwXyb-2x7NbJE23T6HhUsQ-LTJ5Q0ApUEpGt0uQV6HgpLykh_5tSVphLJ0G85HWgcXjQCvjxSv1yOOz6GhsD7rP4o8JZ9U31FHq61WevXqBeJHZb2RU7HrGPaFEwv2FKoV4i9wVyDcrOFnQuTyKmVJoj1lunS4o_Wsitp2jKDvS5NP-mXQbq-zDSYzCW9ZsJQgkgrzZm8v2ayfA7urGMG4fHksqhGfzn_P_8Rsy4HVPv-5pDQj6Brn9074HVlRIc7sCHGetLrtfFuwqd12oucxxbEPBRQEyVR362kui5JyC5hBg3YevOYIztJ_IXtarIgVQK3YljRKFQ49Sk7l_nIyNxLwUQgCGMi2yD-9BfTk5M0YH7w6eAcybOVbsy=w1735-h910?auditContext=prefetch';
  const containerSelector = '#kbo-selection-container';
  const sectionId         = 'team-selection-section';
  const gameListId        = 'game-list';
  const prevBtnId         = 'date-nav-prev';
  const nextBtnId         = 'date-nav-next';
  const currentDayId      = 'current-day';
  const initialTitle      = '올킬 도전!';
  const submitBtnText     = '다음 경기 도전!';

  // 카운트다운 타이머 ID
  let countdownTimerId = null;
  
  // 제출 시각을 날짜별로 저장할 맵
  window.appState.submissionTimes = window.appState.submissionTimes || {};


  // ==============================
  // 2. 날짜 키 배열 생성
  // ==============================
  const rawKeys = Object.keys(window.matchData);
  const dates   = rawKeys.map(k => new Date(k).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const dateKeys = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    dateKeys.push(d.toISOString().slice(0,10));
  }

  const todayKey   = new Date().toISOString().slice(0,10);
  let currentIndex = dateKeys.indexOf(todayKey);
  if (currentIndex === -1) currentIndex = 0;

  // ==============================
  // 3. 초기화
  // ==============================
  function initTeamSelectionSection() {
    renderNav();
    renderSection();
    setupNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
  }

  // ==============================
  // 4. 내비게이션 렌더링
  // ==============================
  function renderNav() {
    const prevKey = currentIndex > 0 ? dateKeys[currentIndex - 1] : '';
    const nextKey = currentIndex < dateKeys.length - 1 ? dateKeys[currentIndex + 1] : '';

    function dayLabel(key) {
      if (!key) return '';
      if (key === todayKey) return 'Today';
      return key.split('-')[2];
    }

    const prevLabel    = dayLabel(prevKey);
    const currentLabel = dayLabel(dateKeys[currentIndex]);
    const nextLabel    = dayLabel(nextKey);

    const navHtml = `
      <div class="date-navigation">
        <div class="date-nav-prev" id="${prevBtnId}">
          <div class="arrow-left"></div>
          <span class="prev-day">${prevLabel}</span>
        </div>
        <span class="current-day" id="${currentDayId}">
          ${currentLabel}
        </span>
        <div class="date-nav-next" id="${nextBtnId}">
          <span class="next-day">${nextLabel}</span>
          <div class="arrow-right"></div>
        </div>
      </div>
    `;
    $(containerSelector).html(navHtml);
  }

  // ==============================
  // 5. 섹션 렌더링
  // ==============================
  function renderSection() {
    const sectionHtml = `
      <div class="team-selection-section" id="${sectionId}">
      <div class="title-wrapper">
        <h2 class="team-selection-title">
          <span class="title-main">${initialTitle}</span>
          <span class="title-sub"></span>
        </h2>
        <!-- 왼쪽/오른쪽 데코 자리 -->
        <img src="" class="title-decor-left"  alt="" style="display:none;" />
        <img src="" class="title-decor-right" alt="" style="display:none;" />
      </div>
  
        <div class="game-list" id="${gameListId}"></div>
  
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            <span class="btn-text">${submitBtnText}</span>
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
    $(containerSelector).append(sectionHtml);
    renderGames();
  }

  // ==============================
  // 6. 경기 리스트 렌더링
  // ==============================
  function renderGames() {
    const key     = dateKeys[currentIndex];
    const matches = window.matchData[key] || [];
    const $list   = $(`#${gameListId}`).empty();

    matches.forEach(match => {
      const selected     = window.appState.selectedTeams?.[match.gameId] ?? match.userSelection;
      const homeSelClass = selected === 'home' ? 'selected-home' : '';
      const awaySelClass = selected === 'away' ? 'selected-away' : '';
      const homeHigh     = match.home.votes >= match.away.votes ? 'higher' : 'lower';
      const awayHigh     = match.away.votes >= match.home.votes ? 'higher' : 'lower';
      const statusSection = renderStatusSection(match);
      
      // 2) 오버레이 HTML + 실패 시 페이드 클래스
       let overlayHtml = '';
       let fadeClass   = '';
       if (match.eventResult === 'success') {
         overlayHtml = `
           <img
             class="event-overlay success"
             src="https://lh3.googleusercontent.com/fife/ALs6j_FFtMHE15droPmy1K5AUfB_dicrAxIA0dJaP4i5Np-sVqT0GKSTIPDaCkGv9N1Xvy849k30IDcsLAoc_jHhv3WkbTq6_T2u48QgN9vs4Ex9mv6N4LIHrntb1kDT2lbsZZIFimmFaaoxAO88UhVQv05IB72rOoXEpEc-fzrasELlmycGBBBwbeX7Z9oGw03xVwVvSBIIN4i0XqucZmb4GFMHTJNrZSxvlybFFfKbtK7Db13ozZGEyPhIxiQVEx_wD9kS1ApKm147ksZyb7LOElFGEQmSTPH3AVqNRmu-56Gna2T5P8oMu17qPpNT0SdOZl5DamGzQia4Cqr0x_Fs7FIeZzLSHK2aciShzwwMgRc39DlvE0MNdNaEFNVVOdyzpZB3GMIXkaO1ZGAaAQQeqxd_pgbCPThmRPRxLfxwK-iPXd54gMZBxd0YgsRUkMzbv_G-A0HyLI3gW9HXaNeExA6WhJLYrpXYdD9COaR3fTYeg3DSpuF-yQLp6kLJpy_9II1jap9unEGvCGw0smR8TF2ZjHUPelFuPs3URXQaHLncnQTBc8Ntk843Ikk44gHFmcOQ4IM_G2HEkNEAxsZUlQksh-mttR_8VBG7Q72rGxGmW1-PkXzFddXgc0kfkdWuqN_EwE4taHIN1Vo6tyB2NUmRhJYdj-jnYOIRaKkRjed8b66tKl-424Z6X5zelNFARx-K4mrTzHiTgP94R4tAEqvYBt_DSpdqFIoH9KWKsBLkNRfLudhKc8xu8oSgxy3eYfhOOvq3U6tvg2H0jCs7T8dOtq5ajeTQvreILOiAckoMzy_a3coD0kCulAjam6z5tlB50R6paYcFh7xKwv2Uwz4v9m_EoW0IzZkxogCOFLRF0R0ZkKfs6XEQzbWqjagKiWO9v7c5DXvPD0qv_-uv2TM12CH9inX_KuEtPSX8q0aqOBBpfPG_zke_WCR_nJGRufTnigUdoy9iC7FmVddrY0ppNLn91jJpsYCTysce87NVVIZcvNXABpJOfMVn2ZUcV4rVFhtFP9ytyX6u5wNyXlxDvWz4ZQdYhkpQJ7JScjJi81lw_8-JY121SSJnPBa4C5vsn4H3XibImYJHnJiqZ5FwZj2uWOEELlt0xBMfE8AMRtzLzYLlnwRLE3XA6hqKHsE-n1S3BKyqIVw8vFBoODprs6hiMCn8yVRYJAC1lV07ZJEhaBD2BVuf0HEEcEKwvdigevfCO5jQdWKoRrltQn-mogQ4aLvloIIIbPjqg-WK2hmCJ3_2c4Z13QShxkbUK1HLedsiMus1SuRqwF_1LSQ41yFHzUoSPLCZH8R2AH63AltFekoFqVNw4nRxFww9j9dNLLi4MBnDuOvlMqk2GWFVd8xGzZjezjq-dE9BMf2fuIC4Mtb29OgM_cXD4wuGR45iQyquBq9upnbINoXOEooKNWPHLEkZUDcIsxU-I5NHKdv7lxykJLEIOneIwTFpRK6ZuujHlB27CG9Adib8oUABx7aYZyLj6VvGCNyrI9gu6sFljLJ0G85HWgcXjQCvjxSv1yOOz6GhsD7rP4o8JZ9U31FHq61WevXqBeJHZb2RU7HrGPaFEwv2FKoV4i9wVyDcrOFnQuTyKmVJoj1lunS4o_Wsitp2jKDvS5NP-mXQbq-zDSYzCW9ZsJQgkgrzZm8v2ayfA7urGMG4fHksqhGfzn_P_8Rsy4HVPv-5pDQj6Brn9074HVlRIc7sCHGetLrtfFuwqd12oucxxbEPBRQEyVR362kui5JyC5hBg3YevOYIztJ_IXtarIgVQK3YljRKFQ49Sk7l_nIyNxLwUQgCGMi2yD-9BfTk5M0YH7w6eAcybOVbsy=w1902-h901?auditContext=prefetch" />`;
       } else if (match.eventResult === 'fail') {
         fadeClass   = ' faded';
         overlayHtml = `
           <img
             class="event-overlay fail"
             src="https://lh3.googleusercontent.com/fife/ALs6j_EZ8lcTFR7TPZDm_8oqD0CngTnZcHLsDBJLw_oc-gUKDV1tk0d8PV8goOLdMl-l1VG_25-VKoMNGmZTpRFJMkA-IQv9qgKGbwT_7GUgMgvPzN6z_rwsJA7c4dyasP3Z5vhOXxRAzEdDMo5wljg7J1dU9TO6XRT6aAh3A4bm38mDwPH0qNq78RicUBE17eM9Fc9BVOuz86Zk8c8cQ_bGxaKPK_-01JUT-3yEe-rwq7OmYnzBzJTjUir-F5ERQfx5R-Wnc5Wws7GhfI9Z3UIDQleS77d6szmFj-oeAZje5junJp3NUomoBgy3l1tIt6DWpMgAYoV5_9wl1I0wvRO4LmxhIByWX9lGjAk2eVyjZiVMi_0HxcDezPpwSOZw2_zCQrqruuIiSG3OA2FjEouKBsRcXjn_VnzR5naVG2Z6rUy9UNtQqOmr_CcNhgw3DeMxXfSRphdMyvGfbX5TPWoBX2S2xiM3ljfvW-7SVkDXDc3hmZNQ8cHXybaww4fOEbDhorxi0zskAxH5bsEynwM2MN0q62cgNB1MZCeU8tsQQ9bVcG7gg8TfyoxucodWXCITHb5xdVuFkt-7c8pLGQJI4EEvjTvAneCy6zo1K5J3Q7SuiXN_UAcvYnZazRYAvtD3YfdWxps2NxCl4c41yGqX44k7puoijjbDg8yuXm3_ck9P0E8jk585G7JP7HFLJOcikb-PmnKWRNYqiBdDvq6J3oBKm8KdY9tSd35RMg0tGvBPyzPuhhZva14pbzS07v1eKli2zhvn_NdEanism5R_DJZCTg8mBe8H5C7gOdgYYJY_13wxABCghlfDENi3_Af6khmLojN4Ne6giNbQxk-NVFPE6yZHjsLkkoQrBitNxGZC5TNEk04JY1RVlQV5ljwvJE0flyYrxty4YHBcIGDgEgIv7boBBSb9oDyTX91Yz8H-9z1DUhXRLTI6vnKKFYiOtcOjSXBCNJ_faJTMznQDMfYinVv3e_j5ZZ1dSdyAFs_TxpOWotqO0vse5TeZS4nYZiR-xCidqpXpBhVrkryouVaIJlSnekEg_a7MtF3OrrlybuiEx1U87OHUdL1uujzULMgnATjRRJjcgdKh9nlpTaZdUOmyuwmELFGLcffYYVuVy-gdDNSoZnb8ejpeAtlkSiY5gcJHmM1ItxZu7kS0ku7fZyNppNqJy9CKSIcDodaTKIhfyZI5xMUhLS7v9NcKb6uVvwLPavQkGXHnHPyU1qkDdTUYrxmwf8Il11D9AquJXu3t9cMDkBcjT-ozVXzSyAAfbh5HnaqH3wRAwQhttUdpSMD5nIiJOIsv7LHIwnh0bPR8ZOty8LJL_4z9458Isvq-S6BCc5GtfJaBE2SqTxcjM1hZH6577zH6n0nvY29FKw5zU1G45lDSWqaPatGYltRVe4l-ESvguZg4mP6OU93FlW-3qSQclYEkLICOz6ZwVKnQ2_8Eg1TvIkTcBv7aZ6Qqd7JK2ozgP0Quh6ryg9v1SWe8hLW9MvGlj_zzXSjJ4-IHAHAH2w8-e-NyYzd2PgoZAfOI3A07OADMpY9vLI0xcGLwtb40xRf0Wosh74eGez6WFt_4VigAbiwSCuwduQ6yKnNcwwLJEq2EfjqC6t89=w1902-h901?auditContext=prefetch" />`;
       }
      
      const itemHtml = `
        <div class="game-item${fadeClass}" data-game-id="${match.gameId}">
          <div class="team-column">
            <div class="team-box ${homeSelClass}" data-game-id="${match.gameId}" data-team="home">
              <img class="team-logo" src="${match.home.logo}" alt="${match.home.teamName}" />
              <span class="team-name">${match.home.teamName}</span>
            </div>
            <div class="vote-count ${homeHigh}">${match.home.votes}</div>
          </div>

          <div class="team-column">
            <div class="team-box ${awaySelClass}" data-game-id="${match.gameId}" data-team="away">
              <img class="team-logo" src="${match.away.logo}" alt="${match.away.teamName}" />
              <span class="team-name">${match.away.teamName}</span>
            </div>
            <div class="vote-count ${awayHigh}">${match.away.votes}</div>
          </div>

          ${overlayHtml}
          
        </div>
        
      `;
      $list.append(itemHtml);
    });

    updateSubmitButton();
    updateTitleAndCountdown();
  }

  // ==============================
  // 7. 상태별 UI 분기
  // ==============================
  function renderStatusSection(match) {
    const s = match.status;
    const homeScoreClass = match.score?.home > match.score?.away ? 'higher' : '';
    const awayScoreClass = match.score?.away > match.score?.home ? 'higher' : '';

    if (s === '경기중') {
      return `
        <div class="status-column status-live">
          <div class="score">
            <span class="home-score ${homeScoreClass}">${match.score.home}</span>
            <span class="vs">vs</span>
            <span class="away-score ${awayScoreClass}">${match.score.away}</span>
          </div>
          <div class="status-text">경기중</div>
        </div>
      `;
    }

    if (s === '경기종료') {
      return `
        <div class="status-column status-post">
          <div class="score">
            <span class="home-score ${homeScoreClass}">${match.score.home}</span>
            <span class="vs">vs</span>
            <span class="away-score ${awayScoreClass}">${match.score.away}</span>
          </div>
          <div class="status-text">경기종료</div>
        </div>
      `;
    }

    // 경기전 & 기타 상태
    return `
      <div class="status-column status-pre">
        <div class="status-text">${s}</div>
        ${match.startTime ? `<div class="start-time">${match.startTime}</div>` : ''}
      </div>
    `;
  }
  // ==============================
  // 8. 편집 가능 여부 판단
  // ==============================
 function canEditSelections() { 
   const key     = dateKeys[currentIndex]; 
   const matches = window.matchData[key] || []; 
   const allPre  = matches.every(m => m.status === '경기전'); 
   const canceledCount = matches.filter(m => m.status === '경기취소').length; 
   return allPre && canceledCount < 2; 
 }
  
  // ==============================
  // 9. 타이틀 파트 계산
  // ==============================
  function computeTitleParts() {
  const key      = dateKeys[currentIndex];
  const matches  = window.matchData[key] || [];
  const selMap   = window.appState.selectedTeams || {};
  const finished = ['경기종료','경기취소','경기지연','경기중지','서스펜드','우천취소'];

  // ➤ 1) 제출 완료(그 날짜에만)
   // 1) 제출 완료(날짜별 기록) 체크
   const submittedAt = window.appState.submissionTimes?.[key];
   if (submittedAt) {
     const mm = submittedAt.getMonth()+1;
     const dd = submittedAt.getDate();
     const hh = String(submittedAt.getHours()).padStart(2,'0');
     const mi = String(submittedAt.getMinutes()).padStart(2,'0');
     return { main: '제출 완료 !', sub:  `${mm}월 ${dd}일 ${hh}:${mi}` };
   }

  // ➤ 2) 모두 경기전 & 미선택
   const allPre  = matches.every(m => m.status === '경기전');
   if (allPre) {
  
    return { main: '올킬 도전!', sub: '참여시간 ' };
  }

  // ➤ 3) 경기중 한 건이라도
  if (matches.some(m => m.status === '경기중')) {
    const ok = matches.filter(m => m.eventResult === 'success').length;
    return { main: '채점 중!', sub: `${ok} 경기 성공 !` };
  }

  // ➤ 4) 모두 완료 상태
  if (matches.length > 0 && matches.every(m => finished.includes(m.status))) {
    const ok    = matches.filter(m => m.eventResult === 'success').length;
    const allOK = ok === matches.length;
    if (allOK) {
      return { main: '올킬 성공 !', sub: '상금을 확인하세요 !' };
    } else {
      return { main: '다음 경기 도전 !', sub: `${ok} 경기 성공 !` };
    }
  }

  // ➤ 5) 기본
  return { main: initialTitle, sub: '' };
  }


  // ==============================
  // 10. 타이틀 & 카운트다운 업데이트
  // ==============================
function updateTitleAndCountdown() {
  const key         = dateKeys[currentIndex];
  const matches     = window.matchData[key] || [];

  // 1) 경기 상태 판정
  const allPre      = matches.every(m => m.status === '경기전');
  const anyLive     = matches.some(m => m.status === '경기중');
  const finishedSt  = ['경기종료','경기취소','경기지연','경기중지','서스펜드','우천취소'];
  const allFinished = matches.length > 0 && matches.every(m => finishedSt.includes(m.status));

  // 2) 제출 여부 & 타이틀 계산
  const submittedAt = window.appState.submissionTimes?.[key];
  const parts       = computeTitleParts();

  // 3) 타이틀 텍스트 갱신
  $('.team-selection-title .title-main').text(parts.main);
  $('.team-selection-title .title-sub')
    .text(parts.sub)
    .toggleClass('countdown-active', allPre && !submittedAt);

  // 4) 버튼 텍스트 동기화
  $('.btn-text').text(parts.main);

  // 5) 데코 아이콘 제어
  if (allPre || anyLive) {
    // (경기전 또는 경기중) 양쪽에 아이콘
    $('.title-decor-left')
      .attr('src', iconBothLeft)
      .show();
    $('.title-decor-right')
      .attr('src', iconBothRight)
      .show();

  } else if (allFinished) {
    // (모두 종료/취소) 오른쪽에 단일 아이콘
    $('.title-decor-left').hide();
    $('.title-decor-right')
      .attr('src', iconSingle)
      .show();

  } else {
    // 그 외 상태에는 둘 다 숨김
    $('.title-decor-left, .title-decor-right').hide();
  }

  // 6) 카운트다운 실행/중지
  if (allPre && !submittedAt && matches.length) {
    const [h, mi]      = matches[0].startTime.split(':').map(Number);
    const [yy, mo, dd] = key.split('-').map(Number);
    startCountdown(new Date(yy, mo - 1, dd, h, mi));
  } else if (countdownTimerId) {
    clearInterval(countdownTimerId);
    countdownTimerId = null;
  }
}



  // ==============================
  // 11. 카운트다운 시작 함수
  // ==============================
  function startCountdown(targetDate) {
    if (countdownTimerId) clearInterval(countdownTimerId);

    function update() {
      const now  = new Date();
      let diff   = Math.floor((targetDate - now) / 1000);
      if (diff < 0) diff = 0;

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const text = `-${h}:${String(m).padStart(2, '0')}`;

      $('.team-selection-title .title-sub').text(`참여시간 ${text}`);
    }

    update();
    countdownTimerId = setInterval(update, 1000);
  }

  // ==============================
  // 12. 제출 버튼 활성화/비활성화
  // ==============================
  function updateSubmitButton() {
    const $btn    = $('#submit-allkill-btn');
    const matches= window.matchData[dateKeys[currentIndex]] || [];
    const allSel = matches.every(m => window.appState.selectedTeams?.[m.gameId] != null);

    if (allSel) {
      $btn.addClass('enabled').prop('disabled', false)
          .css({ opacity: 1, color: '#121212' });
    } else {
      $btn.removeClass('enabled').prop('disabled', true)
          .css({ opacity: 0.3, color: 'rgba(18,18,18,0.7)' });
    }
  }

  // ==============================
  // 13. 내비게이션 핸들러
  // ==============================
  function setupNavHandlers() {
    $(containerSelector)
      .off('click', `#${prevBtnId}`)
      .on('click', `#${prevBtnId}`, () => {
        if (currentIndex > 0) {
          currentIndex--;
          refreshAll();
        }
      });

    $(containerSelector)
      .off('click', `#${nextBtnId}`)
      .on('click', `#${nextBtnId}`, () => {
        if (currentIndex < dateKeys.length - 1) {
          currentIndex++;
          refreshAll();
        }
      });
  }

  // ==============================
  // 14. 팀 선택 핸들러
  // ==============================
  function setupTeamSelectionHandlers() {
   $(`#${gameListId}`)
     .off('click', '.team-box')
     .on('click', '.team-box', function() {
       // 1) 편집 불가능한 경우 무시
       if (!canEditSelections()) return;

       // 2) 선택 로직
       const gameId = $(this).data('game-id');
       const team   = $(this).data('team');
       window.appState.selectedTeams = window.appState.selectedTeams || {};
       window.appState.selectedTeams[gameId] = team;

       // 3) 버튼을 “제출 !” 로 변경
       $('.btn-text').text('제출 !');

       // 4) 화면 갱신 (타이틀·버튼 활성화 등)
       renderGames();
     });
  }

  // ==============================
  // 15. 제출 핸들러
  // ==============================
    function setupSubmitHandler() {
    $('#submit-allkill-btn')
      .off('click')
      .on('click', function() {
        const key     = dateKeys[currentIndex];
        const matches = window.matchData[key] || [];
  
        // 제출 시각 저장 & 타이틀 갱신
        window.appState.submissionTimes[key] = new Date();
        updateTitleAndCountdown();
  
        // 모든 경기가 아직 시작 전(경기전)이라면 얼럿 띄우기
        const allPre = matches.every(m => m.status === '경기전');
        if (allPre) {
          alert(
            '제출 완료 !\n\n' +
            '경기시작 전까지\n' +
            '수정이 가능합니다.\n\n' +
            '확인.'
          );
        }
      });
  }
  
  // ==============================
  // 16. 전체 갱신
  // ==============================
  function refreshAll() {
    renderNav();
    $(`#${sectionId}`).remove();
    renderSection();
    setupNavHandlers();
    setupTeamSelectionHandlers();
    setupSubmitHandler();
  }

  // ==============================
  // 17. 외부 API 노출
  // ==============================
  window.teamSelectionSection = {
    init: initTeamSelectionSection,
    updateTeamSelections: (gameId, team) => {
      window.appState.selectedTeams = window.appState.selectedTeams || {};
      window.appState.selectedTeams[gameId] = team;
    }
  };
})(jQuery);
