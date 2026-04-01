"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { AppSidebar } from "@/components/organisms/AppSidebar";
import { useUser } from "@/hooks/useUser";
import { formatDate, getToday } from "@/lib/date";

export function AppHeader() {
  const { user } = useUser();

  const today = formatDate(getToday(), "yyyy년 M월 d일 (EEE)");

  // 아바타 이니셜: 이메일 첫 글자 또는 display_name 첫 글자
  const initials = (
    (user?.user_metadata?.display_name as string | undefined) ?? user?.email ?? "U"
  )
    .charAt(0)
    .toUpperCase();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      {/* 모바일 햄버거 메뉴 */}
      <AppSidebar />

      {/* 날짜 표시 */}
      <p className="hidden text-sm text-muted-foreground sm:block">{today}</p>

      {/* 우측: 테마 토글 + 아바타 */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
