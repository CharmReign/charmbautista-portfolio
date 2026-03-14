'use client'

import { useState, useEffect } from 'react'
import { siteData } from '@/lib/data'

const navItems = [
  { href: '#hero',     label: 'Home',     icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '#about',    label: 'About',    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { href: '#skills',   label: 'Skills',   icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { href: '#resume',   label: 'Resume',   icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { href: '#projects', label: 'Projects', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '#services', label: 'Services', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { href: '#contact',  label: 'Contact',  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

const socialLinks = [
  { href: siteData.linkedin,          label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
  { href: siteData.github,            label: 'GitHub',   icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
  { href: 'mailto:' + siteData.email, label: 'Email',    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const ids = navItems.map(n => n.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="xl:hidden fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 py-3 border-b"
        style={{ background: '#0a1628', borderColor: '#134e4a' }}>
        <span className="font-bold text-lg tracking-wide" style={{ color: '#ccfbf1' }}>
          {siteData.firstname} <span style={{ color: '#14b8a6' }}>{siteData.lastname}</span>
        </span>
        <button type="button" onClick={() => setMobileOpen(p => !p)}
          className="p-1 transition-colors" style={{ color: '#5eead4' }} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-[55]"
          style={{ background: 'rgba(10,22,40,0.75)' }}
          onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        style={{ zIndex: mobileOpen ? 56 : 40, background: '#0a1628', borderColor: 'rgba(20,184,166,0.2)' }}
        className={[
          'fixed top-0 left-0 h-full w-64 border-r flex flex-col py-8',
          'transition-transform duration-300 ease-in-out xl:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="px-6 mb-8 flex-shrink-0">
          <a href="#hero" onClick={e => handleNavClick(e, 'hero')} className="block">
            <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#ccfbf1' }}>
              {siteData.firstname} <span style={{ color: '#14b8a6' }}>{siteData.lastname}</span>
            </h1>
            <p className="text-[11px] mt-0.5 tracking-widest uppercase" style={{ color: '#5eead4' }}>
              Senior Java Backend Engineer
            </p>
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3">
          <ul className="space-y-0.5">
            {navItems.map(item => {
              const id = item.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={e => handleNavClick(e, id)}
                    style={{
                      background:   isActive ? 'rgba(20,184,166,0.12)' : 'transparent',
                      color:        isActive ? '#ccfbf1' : '#5eead4',
                    }}
                    className="relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer select-none hover:bg-teal-900/30"
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                        style={{ background: '#14b8a6' }} />
                    )}
                    <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={1.8}
                      style={{ color: isActive ? '#14b8a6' : '#134e4a' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Social links */}
        <div className="px-6 mt-6 flex-shrink-0">
          <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: '#134e4a' }}>Connect</p>
          <div className="flex items-center gap-2">
            {socialLinks.map(s => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer" aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
                style={{ background: 'rgba(19,78,74,0.4)', color: '#5eead4' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#14b8a6'; (e.currentTarget as HTMLElement).style.color = '#0a1628' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(19,78,74,0.4)'; (e.currentTarget as HTMLElement).style.color = '#5eead4' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
