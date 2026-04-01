# Development Guidelines

## Project Overview

- AI 기반 습관 & 루틴 관리 웹앱 (Next.js 16 App Router + React 19 + TypeScript)
- Supabase(Auth + PostgreSQL), Tailwind CSS v4, Shadcn/UI, React Hook Form + Zod
- Atomic Design 패턴 적용, 다크모드 지원, 한국어 UI

---

## Project Architecture

### 라우트 구조

```
app/
├── (marketing)/          # 마케팅 페이지 (Header/Footer 포함)
│   ├── page.tsx          # 홈
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── layout.tsx
├── (auth)/               # 인증 페이지 (로그인/회원가입) — 추가 예정
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── layout.tsx
├── (app)/                # 인증 보호 페이지 — 추가 예정
│   ├── dashboard/page.tsx
│   ├── goals/page.tsx
│   ├── calendar/page.tsx
│   ├── settings/page.tsx
│   └── layout.tsx        # AppSidebar + AppHeader 포함
├── examples/             # 데모 페이지 (수정 금지)
├── layout.tsx            # 루트 레이아웃 (ThemeProvider, Toaster)
└── globals.css
```

### 컴포넌트 계층 (Atomic Design)

```
components/
├── ui/          # Shadcn/UI Atoms — shadcn CLI로만 추가
├── atoms/       # 커스텀 최소 단위 (Spinner, Typography 등)
├── molecules/   # 조합 컴포넌트 (ThemeToggle, SearchInput, NavItem 등)
├── organisms/   # 기능 단위 (Header, Footer, AppSidebar, ContentCard 등)
└── templates/   # 페이지 레이아웃 (BaseLayout, DashboardLayout 등)
```

### 핵심 유틸 파일

| 파일 | 역할 | 수정 시점 |
|------|------|-----------|
| `lib/utils.ts` | `cn()` (clsx + tailwind-merge) | 유틸 추가 시 |
| `lib/constants.ts` | siteConfig, navLinks, footerLinks, socialLinks | 설정/링크 변경 시 |
| `lib/validations.ts` | Zod 스키마 + 타입 export | 새 폼 추가 시 |
| `lib/date.ts` | date-fns 기반 날짜 헬퍼 | 추가 예정 |
| `lib/supabase/server.ts` | 서버 컴포넌트용 Supabase 클라이언트 | 추가 예정 |
| `lib/supabase/client.ts` | 클라이언트 컴포넌트용 Supabase 클라이언트 | 추가 예정 |
| `lib/claude.ts` | Claude API 연동 | Phase 4에서 추가 |
| `types/index.ts` | 공통 TypeScript 타입 | 새 타입 추가 시 |
| `providers/theme-provider.tsx` | next-themes ThemeProvider | 수정 금지 |

---

## Code Standards

- **변수/함수명**: 영어 camelCase (컴포넌트는 PascalCase)
- **주석**: 한국어, 복잡한 로직에만 작성
- **타입**: 모든 컴포넌트 Props는 TypeScript interface로 정의
- **경로 별칭**: 상대경로 대신 `@/` 사용 (예: `@/lib/utils`, `@/components/ui/button`)

---

## Functionality Implementation Standards

### 새 페이지 추가

1. 마케팅 페이지 → `app/(marketing)/[slug]/page.tsx`
2. 인증 페이지 → `app/(auth)/[slug]/page.tsx`
3. 앱 내부 페이지 → `app/(app)/[slug]/page.tsx`
4. 각 페이지에서 `export const metadata` 로 메타데이터 정의

### 새 컴포넌트 추가

1. Atomic Design 계층에 맞는 디렉토리에 배치
2. `cn()` 으로 클래스 병합: `import { cn } from "@/lib/utils"`
3. Shadcn/UI 컴포넌트 우선 사용 (`components/ui/`), 없을 때만 커스텀 제작
4. Shadcn 컴포넌트 추가: `npx shadcn@latest add [component]` (직접 파일 생성 금지)

### 새 타입 추가

- `types/index.ts` 에 interface 또는 type으로 추가
- Supabase 테이블 타입은 `types/supabase.ts` 에 별도 관리 (추가 예정)

### 새 폼 추가

1. `lib/validations.ts` 에 Zod 스키마 정의
2. 스키마 하단에 `z.infer<typeof schema>` 로 타입 export
3. 컴포넌트에서 `useForm` + `zodResolver` 사용:
   ```tsx
   const form = useForm<FormValues>({
     resolver: zodResolver(formSchema),
   });
   ```

### 새 상수/설정 추가

- 사이트 설정, 링크, 카테고리 등 → `lib/constants.ts` 에 추가
- 루틴 카테고리(아침·이동·저녁), 반복 옵션 등 도메인 상수도 여기에 정의

### Supabase 연동 (Phase 1~)

- **서버 컴포넌트/Route Handler**: `lib/supabase/server.ts` 의 클라이언트 사용
- **클라이언트 컴포넌트**: `lib/supabase/client.ts` 의 클라이언트 사용
- 두 파일을 혼용하지 말 것 (서버에서 클라이언트용 import 금지)
- 인증 보호 라우트: `middleware.ts` 에서 처리, 개별 페이지에서 중복 체크 금지

### 데이터 훅 (Phase 2~)

- `hooks/` 디렉토리에 `use[Feature].ts` 형식으로 작성
- 훅 내부에서 Supabase 클라이언트 직접 호출
- 예: `useUser()`, `useRoutines()`, `useGoals()`

### AI 코칭 (Phase 4~)

- Claude API 호출은 `lib/claude.ts` 에서만 처리
- 스트리밍 응답: Vercel AI SDK(`ai` 패키지) 사용
- 클라이언트에서 직접 Anthropic API 호출 금지 (반드시 Route Handler 경유)

---

## Styling Standards

- **Tailwind v4** CSS 유틸리티 클래스 사용
- **CSS Variables** (`globals.css`): 테마 색상은 변수로만 참조, 하드코딩 금지
  - 올바름: `bg-background`, `text-foreground`, `border-border`
  - 금지: `bg-white`, `text-gray-900` (테마 무관 색상 직접 지정)
- 클래스 병합 시 항상 `cn()` 사용
- 반응형: 모바일 우선(`sm:`, `md:`, `lg:` 순서)
- 애니메이션: `tw-animate-css` 라이브러리 활용

---

## Key File Interaction Standards

### 동시 수정이 필요한 파일 쌍

| 작업 | 수정할 파일들 |
|------|--------------|
| 새 네비게이션 링크 추가 | `lib/constants.ts` + `components/organisms/Header.tsx` |
| 새 폼 추가 | `lib/validations.ts` (스키마) + 폼 컴포넌트 파일 |
| 새 공통 타입 추가 | `types/index.ts` |
| Supabase 테이블 추가 | DB 마이그레이션 파일 + `types/supabase.ts` |
| 새 훅 추가 | `hooks/use[Feature].ts` 생성 |
| 루트 레이아웃 변경 | `app/layout.tsx` (전역 Provider 수정 시에만) |

---

## Prohibited Actions

- **Pages Router 패턴 사용 금지**: `getServerSideProps`, `getStaticProps`, `pages/` 디렉토리 생성 불가
- **`use client` 남용 금지**: 서버 컴포넌트로 가능한 것은 서버 컴포넌트로 유지
- **하드코딩된 색상 금지**: `bg-white`, `text-black` 등 테마 미지원 색상 직접 사용 불가
- **`components/ui/` 직접 수정 금지**: Shadcn 컴포넌트는 CLI로만 추가/업데이트
- **`providers/theme-provider.tsx` 수정 금지**
- **클라이언트에서 직접 Supabase 서버 클라이언트 import 금지**
- **클라이언트에서 직접 Anthropic API 호출 금지**
- **`git add -A` 금지**: 특정 파일만 스테이징
- **`.env` 파일 커밋 금지**: API 키, DB URL 등 민감 정보
- **불필요한 `try-catch` 추가 금지**: API 경계에서만 에러 핸들링
- **`examples/` 디렉토리 수정 금지**: 데모 페이지는 참조용으로만 사용

---

## AI Decision-making Standards

### 컴포넌트 위치 결정

```
단일 원자 UI? → components/atoms/
두 개 이상 atoms 조합? → components/molecules/
페이지 섹션 수준? → components/organisms/
전체 페이지 레이아웃? → components/templates/
Shadcn 컴포넌트? → components/ui/ (CLI 사용)
```

### 서버 vs 클라이언트 컴포넌트 결정

```
데이터 fetching, 민감 정보 접근, SEO 필요? → 서버 컴포넌트 (기본값)
useState/useEffect/이벤트 핸들러 필요? → "use client" 추가
```

### Supabase 클라이언트 선택

```
서버 컴포넌트 / Route Handler / middleware? → lib/supabase/server.ts
클라이언트 컴포넌트 / 훅? → lib/supabase/client.ts
```

### 새 기능 추가 순서

1. `types/index.ts` 에 타입 정의
2. `lib/validations.ts` 에 Zod 스키마 (폼 있을 경우)
3. `lib/constants.ts` 에 상수 (필요 시)
4. Supabase 마이그레이션 (DB 변경 시)
5. `hooks/` 에 데이터 훅 작성
6. 컴포넌트 계층 순서로 UI 구현 (atoms → molecules → organisms → template → page)
