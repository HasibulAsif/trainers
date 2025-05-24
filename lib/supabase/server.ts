import { createClient as supabaseCreateClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const createClient = () => {
  const cookieStore = cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return supabaseCreateClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookies().set({ name, value, ...options })
        } catch (e) {
          console.warn("Failed to set cookie in server client:", e)
        }
      },
      remove(name: string, options: any) {
        try {
          cookies().delete({ name, ...options })
        } catch (e) {
          console.warn("Failed to remove cookie in server client:", e)
        }
      },
    },
  })
}
