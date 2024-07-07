import dynamic from 'next/dynamic';
import { serverClient } from '../_trpc/serverClient';
const RestaurantList = dynamic(
  () => import('@/app/_components/RestaurantList'),
  {
    ssr: false,
  }
);
export default async function RestaurantPage() {
  const restaurantList = await serverClient.getRestaurants({
    page_num: 1,
    page_size: 10,
  });
  return (
    <div className="max-w-7xl sm:mx-auto mx-4 my-4 mt-5">
      <RestaurantList initialRestaurantList={restaurantList} />
    </div>
  );
}
