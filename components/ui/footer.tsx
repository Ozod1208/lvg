import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="mt-auto border-t py-8 bg-muted/20">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lvg Platform. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-primary">Hujjatlar</Link>
            <Link href="/github" className="hover:text-primary">GitHub</Link>
          </div>
        </div>
      </footer>
  )
}