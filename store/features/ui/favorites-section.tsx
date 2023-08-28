import Link from 'next/link'
import React from 'react'

export const FavoritesSection = () => {
  return (
    <section className='sm:py-32 sm:px-6 py-24 px-4 max-w-7xl container'>
      <div className="sm:flex sm:justify-between sm:items-baseline">
        <h2 className="text-gray-900 tracking-tight font-bold text-2xl">
          Our Favorites
        </h2>

        <Link className='sm:block text-green-500 font-semibold text-sm hidden hover:text-green-400' href="/products">
          Browse all plants
          <span> →</span>
        </Link>
      </div>

      <div className="grid mt-6 sm:grid-cols-3 sm:gap-y-0 gap-y-10 sm:gap-x-6">
        <Link href="/products/1" className="relative group">
          <div className="sm:h-auto sm:relative group-hover:opacity-75">
            <img
              className='object-cover object-center rounded-md aspect-square'
              src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
            />
            <h3 className="font-semibold text-base mt-4 line-clamp-2">Black Basic Tee</h3>
            <p className="text-gray-500 mt-1">$32.00</p>
          </div>
        </Link>

      </div>
      <Link className='mt-6 block text-green-500 font-semibold text-sm sm:hidden hover:text-green-400' href="/products">
        Browse all plants
        <span> →</span>
      </Link>
    </section>
  )
}
