
# KBO 올킬 이벤트 페이지 - 정적 파일 빌드 가이드

이 문서는 React + TypeScript 프로젝트를 순수 HTML/CSS/JS 정적 파일로 변환하는 방법을 안내합니다.

## 빌드 방법

1. **프로젝트 빌드하기**

```bash
npm install
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

2. **정적 파일 구성**

빌드 후 다음과 같은 정적 파일 구조가 생성됩니다:

```
dist/
├── index.html          # 메인 HTML 파일
├── assets/             # 번들링된 JS 및 CSS 파일
│   ├── index-[hash].js     # 메인 JavaScript 번들
│   ├── index-[hash].css    # 메인 CSS 번들
│   └── ...                 # 기타 에셋 파일
└── static-js/         # 추가 바닐라 JS 파일
    └── team-selection.js   # 팀 선택 기능 구현 스크립트
```

3. **추가 설정**

- `index.html` 파일은 이미 필요한 스크립트와 스타일을 포함하고 있습니다.
- 인터랙티브 기능(팀 선택)은 `static-js/team-selection.js`에 구현되어 있습니다.

## 순수 HTML/CSS/JS로 전환

빌드된 파일은 이미 최적화된 정적 HTML/CSS/JS 파일입니다. 별도의 서버 로직이 없으므로, 
이 파일들은 어떤 정적 웹 호스팅에서도 실행할 수 있습니다.

## 주의사항

- 빌드된 파일들은 경로에 해시값이 포함되어 있으므로, 파일명이 빌드마다 변경될 수 있습니다.
- `index.html`에는 모든 필요한 스크립트와 스타일링 참조가 자동으로 포함됩니다.
- `static-js` 폴더의 바닐라 JS 파일은 React 기능을 대체하기 위한 것으로, `index.html`에 수동으로 추가해야 합니다.

## HTML에 바닐라 JS 스크립트 추가하기

빌드된 `index.html` 파일을 열고 다음 코드를 추가합니다:

```html
<script src="./static-js/team-selection.js"></script>
```

이 코드를 기존 스크립트 태그 바로 앞에 추가하면 됩니다.
