import "@fontsource-variable/open-sans";
import "lenis/dist/lenis.css";
import { ReactNode } from "react";
import Providers from "./providers";
import LayoutClient from "./LayoutClient";
import LenisProvider from "@/lib/contexts/LenisProvider";

export const metadata = {
  title: "Colex | Simple workflows",
  description:
    "Give your teams extra hands. Purpose-built to automate your team reliably.",
  openGraph: {
    title: "Colex | Simple workflows",
    description:
      "Give your teams extra hands. Purpose-built to automate your team reliably.",
    url: "https://getcolex.com/",
    siteName: "Colex",
    images: [
      {
        url: "http://13.200.75.41/images/getcolex_landing.png",
        width: 1200,
        height: 630,
        alt: "Colex - Simple workflow automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colex | Simple workflows",
    description:
      "Give your teams extra hands. Purpose-built to automate your team reliably.",
    images: ["http://13.200.75.41/images/getcolex_landing.png"],
  },
  metadataBase: new URL("https://getcolex.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16.png"
        />
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>
        <Providers>
          <LenisProvider>
            <LayoutClient />
            {children}
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
