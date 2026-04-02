"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDaysInMonth, formatDate, isSameDay } from "@/lib/date";
import { EVENT_CATEGORIES } from "@/lib/constants";
import { EventFormDialog } from "@/components/organisms/EventFormDialog";
import type { CalendarEvent, CreateEventInput } from "@/hooks/useEvents";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

const categoryColor: Record<string, string> = {
  hiking: "bg-green-500",
  camping: "bg-orange-500",
  etc: "bg-blue-500",
};

interface CalendarViewProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  routineCompletionByDate: Record<string, number>; // date → 완료율 0~1
  onCreate: (input: CreateEventInput) => Promise<void>;
  onUpdate: (id: string, input: Partial<CreateEventInput>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function CalendarView({
  year,
  month,
  events,
  routineCompletionByDate,
  onCreate,
  onUpdate,
  onDelete,
}: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<CalendarEvent | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const days = getDaysInMonth(year, month);
  const firstDayOfWeek = days[0].getDay();

  // 날짜별 이벤트 조회
  function eventsForDate(date: Date) {
    return events.filter((e) => isSameDay(e.event_date, date));
  }

  // 루틴 완료율 → 배경 색상 강도
  function completionClass(dateStr: string) {
    const rate = routineCompletionByDate[dateStr] ?? 0;
    if (rate >= 0.8) return "bg-primary/20";
    if (rate >= 0.4) return "bg-primary/10";
    return "";
  }

  const selectedEvents = selectedDate
    ? events.filter((e) => e.event_date === selectedDate)
    : [];

  return (
    <div className="space-y-4">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {/* 첫 주 빈 칸 */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = formatDate(day, "yyyy-MM-dd");
          const dayEvents = eventsForDate(day);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(isSelected ? null : dateStr)}
              className={cn(
                "relative flex min-h-[56px] flex-col rounded-md border p-1 text-left transition-colors hover:bg-accent",
                isSelected && "border-primary ring-1 ring-primary",
                completionClass(dateStr)
              )}
            >
              <span className={cn(
                "text-xs font-medium",
                day.getDay() === 0 && "text-red-500",
                day.getDay() === 6 && "text-blue-500"
              )}>
                {day.getDate()}
              </span>
              {/* 이벤트 뱃지 */}
              <div className="mt-0.5 flex flex-wrap gap-0.5">
                {dayEvents.slice(0, 2).map((e) => (
                  <span
                    key={e.id}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      categoryColor[e.category] ?? "bg-muted-foreground"
                    )}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <span className="text-[9px] text-muted-foreground">+{dayEvents.length - 2}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 선택된 날짜 이벤트 목록 */}
      {selectedDate && (
        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">
              {formatDate(selectedDate, "M월 d일 (EEE)")} 이벤트
            </h3>
            <Button size="sm" variant="outline" className="gap-1 h-7 text-xs"
              onClick={() => setAddDialogOpen(true)}>
              <Plus className="h-3.5 w-3.5" />
              추가
            </Button>
          </div>
          {selectedEvents.length === 0 ? (
            <p className="text-xs text-muted-foreground">이벤트가 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {selectedEvents.map((e) => (
                <li key={e.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", categoryColor[e.category])} />
                    <span className="text-sm">{e.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {EVENT_CATEGORIES.find((c) => c.value === e.category)?.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6"
                      onClick={() => setEditTarget(e)}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={() => onDelete(e.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 이벤트 추가 다이얼로그 */}
      <EventFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        defaultDate={selectedDate ?? undefined}
        onSubmit={onCreate}
      />

      {/* 이벤트 수정 다이얼로그 */}
      <EventFormDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        defaultValues={editTarget ?? undefined}
        onSubmit={async (values) => {
          if (editTarget) await onUpdate(editTarget.id, values);
        }}
      />
    </div>
  );
}
