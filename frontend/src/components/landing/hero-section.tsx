'use client'

import Link from 'next/link'
import { Play, ArrowRight } from 'lucide-react'
import { ScoreRing } from '@/components/score-ring'

const companyLogos = [
  'TCS', 'Infosys', 'Wipro', 'Razorpay', 'Swiggy', 'Flipkart'
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Ambient Orbs */}
      <div className="ambient-orb ambient-orb-violet w-[600px] h-[600px] -left-64 top-20 animate-pulse-glow" />
      <div className="ambient-orb ambient-orb-cyan w-[500px] h-[500px] -right-48 top-40 animate-pulse-glow" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Shimmer Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111118] border border-[rgba(255,255,255,0.08)] mb-8 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer" />
            <span className="relative text-sm text-[#8888AA]">
              <span className="text-[#6C63FF]">&#10022;</span> AI-Powered · 10,000+ Resumes Analyzed
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
            Match Your Resume to{' '}
            <span className="gradient-text">Any Job</span>
            {' '}in Seconds
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-[#8888AA] max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
            Stop guessing why you&apos;re not getting callbacks. SkyCode Resume AI scans your resume against any job description in seconds — showing your exact ATS score, missing keywords, and AI-written fixes. Used by 10,000+ job seekers across India.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/analyze">
              <button className="gradient-button px-8 py-4 rounded-full text-lg font-semibold text-white flex items-center gap-2">
                Analyze Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="px-8 py-4 rounded-full text-lg font-semibold text-[#F0F0FF] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            {/* Overlapping Avatars */}
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0A0A0F] bg-gradient-to-br from-[#6C63FF] to-[#00D4FF]"
                    style={{ 
                      background: `linear-gradient(${45 + i * 30}deg, #6C63FF, #00D4FF)` 
                    }}
                  />
                ))}
              </div>
              <span className="ml-3 text-sm text-[#8888AA]">+2.4k users this month</span>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-[#8888AA] mb-12">
            <span>10,000+ Resumes Analyzed</span>
            <span className="hidden sm:inline">·</span>
            <span>4.9 stars from 500+ Users</span>
            <span className="hidden sm:inline">·</span>
            <span>3x More Interview Calls</span>
          </div>

          {/* Floating Dashboard Card */}
          <div className="relative max-w-md mx-auto">
            <div className="glass-card rounded-2xl p-6 animate-float">
              <div className="flex items-center gap-6">
                <ScoreRing score={87} size={100} />
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="chip-success px-3 py-1 rounded-full text-xs">Python</span>
                    <span className="chip-success px-3 py-1 rounded-full text-xs">React</span>
                    <span className="chip-error px-3 py-1 rounded-full text-xs">Docker</span>
                    <span className="chip-error px-3 py-1 rounded-full text-xs">AWS</span>
                  </div>
                  <p className="text-xs text-[#8888AA]">Add 2 keywords to reach 95%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted Company Logos */}
          <div className="mt-16">
            <p className="text-sm text-[#8888AA] mb-6">Trusted by professionals at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
              {companyLogos.map((company) => (
                <span key={company} className="font-[family-name:var(--font-space-grotesk)] text-lg md:text-xl text-[#8888AA] font-semibold">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
