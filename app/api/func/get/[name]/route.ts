// app/api/func/get/[name]/route.ts
import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> } 
) {
  try {
    const { name } = await params;

    if (!name) {
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! [name]" },
        { status: 400 }
      );
    }

    // Supabase mijozini funksiyadan tepada yaratamiz
    const supabase = await createServer();

    const increment_used = async (func_name: string) => {
      await supabase.rpc('increment_use', { func_name });
    };

    // 1. Avval funksiyani bazadan qidiramiz
    const { data, error } = await supabase
      .from('func')
      .select('*')
      .eq('name', name)
      .maybeSingle();
    
    if (error) {
      return NextResponse.json(
        { error: "Serverda xatolik yuz berdi: " + error.message },
        { status: 500 }
      );
    }

    // 2. MANTIQIY TEKSHIRUV: Agar ma'lumot topilmasa, 404 qaytaramiz
    if (!data) {
      return NextResponse.json(
        { error: `${name} nomli funksiya topilmadi` },
        { status: 404 }
      );
    }

    // 3. Faqat ma'lumot aniq topilgandagina hisoblagichni oshiramiz
    await increment_used(name);

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