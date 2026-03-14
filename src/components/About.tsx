'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { siteData } from '@/lib/data'

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  
  return <span ref={ref} className="counter-num text-4xl font-bold font-display" style={{ color: '#ccfbf1' }}>{count}{suffix}</span>
}

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-24" style={{ background: 'rgba(13,30,51,0.5)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section title */}
        <div className="section-title" ref={ref}>
          <h2>About Me</h2>
          <p>Senior Java Engineer specializing in enterprise banking, fintech, and government systems.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Profile card */}
          <div className={`lg:col-span-2 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Card header image */}
              <div className="relative h-48 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(45,212,191,0.08))' }}>
                <div className="relative w-28 h-28 rounded-full overflow-hidden"
                  style={{ border: '3px solid rgba(20,184,166,0.3)', boxShadow: '0 0 24px rgba(20,184,166,0.2)' }}>
                  <Image src="/img/profile/profile2.webp" alt={siteData.name} fill className="object-cover" />
                </div>
                {/* Verified badge */}
                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: '#14b8a6' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0a1628' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-display mb-1" style={{ color: '#ccfbf1' }}>{siteData.name}</h3>
                <p className="text-sm font-medium mb-5" style={{ color: '#14b8a6' }}>Senior Java / Software Engineer</p>
                <ul className="space-y-3">
                  {[
                    { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: siteData.email },
                    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: siteData.phone },
                    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: siteData.location },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center mt-0.5"
                        style={{ background: 'rgba(19,78,74,0.5)' }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: '#14b8a6' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-sm break-all" style={{ color: '#a7f3d0' }}>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.25)', color: '#14b8a6' }}>
                  {siteData.linkedin}
                </a>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            <div className="mb-2">
              <span className="text-sm font-medium uppercase tracking-widest" style={{ color: '#14b8a6' }}>Get to Know Me</span>
            </div>
            <h3 className="text-3xl font-bold font-display leading-snug mb-4">
              <span style={{ color: '#ccfbf1' }}>Passionate About Building</span><br />
              <span style={{ color: '#5eead4' }}>Reliable Enterprise Systems</span>
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: '#5eead4' }}>{siteData.summary}</p>
            <p className="leading-relaxed mb-8" style={{ color: '#5eead4' }}>
              Over 9 years, I&apos;ve delivered production-grade software across four countries — contributing to national banking infrastructure, government justice platforms, loan management systems, and correctional management solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {siteData.stats.slice(0, 3).map(stat => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: '#5eead4' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Specialization', value: 'Java / Spring Boot Backend' },
                { label: 'Experience', value: '9+ Years (Senior Level)' },
                { label: 'Education', value: 'B.S. Information Technology' },
                { label: 'Languages', value: 'English, Filipino' },
              ].map(d => (
                <div key={d.label} className="flex flex-col gap-0.5">
                  <span className="text-xs uppercase tracking-wider" style={{ color: '#134e4a' }}>{d.label}</span>
                  <span className="text-sm font-medium" style={{ color: '#a7f3d0' }}>{d.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{ background: '#14b8a6', color: '#0a1628', boxShadow: '0 4px 16px rgba(20,184,166,0.25)' }}>
                Get In Touch
              </button>
              <button onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ border: '1px solid rgba(20,184,166,0.3)', color: '#5eead4', background: 'transparent' }}>
                View Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
