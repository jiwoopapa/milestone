import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";

// 서버 컴포넌트 예제
async function ServerTime() {
  // 서버에서만 실행됨
  const time = new Date().toISOString();
  return (
    <div className="rounded-lg border border-border bg-muted p-4">
      <p className="text-sm font-medium">서버 시간 (빌드 시점)</p>
      <p className="mt-2 font-mono text-xs text-muted-foreground">{time}</p>
    </div>
  );
}

// Suspense 경계를 위한 로딩 컴포넌트
function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-border bg-muted p-4">
      <div className="mb-2 h-4 w-32 rounded bg-muted-foreground/20"></div>
      <div className="h-4 w-48 rounded bg-muted-foreground/20"></div>
    </div>
  );
}

export default function NextJSPage() {
  const serverComponentCode = `// app/page.tsx (서버 컴포넌트)
export default async function Page() {
  // 서버에서만 실행됨
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();

  return <div>{json.title}</div>;
}

// 장점:
// - 데이터베이스 직접 접근 가능
// - 비밀 키 안전하게 사용
// - 번들 크기 감소 (클라이언트로 전송 안됨)
// - 자동 코드 스플리팅`;

  const clientComponentCode = `"use client";

import { useState } from "react";

// 클라이언트 컴포넌트
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      클릭 수: {count}
    </button>
  );
}

// 클라이언트 컴포넌트가 필요한 경우:
// - useState, useEffect 등 React 훅 사용
// - 브라우저 API 사용 (localStorage, window 등)
// - 이벤트 리스너 (onClick, onChange 등)`;

  const suspenseCode = `import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AsyncComponent />
    </Suspense>
  );
}

// AsyncComponent는 비동기로 데이터를 가져옴
async function AsyncComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}`;

  const metadataCode = `import type { Metadata } from "next";

// 정적 메타데이터
export const metadata: Metadata = {
  title: "페이지 제목",
  description: "페이지 설명",
  openGraph: {
    title: "OG 제목",
    description: "OG 설명",
    images: ["/og-image.jpg"],
  },
};

// 동적 메타데이터
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.id);

  return {
    title: data.title,
    description: data.description,
  };
}`;

  const layoutCode = `// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// 레이아웃은 여러 페이지에서 공유됨
// 리렌더링되지 않고 상태 유지`;

  const routingCode = `// 파일 시스템 기반 라우팅
app/
├── page.tsx                    → /
├── about/
│   └── page.tsx               → /about
├── blog/
│   ├── page.tsx               → /blog
│   └── [slug]/
│       └── page.tsx           → /blog/[slug]
└── dashboard/
    ├── layout.tsx             → 공유 레이아웃
    ├── page.tsx               → /dashboard
    └── settings/
        └── page.tsx           → /dashboard/settings`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="Next.js 15 App Router"
            description="최신 Next.js 15의 App Router를 사용한 서버 컴포넌트와 스트리밍 예제입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="서버 컴포넌트 vs 클라이언트 컴포넌트"
              description="Next.js 13+의 가장 큰 변화인 React Server Components입니다."
              code={serverComponentCode}
              codeLanguage="typescript"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6">
                  <h4 className="font-semibold">서버 컴포넌트 (기본)</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>✓ 데이터베이스 직접 접근</li>
                    <li>✓ 비밀 키 안전하게 사용</li>
                    <li>✓ 번들 크기 감소</li>
                    <li>✓ SEO 최적화</li>
                  </ul>
                  <Suspense fallback={<LoadingSkeleton />}>
                    <div className="mt-4">
                      <ServerTime />
                    </div>
                  </Suspense>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold">클라이언트 컴포넌트</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>✓ useState, useEffect 사용</li>
                    <li>✓ 이벤트 리스너</li>
                    <li>✓ 브라우저 API</li>
                    <li>✓ 인터랙티브 UI</li>
                  </ul>
                  <div className="mt-4 rounded-lg border border-border bg-muted p-4">
                    <p className="text-sm font-medium">
                      "use client" 지시어 필요
                    </p>
                  </div>
                </Card>
              </div>
              <Card className="mt-4 p-6">
                <h4 className="font-semibold">언제 클라이언트 컴포넌트를 사용할까?</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="text-sm">
                    <code className="rounded bg-muted px-2 py-1 font-mono text-primary">
                      "use client"
                    </code>
                    <span className="ml-2 text-muted-foreground">
                      파일 최상단에 추가
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    React 훅, 이벤트 핸들러, 브라우저 API 사용 시
                  </div>
                </div>
              </Card>
            </DemoSection>

            <DemoSection
              title="Suspense와 스트리밍"
              description="페이지의 일부를 먼저 보여주고 나머지를 점진적으로 로딩합니다."
              code={suspenseCode}
              codeLanguage="typescript"
            >
              <Card className="p-6">
                <h4 className="font-semibold">Suspense의 장점</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      느린 데이터 요청이 전체 페이지를 차단하지 않음
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>중요한 콘텐츠를 먼저 표시</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>사용자 경험 향상</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>자동 스트리밍 (HTTP Streaming)</span>
                  </li>
                </ul>
              </Card>
            </DemoSection>

            <DemoSection
              title="파일 시스템 기반 라우팅"
              description="폴더 구조가 곧 URL 구조가 됩니다."
              code={routingCode}
              codeLanguage="text"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6">
                  <h4 className="font-semibold text-sm">특수 파일</h4>
                  <ul className="mt-3 space-y-2 text-xs font-mono">
                    <li className="text-primary">page.tsx - 페이지</li>
                    <li className="text-primary">layout.tsx - 레이아웃</li>
                    <li className="text-primary">loading.tsx - 로딩 UI</li>
                    <li className="text-primary">error.tsx - 에러 UI</li>
                    <li className="text-primary">
                      not-found.tsx - 404 페이지
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold text-sm">동적 라우트</h4>
                  <ul className="mt-3 space-y-2 text-xs">
                    <li>
                      <code className="text-primary">[slug]</code>
                      <span className="ml-2 text-muted-foreground">
                        - 단일 세그먼트
                      </span>
                    </li>
                    <li>
                      <code className="text-primary">[...slug]</code>
                      <span className="ml-2 text-muted-foreground">
                        - 모든 세그먼트
                      </span>
                    </li>
                    <li>
                      <code className="text-primary">[[...slug]]</code>
                      <span className="ml-2 text-muted-foreground">
                        - 선택적 모든 세그먼트
                      </span>
                    </li>
                  </ul>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="Metadata API"
              description="SEO 최적화를 위한 메타데이터를 쉽게 설정할 수 있습니다."
              code={metadataCode}
              codeLanguage="typescript"
            >
              <Card className="p-6">
                <h4 className="font-semibold">메타데이터 설정 방법</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium">1. 정적 메타데이터</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      metadata 객체를 export하여 정적 메타데이터 설정
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">2. 동적 메타데이터</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      generateMetadata 함수로 동적으로 생성
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">3. 지원하는 메타데이터</p>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>• title, description</li>
                      <li>• Open Graph (OG) 태그</li>
                      <li>• Twitter 카드</li>
                      <li>• Canonical URL</li>
                      <li>• robots, viewport</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </DemoSection>

            <DemoSection
              title="Layout (레이아웃)"
              description="여러 페이지에서 공유되는 UI 구조입니다."
              code={layoutCode}
              codeLanguage="typescript"
            >
              <Card className="p-6">
                <h4 className="font-semibold">레이아웃의 특징</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>
                      여러 페이지에서 공유되는 UI (헤더, 푸터, 사이드바 등)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>페이지 전환 시 리렌더링되지 않고 상태 유지</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>중첩 가능 (레이아웃 안에 레이아웃)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>
                      각 폴더마다 고유한 layout.tsx를 가질 수 있음
                    </span>
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
