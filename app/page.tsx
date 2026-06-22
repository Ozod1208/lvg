"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from 'lucide-react'

export default function HomePage() {

  function getOS() {
    const userAgent = window.navigator.userAgent;
    
    if (userAgent.indexOf("Win") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "macOS";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    return null
  }

  const [mode, setMode] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    function getOS() {
      const userAgent = window.navigator.userAgent;
      
      if (userAgent.indexOf("Android") !== -1) return "Android";
      if (userAgent.indexOf("like Mac") !== -1) return "iOS";
      if (userAgent.indexOf("Win") !== -1) return "Windows";
      if (userAgent.indexOf("Mac") !== -1) return "macOS";
      if (userAgent.indexOf("Linux") !== -1) return "Linux";
      
      return null
    }
    setMode(getOS())
    setLoading(false)
  }, [])

  if (loading) return <div className="flex h-[60vh] w-full items-center justify-center"><Loader2 className="animate-spin text-primary" />Yuklanmoqda</div>

  if (!loading && !mode) return notFound()

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden border-b">
        <div className="container px-4 mx-auto text-center">
          
          {/* Versiya belgisi */}
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full text-primary mb-4">
            Lvg CLI v1.0.0 endi ochiq!
          </span>

          {/* Sarlavha - Mobil va Desktop uchun o'lchamlar */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Dasturchilar uchun <br className="hidden md:block" /> 
            <span className="text-primary">tezkor yechimlar</span>
          </h1>
          
          <p className="max-w-[700px] mx-auto text-base md:text-lg text-muted-foreground mb-10">
            Lvg — bu dasturchilar tomonidan dasturchilar uchun yaratilgan tayyor kod snippetlari ombori. 
            Vaqtingizni tejang, tayyor funksiyalardan foydalaning.
          </p>

          {/* Tugmalar konteyneri: Mobil uchun ustun, Desktop uchun qator */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className={`${mode ? 'block' : 'hidden'}`}>
            <Button disabled={mode === 'Android' || mode === 'iOS'} asChild variant={'outline'} size="lg" className="w-full sm:w-auto rounded-xl gap-2 font-mono">
              <Link href={`/download/${mode?.toLowerCase()}`}>
                <Download className="h-4 w-4" />
                {mode !== 'Android' && mode !== 'iOS' ? `${mode} uchun CLI ni yuklang` : `${mode} uchun hali CLI mavjud emas!`}
              </Link>
            </Button>
            </div>
            
            <Button asChild size="lg" className="w-full sm:w-auto rounded-xl px-8 shadow-lg shadow-primary/20">
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