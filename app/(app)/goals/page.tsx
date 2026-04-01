"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoalFormDialog } from "@/components/organisms/GoalFormDialog";
import { GoalLogDialog } from "@/components/organisms/GoalLogDialog";
import { GoalProgressCard } from "@/components/organisms/GoalProgressCard";
import { useGoals } from "@/hooks/useGoals";
import type { Goal } from "@/hooks/useGoals";

export default function GoalsPage() {
  const { goals, loading, create, update, remove, addLog, getLogsForGoal } = useGoals();

  const [goalFormOpen, setGoalFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Goal | null>(null);
  const [logTarget, setLogTarget] = useState<Goal | null>(null);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">목표 트래커</h1>
        <Button size="sm" className="gap-2" onClick={() => setGoalFormOpen(true)}>
          <Plus className="h-4 w-4" />
          목표 추가
        </Button>
      </div>

      {/* 목표 카드 목록 */}
      {loading ? (
        <p className="text-center text-sm text-muted-foreground">불러오는 중...</p>
      ) : goals.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-sm text-muted-foreground">아직 목표가 없습니다.</p>
          <Button
            variant="link"
            size="sm"
            className="mt-2"
            onClick={() => setGoalFormOpen(true)}
          >
            첫 번째 목표 추가하기
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {goals.map((goal) => (
            <GoalProgressCard
              key={goal.id}
              goal={goal}
              onEdit={(g) => setEditTarget(g)}
              onDelete={remove}
              onAddLog={(g) => setLogTarget(g)}
              getLogsForGoal={getLogsForGoal}
            />
          ))}
        </div>
      )}

      {/* 목표 추가 다이얼로그 */}
      <GoalFormDialog
        open={goalFormOpen}
        onOpenChange={setGoalFormOpen}
        onSubmit={create}
      />

      {/* 목표 수정 다이얼로그 */}
      <GoalFormDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        defaultValues={editTarget ?? undefined}
        onSubmit={async (values) => {
          if (editTarget) await update(editTarget.id, values);
        }}
      />

      {/* 기록 추가 다이얼로그 */}
      <GoalLogDialog
        open={!!logTarget}
        onOpenChange={(open) => !open && setLogTarget(null)}
        goal={logTarget}
        onSubmit={addLog}
      />
    </div>
  );
}
