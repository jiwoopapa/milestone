# [PRD] AI 기반 습관 및 루틴 관리 웹앱

## 1. 프로젝트 개요

- **목적**: 사용자가 정의한 3대 성장 시간(아침, 이동, 저녁)을 중심으로 습관을 관리하고, AI(Claude Code 등)를 활용해 개발 생산성을 높이는 맞춤형 웹앱 구축.
- **타겟**: 루틴을 통해 성장을 지향하는 개발자 및 자기계발가.

---

## 2. 사용자 요구사항 (User Stories)

- **루틴 관리**: "나는 아침, 이동, 저녁 시간대별로 할 일을 구분하여 등록하고 관리하고 싶다."
- **진척도 시각화**: "나는 2,400km 러닝 목표나 독서 목표의 달성률을 직관적으로 보고 싶다."
- **데이터 연동**: "나는 Obsidian에 기록한 메모나 플래닝 데이터를 웹앱과 연동(또는 내보내기)하고 싶다."
- **AI 코칭**: "내가 루틴을 지키지 못했을 때 AI가 원인을 분석하거나 일정을 재조정해주길 바란다."

---

## 3. 핵심 기능 (Key Features)

| 구분 | 기능명 | 세부 내용 |
|------|--------|-----------|
| 핵심 | 시간대별 루틴 대시보드 | 아침(성장), 이동(학습), 저녁(행복) 카테고리별 체크리스트 제공 |
| 지표 | Goal Tracker | 러닝(누적 거리), 독서(권수), AI 스터디 등 장기 목표 대시보드 |
| 기술 | Claude Code Integration | 코드 수정이나 기능 추가 시 AI가 직접 PRD에 맞춰 구현하도록 설계 |
| 연동 | Markdown Export | 완료된 습관 데이터를 Obsidian ACE 프레임워크 형식의 MD 파일로 변환 |
| 부가 | Family Event Calendar | 월간 산행, 캠핑 등 가족 활동 일정을 별도로 관리 |

---

## 4. 기술 스택 (Proposed Tech Stack)

- **Frontend**: React.js 또는 Next.js (Vercel 배포 용이성)
- **Backend/DB**: Supabase (PostgreSQL + Auth를 한 번에 해결)
- **AI Tool**: Claude Code (CLI 기반 코드 생성 및 리팩토링)
- **Styling**: Tailwind CSS (빠른 UI 프로토타이핑)

---

## 5. 로드맵 (Roadmap)

- **Phase 1 (MVP)**: 3대 시간대별 루틴 등록 및 체크 기능 구현.
- **Phase 2 (Visual)**: 러닝/독서 목표 그래프 및 통계 페이지 추가.
- **Phase 3 (AI/Sync)**: Obsidian 연동 및 Claude Code를 통한 기능 자동화 고도화.
