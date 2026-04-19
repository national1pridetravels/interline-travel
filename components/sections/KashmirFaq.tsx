import { kashmirFaqs } from '@/lib/faq'

export default function KashmirFaq() {
  return (
    <section className="py-20">
      <div className="section-wrap">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
            Kashmir Travel FAQs
          </p>
          <h2 className="headline-main font-semibold mb-3">
            Common Questions About Kashmir Tour and Travel
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Quick answers from our local travel team to help you plan the right Kashmir package.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {kashmirFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-[0_10px_24px_rgba(15,35,58,0.12)]"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                <span className="inline-block transition group-open:text-red-700">
                  {faq.question}
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
