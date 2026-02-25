'use client'

import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = (await response.json()) as { success: boolean; message?: string }
      if (!response.ok || !result.success) {
        setMessage({
          type: 'error',
          text: result.message || 'Subscription failed. Please try again.',
        })
        return
      }

      setMessage({
        type: 'success',
        text: 'Subscribed successfully. You will receive updates shortly.',
      })
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription failed:', error)
      setMessage({
        type: 'error',
        text: 'Unable to subscribe at the moment.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-4xl font-semibold text-white md:text-5xl">
          Stay Updated
        </h2>
        <p className="mb-10 text-xl leading-relaxed text-cyan-100">
          Subscribe to get special offers, travel tips, and Kashmir updates
        </p>

        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className="flex-1 rounded-full px-6 py-4 text-slate-900 placeholder:text-slate-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-white px-10 py-4 font-semibold text-cyan-700 shadow-xl transition-all duration-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p
            className={`mx-auto mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              message.type === 'success'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {message.type === 'success' ? <FiCheckCircle /> : null}
            {message.text}
          </p>
        )}
      </div>
    </section>
  )
}
