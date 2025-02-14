import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@/styles/index.scss';
import { ReactQueryProvider } from '@/lib/ReactQueryProvider';
import { StoreProviders } from '@/store/StoreProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ride hailing',
  description: 'Mid-Level Test',
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
        <ReactQueryProvider>
          <StoreProviders>{children}</StoreProviders>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
