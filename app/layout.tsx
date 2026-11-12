import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Minerion ERP — Software completo para mineração",
  description:
    "O sistema de gestão mais completo para mineradoras: do chão da jazida à tela do gestor. Agende uma demonstração.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grey text-white font-sans">
        <Script
          src="https://tracking.minerion.com.br/api/tracker"
          strategy="beforeInteractive"
        />
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
