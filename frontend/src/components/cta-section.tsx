import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1B] via-[#0D1033] to-[#0A0A1B]" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
          Ready to Land Your{' '}
          <span className="bg-gradient-to-r from-[#00D4FF] to-[#00E5CC] bg-clip-text text-transparent">
            Dream Job?
          </span>
        </h2>
        
        <p className="text-[#A0A0B8] text-lg mb-10 max-w-xl mx-auto">
          Join thousands of job seekers who have improved their resumes with Skycode Resume AI
        </p>
        
        <div className="relative inline-block">
          {/* Button glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF] to-[#00E5CC] rounded-xl blur-xl opacity-50" />
          
          <Link
            href="/analyze"
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#0A0A1B] bg-gradient-to-r from-[#00D4FF] to-[#00E5CC] rounded-xl hover:opacity-90 transition-opacity"
          >
            Start Free Analysis
          </Link>
        </div>
      </div>
    </section>
  )
}
