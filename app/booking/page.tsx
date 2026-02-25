'use client'

import { useState } from 'react'
import { FiCheckCircle, FiLoader } from 'react-icons/fi'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'Kashmir Signature Circuit',
    travelers: 2,
    checkIn: '',
    checkOut: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = (await response.json()) as {
        success: boolean
        bookingId?: string
        message?: string
        mailed?: boolean
      }

      if (!response.ok || !result.success) {
        setFeedback({
          type: 'error',
          message: result.message || 'Could not submit your booking request.',
        })
        return
      }

      setFeedback({
        type: 'success',
        message: `Booking request saved with ID ${result.bookingId}. Our team will call you shortly.`,
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        package: 'Kashmir Signature Circuit',
        travelers: 2,
        checkIn: '',
        checkOut: '',
      })
    } catch (error) {
      console.error('Booking form failed:', error)
      setFeedback({
        type: 'error',
        message: 'Unable to submit right now. Please try again in a minute.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#133f61_0%,#0a2944_42%,#081d31_100%)] py-24 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl">
          Reserve Your Kashmir Journey
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-center text-slate-200/90">
          Submit your booking details and our travel desk will confirm the route, hotels, and
          transport plan by call and email.
        </p>

        <div className="rounded-[28px] border border-white/25 bg-white/10 p-8 shadow-[0_28px_62px_rgba(2,12,26,0.45)] backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({ ...current, name: event.target.value }))
              }
              className="w-full rounded-xl border border-white/30 bg-white/95 p-3 text-slate-900"
              required
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, email: event.target.value }))
                }
                className="w-full rounded-xl border border-white/30 bg-white/95 p-3 text-slate-900"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, phone: event.target.value }))
                }
                className="w-full rounded-xl border border-white/30 bg-white/95 p-3 text-slate-900"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select
                value={formData.package}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, package: event.target.value }))
                }
                className="w-full rounded-xl border border-white/30 bg-white/95 p-3 text-slate-900"
              >
                <option>Kashmir Signature Circuit</option>
                <option>Winter Kashmir Escape</option>
                <option>Spring Tulip Journey</option>
                <option>Summer Valley Adventure</option>
                <option>Autumn Chinar Trails</option>
              </select>

              <input
                type="number"
                min={1}
                value={formData.travelers}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    travelers: Number(event.target.value),
                  }))
                }
                className="w-full rounded-xl border border-white/30 bg-white/95 p-3 text-slate-900"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="date"
                value={formData.checkIn}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, checkIn: event.target.value }))
                }
                className="w-full rounded-xl border border-white/30 bg-white/95 p-3 text-slate-900"
                required
              />
              <input
                type="date"
                value={formData.checkOut}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, checkOut: event.target.value }))
                }
                className="w-full rounded-xl border border-white/30 bg-white/95 p-3 text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#009970] to-[#0f4f84] px-6 py-4 text-base font-bold text-white shadow-lg transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? <FiLoader className="animate-spin" /> : null}
              {submitting ? 'Submitting...' : 'Confirm Booking Request'}
            </button>
          </form>

          {feedback && (
            <p
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                feedback.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {feedback.type === 'success' ? <FiCheckCircle /> : null}
              {feedback.message}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
