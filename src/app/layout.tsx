import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mehdi Seddik',
  description: 'Mehdi Seddik portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <Head>
        <script src="https://kit.fontawesome.com/e076d7e5dd.js" crossOrigin="anonymous" async></script>
        <title>Mehdi Seddik</title>
      </Head>
      <body>
      <ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
