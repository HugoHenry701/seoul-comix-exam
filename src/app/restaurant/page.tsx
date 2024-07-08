import { serverClient } from '../_trpc/serverClient';
import RestaurantList from '../_components/RestaurantList';
import { unstable_noStore } from 'next/cache';

export default async function RestaurantPage() {
  unstable_noStore();
  const restaurantList = await serverClient.getRestaurants({
    page_num: 1,
    page_size: 6,
  });
  return (
    <div className="max-w-7xl sm:mx-auto mx-4 my-4 mt-5">
      <RestaurantList initialRestaurantList={restaurantList} />
    </div>
  );
}
