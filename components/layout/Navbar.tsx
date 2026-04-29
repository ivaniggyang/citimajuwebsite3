'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'

interface NavSettings {
  navAbout?: string
  navServices?: string
  navProjects?: string
  navContact?: string
  navCtaLabel?: string
}

export function Navbar({ settings }: { settings: NavSettings }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const transparent = isHome && !scrolled && !menuOpen

  const navLinks = [
    { href: '/about', label: settings.navAbout || 'About' },
    { href: '/services', label: settings.navServices || 'Services' },
    { href: '/projects', label: settings.navProjects || 'Projects' },
    { href: '/contact', label: settings.navContact || 'Contact' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, box-shadow 0.3s',
        background: transparent ? 'transparent' : '#071E3D',
        boxShadow: transparent ? 'none' : '0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '88px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo variant="white" size="md" />

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hide-mobile">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                letterSpacing: '0.06em',
                color: pathname === href ? '#C8921A' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === href ? '#C8921A' : 'rgba(255,255,255,0.85)')}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '#071E3D',
              background: '#C8921A',
              padding: '0.625rem 1.5rem',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#DBA830')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C8921A')}
          >
            {settings.navCtaLabel || 'Get In Touch'}
          </Link>
        </nav>

        <button
          className="show-mobile"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: '#ffffff',
                transition: 'transform 0.2s, opacity 0.2s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 1 ? 'scaleX(0)'
                  : 'translateY(-6.5px) rotate(-45deg)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: '#071E3D', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 2rem 2rem' }}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'block',
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                letterSpacing: '0.04em',
                color: pathname === href ? '#C8921A' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              marginTop: '1.5rem',
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '#071E3D',
              background: '#C8921A',
              padding: '0.625rem 1.5rem',
              textDecoration: 'none',
            }}
          >
            {settings.navCtaLabel || 'Get In Touch'}
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hide-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </header>
  )
}
