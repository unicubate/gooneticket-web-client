import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateDateDayjs } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import {
  CalendarIcon,
  CopyIcon,
  DownloadIcon,
  HashIcon,
  LinkIcon,
  PaperclipIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import * as yup from 'yup';
import { ButtonInput, SerialPrice } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';

const schema = yup.object({
  status: yup.string().required(),
});

const OrderItemUserModal: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
  item: OrderItemModel | any;
}> = ({ isOpen, setIsOpen, item }) => {
  const linkCopy =
    'https://ko-fi.com/home/coffeeshop?txid=0b23119b-e8f7-40bc-bf3f-b4450a4fb59b';
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipBoard = async (link: string) => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <>
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto w-full max-w-3xl rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212] overflow-y-scroll max-h-screen">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen((lk: boolean) => !lk)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <div className="py-6">
              <div className="flex items-center">
                <div className="relative shrink-0 cursor-pointer">
                  {item?.uploadsImages?.length > 0 ? (
                    <div className="flex-shrink-0">
                      <Image
                        width={100}
                        height={70}
                        preview={false}
                        className="rounded-md"
                        src={`${viewOneFileUploadAPI({
                          folder: 'products',
                          fileName: item?.uploadsImages[0]?.path,
                        })}`}
                        alt=""
                      />
                    </div>
                  ) : null}
                </div>
                <div className="ml-2 cursor-pointer">
                  <div className="flex items-center text-gray-600">
                    <button className="tex-sm">
                      <CalendarIcon className="size-4" />
                    </button>
                    <span className="ml-1.5 text-sm font-normal">
                      {formateDateDayjs(item?.createdAt as Date)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {item?.product?.title ? (
                      <p className="text-lg font-bold text-gray-600 dark:text-white">
                        <ReadMore html={`${item?.product?.title}`} value={18} />
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center text-gray-600">
                    <button className="tex-sm">
                      <HashIcon className="size-4" />
                    </button>
                    <span className="ml-1.5 text-sm font-normal">
                      {item?.orderNumber}
                    </span>
                  </div>
                </div>

                <div className="ml-auto">
                  <p className="mt-1 flex min-w-0 flex-1 items-center text-sm font-bold text-gray-600">
                    {item?.profileSeller ? (
                      <AvatarComponent
                        size={50}
                        profile={item?.profileSeller}
                      />
                    ) : null}
                    <div className="ml-2 min-w-0 flex-1">
                      <p className="text-sm font-bold dark:text-white">
                        {item?.profileSeller?.firstName}{' '}
                        {item?.profileSeller?.lastName}
                      </p>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="py-2">
              <div className="flex items-center">
                <h2 className="font-bold text-base">Price</h2>

                <div className="ml-auto">
                  <SerialPrice
                    className="font-bold text-lg"
                    value={Number(item?.priceDiscount)}
                    currency={{ code: String(item?.currency) }}
                  />
                </div>
              </div>
            </div>

            <>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {['2', '3', '4'].map((x, y) => (
                  <div className="py-4">
                    <div className="flex items-center">
                      <div className="relative shrink-0 cursor-pointer">
                        <button className="tex-sm text-gray-600">
                          <PaperclipIcon className="size-8" />
                        </button>
                      </div>
                      <div className="ml-2 cursor-pointer">
                        <div className="mt-2 flex items-center">
                          {item?.product?.title ? (
                            <p className="text-sm font-bold text-gray-600 dark:text-white">
                              <ReadMore
                                html={`${item?.product?.title}`}
                                value={18}
                              />
                            </p>
                          ) : null}
                        </div>
                        <div className="mt-2 flex items-center text-gray-600">
                          <span className="ml-1.5 text-sm font-normal">
                            12MB
                          </span>
                        </div>
                      </div>

                      <div className="ml-auto">
                        <ButtonInput
                          type="button"
                          icon={<DownloadIcon className="size-4" />}
                          variant="outline"
                        >
                          <span className="ml-1">Download</span>
                        </ButtonInput>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="py-4">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <button className="tex-sm text-gray-600">
                        <LinkIcon className="size-8" />
                      </button>
                    </div>
                    <div className="ml-2 cursor-pointer">
                      <div className="mt-2 flex items-center">
                        {item?.product?.title ? (
                          <p className="text-sm font-bold text-gray-600 dark:text-white">
                            <ReadMore html={linkCopy} value={50} />
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="ml-auto">
                      <ButtonInput
                        type="button"
                        variant="outline"
                        onClick={() => {
                          copyToClipBoard(linkCopy), setCopySuccess(true);
                        }}
                      >
                        <CopyIcon className="size-4" />
                        <span className="ml-1">
                          {copySuccess ? 'Copied' : 'Copy'}
                        </span>
                      </ButtonInput>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { OrderItemUserModal };