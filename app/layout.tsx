import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Dancing_Script, Cormorant_Garamond, Noto_Serif } from "next/font/google"
import "./globals.css"

const script = Dancing_Script({ subsets: ["latin", "vietnamese"], variable: "--font-script", display: "swap" })
const cormorant = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" })
const notoSerif = Noto_Serif({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-noto-serif", display: "swap" })

export const metadata: Metadata = {
  title: "Văn Thiện & Thanh Tuyền - Wedding",
  description: "Hãy tham gia cùng chúng tôi để kỷ niệm ngày đặc biệt của chúng tôi",
  openGraph: {
    title: "Văn Thiện & Thanh Tuyền - Wedding",
    description: "Hãy tham gia cùng chúng tôi để kỷ niệm ngày đặc biệt của chúng tôi",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`overflow-x-hidden ${GeistMono.variable} ${script.variable} ${cormorant.variable} ${notoSerif.variable}`}>{children}</body>
    </html>
  )
}
