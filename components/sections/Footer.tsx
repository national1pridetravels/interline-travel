import Image from 'next/image'
import Link from 'next/link'
import { FiClock, FiExternalLink, FiMail, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaGoogle, FaInstagram } from 'react-icons/fa'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/National-pride-travels/61575932940744/?rdid=HCDE53Fqt4Tb5pk9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16j6yFxmq8%2F',
    icon: FaFacebookF,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nationalpridetravels?igsh=MWRlNXJ6dGc2YmkzMw%3D%3D',
    icon: FaInstagram,
  },
  {
    label: 'Google Profile',
    href: 'https://share.google/wTGk0mGec3I2toC5W',
    icon: FaGoogle,
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#111827] via-[#1f2937] to-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9), transparent)',
          }}
        />
      </div>

      <div className="section-wrap relative z-10 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          <div className="surface-3d-dark rounded-[1.7rem] p-5 sm:col-span-2 xl:col-span-1">
            <div className="mb-4 flex items-center gap-3 text-left">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#111827] shadow-[0_16px_30px_rgba(15,23,42,0.22)]">
                <Image
                  src="/images/logo-mark.png"
                  alt="National Pride Travels logo"
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
              </div>
              <div className="min-w-0">
                <h3 className="brand-wordmark-dark font-[family:var(--font-brand-display)] text-[1.5rem] font-semibold leading-[0.92] tracking-[0.02em] sm:text-3xl">
                National Pride Travels
                </h3>
                <p className="mt-1 font-[family:var(--font-brand-accent)] text-[9px] font-medium uppercase tracking-[0.22em] text-rose-100/90 sm:text-[10px] sm:tracking-[0.27em]">
                  Time To Travel With Us
                </p>
              </div>
            </div>
            <p className="card-copy-sm text-slate-300">
              National Pride Tour and Travel is a registered concern with the Directorate of
              Tourism, Government of Jammu and Kashmir, India.
            </p>
            <p className="mt-4 text-xs text-rose-100/85">
              Department of Tourism Reg No: JKAE00005259
              <br />
              GSTN: 01AOZPH8135A1Z4A
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/8 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/16"
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="surface-3d-dark rounded-[1.7rem] p-5">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-link-list text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white">
                  Kashmir Packages
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/packages?type=family" className="hover:text-white">
                  Family Trips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="surface-3d-dark rounded-[1.7rem] p-5">
            <h4 className="footer-heading">Popular Destinations</h4>
            <ul className="footer-link-list text-slate-300">
              <li>
                <Link href="/destinations/srinagar" className="hover:text-white">
                  Srinagar
                </Link>
              </li>
              <li>
                <Link href="/destinations/gulmarg" className="hover:text-white">
                  Gulmarg
                </Link>
              </li>
              <li>
                <Link href="/destinations/pahalgam" className="hover:text-white">
                  Pahalgam
                </Link>
              </li>
              <li>
                <Link href="/destinations/sonmarg" className="hover:text-white">
                  Sonmarg
                </Link>
              </li>
              <li>
                <Link href="/destinations/gurez" className="hover:text-white">
                  Gurez Valley
                </Link>
              </li>
            </ul>
          </div>

          <div className="surface-3d-dark rounded-[1.7rem] p-5 sm:col-span-2 xl:col-span-1">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <FiMapPin className="mt-1 text-[var(--brand-gold)]" size={16} />
                <div>
                  <p className="font-semibold text-white">Office Address</p>
                  <p>MACHOWA BAGHI MEHTAB</p>
                  <p>SRINAGAR, JAMMU AND KASHMIR, INDIA</p>
                  <p>190015</p>
                  <a
                    href="https://maps.google.com/?q=MACHOWA+BAGHI+MEHTAB+SRINAGAR+JAMMU+AND+KASHMIR+INDIA+190015"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-rose-200 hover:text-rose-100"
                  >
                    Open Location <FiExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiPhone className="mt-1 text-[var(--brand-gold)]" size={16} />
                <div>
                  <p className="font-semibold text-white">Call Us</p>
                  <a href="tel:+919906469903" className="hover:text-white">
                    +91-9906469903
                  </a>
                  <p className="mt-1 flex items-center gap-2">
                    <FiMessageCircle size={14} />
                    <a
                      href="https://wa.me/919906469903?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour."
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      Open WhatsApp
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiMail className="mt-1 text-[var(--brand-gold)]" size={16} />
                <div>
                  <p className="font-semibold text-white">Email Us</p>
                  <a href="mailto:info@nationalpridetravels.com" className="hover:text-white">
                    info@nationalpridetravels.com
                  </a>
                  <br />
                  <a href="mailto:nationalpridetravels@gmail.com" className="hover:text-white">
                    nationalpridetravels@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FiClock className="mt-1 text-[var(--brand-gold)]" size={16} />
                <div>
                  <p className="font-semibold text-white">Open Time</p>
                  <p>Mon - Sun (9:00 AM - 7:00 PM)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="surface-3d-dark mt-6 rounded-[1.7rem] px-5 py-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="card-copy-sm text-center text-slate-300 md:text-left">
              © 2026 National Pride Travels. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-sm text-slate-300">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms & Conditions
              </Link>
              <Link href="/cancellation-policy" className="hover:text-white">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
