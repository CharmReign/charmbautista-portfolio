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
    const timer = setTimeout(() => {
      if (!deleting && charIndex === current.length) { setTimeout(() => setDeleting(true), 2000); return }
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
      style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-circle-1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full" />
        <div className="hero-circle-2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(var(--border-muted) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-6"
              style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--primary)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>

            <h1 className="text-5xl xl:text-6xl font-display font-bold leading-tight mb-3"
              style={{ color: 'var(--text-heading)' }}>
              {siteData.firstname} <span style={{ color: 'var(--primary)' }}>{siteData.lastname}</span>
            </h1>

            <div className="h-12 flex items-center mb-4">
              <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                I&apos;m a{' '}
                <span className="font-semibold" style={{ color: 'var(--accent)' }}>
                  {typed}<span className="typed-cursor animate-pulse">|</span>
                </span>
              </p>
            </div>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              {siteData.summary}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[{ value: '9+', label: 'Years Exp.' }, { value: '4', label: 'Countries' }, { value: '10+', label: 'Projects' }].map(s => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-3xl font-bold font-display" style={{ color: 'var(--primary)' }}>{s.value}</span>
                  <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{ background: 'var(--primary)', color: 'var(--bg)', boxShadow: '0 4px 16px color-mix(in srgb, var(--primary) 30%, transparent)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-dark)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}>
                View My Experience
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{ border: '1.5px solid var(--border-muted)', color: 'var(--text-secondary)', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-muted)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right — profile */}
          <div className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Spinning ring */}
              <div className="profile-ring absolute -inset-2 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute -inset-2 rounded-full" style={{ background: 'var(--bg)', margin: '3px' }} />
	      
              {/* Glow */}
              <div className="absolute -inset-6 rounded-full" style={{ background: 'var(--badge-bg)', filter: 'blur(20px)' }} />
              <div className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden"
                style={{ border: '2px solid var(--badge-border)', boxShadow: '0 0 40px color-mix(in srgb, var(--primary) 20%, transparent)' }}>
                <Image src="/img/profile/profile.webp" alt={siteData.name} fill className="object-cover" priority />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 rounded-xl px-4 py-2 shadow-xl"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Currently at</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Syscon Justice Systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-colors animate-bounce"
        style={{ color: 'var(--text-muted)' }} aria-label="Scroll down">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
