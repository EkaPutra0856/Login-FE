import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${_geist.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Analytics />

        {/* Dev helper: log unexpected body attributes injected by extensions */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try{
                  const attrs = [...document.body.attributes].map(a=>a.name).filter(n=>!['class','style','data-theme'].includes(n));
                  if(attrs.length) console.warn('Body has extra attributes:', attrs);
                }catch(e){/* ignore */}
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
