// 사이트 기본 설정
export const siteConfig = {
  name: "Next.js 스타터킷",
  description: "모던 웹 애플리케이션을 위한 Next.js 스타터킷",
  url: "https://example.com",
  ogImage: "https://example.com/og.jpg",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
} as const;

// 네비게이션 링크
export const navLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/examples/cards", label: "예시" },
] as const;

// 푸터 링크
export const footerLinks = {
  main: [
    { href: "/about", label: "소개" },
  ],
} as const;

// 루틴 시간대
export const TIME_SLOTS = [
  { value: "morning", label: "아침 (성장)" },
  { value: "commute", label: "이동 (학습)" },
  { value: "evening", label: "저녁 (행복)" },
] as const;

// 루틴 반복 유형
export const REPEAT_TYPES = [
  { value: "daily", label: "매일" },
  { value: "weekdays", label: "평일 (월~금)" },
  { value: "custom", label: "요일 지정" },
] as const;

// 요일 목록 (0=일, 1=월 ... 6=토)
export const WEEKDAYS = [
  { value: 0, label: "일" },
  { value: 1, label: "월" },
  { value: 2, label: "화" },
  { value: 3, label: "수" },
  { value: 4, label: "목" },
  { value: 5, label: "금" },
  { value: 6, label: "토" },
] as const;

// 이벤트 카테고리
export const EVENT_CATEGORIES = [
  { value: "hiking", label: "산행" },
  { value: "camping", label: "캠핑" },
  { value: "etc", label: "기타" },
] as const;

// 앱 내부 네비게이션 링크
export const appNavLinks = [
  { href: "/dashboard", label: "대시보드", icon: "layout-dashboard" },
  { href: "/goals", label: "목표 트래커", icon: "target" },
  { href: "/calendar", label: "캘린더", icon: "calendar" },
  { href: "/settings", label: "설정", icon: "settings" },
] as const;

// 소셜 링크
export const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: "github" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
] as const;
