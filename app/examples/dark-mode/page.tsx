"use client";

import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DarkModePage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeToggleCode = `import { ThemeToggle } from "@/components/molecules/theme-toggle";

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}`;

  const useThemeCode = `"use client";

import { useTheme } from "next-themes";

export function ThemeExample() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <p>시스템 테마: {systemTheme}</p>

      <button onClick={() => setTheme("light")}>라이트 모드</button>
      <button onClick={() => setTheme("dark")}>다크 모드</button>
      <button onClick={() => setTheme("system")}>시스템 설정</button>
    </div>
  );
}`;

  const configCode = `// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

  if (!mounted) {
    return null;
  }

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="다크 모드 지원"
            description="next-themes를 활용한 완벽한 다크 모드 구현 예제입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="테마 토글 컴포넌트"
              description="헤더에 있는 것과 동일한 테마 전환 버튼입니다."
              code={themeToggleCode}
              codeLanguage="typescript"
            >
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <span className="text-sm text-muted-foreground">
                  현재 테마: {theme}
                </span>
              </div>
            </DemoSection>

            <DemoSection
              title="프로그래밍 방식으로 테마 변경"
              description="useTheme 훅을 사용하여 테마를 변경할 수 있습니다."
              code={useThemeCode}
              codeLanguage="typescript"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setTheme("light")} variant="outline">
                    라이트 모드
                  </Button>
                  <Button onClick={() => setTheme("dark")} variant="outline">
                    다크 모드
                  </Button>
                  <Button onClick={() => setTheme("system")} variant="outline">
                    시스템 설정
                  </Button>
                </div>
                <div className="rounded-lg border border-border bg-muted p-4">
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">현재 테마:</dt>
                      <dd className="text-muted-foreground">{theme}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">시스템 테마:</dt>
                      <dd className="text-muted-foreground">{systemTheme}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="테마 Provider 설정"
              description="앱의 루트 레이아웃에서 ThemeProvider를 설정합니다."
              code={configCode}
              codeLanguage="typescript"
              codeFilename="app/layout.tsx"
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  ThemeProvider의 주요 속성:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-primary">attribute</span>
                    <span className="text-muted-foreground">
                      - 테마를 적용할 HTML 속성 (class 또는 data-theme)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-primary">
                      defaultTheme
                    </span>
                    <span className="text-muted-foreground">
                      - 기본 테마 (light, dark, system)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-primary">enableSystem</span>
                    <span className="text-muted-foreground">
                      - 시스템 테마 감지 활성화
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-primary">
                      disableTransitionOnChange
                    </span>
                    <span className="text-muted-foreground">
                      - 테마 전환 시 CSS 트랜지션 비활성화 (깜빡임 방지)
                    </span>
                  </li>
                </ul>
              </div>
            </DemoSection>

            <DemoSection
              title="다크 모드 색상 미리보기"
              description="현재 테마의 주요 색상을 확인할 수 있습니다."
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded bg-background"></div>
                  <p className="text-xs font-medium">Background</p>
                </Card>
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded bg-foreground"></div>
                  <p className="text-xs font-medium">Foreground</p>
                </Card>
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded bg-primary"></div>
                  <p className="text-xs font-medium">Primary</p>
                </Card>
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded bg-secondary"></div>
                  <p className="text-xs font-medium">Secondary</p>
                </Card>
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded bg-muted"></div>
                  <p className="text-xs font-medium">Muted</p>
                </Card>
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded bg-accent"></div>
                  <p className="text-xs font-medium">Accent</p>
                </Card>
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded bg-destructive"></div>
                  <p className="text-xs font-medium">Destructive</p>
                </Card>
                <Card className="p-4">
                  <div className="mb-2 h-12 rounded border border-border"></div>
                  <p className="text-xs font-medium">Border</p>
                </Card>
              </div>
            </DemoSection>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
