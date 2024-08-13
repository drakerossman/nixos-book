
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'The Book of NixOS',
  description: 'From Beginner to a Pro, the Book of NixOS will teach you all the ins-and-outs of the NixOS Linux Distribution and the Nix Expressions Language.',
  metadataBase: new URL('https://nixosbook.com'),
};
