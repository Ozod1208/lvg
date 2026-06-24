"use client"

import React from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Flame, Sparkles, Code2, Heart, Eye } from "lucide-react"
import Link from "next/link"
import { type LeanFunction } from '@/types'


interface FeaturedCardProps {
  func: LeanFunction
  badgeType?: "trending" | "new" | "top"
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ func, badgeType = "trending" }) => {
  
  // Qiyinchilik darajasi uchun ranglar
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
      case "medium": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      case "hard": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="group relative overflow-hidden border border-muted/80 hover:border-primary/40 bg-gradient-to-r from-background via-background to-muted/10 shadow-sm hover:shadow-md transition-all duration-300 w-full">
      
      {/* Ichki elementlarni eniga joylashtirish uchun flex-col md:flex-row qilamiz */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">
        
        {/* CHAP TOMON: Asosiy ma'lumotlar bloki (Kengayuvchi) */}
        <div className="flex-1 space-y-3 min-w-0">
          
          {/* Badgellar va Versiya oqimi */}
          <div className="flex flex-wrap items-center gap-2">
            {badgeType === "trending" && (
              <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-[10px] font-bold uppercase tracking-wider gap-1">
                <Flame className="h-3 w-3 fill-current" /> Trendda
              </Badge>
            )}
            {badgeType === "new" && (
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-[10px] font-bold uppercase tracking-wider gap-1">
                <Sparkles className="h-3 w-3 fill-current" /> Yangi
              </Badge>
            )}
            {badgeType === "top" && (
              <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 text-[10px] font-bold uppercase tracking-wider gap-1">
                <Code2 className="h-3 w-3" /> Top Kod
              </Badge>
            )}

            <Badge variant="outline" className={`text-[10px] font-medium uppercase ${getDifficultyColor(func.difficulty)}`}>
              {func.difficulty}
            </Badge>

            <Badge variant="outline" className="font-mono text-[10px] bg-background/60">
              {func.language} - {func.version}
            </Badge>

            {/* Algoritmik murakkablik belgilari */}
            <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded" title="Time & Space Complexity">
              {func.time_complexity} // {func.space_complexity}
            </span>
          </div>

          {/* Funksiya nomi va sarlavhasi */}
          <div className="space-y-1">
            <Link href={`/func/${func.name}`}>
              <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-primary/40 font-mono text-base font-normal select-none">&gt;_</span>
                {func.name}
              </h3>
            </Link>
            <p className="text-xs font-semibold text-muted-foreground/80">
              {func.title}
            </p>
          </div>

          {/* Tavsif (Description) */}
          <p className="text-sm text-muted-foreground line-clamp-2 md:max-w-2xl">
            {func.description}
          </p>

          {/* Kategoriyalar (String array) */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {func.categories.map((cat, idx) => (
              <Badge 
                key={idx} 
                variant="secondary" 
                className="text-[10px] font-mono font-normal"
              >
                #{cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* O'NG TOMON: Analitika va Tugma bloki */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-muted">
          
          {/* Statistika ko'rsatkichlari */}
          <div className="flex items-center md:justify-end gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1" title="Ishlatilgan soni">
              <Download className="h-3.5 w-3.5 text-primary" />
              <strong className="text-foreground font-sans font-semibold">{func.use_count}</strong>
            </span>
            <span className="flex items-center gap-1" title="Ko'rilgan soni">
              <Eye className="h-3.5 w-3.5" />
              <strong className="text-foreground font-sans font-semibold">{func.views_count}</strong>
            </span>
            <span className="flex items-center gap-1" title="Layklar">
              <Heart className="h-3.5 w-3.5 text-rose-500" />
              <strong className="text-foreground font-sans font-semibold">{func.likes_count}</strong>
            </span>
          </div>

          {/* Action Tugmasi */}
          <Button asChild size="sm" className="h-9 gap-1.5 rounded-xl text-xs font-semibold px-5 shadow-sm group/btn">
            <Link href={`/func/${func.name}`}>
              Kodni ko&apos;rish
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>

      </div>
    </Card>
  )
}