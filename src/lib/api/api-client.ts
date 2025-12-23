const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface RequestConfig extends Omit<RequestInit, 'body'> {
  body?: unknown
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...config.headers,
    }

    const requestConfig: RequestInit = {
      ...config,
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    }

    const response = await fetch(url, requestConfig)

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const errorMessage = errorData?.error || `API Error: ${response.status} ${response.statusText}`
      throw new Error(errorMessage)
    }

    return response.json()
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data,
    })
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data,
    })
  }
}

export const api = new ApiClient()
