import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/auth/AuthContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Travel Planner',
  description: 'NY · Boston · Niagara — Personal travel companion',
  themeColor: '#FAFAF8',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
      <body className="bg-[#FAFAF8] text-[#1A1714] antialiased">
        {/* AuthProvider — wraps everything, makes useAuth() available everywhere */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
