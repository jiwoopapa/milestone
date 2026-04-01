import Link from "next/link";
import { ArrowRight, Zap, Palette, Code, Shield, Sparkles, Layers } from "lucide-react";

import { Container, Section, PageHeader } from "@/components/templates/base-layout";
import { Button } from "@/components/ui/button";
import { FeatureCard, CardGrid } from "@/components/organisms/content-card";

const features = [
  {
    icon: Zap,
    title: "빠른 시작",
    description:
      "Next.js 15와 최신 기술 스택으로 몇 분 만에 프로젝트를 시작하세요.",
  },
  {
    icon: Palette,
    title: "모던 디자인",
    description:
      "Shadcn/UI와 Tailwind CSS로 아름다운 UI를 쉽게 구축할 수 있습니다.",
  },
  {
    icon: Code,
    title: "TypeScript",
    description:
      "타입 안전성과 개발자 경험을 위한 TypeScript 엄격 모드가 적용되어 있습니다.",
  },
  {
    icon: Shield,
    title: "폼 검증",
    description:
      "react-hook-form과 zod로 강력한 폼 검증을 쉽게 구현할 수 있습니다.",
  },
  {
    icon: Sparkles,
    title: "다크 모드",
    description:
      "next-themes로 완벽한 다크 모드를 지원합니다. 시스템 설정도 자동 감지됩니다.",
  },
  {
    icon: Layers,
    title: "컴포넌트 계층",
    description:
      "Atomic Design 패턴으로 체계적인 컴포넌트 구조를 제공합니다.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <Section className="pt-20 md:pt-32">
        <Container className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            모던 웹앱을 위한
            <br />
            <span className="text-primary">Next.js 스타터킷</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Next.js 15, Tailwind CSS v4, Shadcn/UI를 기반으로 한 범용 웹
            애플리케이션 스타터킷입니다. 빠르게 시작하고, 유연하게 확장하세요.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/examples/cards">
                예시 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">소개</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 기능 섹션 */}
      <Section className="border-t">
        <Container>
          <PageHeader
            title="주요 기능"
            description="스타터킷에 포함된 주요 기능들을 확인해보세요."
            className="text-center"
          />
          <CardGrid columns={3} className="mt-12">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      {/* CTA 섹션 */}
      <Section className="border-t bg-muted/50">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            지금 바로 시작하세요
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            문의사항이 있으시면 언제든 연락해주세요.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">
              문의하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
