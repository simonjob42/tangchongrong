'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE } from './data/site';

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="container-main flex h-14 items-center justify-between" aria-label="主导航">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-semibold text-white">
            唐
          </span>
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            {SITE.shortName}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                isActive(item.href)
                  ? 'bg-gray-100 font-medium text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            aria-label="搜索讲道"
            className="ml-1 rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Link
            href="/search"
            aria-label="搜索讲道"
            className="rounded-md p-2 text-gray-600 hover:bg-gray-50"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-50"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-gray-100 bg-white md:hidden">
          <div className="container-main flex flex-col py-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm',
                  isActive(item.href)
                    ? 'bg-gray-100 font-medium text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
