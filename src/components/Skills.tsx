'use client'

import { useEffect, useRef, useState } from 'react'
import { siteData } from '@/lib/data'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [threshold])
  return { ref, inView }
}

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: '#a7f3d0' }}>{name}</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ color: '#14b8a6', background: 'rgba(20,184,166,0.1)' }}>{level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(19,78,74,0.4)' }}>
        <div className="skill-bar-fill" style={{
          '--target-width': `${level}%`,
          width: animate ? `${level}%` : '0%',
          transition: animate ? 'width 1.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
        } as React.CSSProperties} />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView()
  return (
    <section id="skills" className="py-24" style={{ background: '#0a1628' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-title" ref={ref}><h2>Skills</h2><p>9+ years of hands-on expertise across the full enterprise Java stack.</p></div>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {siteData.competencies.slice(0, 12).map(badge => (
            <span key={badge} className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-default"
              style={{ background: 'rgba(13,30,51,0.8)', border: '1px solid rgba(19,78,74,0.6)', color: '#5eead4' }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Skill bars grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {siteData.skills.map((group, gi) => (
            <div key={group.category}
              className={`glass-card rounded-2xl p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${gi * 100}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 rounded-full" style={{ background: '#14b8a6' }} />
                <h3 className="text-base font-semibold font-display" style={{ color: '#ccfbf1' }}>{group.category}</h3>
              </div>
              {group.items.map(skill => <SkillBar key={skill.name} name={skill.name} level={skill.level} animate={inView} />)}
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-10" style={{ color: '#134e4a' }}>
          Percentages reflect confidence &amp; production experience, not absolute skill rankings.
        </p>
      </div>
    </section>
  )
}
