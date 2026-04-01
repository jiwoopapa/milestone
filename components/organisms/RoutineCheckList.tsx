"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TIME_SLOTS } from "@/lib/constants";
import { RoutineFormDialog } from "@/components/organisms/RoutineFormDialog";
import type { Routine, RoutineLog, CreateRoutineInput } from "@/hooks/useRoutines";

interface RoutineCheckListProps {
  routines: Routine[];
  logs: RoutineLog[];
  selectedDate: string;
  onToggle: (routineId: string, date: string) => Promise<void>;
  onUpdate: (id: string, input: Partial<CreateRoutineInput>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCreate: (input: CreateRoutineInput) => Promise<void>;
}

export function RoutineCheckList({
  routines,
  logs,
  selectedDate,
  onToggle,
  onUpdate,
  onDelete,
  onCreate,
}: RoutineCheckListProps) {
  const [editTarget, setEditTarget] = useState<Routine | null>(null);
  const [addCategory, setAddCategory] = useState<Routine["category"] | null>(null);

  function isCompleted(routineId: string) {
    return logs.some((l) => l.routine_id === routineId && l.date === selectedDate);
  }

  return (
    <div className="space-y-6">
      {TIME_SLOTS.map((slot) => {
        const slotRoutines = routines.filter((r) => r.category === slot.value);
        const completedCount = slotRoutines.filter((r) => isCompleted(r.id)).length;

        return (
          <section key={slot.value}>
            {/* 시간대 헤더 */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold">{slot.label}</h2>
                <span className="text-xs text-muted-foreground">
                  {completedCount}/{slotRoutines.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setAddCategory(slot.value as Routine["category"])}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* 루틴 목록 */}
            <ul className="space-y-2">
              {slotRoutines.length === 0 && (
                <li className="rounded-md border border-dashed px-4 py-3 text-center text-xs text-muted-foreground">
                  루틴이 없습니다
                </li>
              )}
              {slotRoutines.map((routine) => {
                const done = isCompleted(routine.id);
                return (
                  <li
                    key={routine.id}
                    className="flex items-center gap-3 rounded-md border bg-card px-4 py-3"
                  >
                    <Checkbox
                      checked={done}
                      onCheckedChange={() => onToggle(routine.id, selectedDate)}
                      id={routine.id}
                    />
                    <label
                      htmlFor={routine.id}
                      className={cn(
                        "flex-1 cursor-pointer text-sm",
                        done && "text-muted-foreground line-through"
                      )}
                    >
                      {routine.title}
                    </label>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setEditTarget(routine)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => onDelete(routine.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {/* 수정 다이얼로그 */}
      <RoutineFormDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        defaultValues={editTarget ?? undefined}
        onSubmit={async (values) => {
          if (editTarget) await onUpdate(editTarget.id, values);
        }}
      />

      {/* 추가 다이얼로그 */}
      <RoutineFormDialog
        open={!!addCategory}
        onOpenChange={(open) => !open && setAddCategory(null)}
        onSubmit={async (values) => {
          await onCreate({ ...values, category: addCategory! });
        }}
      />
    </div>
  );
}
