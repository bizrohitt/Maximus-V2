# Design System

## Overview
This document defines the **Design System** for Maximus — the single source of truth for all visual and interaction design decisions. Every frontend output — components, pages, templates, CMS blocks, emails, admin UI — **must** follow this system without exception.

## Design Philosophy

### Style
- **Clean & Minimal** — inspired by Linear, Notion, Vercel
- **Principle**: Every element must earn its place
- **Tone**: Professional, trustworthy, modern
- **Feel**: Fast, focused, frictionless

## Core Principles
1. **Less is more** — remove anything without clear function
2. **Consistency over creativity** — use established patterns
3. **Accessibility first** — WCAG AA minimum compliance
4. **Performance conscious** — avoid bloating the DOM
5. **Mobile-first** — design for <640px, enhance for larger screens

---

## Design Tokens (CSS Custom Properties)

All styling must use CSS custom properties (`var(--token-name)`). Never hardcode values.

### Color Tokens

#### Brand Colors (LOCKED for Maximus)
```css
:root {
  /* Primary */
  --color-primary:        #FFFFFF;      /* Main brand — CTAs, links */
  --color-primary-hover:  #F3F4F6;      /* Hover state */
  --color-primary-light:  #FFFFFF;      /* Light tint — backgrounds */

  /* Secondary */
  --color-secondary:      #B5300A;      /* Deep Red-Orange */
  --color-secondary-hover:#9C2A08;

  /* Accent */
  --color-accent:         #3ECF8E;      /* Vibrant Green */
  --color-accent-hover:   #34B67A;

  /* Neutrals — always defined */
  --color-gray-50:  #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  --color-white: #FFFFFF;
  --color-black: #0A0A0A;
}
```

#### Semantic Colors
```css
:root {
  /* Success */
  --color-success:        #10B981;
  --color-success-light:  #D1FAE5;

  /* Warning */
  --color-warning:        #F59E0B;
  --color-warning-light:  #FFFBEB;

  /* Error */
  --color-error:          #EF4444;
  --color-error-light:    #FEE2E2;

  /* Info */
  --color-info:           #3B82F6;
  --color-info-light:     #DBEAFE;
}
```

#### Surface Tokens
```css
:root {
  --color-bg-base:   var(--color-white);
  --color-bg-subtle: var(--color-gray-50);
  --color-bg-muted:  var(--color-gray-100);
  --color-bg-overlay: rgba(0, 0, 0, 0.5);
}
```

#### Text Tokens
```css
:root {
  /* Primary */
  --color-text-primary:   var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted:     var(--color-gray-500);
  --color-text-inverse:   var(--color-white);
  --color-text-link:      var(--color-primary);
}
```

### Spacing (8pt Grid)
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-9: 36px;
  --space-10: 40px;
  --space-11: 44px;
  --space-12: 48px;
  --space-14: 56px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-28: 112px;
  --space-32: 128px;
  --space-36: 144px;
  --space-40: 160px;
}
```

### Border Radius
```css
:root {
  --radius-none: 0px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  20px;
  --radius-full: 9999px;
}
```

### Shadows (Subtle, Low-Opacity)
```css
:root {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Transitions
```css
:root {
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
}

/* Easing functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Z-Index Scale
```css
:root {
  --z-dropdown:  100;
  --z-sticky:    200;
  --z-banner:    300;
  --z-overlay:   400;
  --z-modal:     500;
  --z-popover:   600;
  --z-toast:     700;
  --z-tooltip:   800;
}
```

## Typography System

### Font Families
```css
:root {
  /* Sans-serif - Primary */
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Monospace */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Serif - Blog long-form only */
  --font-serif: 'Georgia', serif;
}
```

### Font Weights
```css
:root {
  --font-light:   300;
  --font-normal:  400;
  --font-medium:  500;
  --font-semibold:600;
  --font-bold:    700;
  --font-extrabold:800;
  --font-black:   900;
}
```

### Font Sizes (Text Scale)
```css
:root {
  /* 4px base = 8pt grid */
  --text-xs:   0.75rem; /* 12px */
  --text-sm:   0.875rem; /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg:   1.125rem; /* 18px */
  --text-xl:   1.25rem;  /* 20px */
  --text-2xl:  1.5rem;   /* 24px */
  --text-3xl:  1.875rem; /* 30px */
  --text-4xl:  2.25rem;  /* 36px */
  --text-5xl:  3rem;     /* 48px */
  --text-6xl:  3.75rem;  /* 60px */
}
```

### Line Heights
```css
:root {
  --leading-none:   1;
  --leading-tight:  1.25;
  --leading-snug:   1.375;
  --normal:         1.5;
  --leading-relaxed:1.625;
  --leading-loose:  2;
}
```

### Tracking (Letter Spacing)
```css
:root {
  --tracking-tighter: -0.05em;
  --tracking-tight:   -0.025em;
  --tracking-normal:  0;
  --tracking-wide:    0.025em;
  --text-wider:       0.05em;
  --tracking-widest:  0.1em;
}
```

## Component Guidelines

### Button System
```css
/* Base button */
.btn {
  @apply font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none;
}

/* Variants */
.btn-primary {
  @apply bg-primary text-text-inverse hover:bg-primary-hover;
}
.btn-secondary {
  @apply bg-transparent text-primary border border-primary hover:bg-primary/10;
}
.btn-ghost {
  @apply bg-transparent text-text-secondary hover:bg-bg-subtle;
}
.btn-danger {
  @apply bg-error text-text-inverse hover:bg-error/90;
}

/* Sizes */
.btn-sm {
  @apply h-8 px-3 text-sm;
}
.btn-md {
  @apply h-10 px-4 text-base; /* Default */
}
.btn-lg {
  @apply h-12 px-6 text-lg;
}
```

### Input & Form Elements
```css
.input, .textarea, .select {
  @apply bg-bg-base border border-gray-300 text-text-primary rounded-md 
         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0
         disabled:opacity-50 disabled:cursor-not-allowed;
  @apply px-4 py-2;
}

.input-sm { @apply text-sm px-3 py-1.5; }
.input-lg { @apply text-lg px-5 py-3; }
```

### Cards
```css
.card {
  @apply bg-bg-base border border-gray-200 rounded-xl 
         shadow-sm hover:shadow-md transition-shadow;
}

.card-header {
  @apply border-b border-gray-200 pb-4 pt-6;
}

.card-content {
  @apply p-6;
}

.card-footer {
  @apply border-t border-gray-200 pt-4 pb-6;
}
```

### Badges
```css
.badge {
  @apply inline-flex items-center rounded-full text-xs font-medium 
         px-2.5 py-0.5;
}

.badge-primary {
  @apply bg-primary/10 text-primary;
}
.badge-secondary {
  @apply bg-secondary/10 text-secondary;
}
.badge-accent {
  @apply bg-accent/10 text-accent;
}
.badge-success {
  @apply bg-success/10 text-success;
}
.badge-warning {
  @apply bg-warning/10 text-warning;
}
.badge-error {
  @apply bg-error/10 text-error;
}
.badge-info {
  @apply bg-info/10 text-info;
}
```

### Navigation
```css
/* Nav item */
.nav-item {
  @apply flex items-center px-4 py-2 text-sm font-medium 
         text-text-secondary hover:text-text-primary 
         hover:bg-bg-subtle rounded-md transition-colors;
}
.nav-item-active {
  @apply text-primary bg-primary/10;
}

/* Vertical nav */
.nav-vertical {
  @apply w-64 bg-white border-r border-gray-200;
}
```

## Layout Rules

### Containers
```css
.container {
  @apply max-w-7xl mx-auto px-6 sm:px-8;
}

.container-content {
  @apply max-w-3xl mx-auto;
}

.container-narrow {
  @apply max-w-xl mx-auto;
}
```

### Section Spacing
```css
/* Vertical spacing between sections */
.section {
  @apply py-20;
}
.section-sm {
  @apply py-12;
}
.section-lg {
  @apply py-28;
}

/* Horizontal padding */
.px-section {
  @apply px-6;
}
.px-section-md {
  @apply px-8;
}
```

### Grid System
- 12-column grid
- Max content width: 1280px
- Gutters: 1.5rem (24px) on lg+, 1rem (16px) on md, 0.5rem (8px) on sm

## Interactive States

### Hover
- Use `--bg-subtle` or `--bg-muted` background shift
- Never change text color on hover unless accessibility contrast is maintained
- Transition: `var(--transition-base)`

### Focus
- Outline: `2px solid var(--color-border-focus)`
- Outline offset: `2px`
- Ring: `2px solid var(--color-primary)` with `2px` offset

### Disabled
- Opacity: `0.5`
- Cursor: `not-allowed`
- Disable pointer events

## Dark Mode
All tokens **must** have `.dark` equivalents:

```css
.dark {
  --color-bg-base:   #0A0A0A;
  --color-bg-subtle: #1F2937;
  --color-bg-muted:  #374151;
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #D1D5DB;
  --color-text-muted:   #9CA3AF;

  /* Invert brand colors for dark backgrounds if needed */
  --color-primary:        #F3F4F6;
  --color-primary-hover:  #FFFFFF;
}
```

## Animation & Motion

### Duration Standards
- Micro-interactions: 100-150ms
- State transitions: 200ms
- Navigation: 250-300ms
- Modal overlay: 200ms
- Toast/snackbar: 150ms fade + 100ms slide

### Easing
- Entrance: `ease-out`
- Exit: `ease-in`
- Hover/toggle: `ease-in-out`
- Natural motion: `cubic-bezier(0.25, 0.8, 0.25, 1)`

## Accessibility (WCAG AA)

### Color Contrast
- Text/background: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum
- Always test with actual text over actual backgrounds

### Focus Management
- All interactive elements must be keyboard accessible
- Visible focus indicator required
- Logical tab order
- Skip navigation links

### Touch Targets
- Minimum 44x44px
- Recommended 48x48px
- Adequate spacing between touch targets

## Motion Safety
- Respect `prefers-reduced-motion`
- Provide alternatives to animated backgrounds
- Limit auto-playing content
- Ensure animations don't trigger seizures

## File Structure Conventions

### Next.js / React Components
```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   └── index.ts
│   └── ...
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
└── features/
    ├── dashboard/
    └── marketing/
```

### Styling
- Use Tailwind CSS with `@apply` for component styles
- Custom CSS only for animations, keyframes, or complex layouts
- Never use `!important`
- Never use arbitrary values (`p-[13px]`, `text-[17px]`)

### Component Documentation
Every component must include:
```typescript
/**
 * ComponentName
 * Description: Brief purpose
 * Design Tokens: --color-primary, --radius-md, --space-4
 * Alpine.js: No | Yes (if used)
 * Dark Mode: Yes/No
 * Responsive: Mobile-first
 * Accessibility: WCAG AA compliant
 */
```

## Prohibited Patterns (NEVER DO THESE)

1. **❌ Hardcoded colors**: `#ff0000`, `rgb(255, 0, 0)`, `hsl(0, 100%, 50%)`
2. **❌ Arbitrary spacing**: `margin-top: 13px`, `padding: 7px 19px`
3. **❌ More than 2 font families per page**
4. **❌ Pure black**: `#000000` (use `--color-text-primary`)
5. **❌ Pure white**: `#FFFFFF` (use `--color-bg-base`)
6. **❌ !important** in stylesheets
7. **❌ Mixing Alpine.js and React on same interactive element**
8. **❌ One-off styles** — always extend design system
9. **❌ Desktop-first design**
10. **❌ Undocumented patterns**

## Implementation Checklist

Before submitting any UI/component change:

- [ ] All colors use `var(--token-name)`
- [ ] All spacing uses `var(--space-*`) or Tailwind spacing (which maps to tokens)
- [ ] Border radius uses `var(--radius-*`) 
- [ ] Font family follows system defaults
- [ ] Component follows mobile-first responsive principles
- [ ] Dark mode variants considered/tested
- [ ] Accessibility checked (color contrast, focus order, ARIA)
- [ ] No hardcoded values in JSX/JS/CSS
- [ ] Component has proper JSDoc with token references
- [ ] Follows existing component patterns
- [ ] Tested in both light and dark mode

## Updating the Design System

### Adding New Tokens
1. Add to `:root` in `globals.css`
2. Add to `tailwind.config.js` under `theme.extend`
3. Update this document
4. Audit existing usage for consistency

### Modifying Existing Tokens
**Extreme caution required** — affects entire site
1. Update `globals.css`
2. Update `tailwind.config.js`
3. Update this document
4. Run visual regression tests
5. Update all documentation examples

### Deprecation Policy
- Deprecated tokens remain for 2 release cycles
- Deprecation warnings added to documentation
- Migration guide provided in release notes

---

**Last Updated**: 2026-07-02  
**Version**: 2.0  
**Status**: LOCKED (Brand colors and typography fixed)  
**Source of Truth**: This file + `globals.css` + `tailwind.config.ts`  

> **Remember**: The design system is not a constraint — it's the foundation that enables consistency, accessibility, and scalability. Innovation happens within the system, not outside of it.