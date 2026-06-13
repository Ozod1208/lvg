// app/api/functions/add/route.ts
import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {

    const supabase = await createServer()

    const getCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
      if (error) return null
      return data
    }

    const addCategories = async (name: string) => {
      const { data, error } = await supabase
        .from('categories')
        .insert({ name })
      if (error) return null
      return data
    }

    // 1. Kelayotgan JSON ma'lumotlarni qabul qilamiz
    const body = await request.json();
    
    const {
      auth: {
        adminUser, adminPassword
      }, 
      nameSelected,
      edit
    } = body;

    if (!adminUser || !adminPassword) {
      return NextResponse.json(
        { error: "Admin huquqi yo'q" },
        { status: 400 }
      );
    }

    const { data: hashedPassword, error: errorr } = await supabase
      .from('admins')
      .select('password')
      .eq('name', adminUser)
      .single()

    if (!hashedPassword) {
      return NextResponse.json(
        { error: "Admin topilmadi" },
        { status: 404 }
      );
    }
  
    const isMatch = await bcrypt.compare(adminPassword, hashedPassword.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: "Admin parol xato" },
        { status: 400 }
      );
    }

    // 2. Eng muhim tekshirishlar (Validation)
    if (!nameSelected || !edit) {                       
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! (nameSelected, edit)" },
        { status: 400 }
      );
    }

    const categories = await getCategories()

    if (edit.category) {
      if (categories) {
        if (!categories.find(u => u.name === edit.category)) {
          await addCategories(edit.category)
        }
      }
    }

    // 4. Supabase bazasiga ma'lumotni tahrirlaymiz
    const { data, error } = await supabase
      .from('func')
      .upsert([
        {
          ...edit
        }
      ])
      .eq('name', nameSelected)
      .select(); // Tahrirlangan ma'lumotni qaytarib olish uchun

    // 5. Agar bazada xatolik bo'lsa
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 6. Hammasi muvaffaqiyatli bo'lsa, qo'shilgan ma'lumotni qaytaramiz
    return NextResponse.json(
      { message: "Funksiya muvaffaqiyatli tahrirlandi!", data: data[0] },
      { status: 201 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}