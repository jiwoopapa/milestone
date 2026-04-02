"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownExportDialog } from "@/components/organisms/MarkdownExportDialog";

export default function SettingsPage() {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-xl font-bold">설정</h1>

      {/* 데이터 내보내기 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">데이터 내보내기</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            루틴 완료 기록과 목표 달성 데이터를 Obsidian ACE 형식의 Markdown으로 내보냅니다.
          </p>
          <Button className="gap-2" onClick={() => setExportOpen(true)}>
            <Download className="h-4 w-4" />
            Markdown Export
          </Button>
        </CardContent>
      </Card>

      <MarkdownExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
