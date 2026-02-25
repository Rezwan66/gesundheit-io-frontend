import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProviders from '@/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GESUNDHEIT.IO',
  description:
    'A comprehensive healthcare management system built with Next.js, TypeScript, and Tailwind CSS. This application provides features for managing patient records, appointments, billing, and more, ensuring efficient healthcare administration.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
