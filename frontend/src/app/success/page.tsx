'use client'

import { useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Infinity, Sparkles, History, ArrowRight } from 'lucide-react'

function Confetti() {
  const particles = useMemo(() => {
    const colors = ['#6C63FF', '#00D4FF', '#00E676', '#FF9800', '#FF4B4B']
    const seededRandom = (id: number, salt: number) => {
      const x = Math.sin(id * 12.9898 + salt * 78.233) * 43758.5453
      return x - Math.floor(x)
    }

    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: seededRandom(i, 1) * 100,
      delay: seededRandom(i, 2) * 2,
      color: colors[Math.floor(seededRandom(i, 3) * colors.length)],
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-sm animate-confetti"
          style={{
            left: `${particle.left}%`,
            top: '-20px',
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'there'

  const benefits = [
    { icon: Infinity, label: 'Unlimited Scans' },
    { icon: Sparkles, label: 'Full AI Suggestions' },
    { icon: History, label: 'Scan History' },
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti */}
      <Confetti />

      {/* Ambient Orbs */}
      <div className="ambient-orb ambient-orb-violet w-[400px] h-[400px] -left-32 top-1/4 animate-pulse-glow" />
      <div className="ambient-orb ambient-orb-cyan w-[300px] h-[300px] -right-24 bottom-1/4 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-md text-center relative z-10">
        {/* Success Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] opacity-20 animate-pulse" />
          {/* Inner circle */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center">
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-[#F0F0FF] mb-4">
          Welcome to Pro, {name}!
        </h1>

        <p className="text-[#8888AA] text-lg mb-8">
          Your payment was successful. You now have access to all premium features.
        </p>

        {/* Benefit Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {benefits.map((benefit) => (
            <div
              key={benefit.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6C63FF]/20 to-[#00D4FF]/10 border border-[#6C63FF]/30"
            >
              <benefit.icon className="w-5 h-5 text-[#00D4FF]" />
              <span className="text-sm text-[#F0F0FF] font-medium">{benefit.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/analyze">
          <button className="gradient-button px-8 py-4 rounded-xl text-lg font-semibold text-white flex items-center justify-center gap-2 mx-auto">
            Start Analyzing Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>

        {/* Secondary Link */}
        <Link href="/dashboard" className="inline-block mt-6 text-[#8888AA] hover:text-[#F0F0FF] transition-colors">
          Go to Dashboard
        </Link>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0F]" />}>
      <SuccessContent />
    </Suspense>
  )
}
