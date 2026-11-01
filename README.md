# 사주 운세 (Saju Fortune Web)

양력 생일 하나로 사주팔자와 오행 분포를 계산하고, **사업운 · 연애운 · 재물운** 중 하나를 골라
**매일 · 월간 · 한해 운세**를 풀이해 주는 웹앱입니다.

- 🧮 계산 엔진: [`saju-fortune`](https://www.npmjs.com/package/saju-fortune) (k-skill) — 순수 JavaScript로 브라우저 번들
- ⚙️ 배포: GitHub Pages (정적 사이트, 백엔드 없음)
- 🔒 개인정보: 생년월일은 브라우저 안에서만 계산되며 서버로 전송되지 않습니다

## 로컬 실행

```bash
# 파일 서버로 열기
python -m http.server 8000
# → http://localhost:8000
```

## 빌드 (bundle 재생성)

```bash
npx --yes esbuild <node-global-root>/node_modules/saju-fortune/src/index.js \
  --bundle --format=iife --global-name=SajuFortune \
  --outfile=saju-bundle.js
```

## 배포

```bash
gh repo create saju-web --public --source . --remote origin --push
gh api repos/<user>/saju-web/pages -X POST \
  -f "source[branch]=main" -f "source[path]=/" -f "build_type=legacy"
```
