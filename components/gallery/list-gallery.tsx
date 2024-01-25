'use client';

import { DeleteOnePostAPI } from '@/api-site/post';
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { PostModel, PostType } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { IconTypePost } from '@/utils/icon-type-post';
import { ReadMore } from '@/utils/read-more';
import { Avatar, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiConversation } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { MdFavoriteBorder, MdOutlineModeEdit } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { formateDateDayjs } from '../../utils/formate-date-dayjs';
import { useDialog } from '../hooks/use-dialog';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: PostModel;
  index: number;
};

const ListGallery: React.FC<Props> = ({ item, index }) => {
  const { isOpen, setIsOpen, loading, setLoading } = useDialog();
  const router = useRouter();

  const saveMutation = DeleteOnePostAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation.mutateAsync({ postId: item?.id });
      AlertSuccessNotification({
        text: 'Image deleted successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  return (
    <>
      <div key={index} className="divide-gray-200 py-5">
        <div className="flex items-center">
          <div className="relative shrink-0 cursor-pointer">
            {item?.uploadsImage?.length > 0 ? (
              <Avatar
                size={100}
                shape="square"
                src={viewOneFileUploadAPI({
                  folder: 'posts',
                  fileName: String(item?.uploadsImage?.[0]?.path),
                })}
                alt={item?.title}
              />
            ) : null}
          </div>

          <div className="ml-3 min-w-0 flex-1 cursor-pointer">
            <div className="flex items-center text-gray-600">
              <button className="tex-sm">
                <AiOutlineCalendar />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>
            </div>

            <div className="mt-2 flex items-center">
              {item?.title ? (
                <p className="mt-2 text-lg font-bold">
                  <ReadMore html={String(item?.title ?? '')} value={100} />
                </p>
              ) : null}
            </div>

            <div className="mt-4 flex items-center font-medium text-gray-600">
              <button className="tex-sm">
                <MdFavoriteBorder />
              </button>
              <span className="ml-1.5 text-sm">{item?.totalLike ?? 0}</span>

              <button className="tex-sm ml-1.5">
                <BiConversation />
              </button>
              <span className="ml-1.5 text-sm">{item?.totalComment ?? 0}</span>

              <button className="tex-sm ml-1.5">
                {item?.whoCanSee === 'PUBLIC' ? (
                  <TbWorld />
                ) : (
                  <HiOutlineLockClosed />
                )}
              </button>
              <span className="ml-1.5 text-sm">{item?.whoCanSee}</span>

              {item?.allowDownload && (
                <>
                  <button title="Download" className="tex-sm ml-1.5">
                    <FiDownload />
                  </button>
                  <span className="ml-1.5 text-sm font-normal">Download</span>
                </>
              )}
              <span className="ml-1.5 text-sm">
                <IconTypePost type={item?.type as PostType} />
              </span>
              <span className="ml-1.5 text-sm font-normal">{item?.type}</span>
            </div>
          </div>

          <div className="py-4 text-right text-sm font-medium">
            <Tooltip placement="bottomRight" title={'Edit'}>
              <button
                onClick={() =>
                  router.push(
                    `/posts/${
                      item?.id
                    }/edit?type=${item?.type.toLocaleLowerCase()}`,
                  )
                }
                className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
              >
                <MdOutlineModeEdit />
              </button>
            </Tooltip>

            <ActionModalDialog
              title="Delete?"
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
              description="Are you sure you want to delete this?"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListGallery;
