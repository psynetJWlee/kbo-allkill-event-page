
# KBO 올킬 이벤트 페이지

KBO 야구 올킬 이벤트를 위한 인터랙티브 웹 페이지입니다. 사용자가 팀을 선택하고 게임 상태를 확인할 수 있는 이벤트 페이지를 제공합니다.

## 주요 기능

- 🏆 KBO 팀 선택 인터페이스
- 📊 실시간 게임 상태 표시
- 🎁 상품 랭킹 및 당첨자 정보
- 📱 반응형 모바일 친화적 디자인
- ✨ 인터랙티브 애니메이션 효과

## 기술 스택

이 프로젝트는 다음 기술들로 구축되었습니다:

- **Vite** - 빌드 도구 및 개발 서버
- **HTML5** - 마크업 구조
- **CSS3** - 스타일링 (CSS Variables, Flexbox, Grid)
- **Vanilla JavaScript** - 인터랙티브 기능
- **jQuery** - DOM 조작 및 이벤트 처리

## 프로젝트 구조

```
├── css/                    # 스타일시트
│   ├── base/              # 기본 스타일 (reset, variables)
│   ├── components/        # 컴포넌트별 스타일
│   ├── animations/        # 애니메이션 효과
│   └── utils/            # 유틸리티 스타일
├── js/                    # JavaScript 파일
│   ├── sections/         # 섹션별 스크립트
│   ├── utils/           # 유틸리티 함수
│   └── app.js           # 메인 애플리케이션
├── image/               # 이미지 및 아이콘
└── index.html          # 메인 HTML 파일
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

# 4단계: 개발 서버 시작 (포트 8080)
npm run dev
```

개발 서버가 실행되면 `http://localhost:8080`에서 프로젝트를 확인할 수 있습니다.


## 개발 참고사항

- CSS는 CSS Variables를 활용한 디자인 시스템 사용
- JavaScript는 모듈 패턴으로 구성
- 반응형 디자인을 위한 미디어 쿼리 적용
- 애니메이션 효과는 CSS와 JavaScript 조합으로 구현

## 스크롤 이동 기능 안내

- URL 쿼리 파라미터를 통해 주요 섹션으로 자동 스크롤되는 기능이 구현되어 있습니다.
- 아래와 같이 파라미터를 사용하면 접근 시 해당 영역으로 자동 이동합니다.

| 파라미터                | 이동 영역(섹션)           | 예시 URL 예시                                      |
|-------------------------|---------------------------|----------------------------------------------------|
| scrollToMyPrize=1       | My 상금(상금 내역)        | /?scrollToMyPrize=1                                |
| scrollToTeamSelection=1 | 팀 선택                   | /?scrollToTeamSelection=1                          |
| scrollToWinnersSection=1| 오늘의 우승자(당첨자)     | /?scrollToWinnersSection=1                         |

- 각 파라미터는 동시에 사용할 수 있으며, 우선순위는 코드상 구현 순서에 따릅니다.
- 내부적으로는 app.js에서 URLSearchParams로 파라미터를 감지하여 해당 섹션의 DOM 요소로 scrollIntoView를 실행합니다.

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- 모바일 브라우저 지원
