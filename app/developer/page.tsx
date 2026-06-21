"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createClient } from '@/utils/client' // SDK klientingiz
import { Send, Loader2 } from "lucide-react"
import Logo from '@/components/ui/logo'

export default function DeveloperRequestPage() {
  const supabase = createClient() // SDKni to'g'ridan-to'g'ri chaqiramiz

  const [name, setName] = useState('')
  const [forFound, setForFound] = useState('')
  const [dataContent, setDataContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !forFound || !dataContent) {
      toast.error("Barcha maydonlarni to'ldirish shart!")
      return
    }

    try {
      setLoading(true)

      const { error } = await supabase
        .from('requests')
        .insert([
          { 
            name: name, 
            for_found: forFound, 
            data: dataContent 
          }
        ])

      if (error) {
        throw new Error(error.message)
      }

      toast.success("So'rovingiz muvaffaqiyatli saqlandi!")
      
      // Formani tozalash
      setName('')
      setForFound('')
      setDataContent('')
    } catch (error: any) {
      toast.error(`SDK xatoligi: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-16 animate-in fade-in duration-300">
      <Card className="border border-muted/80 bg-gradient-to-b from-background to-muted/15 shadow-md rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/40" />
        
        <CardHeader className="space-y-1.5 pt-8 text-center">
          <div className='flex flex-col items-center'>
            <Logo />
          </div>
          <CardTitle className="text-xl font-bold font-mono tracking-tight">Adminlik uchun so'rov</CardTitle>
          <CardDescription className="text-xs max-w-sm mx-auto">
            Aniq ma'lumot kiriting, shunda biz sizga ishonamiz va xabar beramiz
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-muted-foreground">Ismingiz</label>
              <Input 
                placeholder="Ismingizni kiriting" 
                className="rounded-xl bg-background/50 focus-visible:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* For Found */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-muted-foreground">Sizni qanday topamiz?</label>
              <Input 
                placeholder="Masalan: tg: @username" 
                className="rounded-xl bg-background/50 focus-visible:ring-primary text-sm"
                value={forFound}
                onChange={(e) => setForFound(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Data */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-muted-foreground">Maqsadingiz va ma'lumot</label>
              <Textarea 
                placeholder="Nima maqsadda admin bo'lmoqchisiz..." 
                className="rounded-xl bg-background/50 min-h-[120px] resize-none focus-visible:ring-primary text-sm leading-relaxed"
                value={dataContent}
                onChange={(e) => setDataContent(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full h-10 gap-1.5 rounded-xl font-semibold text-xs font-mono transition-all active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Yozilmoqda...
                </>
              ) : (
                <>
                  YUBORISH
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}