'use client'

import { useState } from 'react'
import { FiCheckCircle, FiLoader } from 'react-icons/fi'

type ContactState = {
  name: string
  email: string
  phone: string
  destination: string
  message: string
}

const defaultState: ContactState = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  message: '',
}

export default function ContactInquiryForm() {
  const [formData, setFormData] = useState<ContactState>(defaultState)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  )

  const handleChange = <K extends keyof ContactState>(key: K, value: ContactState[K]) => {
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
      const response = await fetch('/api/contact', {
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
          message: result.message || 'Unable to send inquiry.',
        })
        return
      }

      setFeedback({
        type: 'success',
        message: 'Inquiry sent successfully. Our team will contact you shortly.',
      })
      setFormData(defaultState)
    } catch (error) {
      console.error('Contact form failed:', error)
      setFeedback({
        type: 'error',
        message: 'Submission failed. Please call us directly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          value={formData.name}
          onChange={(event) => handleChange('name', event.target.value)}
          placeholder="Full Name"
          className="field-3d"
          required
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(event) => handleChange('phone', event.target.value)}
          placeholder="Phone Number"
          className="field-3d"
          required
        />
      </div>

      <input
        type="email"
        value={formData.email}
        onChange={(event) => handleChange('email', event.target.value)}
        placeholder="Email Address"
        className="field-3d"
        required
      />

      <input
        type="text"
        value={formData.destination}
        onChange={(event) => handleChange('destination', event.target.value)}
        placeholder="Destination interest (optional)"
        className="field-3d"
      />

      <textarea
        rows={5}
        value={formData.message}
        onChange={(event) => handleChange('message', event.target.value)}
        placeholder="Tell us your travel plan, preferred dates, and expectations."
        className="field-3d"
        required
      />

      <button
        type="submit"
        disabled={submitting}
        className="button-3d-primary w-full rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? <FiLoader className="animate-spin" /> : null}
        {submitting ? 'Sending...' : 'Send Inquiry'}
      </button>

      {feedback && (
        <p
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-red-50 text-red-700'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? <FiCheckCircle /> : null}
          {feedback.message}
        </p>
      )}
    </form>
  )
}
