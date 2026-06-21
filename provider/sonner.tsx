"use client"

import { Toaster } from "sonner"

export function SonnerProvider() {
  return (
    <Toaster 
      position="top-right" // Toast qayerda chiqishi (top-left, bottom-right va h.k.)
      richColors          // Muvaffaqiyatli yoki xato toastlarni rangli qilish
      closeButton         // Yopish tugmachasini ko'rsatish
    />
  )
}