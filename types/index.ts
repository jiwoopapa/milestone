// 공통 타입 정의

// 네비게이션 아이템 타입
export interface NavItem {
  href: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
}

// 소셜 링크 타입
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// 카드 컴포넌트 Props
export interface CardProps {
  title: string;
  description: string;
  href?: string;
  image?: string;
  badge?: string;
}

// 페이지 헤더 Props
export interface PageHeaderProps {
  title: string;
  description?: string;
}

// 기능 아이템 타입 (Features 섹션용)
export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// 서버 액션 응답 타입
export interface ActionResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
