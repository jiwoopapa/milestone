import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { Card } from "@/components/ui/card";

export default function TailwindPage() {
  const gridCode = `<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map((item) => (
    <div key={item.id} className="rounded-lg border p-4">
      {item.content}
    </div>
  ))}
</div>`;

  const animationCode = `<div className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
  호버하면 확대되고 그림자가 생깁니다
</div>

<div className="animate-pulse">
  로딩 중...
</div>

<div className="animate-bounce">
  ↓
</div>`;

  const oklchCode = `/* app/globals.css */
:root {
  --primary: oklch(0.53 0.17 262.29);
  --secondary: oklch(0.89 0.01 286.32);
  --accent: oklch(0.89 0.01 286.32);
  --destructive: oklch(0.58 0.21 29.23);
}

.dark {
  --primary: oklch(0.77 0.11 262.29);
  --secondary: oklch(0.21 0.01 286.32);
  --accent: oklch(0.21 0.01 286.32);
  --destructive: oklch(0.72 0.19 29.23);
}`;

  const responsiveCode = `/* 모바일 우선 (기본값은 모바일) */
<div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
  화면 크기에 따라 텍스트 크기가 변합니다
</div>

/* 브레이크포인트 */
- sm: 640px   (작은 태블릿)
- md: 768px   (태블릿)
- lg: 1024px  (노트북)
- xl: 1280px  (데스크톱)
- 2xl: 1536px (큰 데스크톱)`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="Tailwind CSS v4"
            description="새로운 PostCSS 기반 설정과 OKLCH 색상 모델을 활용한 스타일링 예제입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="OKLCH 색상 시스템"
              description="더 균일한 색상 인지와 넓은 색상 공간을 제공하는 OKLCH 색상 모델입니다."
              code={oklchCode}
              codeLanguage="css"
              codeFilename="app/globals.css"
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-primary"></div>
                  <p className="text-sm font-medium">Primary</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    oklch(0.53 0.17 262.29)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-secondary"></div>
                  <p className="text-sm font-medium">Secondary</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    oklch(0.89 0.01 286.32)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-accent"></div>
                  <p className="text-sm font-medium">Accent</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    oklch(0.89 0.01 286.32)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-destructive"></div>
                  <p className="text-sm font-medium">Destructive</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    oklch(0.58 0.21 29.23)
                  </p>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="반응형 그리드 시스템"
              description="Tailwind의 그리드 유틸리티를 사용하여 반응형 레이아웃을 쉽게 구현할 수 있습니다."
              code={gridCode}
              codeLanguage="tsx"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i} className="p-4 text-center">
                    <p className="text-sm font-medium">아이템 {i}</p>
                  </Card>
                ))}
              </div>
            </DemoSection>

            <DemoSection
              title="애니메이션 & Transition"
              description="Tailwind의 내장 애니메이션과 트랜지션 유틸리티입니다."
              code={animationCode}
              codeLanguage="tsx"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Card className="p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <p className="text-sm font-medium">호버 효과</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    마우스를 올려보세요
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="animate-pulse">
                    <div className="mb-2 h-4 w-full rounded bg-muted"></div>
                    <div className="h-4 w-3/4 rounded bg-muted"></div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Pulse 애니메이션
                  </p>
                </Card>
                <Card className="flex items-center justify-center p-6 text-center">
                  <div>
                    <div className="mb-2 animate-bounce text-4xl">↓</div>
                    <p className="text-xs text-muted-foreground">
                      Bounce 애니메이션
                    </p>
                  </div>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="반응형 타이포그래피"
              description="화면 크기에 따라 텍스트 크기가 자동으로 조정됩니다."
              code={responsiveCode}
              codeLanguage="tsx"
            >
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    화면 크기를 조절하면 텍스트 크기가 변경됩니다
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-5">
                  <div className="rounded border border-border p-2 text-center">
                    <p className="font-medium">기본</p>
                    <p className="text-xs text-muted-foreground">&lt;640px</p>
                  </div>
                  <div className="rounded border border-border p-2 text-center">
                    <p className="font-medium">sm</p>
                    <p className="text-xs text-muted-foreground">640px+</p>
                  </div>
                  <div className="rounded border border-border p-2 text-center">
                    <p className="font-medium">md</p>
                    <p className="text-xs text-muted-foreground">768px+</p>
                  </div>
                  <div className="rounded border border-border p-2 text-center">
                    <p className="font-medium">lg</p>
                    <p className="text-xs text-muted-foreground">1024px+</p>
                  </div>
                  <div className="rounded border border-border p-2 text-center">
                    <p className="font-medium">xl</p>
                    <p className="text-xs text-muted-foreground">1280px+</p>
                  </div>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="유틸리티 클래스 조합"
              description="Tailwind의 유틸리티 클래스를 조합하여 복잡한 디자인을 구현할 수 있습니다."
            >
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
                    <h3 className="text-xl font-bold">그라디언트 헤더</h3>
                    <p className="mt-2 text-sm opacity-90">
                      from-primary to-accent
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Tailwind의 그라디언트 유틸리티로 만든 헤더입니다.
                    </p>
                  </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="group relative overflow-hidden p-6 transition-all hover:shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div className="relative">
                      <h4 className="font-semibold">호버 그라디언트</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        마우스를 올리면 배경 그라디언트가 나타납니다.
                      </p>
                    </div>
                  </Card>

                  <Card className="group relative overflow-hidden p-6 transition-all hover:shadow-lg">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 transition-transform group-hover:scale-150"></div>
                    <div className="relative">
                      <h4 className="font-semibold">원형 효과</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        호버 시 원형이 확대됩니다.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </DemoSection>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
