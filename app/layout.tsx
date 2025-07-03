import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bluggenn',
  description: 'Bluggenn is a Saudi tech brand founded by passionate engineers with a love for smart, simple, and reliable designs. We specialize in mobile accessories—such as power banks, chargers, and cables—meticulously crafted with attention to detail, style, and uncompromising quality.',
  generator: 'Soft Masters',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
