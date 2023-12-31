import { Inter } from 'next/font/google'
import { CookiesProvider } from 'next-client-cookies/server'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dosificacion de materias',
  description: 'Jesus Alejandro Reyes Rios',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <CookiesProvider>
        <body className={`${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </CookiesProvider>
    </html>
  )
}
