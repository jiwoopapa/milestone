"use client";

import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ToastPage() {
  const basicToastCode = `import { toast } from "sonner";

// Success 토스트
toast.success("작업이 완료되었습니다!");

// Error 토스트
toast.error("오류가 발생했습니다.");

// Warning 토스트
toast.warning("주의가 필요합니다.");

// Info 토스트
toast.info("새로운 정보가 있습니다.");`;

  const customToastCode = `import { toast } from "sonner";

// 커스텀 설명이 있는 토스트
toast.success("파일 업로드 완료", {
  description: "파일이 성공적으로 업로드되었습니다.",
  duration: 5000,
});

// 액션 버튼이 있는 토스트
toast("이벤트가 발생했습니다", {
  action: {
    label: "되돌리기",
    onClick: () => console.log("되돌리기 클릭됨"),
  },
});`;

  const promiseToastCode = `import { toast } from "sonner";

// Promise 기반 토스트
const promise = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "데이터" }), 2000)
  );

toast.promise(promise, {
  loading: "데이터를 불러오는 중...",
  success: (data) => \`\${data.name}를 성공적으로 불러왔습니다!\`,
  error: "데이터를 불러오는데 실패했습니다.",
});`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="토스트 알림"
            description="Sonner 라이브러리를 활용한 다양한 토스트 알림 예제입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="기본 토스트"
              description="다양한 타입의 토스트 알림을 표시할 수 있습니다."
              code={basicToastCode}
              codeLanguage="typescript"
            >
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => toast.success("작업이 완료되었습니다!")}
                  variant="default"
                >
                  Success 토스트
                </Button>
                <Button
                  onClick={() => toast.error("오류가 발생했습니다.")}
                  variant="destructive"
                >
                  Error 토스트
                </Button>
                <Button
                  onClick={() => toast.warning("주의가 필요합니다.")}
                  variant="outline"
                >
                  Warning 토스트
                </Button>
                <Button
                  onClick={() => toast.info("새로운 정보가 있습니다.")}
                  variant="secondary"
                >
                  Info 토스트
                </Button>
              </div>
            </DemoSection>

            <DemoSection
              title="커스텀 토스트"
              description="설명, 지속 시간, 액션 버튼 등을 포함한 커스텀 토스트입니다."
              code={customToastCode}
              codeLanguage="typescript"
            >
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() =>
                    toast.success("파일 업로드 완료", {
                      description: "파일이 성공적으로 업로드되었습니다.",
                      duration: 5000,
                    })
                  }
                >
                  설명이 있는 토스트
                </Button>
                <Button
                  onClick={() =>
                    toast("이벤트가 발생했습니다", {
                      action: {
                        label: "되돌리기",
                        onClick: () => toast.info("되돌리기 클릭됨"),
                      },
                    })
                  }
                  variant="outline"
                >
                  액션 버튼 토스트
                </Button>
              </div>
            </DemoSection>

            <DemoSection
              title="Promise 토스트"
              description="비동기 작업의 진행 상황을 자동으로 표시합니다."
              code={promiseToastCode}
              codeLanguage="typescript"
            >
              <Button
                onClick={() => {
                  const promise = () =>
                    new Promise((resolve) =>
                      setTimeout(
                        () => resolve({ name: "사용자 데이터" }),
                        2000
                      )
                    );

                  toast.promise(promise, {
                    loading: "데이터를 불러오는 중...",
                    success: (data: { name: string }) =>
                      `${data.name}를 성공적으로 불러왔습니다!`,
                    error: "데이터를 불러오는데 실패했습니다.",
                  });
                }}
              >
                Promise 토스트 실행
              </Button>
            </DemoSection>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
