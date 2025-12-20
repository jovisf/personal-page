# Prompt de Desenvolvimento Técnico - Portfólio Fullstack Developer

## Visão Geral do Projeto

Desenvolvimento de um site portfólio pessoal para um desenvolvedor Fullstack utilizando arquitetura moderna com Next.js 14+ (App Router), TypeScript e Tailwind CSS. O projeto deve demonstrar excelência técnica, boas práticas de engenharia de software e servir como vitrine profissional para processos seletivos.

---

## Stack Tecnológica

### Core
- **Framework:** Next.js 14+ com App Router
- **Linguagem:** TypeScript (strict mode)
- **Estilização:** Tailwind CSS v3.4+
- **Internacionalização:** next-intl
- **Animações:** Framer Motion

### Ferramentas de Desenvolvimento
- **Linting:** ESLint com configuração strict
- **Formatação:** Prettier
- **Commits:** Conventional Commits (opcional: Husky + lint-staged)

---

## Arquitetura de Diretórios

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── fonts/
│       └── TildaSans/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   ├── Card/
│   │   └── ...
│   ├── sections/
│   │   ├── Hero/
│   │   ├── Stack/
│   │   ├── Projects/
│   │   ├── About/
│   │   └── Contact/
│   └── layout/
│       ├── Header/
│       ├── Footer/
│       └── Navigation/
├── hooks/
│   ├── useScrollObserver.ts
│   ├── useTheme.ts
│   └── useLocale.ts
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── styles/
│   └── themes/
│       └── tokens.ts
├── types/
│   └── index.ts
├── i18n/
│   ├── config.ts
│   └── request.ts
└── messages/
    ├── en.json
    └── pt-BR.json
```

---

## Sistema de Tokens de Design

### Configuração Tailwind (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light Mode - Greeny Pastel
        light: {
          background: '#E9F5DB',
          'primary-accent': '#718355',
          'secondary-accent': '#B5C99A',
          surface: '#CFE1B9',
          text: '#021024',
        },
        // Dark Mode - Deep Aurora Night
        dark: {
          background: '#021024',
          'primary-accent': '#C1E8FF',
          'secondary-accent': '#5483B3',
          surface: '#052659',
          text: '#E9F5DB',
        },
      },
      fontFamily: {
        tilda: ['var(--font-tilda-sans)', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
    },
  },
  plugins: [],
}

export default config
```

### CSS Variables (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: #E9F5DB;
    --color-primary-accent: #718355;
    --color-secondary-accent: #B5C99A;
    --color-surface: #CFE1B9;
    --color-text: #021024;
  }

  .dark {
    --color-background: #021024;
    --color-primary-accent: #C1E8FF;
    --color-secondary-accent: #5483B3;
    --color-surface: #052659;
    --color-text: #E9F5DB;
  }

  body {
    @apply bg-[var(--color-background)] text-[var(--color-text)] font-tilda;
  }
}
```

---

## Regras de Desenvolvimento

### 1. Código em Inglês
- Todo código, incluindo variáveis, funções, componentes, comentários e commits devem ser escritos em inglês
- Exceção: arquivos de tradução contêm texto em múltiplos idiomas

### 2. Internacionalização (i18n)

**Estrutura de mensagens (messages/en.json):**
```json
{
  "hero": {
    "title": "FULLSTACK",
    "subtitle": "Developer",
    "cta": "View Projects"
  },
  "navigation": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "contact": "Contact"
  },
  "stack": {
    "title": "Tech Stack",
    "years": "{count} years"
  }
}
```

**Uso em componentes:**
```typescript
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')
  
  return (
    <h1>{t('title')}</h1>
  )
}
```

### 3. Sistema de Cores Centralizado
- Nunca utilizar valores hexadecimais diretamente nos componentes
- Sempre referenciar tokens via Tailwind classes ou CSS variables
- Exemplo correto: `className="bg-light-background dark:bg-dark-background"`
- Exemplo incorreto: `className="bg-[#E9F5DB]"`

### 4. Hook useScrollObserver

```typescript
import { useEffect, useRef, useState, RefObject } from 'react'

interface ScrollObserverOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollObserver<T extends HTMLElement>(
  options: ScrollObserverOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '0px' } = options
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [elementRef, isVisible]
}
```

### 5. Padrão de Componentes

```typescript
// components/ui/Button/Button.types.ts
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

// components/ui/Button/Button.tsx
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

// components/ui/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'
```

### 6. Utility Function (lib/utils.ts)

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Diretrizes de Animação (Framer Motion)

### Parallax Block Shifting
```typescript
import { motion, useScroll, useTransform } from 'framer-motion'

export function ParallaxBlock({ children, speed = 0.5 }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed])

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  )
}
```

### Diagonal Slide-In
```typescript
const diagonalSlideIn = {
  hidden: { x: -100, y: -100, opacity: 0 },
  visible: { 
    x: 0, 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
}
```

### Hover Effects (Instant Color Inversion)
```typescript
const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1,
    transition: { duration: 0 } // Instant, no fade
  },
}
```

---

## Regras de Tipografia

```css
/* Headlines */
.headline {
  @apply font-tilda font-extrabold uppercase tracking-tight;
}

.headline-xl {
  @apply headline text-6xl md:text-8xl lg:text-9xl;
}

.headline-lg {
  @apply headline text-4xl md:text-5xl lg:text-6xl;
}

/* Body */
.body-text {
  @apply font-tilda font-medium text-base leading-relaxed;
}

.code-text {
  @apply font-mono text-sm;
}
```

---

## Componente Stack Display (Círculos de Experiência)

```typescript
interface StackItemProps {
  name: string
  icon: React.ReactNode
  yearsExperience: number
  maxYears?: number
}

export function StackItem({ 
  name, 
  icon, 
  yearsExperience, 
  maxYears = 5 
}: StackItemProps) {
  const fillPercentage = (yearsExperience / maxYears) * 100

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 rounded-full border-2 border-light-primary-accent dark:border-dark-primary-accent overflow-hidden">
        {/* Background fill based on experience */}
        <div 
          className="absolute bottom-0 w-full bg-light-primary-accent dark:bg-dark-primary-accent transition-all"
          style={{ height: `${fillPercentage}%` }}
        />
        {/* Icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <span className="font-tilda font-bold uppercase text-sm">{name}</span>
    </div>
  )
}
```

---

## Checklist de Qualidade

### Antes de cada commit:
- [ ] Código em inglês (variáveis, funções, comentários)
- [ ] Nenhum valor de cor hardcoded
- [ ] Textos extraídos para arquivos i18n
- [ ] Componente tipado com TypeScript
- [ ] Responsividade testada (mobile-first)
- [ ] Dark mode funcionando
- [ ] Acessibilidade básica (aria-labels, alt texts)

### Estrutura de componente:
- [ ] Arquivo de tipos separado (.types.ts)
- [ ] Index barrel export
- [ ] Props com valores default quando apropriado
- [ ] Uso de cn() para merge de classes

---

## Performance

- Utilizar `next/image` para todas as imagens
- Implementar lazy loading em seções abaixo do fold
- Fonte TildaSans carregada via `next/font/local`
- Animações respeitam `prefers-reduced-motion`

```typescript
// Respect reduced motion preference
const prefersReducedMotion = 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const animationProps = prefersReducedMotion 
  ? {} 
  : { initial: 'hidden', animate: 'visible', variants: slideIn }
```

---

## Comandos de Desenvolvimento

```bash
# Instalação
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir

# Dependências adicionais
npm install next-intl framer-motion clsx tailwind-merge
npm install -D @types/node

# Desenvolvimento
npm run dev

# Build
npm run build

# Lint
npm run lint
```

---

*Este prompt deve ser utilizado em conjunto com o Design System e Content prompts para desenvolvimento completo do portfólio.*
