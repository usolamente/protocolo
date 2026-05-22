import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { ServiceWorkerRegister } from "@/components/system/ServiceWorkerRegister";
import { OnboardingGate } from "@/components/onboarding/OnboardingGate";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Protocolo · Entrenamiento Concurrente",
  description:
    "Planificador integral de hipertrofia, calistenia, bienestar y recuperación termal.",
  manifest: "/manifest.json",
  applicationName: "Protocolo",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Protocolo",
    startupImage: [
      {
        url: "/icons/splash-1290x2796.png",
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/icons/splash-1170x2532.png",
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/icons/splash-828x1792.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#ede7da" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

// Aplica el tema antes del primer pintado para evitar parpadeo (FOUC).
// Por defecto: modo noche.
const themeInit = `(function(){try{var t=localStorage.getItem('protocolo-theme')||'dark';var e=document.documentElement;if(t==='dark'){e.classList.add('dark');}e.style.colorScheme=t;}catch(_){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-dvh bg-ink-950 text-bone-100 antialiased">
        <main className="mx-auto max-w-md safe-area-bottom">{children}</main>
        <BottomNav />
        <ServiceWorkerRegister />
        <OnboardingGate />
      </body>
    </html>
  );
}
