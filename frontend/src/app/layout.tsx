import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SkyCode Resume AI | Your AI Career Copilot',
  description: 'Match your resume to any job in seconds. Get your ATS score, missing keywords, and AI-written fixes. Used by 10,000+ job seekers across India.',
  keywords: ['resume', 'ATS', 'job search', 'career', 'AI', 'resume scanner', 'India'],
  authors: [{ name: 'SkyCode Tools' }],
  openGraph: {
    title: 'SkyCode Resume AI | Your AI Career Copilot',
    description: 'Match your resume to any job in seconds. Get your ATS score, missing keywords, and AI-written fixes.',
    url: 'https://skycodetools.in',
    siteName: 'SkyCode Resume AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyCode Resume AI | Your AI Career Copilot',
    description: 'Match your resume to any job in seconds. Get your ATS score, missing keywords, and AI-written fixes.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A0F] text-[#F0F0FF]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
