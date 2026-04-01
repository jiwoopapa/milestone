"use client";

import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

export default function ShadcnPage() {
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const buttonCode = `import { Button } from "@/components/atoms/button";

<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

{/* 크기 변형 */}
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`;

  const inputCode = `import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";

<div className="space-y-2">
  <Label htmlFor="email">이메일</Label>
  <Input
    id="email"
    type="email"
    placeholder="example@email.com"
  />
</div>`;

  const checkboxCode = `import { Checkbox } from "@/components/atoms/checkbox";
import { Label } from "@/components/atoms/label";

<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={checked}
    onCheckedChange={setChecked}
  />
  <Label htmlFor="terms">약관에 동의합니다</Label>
</div>`;

  const switchCode = `import { Switch } from "@/components/atoms/switch";
import { Label } from "@/components/atoms/label";

<div className="flex items-center space-x-2">
  <Switch
    id="notifications"
    checked={switchOn}
    onCheckedChange={setSwitchOn}
  />
  <Label htmlFor="notifications">알림 받기</Label>
</div>`;

  const cardCode = `import { Card } from "@/components/molecules/card";

<Card className="p-6">
  <h3 className="text-lg font-semibold">카드 제목</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    카드 내용이 여기에 들어갑니다.
  </p>
</Card>`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="Shadcn/UI 컴포넌트"
            description="복사-붙여넣기로 사용할 수 있는 아름다운 UI 컴포넌트 모음입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="Button 컴포넌트"
              description="다양한 스타일과 크기의 버튼 변형을 제공합니다."
              code={buttonCode}
              codeLanguage="tsx"
            >
              <div className="space-y-4">
                <div>
                  <p className="mb-3 text-sm font-medium">버튼 스타일</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium">버튼 크기</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Input & Label"
              description="폼 입력을 위한 Input과 Label 컴포넌트입니다."
              code={inputCode}
              codeLanguage="tsx"
            >
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">비활성화된 입력</Label>
                  <Input
                    id="disabled"
                    type="text"
                    placeholder="비활성화됨"
                    disabled
                  />
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Checkbox"
              description="선택 옵션을 위한 체크박스 컴포넌트입니다."
              code={checkboxCode}
              codeLanguage="tsx"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={checked}
                    onCheckedChange={(value) => setChecked(value as boolean)}
                  />
                  <Label htmlFor="terms" className="cursor-pointer">
                    약관에 동의합니다
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  현재 상태: {checked ? "선택됨" : "선택 안됨"}
                </p>
              </div>
            </DemoSection>

            <DemoSection
              title="Switch"
              description="토글 기능을 위한 스위치 컴포넌트입니다."
              code={switchCode}
              codeLanguage="tsx"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={switchOn}
                    onCheckedChange={setSwitchOn}
                  />
                  <Label htmlFor="notifications" className="cursor-pointer">
                    알림 받기
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  현재 상태: {switchOn ? "켜짐" : "꺼짐"}
                </p>
              </div>
            </DemoSection>

            <DemoSection
              title="Card 컴포넌트"
              description="콘텐츠를 그룹화하는 카드 컴포넌트입니다."
              code={cardCode}
              codeLanguage="tsx"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold">기본 카드</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    간단한 카드 레이아웃입니다.
                  </p>
                </Card>

                <Card className="p-6 transition-all hover:shadow-lg">
                  <h3 className="text-lg font-semibold">호버 효과</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    마우스를 올리면 그림자가 생깁니다.
                  </p>
                </Card>

                <Card className="overflow-hidden">
                  <div className="bg-primary p-4 text-primary-foreground">
                    <h3 className="text-lg font-semibold">컬러 헤더</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">
                      헤더가 있는 카드입니다.
                    </p>
                  </div>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="조합된 컴포넌트 예제"
              description="여러 컴포넌트를 조합하여 실제 사용 사례를 보여줍니다."
            >
              <Card className="max-w-md p-6">
                <h3 className="text-lg font-semibold">로그인 폼</h3>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">이메일</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">비밀번호</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="cursor-pointer">
                      로그인 상태 유지
                    </Label>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => toast.success("로그인 버튼 클릭됨!")}
                  >
                    로그인
                  </Button>
                </div>
              </Card>
            </DemoSection>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
