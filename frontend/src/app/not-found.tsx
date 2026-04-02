import Link from 'next/link'
import { Logo } from '@/components/logo'
import { GoBackButton } from '@/components/go-back-button'
import { CTASection } from '@/components/cta-section'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Orbs */}
      <div className="ambient-orb ambient-orb-violet w-[400px] h-[400px] -left-32 top-1/4 animate-pulse-glow" />
      <div className="ambient-orb ambient-orb-cyan w-[300px] h-[300px] -right-24 bottom-1/4 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-md text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Logo />
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-8xl md:text-9xl font-bold gradient-text mb-4">
            404
          </h1>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-[#F0F0FF] mb-4">
            Page Not Found
          </h2>
          <p className="text-[#8888AA] text-lg">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <button className="gradient-button px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </button>
          </Link>
          <GoBackButton />
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
          <p className="text-sm text-[#8888AA] mb-4">Perhaps you were looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/analyze" className="text-sm text-[#6C63FF] hover:text-[#00D4FF] transition-colors">
              Analyze Resume
            </Link>
            <Link href="/dashboard" className="text-sm text-[#6C63FF] hover:text-[#00D4FF] transition-colors">
              Dashboard
            </Link>
            <Link href="/#pricing" className="text-sm text-[#6C63FF] hover:text-[#00D4FF] transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="text-sm text-[#6C63FF] hover:text-[#00D4FF] transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>

      <CTASection />
    </main>
  )
}
