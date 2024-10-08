import { makeApiCall } from '@/api-site/clients';
import { ResponsePostModel } from '@/types/post';
import { PaginationRequest, SortModel } from '@/utils/paginations';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export type PaymentModel =
  | 'FREE-EVENT'
  | 'BOOKING-EVENT'
  | 'PAYPAL-EVENT'
  | 'STRIPE-EVENT'
  | 'PAYPAL-SHOP'
  | 'STRIPE-SHOP'
  | 'STRIPE-CHECKOUT-SESSION-EVENT'
  | 'STRIPE-CONFIRM-CHECKOUT-SESSION-EVENT';

export const CreateOnPaymentPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['payments'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { data: any; paymentModel: PaymentModel }) => {
      const { paymentModel, data } = payload;

      if (paymentModel === 'PAYPAL-SHOP') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalShop',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-CHECKOUT-SESSION-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeCheckoutSessionEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-CONFIRM-CHECKOUT-SESSION-EVENT') {
        return await makeApiCall({
          action: 'confirmPaymentsStripeCheckoutSessionEvent',
          urlParams: { token: data?.token },
        });
      }

      if (paymentModel === 'STRIPE-SHOP') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeShop',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'PAYPAL-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsPaypalEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'STRIPE-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsStripeEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'FREE-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsFreeEvent',
          body: { paymentModel, ...data },
        });
      }

      if (paymentModel === 'BOOKING-EVENT') {
        return await makeApiCall({
          action: 'createOnePaymentsBookingEvent',
          body: { paymentModel, ...data },
        });
      }
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const DeleteOnePaymentAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['payments'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { paymentId: string }) => {
      const { paymentId } = payload;
      return await makeApiCall({
        action: 'deleteOnePayment',
        urlParams: { paymentId },
      });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return result;
};

export const getPaymentsAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: 'getPayments',
    queryParams: payload,
  });
};

export const GetInfinitePaymentsAPI = (payload: {
  take: number;
  sort: SortModel;
}) => {
  const { take, sort } = payload;
  return useInfiniteQuery({
    queryKey: ['payments', 'infinite'],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getPaymentsAPI({
        take: take,
        page: Number(pageParam),
        sort: sort,
      }),
    initialPageParam: 1,
  });
};

export const GetOnePaymentsStripeClientSecretAPI = (payload: any) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['stripe-client-secret', payload],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOnePaymentsStripeClientSecret',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};
