'use client'

import { Check, Shield, Flame } from 'lucide-react'
import { CountdownTimer } from '@/components/landing/countdown-timer'

const plans = [
  {
    name: 'Pro',
    price: '299',
    originalPrice: '449',
    period: '/month',
    description: 'For serious job seekers',
    features: [
      'Unlimited scans',
      'Full AI suggestions',
      'Detailed analytics',
      'Scan history',
      'Priority support',
      'Export PDF reports',
    ],
    popular: true,
    badge: 'Most Popular · Save 33%',
  },
  {
    name: 'Recruiter',
    price: '2,999',
    period: '/month',
    description: 'For hiring teams',
    features: [
      'Everything in Pro',
      'Bulk resume upload',
      'API access',
      'Team management',
      'Custom branding',
      'Dedicated support',
    ],
    popular: false,
  },
]

export default function UpgradePage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-[#F0F0FF] mb-4">
          Upgrade Your Plan
        </h1>
        <p className="text-[#8888AA] max-w-xl mx-auto">
          Unlock unlimited scans and premium features to maximize your job search success
        </p>
      </div>

      {/* FOMO Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 text-[#FF9800]">
          <Flame className="w-5 h-5" />
          <span className="text-sm">147 people upgraded to Pro this week</span>
        </div>
        <CountdownTimer />
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative glass-card rounded-2xl p-8 card-hover ${
              plan.popular ? 'gradient-border' : ''
            }`}
          >
            {/* Popular Badge */}
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="gradient-button px-4 py-1.5 rounded-full text-xs font-semibold text-white whitespace-nowrap">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan Name */}
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF] mb-2">
              {plan.name}
            </h3>
            <p className="text-sm text-[#8888AA] mb-6">{plan.description}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#F0F0FF]">
                  ₹{plan.price}
                </span>
                <span className="text-[#8888AA]">{plan.period}</span>
              </div>
              {plan.originalPrice && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#8888AA] line-through">₹{plan.originalPrice}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF4B4B]/20 text-[#FF4B4B]">
                    Limited Offer
                  </span>
                </div>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[#F0F0FF]">
                  <Check className="w-5 h-5 text-[#00E676] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`w-full py-3 rounded-[10px] font-semibold transition-all ${
                plan.popular
                  ? 'gradient-button text-white'
                  : 'bg-[#111118] text-[#F0F0FF] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              {plan.name === 'Recruiter' ? 'Contact Sales' : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-[#8888AA]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#00E676]" />
          <span>Secured by Razorpay</span>
        </div>
        <span>·</span>
        <span>Cancel anytime</span>
        <span>·</span>
        <span>No hidden fees</span>
      </div>
    </div>
  )
}
