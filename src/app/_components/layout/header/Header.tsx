'use client';
import { usePathname } from 'next/navigation';
import HeaderMobile from './HeaderMobile';
import HeaderPC from './HeaderPC';
import { useEffect } from 'react';

export default function Header() {
  //pathname
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/restaurant') {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    }
  }, [pathname]);
  return (
    <header>
      <HeaderPC pathname={pathname} />
      <HeaderMobile pathname={pathname} />
    </header>
  );
}
