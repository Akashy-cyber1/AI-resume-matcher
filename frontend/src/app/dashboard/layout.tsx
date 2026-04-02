'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  User, 
  Zap, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analyze', label: 'New Analysis', icon: PlusCircle },
  { href: '/dashboard/history', label: 'Scan History', icon: History },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/upgrade', label: 'Upgrade', icon: Zap },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Mock user data
  const user = {
    name: 'Akash Kumar',
    email: 'akash@example.com',
    plan: 'Free',
    avatar: 'AK',
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col fixed inset-y-0 left-0 bg-[#111118] border-r border-[rgba(255,255,255,0.08)]">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[rgba(255,255,255,0.08)]">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6C63FF]/20 to-[#00D4FF]/10 text-[#F0F0FF]'
                    : 'text-[#8888AA] hover:text-[#F0F0FF] hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#6C63FF]' : ''}`} />
                <span className="text-sm font-medium">{item.label}</span>
                {item.label === 'Upgrade' && user.plan === 'Free' && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white">
                    Pro
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#16161F]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center text-white font-semibold">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#F0F0FF] truncate">{user.name}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  user.plan === 'Pro' 
                    ? 'bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white' 
                    : 'bg-[#111118] text-[#8888AA]'
                }`}>
                  {user.plan}
                </span>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-[#8888AA] hover:text-[#FF4B4B] hover:bg-[#FF4B4B]/10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[#111118] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-4">
        <Logo />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#F0F0FF]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-16 left-0 right-0 bg-[#111118] border-b border-[rgba(255,255,255,0.08)] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#6C63FF]/20 to-[#00D4FF]/10 text-[#F0F0FF]'
                        : 'text-[#8888AA] hover:text-[#F0F0FF]'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-[#6C63FF]' : ''}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#111118] border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-around h-full">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 ${
                  isActive ? 'text-[#6C63FF]' : 'text-[#8888AA]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 pt-16 lg:pt-0 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  )
}
