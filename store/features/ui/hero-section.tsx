import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import Image from 'next/image'

export const HeroSection = () => {
  return (
    <header className="relative">
      <div className="lg:block bg-gray-100 w-1/2 h-full hidden absolute" />
      <div className="relative bg-transparent">
        <div className="lg:px-8 sm:px-6 px-4 lg:grid lg:grid-cols-2 max-w-7xl container">
          <div className="lg:py-64 lg:max-w-none py-8 max-w-2xl">
            <div className="pr-16">
              <h1 className="text-4xl sm:text-5xl text-gray-900 tracking-tight font-bold">
                Bringing nature to you, one plant at a time
              </h1>
              <p className="text-lg text-gray-500 mt-4">Shop our selection of healthy plants, shipped directly to your home. Transform your space with ease.</p>
              <div className="mt-6">
                <Button size="lg" asChild>
                  <Link href="/products">Shop plants</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative lg:h-full lg:top-0 lg:right-0 lg:absolute sm:h-64 w-full h-48">
            <Image
              src="/hero-image.png"
              alt="Hero image displaying plants"
              fill
              className="object-center object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
