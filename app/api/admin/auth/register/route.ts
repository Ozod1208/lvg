// app/api/functions/add/route.ts
import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {

    const supabase = await createServer()

    const privatePasswordReal = process.env.PRIVATE_PASSWORD as string

    // 1. Kelayotgan JSON ma'lumotlarni qabul qilamiz
    const body = await request.json();
    
    const {
      auth: {
        privatePassword
      }, 
      adminUser,
      adminPassword,
    } = body;

    if (privatePasswordReal !== privatePassword) {
      return NextResponse.json(
        { error: "Tizim huquqi yo'q" },
        { status: 400 }
      );
    }

    if (!adminUser || !adminPassword) {
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! (adminUser, adminPassword)" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('name', adminUser)
      .maybeSingle()

    if (data) {
      return NextResponse.json(
        { error: "Bu ismli admin allaqachon mavjud" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const { data: dat, error: erro } = await supabase
      .from('admins')
      .insert([{
        name: adminUser, password: hashedPassword
      }])
      .select()

    if (erro) {
      return NextResponse.json({ error: erro.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Muvaffaqiyatli yaratilindi!', data: dat[0] },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}