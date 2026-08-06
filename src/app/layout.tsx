import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "./providers";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "Colex — Ops automation that grows with your business",
  description:
    "Describe your process. Colex turns it into rules, runs it, and writes down every decision.",
  openGraph: {
    title: "Colex — Ops automation that grows with your business",
    description:
      "Describe your process. Colex turns it into rules, runs it, and writes down every decision.",
    url: "https://getcolex.com/",
    siteName: "Colex",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Colex — Ops automation that grows with your business",
    description:
      "Describe your process. Colex turns it into rules, runs it, and writes down every decision.",
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
            <LayoutClient />
            {children}
        </Providers>
      </body>
    </html>
  );
}
