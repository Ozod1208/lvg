import { FuncPageClient } from "./client";
import { Metadata } from 'next';
import { createClient } from "@/utils/client";

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  const supabase = createClient()

  // Ma'lumot bazasidan ma'lumotni olamiz
  const { data } = await supabase
    .from('func')
    .select('name, description')
    .eq('name', name)
    .single()

  return {
    title: data?.name,
    description: data?.description,
  };
}

export default async function FuncPage({ params }: Props) {
  const { name } = await params;

  const supabase = createClient()

  const { data } = await supabase
    .from('func')
    .select('*')
    .eq('name', name)
    .single()

  return (
    <FuncPageClient name={name} defaultt={data} />
  )
}