// app/api/func/list/route.ts
import { NextResponse } from 'next/server';
import { createServer } from '@/utils/server';

export async function GET() {
  try {

    const supabase = await createServer()
    
    const { data, error } = await supabase
      .from('func')
      .select('name, title, language')
    
    if (error) {
      return NextResponse.json(
        { error: "Serverda xatolik yuz berdi: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `Jami ${data.length} ta funksiya bor`, data },
      { status: 200 }
    );
  
  } catch (err: any) {
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi: " + err.message },
      { status: 500 }
    );
  }
}