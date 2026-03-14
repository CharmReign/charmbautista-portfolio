'use client'

import { useRef, useEffect, useState } from 'react'
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

export default function Services() {
  const { ref, inView } = useInView()
  return (
    <section id="services" className="py-24" style={{ background: 'rgba(13,30,51,0.5)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-title" ref={ref}><h2>Services</h2>
          <p>Enterprise software solutions built with precision, reliability, and long-term maintainability.</p>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-3xl xl:text-4xl font-bold font-display leading-tight">
              <span style={{ color: '#ccfbf1' }}>Enterprise software solutions</span><br />
              <span style={{ color: '#14b8a6' }}>built to last</span>
            </h3>
          </div>
          <div className={`transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="leading-relaxed mb-4" style={{ color: '#5eead4' }}>
              I integrate rigorous engineering discipline, production-tested patterns, and deep domain knowledge to deliver software that is reliable, scalable, and maintainable across industries.
            </p>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-sm font-medium group transition-colors"
              style={{ color: '#14b8a6' }}>
              Get in touch
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.services.map((service, i) => (
            <div key={service.title}
              className={`service-card glass-card rounded-2xl p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: '#14b8a6' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
              </div>

              {/* Arrow button */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-bold font-display leading-snug">
                  <span style={{ color: '#ccfbf1' }}>{service.title} </span>
                  <span style={{ color: '#14b8a6' }}>{service.highlight}</span>
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#5eead4' }}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
