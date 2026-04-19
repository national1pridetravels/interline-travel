import type { Metadata } from 'next'
import { FiExternalLink, FiMail, FiMapPin, FiMessageCircle, FiPhoneCall } from 'react-icons/fi'
import { FaFacebookF, FaGoogle, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import ContactInquiryForm from '@/components/forms/ContactInquiryForm'

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
    <main className="page-shell-dark py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Contact National Pride Travels
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-200/90">
            Reach us anytime for Kashmir tour planning, custom itineraries, group bookings, and
            direct support before and during travel.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="page-panel-dark rounded-3xl p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">24/7 Contact Service</h2>

            <div className="space-y-5 text-slate-100">
              <div className="flex items-start gap-3">
                <FiPhoneCall className="mt-1 text-[var(--brand-gold)]" size={18} />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <a href="tel:+919906469903" className="hover:text-[var(--brand-gold-soft)]">
                    +91-9906469903
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMessageCircle className="mt-1 text-[var(--brand-gold)]" size={18} />
                <div>
                  <p className="font-semibold text-white">WhatsApp</p>
                  <a
                    href="https://wa.me/919906469903?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour."
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--brand-gold-soft)]"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="mt-1 text-[var(--brand-gold)]" size={18} />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <a href="mailto:info@nationalpridetravels.com" className="hover:text-[var(--brand-gold-soft)]">
                    info@nationalpridetravels.com
                  </a>
                  <br />
                  <a href="mailto:nationalpridetravels@gmail.com" className="hover:text-[var(--brand-gold-soft)]">
                    nationalpridetravels@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-[var(--brand-gold)]" size={18} />
                <div>
                  <p className="font-semibold text-white">Office Address</p>
                  <p>MACHOWA BAGHI MEHTAB</p>
                  <p>SRINAGAR, JAMMU AND KASHMIR, INDIA - 190015</p>
                  <a
                    href="https://maps.google.com/?q=MACHOWA+BAGHI+MEHTAB+SRINAGAR+JAMMU+AND+KASHMIR+INDIA+190015"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-gold-soft)] hover:text-white"
                  >
                    Open Location <FiExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-white/14 bg-slate-950/35 p-5 text-sm text-slate-200">
              <p className="font-semibold text-white">Registration and Tax Details</p>
              <p className="mt-2">Department of Tourism Reg No: JKAE00005259</p>
              <p>GSTN: 01AOZPH8135A1Z4A</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/18 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-gold)]/70 hover:bg-white/14"
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
                className="flex items-center justify-between rounded-2xl border border-[var(--brand-gold)]/50 bg-white/8 px-4 py-3 text-sm font-semibold text-[var(--brand-gold-soft)] transition hover:bg-white/14 sm:col-span-2"
              >
                <span className="inline-flex items-center gap-2">
                  <FaWhatsapp />
                  Open WhatsApp
                </span>
                <FiExternalLink />
              </a>
            </div>
          </section>

          <section className="page-panel-dark rounded-3xl p-8">
            <h2 className="mb-3 text-2xl font-semibold text-white">Send Your Inquiry</h2>
            <p className="mb-5 text-slate-200/90">
              This form is connected to our lead inbox at info@nationalpridetravels.com and
              nationalpridetravels@gmail.com.
            </p>
            <ContactInquiryForm />
          </section>
        </div>
      </div>
    </main>
  )
}
