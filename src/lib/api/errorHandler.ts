// src/lib/api/errorHandler.ts
export const handleApiError = (error: unknown) => {
    if (error instanceof Error) {
      console.error('API Error:', error.message)
      return { error: error.message }
    }
    return { error: 'Unknown error occurred' }
  }