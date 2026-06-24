'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4">
      <div className="p-4 bg-red-50 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900">Xatolik yuz berdi</h2>
      
      <p className="max-w-md text-gray-600">
        Kechirasiz, sahifani yuklashda muammo yuzaga keldi. Iltimos, qaytadan urinib ko'ring yoki keyinroq qayting.
      </p>

      <div className="flex gap-3 pt-4">
        <Link href={'/'}>
          <Button variant="outline">
              Bosh sahifaga
          </Button>
        </Link>
        <Button 
          onClick={() => router.refresh()}
        >
          Qayta urinish
        </Button>
      </div>
    </div>
  );
}