"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  event_date: string;
  category: "hiking" | "camping" | "etc";
  created_at: string;
}

export interface CreateEventInput {
  title: string;
  event_date: string;
  category: CalendarEvent["category"];
}

interface UseEventsReturn {
  events: CalendarEvent[];
  loading: boolean;
  create: (input: CreateEventInput) => Promise<void>;
  update: (id: string, input: Partial<CreateEventInput>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useEvents(year: number, month: number): UseEventsReturn {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    const supabase = createClient();
    // 해당 월 전체 범위 조회
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = new Date(year, month, 0).toISOString().split("T")[0];

    const { data } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", startDate)
      .lte("event_date", endDate)
      .order("event_date");

    setEvents(data ?? []);
    setLoading(false);
  }, [year, month]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  async function create(input: CreateEventInput) {
    const supabase = createClient();
    await supabase.from("events").insert(input);
    await fetchEvents();
  }

  async function update(id: string, input: Partial<CreateEventInput>) {
    const supabase = createClient();
    await supabase.from("events").update(input).eq("id", id);
    await fetchEvents();
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from("events").delete().eq("id", id);
    await fetchEvents();
  }

  return { events, loading, create, update, remove, refetch: fetchEvents };
}
