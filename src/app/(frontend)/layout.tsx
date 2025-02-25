import React from 'react'
import { Navigation } from '@/components/Navigation'
import { cn } from "@/lib/utils"
import './styles.css'
import { ThemeProvider } from '@/components/ui/theme-provider'

export const metadata = {
  title: 'StreetEats NYC - Find the Best Street Food',
  description: 'Discover the best street food vendors in New York City',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body >
        <Navigation />
        <div className="flex-1">
          <main className="bg-background">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            {children}
          </ThemeProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
