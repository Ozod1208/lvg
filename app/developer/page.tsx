import { Metadata } from "next";
import { DeveloperRequestPageClient } from "./client";

export const metadata: Metadata = {
  title: "Dasturchilar sahifasi",
  description: "Developer bo'lib saytimizga funksiyalar yuklang"
}

export default async function DeveloperRequestPage() {
  return (
    <DeveloperRequestPageClient />
  )
}