
// Meta 태그 관련 유틸리티 함수들
(function() {
  window.metaUtils = {
    
    // 현재 날짜 키를 생성하는 함수 (state.js의 currentDay 기반)
    getCurrentDateKey: function() {
      try {
        if (!window.appState || typeof window.appState.currentDay !== 'number') {
          console.warn('appState.currentDay not available');
          return null;
        }
        
        const day = window.appState.currentDay;
        const month = 6; // 2025년 6월
        const year = 2025;
        
        // YYYY-MM-DD 형태로 변환
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        console.log('Generated date key:', dateString);
        return dateString;
      } catch (error) {
        console.error('Error generating date key:', error);
        return null;
      }
    },

    // 오늘의 팀명들을 추출하는 함수
    extractTodayTeams: function() {
      try {
        const dateKey = this.getCurrentDateKey();
        if (!dateKey) {
          console.log('No valid date key, returning empty array');
          return [];
        }

        if (!window.matchData || !window.matchData[dateKey]) {
          console.log('No match data for date:', dateKey);
          return [];
        }

        const todayData = window.matchData[dateKey];
        if (!todayData.games || !Array.isArray(todayData.games)) {
          console.log('No games data for today');
          return [];
        }

        console.log('Processing games for today:', todayData.games.length, 'games');

        const teams = new Set(); // 중복 제거를 위해 Set 사용

        todayData.games.forEach((game, index) => {
          if (game && game.home && game.away) {
            const homeTeam = game.home.teamName;
            const awayTeam = game.away.teamName;

            // null, "null", undefined, 빈 문자열 체크
            if (homeTeam && homeTeam !== "null" && homeTeam.trim() !== "") {
              teams.add(homeTeam.trim());
            }
            if (awayTeam && awayTeam !== "null" && awayTeam.trim() !== "") {
              teams.add(awayTeam.trim());
            }
          }
        });

        const teamArray = Array.from(teams);
        console.log('Extracted teams:', teamArray);
        return teamArray;
      } catch (error) {
        console.error('Error extracting today teams:', error);
        return [];
      }
    },

    // keywords meta 태그를 업데이트하는 함수
    updateKeywordsMeta: function(teams) {
      try {
        if (!teams || teams.length === 0) {
          console.log('No teams to add to keywords');
          return;
        }

        // 기존 keywords 가져오기
        const keywordsElement = document.querySelector('meta[name="keywords"]');
        if (!keywordsElement) {
          console.warn('Keywords meta tag not found');
          return;
        }

        const originalKeywords = "LIVE스코어, 올킬, 야구 이벤트, 베팅 이벤트, 라이브 스코어, 경품";
        const newKeywords = originalKeywords + ", " + teams.join(", ");
        
        keywordsElement.setAttribute('content', newKeywords);
        console.log('Updated keywords:', newKeywords);
      } catch (error) {
        console.error('Error updating keywords meta:', error);
      }
    },

    // article:tag meta 태그들을 생성하는 함수
    createArticleTagMetas: function(teams) {
      try {
        if (!teams || teams.length === 0) {
          console.log('No teams to create article:tag metas');
          return;
        }

        // 기존 article:tag 메타들 제거 (있다면)
        const existingTags = document.querySelectorAll('meta[property="article:tag"]');
        existingTags.forEach(tag => tag.remove());

        // 새로운 article:tag 메타들 생성
        const head = document.head;
        teams.forEach(team => {
          const metaTag = document.createElement('meta');
          metaTag.setAttribute('property', 'article:tag');
          metaTag.setAttribute('content', team);
          head.appendChild(metaTag);
        });

        console.log(`Created ${teams.length} article:tag meta tags:`, teams);
      } catch (error) {
        console.error('Error creating article:tag metas:', error);
      }
    },

    // 모든 meta 태그를 업데이트하는 메인 함수
    updateAllMetaTags: function() {
      try {
        console.log('Starting meta tags update...');
        
        const teams = this.extractTodayTeams();
        
        if (teams.length >= 3) { // 최소 3개 팀이 있을 때만 업데이트
          this.updateKeywordsMeta(teams);
          this.createArticleTagMetas(teams);
          console.log('Meta tags updated successfully with teams:', teams);
        } else {
          console.log('Not enough teams found (less than 3), keeping original meta tags');
        }
      } catch (error) {
        console.error('Error in updateAllMetaTags:', error);
      }
    }
  };
})();
