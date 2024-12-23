/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteEventDatesAPI } from '@/api-site/event-date';
import {
  ButtonLoadMore,
  EmptyData,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import { EventDateModel } from '@/types/event-date';
import { UserModel } from '@/types/user';
import { TicketIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks';
import { ListPublicEventDates } from './list-public-event-dates';

const TablePublicEventDates = ({ user }: { user: UserModel }) => {
  const { search } = useInputState();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoading,
    isError: isError,
    data: data,
    isFetchingNextPage: isFetchingNextPage,
    hasNextPage: hasNextPage,
    fetchNextPage: fetchNextPage,
  } = GetInfiniteEventDatesAPI({
    search,
    take: 10,
    sort: 'ASC',
    organizationId: user?.organizationId,
  });

  return (
    <>
      {isLoading ? (
        <LoadingFile />
      ) : isError ? (
        <ErrorFile
          title="404"
          description="Error find data please try again..."
        />
      ) : Number(data?.pages[0]?.data?.total) <= 0 ? null : (
        data?.pages
          .flatMap((page: any) => page?.data?.value)
          .map((item: EventDateModel, index: number) => (
            <ListPublicEventDates item={item} key={index} index={index} />
          ))
      )}

      {Number(data?.pages[0]?.data?.total) <= 0 ? (
        <>
          <EmptyData
            image={<TicketIcon className="size-10" />}
            title={`This ${user?.status.toLowerCase()} has not yet published anything as an event`}
            description={`When he does, his publications will appear here first.`}
          />
        </>
      ) : null}

      {hasNextPage && (
        <div className="mx-auto mt-4 justify-center text-center">
          <ButtonLoadMore
            className="w-full"
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};
export { TablePublicEventDates };
