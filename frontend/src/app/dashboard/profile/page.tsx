'use client'

import { useState } from 'react'
import { User, Mail, Lock, Save, Eye, EyeOff } from 'lucide-react'

export default function ProfilePage() {
  const [name, setName] = useState('Akash Kumar')
  const [email, setEmail] = useState('akash@example.com')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-[#F0F0FF]">
          Profile Settings
        </h1>
        <p className="text-[#8888AA] mt-1">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white text-2xl font-bold">
            AK
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[#F0F0FF]">
              {name}
            </h2>
            <p className="text-[#8888AA]">{email}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-[#111118] text-[#8888AA]">
              Free Plan
            </span>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF] mb-6">
          Personal Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8888AA]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#111118] border border-[rgba(255,255,255,0.08)] text-[#F0F0FF] focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8888AA]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#111118] border border-[rgba(255,255,255,0.08)] text-[#F0F0FF] focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[#F0F0FF] mb-6">
          Change Password
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8888AA]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-[#111118] border border-[rgba(255,255,255,0.08)] text-[#F0F0FF] placeholder:text-[#8888AA] focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888AA] hover:text-[#F0F0FF]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8888AA]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#111118] border border-[rgba(255,255,255,0.08)] text-[#F0F0FF] placeholder:text-[#8888AA] focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full gradient-button py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
      >
        {isSaving ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Changes
          </>
        )}
      </button>
    </div>
  )
}
