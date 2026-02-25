'use client'

import { useState } from 'react'
import { FiCalendar, FiUsers, FiMapPin } from 'react-icons/fi'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'Kashmir Honeymoon Special',
    travelers: 2,
    checkIn: '',
    checkOut: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const result = await response.json()
    if (result.success) {
      alert(`Booking ID: ${result.bookingId}`)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Book Your Kashmir Adventure
        </h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text" 
              placeholder="Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border rounded-lg" 
              required 
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border rounded-lg" 
                required 
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 border rounded-lg" 
                required 
              />
            </div>
            <select 
              value={formData.package}
              onChange={(e) => setFormData({...formData, package: e.target.value})}
              className="w-full p-3 border rounded-lg"
            >
              <option>Kashmir Honeymoon Special</option>
              <option>Delightful Kashmir</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <select 
                value={formData.travelers}
                onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
                className="w-full p-3 border rounded-lg"
              >
                <option>2</option><option>3</option><option>4</option>
              </select>
              <input 
                type="date" 
                value={formData.checkIn}
                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                className="w-full p-3 border rounded-lg" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-black text-white py-4 rounded-lg font-bold"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
