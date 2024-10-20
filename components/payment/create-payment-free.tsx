import { CreateOnPaymentAPI } from '@/api-site/payment';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDangerNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { PaymentModel } from '../../api-site/payment';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';

type Props = { data?: any; paymentModel: PaymentModel };
const CreatePaymentFree = ({ data, paymentModel }: Props) => {
  const { push } = useRouter();
  const { hasErrors, setHasErrors } = useInputState();

  const { isPending: loading, mutateAsync } = CreateOnPaymentAPI();

  const handleUserPageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReference = generateLongUUID(30);
    const payload = {
      ...data,
      type: 'FREE',
      reference: newReference,
    };
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: payload,
        paymentModel: paymentModel,
      });
      setHasErrors(false);

      push(`/transactions/success?token=${newReference}&type=free&tag=tickets`);
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleUserPageSubmit}>
        <div className="flex-auto justify-center">
          {hasErrors && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{hasErrors}</AlertDescription>
            </Alert>
          )}

          <div className="mt-4 flex items-center space-x-4">
            <ButtonInput
              size="lg"
              type="submit"
              className="w-full"
              variant="primary"
              loading={loading}
              disabled={
                !data?.userAddress?.email || !data?.userAddress?.fullName
              }
            >
              Continue Free
            </ButtonInput>
          </div>
        </div>
      </form>
    </>
  );
};

export { CreatePaymentFree };
