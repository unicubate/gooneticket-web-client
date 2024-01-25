/* eslint-disable jsx-a11y/anchor-is-valid */
import { PostModel } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import React, { useState } from 'react';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ShowModalGallery } from './show-modal-gallery';

type Props = {
  item?: PostModel;
  commentTake: number;
  userVisitor: UserVisitorModel;
};

const ListPublicGallery: React.FC<Props> = ({
  item,
  commentTake,
  userVisitor,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="group relative" key={item?.id}>
        <a
          title={item?.title}
          href={void 0}
          onClick={() => setOpenModal(true)}
          className="aspect-w-16 aspect-h-9 block overflow-hidden"
        >
          {item?.uploadsImage && item?.uploadsImage.length > 0 ? (
            <ListCarouselUpload
              post={item}
              uploads={item?.uploadsImage}
              folder="posts"
              preview={false}
              height={250}
              className={`size-full object-cover transition-all duration-200 group-hover:scale-110${
                item?.whoCanSee === 'MEMBERSHIP' && item?.isValidSubscribe !== 1
                  ? 'blur-xl'
                  : ''
              }`}
            />
          ) : null}
        </a>
      </div>

      {openModal ? (
        <ShowModalGallery
          openModal={openModal}
          setOpenModal={setOpenModal}
          post={item}
          userVisitorId={userVisitor?.id ?? ''}
          commentTake={commentTake}
        />
      ) : null}
    </>
  );
};

export { ListPublicGallery };
