// API 유틸리티 모듈
window.apiUtils = (function() {
    'use strict';
    
    // API 응답 캐시 저장소
    const cache = new Map();
    const CACHE_DURATION = 60000; // 60초 캐시 유지 (경기 데이터는 자주 변경되지 않음)
    const CACHE_SHORT_DURATION = 10000; // 10초 캐시 (실시간성이 중요한 데이터)
    
    // 캐시 엔트리 구조: { data: response, timestamp: Date.now() }
    function getCacheKey(url, method, data) {
        return `${method}:${url}:${JSON.stringify(data || {})}`;
    }
    
    function isCacheValid(entry, duration = CACHE_DURATION) {
        return entry && (Date.now() - entry.timestamp) < duration;
    }
    
    function getCachedResponse(cacheKey) {
        const entry = cache.get(cacheKey);
        if (isCacheValid(entry)) {
            //console.log('캐시에서 응답 반환:', cacheKey);
            return Promise.resolve(entry.data);
        }
        return null;
    }
    
    function setCachedResponse(cacheKey, response) {
        cache.set(cacheKey, {
            data: response,
            timestamp: Date.now()
        });
        //console.log('응답 캐시 저장:', cacheKey);
    }
    
    // 공통 Ajax 요청 함수
    function makeRequest(url, method = 'GET', data = null, useCache = true) {
        const cacheKey = getCacheKey(url, method, data);
        
        // 캐시 사용이 활성화되고 GET 요청인 경우 캐시 확인
        if (useCache && method === 'GET') {
            const cachedResponse = getCachedResponse(cacheKey);
            if (cachedResponse) {
                return cachedResponse;
            }
        }
        
        return new Promise((resolve, reject) => {
            const options = {
                url: url,
                method: method,
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        // 성공한 GET 응답은 캐시에 저장
                        if (useCache && method === 'GET') {
                            setCachedResponse(cacheKey, response);
                        }
                        resolve(response);
                    } else {
                        reject(new Error(response.message || 'API 요청 실패'));
                    }
                },
                error: function(xhr, status, error) {
                    console.error('API 요청 오류:', {
                        url: url,
                        status: status,
                        error: error,
                        response: xhr.responseText
                    });
                    reject(new Error('네트워크 오류가 발생했습니다.'));
                }
            };
            
            if (data && method === 'POST') {
                options.data = data;
                options.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
            }
            
            $.ajax(options);
        });
    }
    
    // 로그인 상태 확인
    function checkLogin() {
        return makeRequest('/api/check-login.do');
    }
    
    // 특정 날짜의 경기 정보 조회 (캐시 사용)
    function getGames(date) {
        return makeRequest(`/api/games.do?date=${encodeURIComponent(date)}`, 'GET', null, true);
    }
    
    // 특정 날짜의 경기 정보 조회 (캐시 무시, 실시간 데이터 필요시)
    function getGamesNoCache(date) {
        return makeRequest(`/api/games.do?date=${encodeURIComponent(date)}`, 'GET', null, false);
    }
    
    // 특정 날짜의 경기 정보 조회 (최적화된 단일 쿼리 사용)
    function getGamesOptimized(date) {
        return makeRequest(`/api/games-optimized.do?date=${encodeURIComponent(date)}`, 'GET', null, true);
    }
    
    // 특정 날짜의 경기 정보 조회 (최적화된 단일 쿼리, 캐시 무시)
    function getGamesOptimizedNoCache(date) {
        return makeRequest(`/api/games-optimized.do?date=${encodeURIComponent(date)}`, 'GET', null, false);
    }
    
    // 캐시 초기화 함수
    function clearCache() {
        cache.clear();
        //console.log('API 캐시가 초기화되었습니다.');
    }
    
    // 특정 날짜의 캐시만 제거
    function clearGameCache(date) {
        const url = `/api/games.do?date=${encodeURIComponent(date)}`;
        const cacheKey = getCacheKey(url, 'GET', null);
        cache.delete(cacheKey);
        //console.log('게임 캐시 삭제:', date);
    }
    
    // 이벤트가 있는 날짜 목록 조회
    function getEventDates() {
        return makeRequest('/api/event-dates.do');
    }
    
    // 이벤트 정보 조회
    function getEventInfo() {
        return makeRequest('/api/event-info.do');
    }
    
    // 당첨자 목록 조회
    function getWinners(page = 1, pageSize = 10) {
        return makeRequest(`/api/winners.do?page=${page}&pageSize=${pageSize}`);
    }
    
    // 특정 날짜의 당첨자 목록 조회
    function getWinnersByDate(date, page = 1, pageSize = 10) {
        return makeRequest(`/api/winners.do?page=${page}&pageSize=${pageSize}&winnerDate=${date}`, 'GET', null, false);
    }
    
    // 당첨자가 있는 날짜 목록 조회
    function getWinnerDates() {
        return makeRequest('/api/winner-dates.do', 'GET', null, false);
    }
    
    // 랭킹 목록 조회
    function getRankings(page = 1, pageSize = 10) {
        return makeRequest(`/api/rankings.do?page=${page}&pageSize=${pageSize}`);
    }
    
    // 상금 내역 조회
    function getPrizeHistory(page = 1, pageSize = 10) {
        return makeRequest(`/api/prize-history.do?page=${page}&pageSize=${pageSize}`);
    }
    
    // 팀 선택 저장 (개별) - 현재 사용하지 않음
    function saveTeamSelection(gameId, selection) {
        // 개별 저장은 현재 사용하지 않음
        return Promise.resolve({ success: true, message: '로컬 저장됨' });
    }
    
    // 전체 선택 정보 저장 (올킬 도전용)
    function saveAllSelections(selections, eventDate = null) {
        // 이벤트 날짜 검증
        if (eventDate) {
            const today = formatDate(new Date()).replace(/-/g, ''); // YYYY-MM-DD -> YYYYMMDD
            const targetDate = eventDate; // 이미 YYYYMMDD 형식
            
            if (targetDate !== today) {
                const error = new Error(`당일경기 투표만 가능합니다.`);
                console.error('날짜 검증 실패:', { eventDate, today: today, targetDate });
                return Promise.reject(error);
            }
        }
        
        const jsonData = JSON.stringify(selections);
        //console.log('전송할 JSON 데이터:', jsonData);
        //console.log('선택 정보 개수:', Object.keys(selections).length);
        //console.log('이벤트 날짜:', eventDate);
        
        const postData = {
            selectionsJson: jsonData
        };
        
        // eventDate가 있으면 추가
        if (eventDate) {
            postData.eventDate = eventDate;
        }
        
        return makeRequest('/api/save-all-selections.do', 'POST', postData);
    }
    
    // 날짜 포맷 유틸리티
    function formatDate(date) {
        if (typeof date === 'string') {
            return date;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // 에러 처리 유틸리티
    function handleError(error, context = '') {
        console.error(`API 오류 ${context}:`, error);
        // 필요시 사용자에게 알림 표시 가능
    }
    
    // 성능 비교 테스트 함수 (예: getGamesOptimized vs getGames 속도 비교)
    async function performanceTest(date, iterations = 5) {
        //console.log(`성능 테스트 시작: ${date}, 반복 횟수: ${iterations}`);
        
        // 캐시 초기화
        clearCache();
        
        // 기존 API 테스트
        const legacyTimes = [];
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            try {
                await makeRequest(`/api/games.do?date=${encodeURIComponent(date)}`, 'GET', null, false);
                const end = performance.now();
                legacyTimes.push(end - start);
            } catch (error) {
                console.error(`기존 API 테스트 ${i+1} 실패:`, error);
            }
        }
        
        // 캐시 초기화
        clearCache();
        
        // 최적화된 API 테스트
        const optimizedTimes = [];
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            try {
                await makeRequest(`/api/games-optimized.do?date=${encodeURIComponent(date)}`, 'GET', null, false);
                const end = performance.now();
                optimizedTimes.push(end - start);
            } catch (error) {
                console.error(`최적화 API 테스트 ${i+1} 실패:`, error);
            }
        }
        
        // 결과 계산
        const avgLegacy = legacyTimes.reduce((a, b) => a + b, 0) / legacyTimes.length;
        const avgOptimized = optimizedTimes.reduce((a, b) => a + b, 0) / optimizedTimes.length;
        const improvement = ((avgLegacy - avgOptimized) / avgLegacy * 100).toFixed(1);
        
        //console.log('=== 성능 테스트 결과 ===');
        //console.log(`기존 API 평균 응답시간: ${avgLegacy.toFixed(2)}ms`);
        //console.log(`최적화 API 평균 응답시간: ${avgOptimized.toFixed(2)}ms`);
        //console.log(`성능 향상: ${improvement}%`);
        
        return {
            legacy: { avg: avgLegacy, times: legacyTimes },
            optimized: { avg: avgOptimized, times: optimizedTimes },
            improvement: improvement
        };
    }
    
    // 공개 API
    return {
        checkLogin,
        getGames,
        getGamesNoCache,
        getGamesOptimized,
        getGamesOptimizedNoCache,
        clearCache,
        clearGameCache,
        getEventDates,
        getEventInfo,
        getWinners,
        getWinnersByDate,
        getWinnerDates,
        getRankings,
        getPrizeHistory,
        saveTeamSelection,
        saveAllSelections,
        formatDate,
        handleError,
        performanceTest
    };
})(); 