"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date";
import type { Routine, RoutineLog } from "@/hooks/useRoutines";

interface AiCoachingPanelProps {
  routines: Routine[];
  weekLogs: RoutineLog[];
  weekStart: Date;
  weekEnd: Date;
}

export function AiCoachingPanel({
  routines,
  weekLogs,
  weekStart,
  weekEnd,
}: AiCoachingPanelProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  // 루틴별 주간 통계 계산
  const totalDays = Math.round(
    (weekEnd.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  const routineStats = routines.map((r) => {
    const completedDays = weekLogs.filter((l) => l.routine_id === r.id).length;
    return {
      title: r.title,
      category: r.category,
      completedDays,
      totalDays,
    };
  });

  const overallRate =
    routines.length > 0
      ? weekLogs.length / (routines.length * totalDays)
      : 0;

  async function requestCoaching() {
    setLoading(true);
    setText("");

    const response = await fetch("/api/coaching", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weekStart: formatDate(weekStart, "yyyy-MM-dd"),
        weekEnd: formatDate(weekEnd, "yyyy-MM-dd"),
        routineStats,
        overallRate,
      }),
    });

    if (!response.ok || !response.body) {
      setText("AI 코칭 요청에 실패했습니다.");
      setLoading(false);
      return;
    }

    // plain text 스트리밍 응답 처리
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setText((prev) => prev + decoder.decode(value, { stream: true }));
    }

    setLoading(false);
  }

  const weekRatePercent = Math.round(overallRate * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between"
        >
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            AI 코칭
          </CardTitle>
          {open ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </CardHeader>

      {open && (
        <CardContent className="space-y-4">
          {/* 주간 요약 */}
          <div className="rounded-md bg-muted px-4 py-3 text-sm">
            <p className="font-medium">
              {formatDate(weekStart, "M/d")} ~ {formatDate(weekEnd, "M/d")} 주간 달성률
            </p>
            <p className={cn(
              "text-2xl font-bold mt-1",
              weekRatePercent >= 70 ? "text-primary" : "text-destructive"
            )}>
              {weekRatePercent}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {routines.length}개 루틴 · {weekLogs.length} / {routines.length * totalDays}회 완료
            </p>
          </div>

          {/* AI 분석 결과 */}
          {text && (
            <div className="rounded-md border bg-card p-4 text-sm whitespace-pre-wrap leading-relaxed">
              {text}
            </div>
          )}

          <Button
            onClick={requestCoaching}
            disabled={loading || routines.length === 0}
            className="w-full gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "분석 중..." : "AI 코칭 받기"}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
