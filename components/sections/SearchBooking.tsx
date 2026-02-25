'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FiCalendar, FiCheckCircle, FiLoader, FiMapPin, FiSearch, FiUsers } from 'react-icons/fi'
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
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

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
    <div className="rounded-[32px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(241,251,255,0.76))] p-4 shadow-[0_30px_70px_rgba(6,27,45,0.28)] backdrop-blur-2xl md:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">Instant Plan Builder</p>
        <p className="text-sm text-slate-600">All destinations available. Request sent directly to our team inbox.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-8">
        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500 xl:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Destination
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiMapPin className="text-slate-500" />
            <select
              name="destination"
              value={formData.destination}
              onChange={(event) => handleChange('destination', event.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
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

        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Check In
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiCalendar className="text-slate-500" />
            <input
              name="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={(event) => handleChange('checkIn', event.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Check Out
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiCalendar className="text-slate-500" />
            <input
              name="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={(event) => handleChange('checkOut', event.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Travelers
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiUsers className="text-slate-500" />
            <input
              name="travelers"
              type="number"
              min={1}
              value={formData.travelers}
              onChange={(event) => handleChange('travelers', Number(event.target.value))}
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
              required
            />
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Budget
          </span>
          <div className="mt-2">
            <select
              name="budget"
              value={formData.budget}
              onChange={(event) => handleChange('budget', event.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
              required
            >
              <option value="">Select budget/type</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Name
          </span>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={(event) => handleChange('name', event.target.value)}
            className="mt-2 w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            placeholder="Your name"
            required
          />
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            className="mt-2 w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            placeholder="+91..."
            required
          />
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white/92 p-3 transition focus-within:border-teal-500 xl:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Email
          </span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange('email', event.target.value)}
            className="mt-2 w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            placeholder="your@email.com"
          />
        </label>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:col-span-2 xl:grid-cols-1">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#008a71] via-[#0b6f92] to-[#0f4f84] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? <FiLoader className="animate-spin" /> : <FiSearch />}
            {submitting ? 'Sending Request...' : 'Send Plan Request'}
          </button>
          <Link
            href="/booking"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Book Now
          </Link>
        </div>
      </form>

      {feedback && (
        <p
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {feedback.type === 'success' && <FiCheckCircle />}
          {feedback.message}
        </p>
      )}
    </div>
  )
}
