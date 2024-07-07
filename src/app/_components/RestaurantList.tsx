'use client';
import dynamic from 'next/dynamic';
import { textByStoreCategory, STORE_CATEGORY } from '@/app/_configs/categories';
import Image from 'next/image';
import SkeletonImage from './skeleton/SkeletonImage';
import { trpc } from '../_trpc/client';
import { serverClient } from '../_trpc/serverClient';
const ImageGallery = dynamic(
  () =>
    import('@/app/_components/image-gallery/ImageGallery').then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => (
      <SkeletonImage
        heightClass="h-[350px] sm:h-[450px]"
        widthClass="w-[330px] sm:w-[371px]"
        className="rounded-2xl"
      />
    ),
  }
);
const FavoriteClick = dynamic(() => import('@/app/_components/FavoriteClick'), {
  ssr: false,
});
const CategoryTabs = dynamic(() => import('./CategoryTabs'), {
  ssr: false,
});
export default function RestaurantList({
  initialRestaurantList,
}: {
  initialRestaurantList: Awaited<
    ReturnType<(typeof serverClient)['getRestaurants']>
  >;
}) {
  const getListRestaurant = trpc.getRestaurants.useQuery(
    {
      page_num: 1,
      page_size: 10,
    },
    {
      initialData: initialRestaurantList,
    }
  );
  const restaurantList = getListRestaurant.data;
  return (
    <div>
      <div className="p-1 px-4 gap-2 border rounded-xl my-4 shadow-md flex flex-row">
        <Image
          src="/assets/images/search-md.svg"
          alt="search"
          width={20}
          height={20}
        />
        <input
          type="text"
          className="w-full text-[#98A2B3] p-2"
          placeholder="맛집 이름을 검색해보세요"
        />
      </div>
      <div className="p-2 px-4 gap-2 border rounded-xl my-4 shadow-md flex flex-row">
        <CategoryTabs />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {restaurantList && restaurantList.length > 0 ? (
          <>
            {restaurantList.map((restaurant, i) => (
              <div key={i} className="border p-2 px-4 rounded-2xl shadow-md ">
                <div className="my-3 flex justify-between text-sm relative">
                  <FavoriteClick
                    isFavorite={restaurant.isFavorite}
                    restaurant_id={restaurant.id}
                  />
                  <ImageGallery
                    listImages={restaurant.images}
                    className='className="h-[350px] rounded-2xl object-cover sm:h-[450px] w-full "'
                  />
                </div>
                <a href="#" className="group block " key={i}>
                  <div className="flex flex-row gap-1">
                    <Image
                      src="/assets/images/stars-02.svg"
                      alt="star"
                      width={12}
                      height={12}
                    />
                    {restaurant.featured && (
                      <p className=" text-[12px] text-[#FF692E] truncate max-w-48">
                        {restaurant.featured.text}
                      </p>
                    )}
                  </div>
                  <div className="text-gray-900 flex flex-row gap-1 justify-between">
                    <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4 truncate max-w-48">
                      {restaurant.name}
                    </h3>
                    <div className="flex flex-row gap-1 justify-center">
                      <p className="text-[#FDB022]">★</p>
                      {restaurant.rating}
                      <p>({restaurant.rating_count})</p>
                    </div>
                  </div>
                  <p className="mt-1.5  text-xs text-gray-500 truncate max-w-48 max-h-4">
                    {restaurant.desc}
                  </p>
                  <p className="mt-1.5 text-pretty text-xs text-gray-500">
                    {restaurant.city} ·{' '}
                    {restaurant.category
                      ? textByStoreCategory[
                          restaurant.category as keyof typeof STORE_CATEGORY
                        ]
                      : ''}{' '}
                    · {restaurant.price_range}
                  </p>
                </a>
              </div>
            ))}
          </>
        ) : (
          <p>Data not found</p>
        )}
      </div>
    </div>
  );
}
