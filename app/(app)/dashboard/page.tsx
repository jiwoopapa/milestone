"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoutineCheckList } from "@/components/organisms/RoutineCheckList";
import { RoutineFormDialog } from "@/components/organisms/RoutineFormDialog";
import { AiCoachingPanel } from "@/components/organisms/AiCoachingPanel";
import { useRoutines } from "@/hooks/useRoutines";
import { useStreak } from "@/hooks/useStreak";
import { formatDate, getToday } from "@/lib/date";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(
    formatDate(getToday(), "yyyy-MM-dd")
  );

  const { routines, logs, loading, create, update, remove, toggleComplete } =
    useRoutines(selectedDate);
  const { currentStreak, bestStreak } = useStreak();

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // 이번 주 범위 계산 (일~토)
  const today = getToday();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // 주간 logs (useRoutines는 selectedDate 기준이므로 별도로 전체 logs 활용)
  const weekLogs = logs;

  function moveDate(days: number) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(formatDate(d, "yyyy-MM-dd"));
  }

  const isToday = selectedDate === formatDate(getToday(), "yyyy-MM-dd");

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* 날짜 네비게이터 */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => moveDate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <p className="text-sm font-semibold">
            {formatDate(selectedDate, "yyyy년 M월 d일 (EEE)")}
          </p>
          {isToday && (
            <p className="text-xs text-primary">오늘</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => moveDate(1)}
          disabled={isToday}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* 스트릭 카드 */}
      {(currentStreak > 0 || bestStreak > 0) && (
        <Card>
          <CardContent className="flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div>
                <p className="text-sm font-semibold">{currentStreak}일 연속</p>
                <p className="text-xs text-muted-foreground">최장 {bestStreak}일</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">오늘 완료</p>
              <p className="text-sm font-semibold">
                {logs.length}/{routines.length}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 루틴 체크리스트 */}
      {loading ? (
        <p className="text-center text-sm text-muted-foreground">불러오는 중...</p>
      ) : (
        <RoutineCheckList
          routines={routines}
          logs={logs}
          selectedDate={selectedDate}
          onToggle={toggleComplete}
          onUpdate={update}
          onDelete={remove}
          onCreate={create}
        />
      )}

      {/* AI 코칭 패널 */}
      <AiCoachingPanel
        routines={routines}
        weekLogs={weekLogs}
        weekStart={weekStart}
        weekEnd={weekEnd}
      />

      {/* 전체 루틴 추가 버튼 */}
      <RoutineFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={create}
      />
    </div>
  );
}
