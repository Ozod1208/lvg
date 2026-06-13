import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServer() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVER_KEY!,
    {
      cookies: {
        getAll() {
          // 2. Endi cookieStore aniq mavjud bo'ladi
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component ichida set qilish taqiqlangan bo'lsa, xatoni o'tkazib yuboramiz
          }
        },
      },
    }
  )
}
