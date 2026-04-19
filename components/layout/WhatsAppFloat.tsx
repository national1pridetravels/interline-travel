'use client'

import { FaWhatsapp } from 'react-icons/fa'

const whatsappUrl =
  'https://wa.me/919906469903?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour.'

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] right-4 z-[70] sm:bottom-5 sm:right-5">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp chat with National Pride Travels"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_34px_rgba(0,0,0,0.28)] transition hover:scale-[1.03] hover:brightness-95 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3"
      >
        <FaWhatsapp size={22} />
        <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
      </a>
    </div>
  )
}
