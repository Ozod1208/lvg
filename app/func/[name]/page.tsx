"use client"

import { supabase } from '@/utils/client';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const funcPage = () => {

  const fetchFunc = async (name: string) => {
    try {
      
      const { data, error } = await supabase
        .from('func')
        .select('*')
        .eq('name', name)
        .maybeSingle()
      
      if (error) {
        return null
      }

      return data

    } catch (err: any) {
      return null
    }
  }

  const { name }: { name: string } = useParams();

  if (!name) {
    return notFound()
  }

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setData(fetchFunc(name))
    setLoading(false)
  }, [])

  if (loading) return <p>Yuklanmoqda</p>

  return (
    <div>{data}</div>
  )
}

export default funcPage