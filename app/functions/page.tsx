"use client"

import React, { useState, useEffect } from 'react'
import { FeaturedCard } from '@/components/ui/func'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from '@/utils/client'
import { Loader2, Code2, Layers } from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface LeanPythonFunction {
  id: string
  name: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  categories: string[]
  likes_count: number
  views_count: number
  use_count: number
  time_complexity: string
  space_complexity: string
  version: string
}

export default function FunctionsPage() {
  const [functions, setFunctions] = useState<LeanPythonFunction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // 1. 'categories' jadvalidan barcha global kategoriyalarni olamiz
        const { data: catsData, error: catsError } = await supabase
          .from('categories')
          .select('id, name')
          .order('name', { ascending: true })

        // 2. 'func' jadvalidan hamma yengil funksiyalarni olamiz
        const { data: funcsData, error: funcsError } = await supabase
          .from('func')
          .select('id, name, title, description, difficulty, categories, likes_count, views_count, use_count, time_complexity, space_complexity, version')
          .order('use_count', { ascending: false })

        if (!catsError && catsData) setCategories(catsData)
        if (!funcsError && funcsData) setFunctions(funcsData as LeanPythonFunction[])

      } catch (err) {
        console.error("Ma'lumot yuklashda xatolik:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="font-medium">Kategoriyalar va funksiyalar yuklanmoqda...</span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-8">
      
      {/* Sarlavha paneli */}
      <div className="space-y-1.5">
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
          <Code2 className="h-7 w-7 text-primary" />
          Kodlar ombori
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Kategoriyalar bo'yicha ajratilgan, loyihangiz uchun tayyor va tejamkor Python funksiyalari ekotizimi.
        </p>
      </div>

      {/* SHADCN TABS TIZIMI */}
      {/* Default holatda 'all' ya'ni hamma funksiyalar ochiladi */}
      <Tabs defaultValue="all" className="w-full space-y-6">
        
        {/* 1. DINAMIK TABS LIST (Gorizontal vkladkalar paneli) */}
        <div className="w-full overflow-x-auto pb-2 select-none scrollbar-none border-b border-muted">
          <TabsList className="inline-flex h-11 items-center justify-start rounded-xl bg-muted p-1 text-muted-foreground">
            
            {/* Barchasi vkladkasi doim birinchi turadi */}
            <TabsTrigger 
              value="all"
              className="rounded-lg px-4 py-2 text-xs font-bold capitalize tracking-wide transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5"
            >
              Barchasi
              <span>
                {functions.length}
              </span>
            </TabsTrigger>

            {/* Bazadan kelgan har bitta kategoriyani tab sifatida chiqarish */}
            {categories.map((cat) => {
              // Shu kategoriyaga tegishli nechta kod borligini hisoblash (Badge uchun)
              const count = functions.filter(f => f.categories?.includes(cat.name)).length

              return (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.name}
                  className="rounded-lg px-4 py-2 text-xs font-semibold capitalize tracking-wide transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5"
                >
                  #{cat.name}
                  {count > 0 && (
                    <span className="bg-muted-foreground/10 text-muted-foreground px-1.5 py-0.5 rounded-md text-[10px]">
                      {count}
                    </span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {/* 2. TABS CONTENT - Barchasi (All) uchun kontent */}
        <TabsContent value="all" className="outline-none space-y-4">
          {functions.length > 0 ? (
            <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
              {functions.map((item) => (
                <FeaturedCard 
                  key={item.id} 
                  func={{ ...item, code: "", for_run: "", created_at: "" }} 
                  badgeType={item.use_count > 100 ? "trending" : "new"} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-2xl border-dashed text-muted-foreground text-sm">
              Hozircha hech qanday funksiya qo'shilmagan.
            </div>
          )}
        </TabsContent>

        {/* 3. TABS CONTENT - Har bir alohida kategoriya uchun filtr */}
        {categories.map((cat) => {
          // Faqat massivida shu kategoriya nomi bor funksiyalarni ajratamiz
          const filteredItems = functions.filter(f => f.categories?.includes(cat.name))

          return (
            <TabsContent key={cat.id} value={cat.name} className="outline-none space-y-4">
              {filteredItems.length > 0 ? (
                <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {filteredItems.map((item) => (
                    <FeaturedCard 
                      key={item.id} 
                      func={{ ...item, code: "", for_run: "", created_at: "" }} 
                      badgeType={item.use_count > 100 ? "trending" : "new"} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 border rounded-2xl border-dashed text-muted-foreground text-sm gap-2">
                  <Layers className="h-5 w-5 opacity-40" />
                  <span>#{cat.name} ruknida hozircha kodlar mavjud emas.</span>
                </div>
              )}
            </TabsContent>
          )
        })}

      </Tabs>
    </div>
  )
}