import { Metadata } from "next";
import { DocsPageClient } from "./client";

export const metadata: Metadata = {
  title: 'Hujjatlar',
  description: "CLI yoki ochiq API larimizni ko'rib oling"
}

export default async function DocsPage() {
  return (
    <DocsPageClient />
  )
}