import { createBrowserClient } from "@supabase/ssr";

// 클라이언트 컴포넌트 / 훅에서 사용
// 서버 컴포넌트에서 import 금지
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
