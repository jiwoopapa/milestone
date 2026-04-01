import { BaseLayout } from "@/components/templates/base-layout";
import {
  Container,
  Section,
  PageHeader,
} from "@/components/templates/base-layout";
import { DemoSection } from "@/components/organisms/demo-section";
import { Card } from "@/components/ui/card";

export default function TypeScriptPage() {
  const strictModeCode = `// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}`;

  const interfaceCode = `// Interface - 객체 구조를 정의
interface User {
  id: number;
  name: string;
  email?: string; // 선택적 속성
  readonly createdAt: Date; // 읽기 전용
}

// Interface 확장
interface AdminUser extends User {
  permissions: string[];
}

// Type - 더 유연한 타입 정의
type Status = "active" | "inactive" | "pending";
type ID = string | number;

// Type Alias는 Union, Intersection에 유용
type Response = SuccessResponse | ErrorResponse;`;

  const genericsCode = `// 제네릭 함수
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42); // number
const str = identity<string>("hello"); // string

// 제네릭 인터페이스
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

// 제네릭 제약조건
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}`;

  const typeGuardsCode = `// Type Guard 함수
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj
  );
}

// 사용 예시
function processValue(value: string | number) {
  if (typeof value === "string") {
    // 이 블록에서 value는 string 타입
    return value.toUpperCase();
  } else {
    // 이 블록에서 value는 number 타입
    return value.toFixed(2);
  }
}`;

  const utilityTypesCode = `// Partial - 모든 속성을 선택적으로
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string }

// Required - 모든 속성을 필수로
type RequiredUser = Required<User>;

// Pick - 특정 속성만 선택
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit - 특정 속성 제외
type UserWithoutEmail = Omit<User, "email">;

// Record - 키-값 쌍 객체 타입
type UserRoles = Record<string, User>;
// { [key: string]: User }

// Readonly - 모든 속성을 읽기 전용으로
type ReadonlyUser = Readonly<User>;`;

  const componentTypesCode = `import { ReactNode, FC, PropsWithChildren } from "react";

// Props 인터페이스
interface ButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

// Functional Component 타입
export const Button: FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={\`btn-\${variant} btn-\${size}\`}
    >
      {children}
    </button>
  );
};

// PropsWithChildren 사용
interface CardProps extends PropsWithChildren {
  title: string;
}

export const Card: FC<CardProps> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="TypeScript 엄격 모드"
            description="타입 안전성을 보장하여 런타임 오류를 사전에 방지하는 TypeScript 예제입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="Strict Mode 설정"
              description="엄격한 타입 검사를 활성화하여 더 안전한 코드를 작성합니다."
              code={strictModeCode}
              codeLanguage="json"
              codeFilename="tsconfig.json"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6">
                  <h4 className="font-semibold">strict</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    모든 엄격한 타입 검사 옵션을 활성화합니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">noUncheckedIndexedAccess</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    인덱스 접근 시 undefined 가능성을 체크합니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">noImplicitReturns</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    함수의 모든 경로에서 값을 반환하도록 강제합니다.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">
                    noFallthroughCasesInSwitch
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    switch 문에서 fallthrough를 방지합니다.
                  </p>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="Interface vs Type"
              description="Interface와 Type의 차이점과 사용 사례입니다."
              code={interfaceCode}
              codeLanguage="typescript"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6">
                  <h4 className="font-semibold">Interface</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• 객체 구조 정의에 최적화</li>
                    <li>• extends로 확장 가능</li>
                    <li>• 선언 병합 가능</li>
                    <li>• OOP 패턴에 적합</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold">Type</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• Union, Intersection 지원</li>
                    <li>• 원시 타입 별칭 가능</li>
                    <li>• Mapped Types 사용 가능</li>
                    <li>• 더 유연한 타입 정의</li>
                  </ul>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="Generics (제네릭)"
              description="재사용 가능한 타입 안전 코드를 작성하는 제네릭 예제입니다."
              code={genericsCode}
              codeLanguage="typescript"
            >
              <Card className="p-6">
                <h4 className="font-semibold">제네릭의 장점</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>
                      타입 안전성을 유지하면서 재사용 가능한 컴포넌트 작성
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>컴파일 타임에 타입 오류 발견</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>코드 중복 감소 및 유지보수성 향상</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>타입 추론을 통한 더 나은 IDE 지원</span>
                  </li>
                </ul>
              </Card>
            </DemoSection>

            <DemoSection
              title="Type Guards (타입 가드)"
              description="런타임에 타입을 안전하게 좁히는 방법입니다."
              code={typeGuardsCode}
              codeLanguage="typescript"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-6">
                  <h4 className="font-semibold text-sm">typeof</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    원시 타입 체크
                  </p>
                  <code className="mt-2 block rounded bg-muted p-2 text-xs font-mono">
                    typeof x === "string"
                  </code>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold text-sm">instanceof</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    클래스 인스턴스 체크
                  </p>
                  <code className="mt-2 block rounded bg-muted p-2 text-xs font-mono">
                    x instanceof Date
                  </code>
                </Card>
                <Card className="p-6">
                  <h4 className="font-semibold text-sm">커스텀 가드</h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    사용자 정의 타입 가드
                  </p>
                  <code className="mt-2 block rounded bg-muted p-2 text-xs font-mono">
                    x is Type
                  </code>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="Utility Types (유틸리티 타입)"
              description="TypeScript가 제공하는 유용한 내장 유틸리티 타입들입니다."
              code={utilityTypesCode}
              codeLanguage="typescript"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4">
                  <h5 className="font-mono text-sm font-semibold">
                    Partial&lt;T&gt;
                  </h5>
                  <p className="mt-2 text-xs text-muted-foreground">
                    모든 속성을 선택적으로 만듭니다
                  </p>
                </Card>
                <Card className="p-4">
                  <h5 className="font-mono text-sm font-semibold">
                    Required&lt;T&gt;
                  </h5>
                  <p className="mt-2 text-xs text-muted-foreground">
                    모든 속성을 필수로 만듭니다
                  </p>
                </Card>
                <Card className="p-4">
                  <h5 className="font-mono text-sm font-semibold">
                    Pick&lt;T, K&gt;
                  </h5>
                  <p className="mt-2 text-xs text-muted-foreground">
                    특정 속성만 선택합니다
                  </p>
                </Card>
                <Card className="p-4">
                  <h5 className="font-mono text-sm font-semibold">
                    Omit&lt;T, K&gt;
                  </h5>
                  <p className="mt-2 text-xs text-muted-foreground">
                    특정 속성을 제외합니다
                  </p>
                </Card>
                <Card className="p-4">
                  <h5 className="font-mono text-sm font-semibold">
                    Record&lt;K, T&gt;
                  </h5>
                  <p className="mt-2 text-xs text-muted-foreground">
                    키-값 객체 타입을 생성합니다
                  </p>
                </Card>
                <Card className="p-4">
                  <h5 className="font-mono text-sm font-semibold">
                    Readonly&lt;T&gt;
                  </h5>
                  <p className="mt-2 text-xs text-muted-foreground">
                    모든 속성을 읽기 전용으로 만듭니다
                  </p>
                </Card>
              </div>
            </DemoSection>

            <DemoSection
              title="React 컴포넌트 타입"
              description="React 컴포넌트에서 TypeScript를 활용하는 방법입니다."
              code={componentTypesCode}
              codeLanguage="typescript"
            >
              <Card className="p-6">
                <h4 className="font-semibold">주요 React 타입</h4>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <code className="rounded bg-muted px-2 py-1 font-mono text-primary">
                      FC&lt;Props&gt;
                    </code>
                    <span className="ml-2 text-muted-foreground">
                      - Functional Component 타입
                    </span>
                  </li>
                  <li>
                    <code className="rounded bg-muted px-2 py-1 font-mono text-primary">
                      ReactNode
                    </code>
                    <span className="ml-2 text-muted-foreground">
                      - JSX에서 렌더링 가능한 모든 타입
                    </span>
                  </li>
                  <li>
                    <code className="rounded bg-muted px-2 py-1 font-mono text-primary">
                      PropsWithChildren
                    </code>
                    <span className="ml-2 text-muted-foreground">
                      - children prop을 포함하는 Props
                    </span>
                  </li>
                  <li>
                    <code className="rounded bg-muted px-2 py-1 font-mono text-primary">
                      MouseEvent&lt;T&gt;
                    </code>
                    <span className="ml-2 text-muted-foreground">
                      - 마우스 이벤트 타입
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
