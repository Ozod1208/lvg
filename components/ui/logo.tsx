"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2.5 select-none">
      {/* Logotipning Vizual Belgisi (Icon) */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border bg-background shadow-sm transition-all duration-300">
        
        {/* Orqa fondagi nozik neon nur */}
        <div className="absolute inset-0 rounded-xl bg-linear-to-tr from-primary/10 to-transparent opacity-0 transition-opacity duration-300" />
        
        {/* Markaziy kod/tunnel ikonasi */}
        <Image 
          src={'/logo.png'}
          width={50}
          height={50}
          alt="Picture of the author"
          className='rounded-full'
        />
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