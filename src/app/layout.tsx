import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trazabilidad de Trámites Municipales',
  description: 'Sistema de trazabilidad y seguimiento de trámites municipales',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}
