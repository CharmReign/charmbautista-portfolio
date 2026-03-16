'use client'

import { useState } from 'react'
import { siteData } from '@/lib/data'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  return (
    <section id="contact" className="py-24" style={{ background: 'var(--section-alt)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-title"><h2>Contact</h2>
          <p>Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Info panel */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-7 h-full" style={{ background: 'var(--info-panel-bg)' }}>
              <h3 className="text-xl font-bold font-display mb-2" style={{ color: 'var(--text-heading)' }}>Let&apos;s Connect</h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                Open to full-time roles, consulting, and technical collaborations in Java backend development, API integration, and enterprise systems.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                    label: 'Location',
                    lines: ['Al Zahiyah, Abu Dhabi', 'United Arab Emirates'],
                  },
                  {
                    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                    label: 'Phone',
                    lines: [siteData.phone],
                  },
                  {
                    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                    label: 'Email',
                    lines: [siteData.email],
                  },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} style={{ color: 'var(--primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--detail-label)' }}>{item.label}</p>
                      {item.lines.map(line => <p key={line} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--detail-label)' }}>Find me online</p>
                <div className="flex gap-3">
                  {[
                    { href: siteData.linkedin, icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', label: 'LinkedIn' },
                    { href: siteData.github, icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22', label: 'GitHub' },
                    { href: 'mailto:' + siteData.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email' },
                  ].map(s => (
                    <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                      aria-label={s.label} className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
                      style={{ background: 'var(--social-bg)', color: 'var(--social-text)', border: '1px solid var(--border)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--bg)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--social-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--social-text)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-7">
              <h3 className="text-xl font-bold font-display mb-2" style={{ color: 'var(--text-heading)' }}>Send a Message</h3>
              <p className="text-sm mb-7" style={{ color: 'var(--text-secondary)' }}>Fill in the form and I&apos;ll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--label-text)' }}>
                      Your Name <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Marianne Mae"
                      className="form-input"
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--label-text)' }}>
                      Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="user@company.com"
                      className="form-input"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--label-text)' }}>
                    Message <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, role, or opportunity..."
                    className="form-input resize-none"
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)' }}>
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--success-text)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--success-text)' }}>Message sent successfully!</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--success-sub)' }}>You&apos;ll receive a confirmation email shortly.</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--err-bg)', border: '1px solid var(--err-border)' }}>
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--err-text)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm" style={{ color: 'var(--err-text)' }}>{errorMsg}</p>
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'var(--primary)', color: 'var(--bg)' }}
                  onMouseEnter={e => { if (status !== 'loading') (e.currentTarget.style.background = 'var(--primary-dark)') }}
                  onMouseLeave={e => { (e.currentTarget.style.background = 'var(--primary)') }}>
                  {status === 'loading' ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>Sending...</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
