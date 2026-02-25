'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-4xl md:text-5xl font-semibold text-white">
          Stay Updated
        </h2>
        <p className="mb-10 text-xl leading-relaxed text-cyan-100">
          Subscribe to get special offers, travel tips, and Kashmir updates
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 rounded-full px-6 py-4 text-slate-900 placeholder:text-slate-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
            required
          />
          <button
            type="submit"
            className="rounded-full bg-white px-10 py-4 font-semibold text-cyan-700 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-100"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
