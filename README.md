
# KBO 올킬 이벤트 페이지

KBO 야구 올킬 이벤트를 위한 인터랙티브 웹 페이지입니다. 사용자가 팀을 선택하고 게임 상태를 확인할 수 있는 이벤트 페이지를 제공합니다.

## 프로젝트 정보

**URL**: https://lovable.dev/projects/93da1515-6934-4c14-bcee-c3d629cdb2f9

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

## 빌드 및 배포

### 프로덕션 빌드

```sh
npm run build
```

빌드된 파일은 `dist` 폴더에 생성되며, 정적 웹 호스팅 서비스에 배포할 수 있습니다.

### Lovable을 통한 배포

1. [Lovable 프로젝트](https://lovable.dev/projects/93da1515-6934-4c14-bcee-c3d629cdb2f9)에 접속
2. Share → Publish 클릭하여 배포

### 커스텀 도메인 연결

Project > Settings > Domains에서 커스텀 도메인을 연결할 수 있습니다.

자세한 내용: [커스텀 도메인 설정 가이드](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 코드 편집 방법

### Lovable 사용

[Lovable 프로젝트](https://lovable.dev/projects/93da1515-6934-4c14-bcee-c3d629cdb2f9)에서 직접 편집할 수 있습니다.

### 로컬 IDE 사용

저장소를 클론하여 선호하는 IDE에서 작업할 수 있습니다. 변경사항은 자동으로 Lovable과 동기화됩니다.

### GitHub에서 직접 편집

- 원하는 파일로 이동
- 우측 상단의 "Edit" 버튼(연필 아이콘) 클릭
- 변경 후 커밋

### GitHub Codespaces 사용

- 저장소 메인 페이지에서 "Code" 버튼 클릭
- "Codespaces" 탭 선택
- "New codespace"로 새 환경 실행

## 개발 참고사항

- CSS는 CSS Variables를 활용한 디자인 시스템 사용
- JavaScript는 모듈 패턴으로 구성
- 반응형 디자인을 위한 미디어 쿼리 적용
- 애니메이션 효과는 CSS와 JavaScript 조합으로 구현

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- 모바일 브라우저 지원
