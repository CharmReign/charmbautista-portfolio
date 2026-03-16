'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { siteData } from '@/lib/data'

const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Banking',      value: 'filter-banking' },
  { label: 'Fintech',      value: 'filter-fintech' },
  { label: 'Government',   value: 'filter-government' },
]

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

export default function Projects() {
  const [active, setActive] = useState('all')
  const { ref, inView } = useInView()
  const filtered = siteData.projects.filter(p => active === 'all' || p.filter === active)

  return (
    <section id="projects" className="py-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-title" ref={ref}><h2>Projects</h2>
          <p>Enterprise-grade systems delivered across banking, fintech, and government sectors.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(f => (
            <button key={f.value} onClick={() => setActive(f.value)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={active === f.value
                ? { background: 'var(--primary)', color: 'var(--bg)', boxShadow: '0 4px 14px color-mix(in srgb, var(--primary) 30%, transparent)' }
                : { background: 'var(--filter-btn-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
              }>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div key={project.title}
              className={`portfolio-item group glass-card rounded-2xl overflow-hidden transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
	      
	      {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image src={project.image} alt={project.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="portfolio-overlay absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.6)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--primary)' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--bg)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: 'var(--primary)', color: 'var(--bg)' }}>{project.category}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h4 className="text-base font-bold font-display mb-2 line-clamp-1" style={{ color: 'var(--text-heading)' }}>{project.title}</h4>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded"
                      style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)', border: '1px solid var(--tag-border)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted mt-8">No projects found for this category.</p>
        )}

      </div>
    </section>
  )
}
