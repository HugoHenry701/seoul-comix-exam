'use client';
import dynamic from 'next/dynamic';
import { textByStoreCategory, STORE_CATEGORY } from '@/app/_configs/categories';
import Image from 'next/image';
import SkeletonImage from './skeleton/SkeletonImage';
import { trpc } from '../_trpc/client';
import { serverClient } from '../_trpc/serverClient';
import { useEffect, useState } from 'react';
import SpinLoading from './loading/spin-loading';
import InfiniteScroll from './infinite-scroll/InfiniteScroll';
import SkeletonText from './skeleton/SkeletonText';
const ImageGallery = dynamic(
  () => import('@/app/_components/image-gallery/ImageGallery'),
  {
    ssr: true,
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
  ssr: true,
  loading: () => (
    <SkeletonText
      heightClass="h-[35px]"
      widthClass="w-[33px]"
      className="rounded-full absolute right-4 top-4 z-10 "
    />
  ),
});
const CategoryTabs = dynamic(() => import('./CategoryTabs'), {
  ssr: true,
  loading: () => (
    <SkeletonText
      heightClass="h-[50px]"
      widthClass="w-[1280px]"
      className="rounded-2xl my-4"
    />
  ),
});
export default function RestaurantList({
  initialRestaurantList,
}: {
  initialRestaurantList: Awaited<
    ReturnType<(typeof serverClient)['getRestaurants']>
  >;
}) {
  //State
  const [crrSearch, setCrrSearch] = useState<string>('');
  const [crrCategory, setCrrCategory] = useState<string>('ALL');
  const [hasMoreRestaurant, setHasMoreRestaurant] = useState<boolean>(true);
  const [crrPageSize, setCrrPageSize] = useState<number>(6);
  console.log({ crrPageSize });

  //Handle
  const getListRestaurant = trpc.getRestaurants.useQuery(
    {
      page_num: 1,
      page_size: crrPageSize,
      search: crrSearch,
      category: crrCategory,
    },
    {
      initialData: initialRestaurantList,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
  const triggerRefreshRestaurantList = () => {
    getListRestaurant.refetch();
  };
  const actionNextListRestaurant = () => {
    setCrrPageSize((crr) => crr + 3); // each scroll reveal 3 items.
  };

  //Data
  const restaurantList = getListRestaurant.data.listRestaurant;

  //Cycle
  useEffect(() => {
    if (
      getListRestaurant.data.meta_data.total ===
      getListRestaurant.data.listRestaurant.length
    ) {
      setHasMoreRestaurant(false);
    }
  }, [getListRestaurant]);

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
          onChange={(e) => {
            setTimeout(() => {
              setCrrSearch(e.target.value);
            }, 500);
          }}
        />
      </div>

      <CategoryTabs setCrrCategory={setCrrCategory} />
      {getListRestaurant.isLoading ? (
        <div className="h-[350px] text-center content-center">
          <SpinLoading color="#000" height={30} width={30} position="center" />
        </div>
      ) : (
        <div className="h-[750px] pb-28">
          {restaurantList && restaurantList.length > 0 ? (
            <InfiniteScroll
              next={actionNextListRestaurant}
              isLoading={getListRestaurant.isLoading}
              hasMore={hasMoreRestaurant}
              spinColor="#000"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <>
                  {restaurantList.map((restaurant, i) => (
                    <div
                      key={i}
                      className="border p-2 px-4 rounded-2xl shadow-md "
                    >
                      <div className="my-3 flex justify-between text-sm relative">
                        <FavoriteClick
                          isFavorite={restaurant.isFavorite}
                          restaurant_id={restaurant.id}
                          actionRefreshRestaurantList={
                            triggerRefreshRestaurantList
                          }
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
              </div>
            </InfiniteScroll>
          ) : (
            <div className="h-[350px] text-center content-center">
              <p>데이터를 찾을 수 없습니다</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
