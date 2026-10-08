import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Dancing_Script, Cormorant_Garamond, Noto_Serif } from "next/font/google"
import "./globals.css"

const script = Dancing_Script({ subsets: ["latin", "vietnamese"], variable: "--font-script", display: "swap" })
const cormorant = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" })
const notoSerif = Noto_Serif({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-noto-serif", display: "swap" })

// Địa chỉ thật của thiệp — ảnh xem trước khi gửi link (Zalo, Messenger, Facebook) cần đường dẫn đầy đủ.
const siteUrl = "https://thienhv-dev.github.io/levuquy-demo"
const title = "Nguyễn Thị Tài & Bùi Văn Đủ - Lễ vu quy"
const description = "Trân trọng kính mời cả nhà đến chung vui cùng gia đình chúng mình — Chủ nhật, 25.10.2026 tại Thôn Đông, An Hải, Lý Sơn."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.jpg`] },
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
