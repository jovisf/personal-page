import { api } from '@/lib/api'

export interface SendContactEmailData {
  email: string
  subject: string
  message: string
}

export interface SendContactEmailResponse {
  success: boolean
}


const EMAIL_URL = "/api/contact"

export const contactService = {
  async sendEmail(data: SendContactEmailData): Promise<SendContactEmailResponse> {
    return api.post<SendContactEmailResponse>(EMAIL_URL, data)
  },
}
