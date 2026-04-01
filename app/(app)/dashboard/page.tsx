"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoutineCheckList } from "@/components/organisms/RoutineCheckList";
import { RoutineFormDialog } from "@/components/organisms/RoutineFormDialog";
import { useRoutines } from "@/hooks/useRoutines";
import { formatDate, getToday } from "@/lib/date";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(
    formatDate(getToday(), "yyyy-MM-dd")
  );

  const { routines, logs, loading, create, update, remove, toggleComplete } =
    useRoutines(selectedDate);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

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

      {/* 전체 루틴 추가 버튼 */}
      <RoutineFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={create}
      />
    </div>
  );
}
