import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';
import NavBar from '@/components/layout/NavBar';
import { Toaster } from 'sonner';
import { Montserrat } from "next/font/google";
const font = Montserrat({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={font.className}>
        <body>
          <NavBar />
          {children}
          <Toaster
            position='top-center'
            richColors
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
