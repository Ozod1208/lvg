"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoveLeft, HelpCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 text-center">
      
      {/* Orqa fondagi chiroyli va yengil gradient effekti */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />
      </div>

      {/* 404 Raqami */}
      <div className="relative mb-4 flex items-center justify-center">
        <HelpCircle className="absolute -top-12 h-12 w-12 text-muted-foreground/30 animate-bounce" />
        <h1 className="text-9xl font-extrabold tracking-tighter bg-gradient-to-b from-primary to-primary/40 bg-clip-text text-transparent select-none">
          404
        </h1>
      </div>

      {/* Matnlar qismi */}
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold tracking-tight">
          Sahifa topilmadi
        </h2>
        <p className="text-sm text-muted-foreground">
          Siz qidirayotgan funksiya, kod snippetlari yoki sahifa mavjud emas yoki boshqa manzilga ko&apos;chirilgan.
        </p>
      </div>

      {/* Navigatsiya tugmalari */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="default" size="lg" className="h-10 px-6 font-medium">
          <Link href="/" className="flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            Bosh sahifaga qaytish
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg" className="h-10 px-6 font-medium bg-transparent">
          <Link href="/docs">
            Hujjatlarni o&apos;qish
          </Link>
        </Button>
      </div>

      {/* Footer o'rnida Lvg statusi */}
      <div className="absolute bottom-6 text-xs font-mono text-muted-foreground/60">
        Lvg Platform // Developer Mode Active
      </div>
    </div>
  )
}