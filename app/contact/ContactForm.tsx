'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: "'Noto Sans', sans-serif",
  fontSize: '14px',
  color: '#0D1B2E',
  background: '#F5F2EC',
  border: '1px solid transparent',
  borderBottom: '1px solid rgba(13,27,46,0.15)',
  padding: '0.75rem 0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Sora', sans-serif",
  fontWeight: 300,
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#3A5068',
  marginBottom: '0.4rem',
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '3rem',
          background: '#F5F2EC',
          borderTop: '3px solid #C8921A',
          textAlign: 'center',
        }}
      >
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.75rem', color: '#0D1B2E', marginBottom: '0.75rem' }}>
          Thank you.
        </p>
        <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.75, color: '#3A5068' }}>
          Your inquiry has been received. We will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={labelStyle} htmlFor="name">Full Name *</label>
          <input
            id="name"
            style={{ ...inputStyle, borderColor: errors.name ? '#c0392b' : 'transparent' }}
            placeholder="Your name"
            {...register('name', { required: true })}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="company">Company</label>
          <input id="company" style={inputStyle} placeholder="Company name" {...register('company')} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={labelStyle} htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            style={{ ...inputStyle, borderColor: errors.email ? '#c0392b' : 'transparent' }}
            placeholder="you@company.com"
            {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" style={inputStyle} placeholder="+60 12-XXX XXXX" {...register('phone')} />
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={labelStyle} htmlFor="subject">Subject *</label>
        <input
          id="subject"
          style={{ ...inputStyle, borderColor: errors.subject ? '#c0392b' : 'transparent' }}
          placeholder="e.g. Water reticulation project inquiry"
          {...register('subject', { required: true })}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle} htmlFor="message">Message *</label>
        <textarea
          id="message"
          rows={6}
          style={{
            ...inputStyle,
            resize: 'vertical',
            borderColor: errors.message ? '#c0392b' : 'transparent',
          }}
          placeholder="Please describe your project scope, location, and timeline."
          {...register('message', { required: true, minLength: 20 })}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '13px', color: '#c0392b', marginBottom: '1.25rem' }}>
          Something went wrong. Please try again or contact us directly at inquiry@citimaju.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '0.06em',
          color: '#ffffff',
          background: status === 'submitting' ? '#6B849C' : '#1B4F8A',
          border: 'none',
          padding: '0.875rem 2.5rem',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          width: '100%',
        }}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  )
}
