import type { Metadata } from "next";
import { BaseLayout } from "@/components/templates/base-layout";
import { Container, Section, PageHeader } from "@/components/templates/base-layout";
import { ContentCard, CardGrid } from "@/components/organisms/content-card";

export const metadata: Metadata = {
  title: "카드 예시",
  description: "다양한 카드 레이아웃 예시입니다.",
};

const sampleCards = [
  {
    title: "Next.js 15 App Router",
    description:
      "최신 Next.js 15의 App Router를 사용하여 서버 컴포넌트와 스트리밍을 활용하세요.",
    badge: "프레임워크",
    href: "/examples/nextjs",
  },
  {
    title: "Tailwind CSS v4",
    description:
      "새로운 PostCSS 기반 설정과 OKLCH 색상 모델로 더 나은 스타일링 경험을 제공합니다.",
    badge: "스타일링",
    href: "/examples/tailwind",
  },
  {
    title: "Shadcn/UI 컴포넌트",
    description:
      "복사-붙여넣기로 사용할 수 있는 아름다운 UI 컴포넌트 모음입니다.",
    badge: "UI",
    href: "/examples/shadcn",
  },
  {
    title: "TypeScript 엄격 모드",
    description:
      "타입 안전성을 보장하여 런타임 오류를 사전에 방지하고 개발자 경험을 향상시킵니다.",
    badge: "언어",
    href: "/examples/typescript",
  },
  {
    title: "다크 모드 지원",
    description:
      "next-themes를 활용한 완벽한 다크 모드 지원. 시스템 설정에 따른 자동 전환도 가능합니다.",
    badge: "테마",
    href: "/examples/dark-mode",
  },
  {
    title: "폼 검증",
    description:
      "react-hook-form과 zod를 활용하여 강력하고 타입 안전한 폼 검증을 구현합니다.",
    badge: "폼",
    href: "/examples/form-validation",
  },
  {
    title: "반응형 디자인",
    description:
      "모바일부터 데스크톱까지 모든 화면 크기에 최적화된 반응형 레이아웃을 제공합니다.",
    href: "/examples/responsive",
  },
  {
    title: "토스트 알림",
    description:
      "sonner 라이브러리를 활용한 아름다운 토스트 알림으로 사용자 피드백을 제공합니다.",
    href: "/examples/toast",
  },
  {
    title: "Atomic Design",
    description:
      "Atoms, Molecules, Organisms, Templates 패턴으로 체계적인 컴포넌트 구조를 제공합니다.",
    href: "/examples/atomic-design",
  },
];

export default function CardsPage() {
  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="카드 컴포넌트"
            description="다양한 콘텐츠를 표시할 수 있는 카드 컴포넌트 예시입니다."
          />

          {/* 3열 그리드 */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">3열 그리드</h2>
            <CardGrid columns={3}>
              {sampleCards.map((card) => (
                <ContentCard key={card.title} {...card} />
              ))}
            </CardGrid>
          </div>

          {/* 2열 그리드 */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold">2열 그리드</h2>
            <CardGrid columns={2}>
              {sampleCards.slice(0, 4).map((card) => (
                <ContentCard key={card.title} {...card} />
              ))}
            </CardGrid>
          </div>

          {/* 4열 그리드 */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold">4열 그리드</h2>
            <CardGrid columns={4}>
              {sampleCards.slice(0, 8).map((card) => (
                <ContentCard key={card.title} {...card} />
              ))}
            </CardGrid>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
