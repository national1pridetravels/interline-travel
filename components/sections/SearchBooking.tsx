'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FiCalendar, FiCheckCircle, FiLoader, FiMail, FiMapPin, FiPhone, FiSearch, FiUsers } from 'react-icons/fi'
import type { Destination } from '@/lib/destinations'

type PlannerState = {
  destination: string
  checkIn: string
  checkOut: string
  travelers: number
  budget: string
  name: string
  phone: string
  email: string
}

type SearchBookingProps = {
  destinations: Destination[]
}

const budgetOptions = [
  { value: 'family', label: 'Family' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'trekking', label: 'Trekking' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'budget', label: 'Budget Friendly' },
]

const defaultForm: PlannerState = {
  destination: '',
  checkIn: '',
  checkOut: '',
  travelers: 2,
  budget: '',
  name: '',
  phone: '',
  email: '',
}

export default function SearchBooking({ destinations }: SearchBookingProps) {
  const [formData, setFormData] = useState<PlannerState>(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  )

  const sortedDestinations = useMemo(
    () => [...destinations].sort((a, b) => a.name.localeCompare(b.name)),
    [destinations]
  )

  const handleChange = <K extends keyof PlannerState>(key: K, value: PlannerState[K]) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = (await response.json()) as { success: boolean; message?: string; mailed?: boolean }
      if (!response.ok || !result.success) {
        setFeedback({
          type: 'error',
          message: result.message || 'Failed to send your plan request. Please try again.',
        })
        return
      }

      setFeedback({
        type: 'success',
        message:
          'Plan request received. Our team will contact you shortly on your phone and email.',
      })
      setFormData(defaultForm)
    } catch (error) {
      console.error('Plan request submission failed:', error)
      setFeedback({
        type: 'error',
        message: 'Unable to submit now. Please call or WhatsApp us directly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="hero-panel-3d">
      <div className="relative z-10">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="chip-3d">Instant Plan Builder</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 md:text-3xl">
              Build a Kashmir plan with your exact travel window
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600">
            All destinations remain available. Requests are sent directly to our team inbox for
            manual follow-up and route planning.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
          <label className="xl:col-span-3">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Destination
            </span>
            <div className="relative">
              <FiMapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                name="destination"
                value={formData.destination}
                onChange={(event) => handleChange('destination', event.target.value)}
                className="field-3d pl-11"
                required
              >
                <option value="">Select destination</option>
                {sortedDestinations.map((destination) => (
                  <option key={destination.slug} value={destination.name}>
                    {destination.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="xl:col-span-2">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Check In
            </span>
            <div className="relative">
              <FiCalendar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(event) => handleChange('checkIn', event.target.value)}
                className="field-3d pl-11"
              />
            </div>
          </label>

          <label className="xl:col-span-2">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Check Out
            </span>
            <div className="relative">
              <FiCalendar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(event) => handleChange('checkOut', event.target.value)}
                className="field-3d pl-11"
              />
            </div>
          </label>

          <label className="xl:col-span-2">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Travelers
            </span>
            <div className="relative">
              <FiUsers className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="travelers"
                type="number"
                min={1}
                value={formData.travelers}
                onChange={(event) => handleChange('travelers', Number(event.target.value))}
                className="field-3d pl-11"
                required
              />
            </div>
          </label>

          <label className="xl:col-span-3">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Budget / Trip Style
            </span>
            <select
              name="budget"
              value={formData.budget}
              onChange={(event) => handleChange('budget', event.target.value)}
              className="field-3d"
              required
            >
              <option value="">Select package type</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="xl:col-span-3">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Name
            </span>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
              className="field-3d"
              placeholder="Your full name"
              required
            />
          </label>

          <label className="xl:col-span-3">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Phone
            </span>
            <div className="relative">
              <FiPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                className="field-3d pl-11"
                placeholder="+91..."
                required
              />
            </div>
          </label>

          <label className="xl:col-span-4">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Email
            </span>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => handleChange('email', event.target.value)}
                className="field-3d pl-11"
                placeholder="your@email.com"
              />
            </div>
          </label>

          <div className="grid gap-3 md:grid-cols-2 xl:col-span-5 xl:grid-cols-2">
            <button
              type="submit"
              disabled={submitting}
              className="button-3d-primary min-h-[56px] w-full rounded-[1.1rem] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? <FiLoader className="animate-spin" /> : <FiSearch />}
              {submitting ? 'Sending Request...' : 'Send Plan Request'}
            </button>
            <Link
              href="/booking"
              className="button-3d-secondary min-h-[56px] w-full rounded-[1.1rem]"
            >
              Book Now
            </Link>
          </div>
        </form>

        {feedback ? (
          <div
            className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              feedback.type === 'success'
                ? 'bg-red-50 text-red-700'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {feedback.type === 'success' ? <FiCheckCircle /> : null}
            {feedback.message}
          </div>
        ) : null}
      </div>
    </div>
  )
}
