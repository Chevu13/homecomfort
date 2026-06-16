'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingCart, Check, Truck, ChevronLeft, Home } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

const availabilityMap = {
  in_stock:     { label: 'Na stanju',  color: 'text-green-700', bg: 'bg-green-50', dot: 'bg-green-500' },
  out_of_stock: { label: 'Rasprodato', color: 'text-red-700',   bg: 'bg-red-50',   dot: 'bg-red-500' },
  on_order:     { label: 'Po narudžbi',color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500' },
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImg, setSelectedImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState<'opis' | 'spec'>('opis')
  const addItem = useCartStore(s => s.addItem)

  const images = product.images || []
  const mainImg = images[selectedImg]?.url

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const avail = availabilityMap[product.availability]

  const specs = [
    product.material && ['Materijal', product.material],
    product.dimensions && ['Dimenzije', product.dimensions],
    product.color && ['Boja', product.color],
  ].filter(Boolean) as [string, string][]

  return (
    <div className="min-h-screen bg-linen-50 pt-[72px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-espresso-400 mb-10">
          <Link href="/shop" className="hover:text-espresso-900 flex items-center gap-1"><Home size={12} /> Početna</Link>
          <span>/</span>
          <Link href="/shop/products" className="hover:text-espresso-900">Proizvodi</Link>
          {product.category && (<><span>/</span>
            <Link href={`/shop/products?category=${product.category.slug}`} className="hover:text-espresso-900">{product.category.name}</Link></>
          )}
          <span>/</span>
          <span className="text-espresso-700 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">

          {/* ── IMAGES — sticky panel with strip thumbnails ── */}
          <div className="lg:sticky lg:top-[88px]">
            {/* Main image */}
            <div className="bg-linen-100 overflow-hidden mb-4">
              <div className="aspect-[4/3] relative">
                {mainImg ? (
                  <Image src={mainImg} alt={product.name} fill
                    className="object-contain p-6 transition-opacity duration-300"
                    unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home size={48} className="text-sand-300" />
                  </div>
                )}
              </div>
            </div>
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button key={img.id} onClick={() => setSelectedImg(i)}
                    className={`relative flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all duration-200 ${
                      selectedImg === i ? 'border-espresso-900' : 'border-linen-200 hover:border-sand-300 opacity-70 hover:opacity-100'
                    }`}>
                    <Image src={img.url} alt={img.alt || product.name} fill className="object-contain p-1" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── INFO ── */}
          <div className="flex flex-col">
            {/* Category + availability */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-[3px] uppercase text-sand-400">{product.category?.name}</p>
              <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 ${avail.bg} ${avail.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
                {avail.label}
              </span>
            </div>

            <h1 style={{fontFamily:'Playfair Display,Georgia,serif'}}
              className="text-4xl md:text-5xl font-medium text-espresso-900 leading-tight mb-4">
              {product.name}
            </h1>

            <p style={{fontFamily:'Playfair Display,Georgia,serif'}}
              className="text-3xl font-medium text-espresso-900 mb-8">
              {formatPrice(product.price)}
            </p>

            {/* Qty + CTA */}
            {product.availability !== 'out_of_stock' && (
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border border-sand-200 bg-white">
                    <button onClick={() => setQty(Math.max(1, qty-1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-linen-100 transition-colors text-espresso-700">
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center text-sm font-medium text-espresso-900">{qty}</span>
                    <button onClick={() => setQty(qty+1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-linen-100 transition-colors text-espresso-700">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                      added ? 'bg-green-700 text-white' : 'bg-espresso-900 text-white hover:bg-espresso-700'
                    }`}>
                    {added
                      ? <><Check size={16} /> Dodato u korpu</>
                      : <><ShoppingCart size={16} /> Dodaj u korpu</>}
                  </button>
                </div>
                <Link href="/shop/cart"
                  className="block text-center text-sm text-espresso-500 hover:text-espresso-900 underline underline-offset-4 transition-colors">
                  Pogledajte korpu →
                </Link>
              </div>
            )}

            {/* Delivery badge */}
            <div className="flex items-start gap-3 bg-linen-100 p-4 mb-8">
              <Truck size={16} className="text-sand-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-espresso-900">
                  {product.price >= 30000 ? 'Besplatna dostava' : 'Dostava: 1.500 RSD'}
                </p>
                <p className="text-xs text-espresso-500 mt-0.5">
                  {product.price >= 30000
                    ? 'Ovaj proizvod ispunjava uslov za besplatnu dostavu.'
                    : 'Besplatna dostava za porudžbine iznad 30.000 RSD.'}
                </p>
              </div>
            </div>

            {/* Tabs: Opis / Specifikacije */}
            <div>
              <div className="flex border-b border-sand-200 mb-6">
                {(['opis', 'spec'] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      tab === t
                        ? 'border-espresso-900 text-espresso-900'
                        : 'border-transparent text-espresso-500 hover:text-espresso-800'
                    }`}>
                    {t === 'opis' ? 'Opis' : 'Specifikacije'}
                  </button>
                ))}
              </div>
              {tab === 'opis' && (
                <p className="text-espresso-600 text-sm leading-relaxed">{product.description || 'Opis nije dostupan.'}</p>
              )}
              {tab === 'spec' && (
                specs.length > 0 ? (
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map(([k, v]) => (
                        <tr key={k} className="border-b border-linen-200">
                          <td className="py-3 pr-4 text-espresso-500 font-medium w-1/3">{k}</td>
                          <td className="py-3 text-espresso-800">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-espresso-400 text-sm">Specifikacije nisu dostupne.</p>
                )
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
