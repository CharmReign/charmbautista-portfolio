'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { siteData } from '@/lib/data'

function useTyped(items: string[]) {
  const [text, setText] = useState('')
  const [itemIndex, setItemIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = items[itemIndex]
    const speed = deleting ? 50 : 100
    const pause = 2000
    const timer = setTimeout(() => {
      if (!deleting && charIndex === current.length) { setTimeout(() => setDeleting(true), pause); return }
      if (deleting && charIndex === 0) { setDeleting(false); setItemIndex(p => (p + 1) % items.length); return }
      setText(current.slice(0, deleting ? charIndex - 1 : charIndex + 1))
      setCharIndex(p => p + (deleting ? -1 : 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, itemIndex, items])
  return text
}

export default function Hero() {
  const typed = useTyped(siteData.typedItems)
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0a1628' }}>
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-circle-1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full" />
        <div className="hero-circle-2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-6"
              style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)', color: '#14b8a6' }}>
              Available for opportunities
            </span>

            <h1 className="text-5xl xl:text-6xl font-display font-bold leading-tight mb-3" style={{ color: '#ccfbf1' }}>
              {siteData.firstname} <span style={{ color: '#14b8a6' }}>{siteData.lastname}</span>
            </h1>

            <div className="h-12 flex items-center mb-4">
              <p className="text-xl" style={{ color: '#a7f3d0' }}>
                I&apos;m a{' '}
                <span className="font-semibold" style={{ color: '#2dd4bf' }}>
                  {typed}<span className="typed-cursor animate-pulse">|</span>
                </span>
              </p>
            </div>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#5eead4' }}>
              {siteData.summary}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[{ value: '9+', label: 'Years Exp.' }, { value: '4', label: 'Countries' }, { value: '10+', label: 'Projects' }].map(s => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-3xl font-bold font-display" style={{ color: '#ccfbf1' }}>{s.value}</span>
                  <span className="text-xs uppercase tracking-wider" style={{ color: '#5eead4' }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                style={{ background: '#14b8a6', color: '#0a1628', boxShadow: '0 8px 24px rgba(20,184,166,0.3)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f9688')}
                onMouseLeave={e => (e.currentTarget.style.background = '#14b8a6')}>
                View My Work
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{ border: '1px solid rgba(20,184,166,0.35)', color: '#5eead4', background: 'transparent' }}
                onMouseEnter={e => { (e.currentTarget.style.borderColor = '#14b8a6'); (e.currentTarget.style.color = '#ccfbf1') }}
                onMouseLeave={e => { (e.currentTarget.style.borderColor = 'rgba(20,184,166,0.35)'); (e.currentTarget.style.color = '#5eead4') }}>
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right — profile */}
          <div className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Spinning ring */}
              <div className="profile-ring absolute -inset-2 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute -inset-2 rounded-full" style={{ background: '#0a1628', margin: '3px' }} />
              
              {/* Glow */}
              <div className="absolute -inset-6 rounded-full" style={{ background: 'rgba(20,184,166,0.08)', filter: 'blur(20px)' }} />
              <div className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden"
                style={{ border: '2px solid rgba(20,184,166,0.3)', boxShadow: '0 0 40px rgba(20,184,166,0.2)' }}>
                <Image src="/img/profile/profile.webp" alt={siteData.name} fill className="object-cover" priority />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 rounded-xl px-4 py-2 shadow-xl"
                style={{ background: '#0d1e33', border: '1px solid rgba(20,184,166,0.2)' }}>
                <p className="text-xs" style={{ color: '#5eead4' }}>Currently at</p>
                <p className="text-sm font-semibold" style={{ color: '#ccfbf1' }}>Syscon Justice Systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-colors animate-bounce"
        style={{ color: '#134e4a' }} aria-label="Scroll down">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
