import Link from 'next/link'
import { Truck, Wallet, Clock, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Dostava i plaćanje — Home Comfort Nameštaj',
  description: 'Plaćanje pouzećem i dostava širom Srbije. Besplatna dostava za porudžbine preko 30.000 RSD.',
}

export default function DostavaPlacanjePage() {
  return (
    <div className="min-h-screen bg-linen-50 pt-[72px]">
      <div className="bg-espresso-900 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sand-400/70 mb-3">
            <Link href="/shop" className="hover:text-sand-200 transition-colors">Početna</Link>
            <span>/</span><span className="text-sand-200">Dostava i plaćanje</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-4xl md:text-5xl font-medium text-white">
            Dostava i plaćanje
          </h1>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {[
            { icon: Wallet, title: 'Plaćanje pouzećem', desc: 'Plaćate gotovinom prilikom isporuke, kada vam nameštaj stigne na adresu. Bez avansa i bez rizika.' },
            { icon: Truck, title: 'Dostava širom Srbije', desc: 'Isporučujemo na celoj teritoriji Srbije. Rok isporuke je 3–7 radnih dana za artikle sa stanja.' },
            { icon: ShieldCheck, title: 'Besplatna dostava', desc: 'Za sve porudžbine preko 30.000 RSD dostava je besplatna. Ispod tog iznosa naplaćuje se prema cenovniku kurira.' },
            { icon: Clock, title: 'Izrada po meri', desc: 'Za nameštaj rađen po meri rok izrade dogovaramo pojedinačno, u zavisnosti od modela i specifikacija.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-sand-200 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-full bg-linen-100 border border-sand-200 flex items-center justify-center mb-4">
                <Icon size={18} className="text-sand-500" />
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-xl font-medium text-espresso-900 mb-2">{title}</h3>
              <p className="text-sm text-espresso-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-linen-100 border border-sand-200 rounded-xl p-6 text-center">
          <p className="text-sm text-espresso-700 leading-relaxed">
            Online plaćanje karticom trenutno nije omogućeno. Sve porudžbine se plaćaju <span className="font-semibold">pouzećem</span> prilikom isporuke.
          </p>
          <Link href="/shop/products"
            className="inline-flex items-center gap-2 mt-5 bg-espresso-900 text-white px-7 py-3 text-sm font-semibold hover:bg-espresso-700 transition-colors rounded">
            Pogledaj proizvode
          </Link>
        </div>
      </section>
    </div>
  )
}
