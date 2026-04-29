import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Citi Maju Group — CIDB G7 certified infrastructure contractor operating across Klang Valley.',
}

const credentials = [
  { label: 'CIDB Grade', value: 'G7', description: "Malaysia's highest contractor grade, qualifying CMG for government and large-scale private projects without limit on contract value." },
  { label: 'Air Selangor Approval', value: 'Active', description: 'Approved contractor for water works under Pengurusan Air Selangor Sdn Bhd (Air Selangor). Required for all water reticulation works in Selangor.' },
  { label: 'SSM Registration', value: 'Active', description: 'Both Citi Maju Engineering Sdn Bhd and Citi Maju Construction Sdn Bhd are registered with the Companies Commission of Malaysia.' },
  { label: 'CIDB Registration', value: 'Active', description: 'Registered with the Construction Industry Development Board Malaysia under the relevant categories of work.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CMG"
        heading="Who We Are"
      />

      {/* Main about */}
      <section style={{ padding: '6rem 0', background: '#ffffff' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ width: '3rem', height: '1.5px', background: '#C8921A', marginBottom: '2rem' }} />
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#3A5068', marginBottom: '1.25rem' }}>
              Citi Maju Group is built on three things: technical competence, certified credibility, and consistent delivery. We do not sell aspiration — we earn trust through track record.
            </p>
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#3A5068', marginBottom: '1.25rem' }}>
              Operating across Klang Valley, we handle large-scale water reticulation and hot tapping works for Air Selangor, civil and structural projects for developers and main contractors, and the full range of renovation works from leak remediation to full fit-out.
            </p>
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#3A5068' }}>
              Our CIDB Grade G7 certification — Malaysia's highest contractor grade — reflects our capacity to undertake projects of any size. We are a company that does the work, gets it right, and delivers on time.
            </p>
          </div>
          <div style={{ background: '#F5F2EC', padding: '2.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '2.5rem', right: '2.5rem', height: '2px', background: '#C8921A' }} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              Brand Promise
            </p>
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                lineHeight: 1.3,
                color: '#0D1B2E',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}
            >
              "Authoritative, not arrogant. Precise, not cold. Restrained, not dull."
            </blockquote>
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '13px', lineHeight: 1.7, color: '#3A5068' }}>
              These three principles guide how we work, how we communicate, and what we deliver.
            </p>
          </div>
        </div>
      </section>

      {/* Two entities */}
      <section style={{ padding: '5rem 0', background: '#F7F4EF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '0.75rem' }}>
            Our Entities
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0D1B2E', marginBottom: '3rem' }}>
            One Group, Two Entities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5px', background: 'rgba(13,27,46,0.08)' }}>
            {[
              {
                name: 'Citi Maju Engineering Sdn Bhd',
                focus: 'Engineering Works',
                description: 'Handles water reticulation, hot tapping, pipeline works, and engineering-led infrastructure projects. The primary contracting entity for Air Selangor and utility-related scopes.',
              },
              {
                name: 'Citi Maju Construction Sdn Bhd',
                focus: 'Construction Works',
                description: 'Handles civil and structural works, building renovation, metal structure fabrication, and all construction-related scopes for property developers, main contractors, and building owners.',
              },
            ].map(({ name, focus, description }) => (
              <div key={name} style={{ background: '#ffffff', padding: '2.5rem' }}>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.75rem' }}>
                  {focus}
                </p>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '16px', color: '#0D1B2E', marginBottom: '1rem', lineHeight: 1.35 }}>
                  {name}
                </h3>
                <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#3A5068' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.5rem', fontFamily: "'Noto Sans', sans-serif", fontSize: '13px', color: '#6B849C' }}>
            In all public-facing contexts, these entities operate as one group — Citi Maju Group.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ padding: '5rem 0', background: '#071E3D' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.75rem' }}>
            Credentials
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#ffffff', marginBottom: '3rem' }}>
            Our Certifications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5px', background: 'rgba(255,255,255,0.06)' }}>
            {credentials.map(({ label, value, description }) => (
              <div key={label} style={{ background: '#071E3D', padding: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,241,251,0.5)' }}>
                    {label}
                  </p>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '11px', letterSpacing: '0.08em', color: '#C8921A', background: 'rgba(200,146,26,0.12)', padding: '0.2rem 0.6rem' }}>
                    {value}
                  </span>
                </div>
                <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.7, color: 'rgba(232,241,251,0.65)' }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: '#F5F2EC', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#0D1B2E', marginBottom: '1rem' }}>
            Have a project in mind?
          </h2>
          <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.75, color: '#3A5068', marginBottom: '2rem' }}>
            We are happy to discuss scope and feasibility. Get in touch and we will respond promptly.
          </p>
          <Link
            href="/contact"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '#ffffff',
              background: '#1B4F8A',
              padding: '0.875rem 2.5rem',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
