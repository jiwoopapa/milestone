import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AtomicDesignPage() {
  const overviewCode = `Atomic Design 계층 구조:

Atoms (원자)
  ↓
Molecules (분자)
  ↓
Organisms (유기체)
  ↓
Templates (템플릿)
  ↓
Pages (페이지)`;

  const atomsCode = `// components/atoms/button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

// components/atoms/input.tsx
export function Input({ ...props }) {
  return <input {...props} />;
}

// components/atoms/label.tsx
export function Label({ children, ...props }) {
  return <label {...props}>{children}</label>;
}

// Atoms는 더 이상 분해할 수 없는 기본 UI 요소`;

  const moleculesCode = `// components/molecules/card.tsx
import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border p-6">
      {children}
    </div>
  );
}

// components/molecules/input-field.tsx
export function InputField({ label, ...props }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}

// Molecules는 여러 Atoms를 조합하여 만든 간단한 UI 그룹`;

  const organismsCode = `// components/organisms/content-card.tsx
export function ContentCard({ title, description, href }) {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{description}</p>
      {href && <Button>자세히 보기</Button>}
    </Card>
  );
}

// components/organisms/header.tsx
export function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      <ThemeToggle />
    </header>
  );
}

// Organisms는 Atoms와 Molecules를 조합한 복잡한 UI 구성요소`;

  const templatesCode = `// components/templates/base-layout.tsx
export function BaseLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

// components/templates/page-header.tsx
export function PageHeader({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

// Templates는 페이지의 와이어프레임 역할`;

  const structureCode = `components/
├── atoms/              # 원자 - 기본 UI 요소
│   ├── button.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── checkbox.tsx
│   └── switch.tsx
│
├── molecules/          # 분자 - Atoms 조합
│   ├── card.tsx
│   ├── input-field.tsx
│   └── theme-toggle.tsx
│
├── organisms/          # 유기체 - 복잡한 UI
│   ├── header.tsx
│   ├── footer.tsx
│   ├── content-card.tsx
│   ├── code-block.tsx
│   └── demo-section.tsx
│
└── templates/          # 템플릿 - 페이지 구조
    └── base-layout.tsx`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="Atomic Design"
            description="Atoms, Molecules, Organisms, Templates 패턴으로 체계적인 컴포넌트 구조를 제공합니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="Atomic Design 개요"
              description="화학에서 영감을 받은 디자인 시스템 방법론입니다."
              code={overviewCode}
              codeLanguage="text"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Card className="p-6 text-center">
                  <div className="mb-3 text-4xl">⚛️</div>
                  <h4 className="font-semibold">Atoms</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    기본 UI 요소
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="mb-3 text-4xl">🧬</div>
                  <h4 className="font-semibold">Molecules</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Atoms 조합
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="mb-3 text-4xl">🦠</div>
                  <h4 className="font-semibold">Organisms</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    복잡한 UI
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="mb-3 text-4xl">📐</div>
                  <h4 className="font-semibold">Templates</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    페이지 구조
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="mb-3 text-4xl">📄</div>
                  <h4 className="font-semibold">Pages</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    실제 콘텐츠
                  </p>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="Atoms (원자)"
              description="더 이상 분해할 수 없는 기본 UI 요소입니다."
              code={atomsCode}
              codeLanguage="typescript"
            >
              <div className="space-y-4">
                <Card className="p-6">
                  <h4 className="mb-4 font-semibold">Atoms 예제</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        Button
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm">Small</Button>
                        <Button>Default</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        Input
                      </p>
                      <Input placeholder="텍스트 입력..." className="max-w-xs" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        Label
                      </p>
                      <Label>폼 라벨 예제</Label>
                    </div>
                  </div>
                </Card>
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm font-medium">특징</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• 단일 책임 원칙</li>
                    <li>• 재사용 가능</li>
                    <li>• 스타일링 포함</li>
                    <li>• Props로 커스터마이징</li>
                  </ul>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Molecules (분자)"
              description="여러 Atoms를 조합하여 만든 간단한 UI 그룹입니다."
              code={moleculesCode}
              codeLanguage="typescript"
            >
              <div className="space-y-4">
                <Card className="p-6">
                  <h4 className="mb-4 font-semibold">Molecules 예제</h4>
                  <div className="max-w-md space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="example-input">이메일</Label>
                      <Input
                        id="example-input"
                        type="email"
                        placeholder="example@email.com"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      위 예제는 Label + Input을 조합한 Molecule입니다.
                    </p>
                  </div>
                </Card>
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm font-medium">특징</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• 여러 Atoms의 조합</li>
                    <li>• 단일 목적의 UI 그룹</li>
                    <li>• 간단한 상호작용</li>
                    <li>• 컨텍스트 독립적</li>
                  </ul>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Organisms (유기체)"
              description="Atoms와 Molecules를 조합한 복잡한 UI 구성요소입니다."
              code={organismsCode}
              codeLanguage="typescript"
            >
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold">ContentCard 예제</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      제목, 설명, 버튼을 포함한 카드 컴포넌트입니다.
                    </p>
                    <Button className="mt-4" size="sm">
                      자세히 보기
                    </Button>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold">Header 예제</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      로고, 네비게이션, 테마 토글을 포함한 헤더입니다.
                    </p>
                  </Card>
                </div>
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm font-medium">특징</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• 복잡한 UI 구조</li>
                    <li>• 비즈니스 로직 포함 가능</li>
                    <li>• 재사용 가능한 섹션</li>
                    <li>• 여러 Molecules와 Atoms 조합</li>
                  </ul>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Templates (템플릿)"
              description="페이지의 와이어프레임 역할을 하는 레이아웃 구조입니다."
              code={templatesCode}
              codeLanguage="typescript"
            >
              <div className="space-y-4">
                <Card className="p-6">
                  <h4 className="mb-4 font-semibold">Template 구조</h4>
                  <div className="space-y-3 rounded-lg border border-border bg-muted p-4 text-sm font-mono">
                    <div className="rounded bg-primary/10 p-2 text-center">
                      Header
                    </div>
                    <div className="min-h-[200px] rounded border-2 border-dashed border-border p-4 text-center">
                      <p className="text-muted-foreground">
                        Main Content Area
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        (페이지별 콘텐츠가 들어갈 공간)
                      </p>
                    </div>
                    <div className="rounded bg-secondary p-2 text-center">
                      Footer
                    </div>
                  </div>
                </Card>
                <div className="rounded-lg border border-border bg-muted p-4">
                  <p className="text-sm font-medium">특징</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• 페이지의 뼈대 구조</li>
                    <li>• 실제 콘텐츠 없음</li>
                    <li>• Organisms 배치</li>
                    <li>• 일관된 레이아웃 제공</li>
                  </ul>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="프로젝트 구조"
              description="이 프로젝트의 실제 Atomic Design 디렉토리 구조입니다."
              code={structureCode}
              codeLanguage="text"
            >
              <Card className="p-6">
                <h4 className="mb-4 font-semibold">
                  components 디렉토리 구조
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <p className="font-mono text-sm font-medium text-primary">
                        atoms/
                      </p>
                      <ul className="ml-4 mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• button.tsx</li>
                        <li>• input.tsx</li>
                        <li>• label.tsx</li>
                        <li>• checkbox.tsx</li>
                        <li>• switch.tsx</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-medium text-primary">
                        molecules/
                      </p>
                      <ul className="ml-4 mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• card.tsx</li>
                        <li>• theme-toggle.tsx</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-mono text-sm font-medium text-primary">
                        organisms/
                      </p>
                      <ul className="ml-4 mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• header.tsx</li>
                        <li>• footer.tsx</li>
                        <li>• content-card.tsx</li>
                        <li>• code-block.tsx</li>
                        <li>• demo-section.tsx</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-medium text-primary">
                        templates/
                      </p>
                      <ul className="ml-4 mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>• base-layout.tsx</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </DemoSection>

            <DemoSection
              title="Atomic Design의 장점"
              description="왜 Atomic Design 패턴을 사용해야 할까요?"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6">
                  <h4 className="font-semibold">1. 재사용성</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    작은 컴포넌트를 조합하여 큰 컴포넌트를 만들기 때문에 코드
                    재사용이 쉽습니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">2. 일관성</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    동일한 Atoms를 사용하므로 전체 애플리케이션의 디자인
                    일관성이 유지됩니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">3. 유지보수성</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    컴포넌트가 계층적으로 구조화되어 있어 수정과 확장이
                    용이합니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">4. 확장성</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    새로운 기능 추가 시 기존 컴포넌트를 조합하여 빠르게 구현할
                    수 있습니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">5. 테스트 용이성</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    작은 단위의 컴포넌트부터 테스트할 수 있어 테스트가
                    간편합니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">6. 협업 효율성</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    명확한 구조로 팀원들이 빠르게 이해하고 작업할 수 있습니다.
                  </p>
                </Card>
              </div>
            </DemoSection>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
