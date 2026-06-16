import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Truck, Users, Heart } from 'lucide-react'

export const metadata = {
  title: 'O nama — Home Comfort Nameštaj',
  description: 'Home Comfort — salon nameštaja iz Beograda. Ugaone garniture, kreveti i stolice, uz izradu po meri.',
}

export default function ONamaPage() {
  return (
    <div className="min-h-screen bg-linen-50 pt-[72px]">

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-espresso-800">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
          alt="O nama" fill className="object-cover opacity-60" unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso-900/80 via-espresso-900/40 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pb-10">
            <div className="flex items-center gap-2 text-xs text-sand-400/70 mb-3">
              <Link href="/shop" className="hover:text-sand-200 transition-colors">Početna</Link>
              <span>/</span>
              <span className="text-sand-200">O nama</span>
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-4xl md:text-5xl font-light text-white">O nama</h1>
          </div>
        </div>
      </div>

      {/* Priča */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[4px] uppercase text-sand-500 mb-4">Naša priča</p>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-4xl md:text-5xl font-light text-espresso-900 mb-6 leading-tight">
              Nameštaj koji se pravi sa ljubavlju
            </h2>
            <div className="space-y-4 text-espresso-600 text-sm leading-relaxed">
              <p>
                Home Comfort je prodavnica nameštaja iz Beograda, fokusirana na praktična, udobna i estetska rešenja za dom. Nudimo ugaone garniture, krevete i trpezarijske stolice, uz mogućnost prilagođavanja dimenzija, materijala i boja.
              </p>
              <p>
                Radimo direktno sa kupcima — bez posrednika. To znači jasnu cenu, dogovor oko svakog detalja i nameštaj napravljen tačno onako kako vam treba.
              </p>
              <p>
                Pošaljite nam dimenzije, boju i ideju — a mi vam pripremamo ponudu i izrađujemo komad koji se savršeno uklapa u vaš prostor. Plaćanje je pouzećem, a dostavu radimo širom Srbije.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/shop/products"
                className="inline-flex items-center gap-2 bg-espresso-900 text-sand-100 px-8 py-3.5 text-sm font-medium hover:bg-espresso-700 transition-colors">
                Pogledajte kolekciju <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="Naš showroom" fill className="object-cover" unoptimized
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white p-5 shadow-lg">
              <p style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                className="text-4xl font-light text-espresso-900">10+</p>
              <p className="text-xs text-espresso-500 tracking-wide">godina iskustva</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vrednosti */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[4px] uppercase text-sand-500 mb-3">Zašto mi</p>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-4xl font-light text-espresso-900">Naše vrednosti</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award,  title: 'Kvalitet',         desc: 'Biramo samo nameštaj od premium materijala sa garancijom kvaliteta.' },
              { icon: Truck,  title: 'Besplatna dostava', desc: 'Isporuka na vašu adresu za porudžbine iznad 30.000 RSD.' },
              { icon: Users,  title: 'Lični pristup',    desc: 'Svaki kupac dobija punu pažnju i stručan savet pri odabiru.' },
              { icon: Heart,  title: 'Zadovoljstvo',     desc: 'Naš cilj je da svaki kupac bude potpuno zadovoljan svojom kupovinom.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 border border-sand-300 mx-auto mb-4 flex items-center justify-center">
                  <Icon size={20} className="text-sand-500" />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  className="text-xl font-light text-espresso-900 mb-2">{title}</h3>
                <p className="text-sm text-espresso-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-espresso-900 py-16 text-center px-6">
        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          className="text-4xl font-light text-sand-100 mb-4">
          Pronađite savršen nameštaj
        </h2>
        <p className="text-sand-400 text-sm mb-8 max-w-md mx-auto">
          Posetite našu kolekciju i pronađite nameštaj koji će vaš dom pretvoriti u prostor koji volite.
        </p>
        <Link href="/shop/products"
          className="inline-flex items-center gap-2 bg-sand-500 text-white px-8 py-3.5 text-sm font-medium hover:bg-sand-400 transition-colors">
          Pogledajte kolekciju <ArrowRight size={16} />
        </Link>
      </section>

    </div>
  )
}
