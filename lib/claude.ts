// Claude API는 반드시 Route Handler를 통해서만 호출 (클라이언트 직접 호출 금지)

interface RoutineStat {
  title: string;
  category: "morning" | "commute" | "evening";
  completedDays: number;
  totalDays: number;
}

interface CoachingPromptOptions {
  weekStart: string;
  weekEnd: string;
  routineStats: RoutineStat[];
  overallRate: number;
}

const categoryLabel: Record<string, string> = {
  morning: "아침(성장)",
  commute: "이동(학습)",
  evening: "저녁(행복)",
};

// 루틴 데이터를 기반으로 AI 코칭 프롬프트 생성
export function buildCoachingPrompt({
  weekStart,
  weekEnd,
  routineStats,
  overallRate,
}: CoachingPromptOptions): string {
  const statLines = routineStats
    .map((r) => {
      const rate = r.totalDays > 0 ? Math.round((r.completedDays / r.totalDays) * 100) : 0;
      return `- [${categoryLabel[r.category]}] ${r.title}: ${r.completedDays}/${r.totalDays}일 완료 (${rate}%)`;
    })
    .join("\n");

  return `당신은 습관 및 루틴 관리 전문 AI 코치입니다. 사용자의 한 주 루틴 데이터를 분석하고 한국어로 피드백을 제공해주세요.

## 분석 기간
${weekStart} ~ ${weekEnd}

## 주간 루틴 달성 현황
전체 달성률: ${Math.round(overallRate * 100)}%

${statLines}

## 요청 사항
다음 항목을 포함하여 간결하게 피드백을 작성해주세요 (총 300자 내외):
1. **이번 주 잘한 점** — 달성률이 높은 루틴 칭찬
2. **개선이 필요한 부분** — 미완료가 많은 루틴의 원인 추정
3. **다음 주 실천 제안** — 구체적이고 실행 가능한 1~2가지 제안

친근하고 격려하는 톤으로 작성해주세요.`;
}
