"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarView } from "@/components/organisms/CalendarView";
import { useEvents } from "@/hooks/useEvents";
import { useRoutines } from "@/hooks/useRoutines";
import { formatDate, getDaysInMonth } from "@/lib/date";

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const { events, create, update, remove } = useEvents(year, month);

  // 루틴 완료율 계산을 위해 월 전체 logs 조회
  const days = getDaysInMonth(year, month);
  // 임시로 오늘 날짜 기준 routines 조회 (완료율 오버레이용)
  const { routines, logs } = useRoutines();

  // 날짜별 루틴 완료율 계산
  const routineCompletionByDate: Record<string, number> = {};
  days.forEach((day) => {
    const dateStr = formatDate(day, "yyyy-MM-dd");
    const dayLogs = logs.filter((l) => l.date === dateStr);
    routineCompletionByDate[dateStr] =
      routines.length > 0 ? dayLogs.length / routines.length : 0;
  });

  function moveMonth(delta: number) {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth > 12) { newMonth = 1; newYear++; }
    if (newMonth < 1) { newMonth = 12; newYear--; }
    setMonth(newMonth);
    setYear(newYear);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* 월 네비게이터 */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => moveMonth(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">
          {year}년 {month}월
        </h1>
        <Button variant="ghost" size="icon" onClick={() => moveMonth(1)}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <CalendarView
        year={year}
        month={month}
        events={events}
        routineCompletionByDate={routineCompletionByDate}
        onCreate={create}
        onUpdate={update}
        onDelete={remove}
      />
    </div>
  );
}
