'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { siteData } from '@/lib/data'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [threshold])
  return { ref, inView }
}

function TimelineItem({ item, index, inView }: { item: typeof siteData.experience[0]; index: number; inView: boolean }) {
  return (
    <div className={`relative pl-8 pb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'var(--timeline-line)' }} />
      <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full"
        style={{ background: 'var(--bg)', border: '2px solid var(--primary)', boxShadow: '0 0 8px color-mix(in srgb, var(--primary) 40%, transparent)' }} />
      <div className="glass-card rounded-xl p-5 transition-all duration-300">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
          <div>
            <h4 className="text-base font-bold font-display" style={{ color: 'var(--text-heading)' }}>{item.role}</h4>
            <p className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--primary)' }}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {item.company}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
              style={{ background: 'var(--period-bg)', color: 'var(--period-text)', border: '1px solid var(--badge-border)' }}>{item.period}</span>
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {item.location}
            </span>
          </div>
        </div>
        <ul className="space-y-1.5">
          {item.bullets.map((b, i) => (
            <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
              <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Resume() {
  const { ref, inView } = useInView()
  const skillBars = [
    { label: 'System Development', pct: 95 },
    { label: 'API Integration', pct: 93 },
    { label: 'Database Engineering', pct: 88 },
    { label: 'Cloud / DevOps', pct: 75 },
    { label: 'Team Leadership', pct: 82 },
  ]
  return (
    <section id="resume" className="py-24" style={{ background: 'var(--section-alt)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-title" ref={ref}><h2>Resume</h2>
          <p>9+ years of enterprise software engineering across banking, fintech, and government sectors.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <div className={`lg:col-span-1 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="glass-card rounded-2xl overflow-hidden sticky top-8">
              {/* Profile image */}
              <div className="relative h-40">
                <Image src="/img/profile/profile3.webp" alt={siteData.name} fill className="object-cover object-top" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-2) 0%, transparent 60%)' }} />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold font-display mb-1" style={{ color: 'var(--text-heading)' }}>Professional Summary</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Java Engineer with 9+ years building enterprise applications in banking, fintech, and government.
                </p>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--label-text)' }}>Contact</h3>
                <ul className="space-y-2 mb-6">
                  {[
                    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'Al Zahiyah, Abu Dhabi, UAE' },
                    { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: siteData.email },
                    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: siteData.phone },
                  ].map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                      </svg>
                      {c.text}
                    </li>
                  ))}
                </ul>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--label-text)' }}>Key Skills</h3>
                <div className="space-y-3">
                  {skillBars.map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{s.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--skill-track)' }}>
                        <div className="skill-bar-fill" style={{ width: inView ? `${s.pct}%` : '0%', transition: inView ? 'width 1.4s cubic-bezier(0.4,0,0.2,1)' : 'none' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--label-text)' }}>Education</h3>
                  {siteData.education.map(e => (
                    <div key={e.degree}>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>{e.degree}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{e.school}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{e.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-heading)' }}>Professional Experience</h3>
            </div>
            <div className="relative">
              {siteData.experience.map((exp, i) => <TimelineItem key={i} item={exp} index={i} inView={inView} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
