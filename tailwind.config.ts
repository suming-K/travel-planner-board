import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ─── Color tokens ───────────────────────────────────────────────────
      colors: {
        // Base surfaces
        base:    { DEFAULT: '#FFFFFF', dark: '#141210' },
        surface: { DEFAULT: '#F8F7F5', dark: '#1E1C19' },
        subtle:  { DEFAULT: '#F0EDEA', dark: '#272420' },

        // Text
        ink: {
          primary:   { DEFAULT: '#1A1714', dark: '#F2EDE8' },
          secondary: { DEFAULT: '#5C5550', dark: '#A09890' },
          tertiary:  { DEFAULT: '#B0AAA3', dark: '#504845' },
        },

        // Borders
        border: {
          default: { DEFAULT: '#EBEBEB', dark: '#2E2A26' },
          strong:  { DEFAULT: '#E8E4DE', dark: '#3A3530' },
        },

        // Status — reservation
        status: {
          booked:    { DEFAULT: '#276127', bg: '#EDF7ED' },
          needed:    { DEFAULT: '#7A4F00', bg: '#FEF6E4' },
          rush:      { DEFAULT: '#C0392B', bg: '#FEEDED' },
          walkin:    { DEFAULT: '#5C5550', bg: '#F5F2EC' },
          done:      { DEFAULT: '#276127', bg: '#EDF7ED' },
        },

        // Accent
        amber:  { DEFAULT: '#D4A017', bg: '#FDFAF2', border: '#E8D99A' },
        purple: { DEFAULT: '#5C3D8A', bg: '#F5F0FF' },

        // Timeline line colors
        timeline: {
          booked:  '#A8D4A0',
          needed:  '#E8B86D',
          sunset:  '#F0C040',
          special: '#C8B8E0',
          default: '#C8C3BC',
        },
      },

      // ─── Typography ─────────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'Pretendard Variable', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },

      fontSize: {
        'hero':    ['20px', { lineHeight: '1.08', letterSpacing: '-0.035em', fontWeight: '700' }],
        'title':   ['17px', { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        'section': ['15px', { lineHeight: '1.3',  letterSpacing: '-0.01em',  fontWeight: '600' }],
        'card':    ['12px', { lineHeight: '1.4',  letterSpacing: '0',        fontWeight: '600' }],
        'body':    ['12px', { lineHeight: '1.5',  letterSpacing: '0',        fontWeight: '400' }],
        'memo':    ['11px', { lineHeight: '1.55', letterSpacing: '0',        fontWeight: '400' }],
        'label':   ['9px',  { lineHeight: '1.2',  letterSpacing: '0.06em',   fontWeight: '500' }],
        'caption': ['10px', { lineHeight: '1.3',  letterSpacing: '0.01em',   fontWeight: '400' }],
        'chip':    ['10px', { lineHeight: '1',    letterSpacing: '0.01em',   fontWeight: '500' }],
        'nav':     ['9px',  { lineHeight: '1',    letterSpacing: '0.01em',   fontWeight: '400' }],
      },

      // ─── Spacing ────────────────────────────────────────────────────────
      spacing: {
        '1':  '4px',
        '2':  '6px',
        '3':  '8px',
        '4':  '10px',
        '5':  '12px',
        '6':  '14px',
        '7':  '16px',
        '8':  '18px',
        '9':  '22px',
        '10': '28px',
      },

      // ─── Border radius ──────────────────────────────────────────────────
      borderRadius: {
        'sm':   '6px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '14px',
        '2xl':  '16px',
        '3xl':  '20px',
        'full': '9999px',
      },

      // ─── Box shadow — very subtle ────────────────────────────────────────
      boxShadow: {
        'card': '0 0.5px 0 0 #EBEBEB',
        'none': 'none',
      },
    },
  },
  plugins: [],
}

export default config
