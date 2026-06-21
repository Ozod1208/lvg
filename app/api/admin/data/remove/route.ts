// app/api/admin/data/remove/route.ts
import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {

    const supabase = await createServer()

    // 1. Kelayotgan JSON ma'lumotlarni qabul qilamiz
    const body = await request.json();
    
    const {
      auth: {
        admin_user, admin_password
      }, 
      name_selected,
    } = body;

    if (!admin_user || !admin_password) {
      return NextResponse.json(
        { error: "Admin huquqi yo'q" },
        { status: 400 }
      );
    }

    const { data: hashedPassword, error: errorr } = await supabase
      .from('admins')
      .select('password')
      .eq('name', admin_user)
      .single()

    if (errorr) {
      return NextResponse.json({ error: errorr.message }, { status: 500 });
    }

    if (!hashedPassword) {
      return NextResponse.json(
        { error: "Admin topilmadi" },
        { status: 404 }
      );
    }
  
    const isMatch = await bcrypt.compare(admin_password, hashedPassword.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: "Admin parol xato" },
        { status: 400 }
      );
    }

    // 2. Eng muhim tekshirishlar (Validation)
    if (!name_selected) {                       
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! (name_selected)" },
        { status: 400 }
      );
    }

    // 4. Supabase bazasidan ma'lumotni o'chiramiz
    const { data, error } = await supabase
      .from('func')
      .delete()
      .eq('name', name_selected)
      .select(); // O'chirilgan ma'lumotni qaytarib olish uchun

    // 5. Agar bazada xatolik bo'lsa
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 6. Hammasi muvaffaqiyatli bo'lsa, o'chirilgan ma'lumotni qaytaramiz
    return NextResponse.json(
      { message: "Funksiya muvaffaqiyatli o'chirildi!", data: data[0] },
      { status: 201 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}