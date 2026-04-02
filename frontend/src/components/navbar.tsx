'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'
import { Menu, X, Bell, User } from 'lucide-react'

interface NavbarProps {
  isLoggedIn?: boolean
  isPro?: boolean
  scansRemaining?: number
  maxScans?: number
}

export function Navbar({ isLoggedIn = false, isPro = false, scansRemaining = 2, maxScans = 2 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyze' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#8888AA] hover:text-[#F0F0FF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* Scan Counter */}
                {!isPro && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111118] border border-[rgba(255,255,255,0.08)] text-sm">
                    <span className="text-[#8888AA]">{scansRemaining}/{maxScans} free scans</span>
                  </div>
                )}
                {isPro && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold gradient-button text-white">
                    PRO
                  </span>
                )}
                <button className="relative p-2 text-[#8888AA] hover:text-[#F0F0FF] transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#6C63FF] rounded-full" />
                </button>
                <Link href="/dashboard">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-[#F0F0FF] hover:bg-[rgba(255,255,255,0.08)]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <button className="gradient-button px-5 py-2.5 rounded-full text-sm font-semibold text-white">
                    Get Started Free
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#F0F0FF]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-[rgba(255,255,255,0.08)]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-[#8888AA] hover:text-[#F0F0FF] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] space-y-3">
              {isLoggedIn ? (
                <Link href="/dashboard">
                  <Button className="w-full gradient-button text-white border-0">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full text-[#F0F0FF] hover:bg-[rgba(255,255,255,0.08)]">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="w-full gradient-button px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white">
                      Get Started Free
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
