"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { FeaturedCard } from '@/components/ui/func'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from '@/utils/client'
import { Loader2, Code2, LayoutGrid, Flame, TrendingUp, Sparkles, Dices, Layers } from 'lucide-react'

// Interfeyslar
interface Category { id: string; name: string }
interface LeanPythonFunction {
  id: string
  created_at: string
  name: string
  title: string
  language: string
  code: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  categories: string[]
  likes_count: number
  views_count: number
  use_count: number
  time_complexity: string
  space_complexity: string
  for_run: string
  version: string
}

export default function FunctionsPage() {
  const [functions, setFunctions] = useState<LeanPythonFunction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  
  // Yagona holat: tanlangan element (kategoriya yoki filtr)
  const [activeTab, setActiveTab] = useState<string>("all")

  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [catsRes, funcsRes] = await Promise.all([
          supabase.from('categories').select('id, name').order('name', { ascending: true }),
          supabase.from('func').select('*').order('use_count', { ascending: false })
        ])
        if (catsRes.data) setCategories(catsRes.data)
        if (funcsRes.data) setFunctions(funcsRes.data as LeanPythonFunction[])
      } catch (err) { console.error(err) } finally { setLoading(false) }
    }
    fetchData()
  }, [supabase])

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

  if (loading) return <div className="flex h-[60vh] w-full items-center justify-center"><Loader2 className="animate-spin text-primary" />Funksiyalar yuklanmoqda</div>

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
          <TabsList className="bg-transparent gap-2 h-auto flex-wrap justify-start p-0">
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