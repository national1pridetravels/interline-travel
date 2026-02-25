const signals = [
  { label: 'Registered Travel Agency', value: 'JKAE00005259' },
  { label: 'GST Compliant', value: '01AOZPH8135A1Z4A' },
  { label: '24/7 WhatsApp Support', value: '+91-9906469903' },
  { label: 'Kashmir Expert Team', value: 'Srinagar Based' },
]

export default function TrustBar() {
  return (
    <section className="section-wrap py-8">
      <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_16px_40px_rgba(15,35,58,0.12)] backdrop-blur-xl md:p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {signals.map((signal) => (
            <article
              key={signal.label}
              className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 px-4 py-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {signal.label}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">{signal.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
