/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { EventModel } from '@/types/event';
import { formateDate, formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { TicketPlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { Card } from '../ui/card';

type Props = {
  item: EventModel;
  index: number;
};

const ListPublicEvents = ({ item, index }: Props) => {
  const { push } = useRouter();
  const { locale, ipLocation } = useInputState();

  return (
    <>
      <Card
        key={index}
        className="w-full dark:border-gray-800 dark:bg-[#04080b]"
      >
        {item?.uploadsImages?.length > 0 ? (
          <>
            <Link
              className="hover:text-blue-600"
              href={`/events/${item?.slug}`}
              title={item?.title}
            >
              <Image
                height={500}
                width={500}
                quality={90}
                priority={true}
                layout="responsive"
                className="size-full rounded-lg object-cover transition-all duration-300 group-hover:scale-125"
                src={`${viewOneFileUploadAPI({
                  folder: 'event',
                  fileName: String(item?.uploadsImages?.[0]?.path),
                })}`}
                alt={String(item?.title)}
              />
            </Link>
          </>
        ) : null}

        <div className="mt-2 items-center justify-items-center px-3">
          <ButtonInput
            type="button"
            className="w-full"
            variant="primary"
            onClick={() => {
              push(`/events/${item?.slug}`);
            }}
            icon={<TicketPlusIcon className="size-6" />}
          >
            Ticket
          </ButtonInput>
        </div>

        <div className="flex flex-1 flex-col p-3">
          <div className="flex shrink-0 items-center font-bold">
            {Number(item?.oneTicket?.amount) > 0 ? (
              <>
                <p className="text-2xl">
                  {formatePrice({
                    currency: String(item?.currency?.code),
                    value: Number(item?.oneTicket?.amount ?? 0),
                    isDivide: false,
                  })}
                </p>
              </>
            ) : (
              <p className="text-2xl">Free</p>
            )}
            {item?.oneEventDate?.expiredAt ? (
              <p className="ml-auto text-lg text-blue-600">
                {formateDate(item?.oneEventDate?.expiredAt as Date, locale)}
              </p>
            ) : null}
          </div>

          <p className="mt-2 flex-1 text-xl font-bold text-gray-900 transition-all duration-200 hover:text-blue-600 dark:text-white sm:text-base">
            <Link
              className="hover:text-blue-600"
              href={`/events/${item?.slug}`}
              title={item?.title}
            >
              <ReadMore html={String(item?.title ?? '')} value={60} />
            </Link>
          </p>
          {/* <div className="flex flex-wrap justify-between space-x-2 pt-3">
            <div className="flex shrink-0 font-semibold">
              <span>{item?.address ?? ''}</span>
              <span className="ml-1 text-gray-400 dark:text-gray-600">-</span>
              <span className="ml-1.5">{item?.city ?? ''}</span>
              <span className="ml-1 text-gray-400 dark:text-gray-600">-</span>
              <span className="ml-1.5">{item?.country?.name ?? ''}</span>
            </div>
          </div> */}
          {item?.oneEventDate ? (
            <>
              <div className="flex flex-wrap justify-between space-x-2 pt-3">
                <div className="flex shrink-0 font-semibold">
                  <span>{item?.oneEventDate?.city ?? ''}</span>
                  <span className="ml-1 text-gray-400 dark:text-gray-600">
                    -
                  </span>
                  <span className="ml-1.5">
                    {item?.oneEventDate?.address ?? ''}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-between space-x-2 pt-3">
                <span className="font-bold">
                  {item?.oneEventDate?.timeInit}
                  {`${item?.oneEventDate?.timeEnd ? ` - ${item?.oneEventDate?.timeEnd}` : ''}`}
                </span>
              </div>
            </>
          ) : null}

          {/* <div className="hidden lg:table-cell"> */}
          {/* <div className="flex flex-wrap justify-between pt-2">
            <p className="mt-1 flex items-center font-semibold">
              {item?.address ? (
                <AvatarComponent className="size-9" profile={item?.profile} />
              ) : null}
              <div className="ml-2 min-w-0 flex-1">
                <p className="text-sm">{item?.organization?.name}</p>
                <p className="text-sm text-gray-500">
                  {formateDate(item?.createdAt as Date, locale)}
                </p>
              </div>
            </p>
          </div> */}
        </div>
      </Card>
    </>
  );
};
export { ListPublicEvents };
