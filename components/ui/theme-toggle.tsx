"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Hydration error (miltillash) oldini olish
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/40 text-xs font-medium text-muted-foreground" />
    )
  }

  return (
    <Button      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    variant={'outline'} className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/40 text-xs font-medium text-muted-foreground"
    >
      {/* Quyosh ikonka (Light mode) */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      
      {/* Oy ikonka (Dark mode) */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}