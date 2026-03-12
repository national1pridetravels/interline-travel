import Image from 'next/image'
import { FiExternalLink, FiPlayCircle, FiStar } from 'react-icons/fi'
import ReviewMediaSlideshow from '@/components/ui/ReviewMediaSlideshow'
import { getGoogleReviewShowcase } from '@/lib/google-reviews'

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1.5">
      {[...Array(5)].map((_, index) => (
        <FiStar
          key={index}
          className={`h-4.5 w-4.5 ${
            index < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
          }`}
        />
      ))}
    </div>
  )
}

export default async function Testimonials() {
  const showcase = await getGoogleReviewShowcase()

  return (
    <section className="py-20" id="google-reviews">
      <div className="section-wrap">
        <div className="mb-14 text-center">
          <p className="luxury-kicker mb-3">
            Real Google Reviews
          </p>
          <h2 className="headline-main mb-3 font-semibold">Trusted by Real Kashmir Travelers</h2>
          <p className="mx-auto max-w-3xl text-lg text-[#c3beaf]">
            Rated {showcase.averageRating}/5 from verified Google reviewers. Live testimonials and
            real media from National Pride Travels.
          </p>
          <a
            href={showcase.googleProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#cfbe95]/35 bg-[#121720] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#f2ebdd] transition hover:border-[#cfbe95]/55 hover:bg-[#1a202c]"
          >
            View All Google Reviews
            <FiExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcase.testimonials.map((testimonial) => (
            <article
              key={`${testimonial.reviewerName}-${testimonial.reviewUrl}`}
              className="rounded-3xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.44)] backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.reviewerAvatar}
                      alt={testimonial.reviewerName}
                    width={40}
                    height={40}
                      className="h-10 w-10 rounded-full border border-[#cfbe95]/24 object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#f2ecdd]">{testimonial.reviewerName}</p>
                      <p className="text-xs text-[#bdb6a7]">{testimonial.publishedAt}</p>
                    </div>
                  </div>
                  <RatingStars rating={testimonial.rating} />
                </div>

              <p className="line-clamp-6 text-sm leading-relaxed text-[#c2bcad]">
                &ldquo;{testimonial.reviewText}&rdquo;
              </p>

              <div className="mt-5 border-t border-[#cfbe95]/16 pt-4">
                <a
                  href={testimonial.reviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#d3bc8c] hover:text-[#e2cfa4]"
                >
                  Read on Google
                  <FiExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-7 xl:grid-cols-[1.25fr_0.75fr]">
          <ReviewMediaSlideshow images={showcase.mediaImages} />

          <div className="rounded-3xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-6 shadow-[0_16px_36px_rgba(0,0,0,0.44)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold uppercase tracking-[0.06em] text-[#f2ecdd]">Google Review Videos</h3>
            <p className="mt-2 text-sm text-[#c2bcad]">
              Live media from your Google profile. Public video items appear here automatically.
            </p>

            {showcase.mediaVideos.length > 0 ? (
              <div className="mt-5 space-y-4">
                {showcase.mediaVideos.map((videoUrl, index) => (
                  <video
                    key={`${videoUrl}-${index}`}
                    controls
                    preload="metadata"
                    playsInline
                    className="aspect-video w-full rounded-2xl border border-[#cfbe95]/18 bg-black/90"
                  >
                    <source src={videoUrl} />
                  </video>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-[#cfbe95]/18 bg-[#131821] p-5">
                <div className="mb-2 inline-flex rounded-full bg-[#1f2734] p-2 text-[#d7c49b]">
                  <FiPlayCircle className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-[#c2bcad]">
                  No public Google review videos are currently exposed by the feed. Open your Google
                  profile to view the latest videos directly.
                </p>
              </div>
            )}

            <a
              href={showcase.googleProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(112deg,#d5ba7f,#b99250_58%,#99773f)] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#0b0d12] transition hover:brightness-105"
            >
              Open Google Profile
              <FiExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
