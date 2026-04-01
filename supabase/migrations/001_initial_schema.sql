-- =============================================
-- 001_initial_schema.sql
-- AI 기반 습관 & 루틴 관리 앱 초기 스키마
-- =============================================

-- users 테이블: auth.users와 연동되는 프로필 정보
CREATE TABLE IF NOT EXISTS public.users (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- routines 테이블: 루틴 정의
CREATE TABLE IF NOT EXISTS public.routines (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title       text NOT NULL,
  category    text NOT NULL CHECK (category IN ('morning', 'commute', 'evening')),
  repeat_type text NOT NULL CHECK (repeat_type IN ('daily', 'weekdays', 'custom')),
  repeat_days int[],
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- routine_logs 테이블: 루틴 완료 기록
CREATE TABLE IF NOT EXISTS public.routine_logs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id   uuid NOT NULL REFERENCES public.routines(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date         date NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (routine_id, date)
);

-- goals 테이블: 장기 목표
CREATE TABLE IF NOT EXISTS public.goals (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title         text NOT NULL,
  unit          text NOT NULL,
  target_value  numeric NOT NULL,
  current_value numeric NOT NULL DEFAULT 0,
  start_date    date NOT NULL,
  end_date      date,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- goal_logs 테이블: 목표 달성 기록
CREATE TABLE IF NOT EXISTS public.goal_logs (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id    uuid NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  value      numeric NOT NULL,
  note       text,
  logged_at  timestamptz NOT NULL DEFAULT now()
);

-- events 테이블: 가족 이벤트 일정
CREATE TABLE IF NOT EXISTS public.events (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title      text NOT NULL,
  event_date date NOT NULL,
  category   text NOT NULL DEFAULT 'etc',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- Row Level Security 활성화
-- =============================================

ALTER TABLE public.users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routine_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events       ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS 정책: 본인 데이터만 접근 허용
-- =============================================

-- users
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_delete_own" ON public.users FOR DELETE USING (auth.uid() = id);

-- routines
CREATE POLICY "routines_select_own" ON public.routines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "routines_insert_own" ON public.routines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "routines_update_own" ON public.routines FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "routines_delete_own" ON public.routines FOR DELETE USING (auth.uid() = user_id);

-- routine_logs
CREATE POLICY "routine_logs_select_own" ON public.routine_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "routine_logs_insert_own" ON public.routine_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "routine_logs_update_own" ON public.routine_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "routine_logs_delete_own" ON public.routine_logs FOR DELETE USING (auth.uid() = user_id);

-- goals
CREATE POLICY "goals_select_own" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "goals_insert_own" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "goals_update_own" ON public.goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "goals_delete_own" ON public.goals FOR DELETE USING (auth.uid() = user_id);

-- goal_logs
CREATE POLICY "goal_logs_select_own" ON public.goal_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "goal_logs_insert_own" ON public.goal_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "goal_logs_update_own" ON public.goal_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "goal_logs_delete_own" ON public.goal_logs FOR DELETE USING (auth.uid() = user_id);

-- events
CREATE POLICY "events_select_own" ON public.events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "events_insert_own" ON public.events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "events_update_own" ON public.events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "events_delete_own" ON public.events FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- 신규 회원가입 시 users 테이블 자동 생성 트리거
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
