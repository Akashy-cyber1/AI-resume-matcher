'use client'

import { Zap, Smartphone, Sparkles, Target } from 'lucide-react'
import { ScoreRing } from '@/components/score-ring'

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold mb-4 text-[#F0F0FF]">
            Powerful Features
          </h2>
          <p className="text-[#8888AA] text-lg max-w-2xl mx-auto">
            Everything you need to optimize your resume for any job
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Card - Score Ring */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 card-hover">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <ScoreRing score={92} size={180} strokeWidth={12} />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-[#F0F0FF] mb-3">
                  Real-Time ATS Score
                </h3>
                <p className="text-[#8888AA] leading-relaxed mb-4">
                  See exactly how your resume scores against the ATS systems used by top companies. 
                  Our AI analyzes formatting, keywords, and structure to give you an accurate score.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#6C63FF]" />
                    <span className="text-[#8888AA]">Industry benchmark: 61%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                    <span className="text-[#8888AA]">Top 10%: 85+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small Card - Instant Results */}
          <div className="glass-card rounded-2xl p-6 card-hover flex flex-col justify-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4FF]/20 flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-[#00D4FF]" />
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF] mb-2">
              Instant Results
            </h3>
            <p className="text-[#8888AA] text-sm leading-relaxed">
              Get your complete analysis in under 10 seconds. No waiting, no email required.
            </p>
          </div>

          {/* Keywords Card */}
          <div className="glass-card rounded-2xl p-6 card-hover">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF] mb-4">
              Smart Keyword Detection
            </h3>
            <p className="text-[#8888AA] text-sm mb-4">
              See which keywords you have and which ones you&apos;re missing.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="chip-success px-3 py-1.5 rounded-full text-xs">Python</span>
              <span className="chip-success px-3 py-1.5 rounded-full text-xs">React</span>
              <span className="chip-success px-3 py-1.5 rounded-full text-xs">SQL</span>
              <span className="chip-error px-3 py-1.5 rounded-full text-xs">Docker</span>
              <span className="chip-error px-3 py-1.5 rounded-full text-xs">Kubernetes</span>
              <span className="chip-error px-3 py-1.5 rounded-full text-xs">AWS</span>
            </div>
          </div>

          {/* AI Suggestions Card */}
          <div className="glass-card rounded-2xl p-6 card-hover">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF] mb-4">
              AI-Powered Suggestions
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-[#111118] border border-[rgba(255,255,255,0.08)]">
                <div className="w-1 rounded-full bg-[#6C63FF]" />
                <div>
                  <p className="text-sm text-[#F0F0FF]">Add Docker experience</p>
                  <p className="text-xs text-[#8888AA] mt-1">+8% score improvement</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-[#111118] border border-[rgba(255,255,255,0.08)]">
                <div className="w-1 rounded-full bg-[#6C63FF]" />
                <div>
                  <p className="text-sm text-[#F0F0FF]">Quantify achievements</p>
                  <p className="text-xs text-[#8888AA] mt-1">+5% score improvement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Friendly Card */}
          <div className="glass-card rounded-2xl p-6 card-hover flex flex-col justify-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C63FF]/20 to-[#00D4FF]/20 flex items-center justify-center mb-4">
              <Smartphone className="w-7 h-7 text-[#6C63FF]" />
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF] mb-2">
              Mobile Friendly
            </h3>
            <p className="text-[#8888AA] text-sm leading-relaxed">
              Analyze your resume on the go. Works perfectly on any device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
