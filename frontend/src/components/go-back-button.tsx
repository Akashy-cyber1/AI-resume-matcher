"use client"

import { ArrowLeft } from 'lucide-react'

export function GoBackButton() {
  return (
    <button 
      onClick={() => window.history.back()}
      className="px-6 py-3 rounded-xl font-semibold text-[#F0F0FF] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2"
    >
      <ArrowLeft className="w-5 h-5" />
      Go Back
    </button>
  )
}
