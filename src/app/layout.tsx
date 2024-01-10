import { Plus_Jakarta_Sans as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';
import React from 'react';
import { Metadata } from 'next';

import './globals.css';
import { cn } from '../lib/utils';
import DesktopNavBar from '@/components/NavBar/DesktopNavBar';
import { ThemeProvider } from '@/context/ThemeProvider';
import MobileNavBar from '@/components/NavBar/mobile/MobileNavBar';
import { Footer } from '@/components/Footer/Footer';
import { Toaster } from '@/components/ui/toaster';
import { PopupProvider } from '@/context/PopupProvider';
import Popups from '@/components/Modals/Popups';
import { fetchProfile } from '@/lib/actions/user';
import LocationProvider from '@/context/LocationProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://morent-codemigos.vercel.app/'),
  title: 'Morent',
  description: 'Discover, Reserve, and Rent a Car with Morent Effortlessly',
  openGraph: {
    title: 'Morent',
    description: 'Discover, Reserve, and Rent a Car with Morent Effortlessly',
    url: 'https://morent-codemigos.vercel.app/',
    siteName: 'Morent',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Morent - Discover, Reserve, and Rent a Car with Morent Effortlessly',
      },
    ],
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  const profile = await fetchProfile();
  return (
    <html lang='en' className={`font-sans ${theme?.value}`}>
      <ThemeProvider defaultMode={theme?.value || ''}>
        <LocationProvider />
        <body
          className={cn(
            'min-h-screen  dark:bg-[#1E2430] bg-white-200 font-sans antialiased',
            fontSans.variable,
          )}
        >
          <PopupProvider>
            <header>
              <DesktopNavBar profile={profile} />
              <MobileNavBar profile={profile} />
            </header>
            {children}
            <Footer />
            <Toaster />
            <Popups />
          </PopupProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
