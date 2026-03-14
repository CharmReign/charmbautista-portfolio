'use client'

import { siteData } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="py-10" style={{ background: '#0a1628', borderTop: '1px solid rgba(19,78,74,0.4)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-display font-bold mb-2">
              <span style={{ color: '#ccfbf1' }}>{siteData.firstname}</span><span style={{ color: '#14b8a6' }}>{siteData.lastname}</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#5eead4' }}>
              Senior Java / Software Engineer specializing in enterprise banking, fintech, and government systems.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#a7f3d0' }}>Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Resume', 'Projects', 'Contact'].map(link => (
                <li key={link}>
                  <button onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm transition-colors duration-200" style={{ color: '#5eead4' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#14b8a6')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#5eead4')}>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#a7f3d0' }}>Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm" style={{ color: '#5eead4' }}>{siteData.phone}</li>
              <li className="text-sm" style={{ color: '#5eead4' }}>{siteData.email}</li>
              <li className="text-sm" style={{ color: '#5eead4' }}>{siteData.location}</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {[
                { href: siteData.linkedin, label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                { href: siteData.github,   label: 'GitHub',   icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{ background: 'rgba(19,78,74,0.4)', color: '#5eead4' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#14b8a6'; (e.currentTarget as HTMLElement).style.color = '#0a1628' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(19,78,74,0.4)'; (e.currentTarget as HTMLElement).style.color = '#5eead4' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 text-center" style={{ borderTop: '1px solid rgba(19,78,74,0.4)' }}>
          <p className="text-xs" style={{ color: '#134e4a' }}>
            © {year} <span style={{ color: '#5eead4' }}>CharmReign</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
