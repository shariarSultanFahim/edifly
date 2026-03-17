import {
  Amiri,
  Caveat,
  Cormorant_Garamond,
  Dancing_Script,
  Great_Vibes,
  Lora,
  Manrope,
  Merriweather,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amiri",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-greatvibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata = {
  title: {
    default: "EidiFly — Create & Share Beautiful Eid Greeting Cards",
    template: "%s | EidiFly",
  },
  description:
    "Create stunning Eid Mubarak virtual greeting cards with EidiFly. Choose from 12+ beautiful templates, customize fonts and messages, share via link, or download as an image. Free and easy to use!",
  keywords: [
    "Eid Mubarak",
    "Eid cards",
    "Eid greeting cards",
    "virtual Eid cards",
    "Eid card maker",
    "EidiFly",
    "Islamic greeting cards",
    "Eid ul Fitr cards",
    "Eid ul Adha cards",
    "Ramadan cards",
    "share Eid cards",
    "download Eid cards",
  ],
  authors: [{ name: "Shariar Sultan Fahim", url: "https://fa-m.dev/" }],
  creator: "fa-m.dev",
  openGraph: {
    title: "EidiFly — Create & Share Beautiful Eid Greeting Cards",
    description:
      "Design stunning Eid Mubarak virtual cards. Choose templates, add your message, and share with loved ones instantly.",
    url: "/",
    siteName: "EidiFly",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://eidifly.fa-m.dev/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "EidiFly — Create & Share Beautiful Eid Greeting Cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EidiFly — Create & Share Beautiful Eid Greeting Cards",
    description:
      "Design stunning Eid Mubarak virtual cards. Choose templates, add your message, and share with loved ones instantly.",
    images: ["https://eidifly.fa-m.dev/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://eidifly.fa-m.dev"),
};

const fontClasses = [
  manrope,
  playfair,
  dancingScript,
  lora,
  amiri,
  greatVibes,
  cormorant,
  merriweather,
  caveat,
]
  .map((f) => f.variable)
  .join(" ");

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontClasses}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d4af37" />
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
