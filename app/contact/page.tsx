import type { Metadata } from 'next'
import { FiExternalLink, FiMail, FiMapPin, FiMessageCircle, FiPhoneCall } from 'react-icons/fi'
import { FaFacebookF, FaGoogle, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Contact Kashmir Tour Experts',
  description:
    'Contact National Pride Travels for Kashmir tour packages, WhatsApp support, and custom travel planning from Srinagar.',
  keywords: [
    'contact kashmir travel agency',
    'kashmir tour booking contact',
    'national pride travels phone number',
    'whatsapp kashmir tour',
  ],
  alternates: {
    canonical: '/contact',
  },
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nationalpridetravels?igsh=MWRlNXJ6dGc2YmkzMw%3D%3D',
    icon: FaInstagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/National-pride-travels/61575932940744/?rdid=HCDE53Fqt4Tb5pk9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16j6yFxmq8%2F',
    icon: FaFacebookF,
  },
  {
    label: 'Google Profile',
    href: 'https://share.google/wTGk0mGec3I2toC5W',
    icon: FaGoogle,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef5f8] via-[#f8f6ee] to-[#edf6f2] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-slate-900 md:text-5xl">Contact National Pride Travels</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-700">
            Reach us anytime for Kashmir tour planning, custom itineraries, group bookings, and
            direct support before and during travel.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_18px_48px_rgba(15,35,58,0.14)]">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">24/7 Contact Service</h2>

            <div className="space-y-5 text-slate-700">
              <div className="flex items-start gap-3">
                <FiPhoneCall className="mt-1 text-emerald-600" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <a href="tel:+919906469903" className="hover:text-emerald-700">
                    +91-9906469903
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMessageCircle className="mt-1 text-emerald-600" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">WhatsApp Live Bot</p>
                  <a
                    href="https://wa.me/919906469903?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour."
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-700"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="mt-1 text-emerald-600" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <a href="mailto:info@nationalpridetravels.com" className="hover:text-emerald-700">
                    info@nationalpridetravels.com
                  </a>
                  <br />
                  <a href="mailto:nationalpridetravels@gmail.com" className="hover:text-emerald-700">
                    nationalpridetravels@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-emerald-600" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">Office Address</p>
                  <p>MACHOWA BAGHI MEHTAB</p>
                  <p>SRINAGAR, JAMMU AND KASHMIR, INDIA - 190015</p>
                  <a
                    href="https://maps.google.com/?q=MACHOWA+BAGHI+MEHTAB+SRINAGAR+JAMMU+AND+KASHMIR+INDIA+190015"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-emerald-700"
                  >
                    Open Location <FiExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_10px_30px_rgba(15,35,58,0.12)]">
            <h2 className="mb-5 text-2xl font-semibold text-slate-900">Social and Profile Links</h2>
            <p className="mb-6 text-slate-700">
              Follow us for package updates, guest stories, and destination content from Kashmir.
            </p>

            <div className="space-y-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon />
                    {label}
                  </span>
                  <FiExternalLink />
                </a>
              ))}

              <a
                href="https://wa.me/919906469903?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
              >
                <span className="inline-flex items-center gap-2">
                  <FaWhatsapp />
                  WhatsApp Live Bot
                </span>
                <FiExternalLink />
              </a>
            </div>

            <div className="mt-7 rounded-2xl bg-slate-900 p-5 text-sm text-slate-200">
              <p className="font-semibold text-white">Registration and Tax Details</p>
              <p className="mt-2">Department of Tourism Reg No: JKAE00005259</p>
              <p>GSTN: 01AOZPH8135A1Z4A</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
