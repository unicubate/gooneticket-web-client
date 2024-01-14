import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/util/context-user';
import { CreateOrUpdateFormCommission } from '@/components/commission/create-or-update-form-commission';
import { GetOneCommissionAPI } from '@/api-site/commission';
import { GetUploadsAPI } from '@/api-site/upload';
import { LoadingFile } from '@/components/ui/loading-file';
import { GetStaticPropsContext } from 'next';
import { ErrorFile } from '@/components/ui/error-file';

const ShopEdit = () => {
  const { organizationId } = useAuth() as any;
  const { query } = useRouter();
  const commissionId = String(query?.commissionId);

  const {
    data: commission,
    isError: isErrorCommission,
    isLoading: isLoadingCommission,
  } = GetOneCommissionAPI({
    commissionId,
    organizationId,
  });

  const {
    isError: isErrorImages,
    isLoading: isLoadingImages,
    data: uploadImages,
  } = GetUploadsAPI({
    organizationId: commission?.organizationId,
    model: 'COMMISSION',
    uploadableId: commissionId,
    uploadType: 'image',
  });

  const dataTableCommission =
    isLoadingImages || isLoadingCommission || isErrorCommission ? (
      <LoadingFile />
    ) : isErrorImages ? (
      <ErrorFile
        status="error"
        title="404"
        description="Error find data please try again..."
      />
    ) : (
      <>
        {commission?.id ? (
          <CreateOrUpdateFormCommission
            commission={commission}
            uploadImages={uploadImages}
          />
        ) : null}
      </>
    );

  return (
    <>
      <LayoutDashboard title={`${commission?.title || 'Commission'}`}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {dataTableCommission}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(ShopEdit);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
