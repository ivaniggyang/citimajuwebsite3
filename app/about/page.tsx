import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { getAboutPage, s } from '@/sanity/lib/fetch'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Citi Maju Group — CIDB G7 certified infrastructure contractor operating across Klang Valley.',
}

interface Entity { focus?: string; name?: string; description?: string }
interface Credential { label?: string; value?: string; description?: string }

export default async function AboutPage() {
  const page = await getAboutPage()

  const mainBody: string[] = Array.isArray(page.mainBody) && page.mainBody.length > 0 ? page.mainBody : [
    'Citi Maju Group is built on three things: technical competence, certified credibility, and consistent delivery. We do not sell aspiration — we earn trust through track record.',
    'Operating across Klang Valley, we handle large-scale water reticulation and hot tapping works, civil and structural projects for developers and main contractors, and the full range of renovation works from leak remediation to full fit-out.',
    "Our CIDB Grade G7 certification — Malaysia's highest contractor grade — reflects our capacity to undertake projects of any size. We are a company that does the work, gets it right, and delivers on time.",
  ]

  const entities: Entity[] = Array.isArray(page.entities) && page.entities.length > 0 ? page.entities : [
    { focus: 'Engineering Works', name: 'Citi Maju Engineering Sdn Bhd', description: 'Handles water reticulation, hot tapping, pipeline works, and engineering-led infrastructure projects. The primary contracting entity for Air Selangor and utility-related scopes.' },
    { focus: 'Construction Works', name: 'Citi Maju Construction Sdn Bhd', description: 'Handles civil and structural works, building renovation, metal structure fabrication, and all construction-related scopes for property developers, main contractors, and building owners.' },
  ]

  const credentials: Credential[] = Array.isArray(page.credentials) && page.credentials.length > 0 ? page.credentials : [
    { label: 'CIDB Grade', value: 'G7', description: "Malaysia's highest contractor grade." },
    { label: 'Air Selangor Approval', value: 'Active', description: 'Approved contractor for water works under Air Selangor.' },
    { label: 'SSM Registration', value: 'Active', description: 'Both entities registered with the Companies Commission of Malaysia.' },
  ]

  return (
    <>
      <PageHero eyebrow={s(page.heroEyebrow, 'About Us')} heading={s(page.heroHeading, 'Who We Are')} />

      {/* Main about */}
      <section style={{ padding: '7rem 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'start' }}>
          <div>
            <div style={{ width: '3rem', height: '1.5px', background: '#C8921A', marginBottom: '2rem' }} />
            {mainBody.map((para, i) => (
              <p key={i} style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: 1.85, color: '#3A5068', marginBottom: '1.25rem' }}>
                {para}
              </p>
            ))}
          </div>
          <div style={{ background: '#F5F2EC', padding: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '3rem', right: '3rem', height: '2px', background: '#C8921A' }} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              {s(page.pullQuoteEyebrow, 'Brand Promise')}
            </p>
            <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.3, color: '#0D1B2E', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              &ldquo;{s(page.pullQuote, 'Authoritative, not arrogant. Precise, not cold. Restrained, not dull.')}&rdquo;
            </blockquote>
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '13px', lineHeight: 1.7, color: '#3A5068' }}>
              {s(page.pullQuoteSub, 'These three principles guide how we work, how we communicate, and what we deliver.')}
            </p>
          </div>
        </div>
      </section>

      {/* Entities */}
      <section style={{ padding: '6rem 0', background: '#F7F4EF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '0.875rem' }}>
            {s(page.entitiesEyebrow, 'Our Entities')}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0D1B2E', marginBottom: '3rem', lineHeight: 1.15 }}>
            {s(page.entitiesHeading, 'One Group, Two Entities')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5px', background: 'rgba(13,27,46,0.08)' }}>
            {entities.map((e, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '2.75rem' }}>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.75rem' }}>
                  {e.focus}
                </p>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '17px', color: '#0D1B2E', marginBottom: '1rem', lineHeight: 1.35 }}>
                  {e.name}
                </h3>
                <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#3A5068' }}>
                  {e.description}
                </p>
              </div>
            ))}
          </div>
          {page.entitiesNote && (
            <p style={{ marginTop: '1.5rem', fontFamily: "'Noto Sans', sans-serif", fontSize: '13px', color: '#6B849C' }}>
              {page.entitiesNote}
            </p>
          )}
        </div>
      </section>

      {/* Credentials */}
      <section style={{ padding: '6rem 0', background: '#071E3D' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.875rem' }}>
            {s(page.credentialsEyebrow, 'Credentials')}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#ffffff', marginBottom: '3rem', lineHeight: 1.15 }}>
            {s(page.credentialsHeading, 'Our Certifications')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5px', background: 'rgba(255,255,255,0.06)' }}>
            {credentials.map((c, i) => (
              <div key={i} style={{ background: '#071E3D', padding: '2.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,241,251,0.5)' }}>
                    {c.label}
                  </p>
                  {c.value && (
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '0.08em', color: '#C8921A', background: 'rgba(200,146,26,0.12)', padding: '0.25rem 0.625rem' }}>
                      {c.value}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.7, color: 'rgba(232,241,251,0.65)' }}>
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 0', background: '#F5F2EC', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0D1B2E', marginBottom: '1rem', lineHeight: 1.15 }}>
            {s(page.ctaHeading, 'Have a project in mind?')}
          </h2>
          <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.75, color: '#3A5068', marginBottom: '2rem' }}>
            {s(page.ctaText, 'We are happy to discuss scope and feasibility. Get in touch and we will respond promptly.')}
          </p>
          <Link href={s(page.ctaButtonHref, '/contact')} style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#ffffff', background: '#1B4F8A', padding: '0.875rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
            {s(page.ctaButtonLabel, 'Contact Us')}
          </Link>
        </div>
      </section>
    </>
  )
}
