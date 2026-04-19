const signals = [
  { label: 'Registered Travel Agency', value: 'JKAE00005259' },
  { label: 'GST Compliant', value: '01AOZPH8135A1Z4A' },
  { label: '24/7 WhatsApp Support', value: '+91-9906469903' },
  { label: 'Kashmir Expert Team', value: 'Srinagar Based' },
]

export default function TrustBar() {
  return (
    <section className="section-space-tight bg-[radial-gradient(circle_at_top,rgba(229,34,62,0.24),transparent_28%),linear-gradient(180deg,#111827_0%,#1f2937_100%)]">
      <div className="section-wrap">
        <div className="mb-10 text-center">
          <p className="chip-3d-dark">Travel Credentials</p>
          <h2 className="section-title-light mt-5">Built on verified support and local execution</h2>
          <p className="section-copy-light mx-auto mt-4 max-w-3xl">
            Every enquiry is handled by a registered Kashmir travel team with direct destination
            planning, assistance, and response coverage.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {signals.map((signal) => (
            <article key={signal.label} className="surface-3d-dark rounded-[1.8rem] p-6 text-white">
              <p className="metric-label text-rose-100/75">{signal.label}</p>
              <p className="mt-3 text-[1.15rem] font-semibold leading-relaxed text-white">
                {signal.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
