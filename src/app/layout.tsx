import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';
import NavBar from '@/components/global/NavBar';
import { Toaster } from 'sonner';
import { Montserrat } from "next/font/google";
import Footer from '@/components/global/Footer';
import { cn } from '@/lib/utils';
import { ReactNode, Suspense } from 'react';
import { PHProvider, PostHogPageview } from './providers';

const font = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(font.className, "flex flex-col min-h-screen")}>
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <PHProvider>
          <body className="flex-grow">
            <Toaster
              position='top-center'
              richColors
            />
            <NavBar />
            {children}
            <Footer />
          </body>
        </PHProvider>
      </html>
    </ClerkProvider >
  )
}
