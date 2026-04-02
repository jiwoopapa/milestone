import { formatDate } from "@/lib/date";

interface RoutineLogEntry {
  routineTitle: string;
  category: "morning" | "commute" | "evening";
  date: string;
}

interface GoalLogEntry {
  goalTitle: string;
  unit: string;
  value: number;
  note?: string | null;
  loggedAt: string;
}

interface MarkdownOptions {
  startDate: string;
  endDate: string;
  routineLogs: RoutineLogEntry[];
  goalLogs: GoalLogEntry[];
}

// ACE 프레임워크 형식 Markdown 생성
// ACE: Achievements(달성) / Challenges(도전) / Experiences(경험)
export function generateMarkdown({
  startDate,
  endDate,
  routineLogs,
  goalLogs,
}: MarkdownOptions): string {
  const start = formatDate(startDate, "yyyy-MM-dd");
  const end = formatDate(endDate, "yyyy-MM-dd");
  const now = formatDate(new Date(), "yyyy-MM-dd HH:mm");

  const categoryLabel: Record<string, string> = {
    morning: "아침 (성장)",
    commute: "이동 (학습)",
    evening: "저녁 (행복)",
  };

  // 날짜별 루틴 그룹화
  const routineByDate = routineLogs.reduce<Record<string, RoutineLogEntry[]>>(
    (acc, log) => {
      (acc[log.date] ??= []).push(log);
      return acc;
    },
    {}
  );

  // 목표별 그룹화
  const goalByTitle = goalLogs.reduce<Record<string, GoalLogEntry[]>>(
    (acc, log) => {
      (acc[log.goalTitle] ??= []).push(log);
      return acc;
    },
    {}
  );

  const lines: string[] = [
    `# 루틴 & 목표 기록`,
    ``,
    `> 기간: ${start} ~ ${end}  `,
    `> 생성: ${now}`,
    ``,
    `---`,
    ``,
    `## ✅ Achievements (달성)`,
    ``,
  ];

  // 루틴 달성 목록
  if (routineLogs.length > 0) {
    lines.push(`### 루틴 완료`);
    lines.push(``);
    Object.entries(routineByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([date, logs]) => {
        lines.push(`**${formatDate(date, "M월 d일 (EEE)")}**`);
        const byCategory: Record<string, string[]> = {};
        logs.forEach((l) => {
          (byCategory[l.category] ??= []).push(l.routineTitle);
        });
        Object.entries(byCategory).forEach(([cat, titles]) => {
          lines.push(`- ${categoryLabel[cat] ?? cat}`);
          titles.forEach((t) => lines.push(`  - [x] ${t}`));
        });
        lines.push(``);
      });
  }

  // 목표 달성 기록
  if (goalLogs.length > 0) {
    lines.push(`### 목표 기록`);
    lines.push(``);
    Object.entries(goalByTitle).forEach(([title, logs]) => {
      const total = logs.reduce((sum, l) => sum + l.value, 0);
      const unit = logs[0]?.unit ?? "";
      lines.push(`**${title}** — 합계 ${total} ${unit}`);
      logs.forEach((l) => {
        const note = l.note ? ` (${l.note})` : "";
        lines.push(`- ${formatDate(l.loggedAt, "M/d")} +${l.value} ${unit}${note}`);
      });
      lines.push(``);
    });
  }

  lines.push(`---`);
  lines.push(``);
  lines.push(`## 💪 Challenges (도전)`);
  lines.push(``);
  lines.push(`> 이 기간 동안의 어려움이나 미완료 루틴을 기록하세요.`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## 🌱 Experiences (경험)`);
  lines.push(``);
  lines.push(`> 이 기간에서 얻은 인사이트나 배움을 기록하세요.`);
  lines.push(``);

  return lines.join("\n");
}
