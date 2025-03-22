import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/sidebar";
import Player from "@/components/player";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Spotify Clone",
  description: "A Spotify-like music streaming UI built with Next.js",
    generator: 'Arnav Joshi'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
            <Player />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'