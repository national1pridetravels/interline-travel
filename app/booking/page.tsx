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
    <main className="page-shell-dark py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Reserve Your Kashmir Journey
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-center text-slate-200/90">
          Submit your booking details and our travel desk will confirm the route, hotels, and
          transport plan by call and email.
        </p>

        <div className="page-panel-dark rounded-[28px] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({ ...current, name: event.target.value }))
              }
              className="field-3d"
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
                className="field-3d"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, phone: event.target.value }))
                }
                className="field-3d"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select
                value={formData.package}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, package: event.target.value }))
                }
                className="field-3d"
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
                className="field-3d"
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
                className="field-3d"
                required
              />
              <input
                type="date"
                value={formData.checkOut}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, checkOut: event.target.value }))
                }
                className="field-3d"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="button-3d-primary w-full rounded-xl px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? <FiLoader className="animate-spin" /> : null}
              {submitting ? 'Submitting...' : 'Confirm Booking Request'}
            </button>
          </form>

          {feedback && (
            <p
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                feedback.type === 'success'
                  ? 'bg-red-50 text-red-700'
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
