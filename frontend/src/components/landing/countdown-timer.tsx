'use client'

import { useEffect, useState } from 'react'

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev
        
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        if (days < 0) {
          days = 2
          hours = 14
          minutes = 32
          seconds = 0
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111118] border border-[rgba(255,255,255,0.08)]">
      <span className="text-sm text-[#8888AA]">Offer ends in</span>
      <div className="flex items-center gap-1 text-sm font-mono text-[#00D4FF]">
        <span>{timeLeft.days}d</span>
        <span>{formatNumber(timeLeft.hours)}h</span>
        <span>{formatNumber(timeLeft.minutes)}m</span>
        <span>{formatNumber(timeLeft.seconds)}s</span>
      </div>
    </div>
  )
}
