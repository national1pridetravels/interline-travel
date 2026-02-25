import type { Metadata } from 'next'
import Link from 'next/link'
import { FiAward, FiExternalLink, FiMapPin, FiMessageCircle, FiPhoneCall } from 'react-icons/fi'
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'About Kashmir Travel Agency',
  description:
    'About National Pride Tour and Travel, a registered Kashmir tour and travel agency with Department of Tourism registration and GST compliance.',
  keywords: [
    'about national pride travels',
    'kashmir tour and travel agency',
    'tour operator in srinagar',
    'JKAE00005259',
    'kashmir travel company registration',
  ],
  alternates: {
    canonical: '/about',
  },
}

const achievements = [
  {
    title: 'Trusted by Travelers',
    value: '5,000+',
    description: 'Happy guests supported across Kashmir tour plans.',
  },
  {
    title: 'Season-Wise Packages',
    value: '28+',
    description: 'Curated options for winter, spring, summer, and autumn.',
  },
  {
    title: 'Destination Coverage',
    value: '20+',
    description: 'Popular Kashmir destinations mapped with local guidance.',
  },
  {
    title: 'Support Availability',
    value: '24/7',
    description: 'Phone and WhatsApp assistance before and during travel.',
  },
]

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#133f61_0%,#0a2944_42%,#081d31_100%)] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 rounded-3xl border border-white/25 bg-white/10 p-8 shadow-[0_24px_52px_rgba(2,12,26,0.44)] backdrop-blur-xl md:p-12">
          <p className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
            About National Pride Travels
          </p>
          <h1 className="mb-4 text-4xl font-semibold text-white md:text-5xl">
            Registered Kashmir Tour Company with Full Local Support
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-slate-100/90">
            National Pride Tour and Travel is a duly registered travel concern with the Directorate
            of Tourism, Government of Jammu and Kashmir, India. We deliver well-planned Kashmir
            journeys with transparent guidance, reliable operations, and 24/7 guest support.
          </p>
        </header>

        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/25 bg-white/10 p-7 shadow-[0_24px_52px_rgba(2,12,26,0.4)] backdrop-blur-xl">
            <h2 className="mb-5 text-2xl font-semibold text-white">Registration and Tax Details</h2>
            <div className="space-y-4 text-slate-100">
              <p>
                <span className="font-semibold text-white">Entity:</span> National Pride Tour
                and Travel
              </p>
              <p>
                <span className="font-semibold text-white">Department of Tourism Reg No:</span>{' '}
                JKAE00005259
              </p>
              <p>
                <span className="font-semibold text-white">GSTN:</span> 01AOZPH8135A1Z4A
              </p>
              <p>
                <span className="font-semibold text-white">Registered Authority:</span>{' '}
                Directorate of Tourism, Government of Jammu and Kashmir, India
              </p>
            </div>
          </article>

          <article className="rounded-3xl border border-white/25 bg-white/10 p-7 shadow-[0_24px_52px_rgba(2,12,26,0.4)] backdrop-blur-xl">
            <h2 className="mb-5 text-2xl font-semibold text-white">24/7 Contact and Location</h2>
            <div className="space-y-4 text-slate-100">
              <p className="flex items-center gap-3">
                <FiPhoneCall className="text-emerald-600" />
                <a href="tel:+919906469903" className="font-semibold text-white hover:text-emerald-200">
                  +91-9906469903
                </a>
              </p>
              <p className="flex items-center gap-3">
                <FiMessageCircle className="text-emerald-600" />
                <a
                  href="#whatsapp-chat"
                  className="font-semibold text-white hover:text-emerald-200"
                >
                  WhatsApp Chatbot
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a href="mailto:info@nationalpridetravels.com" className="hover:text-emerald-200">
                  info@nationalpridetravels.com
                </a>
                {' · '}
                <a href="mailto:nationalpridetravels@gmail.com" className="hover:text-emerald-200">
                  nationalpridetravels@gmail.com
                </a>
              </p>
              <p className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-emerald-600" />
                <span>
                  MACHOWA BAGHI MEHTAB, SRINAGAR, JAMMU AND KASHMIR, INDIA - 190015
                </span>
              </p>
              <a
                href="https://maps.google.com/?q=MACHOWA+BAGHI+MEHTAB+SRINAGAR+JAMMU+AND+KASHMIR+INDIA+190015"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100"
              >
                Open Location
                <FiExternalLink />
              </a>
            </div>
          </article>
        </section>

        <section className="mb-10 rounded-3xl border border-white/25 bg-white/10 p-7 shadow-[0_24px_52px_rgba(2,12,26,0.4)] backdrop-blur-xl md:p-10">
          <h2 className="mb-6 text-3xl font-semibold text-white">Our Achievements</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {achievements.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/25 bg-white/10 p-5 shadow-[0_18px_30px_rgba(2,12,26,0.35)]"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <FiAward size={18} />
                </div>
                <p className="text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200/90">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/25 bg-white/10 p-7 shadow-[0_24px_52px_rgba(2,12,26,0.4)] backdrop-blur-xl md:p-10">
          <h2 className="mb-4 text-3xl font-semibold text-white">Connect With National Pride Travels</h2>
          <p className="mb-6 max-w-4xl text-slate-200/90">
            Follow us on social channels, connect on WhatsApp, and check our Google profile for
            location and latest updates.
          </p>

          <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/70 hover:bg-emerald-500/20"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon />
                  {label}
                </span>
                <FiExternalLink />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/packages"
              className="inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white transition hover:from-emerald-600 hover:to-teal-700"
            >
              Explore Packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/35 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
