"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
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
import { goalFormSchema, type GoalFormValues } from "@/lib/validations";
import type { Goal, CreateGoalInput } from "@/hooks/useGoals";

interface GoalFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CreateGoalInput) => Promise<void>;
  defaultValues?: Goal;
}

export function GoalFormDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: GoalFormDialogProps) {
  const isEdit = !!defaultValues;

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema) as Resolver<GoalFormValues>,
    defaultValues: {
      title: "",
      unit: "",
      target_value: 0,
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        unit: defaultValues.unit,
        target_value: defaultValues.target_value,
        start_date: defaultValues.start_date,
        end_date: defaultValues.end_date ?? "",
      });
    } else {
      form.reset({ title: "", unit: "", target_value: 0, start_date: "", end_date: "" });
    }
  }, [defaultValues, form]);

  async function handleSubmit(values: GoalFormValues) {
    await onSubmit({
      title: values.title,
      unit: values.unit,
      target_value: values.target_value,
      start_date: values.start_date,
      end_date: values.end_date || undefined,
    });
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{isEdit ? "목표 수정" : "목표 추가"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>목표 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 연간 러닝 2400km" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="target_value"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>목표값</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormLabel>단위</FormLabel>
                    <FormControl>
                      <Input placeholder="km" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>시작일</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>종료일 (선택)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                취소
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {isEdit ? "수정" : "추가"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
