// teamSelection.js

// ======================
// 1. 공통 헬퍼 추가
// ======================

function getHighlightHtml(game) {
  if (!game.correct) return '';
  return `
    <div class="red-circle-container">
      <img class="red-circle-image"
           src="https://lh3.googleusercontent.com/fife/ALs6j_FS9zOwrQikdw3Flg2geoaU1oLq1Sf509QEYXI_kd1_khDbmg45PZnGJP29rnCfdVzeKU4cbj__RMzGfQNEgAinN8HO_595XgPB7jHIpfB9jMIyb6PLvTHrGiGWGv5__qo1C42W3T4ZTRUys5Jfiv78u6MHgQxAVE0lb3VjTVO6dFye000H0OUoIwBhWoTnMOlUBN_VlZr7AlituyZnsBBaO1i9MzhZnfwAUrRzaFeeDhsVEyz0zuzw6E-KyYCUaGGHnMCuig6DdBsvIfBgus52hvklCHkqnqVwQ-tG4ubYuz1w-1_8_TqUWIYuHSf8KCOQxY1-QyHLzF2ZTBov0D8VUjKAmvx-6-vVkyuvbNUnoIhpLWfbiIdQPt488WAc54OyGbTF0j2e5zYK80c8bJndsD0HOy7cyx9BbVDkExrEvQTplRfUckbk8GJh1WKJlGW_LVGsmh4PBcPEunnJGlP9p44c_oLqriPwcW8Hst43TzyPS_TkR4U8rlxBnciq4BOnpRsQ81da8zytZfMlRM6dSHuJfLbe5kOREvxL0EXhUs_2eSedt7YgZqMOudg1Y3q54q6VGEuqYjnJHonZ-mVjBKpCBk69TC3_zPgu4D626RQ0etZq50KPSRBzp73lllReofsLW3M9JFkRtPT7Vi4lmGuwHrObee8g9FS83JKoldzNVgnQC-_HpFjbGQzz1RgPAZVHeyM8vLAQ8bfrciWP3ulfA2QMKikwm6CG2OH7FX9RldNJx1Atc-7I2Wu59bp328MUObFySswAj_1udxoZ5dQRZn0GfZxY5rlLDZ_y8MtdamIqhp-Z09qnro2vj9KVqkBfiDcVuX5Q2IqmF2phn9BSF59qS30j7HZmkw3CRwi5VY7upTNbTIWyiRNVvGKoaFf-n1aZxyBqOVgNfhS3jgou6xX5N9BVAcCdfCKZokxYLD1yXpEaahF5hn8r6yfBBycsF7iUCShgj9jH_NJftX-Jo-siXBKKa0UI1LHuc1RlY0Wa6eDgtQaUoy2IQIVV2zrai_ySXFsn9XuI_Mv67x9fFIXzyvdfr7IMIGoDEFO7TrIBsk4LNFLGYlB3w9eVHm6uaVMuP_EvZ0BTJBpbc5cyOVmGPC02-2niJynAL-LdBw7uqo1QwIj-W5Q-irqQC-iKrK2bs9ILx5efurkoZZAvToETXXRDFTrCvKonm3FY0vpIIMGHWxjMdPTve0KQ1lx96r61GAbqvs2xsjIeMupaOgXGFHafEN0X3G11d6XGMjdfJQEYF08C8W81x0S5GFoMeR0hAszZBQM4snM7sF4K_-ft8s_tWjC82ELs_cnaxGqmu8PvHv5G7obME7QvQToj0KDQSZNYC9aZSQtdzN02PFAMFzDQLAfo_9r7wjAjbOskZTSn4vLtrAJipEu_0GqC_mlb3zom9totY-VWaDoTby2SmbNdxe_jeyVgOCsYChFU3wm64idm42GBw3iLwF0WqemFAP1q5UpLknN2QuGC_H4Vd43ZHO-OOjO1kV7vQ_UILUFX0kmxs75PgEI5XoIQDAa5McwYub64BAHJKpgfkhWU9qj-hUdRwrOHscwYUdm4UCRsf5wLHsAqK9P8YgagAm2S8d9P2stJSic=w1902-h910?auditContext=prefetch"
           alt="정답">
    </div>
  `;
}

function renderGameStatus(game) {
  // 1) 투표 중 / 경기 취소
  if (game.status === '투표 중' || game.status === '경기 취소') {
    return `
      <div class="game-status">
        <div class="status-text">${game.status}</div>
        <div class="game-time">${game.time || ''}</div>
      </div>
    `;
  }

  // 2) 경기 중
  if (game.status === '경기 중') {
    return `
      <div class="game-status">
        <div class="score-display">${game.homeScore} vs ${game.awayScore}</div>
        <div class="status-text">경기 중</div>
      </div>
    `;
  }

  // 3) 종료 or 무승부
  const isDraw = game.homeScore === game.awayScore;
  return `
    <div class="game-status">
      <div class="score-display">${game.homeScore} vs ${game.awayScore}</div>
      <div class="status-text">${isDraw ? '무승부' : '종료'}</div>
    </div>
  `;
}

// ======================
// 2. 제출 버튼 핸들러
// ======================
function setupSubmitHandler() {
  const state = window.appState;

  $(document)
    .off('click', '#submit-allkill-btn')
    .on('click', '#submit-allkill-btn', function() {
      if (state.currentDay !== state.today + 1) return;

      const totalGames    = kboGames.length;
      const selectedCount = Object.keys(state.selectedTeams).length;

      if (selectedCount < totalGames) {
        alert('모든 경기를 선택해주세요.');
        return;
      }

      alert(
        '제출완료 !\n' +
        '경기시작 전 까지\n' +
        '수정이 가능합니다.'
      );

      // 타임스탬프 생성
      const now     = new Date();
      const month   = now.getMonth() + 1;
      const day     = now.getDate();
      const hour    = now.getHours();
      const minute  = now.getMinutes().toString().padStart(2, '0');
      const stamp   = `${month}월 ${day}일 ${hour}:${minute}`;

      // 제목 변경 & subtitle 교체 & 버튼 텍스트 변경
      const $section = $('#team-selection-section-tomorrow');
      $section.find('.team-selection-title')
        .contents()
        .filter((_, el) => el.nodeType === 3)
        .remove()
        .end()
        .prepend('제출 완료 !');
      $section.find('.subtitle').text(stamp);
      $section.find('#submit-allkill-btn')
        .text('제출 완료 !')
        .append('<div class="spark"></div><div class="spark"></div><div class="spark"></div>');
    });
}

// ======================
// 3. 섹션 초기화
// ======================
function initTeamSelectionSection() {
  const state = window.appState;
  const { today, currentDay } = state;

  // Date Nav 계산
  const prevDay    = currentDay - 1;
  const nextDay    = currentDay + 1;
  const labelToday = currentDay === today ? 'Today' : currentDay;

  // Date Navigation HTML
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

  // 날짜별 콘텐츠 결정
  let contentHtml = '';

  if (currentDay === today + 1) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-tomorrow">
        <h2 class="team-selection-title">
          <img src="https://lh3.googleusercontent.com/fife/ALs6j_EGMKsZVEYj_hyBBStGhW0Nf9fRrySZe-IR7SkvyNlpOmA_Pu0amEak4tC5StxtIFW8QgIX1p7Vih9RLDP5Hax56Z2eYfErDTfyU8LarxTT2wid0uMkR2bsVJ8UoDXuKT9Mb4B-eRH32uM3DIJCjtVT2u3h8ALXI4iafYSH_-XuFUjggne4MQNEkzKAP0Qr8sOAb9qzYoONTc9XI9ZbAeFlPSMBzpctynKlhc7biI9-2pGf-VqLjR2Y_aPJV2qzSVwk_Oq_ImLkOZqN07ryrcT-ZuRo2HrOHF7uS5G9cEMaV1RnUzSjJC1IKZf8_Kjdn3bNfYodOS3qGrQjfE6wvAU2vtaJF3tda5K8wMMExAOs4UoulC33I2-0xsAbo1A_TAGWz3iimkshjhxYIFKh-AhoaKgjgCedvkuDSQxNvyBSAOBWdXQGRzVTIEMAOC7-DHkCMV8Q4Y4HnNqQK4EOxNBNz0WVkfxmWJS54nUa9wSbfHidz9x_QhSMyItyv2KMojqodVatrPgoMLaBOONSzDJa4TaisOjYdFBzXuqMYBe-3W7jRDeXhwv3ti7WBdHgsp_TphKEXRMI52f_VZ8gs4S5N1uFcIl2pk7wM4dHaRZFUEAyXdrvUcfmOJMhL8snu8AapIj2Uqv52lL1iVRlWrDDTylVTTIVkA0VR7lvbTJ3wCKzUGrGOy5pkCXwRx8rpVtT_znNdVcQYX_l5jWT-CLMax0o61AgTbJxuTYZKp9WViAwTqbkfRh_1pmaL3PAEuyYckPiOfw4kZj2y76Xoh1r8YFQcjt2or3fq13pH0-fSymIkhX-s8-uiL42RaIiUklSpn-T6QjRiAJyZF38tBWM9j-yniw1wDp8DjBFge0uNqRUGarU3eJC6kC99r-3drKHNauD8kAjL5-o58PJUDRJohiIWsGhV2w7mRRB2YFJ_B4ozBBGYCwpvgy698c7dFFzqYuD4-auGiChlBO0x-k1MrqRVU59YUm1V-8Z6Ez7j4F_3O07zmrT_WNZiaMoSmBkhwtTaBY-DXDhCK8W4xEm6krPV6Q9AgqKKORXWYgPGYBh9EnQBsl8jB7q8N4N42PhAikvbTbQWMjABPykg9WqC2Xd6WNt16GPeWCWgvlKAWgU3-X0EdQVVV0FoKd_lPkpp3W1RjSaQyni3OSWfmeEAyOU9polDh1bqalpN45Tqlj4DkbJm1yZ0cFJizAYKs3LKli5dwQqo23wCCG73CPtA4A_PnQMDdDJEs09Ie9u4-P9lj2Cg9CvYKibrVL3D4W0_1dx8ndVJH0wuSHmfbQ9aY8HUYAuGrS_vXwv2MpBzJ0S-KSo0QPygpNq7uJI-wyOzXtZuf8e2f5w4Mrn9Tdbgl5xKeuXViSbGa-LMgH44otK15kWzIbV2l12GfrJMMCDfwJhKRa4LXXV9OFEGa-JUerzXdR3c9Qdsf9FHmpHJLRM_0I8qqbwtj5UOFVohz_2EybCh0IChJbAsGhD5XfDShJP7xTG3tB10VprxuqInvSEI0BUFsCEuv8OkuIi4qipOmikZErZmgHdejHXzH0NgbCPZIJqUWRmMsWNJFVasiGuAJJCHbV6sdYvhHrbnRQ40n7hVPRcgoPwK2mmx7AN=w1902-h910?auditContext=prefetch" class="pointing-finger pointing-finger-left" alt="Left">
          올킬 도전!
          <img src="https://lh3.googleusercontent.com/fife/ALs6j_HFL3Aqu0wC0VWY1n9Zc49dtU6y7-kMlPqLgFnWKVkoJnQG_7kNdcItv5MHYEH_HReDpuAAtILKBIx8bcvkgHcQivI4oLjFhcjz9cAOTNfbTixhOpJoBEUpTeyGwUzt2PT6HWBmR23H5IqxSeeu9cuTA1HxqKPblSSWpqlOip7WbADruzwMAIaXpA-l4nHjwli9Qp5H3yO16BmJBlkjq1W1TPRqE5TCOluELt0R33AgT7jByNDa-UvYbqURWiNIanMwUEZR5j0erbJwOmN2dLIzQoONkC_AdS3lAsHamSg-Y8R-JRaQUmCk-rdM2KC59hb2y3x4H-UqNj1ZjY3BbdtSs0m7BbVfZsJKBNEWxnt4xSWz5E4TkdztNBcfmn32YmkEb724XJYftcNNP3-8N5_TpNWDtkJS18OK9G3vY2M3Ke3jEhSpOvHCWGM3FdiWJEcgDrJrBXQIqUdLcwlF9EOfDkPoLdOSm41aS0y0c8-ejN0NOiCMBDRIKs7-tEv4qFw7rTgSZgZdHz0cFi2yklvFdWmRdB_u3ozVW3nJdnr5sWmI9c_qR4GURHl1MXODkxwuQbLoTwrC9bFZVIvkVS4wl_hDy3gn8wacBGzGiMuQKFdRxTsOGXVcpvwCLitpenKOyD84jrT-PlShZeN_5Is9nQB--iu1cqTDMldaLzp4gNyy4G8buRvhsE9LrdjZHAZGFg8VsOn9XSx3w8n64dHV3YoQefAJzklmHxfTMsUT4M59IUPNUNpYp3NgqkTXGi0amYWFY1Os4DVSnivSIfh_32ZGHUhGJUKi0uj9kD29fMX0-zJEPlIJHBlNK7fr-wKxbZVs6v7fgfN7YmYn890Uw6xMtC2qDUGYhbu5yp8VvzU260gDZyTvEumy_1oixNHYTi2gaTWWAop2DGeTkGdjD_IKuEJTgviP4emJ-Dp4zw1pYZoY9oNNJe1yXhQIeG7is7kG08B9SimA_FO3OtOGm25DqmGvkmUp4SlD3YCRa0ZYaoHg6USvodqZyQVJyFmSnu9bblw2mzElh2ELxGYskLIUvU_wLYrXppzrE--JBrSfJjJ0Apb9XUZqR9QWni8Vpdm4PGNgfCMI2FnRAYMIDDGv2dEUEoccJ5uSbU7KYsccW0SOtZxU6GlSydV6GfqobyUINIk2n4YdId5-EnhrHpBZwZ-hcvRM8lSl6UdMnX-16FL29cL7hFyHvTLMt_SMZ9e5wSu3-lQ4cmgb8ty982ZZRDjzZ-uUt8H7pcE430TdcsayeNdhlFh28nMEwjGnmBS00GqoBNjTKIivYySnK9NjWoBzUalkunb2ZU2k9OE3dSf5NmRgy5ol0vLfH9xViIHB2sMufw3lsv8NiGa3oDtTlABnXJCyuNBDQfnqkocqnX0bVhHI62-KUK8l-rRWQpA4T5iUUv6CXFynhlXVa3EE9IswE-xIe6tuAveumNFgWddnFVXr0CwgTcGDfpbC7FiN_jQb62SN0-t184cTdKbEVkUPb5I4tiOG3ro8TNo7whVWlvzxnKthnsvk7__8lgyjZQKh79mHRj4QeBzW5jvw_O6bQOlf3G7n5udI8aNuU-w4HiilH4UgcBXNE_JlcYeSPuVPBYekI9mbBqTY=w1902-h910?auditContext=prefetch" class="pointing-finger pointing-finger-right" alt="Right">
          <span class="subtitle"></span>
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            올킬 제출
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-today">
        <h2 class="team-selection-title">
          <img src="https://lh3.googleusercontent.com/fife/ALs6j_EGMKsZVEYj_hyBBStGhW0Nf9fRrySZe-IR7SkvyNlpOmA_Pu0amEak4tC5StxtIFW8QgIX1p7Vih9RLDP5Hax56Z2eYfErDTfyU8LarxTT2wid0uMkR2bsVJ8UoDXuKT9Mb4B-eRH32uM3DIJCjtVT2u3h8ALXI4iafYSH_-XuFUjggne4MQNEkzKAP0Qr8sOAb9qzYoONTc9XI9ZbAeFlPSMBzpctynKlhc7biI9-2pGf-VqLjR2Y_aPJV2qzSVwk_Oq_ImLkOZqN07ryrcT-ZuRo2HrOHF7uS5G9cEMaV1RnUzSjJC1IKZf8_Kjdn3bNfYodOS3qGrQjfE6wvAU2vtaJF3tda5K8wMMExAOs4UoulC33I2-0xsAbo1A_TAGWz3iimkshjhxYIFKh-AhoaKgjgCedvkuDSQxNvyBSAOBWdXQGRzVTIEMAOC7-DHkCMV8Q4Y4HnNqQK4EOxNBNz0WVkfxmWJS54nUa9wSbfHidz9x_QhSMyItyv2KMojqodVatrPgoMLaBOONSzDJa4TaisOjYdFBzXuqMYBe-3W7jRDeXhwv3ti7WBdHgsp_TphKEXRMI52f_VZ8gs4S5N1uFcIl2pk7wM4dHaRZFUEAyXdrvUcfmOJMhL8snu8AapIj2Uqv52lL1iVRlWrDDTylVTTIVkA0VR7lvbTJ3wCKzUGrGOy5pkCXwRx8rpVtT_znNdVcQYX_l5jWT-CLMax0o61AgTbJxuTYZKp9WViAwTqbkfRh_1pmaL3PAEuyYckPiOfw4kZj2y76Xoh1r8YFQcjt2or3fq13pH0-fSymIkhX-s8-uiL42RaIiUklSpn-T6QjRiAJyZF38tBWM9j-yniw1wDp8DjBFge0uNqRUGarU3eJC6kC99r-3drKHNauD8kAjL5-o58PJUDRJohiIWsGhV2w7mRRB2YFJ_B4ozBBGYCwpvgy698c7dFFzqYuD4-auGiChlBO0x-k1MrqRVU59YUm1V-8Z6Ez7j4F_3O07zmrT_WNZiaMoSmBkhwtTaBY-DXDhCK8W4xEm6krPV6Q9AgqKKORXWYgPGYBh9EnQBsl8jB7q8N4N42PhAikvbTbQWMjABPykg9WqC2Xd6WNt16GPeWCWgvlKAWgU3-X0EdQVVV0FoKd_lPkpp3W1RjSaQyni3OSWfmeEAyOU9polDh1bqalpN45Tqlj4DkbJm1yZ0cFJizAYKs3LKli5dwQqo23wCCG73CPtA4A_PnQMDdDJEs09Ie9u4-P9lj2Cg9CvYKibrVL3D4W0_1dx8ndVJH0wuSHmfbQ9aY8HUYAuGrS_vXwv2MpBzJ0S-KSo0QPygpNq7uJI-wyOzXtZuf8e2f5w4Mrn9Tdbgl5xKeuXViSbGa-LMgH44otK15kWzIbV2l12GfrJMMCDfwJhKRa4LXXV9OFEGa-JUerzXdR3c9Qdsf9FHmpHJLRM_0I8qqbwtj5UOFVohz_2EybCh0IChJbAsGhD5XfDShJP7xTG3tB10VprxuqInvSEI0BUFsCEuv8OkuIi4qipOmikZErZmgHdejHXzH0NgbCPZIJqUWRmMsWNJFVasiGuAJJCHbV6sdYvhHrbnRQ40n7hVPRcgoPwK2mmx7AN=w1902-h910?auditContext=prefetch" class="pointing-finger pointing-finger-left" alt="Left">
          채점 중 !
          <img src="https://lh3.googleusercontent.com/fife/ALs6j_HFL3Aqu0wC0VWY1n9Zc49dtU6y7-kMlPqLgFnWKVkoJnQG_7kNdcItv5MHYEH_HReDpuAAtILKBIx8bcvkgHcQivI4oLjFhcjz9cAOTNfbTixhOpJoBEUpTeyGwUzt2PT6HWBmR23H5IqxSeeu9cuTA1HxqKPblSSWpqlOip7WbADruzwMAIaXpA-l4nHjwli9Qp5H3yO16BmJBlkjq1W1TPRqE5TCOluELt0R33AgT7jByNDa-UvYbqURWiNIanMwUEZR5j0erbJwOmN2dLIzQoONkC_AdS3lAsHamSg-Y8R-JRaQUmCk-rdM2KC59hb2y3x4H-UqNj1ZjY3BbdtSs0m7BbVfZsJKBNEWxnt4xSWz5E4TkdztNBcfmn32YmkEb724XJYftcNNP3-8N5_TpNWDtkJS18OK9G3vY2M3Ke3jEhSpOvHCWGM3FdiWJEcgDrJrBXQIqUdLcwlF9EOfDkPoLdOSm41aS0y0c8-ejN0NOiCMBDRIKs7-tEv4qFw7rTgSZgZdHz0cFi2yklvFdWmRdB_u3ozVW3nJdnr5sWmI9c_qR4GURHl1MXODkxwuQbLoTwrC9bFZVIvkVS4wl_hDy3gn8wacBGzGiMuQKFdRxTsOGXVcpvwCLitpenKOyD84jrT-PlShZeN_5Is9nQB--iu1cqTDMldaLzp4gNyy4G8buRvhsE9LrdjZHAZGFg8VsOn9XSx3w8n64dHV3YoQefAJzklmHxfTMsUT4M59IUPNUNpYp3NgqkTXGi0amYWFY1Os4DVSnivSIfh_32ZGHUhGJUKi0uj9kD29fMX0-zJEPlIJHBlNK7fr-wKxbZVs6v7fgfN7YmYn890Uw6xMtC2qDUGYhbu5yp8VvzU260gDZyTvEumy_1oixNHYTi2gaTWWAop2DGeTkGdjD_IKuEJTgviP4emJ-Dp4zw1pYZoY9oNNJe1yXhQIeG7is7kG08B9SimA_FO3OtOGm25DqmGvkmUp4SlD3YCRa0ZYaoHg6USvodqZyQVJyFmSnu9bblw2mzElh2ELxGYskLIUvU_wLYrXppzrE--JBrSfJjJ0Apb9XUZqR9QWni8Vpdm4PGNgfCMI2FnRAYMIDDGv2dEUEoccJ5uSbU7KYsccW0SOtZxU6GlSydV6GfqobyUINIk2n4YdId5-EnhrHpBZwZ-hcvRM8lSl6UdMnX-16FL29cL7hFyHvTLMt_SMZ9e5wSu3-lQ4cmgb8ty982ZZRDjzZ-uUt8H7pcE430TdcsayeNdhlFh28nMEwjGnmBS00GqoBNjTKIivYySnK9NjWoBzUalkunb2ZU2k9OE3dSf5NmRgy5ol0vLfH9xViIHB2sMufw3lsv8NiGa3oDtTlABnXJCyuNBDQfnqkocqnX0bVhHI62-KUK8l-rRWQpA4T5iUUv6CXFynhlXVa3EE9IswE-xIe6tuAveumNFgWddnFVXr0CwgTcGDfpbC7FiN_jQb62SN0-t184cTdKbEVkUPb5I4tiOG3ro8TNo7whVWlvzxnKthnsvk7__8lgyjZQKh79mHRj4QeBzW5jvw_O6bQOlf3G7n5udI8aNuU-w4HiilH4UgcBXNE_JlcYeSPuVPBYekI9mbBqTY=w1902-h910?auditContext=prefetch" class="pointing-finger pointing-finger-right" alt="Right">
          <span class="subtitle">1 경기 성공 !</span>
        </h2>
        <div class="game-list" id="game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            <span class="button-line">2경기 성공!</span>
            <span class="button-line">채점 중</span>
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today - 1) {
    contentHtml = `
      <div class="team-selection-section" id="state-yesterday">
        <h2 class="team-selection-title">
          다음 경기 도전 !<br/>
          <span class="subtitle">3 경기 성공!</span>
          <img src="https://lh3.googleusercontent.com/fife/ALs6j_E2prwI82Hv8jKw7W5__fyPOjuGW8-GTN5iQHMqntLjkb9FFFAx_9eCkOTmUuOeP7_pxHaetF20JhX5CYWd7gTtFO_GOz8tFs1HlJs8p9W4XOPPJzCoSGpEQ9mDkyM2Qza60X4FgFCJksl8rA5DHMj_MGRXKdOUC0pbWisCNZfU7KolD9oTIdecIInwA9TeqL8upB1dFzllsWcC6fKH7keS04W4BQ_WUsTQQZTV0euNEVWz8aK3lxcWPXtNM7XVXtx9amkr7fNg_1mTsRutjTX0OPtb44e6DebeBpwgI2cD8bChcvMSi0inrK9OlARCRBKcRF4yjwbiUpbGx2BQQmsmhyHK4dXZMx9aE4asHVxBQgtr1VTJxGi180c8aCH0HbrzmiBL-BU2yvijkhYSg7fUo3Rmksl3ZBCdh88BdG6M567uAdpbxp1l2FLRrygLWV8YB_d7D9_mc0NNea7VOphJzsko2qWMyhpzlG3Hpvhk389HhX3x26hSlXbdADT9oqg26SjxJE14wVhjeZtXVJ_a6Sa5_nbggvPg8u2z1NBbRbOqHgWkaE0Gb1f2jniBumgoLv2b3d00Mn4OBkSwWVpblNXAMdrNXaTq6KByD2OCEPGPGw_02lTVyzATdWCfSe5mEmcdFFIj1jfeaZdNISafgqVMSKquE7kDefPAFR0pdjZbMaR34lLQ1Iu9cK91MQSDP_03Fkrcho3lrQhHUPs6nVwuop1G1k4qEggSdDDOJRN5KjbyI1dKz_xePt2bMPpTFYXO0281oJ5Ur-CeoXSuVeRiFu52bm-XHksU9AhI02ANKp-aOL1LLM4vvWUYpUC4LtYPfPK7H3ZN1wudaUgKm7A48oVyZP1X8frRUVwF3H6IVFehpu8u30SvNHLlUsX1BDMmBPZVPjW8Ab7-8bPos3olpwl4iHVZm695AN57ATwdqmFQ3V186op0Aq82oSV0CcGgcLyk3BEISX7t2IglmGHTVJ4sjW9jOZ-CMkfaSsXsIh72vm3uz997y_VJ80LN2-VTWkwDRA8vzEJFw0a3aSEYr3HtEw4lo9ldphTh-zHvlFIRD0VuSekTSYIjYTEeP6mR-ciuoWCXZ9cXH0zm1JIl-_O5Uy5Rpd_mLp_QZcWN95lF-UmPt3i_gWE5tbgg0z_ixFaBZerFMzapqgnRukrCyrdoHwGYKuC--4CO0trRjYhaH-TGilh9-Jp5VzkXRpcOzT_UnKecfoPMLPmVRUPAHlObMVvdeA3cItxgyYyQPRUbaR2RFlAGAPJp_58ZiEXDC8NiTQCo3teqPGPvD9IGpbXFDMTn5fPmp55yqhA0w1UF8BcDvQvlEMHE3MtrHuqCB_5p9YcdbyKM16_A__nNe7p-UZVBj3WU5c3x6hyxzkrjqG5ZHvN4FNzjRiF45jQ4EA3fi9Uh098dXhvPg9_PdXSvr2uodm0lsJ1IQEkJMp7t4KAR7cbQx1Q9TsSEkpWfU5ZfE0cI0AnOmSvk4bkqTCX03im7oh7pz6-lzvuXX8FzZSIrcGySnvKyB5YDNCHjq0-Xt4P66ddaWumz73niY_8sHRHAZ20EAS7FYjEbUgvKKdfsjQj1LnInzgp36ZJIOTZM9Uc9GVsZanR6=w1902-h910?auditContext=prefetch" class="yesterday-icon right" alt="Icon">
        </h2>
        <div class="game-list" id="yesterday-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            다음 경기 도전!
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today - 2) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day24" style="position: relative;">
        <h2 class="team-selection-title">올킬 성공!</h2>
        <img src="https://lh3.googleusercontent.com/fife/ALs6j_EwqiDR9ASI7dvz5NmF5wU2O5PRv4xxCpAFDXph30Ku2uERLuOJ0YpHiSmRxgoMrGxzcfhop3jo-HzZqWt0HLAf-WUsraYgrXW3XTtL7e8Q-OXYrp4XrWrPb1nWNIzGKqRvOMRhyXuuimmbmrY52UlEwtcwa8NBIpgSos-nuEhGuOm6TO0lVkqxY6qza_aZ4DYalLjekAIHg_lgmyEurctY3GduOBhZX4bJwsf4EQwnBQla_aOSOIqnZAbVxiT3GPRUhJ5SpGHWJo4XmF9K4nxe6PqoVsOUDoM_LWejiCzh45XPonsfpnPow0sF_egwYsW0YZZcHDC8EUcCZSJi107Jv6VY_o7UoYsrpSD7PxyuT0AjlVTKgXDqMUehMcz_GeJdEKWrtrR_5NMB6sSv9MQj9JEb1zo1PXyQ0EPn22CXyx7lk8cAnJKltBu_oI3t2YMUT9gSGzTe0IPQnPMUlk1-ot0DUgGcDsjcDin2qSblkGUnS40Ih93y-yDhlB_X4J6fY0G3mEenjO9M3D89Di4geQMBhaJfL_YnHBVoVu0O7pWCdOPylzQDixa-5JIAhamxN-51BanCQoJLVs-0iq7gHODzicmSfeQkU218b9zsch8EvjON1AoTOnFVu7e9p6sWaUohAcxh3DJeyL6GCnov_alCS7jh7gdPt9MT5iSPFUq83WA20o9Mxie9O0sLJPZsbxVzWv9cQRbEIDMhyBPCx2ou90UaOO8h9AsILg_zOw2DLtoa02lnhSMPmpAZrV9uM0gcw6uJluIWuxX4HDAXslJB0QuNU_163_2PW0p50-JvcQ0BsMpodx1kbbDf9PZiC1rzXEphsxYUt02-lcavvgb8JQAJHx02l_aCvggWpVJ1CAc3sIc_z8dK9EMup_cX_5WFFZVY_ZVsDUXoMi5rk9c87t1wkds1g0j30ZQRxnoBwew-aabmap73ny_1L0nUBxUIulC-wp0ixLpB4Yd-r_8FtUod1hS7zTRaJpjbh7tPads1kIJXLF1EToDeJIJte5FQjtQIMQeShuhMQrx1rPP8u8j-nVGiFrDP6mef2wcRmpaWG7j99epbUnJhK5dkCiQNQUABWLwOauBSdOE1_9GojhrzzXv54SW4iomoKi05yxIC6WZ98ZY_mRYLq7C3cusIU6xcirbVFqpuJf1jsoBEi5qKPiWuplwpa-RgoXe-GxGXy6ICkh-KYGJ3JUYnlr547EtDu7Gbi1sIQhEtDWxXNQtdyf83-Pssu28046xpv17CojR_SRSuUnbhmA-dDFwTCgGSzFauESQbrrDQWYZzT7sGr_JSz2T-3MgxLBjzXQJECHZjwWKC92RUDtme7tiryd4G6IWZ4BJeT35HTnqA-wF2dfmcxIZ-YauAHNf3INTIT6eqqabQ26W7Pb_fNBZcBqfbvCIZ4p073y-Lm10VB747YpXtf0eAFAd3nivjxe_rMDlNHObf3pbrBBc-EQAS6o3eHEs1wiVJhvu_WC70RxMl39oTceMjLjvUrLJlVvd7l-J_uMAeepOQGtOOTRYz5jc5BdNSBJdHvFRrEoLSbZjUsBuD25iysCgoups0F7iWfJMkVUVe2ZslNfiGw3POC7FxrP8oy6J97Z6c=w1041-h910?auditContext=prefetch" class="allkill-stamp" alt="Stamp" />
        <div class="game-list" id="day24-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            올킬 성공!
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
        </div>
      </div>
    `;
  }
  else if (currentDay === today - 3) {
    contentHtml = `
      <div class="team-selection-section" id="team-selection-section-day23">
        <h2 class="team-selection-title">
          다음 올킬 도전 !<br/>
          <span class="subtitle">2경기 이상 경기 취소</span>
          <img src="https://lh3.googleusercontent.com/fife/ALs6j_E2prwI82Hv8jKw7W5__fyPOjuGW8-GTN5iQHMqntLjkb9FFFAx_9eCkOTmUuOeP7_pxHaetF20JhX5CYWd7gTtFO_GOz8tFs1HlJs8p9W4XOPPJzCoSGpEQ9mDkyM2Qza60X4FgFCJksl8rA5DHMj_MGRXKdOUC0pbWisCNZfU7KolD9oTIdecIInwA9TeqL8upB1dFzllsWcC6fKH7keS04W4BQ_WUsTQQZTV0euNEVWz8aK3lxcWPXtNM7XVXtx9amkr7fNg_1mTsRutjTX0OPtb44e6DebeBpwgI2cD8bChcvMSi0inrK9OlARCRBKcRF4yjwbiUpbGx2BQQmsmhyHK4dXZMx9aE4asHVxBQgtr1VTJxGi180c8aCH0HbrzmiBL-BU2yvijkhYSg7fUo3Rmksl3ZBCdh88BdG6M567uAdpbxp1l2FLRrygLWV8YB_d7D9_mc0NNea7VOphJzsko2qWMyhpzlG3Hpvhk389HhX3x26hSlXbdADT9oqg26SjxJE14wVhjeZtXVJ_a6Sa5_nbggvPg8u2z1NBbRbOqHgWkaE0Gb1f2jniBumgoLv2b3d00Mn4OBkSwWVpblNXAMdrNXaTq6KByD2OCEPGPGw_02lTVyzATdWCfSe5mEmcdFFIj1jfeaZdNISafgqVMSKquE7kDefPAFR0pdjZbMaR34lLQ1Iu9cK91MQSDP_03Fkrcho3lrQhHUPs6nVwuop1G1k4qEggSdDDOJRN5KjbyI1dKz_xePt2bMPpTFYXO0281oJ5Ur-CeoXSuVeRiFu52bm-XHksU9AhI02ANKp-aOL1LLM4vvWUYpUC4LtYPfPK7H3ZN1wudaUgKm7A48oVyZP1X8frRUVwF3H6IVFehpu8u30SvNHLlUsX1BDMmBPZVPjW8Ab7-8bPos3olpwl4iHVZm695AN57ATwdqmFQ3V186op0Aq82oSV0CcGgcLyk3BEISX7t2IglmGHTVJ4sjW9jOZ-CMkfaSsXsIh72vm3uz997y_VJ80LN2-VTWkwDRA8vzEJFw0a3aSEYr3HtEw4lo9ldphTh-zHvlFIRD0VuSekTSYIjYTEeP6mR-ciuoWCXZ9cXH0zm1JIl-_O5Uy5Rpd_mLp_QZcWN95lF-UmPt3i_gWE5tbgg0z_ixFaBZerFMzapqgnRukrCyrdoHwGYKuC--4CO0trRjYhaH-TGilh9-Jp5VzkXRpcOzT_UnKecfoPMLPmVRUPAHlObMVvdeA3cItxgyYyQPRUbaR2RFlAGAPJp_58ZiEXDC8NiTQCo3teqPGPvD9IGpbXFDMTn5fPmp55yqhA0w1UF8BcDvQvlEMHE3MtrHuqCB_5p9YcdbyKM16_A__nNe7p-UZVBj3WU5c3x6hyxzkrjqG5ZHvN4FNzjRiF45jQ4EA3fi9Uh098dXhvPg9_PdXSvr2uodm0lsJ1IQEkJMp7t4KAR7cbQx1Q9TsSEkpWfU5ZfE0cI0AnOmSvk4bkqTCX03im7oh7pz6-lzvuXX8FzZSIrcGySnvKyB5YDNCHjq0-Xt4P66ddaWumz73niY_8sHRHAZ20EAS7FYjEbUgvKKdfsjQj1LnInzgp36ZJIOTZM9Uc9GVsZanR6=w1902-h910?auditContext=prefetch" class="yesterday-icon right" alt="Icon">
        </h2>
        <div class="game-list" id="day23-game-list"></div>
        <div class="team-selection-submit">
          <button id="submit-allkill-btn" class="mega-sparkle-btn">
            다음 경기 도전!
            <div class="spark"></div><div class="spark"></div><div class="spark"></div>
          </button>
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

  $('#kbo-selection-container').html(dateNavHtml + contentHtml);
  renderGames();
  setupDateNavigationHandlers();
  setupSubmitHandler();
}

// ======================
// 4. 렌더링 로직
// ======================
function renderGames() {
  const { currentDay, today } = window.appState;

  if      (currentDay === today + 1) renderTomorrowGames();
  else if (currentDay === today)     renderTodayGames();
  else if (currentDay === today - 1) renderYesterdayGames();
  else if (currentDay === today - 2) renderDay24Games();
  else if (currentDay === today - 3) renderDay23Games();
}

function renderTomorrowGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;

  const html = kboGames.map((game, i) => {
    const bg = i % 2 === 0 ? 'alternate-bg' : '';
    const homeSel = state.selectedTeams[game.id] === 'home' ? 'selected-home' : '';
    const awaySel = state.selectedTeams[game.id] === 'away' ? 'selected-away' : '';
    const homeHigh = game.homeTeam.votes >= game.awayTeam.votes ? 'higher' : 'lower';
    const awayHigh = game.awayTeam.votes >= game.homeTeam.votes ? 'higher' : 'lower';

    return `
      <div class="game-item ${bg}" data-index="${game.id}">
        <div class="team-column">
          <div class="team-box ${homeSel}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${awaySel}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');

  $('#game-list').html(html);
  setupTeamSelectionHandlers();
}

function renderTodayGames() {
  const { formatNumber } = window.utils;
  const state = window.appState;

  const html = todayResults.map((game,i) => {
    const bg = i % 2 === 0 ? 'alternate-bg' : '';
    const homeSel = state.selectedTeams[game.id]==='home'?'selected-home':'';
    const awaySel = state.selectedTeams[game.id]==='away'?'selected-away':'';
    const homeHigh = game.homeTeam.votes>=game.awayTeam.votes?'higher':'lower';
    const awayHigh = game.awayTeam.votes>=game.homeTeam.votes?'higher':'lower';

    return `
      <div class="game-item ${bg}" data-index="${game.id}">
        ${i===1?`<div class="red-circle-container"><img class="red-circle-image" src="https://lh3.googleusercontent.com/fife/ALs6j_FS9zOwrQikdw3Flg2geoaU1oLq1Sf509QEYXI_kd1_khDbmg45PZnGJP29rnCfdVzeKU4cbj__RMzGfQNEgAinN8HO_595XgPB7jHIpfB9jMIyb6PLvTHrGiGWGv5__qo1C42W3T4ZTRUys5Jfiv78u6MHgQxAVE0lb3VjTVO6dFye000H0OUoIwBhWoTnMOlUBN_VlZr7AlituyZnsBBaO1i9MzhZnfwAUrRzaFeeDhsVEyz0zuzw6E-KyYCUaGGHnMCuig6DdBsvIfBgus52hvklCHkqnqVwQ-tG4ubYuz1w-1_8_TqUWIYuHSf8KCOQxY1-QyHLzF2ZTBov0D8VUjKAmvx-6-vVkyuvbNUnoIhpLWfbiIdQPt488WAc54OyGbTF0j2e5zYK80c8bJndsD0HOy7cyx9BbVDkExrEvQTplRfUckbk8GJh1WKJlGW_LVGsmh4PBcPEunnJGlP9p44c_oLqriPwcW8Hst43TzyPS_TkR4U8rlxBnciq4BOnpRsQ81da8zytZfMlRM6dSHuJfLbe5kOREvxL0EXhUs_2eSedt7YgZqMOudg1Y3q54q6VGEuqYjnJHonZ-mVjBKpCBk69TC3_zPgu4D626RQ0etZq50KPSRBzp73lllReofsLW3M9JFkRtPT7Vi4lmGuwHrObee8g9FS83JKoldzNVgnQC-_HpFjbGQzz1RgPAZVHeyM8vLAQ8bfrciWP3ulfA2QMKikwm6CG2OH7FX9RldNJx1Atc-7I2Wu59bp328MUObFySswAj_1udxoZ5dQRZn0GfZxY5rlLDZ_y8MtdamIqhp-Z09qnro2vj9KVqkBfiDcVuX5Q2IqmF2phn9BSF59qS30j7HZmkw3CRwi5VY7upTNbTIWyiRNVvGKoaFf-n1aZxyBqOVgNfhS3jgou6xX5N9BVAcCdfCKZokxYLD1yXpEaahF5hn8r6yfBBycsF7iUCShgj9jH_NJftX-Jo-siXBKKa0UI1LHuc1RlY0Wa6eDgtQaUoy2IQIVV2zrai_ySXFsn9XuI_Mv67x9fFIXzyvdfr7IMIGoDEFO7TrIBsk4LNFLGYlB3w9eVHm6uaVMuP_EvZ0BTJBpbc5cyOVmGPC02-2niJynAL-LdBw7uqo1QwIj-W5Q-irqQC-iKrK2bs9ILx5efurkoZZAvToETXXRDFTrCvKonm3FY0vpIIMGHWxjMdPTve0KQ1lx96r61GAbqvs2xsjIeMupaOgXGFHafEN0X3G11d6XGMjdfJQEYF08C8W81x0S5GFoMeR0hAszZBQM4snM7sF4K_-ft8s_tWjC82ELs_cnaxGqmu8PvHv5G7obME7QvQToj0KDQSZNYC9aZSQtdzN02PFAMFzDQLAfo_9r7wjAjbOskZTSn4vLtrAJipEu_0GqC_mlb3zom9totY-VWaDoTby2SmbNdxe_jeyVgOCsYChFU3wm64idm42GBw3iLwF0WqemFAP1q5UpLknN2QuGC_H4Vd43ZHO-OOjO1kV7vQ_UILUFX0kmxs75PgEI5XoIQDAa5McwYub64BAHJKpgfkhWU9qj-hUdRwrOHscwYUdm4UCRsf5wLHsAqK9P8YgagAm2S8d9P2stJSic=w1902-h910?auditContext=prefetch" alt="Highlight"></div>`:''}
        <div class="team-column">
          <div class="team-box ${homeSel}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${awaySel}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');

  $('#game-list').html(html);
  setupTeamSelectionHandlers();
}

function renderYesterdayGames() {
  const { formatNumber } = window.utils;
  const gamesHtml = yesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    const disableCls = game.correct === false ? 'disabled' : '';
    const highlightHtml = getHighlightHtml(game);

    return `
      <div class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
           data-index="${game.id}">
        ${highlightHtml}
        <!-- 홈 팀 칼럼 -->
        <div class="team-column">
          <div class="team-box ${game.homeTeam.winner ? 'selected-home' : ''}"
               data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name} 로고" />
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigherVotes ? 'higher' : 'lower'}">
            ${formatNumber(game.homeTeam.votes)}
          </div>
        </div>
        <!-- 상태/스코어 -->
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
        <!-- 어웨이 팀 칼럼 -->
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner ? 'selected-away' : ''}"
               data-game-id="${game.id}" data-team="away">
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

  $('#yesterday-game-list').html(gamesHtml);
}


function renderDay24Games() {
  const { formatNumber } = window.utils;
  const gamesHtml = dayBeforeYesterdayResults.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    const disableCls = game.correct === false ? 'disabled' : '';
    const highlightHtml = getHighlightHtml(game);

    return `
      <div class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
           data-index="${game.id}">
        ${highlightHtml}
        <div class="team-column">
          <!-- ... 홈 팀 ... -->
        </div>
        <div class="game-status">
          <!-- ... 스코어/상태 ... -->
        </div>
        <div class="team-column">
          <!-- ... 어웨이 팀 ... -->
        </div>
      </div>
    `;
  }).join('');

  $('#day24-game-list').html(gamesHtml);
}


function renderDay23Games() {
  const { formatNumber } = window.utils;
  const gamesHtml = day23Results.map((game, index) => {
    const isAlternateBackground = index % 2 === 0;
    const homeHigherVotes = game.homeTeam.votes >= game.awayTeam.votes;
    const awayHigherVotes = game.awayTeam.votes >= game.homeTeam.votes;
    const disableCls = game.correct === false ? 'disabled' : '';
    const highlightHtml = getHighlightHtml(game);

    return `
      <div class="match-result ${isAlternateBackground ? 'alternate-bg' : ''} ${disableCls}"
           data-index="${game.id}">
        ${highlightHtml}
          <div class="team-column">
          <div class="team-box ${game.homeTeam.winner?'selected-home':''}" data-game-id="${game.id}" data-team="home">
            <img class="team-logo" src="${game.homeTeam.logo}" alt="${game.homeTeam.name}">
            <span class="team-name">${game.homeTeam.name}</span>
          </div>
          <div class="vote-count ${homeHigh}">${formatNumber(game.homeTeam.votes)}</div>
        </div>
        ${renderGameStatus(game)}
        <div class="team-column">
          <div class="team-box ${game.awayTeam.winner?'selected-away':''}" data-game-id="${game.id}" data-team="away">
            <img class="team-logo" src="${game.awayTeam.logo}" alt="${game.awayTeam.name}">
            <span class="team-name">${game.awayTeam.name}</span>
          </div>
          <div class="vote-count ${awayHigh}">${formatNumber(game.awayTeam.votes)}</div>
        </div>
      </div>
    `;
  }).join('');
  $('#day23-game-list').html(gamesHtml);
}

// ======================
// 5. 네비게이션 & 선택 핸들러
// ======================
function setupDateNavigationHandlers() {
  const state = window.appState;

  function resetToDefaultSelections() {
    if (!Array.isArray(window.todayResults)) return {};
    return window.todayResults.reduce((acc, g) => {
      // 첫 5경기만 기본 선택
      acc[g.id] = ['home','away','away','home','home'][g.id];
      return acc;
    }, {});
  }

  $('#date-nav-prev').on('click', () => {
    state.currentDay--;
    if (state.currentDay === state.today) {
      state.selectedTeams = resetToDefaultSelections();
    }
    initTeamSelectionSection();
  });

  $('#date-nav-next').on('click', () => {
    state.currentDay++;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });

  $('#current-day').on('click', () => {
    state.currentDay = state.today;
    state.selectedTeams = resetToDefaultSelections();
    initTeamSelectionSection();
  });

  $('#prev-day').on('click', e => {
    e.stopPropagation();
    state.currentDay--;
    if (state.currentDay === state.today) {
      state.selectedTeams = resetToDefaultSelections();
    }
    initTeamSelectionSection();
  });

  $('#next-day').on('click', e => {
    e.stopPropagation();
    state.currentDay++;
    state.selectedTeams = {};
    initTeamSelectionSection();
  });

  $(document)
    .off('click', '#yesterday-nav-btn')
    .on('click', '#yesterday-nav-btn', () => {
      state.currentDay = state.today + 1;
      state.selectedTeams = {};
      initTeamSelectionSection();
    });

  $(document).on(
    'click',
    '#state-yesterday .team-selection-submit button, #team-selection-section-day24 .team-selection-submit button',
    () => {
      state.currentDay = state.today + 1;
      state.selectedTeams = {};
      initTeamSelectionSection();
    }
  );
}

function setupTeamSelectionHandlers() {
  const state = window.appState;

  $('.team-box').off('click').on('click', function() {
    const gameId = +$(this).data('game-id');
    const team   = $(this).data('team');
    state.selectedTeams[gameId] = team;
    updateTeamSelections();
    updateSubmitButton();

    // 이미 제출 완료 상태면 '수정 제출'로 변경
    if (state.currentDay === state.today + 1 &&
        $('#team-selection-section-tomorrow .team-selection-title').text().startsWith('제출 완료')) {
      $('#submit-allkill-btn')
        .text('수정 제출 !')
        .append('<div class="spark"></div><div class="spark"></div><div class="spark"></div>');
    }
  });
}

function updateTeamSelections() {
  const state = window.appState;
  Object.entries(state.selectedTeams).forEach(([id, team]) => {
    $(`.team-box[data-game-id="${id}"]`).removeClass('selected-home selected-away');
    $(`.team-box[data-game-id="${id}"][data-team="${team}"]`)
      .addClass(`selected-${team}`);
  });
}

function updateSubmitButton() {
  const state = window.appState;
  if (state.currentDay !== state.today + 1) return;

  const $btn = $('#submit-allkill-btn');
  if (!$btn.length) return;

  const allGames = kboGames.length;
  const selected = Object.keys(state.selectedTeams).length === allGames;

  if (selected) {
    $btn.addClass('enabled').prop('disabled', false).css({ opacity: 1, color: '#121212' });
  } else {
    $btn.removeClass('enabled').prop('disabled', true).css({ opacity: 0.3, color: 'rgba(18,18,18,0.7)' });
  }
}

// ======================
// 6. 내보내기
// ======================
window.teamSelectionSection = {
  init: initTeamSelectionSection,
  updateTeamSelections
};
