import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export const metadata = {
  title: 'Kontakt — Home Comfort Nameštaj',
  description: 'Kontaktirajte Home Comfort — pošaljite upit, sliku ili dimenzije nameštaja koji želite.',
}

const WHATSAPP = 'https://wa.me/381628599179'
const INSTAGRAM_URL = 'https://www.instagram.com/homecomfort_namestaj/'

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-linen-50 pt-[72px]">
      {/* Header */}
      <div className="bg-espresso-900 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sand-400/70 mb-3">
            <Link href="/shop" className="hover:text-sand-200 transition-colors">Početna</Link>
            <span>/</span><span className="text-sand-200">Kontakt</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-4xl md:text-5xl font-medium text-white mb-3">
            Kontaktirajte nas
          </h1>
          <p className="text-sand-300 text-sm max-w-xl">
            Pošaljite nam upit, sliku ili dimenzije nameštaja koji želite — pripremićemo vam ponudu bez obaveze.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Kontakt info */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-2xl font-medium text-espresso-900 mb-6">
              Direktan kontakt
            </h2>
            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linen-100 border border-sand-200 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-sand-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-sand-400 mb-0.5">Telefon</p>
                  <a href="tel:+381628599179" className="text-espresso-800 hover:text-espresso-900">+381 62 859 9179</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linen-100 border border-sand-200 flex items-center justify-center shrink-0 text-sand-500">
                  <WhatsAppIcon size={16} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-sand-400 mb-0.5">WhatsApp</p>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-espresso-800 hover:text-espresso-900">Pošaljite poruku</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linen-100 border border-sand-200 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-sand-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-sand-400 mb-0.5">Email</p>
                  <a href="mailto:info@homecomfort.rs" className="text-espresso-800 hover:text-espresso-900">info@homecomfort.rs</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linen-100 border border-sand-200 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-sand-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-sand-400 mb-0.5">Lokacija</p>
                  <span className="text-espresso-800">Beograd, Srbija</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linen-100 border border-sand-200 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-sand-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-sand-400 mb-0.5">Radno vreme</p>
                  <span className="text-espresso-800">Pon–Sub: 09–18h</span>
                </div>
              </li>
            </ul>

            <div className="bg-linen-100 border border-sand-200 rounded-xl p-5">
              <p className="text-sm text-espresso-700 leading-relaxed">
                <span className="font-semibold">Imate ideju?</span> Pošaljite nam sliku, skicu ili dimenzije
                nameštaja koji želite — pripremićemo ponudu za izradu po meri.
              </p>
              <a href={`${WHATSAPP}?text=Zdravo%21%20Šaljem%20vam%20ideju%2Fdimenzije%20za%20nameštaj%3A`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 bg-espresso-900 text-white px-6 py-3 text-sm font-semibold hover:bg-espresso-700 transition-colors rounded">
                <WhatsAppIcon size={15} /> Pošalji preko WhatsApp-a
              </a>
            </div>
          </div>

          {/* Kontakt forma */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-2xl font-medium text-espresso-900 mb-6">
              Pošaljite upit
            </h2>
            <form action={`${WHATSAPP}`} method="get" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-1.5">Ime i prezime</label>
                <input type="text" required placeholder="Vaše ime"
                  className="w-full px-4 py-3 border border-sand-200 rounded-lg text-sm focus:outline-none focus:border-espresso-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-1.5">Telefon</label>
                <input type="tel" required placeholder="+381 6x xxx xxxx"
                  className="w-full px-4 py-3 border border-sand-200 rounded-lg text-sm focus:outline-none focus:border-espresso-900 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-700 mb-1.5">Poruka / dimenzije / želje</label>
                <textarea required rows={5} placeholder="Opišite šta vas zanima — proizvod, dimenzije, boja, materijal..."
                  className="w-full px-4 py-3 border border-sand-200 rounded-lg text-sm focus:outline-none focus:border-espresso-900 bg-white resize-none" />
              </div>
              <button type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-espresso-900 text-white px-6 py-3.5 text-sm font-semibold hover:bg-espresso-700 transition-colors rounded-lg">
                <Send size={15} /> Pošalji upit
              </button>
              <p className="text-xs text-espresso-400 text-center">
                Za najbrži odgovor preporučujemo kontakt putem telefona ili WhatsApp-a.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
