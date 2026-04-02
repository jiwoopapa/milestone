import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { buildCoachingPrompt } from "@/lib/claude";

export const runtime = "edge";

interface RoutineStat {
  title: string;
  category: "morning" | "commute" | "evening";
  completedDays: number;
  totalDays: number;
}

interface CoachingRequest {
  weekStart: string;
  weekEnd: string;
  routineStats: RoutineStat[];
  overallRate: number;
}

export async function POST(request: Request) {
  const body: CoachingRequest = await request.json();

  const prompt = buildCoachingPrompt(body);

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    messages: [{ role: "user", content: prompt }],
  });

  return result.toTextStreamResponse();
}
