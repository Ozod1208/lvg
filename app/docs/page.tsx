import { Metadata } from "next";
import { DocsPageClient } from "./client";

export const metadata: Metadata = {
  title: 'Hujjatlar',
  description: 'Tushunmagan narsangizni topib, tushunib oling'
}

export default async function DocsPage() {
  return (
    <DocsPageClient />
  )
}