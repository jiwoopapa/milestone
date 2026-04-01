"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Container, Section, PageHeader } from "@/components/templates/base-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/atoms/spinner";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      terms: false,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ContactFormValues) {
    // 실제 구현에서는 API 호출로 대체
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
    toast.success("문의가 성공적으로 제출되었습니다!", {
      description: "빠른 시일 내에 답변 드리겠습니다.",
    });
    form.reset();
  }

  return (
    <Section>
      <Container>
        <PageHeader
          title="문의하기"
          description="궁금한 점이나 문의사항이 있으시면 아래 양식을 통해 연락해주세요."
        />

        <Card className="mx-auto mt-8 max-w-2xl">
          <CardHeader>
            <CardTitle>문의 양식</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>문의 유형</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="문의 유형을 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">일반 문의</SelectItem>
                          <SelectItem value="support">기술 지원</SelectItem>
                          <SelectItem value="feedback">피드백</SelectItem>
                          <SelectItem value="partnership">제휴 문의</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>메시지</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="문의 내용을 입력하세요..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        최소 10자 이상 입력해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>개인정보 수집 및 이용에 동의합니다</FormLabel>
                        <FormDescription>
                          문의 답변을 위해 개인정보를 수집합니다.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      제출 중...
                    </>
                  ) : (
                    "제출하기"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
