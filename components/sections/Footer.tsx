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
    <footer className="bg-[#111b2d] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-4">
              <p className="font-[family:var(--font-brand-accent)] text-[10px] font-semibold uppercase tracking-[0.42em] text-[#e4edf9]">
                National Pride
              </p>
              <h3 className="font-[family:var(--font-display)] text-4xl font-semibold uppercase leading-[0.96] tracking-[0.08em] text-transparent [background-image:linear-gradient(112deg,#ffe8b8_6%,#f2c563_42%,#d9a33f_74%,#ffe7b7_98%)] bg-clip-text">
                Travels
              </h3>
              <p className="mt-1 font-[family:var(--font-brand-accent)] text-[10px] font-medium uppercase tracking-[0.27em] text-cyan-100/90">
                Time To Travel With Us
              </p>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              National Pride Tour and Travel is a registered concern with the Directorate of
              Tourism, Government of Jammu and Kashmir, India.
            </p>
            <p className="text-xs text-cyan-100/85 mb-6">
              Department of Tourism Reg No: JKAE00005259
              <br />
              GSTN: 01AOZPH8135A1Z4A
            </p>

            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                  aria-label={label}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-[family:var(--font-brand-accent)] text-lg font-semibold uppercase tracking-[0.18em] text-amber-100">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/packages" className="hover:text-white transition">Kashmir Packages</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/packages?type=family" className="hover:text-white transition">Family Trips</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-[family:var(--font-brand-accent)] text-lg font-semibold uppercase tracking-[0.18em] text-amber-100">
              Popular Destinations
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/destinations/srinagar" className="hover:text-white transition">Srinagar</Link></li>
              <li><Link href="/destinations/gulmarg" className="hover:text-white transition">Gulmarg</Link></li>
              <li><Link href="/destinations/pahalgam" className="hover:text-white transition">Pahalgam</Link></li>
              <li><Link href="/destinations/sonmarg" className="hover:text-white transition">Sonmarg</Link></li>
              <li><Link href="/destinations/gurez" className="hover:text-white transition">Gurez Valley</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-[family:var(--font-brand-accent)] text-lg font-semibold uppercase tracking-[0.18em] text-amber-100">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-yellow-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-white">Office Address</p>
                  <p>MACHOWA BAGHI MEHTAB</p>
                  <p>SRINAGAR, JAMMU AND KASHMIR, INDIA</p>
                  <p>190015</p>
                  <a
                    href="https://maps.google.com/?q=MACHOWA+BAGHI+MEHTAB+SRINAGAR+JAMMU+AND+KASHMIR+INDIA+190015"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-cyan-200 hover:text-cyan-100"
                  >
                    Open Location <FiExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="text-yellow-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-white">Call Us</p>
                  <a href="tel:+919906469903" className="hover:text-white">
                    +91-9906469903
                  </a>
                  <p className="mt-1 flex items-center gap-2">
                    <FiMessageCircle size={14} />
                    <a
                      href="#whatsapp-chat"
                      className="hover:text-white"
                    >
                      WhatsApp Chatbot
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="text-yellow-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-white">Email Us</p>
                  <a href="mailto:info@nationalpridetravels.com" className="hover:text-white">
                    info@nationalpridetravels.com
                  </a>
                  <br />
                  <a
                    href="mailto:nationalpridetravels@gmail.com"
                    className="hover:text-white"
                  >
                    nationalpridetravels@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="text-yellow-400 mt-1" size={16} />
                <div>
                  <p className="font-semibold text-white">Open Time</p>
                  <p>Mon - Sun (9:00 AM - 7:00 PM)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2026 National Pride Travels. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/cancellation-policy" className="hover:text-white transition">Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
