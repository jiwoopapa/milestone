import {
  format,
  isToday,
  isYesterday,
  differenceInDays,
  isSameDay as dateFnsIsSameDay,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { ko } from "date-fns/locale";

// 날짜를 지정한 포맷 문자열로 변환
export function formatDate(date: Date | string, pattern: string): string {
  return format(new Date(date), pattern, { locale: ko });
}

// 오늘 날짜 반환
export function getToday(): Date {
  return new Date();
}

// 두 날짜가 같은 날인지 비교
export function isSameDay(a: Date | string, b: Date | string): boolean {
  return dateFnsIsSameDay(new Date(a), new Date(b));
}

// 특정 월의 전체 날짜 배열 반환
export function getDaysInMonth(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));
  return eachDayOfInterval({ start, end });
}

// '오늘', '어제', 'n일 전' 형식의 상대 날짜 문자열 반환
export function formatRelative(date: Date | string): string {
  const d = new Date(date);
  if (isToday(d)) return "오늘";
  if (isYesterday(d)) return "어제";
  const diff = differenceInDays(new Date(), d);
  if (diff > 0) return `${diff}일 전`;
  return formatDate(d, "M월 d일");
}
