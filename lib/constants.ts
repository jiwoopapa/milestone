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
