// app/api/functions/edit/route.ts
import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const supabase = await createServer();

    // 1. Kelayotgan JSON ma'lumotlarni qabul qilamiz
    const body = await request.json();
    
    const {
      auth: { adminUser, adminPassword }, 
      nameSelected, // Qidirilayotgan eski funksiya nomi
      edit          // Yangilanadigan maydonlar obyekti (name, title, categories, etc.)
    } = body;

    // Admin avtorizatsiyasini tekshirish
    if (!adminUser || !adminPassword) {
      return NextResponse.json({ error: "Admin huquqi yo'q" }, { status: 400 });
    }

    const { data: hashedPassword } = await supabase
      .from('admins')
      .select('password')
      .eq('name', adminUser)
      .single();

    if (!hashedPassword) {
      return NextResponse.json({ error: "Admin topilmadi" }, { status: 404 });
    }
  
    const isMatch = await bcrypt.compare(adminPassword, hashedPassword.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Admin parol xato" }, { status: 400 });
    }

    // 2. Eng muhim tekshirishlar (Validation)
    if (!nameSelected || !edit || typeof edit !== 'object') {                      
      return NextResponse.json(
        { error: "Majburiy maydonlar to'ldirilmadi! (nameSelected va edit obyekti kerak)" },
        { status: 400 }
      );
    }

    // 3. Kategoriyalarni optimallashgan variantda tekshirish va qo'shish
    if (edit.categories && Array.isArray(edit.categories) && edit.categories.length > 0) {
      // Barcha mavjud kategoriyalarni bitta so'rovda olamiz
      const { data: existingCats } = await supabase.from('categories').select('name');
      const existingCatNames = existingCats ? existingCats.map(c => c.name) : [];

      // `edit.categories` ichidagi, lekin bazada hali yo'q bo'lgan teglarni ajratamiz
      const newCatsToInsert = edit.categories
        .filter((cat: string) => !existingCatNames.includes(cat))
        .map((cat: string) => ({ name: cat }));

      // Agar yangi kategoriya topilsa, bitta oqimda (bulk) qo'shib qo'yamiz
      if (newCatsToInsert.length > 0) {
        await supabase.from('categories').insert(newCatsToInsert);
      }
    }

    // 4. Supabase bazasidagi funksiyani unikal 'name' orqali yangilaymiz
    const { data, error } = await supabase
      .from('func')
      .update(edit) // edit obyekti ichidagi hamma narsa (version, title, code) shundoq o'tadi
      .eq('name', nameSelected)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Yangilash uchun bunday nomli funksiya topilmadi" }, { status: 404 });
    }

    // 5. Hammasi zo'r, tahrirlangan ma'lumotni HTTP 200 (OK) bilan qaytaramiz
    return NextResponse.json(
      { message: "Funksiya muvaffaqiyatli tahrirlandi!", data: data[0] },
      { status: 200 }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}