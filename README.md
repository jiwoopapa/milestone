# AI 기반 습관 및 루틴 관리 웹앱

아침, 이동, 저녁 3대 성장 시간을 중심으로 습관을 관리하고, AI를 활용해 개발 생산성을 높이는 맞춤형 웹앱입니다.

## 주요 기능

- **시간대별 루틴 대시보드** — 아침(성장), 이동(학습), 저녁(행복) 카테고리별 체크리스트
- **Goal Tracker** — 러닝(누적 거리), 독서(권수) 등 장기 목표 시각화
- **Markdown Export** — Obsidian ACE 프레임워크 형식으로 습관 데이터 내보내기
- **Claude Code Integration** — AI 기반 코드 생성 및 기능 자동화
- **Family Event Calendar** — 가족 활동 일정 관리

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4, Shadcn/UI
- **DB**: Supabase (PostgreSQL + Auth)
- **Language**: TypeScript 5
- **AI**: Claude Code

## 시작하기

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버: [http://localhost:3000](http://localhost:3000)

## 빌드

```bash
npm run build
npm start
```

## 문서

- [PRD (Product Requirement Document)](./docs/PRD.md)

## 로드맵

- **Phase 1 (MVP)**: 시간대별 루틴 등록 및 체크 기능
- **Phase 2 (Visual)**: 목표 그래프 및 통계 페이지
- **Phase 3 (AI/Sync)**: Obsidian 연동 및 AI 자동화 고도화
