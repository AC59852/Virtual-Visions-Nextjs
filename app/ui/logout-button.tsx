import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function logout() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  )
}