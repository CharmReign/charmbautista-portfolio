'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { siteData } from '@/lib/data'

function useInView(threshold = 0.1) {
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

export default function Testimonials() {
  const { ref, inView } = useInView()

  return (
    <section id="testimonials" className="py-24" style={{ background: '#0a1628' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="section-title" ref={ref}>
          <h2>Testimonials</h2>
          <p>What colleagues and clients say about working with {siteData.name}.</p>
        </div>

        {/* Masonry-style grid via columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-0">
          {siteData.testimonials.map((t, i) => (
            <div key={t.name}
              className={`break-inside-avoid mb-6 glass-card rounded-2xl p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                ...(t.highlight ? {
                  background: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(45,212,191,0.06))',
                  border: '1px solid rgba(20,184,166,0.22)',
                } : {}),
              }}>
              <div className="mb-3" style={{ color: 'rgba(20,184,166,0.3)' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: t.highlight ? '#a7f3d0' : '#5eead4' }}>{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: '1px solid rgba(20,184,166,0.25)' }}>
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#ccfbf1' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#5eead4' }}>{t.position}</p>
                </div>
                {t.highlight && (
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="w-3 h-3" fill="#14b8a6" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
