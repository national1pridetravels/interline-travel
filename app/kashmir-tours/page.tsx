import Link from 'next/link'

export default function KashmirToursPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Around The World: Kashmir Tours</h1>
        <p className="text-gray-600 mb-10">
          Discover premium Kashmir tour options designed for comfort, culture, and adventure.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          <Link href="/packages/mesmerizing-kashmir-holiday" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
            Mesmerizing Kashmir Holiday
          </Link>
          <Link href="/packages/beautiful-kashmir-tour" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
            Beautiful Kashmir Tour
          </Link>
          <Link href="/packages/ultimate-kashmir-experience" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
            Ultimate Kashmir Experience
          </Link>
        </div>
      </div>
    </main>
  )
}
