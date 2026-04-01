"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { goalLogFormSchema, type GoalLogFormValues } from "@/lib/validations";
import type { Goal } from "@/hooks/useGoals";

interface GoalLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onSubmit: (goalId: string, value: number, note?: string) => Promise<void>;
}

export function GoalLogDialog({ open, onOpenChange, goal, onSubmit }: GoalLogDialogProps) {
  const form = useForm<GoalLogFormValues>({
    resolver: zodResolver(goalLogFormSchema) as Resolver<GoalLogFormValues>,
    defaultValues: { value: 0, note: "" },
  });

  async function handleSubmit(values: GoalLogFormValues) {
    if (!goal) return;
    await onSubmit(goal.id, values.value, values.note || undefined);
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>기록 추가</DialogTitle>
          {goal && (
            <p className="text-sm text-muted-foreground">
              {goal.title} — 현재 {goal.current_value} / {goal.target_value} {goal.unit}
            </p>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>달성량 ({goal?.unit})</FormLabel>
                  <FormControl>
                    <Input type="number" step="any" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>메모 (선택)</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 한강 코스" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                취소
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                기록
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
