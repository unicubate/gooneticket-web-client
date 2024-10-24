import { makeApiCall } from '@/api-site/clients';
import { EventModel } from '@/types/event';
import { SortModel } from '@/utils/paginations';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const GetOneEventAPI = (payload: { slugOrId: string }) => {
  const { slugOrId } = payload;
  const { data, isError, isLoading, isPending, status, error, refetch } =
    useQuery({
      queryKey: ['event', { ...payload }],
      queryFn: async () =>
        await makeApiCall({
          action: 'getOneEvent',
          urlParams: { slugOrId },
          queryParams: {
            isActive: 'true',
          },
        }),
      refetchOnWindowFocus: false,
    });

  return {
    error: (error as any)?.response,
    data: data?.data as EventModel,
    isError,
    isPending,
    isLoading,
    status,
    refetch,
  };
};

export const GetInfiniteEventsAPI = (payload: {
  organizationId: string;
  take: number;
  status?: string;
  sort: SortModel;
  search?: string;
  expired: 'true' | 'false';
}) => {
  const { organizationId, take, expired, sort, status, search } = payload;
  return useInfiniteQuery({
    queryKey: ['events', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getEvents',
        queryParams: {
          organizationId,
          take,
          sort,
          search,
          expired,
          status: status?.toUpperCase(),
          page: pageParam,
          isActive: 'true',
        },
      }),
    initialPageParam: 1,
  });
};

export const GetInfiniteFollowsEventsAPI = (payload: {
  take: number;
  sort: SortModel;
  search?: string;
  status?: string;
}) => {
  const { take, sort, status, search } = payload;
  return useInfiniteQuery({
    queryKey: ['events-follows', 'infinite', { ...payload }],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await makeApiCall({
        action: 'getFollowsEvents',
        queryParams: {
          take,
          sort,
          search,
          status: status?.toUpperCase(),
          page: Number(pageParam),
        },
      }),
    initialPageParam: 1,
  });
};
