const messages = {
  'pt-BR': {
    tooManyRequests: 'Muitas tentativas. Por favor, tente novamente em',
    invalidFormData: 'Dados do formulário inválidos',
    failedToSendEmail: 'Falha ao enviar e-mail',
    internalServerError: 'Erro interno do servidor',
    hour: 'hora',
    hours: 'horas',
    minute: 'minuto',
    minutes: 'minutos',
    second: 'segundo',
    seconds: 'segundos',
  },
  en: {
    tooManyRequests: 'Too many requests. Please try again in',
    invalidFormData: 'Invalid form data',
    failedToSendEmail: 'Failed to send email',
    internalServerError: 'Internal server error',
    hour: 'hour',
    hours: 'hours',
    minute: 'minute',
    minutes: 'minutes',
    second: 'second',
    seconds: 'seconds',
  },
} as const

type Locale = keyof typeof messages
type MessageKey = keyof typeof messages['en']

export function getLocaleFromRequest(request: Request): Locale {
  const acceptLanguage = request.headers.get('accept-language') || 'en'
  const locale = acceptLanguage.split(',')[0].split('-')[0]
  return locale === 'pt' ? 'pt-BR' : 'en'
}

export function getApiMessage(locale: Locale, key: MessageKey): string {
  return messages[locale][key]
}

export function formatTimeMessage(locale: Locale, hours: number, minutes: number, seconds: number): string {
  if (hours >= 1) {
    const unit = hours > 1 ? getApiMessage(locale, 'hours') : getApiMessage(locale, 'hour')
    return `${hours} ${unit}`
  } else if (minutes >= 1) {
    const unit = minutes > 1 ? getApiMessage(locale, 'minutes') : getApiMessage(locale, 'minute')
    return `${minutes} ${unit}`
  } else {
    const unit = seconds > 1 ? getApiMessage(locale, 'seconds') : getApiMessage(locale, 'second')
    return `${seconds} ${unit}`
  }
}
