'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Each } from '../elements/Each';
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
          navigation
          modules={[Autoplay, Navigation]}
        >
          {
            <Each
              of={listImages}
              render={(image) => (
                <SwiperSlide>
                  <Image
                    src={image}
                    alt=""
                    className={className}
                    width={1887}
                    height={1510}
                  />
                </SwiperSlide>
              )}
            />
          }
        </Swiper>
      ) : (
        <></>
      )}
    </>
  );
}
