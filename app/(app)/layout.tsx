import { AppSidebar } from "@/components/organisms/AppSidebar";
import { AppHeader } from "@/components/organisms/AppHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 데스크톱 사이드바 */}
      <AppSidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
