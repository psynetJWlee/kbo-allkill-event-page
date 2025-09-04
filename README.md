
# KBO 올킬 이벤트 페이지

**LIVE스코어**의 KBO 야구 올킬 이벤트를 위한 인터랙티브 웹 페이지입니다. 매일 KBO 경기 결과를 모두 맞추면 상금을 받을 수 있는 이벤트 플랫폼을 제공합니다.

## 주요 기능

- 🏆 **KBO 팀 선택 시스템** - 매일 경기별 승부 예측 및 제출
- ⏰ **실시간 카운트다운** - 경기 시작 전까지 남은 시간 표시
- 🎮 **동적 게임 상태** - 경기 진행 상황 및 결과 실시간 업데이트
- 💰 **상금 내역 관리** - 개인 당첨 내역 및 누적 상금 조회
- 🏅 **당첨자 랭킹** - 일자별 당첨자 명단 및 순위 시스템
- 📊 **참여자 통계** - 실시간 참여자 수 및 투표 현황
- 📱 **모바일 최적화** - 430px 고정 너비의 모바일 친화적 디자인
- ✨ **애니메이션 효과** - 컨페티, 별 등 인터랙티브 시각 효과
- 🔗 **소셜 공유** - 카카오톡 공유 기능 내장

## 기술 스택

이 프로젝트는 다음 기술들로 구축되었습니다:

- **Vite** - 빌드 도구 및 개발 서버 (포트: 3000)
- **HTML5** - 시맨틱 마크업 및 SEO 최적화 (Google Analytics, Open Graph 메타태그)
- **CSS3** - 모던 스타일링
  - CSS Variables를 활용한 디자인 시스템
  - CSS Grid 및 Flexbox 레이아웃
  - CSS 애니메이션 (카운트다운, 컨페티, 상태 효과)
  - 컴포넌트별 모듈 구조
- **Vanilla JavaScript (ES6+)** - 모듈 패턴 기반 아키텍처
  - 섹션별 모듈화된 구조
  - 상태 관리 시스템
  - 실시간 데이터 업데이트
- **jQuery 3.7.1** - DOM 조작 및 이벤트 처리
- **카카오 JavaScript SDK** - 소셜 공유 기능
- **Google Fonts (Roboto)** 및 **KBO 다이아고딕** 폰트

## 프로젝트 구조

```
kbo-allkill-event-page/
├── css/                         # 스타일시트
│   ├── base/                   # 기본 스타일
│   │   ├── reset.css          # CSS 리셋
│   │   └── variables.css      # CSS 변수 정의
│   ├── components/            # 컴포넌트별 스타일
│   │   ├── event-title.css    # 이벤트 타이틀
│   │   ├── team-selection.css # 팀 선택 인터페이스
│   │   ├── my-prize.css       # 상금 내역
│   │   ├── winners.css        # 당첨자 목록
│   │   ├── prize-ranking.css  # 상금 랭킹
│   │   ├── game-status.css    # 게임 상태
│   │   ├── event-description.css # 이벤트 설명
│   │   ├── event-completion.css  # 이벤트 완료
│   │   └── pagination.css     # 페이지네이션
│   ├── animations/            # 애니메이션 효과
│   │   ├── countdown.css      # 카운트다운 애니메이션
│   │   ├── sparkle-button.css # 버튼 반짝임 효과
│   │   └── status-effects.css # 상태 효과
│   ├── utils/                 # 유틸리티 스타일
│   │   └── responsive.css     # 반응형 미디어 쿼리
│   ├── main.css              # 메인 CSS (전체 import)
│   └── animations.css        # 글로벌 애니메이션
├── js/                        # JavaScript 파일
│   ├── sections/             # 섹션별 모듈
│   │   ├── eventTitle.js     # 이벤트 타이틀 섹션
│   │   ├── teamSelection.js  # 팀 선택 섹션
│   │   ├── myPrize.js        # 상금 내역 섹션
│   │   ├── winners.js        # 당첨자 섹션
│   │   ├── prizeRanking.js   # 상금 랭킹 섹션
│   │   ├── eventDescription.js # 이벤트 설명 섹션
│   │   └── eventCompletion.js  # 이벤트 완료 섹션
│   ├── utils/                # 유틸리티 함수
│   │   └── animationUtils.js # 애니메이션 유틸리티
│   ├── app.js                # 메인 애플리케이션 엔트리
│   ├── data.js               # 정적 데이터 (팀 정보, 사용자 데이터)
│   ├── gamedata.js           # 게임 데이터 (경기 정보, 상태)
│   └── state.js              # 전역 상태 관리
├── image/                     # 이미지 리소스
│   ├── event-logo.png        # 이벤트 로고
│   ├── team 로고들            # KBO 팀별 로고
│   ├── 애니메이션 GIF들        # 이벤트 이모티콘
│   └── 아이콘들               # UI 아이콘
├── public/                    # 정적 파일
│   ├── favicon.ico           # 파비콘
│   └── robots.txt            # SEO 설정
├── index.html                 # 메인 HTML 파일
├── vite.config.js            # Vite 설정
└── package.json              # 프로젝트 의존성
```

## 개발 환경 설정

### 요구사항

- Node.js & npm 설치 - [nvm으로 설치하기](https://github.com/nvm-sh/nvm#installing-and-updating)

### 시작하기

```sh
# 1단계: 저장소 클론
git clone <YOUR_GIT_URL>

# 2단계: 프로젝트 디렉토리로 이동
cd <YOUR_PROJECT_NAME>

# 3단계: 의존성 설치
npm install

# 4단계: 개발 서버 시작 (포트 3000)
npm run dev
```

개발 서버가 실행되면 `http://localhost:3000`에서 프로젝트를 확인할 수 있습니다.

### 빌드 스크립트

```sh
# 프로덕션 빌드
npm run build

# 개발 모드 빌드
npm run build:dev

# 빌드 결과 미리보기
npm run preview
```


## 핵심 아키텍처

### 이벤트 상태 시스템

프로젝트는 복합적인 이벤트 상태 관리 시스템을 운영합니다:

- **PENDING_USER_NOT_SELECTED** - 이벤트 대기, 사용자 미선택
- **PENDING_USER_SELECTED** - 이벤트 대기, 사용자 선택 완료
- **IN_PROGRESS_USER_NOT_SELECTED** - 이벤트 진행 중, 사용자 미선택
- **IN_PROGRESS_USER_SELECTED** - 이벤트 진행 중, 사용자 선택 완료
- **COMPLETED_USER_SUCCESS** - 이벤트 종료, 사용자 성공
- **COMPLETED_USER_FAIL** - 이벤트 종료, 사용자 실패
- **COMPLETED_USER_NOT_SELECTED** - 이벤트 종료, 사용자 미선택
- **NO_GAMES_EVENT_DISABLED** - 경기 없음, 이벤트 참여 불가
- **EVENT_CANCELLED_MULTI_GAMES** - 3경기 이상 이벤트 취소

### 모듈 구조

각 섹션은 독립적인 모듈로 구성되어 있습니다:

- **이벤트 타이틀** - 동적 경기 수 표시 및 상금 안내
- **팀 선택** - 실시간 카운트다운, 투표 현황, 제출 시스템
- **상금 내역** - 개인 당첨 기록, 페이지네이션
- **당첨자 목록** - 일별 당첨자 명단, 무한 스크롤
- **이벤트 설명** - 규칙 안내, 다음 이벤트 알림

### 애니메이션 시스템

- **컨페티 애니메이션** - 당첨 시 축하 효과
- **카운트다운** - 시/분/초 개별 자릿수 애니메이션
- **상태 전환** - 부드러운 페이드 인/아웃
- **버튼 효과** - 반짝임 및 호버 애니메이션

## 개발 참고사항

- **모바일 퍼스트** - 430px 고정 너비 모바일 최적화
- **SEO 최적화** - 구조화된 데이터(JSON-LD), Open Graph 메타태그
- **상태 관리** - 중앙집중식 상태 관리 시스템 (`state.js`)
- **모듈화** - 섹션별 독립적인 JavaScript 모듈
- **CSS 아키텍처** - CSS Variables 기반 디자인 시스템
- **성능 최적화** - 애니메이션 타이머 관리, 메모리 누수 방지
- **접근성** - 시맨틱 HTML, ARIA 라벨

## 스크롤 이동 기능 안내

- URL 쿼리 파라미터를 통해 주요 섹션으로 자동 스크롤되는 기능이 구현되어 있습니다.
- 아래와 같이 파라미터를 사용하면 접근 시 해당 영역으로 자동 이동합니다.

| 파라미터                | 이동 영역(섹션)           | 예시 URL 예시                                      |
|-------------------------|---------------------------|----------------------------------------------------|
| scrollToMyPrize=1       | My 상금(상금 내역)        | /?scrollToMyPrize=1                                |
| scrollToTeamSelection=1 | 팀 선택                   | /?scrollToTeamSelection=1                          |
| scrollToWinnersSection=1| 오늘의 우승자(당첨자)     | /?scrollToWinnersSection=1                         |

- 각 파라미터는 동시에 사용할 수 있으며, 우선순위는 코드상 구현 순서에 따릅니다.
- 내부적으로는 `app.js`에서 `URLSearchParams`로 파라미터를 감지하여 해당 섹션의 DOM 요소로 `scrollIntoView`를 실행합니다.

## 데이터 구조

### 게임 데이터 (`gamedata.js`)

매일의 경기 정보와 이벤트 상태를 관리하는 중앙 데이터입니다:

```javascript
window.matchData = {
  "2025-08-20": {
    eventStatus: "COMPLETED_USER_SUCCESS",
    totalParticipants: 15000,
    winners: 2443,
    games: [
      {
        gameId: "20250820-0",
        home: { teamName: "LG", logo: "...", votes: 3215 },
        away: { teamName: "KT", logo: "...", votes: 1111 },
        draw: { teamName: "무승부", votes: 2496 },
        status: "경기종료",
        score: { home: 8, away: 3 },
        userSelection: "home",
        gameResult: "home",
        eventResult: "success"
      }
      // ... 더 많은 경기 데이터
    ]
  }
  // ... 다른 날짜들
}
```

### 사용자 데이터 (`data.js`)

- **팀 로고 URL** - KBO 10개 구단 로고
- **당첨자 정보** - 일별 당첨자 명단 및 상금
- **상금 내역** - 개인 당첨 기록
- **랭킹 데이터** - 누적 순위 시스템

## 환경 설정

### 외부 서비스 연동

- **Google Analytics (GTM)** - 사용자 행동 분석
- **카카오 JavaScript SDK** - 소셜 공유 기능
- **광고 스크립트** - 수익화 시스템

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- 모바일 브라우저 지원
