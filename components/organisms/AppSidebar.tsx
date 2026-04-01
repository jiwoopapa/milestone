"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, ActivitySquare } from "lucide-react";
import {
  LayoutDashboard,
  Target,
  Calendar,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { appNavLinks } from "@/lib/constants";
import { useUser } from "@/hooks/useUser";

// 아이콘 이름 → Lucide 컴포넌트 매핑
const iconMap = {
  "layout-dashboard": LayoutDashboard,
  target: Target,
  calendar: Calendar,
  settings: Settings,
} as const;

type IconName = keyof typeof iconMap;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {appNavLinks.map((link) => {
        const Icon = iconMap[link.icon as IconName] ?? ActivitySquare;
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut } = useUser();

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* 로고 */}
      <div className="flex items-center gap-2 px-2 py-1">
        <ActivitySquare className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold">루틴 매니저</span>
      </div>
      <Separator />

      {/* 네비게이션 */}
      <div className="flex-1">
        <NavLinks onNavigate={onNavigate} />
      </div>

      <Separator />

      {/* 사용자 정보 + 로그아웃 */}
      <div className="flex flex-col gap-2">
        {user && (
          <p className="truncate px-3 text-xs text-muted-foreground">
            {user.email}
          </p>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="justify-start gap-3 text-muted-foreground"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </Button>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="hidden w-56 shrink-0 border-r bg-background md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* 모바일 드로어 */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-56 p-0">
          <SheetTitle className="sr-only">내비게이션 메뉴</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
