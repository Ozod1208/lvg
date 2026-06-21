"use client"

import React from 'react'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2.5 select-none">
      {/* Logotipning Vizual Belgisi (Icon) */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border bg-background shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_12px_rgba(var(--primary),0.15)]">
        
        {/* Orqa fondagi nozik neon nur */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Markaziy kod/tunnel ikonasi */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>

        {/* Oqim (Tunnel) nuqtasi */}
      </div>

      {/* Logotip Matni (Lvg) qismini toping va mana bundoq o'zgartiring: */}
      <div className="flex flex-col">
        <span className="text-xl font-bold ">
          Lvg
        </span>
      </div>
    </Link>
  )
}

export default Logo