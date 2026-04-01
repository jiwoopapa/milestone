"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatDate, getToday } from "@/lib/date";

export interface Routine {
  id: string;
  user_id: string;
  title: string;
  category: "morning" | "commute" | "evening";
  repeat_type: "daily" | "weekdays" | "custom";
  repeat_days: number[] | null;
  is_active: boolean;
  created_at: string;
}

export interface RoutineLog {
  id: string;
  routine_id: string;
  user_id: string;
  date: string;
  completed_at: string;
}

export interface CreateRoutineInput {
  title: string;
  category: Routine["category"];
  repeat_type: Routine["repeat_type"];
  repeat_days?: number[];
}

interface UseRoutinesReturn {
  routines: Routine[];
  logs: RoutineLog[];
  loading: boolean;
  create: (input: CreateRoutineInput) => Promise<void>;
  update: (id: string, input: Partial<CreateRoutineInput>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toggleComplete: (routineId: string, date: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useRoutines(selectedDate?: string): UseRoutinesReturn {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [logs, setLogs] = useState<RoutineLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    const supabase = createClient();
    const date = selectedDate ?? formatDate(getToday(), "yyyy-MM-dd");

    const [{ data: routineData }, { data: logData }] = await Promise.all([
      supabase
        .from("routines")
        .select("*")
        .eq("is_active", true)
        .order("created_at"),
      supabase
        .from("routine_logs")
        .select("*")
        .eq("date", date),
    ]);

    setRoutines(routineData ?? []);
    setLogs(logData ?? []);
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function create(input: CreateRoutineInput) {
    const supabase = createClient();
    await supabase.from("routines").insert({
      title: input.title,
      category: input.category,
      repeat_type: input.repeat_type,
      repeat_days: input.repeat_days ?? null,
    });
    await fetchAll();
  }

  async function update(id: string, input: Partial<CreateRoutineInput>) {
    const supabase = createClient();
    await supabase.from("routines").update(input).eq("id", id);
    await fetchAll();
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from("routines").delete().eq("id", id);
    await fetchAll();
  }

  async function toggleComplete(routineId: string, date: string) {
    const supabase = createClient();
    const existing = logs.find((l) => l.routine_id === routineId && l.date === date);

    if (existing) {
      // 이미 완료된 경우 취소
      await supabase.from("routine_logs").delete().eq("id", existing.id);
    } else {
      // 완료 처리
      await supabase.from("routine_logs").insert({ routine_id: routineId, date });
    }
    await fetchAll();
  }

  return { routines, logs, loading, create, update, remove, toggleComplete, refetch: fetchAll };
}
