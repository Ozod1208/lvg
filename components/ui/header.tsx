"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Code2 } from "lucide-react"
import Link from "next/link"
import Logo from './logo'
import { ThemeToggle } from './theme-toggle'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* 1. Logo qismi */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* 2. Qidiruv inputi qismi */}
        <div className="flex-1 max-w-md mx-4 md:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Funksiyalarni qidirish..."
              className="w-full pl-9 pr-4 h-9 bg-muted/50 focus-visible:bg-background rounded-md"
            />
          </div>
        </div>

        {/* 3. Developer status qismi */}
        <div className="flex items-center gap-4">
          <Button variant={'outline'} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/40 text-xs font-medium text-muted-foreground">
            <Link href={'/functions'}>
            Funksiyalar
            </Link>
          </Button>
          <Button variant={'outline'} className="hidden sm:flex rounded-full border bg-muted/40 text-xs font-medium text-muted-foreground">
            <Link href={'/developer'} className="hidden sm:flex items-center gap-2 px-3 py-1.5">
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>Developer Mode</span>
            </Link>
          </Button>
          {/* Istasangiz qo'shimcha tugma yoki profil uchun */}
          <Button variant={'outline'} className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/40 text-xs font-medium text-muted-foreground">
            <Link href={'/docs'}>
              Docs
            </Link>
          </Button>
          <ThemeToggle />
        </div>

      </div>
    </header>
  )
}

export default Header