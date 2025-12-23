interface RateLimitStore {
  count: number
  resetTime: number
  blocked: boolean
}

const store = new Map<string, RateLimitStore>()

interface RateLimitConfig {
  interval: number
  maxRequests: number
  blockDuration?: number
}

export function rateLimit(config: RateLimitConfig) {
  const { interval, maxRequests, blockDuration = 2 * 60 * 60 * 1000 } = config

  return {
    check: (identifier: string): { success: boolean; remaining: number; resetTime: number } => {
      const now = Date.now()
      const record = store.get(identifier)

      if (!record || now > record.resetTime) {
        const resetTime = now + interval
        store.set(identifier, { count: 1, resetTime, blocked: false })
        return { success: true, remaining: maxRequests - 1, resetTime }
      }

      if (record.blocked) {
        return { success: false, remaining: 0, resetTime: record.resetTime }
      }

      if (record.count >= maxRequests) {
        const blockResetTime = now + blockDuration
        store.set(identifier, { ...record, blocked: true, resetTime: blockResetTime })
        return { success: false, remaining: 0, resetTime: blockResetTime }
      }

      record.count++
      store.set(identifier, record)
      return { success: true, remaining: maxRequests - record.count, resetTime: record.resetTime }
    },

    reset: (identifier: string): void => {
      store.delete(identifier)
    },
  }
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}
