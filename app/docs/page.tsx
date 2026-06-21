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