'use client'

import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-9 h-9">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
          </defs>
          {/* Abstract S mark with neural network lines */}
          <path
            d="M20 4C12.268 4 6 10.268 6 18c0 4.42 2.05 8.36 5.25 10.93L20 36l8.75-7.07C31.95 26.36 34 22.42 34 18c0-7.732-6.268-14-14-14z"
            fill="url(#logoGradient)"
            opacity="0.15"
          />
          <path
            d="M26 12c-3.5 0-6 2.5-6 6s2.5 6 6 6"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14 16c3.5 0 6 2.5 6 6s-2.5 6-6 6"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Neural network dots */}
          <circle cx="26" cy="12" r="2" fill="#6C63FF" />
          <circle cx="26" cy="24" r="2" fill="#00D4FF" />
          <circle cx="14" cy="16" r="2" fill="#6C63FF" />
          <circle cx="14" cy="28" r="2" fill="#00D4FF" />
          <circle cx="20" cy="20" r="2.5" fill="url(#logoGradient)" />
          {/* Connection lines */}
          <line x1="20" y1="20" x2="26" y2="12" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="20" x2="26" y2="24" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="20" x2="14" y2="16" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="20" x2="14" y2="28" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
      {showText && (
        <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg text-[#F0F0FF]">
          SkyCode<span className="gradient-text">AI</span>
        </span>
      )}
    </Link>
  )
}
