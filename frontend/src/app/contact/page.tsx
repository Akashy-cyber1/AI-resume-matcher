"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { MessageSquare, Send, Phone, Mail, Globe, Clock, Calendar, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen bg-[#0A0A1B]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.3)] mb-6">
            <Mail className="w-4 h-4 text-[#6C63FF]" />
            <span className="text-sm text-[#B8B8D0]">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0FF] mb-6 font-heading">
            Contact <span className="bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-lg text-[#B8B8D0] max-w-2xl mx-auto">
            Have questions about SkyCode Resume AI? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6 text-[#00D4FF]" />
                <h2 className="text-2xl font-bold text-[#F0F0FF] font-heading">Send us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F0F0FF] mb-2">Message Sent!</h3>
                  <p className="text-[#B8B8D0]">Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#F0F0FF] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#F0F0FF] placeholder-[#6B6B80] focus:outline-none focus:border-[#6C63FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#F0F0FF] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#F0F0FF] placeholder-[#6B6B80] focus:outline-none focus:border-[#6C63FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#F0F0FF] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message here..."
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-[#F0F0FF] placeholder-[#6B6B80] focus:outline-none focus:border-[#6C63FF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[#F0F0FF] mb-6 font-heading">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B6B80]">Phone</p>
                      <p className="text-[#F0F0FF] font-medium">+91 7007592695</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B6B80]">Email</p>
                      <p className="text-[#F0F0FF] font-medium">akashy1935@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B6B80]">Website</p>
                      <p className="text-[#F0F0FF] font-medium">SkyCode Tools</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-[#00D4FF]" />
                  <h3 className="text-lg font-bold text-[#F0F0FF]">Response Time</h3>
                </div>
                <p className="text-[#B8B8D0] leading-relaxed">
                  We typically respond to all inquiries within 24-48 hours. For urgent matters, please include URGENT in your message subject line.
                </p>
              </div>

              {/* Support Hours Card */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#00D4FF]" />
                  <h3 className="text-lg font-bold text-[#F0F0FF]">Support Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#B8B8D0]">Monday - Friday</span>
                    <span className="text-[#F0F0FF] font-medium">9:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#B8B8D0]">Saturday</span>
                    <span className="text-[#F0F0FF] font-medium">10:00 AM - 4:00 PM IST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#B8B8D0]">Sunday</span>
                    <span className="text-[#6B6B80]">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F0F0FF] mb-4 font-heading">
            Need Quick Answers?
          </h2>
          <p className="text-[#B8B8D0] mb-8">
            Check out our frequently asked questions for instant help.
          </p>
          <Link
            href="/#faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#F0F0FF] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            View FAQ
          </Link>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
