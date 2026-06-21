"use client"

import { createClient } from '@/utils/client';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Loader2, ArrowLeft, Terminal, Copy, Check, 
  Heart, Eye, Download, Cpu, Clock, Calendar, Box 
} from "lucide-react"
import Link from "next/link"

export default function FuncPage() {
  const supabase = createClient()
  const params = useParams()
  const name = params?.name as string

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false)
  const [isForRunCopied, setIsForRunCopied] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  // 1. Ma'lumotni tortish funksiyasi
  const fetchFunc = async (funcName: string) => {
    try {
      const { data, error } = await supabase
        .from('func')
        .select('*')
        .eq('name', funcName)
        .maybeSingle()
      
      if (error) {
        toast.error(`Supabase xatoligi: ${error.message}`)
        return null
      }
      return data
    } catch (err: any) {
      toast.error(`Kutilmagan xato: ${err.message}`)
      return null
    }
  }

  // 2. Ko'rishlar sonini oshirish (Security Definer RPC)
  const incrementViews = async (funcName: string) => {
    try {
      await supabase.rpc('increment_view', { func_name: funcName })
    } catch (err) {
      toast.error(`Metrikani oshirishda xato: ${err}`, {
        description: 'System error'
      })
    }
  }

  // 3. Ishlatish (Nusxa olish) sonini oshirish RPC
  const incrementUse = async (funcName: string) => {
    try {
      await supabase.rpc('increment_use', { func_name: funcName })
    } catch (err) {
      toast.error(`Metrikani oshirishda xato: ${err}`, {
        description: 'System error'
      })
    }
  }

  const incrementLike = async (funcName: string) => {
    try {
      await supabase.rpc('increment_like', { func_name: funcName })
      setIsLiked(!isLiked)
    } catch (err) {
      toast.error(`Metrikani oshirishda xato: ${err}`, {
        description: 'System error'
      })
    }
  }

  useEffect(() => {
    if (!name) {
      setLoading(false)
      return
    }

    const loadData = async () => {
      setLoading(true) 
      const res = await fetchFunc(name)
      setData(res)
      setLoading(false)

      if (res) {
        await incrementViews(name)
      }
    }

    loadData()
  }, [name, supabase])

  const formatUzDate = (dateString: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    
    // O'zbek tili formati (20-iyun, 2026-yil formatida chiqaradi)
    return new Intl.DateTimeFormat('en-EN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  // Koddan nusxa olish handler
  const handleCodeCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setIsCodeCopied(true)
    toast.success("Kod buferga ko'chirildi!")
    await incrementUse(name)
    
    // UI statistikasini lokal yangilab qo'yamiz
    setData((prev: any) => prev ? { ...prev, use_count: prev.use_count + 1 } : prev)
    
    setTimeout(() => setIsCodeCopied(false), 2000)
  }

  const handleForRunCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setIsForRunCopied(true)
    toast.success("Kod buferga ko'chirildi!")
    
    setTimeout(() => setIsForRunCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="font-medium font-mono">Ma&apos;lumotlar yuklanmoqda...</span>
      </div>
    )
  }

  if (!name || !data) {
    return notFound()
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy": return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
      case "medium": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      case "hard": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Orqaga qaytish paneli */}
      <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
        <Link href="/functions">
          <ArrowLeft className="h-4 w-4" /> Orqaga qaytish
        </Link>
      </Button>

      {/* 2. Sarlavha bloki va Metrikalar */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b pb-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={`font-semibold uppercase text-[10px] ${getDifficultyColor(data.difficulty)}`}>
              {data.difficulty}
            </Badge>
            <Badge variant="outline" className="font-mono text-[10px] bg-muted/50">
              {data.language} - {data.version}
            </Badge>
            {data.categories?.map((cat: string, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-[10px] font-mono">
                #{cat}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-mono text-foreground flex items-center gap-2">
            <span className="text-primary/40 select-none">&gt;_</span>
            {data.name}
          </h1>
          <p className="text-muted-foreground font-semibold text-sm md:text-base">
            {data.title}
          </p>
        </div>

        {/* Tezkor Statistika vidjetlari */}
        <div className="flex items-center gap-3 bg-muted/40 p-1.5 rounded-xl border self-start md:self-auto font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-1 px-3 py-1.5" title="Ko'rishlar soni">
            <Eye className="h-4 w-4 text-sky-500" />
            <span className="text-foreground font-bold">{data.views_count}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1 px-3 py-1.5" title="Ishlatilgan / Nusxa olingan">
            <Download className="h-4 w-4 text-primary" />
            <span className="text-foreground font-bold">{data.use_count}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-auto p-1.5 px-3 rounded-lg flex items-center gap-1 transition-colors ${isLiked ? 'text-rose-500 bg-rose-500/10' : 'hover:text-rose-500'}`}
            onClick={() => incrementLike(name)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-bold text-foreground">{data.likes_count + (isLiked ? 1 : 0)}</span>
          </Button>
        </div>
      </div>

      {/* 3. Algoritmik murakkabliklar kartochkalari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-background to-muted/20 border-muted/80">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Vaqt murakkabligi</p>
              <p className="text-base font-mono font-bold text-foreground">{data.time_complexity}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background to-muted/20 border-muted/80">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Xotira murakkabligi</p>
              <p className="text-base font-mono font-bold text-foreground">{data.space_complexity}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background to-muted/20 border-muted/80 sm:col-span-2 md:col-span-1">
          <CardContent className="p-4 flex items-center gap-3.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Yaratilingan sana</p>
              <p className="text-sm font-semibold text-foreground">
                {formatUzDate(data.created_at)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Asosiy bo'lim: Kod va Ko'rsatmalar */}
      <div className="space-y-4">
        <Tabs defaultValue="source" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-muted rounded-xl p-1">
            <TabsTrigger value="source" className="rounded-lg text-xs font-semibold gap-1.5">
              <Terminal className="h-3.5 w-3.5" /> Asosiy kod
            </TabsTrigger>
            <TabsTrigger value="execution" className="rounded-lg text-xs font-semibold gap-1.5">
              <Box className="h-3.5 w-3.5" /> Test uchun
            </TabsTrigger>
          </TabsList>

          {/* Source Code paneli */}
          <TabsContent value="source" className="mt-4 outline-none">
            <div className="relative group rounded-2xl overflow-hidden border bg-zinc-950 dark:bg-zinc-900/40">
              {/* Kod paneli sarlavhasi */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono text-xs select-none">
                <span>{data.name}.{data.file_end}</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleCodeCopy(data.code)}
                  className="h-7 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-1 px-2.5 rounded-lg"
                >
                  {isCodeCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {isCodeCopied ? "Nusxalandi" : "Nusxa olish"}
                </Button>
              </div>
              {/* Kod matni */}
              <pre className="p-5 font-mono text-sm overflow-x-auto text-emerald-400 leading-relaxed scrollbar-none">
                <code>{data.code}</code>
              </pre>
            </div>
          </TabsContent>

          {/* Run test paneli */}
          <TabsContent value="execution" className="mt-4 outline-none">
          <div className="relative group rounded-2xl overflow-hidden border bg-zinc-950 dark:bg-zinc-900/40">
              {/* Kod paneli sarlavhasi */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono text-xs select-none">
                <span>Funksiyani ishlatish namunasi</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleForRunCopy(data.for_run)}
                  className="h-7 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-1 px-2.5 rounded-lg"
                >
                  {isForRunCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {isForRunCopied ? "Nusxalandi" : "Nusxa olish"}
                </Button>
              </div>
              {/* Kod matni */}
              <pre className="p-5 font-mono text-sm overflow-x-auto text-emerald-400 leading-relaxed scrollbar-none">
                <code>{data.for_run}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 5. Tavsif (Description) bo'limi */}
      <div className="space-y-2 border-t pt-6">
        <h2 className="text-lg font-bold text-foreground">Batafsil tavsif</h2>
        <div className="bg-muted/20 border border-dashed rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
          {data.description || "Ushbu utilit kodga qo'shimcha izoh qoldirilmagan."}
        </div>
      </div>

    </div>
  )
}