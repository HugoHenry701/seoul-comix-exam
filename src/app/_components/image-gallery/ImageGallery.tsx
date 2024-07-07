'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function ImageGallery({
  listImages,
  className,
}: {
  listImages: string[];
  className?: string;
}) {
  return (
    <>
      {listImages.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          direction="horizontal"
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: true,
          }}
          loop={true}
        >
          {listImages.map((e, i) => (
            <SwiperSlide key={i}>
              <Image
                src={e}
                alt=""
                className={className}
                width={1887}
                height={1510}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <></>
      )}
    </>
  );
}
