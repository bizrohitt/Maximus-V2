import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary:     'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        secondary:   'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        accent:      'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'bg-base':    'var(--color-bg-base)',
        'bg-subtle':  'var(--color-bg-subtle)',
        'bg-muted':   'var(--color-bg-muted)',
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted':     'var(--color-text-muted)',
        'text-inverse':   'var(--color-text-inverse)',
        border:       'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        gray: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: 'var(--color-gray-900)',
        },
      },
      borderRadius: {
        sm:  'var(--radius-sm)',
        md:  'var(--radius-md)',
        lg:  'var(--radius-lg)',
        xl:  'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      spacing: {
        xs:  'var(--space-xs)',
        sm:  'var(--space-sm)',
        md:  'var(--space-md)',
        lg:  'var(--space-lg)',
        xl:  'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
    },
  },
  plugins: [],
}

export default config
