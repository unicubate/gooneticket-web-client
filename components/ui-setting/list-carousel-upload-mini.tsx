'use client';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { UploadModel } from '@/types/upload';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { PostModel } from '@/types/post';
import Image from 'next/image';
import { Pagination, Zoom } from 'swiper/modules';

type Props = {
  uploads: UploadModel[];
  folder: string;
  className?: string;
  alt?: string;
  post?: PostModel;
  height?: string;
  width?: string | number;
};

const contentStyle: React.CSSProperties = {
  lineHeight: '50px',
  textAlign: 'center',
  // background: "#364d79",
};

export function ListCarouselUploadMini(props: Props) {
  const {
    uploads,
    folder,
    alt,
    post,
    className = '',
    height = '100%',
    width = '100%',
  } = props;
  const ref = useRef();

  return (
    <>
      <Swiper
        zoom={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        history={{
          key: 'slide',
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Zoom]}
        // style={contentStyle}
        breakpoints={{
          320: {
            slidesPerView: 'auto',
            spaceBetween: 8,
          },
          // 640: {
          //   slidesPerView: 1,
          //   spaceBetween: 16,
          // }
        }}
      >
        {uploads &&
          uploads?.length > 0 &&
          uploads?.map((item: UploadModel, index: number) => (
            <SwiperSlide key={index}>
              <Image
                height={500}
                width={1000}
                style={{
                  left: 0,
                  right: 0,
                  height: `${height}`,
                  width: `100%`,
                  marginInline: 'auto',
                  aspectRatio: 'auto',
                  pointerEvents: 'none',
                }}
                className={`rounded-md object-cover blur-lg`}
                src={`${viewOneFileUploadAPI({
                  folder: folder,
                  fileName: item?.path,
                })}`}
                quality={90}
                priority={true}
                alt={''}
                decoding="auto"
                fetchPriority="high"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  height={100}
                  width={100}
                  className="size-48 rounded-md object-cover"
                  src={`${viewOneFileUploadAPI({
                    folder: folder,
                    fileName: item?.path,
                  })}`}
                  quality={90}
                  priority={true}
                  alt={''}
                  decoding="auto"
                  fetchPriority="high"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
