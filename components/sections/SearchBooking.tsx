import Link from 'next/link'
import { FiCalendar, FiMapPin, FiSearch, FiUsers } from 'react-icons/fi'

export default function SearchBooking() {
  return (
    <div className="rounded-[30px] border border-white/80 bg-gradient-to-br from-white/90 to-[#f5fbff]/80 p-4 shadow-[0_22px_56px_rgba(15,35,58,0.18)] backdrop-blur-xl md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Instant Plan Builder</p>
        <p className="text-xs text-slate-600">Get season-matched Kashmir package suggestions</p>
      </div>
      <form action="/packages" method="get" className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
        <label className="rounded-2xl border border-slate-200 bg-white p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Destination
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiMapPin className="text-slate-500" />
            <select
              name="destination"
              defaultValue=""
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            >
              <option value="">Anywhere in Kashmir</option>
              <option value="srinagar">Srinagar</option>
              <option value="gulmarg">Gulmarg</option>
              <option value="pahalgam">Pahalgam</option>
              <option value="sonmarg">Sonmarg</option>
              <option value="gurez">Gurez Valley</option>
            </select>
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Check In
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiCalendar className="text-slate-500" />
            <input
              name="checkIn"
              type="date"
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Check Out
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiCalendar className="text-slate-500" />
            <input
              name="checkOut"
              type="date"
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Travelers
          </span>
          <div className="mt-2 flex items-center gap-2">
            <FiUsers className="text-slate-500" />
            <input
              name="travelers"
              type="number"
              min={1}
              defaultValue={2}
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
        </label>

        <label className="rounded-2xl border border-slate-200 bg-white p-3 transition focus-within:border-teal-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Budget
          </span>
          <div className="mt-2">
            <select
              name="type"
              defaultValue=""
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            >
              <option value="">Select budget/type</option>
              <option value="family">Family</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="adventure">Adventure</option>
              <option value="trekking">Trekking</option>
            </select>
          </div>
        </label>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-1">
          <button
            type="submit"
            className="inline-flex h-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0f8a6a] to-[#0f4f84] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-[#0d775b] hover:to-[#0d4470]"
          >
            <FiSearch />
            Find Packages
          </button>
          <Link
            href="/booking"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Book Now
          </Link>
        </div>
      </form>
    </div>
  )
}
