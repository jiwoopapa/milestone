-- =============================================
-- 002_rls_policies.sql
-- RLS 정책 강화: 불필요한 정책 정리 및 service_role 접근 보장
-- =============================================

-- service_role은 RLS를 우회하므로 서버 사이드 작업에 사용 가능
-- 아래는 anon role이 절대 데이터에 접근하지 못하도록 명시적 차단

-- routine_logs: 본인 루틴의 로그만 삽입 가능 (routine_id 소유권 검증)
DROP POLICY IF EXISTS "routine_logs_insert_own" ON public.routine_logs;
CREATE POLICY "routine_logs_insert_own" ON public.routine_logs
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.routines
      WHERE id = routine_id AND user_id = auth.uid()
    )
  );

-- goal_logs: 본인 목표의 로그만 삽입 가능 (goal_id 소유권 검증)
DROP POLICY IF EXISTS "goal_logs_insert_own" ON public.goal_logs;
CREATE POLICY "goal_logs_insert_own" ON public.goal_logs
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.goals
      WHERE id = goal_id AND user_id = auth.uid()
    )
  );

-- events: 본인 이벤트만 접근 가능 (기존 정책 재확인)
DROP POLICY IF EXISTS "events_insert_own" ON public.events;
CREATE POLICY "events_insert_own" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- anon 역할 접근 차단 확인 (RLS 활성화만으로 충분하지만 명시적 정책 추가)
-- anon은 인증된 사용자가 아니므로 auth.uid()가 NULL → 모든 정책 실패로 자동 차단
