'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'
import { Category } from '@/types'
import { usePathname } from 'next/navigation'

function HomeComfortLogo() {
  return (
    <Link href="/shop" className="flex items-center gap-3 shrink-0">
      <img
        src="/logo.jpg"
        alt="Home Comfort"
        className="w-11 h-11 object-cover rounded border border-sand-300"
      />
      <div className="flex flex-col leading-none">
        <span
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          className="text-xl font-medium tracking-tight text-espresso-900"
        >
          Home Comfort
        </span>
        <span className="text-[8px] tracking-[4px] uppercase text-sand-500 mt-0.5">
          Nameštaj
        </span>
      </div>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen]       = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const dropdownRef                 = useRef<HTMLDivElement>(null)
  const totalItems                  = useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const pathname                    = usePathname()

  const isHomepage = pathname === '/shop' || pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCategories(data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setCatOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // Navbar je UVEK solidan i vidljiv (split hero ima krem levu stranu pa
  // transparentan navbar sa belim tekstom postaje nevidljiv).
  const bgClass   = 'bg-linen-50/95 backdrop-blur-sm border-b border-sand-200 shadow-[0_1px_16px_rgba(92,26,26,0.06)]'
  const linkColor = 'text-espresso-700 hover:text-sand-500'
  const iconColor = 'text-espresso-900'

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', bgClass)}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">

        <HomeComfortLogo />

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/shop/products" className={cn('text-sm tracking-wide transition-colors duration-200', linkColor)}>
            Svi proizvodi
          </Link>

          {categories.length > 0 && (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className={cn('flex items-center gap-1.5 text-sm tracking-wide transition-colors duration-200', linkColor)}
              >
                Kategorije
                <ChevronDown size={14} className={cn('transition-transform duration-300', catOpen && 'rotate-180')} />
              </button>

              {catOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.13)] z-50 min-w-[200px]">
                  <div className="h-0.5 bg-espresso-900 w-full" />
                  <div className="py-2">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/shop/products?category=${cat.slug}`}
                        onClick={() => setCatOpen(false)}
                        className="block px-5 py-2.5 text-sm text-espresso-700 hover:bg-linen-100 hover:text-sand-500 transition-colors whitespace-nowrap"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-linen-200 px-5 py-2.5 bg-linen-100">
                    <Link href="/shop/products" onClick={() => setCatOpen(false)}
                      className="text-[11px] text-espresso-600 hover:text-espresso-900 font-medium">
                      Svi proizvodi →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          <Link href="/shop/o-nama" className={cn('text-sm tracking-wide transition-colors duration-200', linkColor)}>
            O nama
          </Link>
          <Link href="/shop/kontakt" className={cn('text-sm tracking-wide transition-colors duration-200', linkColor)}>
            Kontakt
          </Link>
        </div>

        {/* Cart + hamburger */}
        <div className="flex items-center gap-4">
          <Link href="/shop/cart" className="relative group">
            <ShoppingCart size={22} className={cn('transition-colors duration-200 group-hover:text-sand-500', iconColor)} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-sand-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} className={iconColor} /> : <Menu size={22} className={iconColor} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-sand-200 px-6 py-5 flex flex-col">
          <Link href="/shop/products" className="text-espresso-700 text-base py-3 border-b border-sand-100 font-medium" onClick={() => setMobileOpen(false)}>
            Svi proizvodi
          </Link>
          <Link href="/shop/o-nama" className="text-espresso-700 text-base py-3 border-b border-sand-100 font-medium" onClick={() => setMobileOpen(false)}>
            O nama
          </Link>
          <Link href="/shop/kontakt" className="text-espresso-700 text-base py-3 border-b border-sand-100 font-medium" onClick={() => setMobileOpen(false)}>
            Kontakt
          </Link>
          {categories.map(cat => (
            <Link key={cat.id} href={`/shop/products?category=${cat.slug}`}
              className="text-espresso-600 text-sm py-3 border-b border-sand-100 pl-4"
              onClick={() => setMobileOpen(false)}>
              — {cat.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
