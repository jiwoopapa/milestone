import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/organisms/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-sm text-muted-foreground">
            새 계정을 만드세요
          </p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
