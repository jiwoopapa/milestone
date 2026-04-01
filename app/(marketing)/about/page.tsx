import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/templates/base-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "소개",
  description: "Next.js 스타터킷에 대해 알아보세요.",
};

const techStack = [
  {
    category: "프레임워크",
    items: ["Next.js 15 (App Router)", "React 19", "TypeScript"],
  },
  {
    category: "스타일링",
    items: ["Tailwind CSS v4", "Shadcn/UI (New York)", "Lucide Icons"],
  },
  {
    category: "폼 & 검증",
    items: ["react-hook-form", "zod", "@hookform/resolvers"],
  },
  {
    category: "유틸리티",
    items: ["next-themes (다크모드)", "sonner (토스트)", "date-fns (날짜)"],
  },
];

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <PageHeader
          title="소개"
          description="이 스타터킷은 모던 웹 애플리케이션 개발을 빠르게 시작할 수 있도록 설계되었습니다."
        />

        <div className="mt-12 space-y-8">
          {/* 소개 텍스트 */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>왜 이 스타터킷인가요?</h2>
            <p>
              웹 개발을 시작할 때마다 반복되는 설정 작업에 지치셨나요? 이 스타터킷은
              검증된 기술 스택과 모범 사례를 바탕으로, 바로 개발에 집중할 수 있는
              환경을 제공합니다.
            </p>
            <ul>
              <li>
                <strong>Atomic Design 패턴</strong>: 체계적인 컴포넌트 구조로
                유지보수성을 높입니다.
              </li>
              <li>
                <strong>검증된 라이브러리</strong>: 바퀴를 재발명하지 않고, npm에서
                수백만 다운로드를 기록한 라이브러리들을 사용합니다.
              </li>
              <li>
                <strong>TypeScript 엄격 모드</strong>: 타입 안전성으로 런타임 오류를
                사전에 방지합니다.
              </li>
              <li>
                <strong>다크 모드 기본 지원</strong>: next-themes로 완벽한 다크 모드를
                제공합니다.
              </li>
            </ul>
          </div>

          {/* 기술 스택 */}
          <div>
            <h2 className="text-2xl font-bold">기술 스택</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {techStack.map((stack) => (
                <Card key={stack.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{stack.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {stack.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted-foreground"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
