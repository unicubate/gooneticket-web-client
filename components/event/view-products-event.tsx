/* eslint-disable jsx-a11y/anchor-is-valid */
import { HtmlParser } from '@/utils/html-parser';
import { useRouter } from 'next/router';
import 'react-h5-audio-player/lib/styles.css';
import { ButtonInput, CopyShareLink } from '../ui-setting';
import { ListCarouselUpload } from '../ui-setting/list-carousel-upload';

import { CreateOrUpdateOneCartAPI } from '@/api-site/cart';
import { ProductModel } from '@/types/product';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDate,
  formatePrice,
} from '@/utils';
import {
  MapIcon,
  MessageCircleIcon,
  ShareIcon,
  TicketPlusIcon,
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { ListComments } from '../comment/list-comments';
import { useInputState } from '../hooks';

type Props = {
  item: ProductModel;
};

const ViewProductsEvent = ({ item }: Props) => {
  const { query, pathname, push } = useRouter();
  const {
    linkHref,
    isOpen,
    setIsOpen,
    locale,
    loading,
    setLoading,
    userStorage,
  } = useInputState();

  const { mutateAsync: saveMutation } = CreateOrUpdateOneCartAPI({
    onSuccess: () => { },
    onError: (error?: any) => { },
  });

  const addToCart = async (itemCard: any) => {
    try {
      if (userStorage?.id) {
        await saveMutation({
          quantity: 1,
          productId: itemCard?.id,
          organizationId: itemCard?.organizationId,
        });
        AlertSuccessNotification({
          text: `Product add to cart successfully`,
        });
      } else {
        push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
      }
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          {item?.uploadsImages?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder={String(item?.model.toLocaleLowerCase())}
                height={400}
                className={`object-cover`}
              />
            </div>
          ) : null}

          <div className=" items-center justify-items-center">
            <ButtonInput
              type="button"
              className="w-full"
              variant="primary"
              size="lg"
              onClick={() => {
                userStorage?.id
                  ? push(
                    `/checkouts/${item?.slug}/event?username=${item?.profile?.username}`,
                  )
                  : push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
              }}
              icon={<TicketPlusIcon className="size-6" />}
            >
              Continue
            </ButtonInput>
          </div>

          {item?.title ? (
            <div className="mt-2 text-2xl font-bold">{item?.title ?? ''}</div>
          ) : null}

          <div className="relative mt-4 shrink-0 cursor-pointer">
            <div className="flex items-center">
              <div className="flex shrink-0 items-center font-bold">
                <span className="ml-1 text-3xl">
                  {item?.currency?.symbol ?? ''}
                </span>
                <span className="ml-1 text-3xl">
                  {formatePrice({
                    value: Number(item?.priceDiscount ?? 0),
                    isDivide: false,
                  })}
                </span>

                {item?.enableDiscount ? (
                  <>
                    <p className="ml-2 text-xl text-red-500">
                      <del> {item?.price ?? ''} </del>
                    </p>
                    <p className="ml-1 text-xl text-red-500">
                      <del> {item?.currency?.symbol ?? ''} </del>
                    </p>
                  </>
                ) : null}
              </div>

              <div className="ml-auto hidden font-bold lg:table-cell">
                <span className="text-lg">
                  {formateDate(item?.expiredAt as Date, locale)}
                </span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-sm">{item?.timeInit ?? ''}</span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-1.5 text-sm">{item?.timeEnd ?? ''}</span>
              </div>
            </div>
          </div>
          <div className="relative mt-4 shrink-0 cursor-pointer">
            <div className="hidden items-center lg:table-cell">
              <div className="flex shrink-0 font-bold">
                <MapIcon className="size-6" />
                <span className="ml-2 text-lg">{item?.address ?? ''}</span>
                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-lg">{item?.city ?? ''}</span>
                <span className="ml-2 text-lg text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-lg">
                  {item?.country?.name ?? ''}
                </span>
              </div>
            </div>

            <div className="text-lg lg:hidden">
              <div className="flex font-bold">Date</div>
              <div className="ml-auto">
                <span className="text-sm">
                  {formateDate(item?.expiredAt as Date, locale)}
                </span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-2 text-sm">{item?.timeInit ?? ''}</span>
                <span className="ml-1.5 text-sm text-gray-400 dark:text-gray-600">
                  -
                </span>
                <span className="ml-1.5 text-sm">{item?.timeEnd ?? ''}</span>
              </div>
            </div>

            <div className="mt-2 text-lg lg:hidden">
              <div className="flex font-bold">Location</div>
              <div className="flex">{item?.address ?? ''}</div>
              <div className="flex">{item?.city ?? ''}</div>
              <div className="flex">{item?.country?.name ?? ''}</div>
            </div>
          </div>

          {item?.description ? (
            <div
              className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
            >
              <span className={`ql-editor`}>
                <HtmlParser html={String(item?.description ?? '')} />
              </span>
            </div>
          ) : null}

          {item?.urlMedia ? (
            <div className={`mx-auto mt-1`}>
              <ReactPlayer
                className={`mr-auto`}
                url={item?.urlMedia}
                height="350px"
                width="100%"
                controls
              />
            </div>
          ) : null}

          <div className="mt-2 flex items-center font-medium text-gray-600">
            <MessageCircleIcon className="size-5" />
            <span className="ml-2 text-sm">
              {item?.totalComment > 0 ? item?.totalComment : ''}
            </span>

            <CopyShareLink
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              link={`${process.env.NEXT_PUBLIC_SITE}/events/${item?.slug}`}
              buttonDialog={
                <ButtonInput
                  className="text-gray-600 hover:text-gray-400 focus:ring-gray-900"
                  variant="link"
                  type="button"
                >
                  <ShareIcon className="size-5" />
                </ButtonInput>
              }
            />
          </div>

          <ListComments
            model="PRODUCT"
            modelIds={['PRODUCT']}
            take={6}
            userVisitorId={userStorage?.id}
            organizationId={item?.organizationId}
            productId={item?.id}
          />
        </div>
      </div>
    </>
  );
};

export { ViewProductsEvent };