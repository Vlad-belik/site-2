import type {Metadata} from 'next';
import './globals.css';
import {Footer} from '@/components/layout/footer';
import {Toaster} from '@/components/ui/toaster';
import {MobileNav} from '@/components/layout/mobile-nav';

export const metadata: Metadata = {
  title: 'TIRED | Underground Horror Streetwear',
  description: 'Russian underground clothing for your skeleton. Dark, brutalist, and unsettling.',
  openGraph: {
    title: 'TIRED Threads',
    description: 'Underground Horror Streetwear',
    images: ['https://picsum.photos/seed/tired-og/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@300;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-black text-white antialiased selection:bg-primary selection:text-white pb-24">
        <div className="relative z-10 flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <MobileNav />
        <Toaster />
      </body>
    </html>
  );
}
