'use client'

import { useEffect, useState } from 'react'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  animated?: boolean
}

export function ScoreRing({ score, size = 120, strokeWidth = 8, animated = true }: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (displayScore / 100) * circumference

  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s < 40) return '#FF4B4B'
    if (s < 70) return '#FF9800'
    return '#00D4FF'
  }

  const getScoreGradient = (s: number) => {
    if (s < 40) return 'url(#redGradient)'
    if (s < 70) return 'url(#orangeGradient)'
    return 'url(#cyanGradient)'
  }

  useEffect(() => {
    if (!animated) return

    const duration = 1500
    const steps = 60
    const increment = score / steps
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.round(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [score, animated])

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#FFEB3B" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4B4B" />
            <stop offset="100%" stopColor="#FF8A80" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreGradient(displayScore)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: animated ? 'stroke-dashoffset 0.1s ease-out' : 'none',
            filter: `drop-shadow(0 0 10px ${getScoreColor(displayScore)}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-2xl font-bold"
          style={{ color: getScoreColor(displayScore) }}
        >
          {displayScore}%
        </span>
      </div>
    </div>
  )
}
