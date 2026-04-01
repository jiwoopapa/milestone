"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { formatDate } from "@/lib/date";
import type { Goal, GoalLog } from "@/hooks/useGoals";

interface GoalProgressCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => Promise<void>;
  onAddLog: (goal: Goal) => void;
  getLogsForGoal: (goalId: string) => Promise<GoalLog[]>;
}

export function GoalProgressCard({
  goal,
  onEdit,
  onDelete,
  onAddLog,
  getLogsForGoal,
}: GoalProgressCardProps) {
  const [logs, setLogs] = useState<GoalLog[]>([]);

  useEffect(() => {
    getLogsForGoal(goal.id).then(setLogs);
  }, [goal.id, goal.current_value, getLogsForGoal]);

  const progressPercent = Math.min(
    Math.round((goal.current_value / goal.target_value) * 100),
    100
  );

  // 누적 그래프 데이터 생성
  const chartData = logs.reduce<{ date: string; 누적: number }[]>((acc, log) => {
    const prev = acc[acc.length - 1]?.누적 ?? 0;
    acc.push({
      date: formatDate(log.logged_at, "M/d"),
      누적: prev + log.value,
    });
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{goal.title}</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(goal)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={() => onDelete(goal.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 진행 바 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              {goal.current_value} / {goal.target_value} {goal.unit}
            </span>
            <span className="text-muted-foreground">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* 누적 그래프 */}
        {chartData.length > 1 && (
          <ChartContainer
            config={{ 누적: { label: `누적 (${goal.unit})`, color: "hsl(var(--primary))" } }}
            className="h-28"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="누적"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.15)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}

        {/* 기록 추가 버튼 */}
        <Button size="sm" variant="outline" className="w-full gap-2" onClick={() => onAddLog(goal)}>
          <Plus className="h-4 w-4" />
          기록 추가
        </Button>
      </CardContent>
    </Card>
  );
}
