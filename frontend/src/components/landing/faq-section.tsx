'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is an ATS score and why does it matter?',
    answer: 'An ATS (Applicant Tracking System) score measures how well your resume matches a job description. Most companies use ATS software to filter resumes before a human sees them. A higher score means your resume is more likely to pass the initial screening.',
  },
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our AI is trained on millions of job descriptions and resumes, achieving 95%+ accuracy in keyword matching and ATS compatibility prediction. We continuously improve our models based on real hiring outcomes.',
  },
  {
    question: 'Is my resume data secure?',
    answer: 'Absolutely. We use bank-level encryption (256-bit SSL) to protect your data. Your resume is processed securely and never shared with third parties. You can delete your data anytime.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your Pro subscription at any time with no questions asked. Your access continues until the end of your billing period, and you won\'t be charged again.',
  },
  {
    question: 'Do you support resumes in regional languages?',
    answer: 'Currently, we support English resumes with plans to add Hindi, Tamil, Telugu, and other regional languages soon. Sign up for our newsletter to be notified when we launch multilingual support.',
  },
  {
    question: 'How is this different from other resume scanners?',
    answer: 'Unlike generic scanners, SkyCode Resume AI is built specifically for the Indian job market. We understand local company requirements, Indian resume formats, and provide suggestions tailored to jobs at companies like TCS, Infosys, startups, and MNCs.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold mb-4 text-[#F0F0FF]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#8888AA] text-lg max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-[#F0F0FF] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6C63FF] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-[#8888AA] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
