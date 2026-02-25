import { FaWhatsapp } from 'react-icons/fa'

const whatsappUrl =
  'https://wa.me/919906469903?text=Hello%20National%20Pride%20Travels%2C%20I%20want%20to%20plan%20a%20Kashmir%20tour.'

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Open WhatsApp live bot chat"
      className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(0,0,0,0.24)] transition hover:scale-[1.03] hover:brightness-95"
    >
      <FaWhatsapp size={20} />
      <span className="hidden sm:inline">WhatsApp Live Bot</span>
    </a>
  )
}
