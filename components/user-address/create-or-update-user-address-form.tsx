import { CreateOrUpdateOneUserAddressAPI } from '@/api-site/user-address';
import { useInputState } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { UserAddressModel } from '@/types/user-address';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  userAddress?: any;
  isEdit: boolean;
  setIsEdit: any;
  isContinue: boolean;
  countries: any[];
};

const schema = yup.object({
  fullName: yup.string().required('full name is a required field'),
  address: yup.string().required('address is a required field'),
  email: yup.string().email().required('email is a required field'),
  city: yup.string().required('city is a required field'),
  country: yup.string().required('country is a required field'),
});

const CreateOrUpdateUserAddressForm = ({
  userAddress,
  setIsEdit,
  isEdit,
  isContinue,
  countries,
}: Props) => {
  const { setHasErrors, scrollToBottom } = useInputState();
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (userAddress) {
      const fields = [
        'country',
        'url',
        'phone',
        'cap',
        'city',
        'email',
        'address',
        'fullName',
      ];
      fields?.forEach((field: any) => setValue(field, userAddress[field]));
    }
  }, [userAddress, setValue]);

  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneUserAddressAPI();

  const onSubmit: SubmitHandler<UserAddressModel> = async (
    payload: UserAddressModel,
  ) => {
    setIsEdit((i: boolean) => !i);
    try {
      await saveMutation({
        ...payload,
        userAddressId: userAddress?.id,
      });
      scrollToBottom();
    } catch (error: any) {
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
          <TextInput
            label="Full name"
            control={control}
            type="text"
            name="fullName"
            placeholder="Full name"
            errors={errors}
            disabled={isEdit}
          />
        </div>
        <div className="mt-2">
          <TextInput
            label="Email"
            control={control}
            type="email"
            name="email"
            placeholder="Email"
            errors={errors}
            disabled={isEdit}
          />
          <span className="text-xs font-medium text-gray-400">
            {`After booking, your ticket will be sent to this email address.`}
          </span>
        </div>

        <div className="mt-2">
          <SelectInput
            label="Country"
            control={control}
            errors={errors}
            placeholder="Select country"
            name="country"
            disabled={isEdit}
          >
            <SelectContent>
              <SelectGroup>
                {countries?.length > 0
                  ? countries?.map((item: any, index: number) => (
                      <SelectItem value={item?.name} key={index}>
                        <span className="font-normal">{item?.name}</span>
                      </SelectItem>
                    ))
                  : null}
              </SelectGroup>
            </SelectContent>
          </SelectInput>
        </div>

        <div className="mt-2">
          <TextInput
            label="Phone number"
            control={control}
            type="text"
            name="phone"
            placeholder="Phone number"
            errors={errors}
            disabled={isEdit}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="mt-2">
            <TextInput
              label="City"
              control={control}
              type="text"
              name="city"
              placeholder="City"
              errors={errors}
              disabled={isEdit}
            />
          </div>
          <div className="mt-2">
            <TextInput
              label="Address"
              control={control}
              type="text"
              name="address"
              placeholder="Address"
              errors={errors}
              disabled={isEdit}
            />
          </div>
        </div>

        {isContinue && !isEdit ? (
          <div className="mt-4 flex items-center space-x-4">
            <ButtonInput
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Checkout
            </ButtonInput>
          </div>
        ) : null}
      </form>
    </>
  );
};

export { CreateOrUpdateUserAddressForm };
