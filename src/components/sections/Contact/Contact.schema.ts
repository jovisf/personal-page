import { z } from 'zod'

export const createContactFormSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .refine(
        (val) => val.trim().length > 0,
        { message: t('form.errors.emailRequired') }
      )
      .refine(
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
        { message: t('form.errors.emailInvalid') }
      ),
    subject: z
      .string()
      .refine(
        (val) => val.trim().length > 0,
        { message: t('form.errors.subjectRequired') }
      ),
    message: z
      .string()
      .refine(
        (val) => val.trim().length > 0,
        { message: t('form.errors.messageRequired') }
      )
      .refine(
        (val) => val.length <= 500,
        { message: t('form.errors.messageMaxLength') }
      ),
  })
}

export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>
