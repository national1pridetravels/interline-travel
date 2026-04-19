import Link from 'next/link'

const posts = [
  { slug: 'best-time-to-visit-kashmir', title: 'Best Time To Visit Kashmir' },
  { slug: 'top-7-things-to-do-in-srinagar', title: 'Top 7 Things To Do In Srinagar' },
  { slug: 'kashmir-family-trip-guide', title: 'Kashmir Family Trip Guide' },
]

export default function BlogPage() {
  return (
    <main className="page-shell-dark py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Travel Blog</h1>
        <p className="text-slate-200/90 mb-10">
          Insights, guides, and tips for planning your Kashmir journey.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="page-panel-light block rounded-2xl p-6 transition hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-sm text-gray-500 mt-3">Read article</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
