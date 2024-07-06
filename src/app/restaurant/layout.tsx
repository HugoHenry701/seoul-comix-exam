import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurants',
  description: 'Restaurants',
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
