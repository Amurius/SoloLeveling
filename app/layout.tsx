"use client"
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import { QueryClient, QueryClientProvider, useMutation, useQueryClient } from 'react-query';
const queryClient = new QueryClient();


const Titres = localFont(
  {
    src: "./fonts/Titres/SoloLevelDemo.otf",
    variable: "--font-family-Titres"
  },
)
const mangaShaded = localFont(
  {
    src: "./fonts/Action-Man/Action_Man_Shaded.ttf",
    variable: "--font-family-Action_Man_Shaded"
  },
)
const mangaItalic = localFont(
  {
    src: "./fonts/Action-Man/Action_Man_Italic.ttf",
    variable: "--font-family-Action_ManItalic"
  },
)
const mangaBold = localFont(
  {
    src: "./fonts/Action-Man/Action_Man_Bold.ttf",
    variable: "--font-family-Action_Man_Bold"
  },
)
const gothic = localFont(
  {
    src: "./fonts/mirageGothic/Mirage_final.ttf",
    variable: "--font-family-gothic"
  },
)

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) {
  return (
    <html lang="en">
      <body className={inter.className + ` h-screen bg-no-repeat ${Titres.variable} ${mangaShaded.variable} ${mangaBold.variable} ${mangaItalic.variable} ${gothic.variable}`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
