'use client'

import Link from 'next/link'
import { Eye, FileText, Search } from 'lucide-react'
import { useState } from 'react'

const mockScanHistory = [
  { id: 1, jobTitle: 'Senior React Developer', company: 'Razorpay', score: 87, date: '2024-01-15' },
  { id: 2, jobTitle: 'Full Stack Engineer', company: 'Swiggy', score: 72, date: '2024-01-14' },
  { id: 3, jobTitle: 'Frontend Developer', company: 'Flipkart', score: 65, date: '2024-01-12' },
  { id: 4, jobTitle: 'Software Engineer', company: 'TCS', score: 91, date: '2024-01-10' },
  { id: 5, jobTitle: 'Backend Developer', company: 'Infosys', score: 78, date: '2024-01-08' },
  { id: 6, jobTitle: 'DevOps Engineer', company: 'Wipro', score: 55, date: '2024-01-05' },
  { id: 7, jobTitle: 'Python Developer', company: 'Zoho', score: 82, date: '2024-01-03' },
  { id: 8, jobTitle: 'Data Engineer', company: 'Walmart', score: 69, date: '2024-01-01' },
]

const getScoreColor = (score: number) => {
  if (score >= 85) return 'bg-[#00E676] text-[#0A0A0F]'
  if (score >= 70) return 'bg-[#00D4FF] text-[#0A0A0F]'
  if (score >= 50) return 'bg-[#FF9800] text-[#0A0A0F]'
  return 'bg-[#FF4B4B] text-white'
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHistory = mockScanHistory.filter(
    scan => 
      scan.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-[#F0F0FF]">
            Scan History
          </h1>
          <p className="text-[#8888AA] mt-1">View all your past resume analyses</p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8888AA]" />
          <input
            type="text"
            placeholder="Search by job or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-[#111118] border border-[rgba(255,255,255,0.08)] text-[#F0F0FF] placeholder:text-[#8888AA] focus:outline-none focus:border-[#6C63FF] transition-colors"
          />
        </div>
      </div>

      {/* History Table */}
      <div className="glass-card rounded-2xl p-6">
        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA]">Job Title</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA]">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA]">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#8888AA]">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#8888AA]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((scan) => (
                  <tr key={scan.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="py-4 px-4">
                      <span className="text-[#F0F0FF]">{scan.jobTitle}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[#8888AA]">{scan.company}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(scan.score)}`}>
                        {scan.score}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
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
            <h3 className="text-lg font-semibold text-[#F0F0FF] mb-2">No results found</h3>
            <p className="text-[#8888AA]">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  )
}
