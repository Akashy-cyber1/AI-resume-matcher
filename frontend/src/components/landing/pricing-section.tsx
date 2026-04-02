'use client'

import { Check, Flame, Shield } from 'lucide-react'
import Link from 'next/link'
import { CountdownTimer } from './countdown-timer'

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'Perfect for trying out',
    features: [
      '2 scans per month',
      'Basic ATS score',
      'Keyword matching',
      'Limited suggestions',
    ],
    cta: 'Get Started',
    href: '/auth/signup',
    popular: false,
  },
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
    cta: 'Upgrade to Pro',
    href: '/auth/signup?plan=pro',
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
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold mb-4 text-[#F0F0FF]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#8888AA] text-lg max-w-2xl mx-auto">
            Choose the plan that works best for you
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
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-card rounded-2xl p-8 card-hover ${
                plan.popular ? 'gradient-border md:-translate-y-4' : ''
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
                    {plan.price === '0' ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.period !== 'forever' && (
                    <span className="text-[#8888AA]">{plan.period}</span>
                  )}
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
              <Link href={plan.href}>
                <button
                  className={`w-full py-3 rounded-[10px] font-semibold transition-all ${
                    plan.popular
                      ? 'gradient-button text-white'
                      : 'bg-[#111118] text-[#F0F0FF] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
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
    </section>
  )
}
