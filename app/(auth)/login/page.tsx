import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/organisms/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="text-sm text-muted-foreground">
            계정에 로그인하세요
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
