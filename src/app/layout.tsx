import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className + " overflow-hidden"}>
        <Providers>
          <div className="flex flex-col w-dvw h-dvh overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
