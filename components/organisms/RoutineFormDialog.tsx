"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { routineFormSchema, type RoutineFormValues } from "@/lib/validations";
import { TIME_SLOTS, REPEAT_TYPES, WEEKDAYS } from "@/lib/constants";
import type { Routine, CreateRoutineInput } from "@/hooks/useRoutines";

interface RoutineFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CreateRoutineInput) => Promise<void>;
  defaultValues?: Routine;
}

export function RoutineFormDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: RoutineFormDialogProps) {
  const isEdit = !!defaultValues;

  const form = useForm<RoutineFormValues>({
    resolver: zodResolver(routineFormSchema),
    defaultValues: {
      title: "",
      category: "morning",
      repeat_type: "daily",
      repeat_days: [],
    },
  });

  const repeatType = form.watch("repeat_type");

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        category: defaultValues.category,
        repeat_type: defaultValues.repeat_type,
        repeat_days: defaultValues.repeat_days ?? [],
      });
    } else {
      form.reset({ title: "", category: "morning", repeat_type: "daily", repeat_days: [] });
    }
  }, [defaultValues, form]);

  async function handleSubmit(values: RoutineFormValues) {
    await onSubmit({
      title: values.title,
      category: values.category,
      repeat_type: values.repeat_type,
      repeat_days: values.repeat_type === "custom" ? values.repeat_days : undefined,
    });
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{isEdit ? "루틴 수정" : "루틴 추가"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* 루틴 이름 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>루틴 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 독서 30분" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 시간대 */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>시간대</FormLabel>
                  <div className="flex gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => field.onChange(slot.value)}
                        className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                          field.value === slot.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 반복 유형 */}
            <FormField
              control={form.control}
              name="repeat_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>반복</FormLabel>
                  <div className="flex gap-2">
                    {REPEAT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => field.onChange(type.value)}
                        className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                          field.value === type.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 요일 선택 (custom일 때만) */}
            {repeatType === "custom" && (
              <FormField
                control={form.control}
                name="repeat_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>요일 선택</FormLabel>
                    <div className="flex gap-1">
                      {WEEKDAYS.map((day) => {
                        const checked = field.value?.includes(day.value) ?? false;
                        return (
                          <button
                            key={day.value}
                            type="button"
                            onClick={() => {
                              const current = field.value ?? [];
                              field.onChange(
                                checked
                                  ? current.filter((d) => d !== day.value)
                                  : [...current, day.value]
                              );
                            }}
                            className={`h-8 w-8 rounded-full text-xs font-medium transition-colors ${
                              checked
                                ? "bg-primary text-primary-foreground"
                                : "border border-border text-muted-foreground hover:bg-accent"
                            }`}
                          >
                            {day.label}
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
