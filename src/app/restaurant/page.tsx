import dynamic from 'next/dynamic';

const RestaurantList = dynamic(
  () => import('@/app/_components/RestaurantList'),
  {
    ssr: true,
  }
);
export default function RestaurantPage() {
  return (
    <main className="max-w-7xl sm:mx-auto mx-4 my-4 mt-5">
      <RestaurantList />
    </main>
  );
}
