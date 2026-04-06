"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatDate, getToday } from "@/lib/date";

interface UseStreakReturn {
  currentStreak: number;
  bestStreak: number;
  loading: boolean;
}

export function useStreak(): UseStreakReturn {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStreak() {
      const supabase = createClient();
      const today = getToday();

      // 60일 전 날짜 계산
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - 59);

      const { data } = await supabase
        .from("routine_logs")
        .select("date")
        .gte("date", formatDate(pastDate, "yyyy-MM-dd"))
        .lte("date", formatDate(today, "yyyy-MM-dd"));

      if (!data) {
        setLoading(false);
        return;
      }

      // 로그가 존재하는 날짜 집합 생성
      const activeDates = new Set(data.map((l) => l.date));

      // 현재 스트릭: 오늘부터 역순으로 연속된 날 계산
      let streak = 0;
      const cursor = new Date(today);
      while (activeDates.has(formatDate(cursor, "yyyy-MM-dd"))) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      }
      setCurrentStreak(streak);

      // 최장 스트릭: 60일 전체 구간에서 계산
      let best = 0;
      let current = 0;
      for (let i = 0; i < 60; i++) {
        const d = new Date(pastDate);
        d.setDate(pastDate.getDate() + i);
        if (activeDates.has(formatDate(d, "yyyy-MM-dd"))) {
          current++;
          if (current > best) best = current;
        } else {
          current = 0;
        }
      }
      setBestStreak(best);
      setLoading(false);
    }

    fetchStreak();
  }, []);

  return { currentStreak, bestStreak, loading };
}
