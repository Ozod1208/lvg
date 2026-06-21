"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Code2, 
  Terminal, 
  Bot, 
  Globe, 
  ShieldCheck, 
  Check
} from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('pip install lvg');
    setCopied(true);
    
    // 2 soniyadan keyin ikonkani yana eski holiga qaytaramiz
    setTimeout(() => setCopied(false), 2000);
  };

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

          {/* CLI Widget */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl border bg-muted/50 font-mono text-sm backdrop-blur-sm transition-all hover:border-primary/50">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground">pip install lvg</span>
              <Button 
                 onClick={handleCopy} 
                 variant="outline" 
                 size="icon" 
                 className="h-6 w-6 ml-2"
                 disabled={copied}
               >
                 {copied ? (
                   <Check className="h-3 w-3" /> // Nusxalansa tasdiq belgisi chiqadi
                 ) : (
                   <Code2 className="h-3 w-3" />
                 )}
               </Button>
            </div>
            <Button size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
              <Link href={'/functions'}>
                Funksiyalarni ko'rish
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}