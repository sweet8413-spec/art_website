import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !publishableKey) {
  throw new Error(
    'Supabase 환경변수가 없습니다. .env.local 에 VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY 를 설정하세요. (.env.example 참고)',
  )
}

/** 앱 전역에서 사용하는 Supabase 클라이언트 (publishable key 사용, 로그인 없음) */
export const supabase = createClient(url, publishableKey)
