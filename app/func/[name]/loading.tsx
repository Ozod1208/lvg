import { Loader2 } from 'lucide-react'

const LoadingPage = () => {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <Loader2 className="animate-spin text-primary" />Funksiya yuklanmoqda
    </div>
  )
}

export default LoadingPage