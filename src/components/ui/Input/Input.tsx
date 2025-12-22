'use client'

import { cn } from '@/lib/utils'
import type { InputProps } from './Input.types'

export function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-tilda font-bold text-sm uppercase tracking-wide text-light-text dark:text-dark-text">
          {label}
        </label>
      )}
      <input
        {...props}
        className={cn(
          'w-full px-4 py-3 font-tilda font-medium text-base',
          'bg-light-surface dark:bg-dark-surface',
          'text-light-text dark:text-dark-text',
          'border-3 border-light-primary-accent dark:border-dark-primary-accent',
          'focus:outline-none focus:border-4',
          'transition-all duration-200',
          'placeholder:text-light-text/50 dark:placeholder:text-dark-text/50',
          error && 'border-red-500 dark:border-red-400',
          className
        )}
      />
      {error && (
        <p className="mt-1 text-sm font-tilda font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
