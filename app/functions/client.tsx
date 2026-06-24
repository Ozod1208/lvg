"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { FeaturedCard } from '@/components/ui/func'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, LayoutGrid, Flame, TrendingUp, Sparkles, Dices, Layers } from 'lucide-react'
import { type LeanFunction, type Category } from '@/types'

export function FunctionsPageClient({ functions, categories }: { functions: LeanFunction[], categories: Category[] }) {

  // Yagona holat: tanlangan element (kategoriya yoki filtr)
  const [activeTab, setActiveTab] = useState<string>("all")

  // Filtr mantiqi
  const filteredFunctions = useMemo(() => {
    let list = [...functions]

    // Agar kategoriya tanlangan bo'lsa
    if (activeTab !== "all" && !['top', 'trending', 'new', 'random'].includes(activeTab)) {
      list = list.filter(f => f.categories?.includes(activeTab))
    }

    // Agar filtr tugmalari tanlangan bo'lsa
    switch (activeTab) {
      case 'top': return list.sort((a, b) => b.use_count - a.use_count)
      case 'trending': return list.sort((a, b) => b.likes_count - a.likes_count)
      case 'new': return list.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      case 'random': return [...list].sort(() => Math.random() - 0.5)
      default: return list
    }
  }, [functions, activeTab])

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black flex items-center gap-2 mb-2">
          <Code2 className="text-primary" /> Funksiyalar
        </h1>
        <p className="text-muted-foreground text-sm">Har xil dasturlash tillaridagi funksiyalardan foydalaning</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Yagona boshqaruv paneli */}
        <div className="overflow-x-auto pb-4 border-b border-muted">
          <TabsList className="flex bg-transparent gap-2 h-auto justify-start p-0">
            {/* Asosiy filtrlar */}
            {[
              { id: 'all', label: 'Barchasi', icon: LayoutGrid },
              { id: 'top', label: 'Top', icon: Flame },
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'new', label: 'Yangi', icon: Sparkles },
              { id: 'random', label: 'Random', icon: Dices },
            ].map(item => (
              <TabsTrigger key={item.id} value={item.id}>
                <item.icon size={14} className="mr-2" /> {item.label}
              </TabsTrigger>
            ))}
            
            {/* Kategoriyalar */}
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.name}>
                #{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Natijalar */}
        <div className="mt-8 space-y-4">
          {filteredFunctions.length > 0 ? (
            filteredFunctions.map((item) => <FeaturedCard key={item.id} func={item} badgeType="new" />)
          ) : (
            <div className="text-center py-16 text-muted-foreground text-sm border rounded-2xl border-dashed">
              <Layers className="mx-auto mb-2 opacity-50" />
              Natija topilmadi.
            </div>
          )}
        </div>
      </Tabs>
    </div>
  )
}