'use client';
import { usePathname } from 'next/navigation';
import HeaderMobile from './HeaderMobile';
import HeaderPC from './HeaderPC';

export default function Header() {
  //pathname
  const pathname = usePathname();

  return (
    <header>
      <HeaderPC pathname={pathname} />
      <HeaderMobile pathname={pathname} />
    </header>
  );
}
