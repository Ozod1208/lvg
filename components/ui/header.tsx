"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Search, Code2, Menu, BookOpen, Layers, Loader2 } from "lucide-react"
import Link from "next/link"
import Logo from './logo'
import { ThemeToggle } from './theme-toggle'
import { createClient } from '@/utils/client'

export const Header = () => {
  const supabase = createClient()
  
  // Qidiruv shtatlari
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false) 
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Tashqariga bosilganda dropdown yopilishi uchun useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Supabase'dan qidirish (Debounce effekt bilan)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setSearching(true)
      setIsOpen(true)
      
      try {
        // Name yoki Title bo'yicha qidirish (ilike - katta-kichik harfni ajratmaydi)
        const { data, error } = await supabase
          .from('func')
          .select('name, title')
          .or(`name.ilike.%${searchQuery}%,title.ilike.%${searchQuery}%`)
          .limit(5) // Max 5 ta natija yetarli

        if (!error && data) {
          setResults(data)
        }
      } catch (err) {
        console.error("Qidiruvda xato:", err)
      } finally {
        setSearching(false)
      }
    }, 300) // 300ms kutadi (Foydalanuvchi tez yozganda baza qiynalmaydi)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Natija bosilganda tozalash va yo'naltirish
  const handleSelectResult = (funcName: string) => {
    setSearchQuery('')
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 gap-4">
        
        {/* 1. Logo qismi */}
        <div className="flex items-center gap-2 shrink-0">
          <Logo />
        </div>

        {/* 2. Qidiruv inputi va Dinamik Natijalar Dropdown'i */}
        <div ref={dropdownRef} className="flex-1 max-w-md mx-2 md:mx-6 relative">
          <div className="relative w-full">
            {searching ? (
              <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              type="search"
              placeholder="Funksiyalarni qidirish..."
              className="w-full pl-9 pr-4 h-9 bg-muted/40 focus-visible:bg-background rounded-xl transition-all focus-visible:ring-1 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsOpen(true)}
            />
          </div>

          {/* Qidiruv natijalari paneli (Dropdown) */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border shadow-xl rounded-2xl overflow-hidden z-50 p-1 animate-in fade-in slide-in-from-top-1 duration-200">
              {results.length > 0 ? (
                <div className="flex flex-col gap-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    Topilgan funksiyalar
                  </div>
                  {results.map((func) => (
                    <Link href={`/func/${func.name}`}>
                    <button
                      key={func.name}
                      onClick={() => handleSelectResult(func.name)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-muted transition-colors flex flex-col gap-0.5 group"
                    >
                      <span className="text-sm font-mono font-bold text-foreground group-hover:text-primary flex items-center gap-1">
                        <span className="text-muted-foreground/40 font-normal">&gt;_</span>
                        {func.name}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {func.title}
                      </span>
                    </button>
                  </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs font-mono text-muted-foreground">
                  {searching ? "Qidirilmoqda..." : "Hech qanday funksiya topilmadi"}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Kompyuter ekranlari uchun Navigatsiya */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="rounded-xl font-medium text-muted-foreground hover:text-foreground">
            <Link href="/functions">
              Funksiyalar
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="rounded-xl font-medium text-muted-foreground hover:text-foreground">
            <Link href="/docs" className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              Docs
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="rounded-xl border bg-muted/30 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground shadow-sm">
            <Link href="/developer" className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>Developer Mode</span>
            </Link>
          </Button>
        </div>

        {/* 4. O'ng tomon (Theme va Mobil Burger) */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menyuni ochish</span>
                </Button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-[280px] sm:w-[320px] rounded-l-2xl flex flex-col pt-12">
                <SheetTitle className="text-left font-mono text-xs text-muted-foreground px-2 uppercase tracking-wider mb-2">
                  Navigatsiya paneli
                </SheetTitle>

                <div className="flex flex-col gap-2 flex-1">
                  <Button asChild variant="ghost" className="w-full justify-start gap-3 h-11 rounded-xl text-sm font-semibold">
                    <Link href="/functions">
                      <Layers className="h-4 w-4 text-primary" />
                      Funksiyalar
                    </Link>
                  </Button>

                  <Button asChild variant="ghost" className="w-full justify-start gap-3 h-11 rounded-xl text-sm font-semibold">
                    <Link href="/docs">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Hujjatlar (Docs)
                    </Link>
                  </Button>

                  <div className="border-t my-2 border-dashed" />

                  <Button asChild variant="secondary" className="w-full justify-start gap-3 h-11 rounded-xl font-mono text-xs font-bold">
                    <Link href="/developer">
                      <Code2 className="h-4 w-4 text-primary" />
                      Developer Mode
                    </Link>
                  </Button>
                </div>

                <div className="text-[10px] font-mono text-muted-foreground text-center border-t pt-4">
                  lvg ecosystem &bull; 2026
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header