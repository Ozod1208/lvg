import { createClient } from "@/utils/client";
import { Metadata } from "next";
import { FunctionsPageClient } from "./client";
import { type LeanFunction, type Category } from '@/types'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Funksiyalar',
  description: 'Funksiayalarimizga baho bering va keraklaridan foydalaning'
}

export default async function FunctionsPage() {

  const supabase = createClient()

  const { data: functions, error: errorr } = await supabase.from('func').select('*').order('use_count', { ascending: false })
  const { data: categories, error } = await supabase.from('categories').select('id, name').order('name', { ascending: true })

  return (
    <FunctionsPageClient functions={functions as LeanFunction[]} categories={categories as Category[]} />
  )
}