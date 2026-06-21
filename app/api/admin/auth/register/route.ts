// app/api/admin/auth/register/route.ts
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
        private_password
      }, 
      admin_user,
      admin_password,
    } = body;

    if (privatePasswordReal !== private_password) {
      return NextResponse.json(
        { error: "Tizim huquqi yo'q" },
        { status: 400 }
      );
    }

    if (!admin_user || !admin_password) {
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! (admin_user, admin_password)" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('name', admin_user)
      .maybeSingle()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data) {
      return NextResponse.json(
        { error: "Bu ismli admin allaqachon mavjud" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(admin_password, 10)

    const { data: dat, error: erro } = await supabase
      .from('admins')
      .insert([{
        name: admin_user, password: hashedPassword
      }])
      .select()

    if (erro) {
      return NextResponse.json({ error: erro.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Muvaffaqiyatli admin yaratilindi!', data: dat[0] },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}