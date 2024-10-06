import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import localFont from "next/font/local";
import "./global.css";

const alpino = localFont({
  src: [
    {
      path: "../../public/fonts/Alpino-Variable.woff2",
      weight: "100 200 300 400 500 600 700 800 900",
    },
    {
      path: "../../public/fonts/Alpino-Variable.woff",
      weight: "100 200 300 400 500 600 700 800 900",
    },
  ],
  display: "swap",
  variable: "--font-alpino",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
