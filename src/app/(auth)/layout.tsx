'use client'
import { getStorage } from '@/common/helpers/storage'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const locale = useLocale()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getStorage('token', 'local') || getStorage('token', 'session')
    if (token) {
      router.push(`/${locale}/dashboard`)
    }
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [router, locale])

  return loading ? (
    <></>
  ) : (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-no-repeat flex justify-end items-center z-10">
        <div className="md:backdrop-blur-[18px] h-full w-full md:w-1/2 flex justify-center items-center px-7">
          <div className="w-full md:w-[388px] rounded-lg p-5 bg-white shadow">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={300}
              height={81}
              className="mb-4 w-[150px] h-10"
              priority
            />
            {children}
          </div>
        </div>
      </div>
      <div className="absolute w-lvw h-lvh overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="min-h-screen min-w-[120%] object-cover"
        >
          <source src="/videos/m3-motion.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  )
}
