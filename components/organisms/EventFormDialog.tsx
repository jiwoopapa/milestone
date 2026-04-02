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
import { eventFormSchema, type EventFormValues } from "@/lib/validations";
import { EVENT_CATEGORIES } from "@/lib/constants";
import type { CalendarEvent, CreateEventInput } from "@/hooks/useEvents";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDate?: string;
  defaultValues?: CalendarEvent;
  onSubmit: (values: CreateEventInput) => Promise<void>;
}

export function EventFormDialog({
  open,
  onOpenChange,
  defaultDate,
  defaultValues,
  onSubmit,
}: EventFormDialogProps) {
  const isEdit = !!defaultValues;

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      event_date: defaultDate ?? "",
      category: "etc",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        event_date: defaultValues.event_date,
        category: defaultValues.category,
      });
    } else {
      form.reset({ title: "", event_date: defaultDate ?? "", category: "etc" });
    }
  }, [defaultValues, defaultDate, form]);

  async function handleSubmit(values: EventFormValues) {
    await onSubmit(values);
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{isEdit ? "이벤트 수정" : "이벤트 추가"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이벤트 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 북한산 등산" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>날짜</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <div className="flex gap-2">
                    {EVENT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => field.onChange(cat.value)}
                        className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                          field.value === cat.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
