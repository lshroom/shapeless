import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shapeless Peace Platform',
  description: 'A platform for peace through music collaboration between Israel and Palestine',
  keywords: ['peace', 'music', 'collaboration', 'Israel', 'Palestine', 'social movement'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
