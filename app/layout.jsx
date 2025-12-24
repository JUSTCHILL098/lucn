import "./globals.css"
import { Geist_Mono } from "next/font/google"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "Hianime Video API",
  description: "Developer documentation for Hianime Video API",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} font-mono bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  )
}
