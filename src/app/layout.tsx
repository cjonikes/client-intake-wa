import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner"
import "./globals.css";
import { Check } from "lucide-react";
import { AppContextProvider } from "@/components/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login window",
  description: "Under development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        < AppContextProvider>
          {children}
        </AppContextProvider>
        
        <Toaster
          icons={{
            success: <Check color="#00b700" />,
          }}
          theme="dark"
          toastOptions={{
            unstyled: false,
            classNames: {
              error: "bg-red-400",
              success: "text-black font-semibold",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
      </body>
    </html>
  );
}
