# TKSTOCK TERMINAL (PWA)

GitHub Pages로 배포하는 TKSTOCK 터미널(V41). 이 저장소는 **공개**이므로 비밀값을 넣지 않는다.

- 시트 웹앱 URL과 일지 저장 키는 파일에 없다. 처음 열 때 나오는 **SETUP** 화면에서 입력하면
  그 기기의 브라우저(localStorage)에만 저장된다. 명령창 `SETUP` 또는 하단 ⚙ 로 다시 열어 수정·삭제.
- URL을 입력하지 않으면 가상 데모 데이터로만 동작한다(실제 보유 내역 없음).
- `Code.gs`는 Apps Script 안에만 둔다. 이 저장소에 `.gs` 파일이나 배포 URL·키가 들어오면
  `deploy-pages` 워크플로의 '비밀값 검사' 단계가 배포를 멈춘다.

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 터미널 본체 |
| `manifest.json` · `icons/` | 홈 화면 설치 정보·아이콘 |
| `sw.js` | 앱 껍데기 캐시(오프라인 실행). 시트 데이터는 캐시하지 않음 |
| `robots.txt` | 검색엔진 수집 거부 |
| `.github/workflows/deploy-pages.yml` | main에 올리면 비밀값 검사 → Pages 배포 |

## 업데이트

- 터미널을 고치면 `index.html`만 교체해 커밋 → 자동 배포. 폰은 다음 실행 때 새 버전을 받는다.
- 아이콘·manifest를 바꿨다면 `sw.js`의 `CACHE` 이름 끝 숫자를 하나 올린다.
