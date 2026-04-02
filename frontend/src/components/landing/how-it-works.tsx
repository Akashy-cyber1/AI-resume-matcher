'use client'

import { Upload, FileText, BarChart3 } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Upload Resume',
    description: 'Drop your resume in PDF or DOCX format',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Paste JD',
    description: 'Copy-paste the job description you want to match',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Get AI Score',
    description: 'Receive instant analysis with actionable improvements',
    icon: BarChart3,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold mb-4 text-[#F0F0FF]">
            How It Works
          </h2>
          <p className="text-[#8888AA] text-lg max-w-2xl mx-auto">
            Get your ATS score in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 -translate-y-1/2">
            <div className="w-full h-full border-t-2 border-dashed border-[rgba(108,99,255,0.3)]" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="glass-card rounded-2xl p-8 card-hover relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full gradient-button flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#111118] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-[#6C63FF]" />
                </div>

                {/* Content */}
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#8888AA] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
