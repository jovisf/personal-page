'use client'

import { cn } from '@/lib/utils'
import type { ButtonProps } from './Button.types'

const variants = {
  primary: 'bg-light-primary-accent dark:bg-dark-primary-accent text-light-background dark:text-dark-background',
  secondary: 'bg-light-secondary-accent dark:bg-dark-secondary-accent',
  outline: 'border-2 border-light-primary-accent dark:border-dark-primary-accent bg-transparent',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'font-tilda font-bold uppercase tracking-wide transition-all',
        'hover:border-4 hover:shadow-[4px_4px_0px_0px]',
        'hover:shadow-light-text dark:hover:shadow-dark-text',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}
