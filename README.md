# João Victor Portfolio

Personal portfolio website for João Victor, a Fullstack Developer and Computer Science student at UFPE.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl (pt-BR, en)
- **Animations:** Framer Motion
- **Font:** TildaSans (to be added)

## Design System

**Tech-Constructivism** aesthetic featuring:
- Geometry-driven layouts
- Asymmetrical Bauhaus grid
- Sharp geometric primitives
- Heavy divider lines
- Light mode: Greeny Pastel palette
- Dark mode: Deep Aurora Night palette

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/[locale]/           # Internationalized routes
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── sections/           # Page sections
│   └── layout/             # Layout components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── types/                  # TypeScript definitions
├── i18n/                   # i18n configuration
└── messages/               # Translation files
```

## Development Guidelines

1. **Code in English** - All code, comments, and commits must be in English
2. **No hardcoded text** - Use i18n for all user-facing strings
3. **Use design tokens** - Never use raw hex colors, always use Tailwind classes
4. **Component structure** - Follow the three-file pattern (Component.tsx, Component.types.ts, index.ts)
5. **Follow TechnicalPrompt.md** - This is the source of truth for all development decisions

## Next Steps

- [ ] Add TildaSans font files to `src/app/fonts/TildaSans/`
- [ ] Implement Hero section component
- [ ] Implement About section component
- [ ] Implement Timeline section component
- [ ] Implement Stacks section component
- [ ] Implement Contact section component
- [ ] Add Header/Navigation component
- [ ] Add Footer component
- [ ] Implement dark mode toggle
- [ ] Add scroll animations with Framer Motion
- [ ] Optimize for performance and accessibility

## Documentation

- See `CLAUDE.md` for development instructions
- See `TechnicalPrompt.md` for technical specifications and patterns

## License

Private project - All rights reserved
