import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { Card } from "@/components/ui/card";

export default function ResponsivePage() {
  const breakpointsCode = `/* Tailwind CSS 브레이크포인트 */
sm: 640px   // 작은 태블릿
md: 768px   // 태블릿
lg: 1024px  // 노트북
xl: 1280px  // 데스크톱
2xl: 1536px // 큰 데스크톱

/* 사용 예시 */
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  반응형 텍스트
</div>`;

  const gridCode = `/* 반응형 그리드 */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</div>

/* 설명 */
- 모바일: 1열
- 태블릿 (640px+): 2열
- 노트북 (1024px+): 3열
- 데스크톱 (1280px+): 4열`;

  const flexCode = `/* 반응형 Flexbox */
<div className="flex flex-col sm:flex-row gap-4">
  <div className="flex-1">왼쪽 콘텐츠</div>
  <div className="flex-1">오른쪽 콘텐츠</div>
</div>

/* 모바일에서는 세로, 태블릿 이상에서는 가로 정렬 */`;

  const hideShowCode = `/* 특정 화면 크기에서 숨기기/보이기 */
<div className="hidden sm:block">
  태블릿 이상에서만 보임
</div>

<div className="block sm:hidden">
  모바일에서만 보임
</div>

<div className="hidden lg:block">
  노트북 이상에서만 보임
</div>`;

  const containerCode = `/* Container 컴포넌트 */
// 최대 너비가 자동으로 조정되는 반응형 컨테이너
<Container>
  {/* 콘텐츠 */}
</Container>

/* 내부 구현 */
<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="반응형 디자인"
            description="모바일부터 데스크톱까지 모든 화면 크기에 최적화된 반응형 레이아웃 예제입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="브레이크포인트"
              description="Tailwind CSS가 제공하는 반응형 브레이크포인트입니다."
              code={breakpointsCode}
              codeLanguage="typescript"
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold">기본</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    0px+
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold">sm</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    640px+
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold">md</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    768px+
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold">lg</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    1024px+
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold">xl</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    1280px+
                  </div>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="반응형 그리드"
              description="화면 크기에 따라 자동으로 열 개수가 조정됩니다."
              code={gridCode}
              codeLanguage="tsx"
            >
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm font-medium">
                    현재 화면에서의 열 개수:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>모바일: 1열</li>
                    <li>태블릿 (640px+): 2열</li>
                    <li>노트북 (1024px+): 3열</li>
                    <li>데스크톱 (1280px+): 4열</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <Card key={i} className="p-6 text-center">
                      <p className="font-semibold">카드 {i + 1}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="반응형 Flexbox"
              description="모바일에서는 세로, 태블릿 이상에서는 가로로 정렬됩니다."
              code={flexCode}
              codeLanguage="tsx"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <Card className="flex-1 p-6">
                  <h3 className="font-semibold">왼쪽 콘텐츠</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    모바일에서는 위에, 태블릿 이상에서는 왼쪽에 표시됩니다.
                  </p>
                </Card>
                <Card className="flex-1 p-6">
                  <h3 className="font-semibold">오른쪽 콘텐츠</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    모바일에서는 아래에, 태블릿 이상에서는 오른쪽에 표시됩니다.
                  </p>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="조건부 표시/숨김"
              description="특정 화면 크기에서만 요소를 표시하거나 숨길 수 있습니다."
              code={hideShowCode}
              codeLanguage="tsx"
            >
              <div className="space-y-4">
                <Card className="p-6 sm:hidden">
                  <p className="font-semibold text-primary">
                    📱 모바일에서만 보입니다
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    화면 너비가 640px 미만일 때만 표시됩니다.
                  </p>
                </Card>

                <Card className="hidden p-6 sm:block lg:hidden">
                  <p className="font-semibold text-primary">
                    📱 태블릿에서만 보입니다
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    화면 너비가 640px~1024px 사이일 때만 표시됩니다.
                  </p>
                </Card>

                <Card className="hidden p-6 lg:block">
                  <p className="font-semibold text-primary">
                    💻 노트북 이상에서만 보입니다
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    화면 너비가 1024px 이상일 때만 표시됩니다.
                  </p>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="반응형 타이포그래피"
              description="화면 크기에 따라 텍스트 크기가 자동으로 조정됩니다."
            >
              <div className="space-y-6">
                <Card className="p-6">
                  <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                    반응형 제목
                  </h1>
                  <p className="mt-4 text-sm sm:text-base md:text-lg">
                    이 텍스트는 화면 크기에 따라 크기가 변합니다.
                  </p>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="p-6">
                    <p className="text-xs">text-xs (0.75rem)</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-sm">text-sm (0.875rem)</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-base">text-base (1rem)</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-lg">text-lg (1.125rem)</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-xl">text-xl (1.25rem)</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-2xl">text-2xl (1.5rem)</p>
                  </Card>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Container 컴포넌트"
              description="최대 너비가 자동으로 조정되는 반응형 컨테이너입니다."
              code={containerCode}
              codeLanguage="tsx"
            >
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">
                  이 페이지 전체가 Container 컴포넌트로 감싸져 있어, 화면
                  크기에 따라 자동으로 너비가 조정되고 적절한 여백이
                  적용됩니다.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">최대 너비:</span>
                    <span className="text-muted-foreground">
                      1280px (max-w-7xl)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">수평 패딩:</span>
                    <span className="text-muted-foreground">
                      모바일 16px, 태블릿 24px, 노트북 32px
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">중앙 정렬:</span>
                    <span className="text-muted-foreground">mx-auto</span>
                  </li>
                </ul>
              </Card>
            </DemoSection>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
