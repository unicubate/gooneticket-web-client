import { makeApiCall } from '@/api-site/clients';
import { ModelType } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export const GetUploadsAPI = (payload: {
  organizationId?: string;
  model: ModelType;
  uploadableId: string;
  uploadType?: 'image' | 'file';
}) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['uploads', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getUploads',
        queryParams: payload,
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data, isError, isLoading, status, isPending, refetch };
};

export const viewOneFileUploadAPI = ({
  fileName,
  folder,
}: {
  fileName: string;
  folder: string;
}) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/uploads/${folder}/${fileName}`
    : null;

export const downloadOneUploadsAPI = async (payload: {
  folder: string;
  fileName: string;
}) => {
  return await makeApiCall({
    action: 'downloadOneUploads',
    urlParams: payload,
  });
};
