"use client"

import { useTheme } from "next-themes"
import NextTopLoader from "nextjs-toploader"
import { useEffect, useState } from "react"

export function TopLoaderProvider() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Hydration mismatch xatoligini oldini olish
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Oq rejimda qora (#000000), Qora rejimda esa to'q ko'k (#1e40af - Tailwind Blue 800)
  const loaderColor = resolvedTheme === "dark" ? "#ffffff" : "#000000"

  return (
    <NextTopLoader
      color={loaderColor}
      showSpinner={false}
      height={3}
      // Soya effekti (shadow) ham tanlangan rangga moslashishi uchun:
      shadow={`0 0 10px ${loaderColor}, 0 0 5px ${loaderColor}`}
    />
  )
}