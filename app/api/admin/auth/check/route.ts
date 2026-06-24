// app/api/admin/auth/register/route.ts
import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {

    const supabase = await createServer()

    // 1. Kelayotgan JSON ma'lumotlarni qabul qilamiz
    const body = await request.json();
    
    const {
      admin_user,
      admin_password,
    } = body;

    if (!admin_user || !admin_password) {
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! (admin_user, admin_password)", is_confirmed: false },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('name', admin_user)
      .maybeSingle()
    
    if (error) {
      return NextResponse.json({ error: error.message, is_confirmed: false }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Bunday ismli admin mavjud emas", is_confirmed: false },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(admin_password, data.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: "Admin huquqi yo'q", is_confirmed: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Admin mavaffaqiyatli sinovdan o'tdi!", is_confirmed: true },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message, is_confirmed: false },
      { status: 500 }
    );
  }
}