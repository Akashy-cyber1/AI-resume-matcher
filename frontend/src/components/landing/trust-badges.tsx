import { Shield, CreditCard, Globe, Bot, Zap } from 'lucide-react'

const badges = [
  { icon: Shield, label: 'SSL Secured' },
  { icon: CreditCard, label: 'Razorpay Payments' },
  { icon: Globe, label: 'Made in India' },
  { icon: Bot, label: 'Powered by AI' },
  { icon: Zap, label: 'Results in 10 Seconds' },
]

export function TrustBadges() {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-[#111118]/80 backdrop-blur-sm border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-6 md:gap-12 overflow-x-auto scrollbar-hide">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-[#8888AA] text-xs whitespace-nowrap">
              <badge.icon className="w-3.5 h-3.5" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
