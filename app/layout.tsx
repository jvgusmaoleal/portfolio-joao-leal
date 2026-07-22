import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jbMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: { default: "João Leal — Product Builder", template: "%s · João Leal" },
  description:
    "Construo produtos que geram receita real, com IA no centro do processo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jbMono.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
