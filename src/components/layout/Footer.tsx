'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Category } from '@/types'

const INSTAGRAM_URL = 'https://www.instagram.com/homecomfort_namestaj/'
const FACEBOOK_URL  = 'https://www.facebook.com/p/Home-Comfort-Namestaj-61581576301402/'
const WHATSAPP_URL  = 'https://wa.me/381628599179'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCategories(data) })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-espresso-900 text-sand-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.jpg" alt="Home Comfort" className="w-12 h-12 object-cover rounded border border-sand-500/40" />
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-xl font-medium text-white leading-none">
                  Home Comfort
                </h3>
                <p className="text-[9px] tracking-[4px] uppercase text-sand-400 mt-1">Nameštaj</p>
              </div>
            </div>
            <p className="text-sand-400 text-sm leading-relaxed max-w-xs mb-6">
              Salon nameštaja iz Beograda — ugaone garniture, kreveti i stolice, uz izradu po meri i dostavu širom Srbije.
            </p>
            <div className="flex items-center gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-espresso-700 hover:border-sand-400 rounded flex items-center justify-center text-sand-400 hover:text-sand-100 transition-colors">
                <InstagramIcon size={15} />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-espresso-700 hover:border-sand-400 rounded flex items-center justify-center text-sand-400 hover:text-sand-100 transition-colors">
                <FacebookIcon size={15} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-espresso-700 hover:border-sand-400 rounded flex items-center justify-center text-sand-400 hover:text-sand-100 transition-colors">
                <WhatsAppIcon size={15} />
              </a>
            </div>
          </div>

          {/* Navigacija */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-sand-500 mb-5">Navigacija</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">Početna</Link></li>
              <li><Link href="/shop/products" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">Svi proizvodi</Link></li>
              <li><Link href="/shop/o-nama" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">O nama</Link></li>
              <li><Link href="/shop/kontakt" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">Kontakt</Link></li>
              <li><Link href="/shop/dostava-i-placanje" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">Dostava i plaćanje</Link></li>
            </ul>
          </div>

          {/* Kategorije */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-sand-500 mb-5">Kategorije</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/shop/products?category=${cat.slug}`} className="text-sm text-sand-400 hover:text-sand-100 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop/products" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">Svi proizvodi</Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-sand-500 mb-5">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-sand-500 mt-0.5 shrink-0" />
                <a href="tel:+381628599179" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">+381 62 859 9179</a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon size={14} />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">WhatsApp upit</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-sand-500 mt-0.5 shrink-0" />
                <a href="mailto:info@homecomfort.rs" className="text-sm text-sand-400 hover:text-sand-100 transition-colors">info@homecomfort.rs</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-sand-500 mt-0.5 shrink-0" />
                <span className="text-sm text-sand-400">Beograd, Srbija</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={14} className="text-sand-500 mt-0.5 shrink-0" />
                <span className="text-sm text-sand-400">Pon–Sub: 09–18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-espresso-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-sand-600">© {new Date().getFullYear()} Home Comfort Nameštaj. Sva prava zadržana.</p>
          <p className="text-xs text-sand-600">Plaćanje pouzećem · Dostava širom Srbije</p>
        </div>
      </div>
    </footer>
  )
}
