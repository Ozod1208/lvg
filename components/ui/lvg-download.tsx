import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function DownloadSection() {
  return (
    <Button asChild variant="default" className="rounded-xl gap-2 font-mono">
      <a href="/lvg.exe" download="lvg.exe">
        <Download className="h-4 w-4" />
        CLI Dasturini Yuklab Olish
      </a>
    </Button>
  )
}