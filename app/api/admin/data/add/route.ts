// app/api/functions/add/route.ts
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
        adminUser, adminPassword
      }, 
      name,
      title,
      categories,
      difficulty, 
      code, 
      description, 
      timeComplexity, 
      spaceComplexity,
      forRun,
      version
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
    if (!title || !name || !code || !description || !timeComplexity || !spaceComplexity || !forRun) {                       
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! (name, title, code, description, timeComplexity, spaceComplexity, forRun)" },
        { status: 400 }
      );
    }

    if (categories && Array.isArray(categories) && categories.length > 0) {
      const { data: existingCats } = await supabase.from('categories').select('name');
      const existingCatNames = existingCats ? existingCats.map(c => c.name) : [];

      const newCatsToInsert = categories
        .filter(cat => !existingCatNames.includes(cat))
        .map(cat => ({ name: cat }));

      if (newCatsToInsert.length > 0) {
        await supabase.from('categories').insert(newCatsToInsert);
      }
    }
    
    // 4. Supabase bazasiga ma'lumotni qo'shamiz
    const { data, error } = await supabase
      .from('func')
      .insert([
        {
          name,
          title,
          categories: categories || ['general'],
          difficulty: difficulty || 'easy',
          code,
          description,
          time_complexity: timeComplexity,
          space_complexity: spaceComplexity,
          for_run: forRun,
          version: version || 'all version supported',
        }
      ])
      .select(); // Qo'shilgan ma'lumotni qaytarib olish uchun

    // 5. Agar bazada xatolik bo'lsa (Masalan: bir xil slug kiritilsa)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 6. Hammasi muvaffaqiyatli bo'lsa, qo'shilgan ma'lumotni qaytaramiz
    return NextResponse.json(
      { message: "Funksiya muvaffaqiyatli qo'shildi!", data: data[0] },
      { status: 201 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}