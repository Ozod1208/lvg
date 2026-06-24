import { Metadata } from "next";
import { DownloadPageClient } from "./client";

export const metadata: Metadata = {
  title: 'CLI ni yuklash',
  description: 'Kompyuteringizga CLI ni yuklab qulay foydalaning'
}

export default async function DownloadPage() {
  return (
    <DownloadPageClient />
  )
}