# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

## 프로젝트 개요

Next.js 16, React 19, TypeScript를 사용하는 모던 웹 애플리케이션 스타터킷입니다. Shadcn/UI 컴포넌트와 Tailwind CSS v4를 활용하며, Atomic Design 패턴을 따릅니다.

## 주요 명령어

### 개발 서버 실행
```bash
npm run dev
```
개발 서버는 http://localhost:3000 에서 실행됩니다.

### 프로덕션 빌드
```bash
npm run build
npm start
```

### 린팅
```bash
npm run lint
```

## 아키텍처 구조

### 라우팅 구조
- **App Router 사용** (Next.js 13+)
- 라우트 그룹을 사용한 레이아웃 분리:
  - `app/(marketing)/*` - 마케팅 페이지 (홈, 소개, 연락처)
  - `app/examples/*` - 예제/데모 페이지

### 컴포넌트 계층 구조 (Atomic Design)

프로젝트는 Atomic Design 패턴을 따릅니다:

- **`components/ui/`** - Shadcn/UI 기반 기본 UI 컴포넌트 (Atoms)
  - Button, Input, Card, Dialog 등
  - `cn()` 유틸리티로 Tailwind 클래스 병합

- **`components/atoms/`** - 커스텀 최소 단위 컴포넌트
  - Spinner, Typography 등

- **`components/molecules/`** - 조합된 작은 컴포넌트
  - ThemeToggle, SearchInput, NavItem 등

- **`components/organisms/`** - 복잡한 기능 단위
  - Header, Footer, MobileNav, ContentCard, CodeBlock 등

- **`components/templates/`** - 페이지 레이아웃
  - BaseLayout 등

### 공통 유틸리티

- **`lib/utils.ts`** - `cn()` 함수: clsx + tailwind-merge
- **`lib/constants.ts`** - 사이트 설정, 네비게이션, 푸터 링크
- **`lib/validations.ts`** - Zod 스키마 기반 폼 검증

### 전역 설정

- **ThemeProvider** (`providers/theme-provider.tsx`): next-themes 기반 다크모드
- **Toaster** (Sonner): 전역 토스트 알림
- **TypeScript 경로 별칭**: `@/*` → 루트 디렉토리

### 스타일링

- **Tailwind CSS v4** - 최신 버전 사용
- **CSS Variables** - 다크/라이트 테마 지원
- **Geist Fonts** - Sans, Mono 폰트 사용

## 개발 패턴

### 새 컴포넌트 추가 시

1. Atomic Design 계층에 맞춰 적절한 디렉토리에 배치
2. UI 컴포넌트는 `components/ui/`에 있는 Shadcn 컴포넌트 활용
3. 스타일링은 Tailwind 유틸리티 클래스 사용
4. 클래스 병합 시 `cn()` 함수 사용

### 새 페이지 추가 시

1. `app/` 디렉토리에 폴더 생성
2. 마케팅 페이지는 `app/(marketing)/` 그룹에 추가
3. 예제 페이지는 `app/examples/` 에 추가
4. 메타데이터는 페이지 컴포넌트에서 export

### 폼 작성 시

- React Hook Form + Zod 조합 사용
- `@hookform/resolvers/zod` 로 스키마 연결
- 검증 스키마는 `lib/validations.ts` 에 정의

## 기술 스택

- **프레임워크**: Next.js 16.1.6 (App Router)
- **UI 라이브러리**: React 19.2.3
- **타입스크립트**: v5
- **스타일링**: Tailwind CSS v4, Shadcn/UI
- **폼**: React Hook Form + Zod
- **테마**: next-themes
- **알림**: Sonner
- **아이콘**: Lucide React

## 주의사항

- 언어: 한국어로 주석 및 문서 작성
- 코드 내 변수/함수명은 영어 사용
- App Router 전용이므로 Pages Router 패턴 사용 금지
- TypeScript strict 모드 활성화
