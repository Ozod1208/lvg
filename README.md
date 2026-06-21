````md
# 🚀 LVG

LVG — dasturchilar uchun tayyor funksiyalar va algoritmlar kutubxonasi.

## Imkoniyatlar

- Funksiyalar katalogi
- Kategoriyalar
- Qidiruv tizimi
- Like tizimi
- View statistikasi
- Use statistikasi
- Developer arizalari
- Supabase integratsiyasi

---

## Texnologiyalar

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- React
- shadcn/ui

---

## O‘rnatish

Repositoryni klonlang:

```bash
git clone <repository-url>
```

Papkaga kiring:

```bash
cd lvg
```

Paketlarni o‘rnating:

```bash
npm install
```

Development serverni ishga tushiring:

```bash
npm run dev
```

Brauzerda oching:

```text
http://localhost:3000
```

---

## Environment Variables

`.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Loyiha Strukturasi

```text
app/
├── api/
├── docs/
├── developer/
├── functions/
├── func/[name]

components/
utils/
public/
```

---

## API

### Barcha funksiyalar

```http
GET /api/func/list
```

### Bitta funksiya

```http
GET /api/func/get/[name]
```

Misol:

```http
GET /api/func/get/binary_search
```

---

## Developer

Yangi funksiyalar qo‘shish uchun:

```text
/developer
```

sahifasi orqali ariza yuboring.

---

## Litsenziya

MIT License

---

## Muallif

LVG Team
````
