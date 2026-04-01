import { z } from "zod";

// 공통 검증 스키마

// 이메일 검증
export const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요.")
  .email("올바른 이메일 주소를 입력해주세요.");

// 비밀번호 검증 (최소 8자, 영문+숫자)
export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)/,
    "비밀번호는 영문과 숫자를 포함해야 합니다."
  );

// 이름 검증
export const nameSchema = z
  .string()
  .min(2, "이름은 2자 이상이어야 합니다.")
  .max(50, "이름은 50자 이하여야 합니다.");

// 전화번호 검증 (한국 형식)
export const phoneSchema = z
  .string()
  .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, "올바른 전화번호를 입력해주세요.");

// 문의 폼 스키마
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(1, "주제를 선택해주세요."),
  message: z
    .string()
    .min(10, "메시지는 10자 이상이어야 합니다.")
    .max(1000, "메시지는 1000자 이하여야 합니다."),
  terms: z
    .boolean()
    .refine((val) => val === true, "약관에 동의해주세요."),
});

// 로그인 폼 스키마
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

// 회원가입 폼 스키마
export const registerFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 타입 추출
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
