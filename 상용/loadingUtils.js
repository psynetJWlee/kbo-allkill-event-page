// 로딩 화면 관리 유틸리티
window.loadingUtils = (function() {
    'use strict';
    
    let loadingSteps = [];
    let completedSteps = 0;
    let isLoading = true;
    let loadingStartTime = Date.now();
    const MIN_LOADING_TIME = 1000; // 최소 1초 로딩 화면 표시 (디버깅용으로 단축)
    
    const loadingOverlay = document.getElementById('loading-overlay');
    const progressBar = document.getElementById('loading-progress-bar');
    const loadingText = document.querySelector('.loading-text');
    const mainContainer = document.getElementById('main-container');
    
    // 로딩 단계 정의
    const LOADING_STEPS = [
        { name: 'api', text: 'API 연결 중...', duration: 500 },
        { name: 'eventInfo', text: '이벤트 정보 로딩 중...', duration: 800 },
        { name: 'gameData', text: '게임 데이터 로딩 중...', duration: 1000 },
        { name: 'userInfo', text: '사용자 정보 확인 중...', duration: 600 },
        { name: 'ui', text: 'UI 구성 중...', duration: 700 },
        { name: 'complete', text: '로딩 완료!', duration: 300 }
    ];
    
    // 로딩 단계 초기화
    function initializeLoading() {
        loadingSteps = [...LOADING_STEPS];
        completedSteps = 0;
        isLoading = true;
        loadingStartTime = Date.now();
        
        // 초기 상태 설정
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        if (loadingText) {
            loadingText.textContent = '페이지를 로딩중입니다...';
        }
        
        // 메인 콘텐츠 숨기기
        if (mainContainer) {
            mainContainer.classList.remove('loaded');
        }
        
        //console.log('로딩 초기화 완료');
    }
    
    // 특정 단계 완료 처리
    function completeStep(stepName) {
        if (!isLoading) {
            //console.log(`로딩이 이미 완료됨. 단계 무시: ${stepName}`);
            return;
        }
        
        const stepIndex = loadingSteps.findIndex(step => step.name === stepName);
        if (stepIndex === -1) {
            console.warn(`알 수 없는 로딩 단계: ${stepName}`);
            return;
        }
        
        const step = loadingSteps[stepIndex];
        if (step.completed) {
            //console.log(`이미 완료된 단계: ${stepName}`);
            return;
        }
        
        step.completed = true;
        completedSteps++;
        
        //console.log(`🎯 로딩 단계 완료: ${stepName} (${completedSteps}/${loadingSteps.length})`);
        //console.log('현재 완료된 단계들:', loadingSteps.filter(s => s.completed).map(s => s.name));
        
        // UI 업데이트
        updateLoadingUI();
        
        // 모든 단계 완료 확인
        if (completedSteps >= loadingSteps.length) {
            // 최소 로딩 시간 확인
            const elapsedTime = Date.now() - loadingStartTime;
            const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
            
            //console.log(`모든 단계 완료! 경과시간: ${elapsedTime}ms, 추가 대기: ${remainingTime}ms`);
            
            setTimeout(() => {
                finishLoading();
            }, remainingTime + 500);
        }
    }
    
    // 로딩 UI 업데이트
    function updateLoadingUI() {
        const progress = (completedSteps / loadingSteps.length) * 100;
        
        // 프로그레스 바 업데이트
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // 현재 진행 중인 단계의 텍스트 표시
        const currentStep = loadingSteps.find(step => !step.completed);
        if (currentStep && loadingText) {
            loadingText.textContent = currentStep.text;
        }
    }
    
    // 로딩 완료 처리
    function finishLoading() {
        if (!isLoading) return;
        
        isLoading = false;
        //console.log('모든 로딩 단계 완료');
        
        // 최종 텍스트 표시
        if (loadingText) {
            loadingText.textContent = '로딩 완료!';
        }
        
        // 프로그레스 바 100% 완료
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // 짧은 딜레이 후 페이드 아웃
        setTimeout(() => {
            hideLoading();
        }, 500);
    }
    
    // 로딩 화면 숨기기
    function hideLoading() {
        // 로딩 오버레이 페이드 아웃
        if (loadingOverlay) {
            loadingOverlay.classList.add('fade-out');
        }
        
        // 메인 콘텐츠 표시
        if (mainContainer) {
            mainContainer.classList.add('loaded');
        }
        
        // 페이드 아웃 완료 후 로딩 오버레이 제거
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
        }, 500);
        
        //console.log('로딩 화면 숨김 완료');
    }
    
    // 강제 로딩 완료 (에러 발생시 등)
    function forceComplete() {
        //console.log('🚨 로딩 강제 완료 실행');
        //console.log('강제 완료 전 상태:', {
//            completedSteps,
//            totalSteps: loadingSteps.length,
//            completedStepNames: loadingSteps.filter(s => s.completed).map(s => s.name),
//            pendingStepNames: loadingSteps.filter(s => !s.completed).map(s => s.name)
//        });
        
        // 모든 단계를 완료로 마킹
        loadingSteps.forEach(step => {
            step.completed = true;
        });
        completedSteps = loadingSteps.length;
        
        finishLoading();
    }
    
    // 로딩 상태 확인
    function isLoadingActive() {
        return isLoading;
    }
    
    // 진행률 반환
    function getProgress() {
        return (completedSteps / loadingSteps.length) * 100;
    }
    
    // 최대 로딩 시간 설정 (타임아웃)
    function setLoadingTimeout(timeout = 10000) {
        //console.log(`로딩 타임아웃 설정: ${timeout}ms`);
        setTimeout(() => {
            if (isLoading) {
                console.warn(`⏰ 로딩 타임아웃 (${timeout}ms), 강제 완료`);
                forceComplete();
            }
        }, timeout);
    }
    
    // 공개 API
    return {
        initialize: initializeLoading,
        completeStep: completeStep,
        forceComplete: forceComplete,
        isActive: isLoadingActive,
        getProgress: getProgress,
        setTimeout: setLoadingTimeout,
        hideLoading: hideLoading
    };
})();

// 페이지 로드 시 자동 초기화
document.addEventListener('DOMContentLoaded', function() {
    //console.log('🚀 로딩 유틸리티 DOM 준비 완료');
    window.loadingUtils.initialize();
    
    // 8초 타임아웃 설정 (디버깅 편의를 위해 조정)
    window.loadingUtils.setTimeout(8000);
    
    //console.log('로딩 유틸리티 초기화 완료');
});