"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b">
        
        <div className=" container px-4 mx-auto text-center">
          <span className="text-xl">
            Lvg CLI v1.0.0 endi ochiq!
          </span>
          
          <p className="max-w-[700px] mx-auto text-lg text-muted-foreground mt-5 mb-10">
            Lvg — bu dasturchilar tomonidan dasturchilar uchun yaratilgan tayyor kod snippetlari ombori. 
            Vaqtingizni tejang, tayyor funksiyalardan foydalaning.
          </p>

          <div className="flex gap-6 justify-center items-center">
          <Button asChild variant={'outline'} className="rounded-xl gap-2 font-mono">
            <Link href="/lvg.exe" download="lvg.exe">
              <Download className="h-4 w-4" />
              CLI Dasturini Yuklab Olish 
            </Link>
          </Button>
            <Button size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
              <Link href={'/functions'}>
                Funksiyalarni ko&apos;rish
              </Link>
            </Button>
          </div>
          </div>
      </section>
    </div>
  )
}