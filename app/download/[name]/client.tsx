"use client"

import { notFound, useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from 'react'
import { IoLogoAndroid } from "react-icons/io";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DownloadPageClient() {

  const modes = [
    { name: 'android', icon: IoLogoAndroid },
    { name: 'ios', icon: FaApple },
    { name: 'windows', icon: FaWindows },
    { name: 'macos', icon: FaApple },
    { name: 'linux', icon: FaLinux }
  ]

  const params = useParams()
  const name = params?.name as string
  if (!name) return notFound()

  if (!modes.find(u => u.name === name)) return notFound()

  const [activeTab, setActiveTab] = useState<string>(name)

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="overflow-x-auto pb-4 border-b border-muted">
        <TabsList className="flex flex-col sm:flex-row w-max bg-transparent gap-2 h-auto items-center justify-start p-0">
          {modes.map((item, idx) => (
            <TabsTrigger 
              key={idx} 
              value={item.name} 
              className="shrink-0"
            >
              <item.icon size={14} className="mr-2" /> 
              <span className='text-1'>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
        <div className='mt-8'>
        <TabsContent value={'android'}>
          <div className='min-w-full flex justify-center items-center gap-6'>
            <IoLogoAndroid className='hidden sm:block' size={100} />
            <span className='lg:text-xl'>
              Android uchun hali CLI mavjud emas
            </span>
          </div>
        </TabsContent>
        <TabsContent value={'ios'}>
          <div className='min-w-full flex justify-center items-center gap-6'>
            <FaApple className='hidden sm:block' size={100} />
            <span className='lg:text-xl'>
              iOS uchun hali CLI mavjud emas
            </span>
          </div>
        </TabsContent>
        <TabsContent value={'windows'}>
          <div className='min-w-full flex justify-center items-center gap-6'>
            <FaWindows className='hidden sm:block' size={100} />
            <Button variant={'outline'} className='lg:text-xl'>
              <Link href={'/lvg-win.exe'} download={'lvg-win.exe'}>
                Windows uchun CLI ni yuklab oling
              </Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value={'macos'}>
          <div className='min-w-full flex justify-center items-center gap-6'>
            <FaApple className='hidden sm:block' size={100} />
            <Button variant={'outline'} className='lg:text-xl'>
              <Link href={'/lvg-macos'} download={'lvg-macos'}>
                macOS uchun CLI ni yuklab oling
              </Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value={'linux'}>
          <div className='min-w-full flex justify-center items-center gap-6'>
            <FaLinux className='hidden sm:block' size={100} />
            <Button variant={'outline'} className='lg:text-xl'>
              <Link href={'/lvg-linux'} download={'lvg-linux'}>
                Linux uchun CLI ni yuklab oling
              </Link>
            </Button>
          </div>
        </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}