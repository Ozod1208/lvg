import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">LVG Hujjatlari</h1>
          <p className="mt-3 text-muted-foreground">
            LVG platformasidan foydalanish bo&apos;yicha to&apos;liq qo&apos;llanma.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">LVG nima?</h2>
          <p>
            LVG — dasturchilar uchun tayyor funksiyalar va algoritmlar
            kutubxonasi. Platforma orqali funksiyalarni qidirish,
            o&apos;rganish va loyihalaringizda ishlatishingiz mumkin.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">CLI ni to&apos;g&apos;ri yuklash va konfiguratsiya qilish</h2>
          <code className="block rounded-lg border p-3">
          # Faylni 'lvg' deb nomini o'zgartiramiz <br /> <br />
          mv lvg-linux lvg       # Linux uchun <br />
          mv lvg-macos lvg       # macOS uchun <br />
          ren lvg-win.exe lvg.exe     # Windows uchun <br /> <br />
          # Bajarilish huquqini beramiz <br />
          chmod +x lvg <br />
          <br />
          # Dasturni ishga tushirish <br />
          ./lvg <br />
          </code>  <br />
          <h2 className="text-xl font-semibold">
            Windows uchun konfiguratsiya qilish shart emas!
          </h2> <br />
        </section>

        <section>
          <h2 className="text-2xl font-bold">CLI dan foydalanish</h2>
          <code className="block rounded-lg border p-3">
          ╔═══════════════════════════════════════════╗ <br />
          ║        🛸 LVG ECOSYSTEM MAIN MENU          ║ <br />
          ╚═══════════════════════════════════════════╝ <br />
          ? Bajariladigan amalni tanlang: <br />
          🟩     Funksiyalar ro'yxatini ko'rish va yuklash <br />
            🎯  Nom orqali to'g'ridan-to'g'ri yuklab olish <br />
            ⚙️   Dasturni tizim PATH-ga qo'shish (Global CLI) <br />
            ❌  Chiqish <br />
          </code>  <br />
          <h2 className="text-xl font-semibold">
            Bizda 3 ta menyu bor:
          </h2> <br />
          <h2 className="text-xl font-semibold">
            Birinchisi - platformadagi barcha funksiyalarni ko'rsatadi va ularni tanlab yuklab olishingiz mumkun.
          </h2> 
          <code className="block rounded-lg border p-3">
            Funksiyalar ro'yxatini ko'rish va yuklash <br />
          </code> <br />
          <h2 className="text-xl font-semibold">
            Ikinchisi - agar siz funksiyani nomini bilsangiz, qidirib o'tirmasdan yuklab olishingiz mumkun.
          </h2>
          <code className="block rounded-lg border p-3">
          🎯  Nom orqali to'g'ridan-to'g'ri yuklab olish <br />
          </code> <br />
          <h2 className="text-xl font-semibold">
            Uchinchisi - agar dasturni har qanday papkadan foydalanmoqchi bo'lsangiz, pathga qo'sish kerak, buni esa dasturni o'zi qiladi.
          </h2> 
          <code className="block rounded-lg border p-3">
          🎯  Nom orqali to'g'ridan-to'g'ri yuklab olish <br />
          </code>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            Funksiyalarni qidirish
          </h2>

          <p>
            Barcha funksiyalar katalogini quyidagi sahifa orqali
            ko&apos;rishingiz mumkin:
          </p>

          <code className="block rounded-lg border p-3">
            /functions
          </code>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            Funksiya sahifasi
          </h2>

          <p>
            Har bir funksiya uchun alohida sahifa mavjud:
          </p>

          <code className="block rounded-lg border p-3">
            /func/[name]
          </code>

          <ul className="list-disc pl-6">
            <li>To&apos;liq kod</li>
            <li>Tavsif</li>
            <li>Murakkablik (Complexity)</li>
            <li>Misollar</li>
            <li>Like va View statistikasi</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            Murakkablik turlari
          </h2>

          <div className="rounded-lg border p-4">
            <ul className="space-y-2">
              <li>O(1) — Constant</li>
              <li>O(log n) — Logarithmic</li>
              <li>O(n) — Linear</li>
              <li>O(n log n) — Linearithmic</li>
              <li>O(n²) — Quadratic</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">API</h2>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Barcha funksiyalar</h3>

            <pre className="mt-2 overflow-auto">
              {`GET /api/func/list`}
            </pre>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium">
              Bitta funksiya
            </h3>

            <pre className="mt-2 overflow-auto">
              {`GET /api/func/get/[name]`}
            </pre>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            Developer bo&apos;lish
          </h2>

          <p>
            Platformaga yangi funksiyalar qo&apos;shish uchun
            developer arizasi yuborishingiz mumkin.
          </p>

          <Link
            href="/developer"
            className="underline"
          >
            /developer
          </Link>
        </section>
      </div>
    </main>
  );
}