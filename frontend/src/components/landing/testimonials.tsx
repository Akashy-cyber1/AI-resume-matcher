'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'SDE at Razorpay',
    avatar: 'RS',
    rating: 5,
    quote: 'Got shortlisted in 3 companies within 2 weeks after optimizing my resume with SkyCode Resume AI.',
  },
  {
    name: 'Priya Nair',
    role: 'Data Analyst',
    avatar: 'PN',
    rating: 5,
    quote: 'Missing keywords feature is a game-changer. My ATS score jumped from 54% to 91% in one edit.',
  },
  {
    name: 'Aditya Verma',
    role: 'Fresher → Placed at TCS',
    avatar: 'AV',
    rating: 5,
    quote: 'As a fresher I had no idea what recruiters look for. This tool made it crystal clear.',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold mb-4 text-[#F0F0FF]">
            Loved by Job Seekers
          </h2>
          <p className="text-[#8888AA] text-lg max-w-2xl mx-auto">
            See what our users are saying about SkyCode Resume AI
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-2xl p-6 card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar and Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-[#F0F0FF]">{testimonial.name}</h4>
                  <p className="text-sm text-[#8888AA]">{testimonial.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFEB3B] text-[#FFEB3B]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#F0F0FF] leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
