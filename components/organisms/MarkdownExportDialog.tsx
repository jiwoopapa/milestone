"use client";

import { useState } from "react";
import { Download, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateMarkdown } from "@/lib/markdown";
import { createClient } from "@/lib/supabase/client";
import { formatDate, getToday } from "@/lib/date";

interface MarkdownExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarkdownExportDialog({ open, onOpenChange }: MarkdownExportDialogProps) {
  const today = formatDate(getToday(), "yyyy-MM-dd");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generatePreview() {
    setLoading(true);
    const supabase = createClient();

    // 루틴 완료 기록 조회
    const { data: routineLogData } = await supabase
      .from("routine_logs")
      .select("date, routines(title, category)")
      .gte("date", startDate)
      .lte("date", endDate);

    // 목표 기록 조회
    const { data: goalLogData } = await supabase
      .from("goal_logs")
      .select("value, note, logged_at, goals(title, unit)")
      .gte("logged_at", `${startDate}T00:00:00`)
      .lte("logged_at", `${endDate}T23:59:59`);

    const routineLogs = (routineLogData ?? []).flatMap((log) => {
      const routine = Array.isArray(log.routines) ? log.routines[0] : log.routines;
      if (!routine) return [];
      return [{
        routineTitle: (routine as { title: string }).title,
        category: (routine as { category: "morning" | "commute" | "evening" }).category,
        date: log.date,
      }];
    });

    const goalLogs = (goalLogData ?? []).flatMap((log) => {
      const goal = Array.isArray(log.goals) ? log.goals[0] : log.goals;
      if (!goal) return [];
      return [{
        goalTitle: (goal as { title: string }).title,
        unit: (goal as { unit: string }).unit,
        value: log.value,
        note: log.note,
        loggedAt: log.logged_at,
      }];
    });

    const md = generateMarkdown({ startDate, endDate, routineLogs, goalLogs });
    setPreview(md);
    setLoading(false);
  }

  function downloadFile() {
    const blob = new Blob([preview], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `루틴기록_${startDate}_${endDate}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Markdown Export (Obsidian)</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 날짜 범위 */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <Label>시작일</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="flex-1 space-y-1.5">
              <Label>종료일</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <Button variant="outline" onClick={generatePreview} disabled={loading} className="w-full">
            {loading ? "생성 중..." : "미리보기 생성"}
          </Button>

          {/* 미리보기 */}
          {preview && (
            <textarea
              readOnly
              value={preview}
              className="h-64 w-full rounded-md border bg-muted p-3 font-mono text-xs"
            />
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>닫기</Button>
          {preview && (
            <>
              <Button variant="outline" onClick={copyToClipboard} className="gap-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "복사됨" : "클립보드 복사"}
              </Button>
              <Button onClick={downloadFile} className="gap-2">
                <Download className="h-4 w-4" />
                다운로드
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
