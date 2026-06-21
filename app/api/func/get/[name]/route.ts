import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> } 
) {
  try {
    const giveLike = async (name: string) => {
      await supabase.rpc('increment_like', { func_name: name })
    }

    const supabase = await createServer()

    const { name } = await params

    if (!name) {
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! [name]" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('func')
      .select('*')
      .eq('name', name)
      .maybeSingle()
    
    if (error) {
      return NextResponse.json(
        { error: "Serverda xatolik yuz berdi: " + error.message },
        { status: 500 }
      );
    }

    await giveLike(name)

    return NextResponse.json(
      { message: `${name} nomli funksiya topildi`, data },
      { status: 200 }
    );
  
  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}