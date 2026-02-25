// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string }
}

export default function BlogPost({ params }: Props) {
  const { slug } = params
  
  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kashmir Travel Guide - {slug.replace(/-/g, ' ').toUpperCase()}
          </h1>
          <time className="text-gray-500 text-lg">February 2026</time>
        </header>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p>
            National Pride Travels presents the ultimate Kashmir travel guide. 
            Explore Srinagar&apos;s houseboats, Gulmarg&apos;s gondola rides, Pahalgam&apos;s 
            lush valleys, and Sonmarg&apos;s snowy meadows with our expertly crafted 
            tour packages.
          </p>
          
          <h2>Why Choose Kashmir?</h2>
          <p>
            Kashmir offers breathtaking landscapes, rich culture, and unforgettable 
            experiences. Our packages include luxury accommodations, guided tours, 
            and comfortable transportation throughout your journey.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-xl mt-8">
            <h3 className="font-bold text-lg mb-2">Ready to Book?</h3>
            <p>Contact us for the best Kashmir tour packages at pocket-friendly prices.</p>
          </div>
        </div>
      </article>
    </main>
  )
}
