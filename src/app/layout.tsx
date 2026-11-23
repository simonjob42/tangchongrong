import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/sites/tang-chongrong/Nav';
import { Footer } from '@/components/sites/tang-chongrong/Footer';
import { SITE } from '@/components/sites/tang-chongrong/data/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: '唐崇荣中文档案 - 把唐崇荣牧师的讲道，按系列读完',
    template: '%s | 唐崇荣中文档案',
  },
  description: SITE.description,
  keywords: [
    '唐崇荣',
    'Stephen Tong',
    '讲道',
    '约翰福音讲解',
    '罗马书讲解',
    '雅各书讲解',
    '改革宗',
    '归正神学',
    '基督徒感情的圣化',
    '问答',
  ],
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.name,
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE.url,
    siteName: SITE.name,
    title: '唐崇荣中文档案 - 把唐崇荣牧师的讲道，按系列读完',
    description: SITE.description,
  },
  twitter: {
    card: 'summary',
    title: '唐崇荣中文档案',
    description: '把唐崇荣牧师的讲道，按系列认真整理一遍',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-white font-sans text-gray-900 pt-14">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed left-4 top-4 z-50 rounded bg-white px-4 py-2 text-gray-900 shadow"
        >
          跳到主要内容
        </a>
        <Nav />
        <main id="main-content" className="mx-auto max-w-6xl px-4 pb-16" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
