"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  unit: string;
  target_value: number;
  current_value: number;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export interface GoalLog {
  id: string;
  goal_id: string;
  user_id: string;
  value: number;
  note: string | null;
  logged_at: string;
}

export interface CreateGoalInput {
  title: string;
  unit: string;
  target_value: number;
  start_date: string;
  end_date?: string;
}

interface UseGoalsReturn {
  goals: Goal[];
  loading: boolean;
  create: (input: CreateGoalInput) => Promise<void>;
  update: (id: string, input: Partial<CreateGoalInput>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  addLog: (goalId: string, value: number, note?: string) => Promise<void>;
  getLogsForGoal: (goalId: string) => Promise<GoalLog[]>;
  refetch: () => Promise<void>;
}

export function useGoals(): UseGoalsReturn {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("goals")
      .select("*")
      .order("created_at");
    setGoals(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  async function create(input: CreateGoalInput) {
    const supabase = createClient();
    await supabase.from("goals").insert({
      title: input.title,
      unit: input.unit,
      target_value: input.target_value,
      start_date: input.start_date,
      end_date: input.end_date ?? null,
    });
    await fetchGoals();
  }

  async function update(id: string, input: Partial<CreateGoalInput>) {
    const supabase = createClient();
    await supabase.from("goals").update(input).eq("id", id);
    await fetchGoals();
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from("goals").delete().eq("id", id);
    await fetchGoals();
  }

  async function addLog(goalId: string, value: number, note?: string) {
    const supabase = createClient();
    // goal_logs에 기록 추가
    await supabase.from("goal_logs").insert({
      goal_id: goalId,
      value,
      note: note ?? null,
    });
    // goals.current_value 누적 업데이트
    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      await supabase
        .from("goals")
        .update({ current_value: goal.current_value + value })
        .eq("id", goalId);
    }
    await fetchGoals();
  }

  async function getLogsForGoal(goalId: string): Promise<GoalLog[]> {
    const supabase = createClient();
    const { data } = await supabase
      .from("goal_logs")
      .select("*")
      .eq("goal_id", goalId)
      .order("logged_at", { ascending: true });
    return data ?? [];
  }

  return { goals, loading, create, update, remove, addLog, getLogsForGoal, refetch: fetchGoals };
}
