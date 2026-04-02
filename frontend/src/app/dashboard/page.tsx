'use client'

import Link from 'next/link'
import { BarChart3, FileText, Calendar, Eye, ArrowRight, Zap, Rocket } from 'lucide-react'
import { ScoreRing } from '@/components/score-ring'

// Mock data
const mockStats = {
  totalScans: 12,
  avgScore: 74,
  plan: 'Free',
  scansThisMonth: 2,
  maxScansPerMonth: 2,
  goalScans: 5,
  scoreImprovement: 12,
}

const mockScanHistory = [
  { id: 1, jobTitle: 'Senior React Developer', company: 'Razorpay', score: 87, date: '2024-01-15' },
  { id: 2, jobTitle: 'Full Stack Engineer', company: 'Swiggy', score: 72, date: '2024-01-14' },
  { id: 3, jobTitle: 'Frontend Developer', company: 'Flipkart', score: 65, date: '2024-01-12' },
  { id: 4, jobTitle: 'Software Engineer', company: 'TCS', score: 91, date: '2024-01-10' },
]

const getScoreColor = (score: number) => {
  if (score >= 85) return 'bg-[#00E676] text-[#0A0A0F]'
  if (score >= 70) return 'bg-[#00D4FF] text-[#0A0A0F]'
  if (score >= 50) return 'bg-[#FF9800] text-[#0A0A0F]'
  return 'bg-[#FF4B4B] text-white'
}

export default function DashboardPage() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="p-6 lg:p-8">
      {/* Greeting Card */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-[#F0F0FF] mb-2">
              {greeting}, Akash
            </h1>
            <p className="text-[#8888AA]">
              You&apos;ve analyzed {mockStats.totalScans} resumes. Your average score improved by{' '}
              <span className="text-[#00E676]">+{mockStats.scoreImprovement} points</span>!
            </p>
          </div>
          <Link href="/analyze">
            <button className="gradient-button px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2">
              New Analysis
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#8888AA]">Monthly Goal</span>
            <span className="text-sm text-[#F0F0FF]">{mockStats.scansThisMonth}/{mockStats.goalScans} scans</span>
          </div>
          <div className="h-2 bg-[#111118] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full transition-all"
              style={{ width: `${(mockStats.scansThisMonth / mockStats.goalScans) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#6C63FF]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F0F0FF]">{mockStats.totalScans}</p>
          <p className="text-sm text-[#8888AA]">Total Scans</p>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#00D4FF]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-[#F0F0FF]">{mockStats.avgScore}%</p>
            <ScoreRing score={mockStats.avgScore} size={32} strokeWidth={3} animated={false} />
          </div>
          <p className="text-sm text-[#8888AA]">Avg Score</p>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00E676]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00E676]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F0F0FF]">{mockStats.plan}</p>
          <p className="text-sm text-[#8888AA]">Current Plan</p>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF9800]/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#FF9800]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#F0F0FF]">{mockStats.scansThisMonth}/{mockStats.maxScansPerMonth}</p>
          <p className="text-sm text-[#8888AA]">This Month</p>
        </div>
      </div>

      {/* Upgrade Banner (for free users) */}
      {mockStats.plan === 'Free' && (
        <div className="glass-card rounded-2xl p-6 mb-8 gradient-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF]">
                  Unlock Unlimited Scans
                </h3>
                <p className="text-sm text-[#8888AA]">
                  Upgrade to Pro and never run out of scans. Get full AI suggestions and scan history.
                </p>
              </div>
            </div>
            <Link href="/dashboard/upgrade">
              <button className="gradient-button px-6 py-3 rounded-xl font-semibold text-white whitespace-nowrap">
                Upgrade Now
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Scan History */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF]">
            Recent Scans
          </h2>
          <Link href="/dashboard/history" className="text-sm text-[#6C63FF] hover:text-[#00D4FF] transition-colors">
            View All
          </Link>
        </div>

        {mockScanHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA]">Job Title</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA] hidden sm:table-cell">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA]">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA] hidden md:table-cell">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#8888AA]">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockScanHistory.map((scan) => (
                  <tr key={scan.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="py-4 px-4">
                      <span className="text-[#F0F0FF]">{scan.jobTitle}</span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className="text-[#8888AA]">{scan.company}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(scan.score)}`}>
                        {scan.score}%
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-[#8888AA] text-sm">
                        {new Date(scan.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link href={`/results?score=${scan.score}`}>
                        <button className="p-2 rounded-lg text-[#8888AA] hover:text-[#6C63FF] hover:bg-[#6C63FF]/10 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#111118] flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#8888AA]" />
            </div>
            <h3 className="text-lg font-semibold text-[#F0F0FF] mb-2">No scans yet</h3>
            <p className="text-[#8888AA] mb-6">Analyze your first resume to get started!</p>
            <Link href="/analyze">
              <button className="gradient-button px-6 py-3 rounded-xl font-semibold text-white">
                Start Analyzing
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
