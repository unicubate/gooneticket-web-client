import { GetOneOrderItemAPI } from '@/api-site/order-item';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { ViewOrderItemEvent } from '@/components/order-item/view-order-item-event';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';

const Ticket = () => {
  const { t, userStorage: user } = useInputState();
  const { query, push } = useRouter();
  const { model } = query;
  const orderNumber = String(query?.oderItemId);

  const {
    data: orderItem,
    isError: isErrorOrderItem,
    isLoading: isLoadingOrderItem,
  } = GetOneOrderItemAPI({
    orderNumber: orderNumber,
    organizationBuyerId: user?.organizationId,
  });

  return (
    <>
      <LayoutDashboard title={`Order ${orderItem?.event?.title ?? ''}`}>
        <div className="mx-auto max-w-4xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <ButtonInput
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  push(`/orders/${orderItem?.orderId}/order-items`);
                }}
                icon={<MoveLeftIcon className="size-4" />}
              >
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t.formatMessage({ id: 'UTIL.COME_BACK' })}
                </span>
              </ButtonInput>
              <div className="mt-2 overflow-hidden rounded-lg border bg-white dark:border-input dark:bg-background">
                {isLoadingOrderItem ? (
                  <LoadingFile className="my-6" />
                ) : isErrorOrderItem ? (
                  <ErrorFile
                    title="404"
                    description="Error find data please try again..."
                  />
                ) : (
                  <>
                    {model === 'event' ? (
                      <ViewOrderItemEvent orderItem={orderItem} />
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Ticket);
