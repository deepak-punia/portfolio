import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Menu from './components/menu/Menu'
import Footer from './components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'A Full Stack Developer',
  description: 'A passionate full stack developer with experience in building dynamic, responsive, and user-friendly web applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  )
}
