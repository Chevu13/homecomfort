import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Ruler, Wallet, MapPin, Star, Home, Palette, Boxes, Layers } from 'lucide-react'
import { getFeaturedProducts, getCategories } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export const revalidate = 60

const WHATSAPP = 'https://wa.me/381628599179'

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const CATEGORY_DESC: Record<string, string> = {
  'ugaone-garniture': 'Udobne ugaone garniture za dnevni boravak, uz mogućnost izrade po meri.',
  'bracni-kreveti': 'Bračni kreveti čvrste konstrukcije, u više dimenzija i boja.',
  'tapacirnirane-stolice': 'Tapacirane trpezarijske stolice u raznim bojama i materijalima.',
  'trpezarijske-stolice': 'Tapacirane trpezarijske stolice u raznim bojama i materijalima.',
}

export default async function ShopHomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ])

  const testimonials = [
    { name: 'Ana Kovačević', city: 'Beograd', text: 'Garnitura je stigla tačno kao na slici. Dostava brza, momci je i montirali. Preporučujem svima!', stars: 5 },
    { name: 'Marko Đorđević', city: 'Kragujevac', text: 'Bračni krevet iznad očekivanja — solidna konstrukcija i lep dizajn. Odnos cena-kvalitet odličan.', stars: 5 },
    { name: 'Jelena Stanković', city: 'Novi Sad', text: 'Ugaona savršeno stoji u sobi, boja tačno kao sa slike. Plaćanje pouzećem mi je puno značilo.', stars: 5 },
  ]

  const benefits = [
    { icon: Ruler, title: 'Izrada po meri', desc: 'Dimenzije, boja i materijal po vašoj želji' },
    { icon: Wallet, title: 'Plaćanje pouzećem', desc: 'Plaćate tek pri isporuci, bez rizika' },
    { icon: MapPin, title: 'Dostava širom Srbije', desc: 'Isporuka na vašu adresu, 3–7 radnih dana' },
    { icon: Truck, title: 'Besplatna dostava', desc: 'Za sve porudžbine preko 30.000 RSD' },
  ]

  return (
    <div className="bg-linen-50">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1800&q=90"
          alt="Nameštaj za vaš dom — Home Comfort"
          fill priority unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso-900/85 via-espresso-900/55 to-espresso-900/20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[5px] uppercase text-sand-300 mb-6">Salon nameštaja · Beograd</p>
            <h1 style={{fontFamily:'Playfair Display,Georgia,serif'}}
              className="text-4xl sm:text-5xl xl:text-6xl font-medium text-white leading-[1.12] mb-6">
              Nameštaj koji se<br />uklapa u <span className="italic text-sand-300">vaš dom</span>
            </h1>
            <p className="text-linen-200/90 text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
              Ugaone garniture, bračni kreveti i trpezarijske stolice — uz mogućnost izrade po meri,
              dostavu širom Srbije i plaćanje pouzećem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-espresso-900 px-8 py-4 text-sm font-semibold tracking-wide hover:bg-linen-100 transition-colors duration-300">
                Pogledaj proizvode <ArrowRight size={16} />
              </Link>
              <a href={`${WHATSAPP}?text=Zdravo%21%20Imam%20upit%20za%20nameštaj.`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors duration-300">
                <WhatsAppIcon size={16} /> Pošalji upit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFIT TRAKA ── */}
      <section className="bg-espresso-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-espresso-800">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-espresso-900 px-5 py-7 flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-sand-500/40 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-sand-300" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">{title}</p>
                <p className="text-sand-400 text-xs leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KATEGORIJE ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[10px] tracking-[4px] uppercase text-sand-400 mb-3">Asortiman</p>
              <h2 style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-4xl md:text-5xl font-medium text-espresso-900">
                Naše kategorije
              </h2>
            </div>
            <Link href="/shop/products" className="inline-flex items-center gap-2 text-sm text-espresso-600 hover:text-espresso-900 transition-colors self-start sm:self-auto">
              Svi proizvodi <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="group flex flex-col bg-white border border-sand-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-linen-100">
                  {cat.image_url ? (
                    <Image src={cat.image_url} alt={cat.name} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linen-200">
                      <Home size={34} className="text-sand-300" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-xl font-medium text-espresso-900 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-espresso-600 text-sm leading-relaxed mb-5 flex-1">
                    {CATEGORY_DESC[cat.slug] || cat.description || 'Pogledajte našu kolekciju u ovoj kategoriji.'}
                  </p>
                  <Link href={`/shop/products?category=${cat.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-espresso-900 group-hover:text-sand-500 transition-colors">
                    Pogledaj kolekciju <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAMEŠTAJ PO MERI ── */}
      <section className="bg-espresso-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1 lg:order-none">
            <Image
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=85"
              alt="Nameštaj po meri"
              fill className="object-cover" unoptimized
            />
            <div className="absolute bottom-0 right-0 bg-sand-400 px-6 py-5">
              <p style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-3xl font-medium text-espresso-900 leading-none">100%</p>
              <p className="text-[10px] tracking-[3px] uppercase text-espresso-800 mt-1">po vašoj meri</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[4px] uppercase text-sand-400 mb-3">Ekskluzivna usluga</p>
            <h2 style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-4xl md:text-5xl font-medium text-white leading-tight mb-5">
              Nameštaj rađen<br /><span className="italic text-sand-300">po vašoj meri</span>
            </h2>
            <p className="text-linen-200/80 text-sm leading-relaxed mb-8 max-w-md">
              Svaki dom je drugačiji. Zato vam dajemo da sami izaberete sve — a mi izrađujemo tačno
              onako kako želite.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-9 max-w-md">
              {[
                { icon: Ruler, t: 'Dimenzije' },
                { icon: Palette, t: 'Boja' },
                { icon: Layers, t: 'Materijal' },
                { icon: Home, t: 'Stil' },
                { icon: Boxes, t: 'Konfiguracija' },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <Icon size={18} className="text-sand-300 shrink-0" />
                  <span className="text-linen-200 text-sm">{t}</span>
                </div>
              ))}
            </div>
            <a href={`${WHATSAPP}?text=Zdravo%21%20Želim%20nameštaj%20po%20meri.%20Moje%20dimenzije%20i%20želje%20su%3A`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-espresso-900 px-8 py-4 text-sm font-semibold tracking-wide hover:bg-linen-100 transition-colors">
              <WhatsAppIcon size={16} /> Pošaljite dimenzije i dobićete ponudu
            </a>
          </div>
        </div>
      </section>

      {/* ── IZDVOJENI PROIZVODI ── */}
      {featured.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[4px] uppercase text-sand-400 mb-3">Izdvajamo</p>
              <h2 style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-4xl md:text-5xl font-medium text-espresso-900">
                Popularni proizvodi
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => {
                const img = product.images?.[0]?.url
                return (
                  <Link key={product.id} href={`/shop/products/${product.slug}`} className="group flex flex-col">
                    <div className="relative overflow-hidden bg-linen-100 rounded-xl border border-sand-200 mb-4">
                      <div className="aspect-square relative overflow-hidden">
                        {img ? (
                          <Image src={img} alt={product.name} fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized />
                        ) : (
                          <div className="absolute inset-0 bg-linen-200 flex items-center justify-center">
                            <Home size={32} className="text-sand-300" />
                          </div>
                        )}
                      </div>
                      {product.availability === 'on_order' && (
                        <div className="absolute top-3 left-3 bg-espresso-900 text-white text-[9px] tracking-[2px] uppercase px-2.5 py-1 rounded">
                          Po meri
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] tracking-[2px] uppercase text-sand-400 mb-1">{product.category?.name}</p>
                    <h3 style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-lg font-medium text-espresso-900 mb-1 group-hover:text-sand-500 transition-colors duration-200">{product.name}</h3>
                    <p className="text-espresso-700 font-semibold text-sm mt-auto">{formatPrice(product.price)}</p>
                  </Link>
                )
              })}
            </div>
            <div className="text-center mt-12">
              <Link href="/shop/products"
                className="inline-flex items-center gap-2 border border-espresso-900 text-espresso-900 px-10 py-3.5 text-sm font-semibold tracking-wide hover:bg-espresso-900 hover:text-white transition-all duration-300">
                Pogledaj sve proizvode <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── UTISCI KUPACA ── */}
      <section className="bg-linen-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[4px] uppercase text-sand-400 mb-3">Utisci kupaca</p>
            <h2 style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-4xl md:text-5xl font-medium text-espresso-900">
              Šta kažu naši kupci
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-8 rounded-2xl border-t-2 border-sand-400 shadow-sm">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({length:t.stars}).map((_,i) => <Star key={i} size={14} fill="#b8925c" stroke="none" />)}
                </div>
                <p className="text-espresso-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p style={{fontFamily:'Playfair Display,Georgia,serif'}} className="text-espresso-900 font-medium text-lg">{t.name}</p>
                  <p className="text-sand-400 text-xs tracking-wide">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
