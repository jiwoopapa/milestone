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
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다"
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "사용자명은 최소 3자 이상이어야 합니다")
      .max(20, "사용자명은 최대 20자까지 가능합니다")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다"
      ),
    email: z.string().email("올바른 이메일 주소를 입력해주세요"),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function FormValidationPage() {
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onLoginSubmit = (data: LoginFormData) => {
    toast.success("로그인 성공!", {
      description: `이메일: ${data.email}`,
    });
  };

  const onSignupSubmit = (data: SignupFormData) => {
    toast.success("회원가입 성공!", {
      description: `사용자명: ${data.username}`,
    });
  };

  const zodSchemaCode = `import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
      "비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다"
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;`;

  const useFormCode = `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">로그인</button>
    </form>
  );
}`;

  const complexValidationCode = `const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "사용자명은 최소 3자 이상이어야 합니다")
      .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 가능"),
    email: z.string().email("올바른 이메일 주소를 입력해주세요"),
    password: z.string().min(8, "비밀번호는 최소 8자 이상"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });`;

  return (
    <BaseLayout>
      <Section>
        <Container>
          <PageHeader
            title="폼 검증"
            description="react-hook-form과 zod를 활용한 강력하고 타입 안전한 폼 검증 예제입니다."
          />

          <div className="mt-12 space-y-12">
            <DemoSection
              title="Zod 스키마 정의"
              description="타입 안전한 스키마 검증 라이브러리인 Zod를 사용합니다."
              code={zodSchemaCode}
              codeLanguage="typescript"
            >
              <Card className="p-6">
                <h3 className="font-semibold">주요 검증 규칙</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="font-mono text-primary">
                      z.string().email()
                    </span>
                    <span className="text-muted-foreground">
                      - 이메일 형식 검증
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-primary">
                      z.string().min(n)
                    </span>
                    <span className="text-muted-foreground">
                      - 최소 길이 검증
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-primary">
                      z.string().regex()
                    </span>
                    <span className="text-muted-foreground">
                      - 정규식 패턴 검증
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-primary">.refine()</span>
                    <span className="text-muted-foreground">
                      - 커스텀 검증 로직
                    </span>
                  </li>
                </ul>
              </Card>
            </DemoSection>

            <DemoSection
              title="기본 로그인 폼"
              description="이메일과 비밀번호 검증이 포함된 로그인 폼입니다."
              code={useFormCode}
              codeLanguage="typescript"
            >
              <Card className="max-w-md p-6">
                <h3 className="text-lg font-semibold">로그인</h3>
                <form
                  onSubmit={handleLoginSubmit(onLoginSubmit)}
                  className="mt-4 space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email">이메일</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      {...loginRegister("email")}
                    />
                    {loginErrors.email && (
                      <p className="text-sm text-destructive">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">비밀번호</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      {...loginRegister("password")}
                    />
                    {loginErrors.password && (
                      <p className="text-sm text-destructive">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    로그인
                  </Button>
                </form>
              </Card>
            </DemoSection>

            <DemoSection
              title="복잡한 검증 규칙"
              description="여러 필드 간 의존성이 있는 회원가입 폼입니다."
              code={complexValidationCode}
              codeLanguage="typescript"
            >
              <Card className="max-w-md p-6">
                <h3 className="text-lg font-semibold">회원가입</h3>
                <form
                  onSubmit={handleSignupSubmit(onSignupSubmit)}
                  className="mt-4 space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">사용자명</Label>
                    <Input
                      id="signup-username"
                      placeholder="username123"
                      {...signupRegister("username")}
                    />
                    {signupErrors.username && (
                      <p className="text-sm text-destructive">
                        {signupErrors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">이메일</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="example@email.com"
                      {...signupRegister("email")}
                    />
                    {signupErrors.email && (
                      <p className="text-sm text-destructive">
                        {signupErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">비밀번호</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      {...signupRegister("password")}
                    />
                    {signupErrors.password && (
                      <p className="text-sm text-destructive">
                        {signupErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">비밀번호 확인</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      {...signupRegister("confirmPassword")}
                    />
                    {signupErrors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {signupErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    회원가입
                  </Button>
                </form>
              </Card>
            </DemoSection>

            <DemoSection
              title="검증 규칙 요약"
              description="이 페이지에서 사용된 다양한 검증 규칙입니다."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-6">
                  <h4 className="font-semibold">이메일 검증</h4>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• 올바른 이메일 형식</li>
                    <li>• @와 도메인 필수</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold">비밀번호 검증</h4>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• 최소 8자 이상</li>
                    <li>• 대문자, 소문자, 숫자 포함</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold">사용자명 검증</h4>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• 3~20자 제한</li>
                    <li>• 영문, 숫자, 언더스코어만</li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold">비밀번호 확인</h4>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>• 비밀번호 일치 확인</li>
                    <li>• 커스텀 refine 사용</li>
                  </ul>
                </Card>
              </div>
            </DemoSection>
          </div>
        </Container>
      </Section>
    </BaseLayout>
  );
}
