'use client'

import { useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { preferences } from '@/lib/preferences'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Toast } from '@/components/ui/Toast'
import type { ToastType } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'
import { contactService } from '@/services/contact.service'
import type { ContactProps } from './Contact.types'
import { createContactFormSchema } from './Contact.schema'
import type { ContactFormData } from './Contact.schema'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  },
}

interface FormErrors {
  email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function Contact({ className }: ContactProps) {
  const t = useTranslations('contact')
  const [ref, isVisible] = useScrollObserver<HTMLElement>({ threshold: 0.3 })

  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const closeToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    const savedEmail = preferences.getEmail()
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }))
    }
  }, [])

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isVisible ? 'visible' : 'hidden' }

  const validateForm = (): boolean => {
    const schema = createContactFormSchema(t)
    const result = schema.safeParse(formData)

    if (!result.success) {
      const newErrors: FormErrors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors
        if (!newErrors[field]) {
          newErrors[field] = issue.message
        }
      })
      setErrors(newErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    if (status === 'loading') return

    setStatus('loading')

    try {
      await contactService.sendEmail(formData)
      setStatus('success')

      preferences.setEmail(formData.email)

      setFormData({ email: formData.email, subject: '', message: '' })
      setErrors({})
      setToast({ message: t('form.successMessage'), type: 'success' })
    } catch (error) {
      setStatus('error')

      const errorMessage = error instanceof Error && error.message.includes('Too many requests')
        ? error.message
        : t('form.errorMessage')

      setToast({ message: errorMessage, type: 'error' })
    } finally {
      setTimeout(() => setStatus('idle'), 500)
    }
  }

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={cn(
        'relative py-20 md:py-32',
        'bg-light-background dark:bg-dark-background',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Title */}
          <motion.h2
            {...animationProps}
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight mb-8 text-light-text dark:text-dark-text"
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            {...animationProps}
            variants={fadeInUp}
            className="font-medium text-lg md:text-xl leading-relaxed mb-12 text-light-text dark:text-dark-text"
          >
            {t('description')}
          </motion.p>

          {/* Contact Form */}
          <motion.form
            {...animationProps}
            variants={fadeInUp}
            onSubmit={handleSubmit}
            noValidate
            className="max-w-2xl mx-auto space-y-6"
          >
            {/* Email and Subject in same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="email"
                label={t('form.emailLabel')}
                placeholder={t('form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
              />

              <Input
                type="text"
                label={t('form.subjectLabel')}
                placeholder={t('form.subjectPlaceholder')}
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                error={errors.subject}
              />
            </div>

            <Textarea
              label={t('form.messageLabel')}
              placeholder={t('form.messagePlaceholder')}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              error={errors.message}
              maxLength={500}
              showCounter
              rows={6}
            />

            <div className="flex justify-center pt-4">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? t('form.sendingButton') : t('form.submitButton')}
              </Button>
            </div>
          </motion.form>

          {/* Toast notification */}
          <Toast
            message={toast?.message || ''}
            type={toast?.type || 'success'}
            isVisible={!!toast}
            onClose={closeToast}
          />

          {/* Geometric decoration */}
          <div className="relative mt-16">
            <motion.div
              {...animationProps}
              variants={fadeInUp}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-16 h-1 bg-light-primary-accent dark:bg-dark-primary-accent" />
              <div className="w-4 h-4 bg-light-secondary-accent dark:bg-dark-secondary-accent rotate-45" />
              <div className="w-16 h-1 bg-light-primary-accent dark:bg-dark-primary-accent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
