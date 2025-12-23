'use client'

import { cn } from '@/lib/utils'
import type { TextareaProps } from './Textarea.types'

export function Textarea({
  label,
  error,
  maxLength,
  showCounter = false,
  className,
  value,
  ...props
}: TextareaProps) {
  const currentLength = typeof value === 'string' ? value.length : 0

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-bold text-sm uppercase tracking-wide text-light-text dark:text-dark-text">
          {label}
        </label>
      )}
      <textarea
        {...props}
        value={value}
        maxLength={maxLength}
        className={cn(
          'w-full px-4 py-3 font-medium text-base',
          'bg-light-surface dark:bg-dark-surface',
          'text-light-text dark:text-dark-text',
          'border-3 border-light-primary-accent dark:border-dark-primary-accent',
          'focus:outline-none focus:border-4',
          'transition-all duration-200',
          'placeholder:text-light-text/50 dark:placeholder:text-dark-text/50',
          'resize-none',
          error && 'border-red-500 dark:border-red-400',
          className
        )}
      />
      <div className="flex items-center justify-between mt-1">
        {error && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
        {showCounter && maxLength && (
          <p className={cn(
            'text-sm font-medium ml-auto',
            currentLength > maxLength * 0.9
              ? 'text-red-500 dark:text-red-400'
              : 'text-light-text/70 dark:text-dark-text/70'
          )}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
