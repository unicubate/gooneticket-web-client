'use client';

import { GetOneProductAPI } from '@/api-site/product';
import { GetOneUserAddressMeAPI } from '@/api-site/user-address';
import { useInputState, useReactHookForm } from '@/components/hooks';
import { LayoutCheckoutSite } from '@/components/layout-checkout-site';
import { CreatePaymentPayPal } from '@/components/payment/create-payment-paypal';
import { CreateCardStripe } from '@/components/payment/stripe/create-payment-stripe';
import { ListCarouselUpload } from '@/components/shop/list-carousel-upload';
import { CommissionCheckoutSkeleton } from '@/components/skeleton/commission-checkout-skeleton';
import { ProfileCheckoutSkeleton } from '@/components/skeleton/profile-checkout-skeleton';
import { ButtonInput } from '@/components/ui-setting';
import { AvatarComponent } from '@/components/ui-setting/ant';
import { TextInput } from '@/components/ui-setting/shadcn';
import { PrivateComponent } from '@/components/util/private-component';
import { formatePrice } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { MapIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import * as yup from 'yup';


const schema = yup.object({
  firstName: yup.string().required('first name is a required field'),
  lastName: yup.string().required('last name is a required field'),
  email: yup.string().email().required('email is a required field'),
});

const CheckoutEvent = () => {
  const [increment, setIncrement] = useState(1)
  const [isPayPalPay, setIsPayPalPay] = useState<boolean>(false);
  const [isCardPay, setIsCardPay] = useState<boolean>(true);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const { userStorage: userBayer } = useInputState();
  const { query } = useRouter();
  const { id: productId, username } = query;
  const {
    watch,
    control,
    handleSubmit,
    errors,
  } = useReactHookForm({ schema });
  const watchAmount = watch('amount', '');
  const watchFirstName = watch('firstName', '');
  const watchLastName = watch('lastName', '');
  const watchEmail = watch('email', '');

  const {
    data: item,
  } = GetOneProductAPI({
    enableVisibility: 'TRUE',
    productSlug: String(productId),
  });

  const { data: userAddress } = GetOneUserAddressMeAPI();

  const calculatePrice = Number(item?.priceDiscount) * increment
  const newAmount = watchAmount
    ? JSON.parse(watchAmount)
    : {
      address: {
        firstName: watchFirstName, lastName: watchLastName, email: watchEmail
      },
      valueTotal: calculatePrice,
      quantity: increment,
      currency: item?.currency?.code,
      value: item?.priceDiscount,
    };



  const onSubmit = async () => { setIsValidAddress(true) };

  return (
    <>
      <LayoutCheckoutSite title={`Checkout - ${item?.title ?? 'commissions'}`}>
        <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-[#121212]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-5 py-6 dark:bg-[#121212] md:px-8">
              <div className="flow-root">
                {item?.id ? (
                  <>
                    <div className="flex items-center">
                      {item?.id ? (
                        <p className="cursor-pointer text-lg font-bold">
                          {item?.title ?? ''}
                        </p>
                      ) : null}
                    </div>

                    {item?.uploadsImages?.length > 0 ? (
                      <div className="mx-auto mt-4 justify-center text-center">
                        <ListCarouselUpload
                          uploads={item?.uploadsImages}
                          folder="products"
                          height={250}
                        />
                      </div>
                    ) : null}


                    <div className="relative shrink-0 cursor-pointer">
                      <div className="hidden items-center lg:table-cell">
                        <div className="flex shrink-0 font-bold">
                          <MapIcon className="size-6" />
                          <span className="ml-2 text-lg">{item?.address ?? ''}</span>
                          <span className="ml-2 text-lg">-</span>
                          <span className="ml-2 text-lg">{item?.city ?? ''}</span>
                          <span className="ml-2 text-lg">-</span>
                          <span className="ml-2 text-lg">{item?.country?.name ?? ''}</span>
                        </div>
                      </div>

                      <div className="text-lg lg:hidden">
                        <div className="flex font-bold">
                          Location
                        </div>
                        <div className="flex">
                          {item?.address ?? ''}
                        </div>
                        <div className="flex">
                          {item?.city ?? ''}
                        </div>
                        <div className="flex">
                          {item?.country?.name ?? ''}
                        </div>
                      </div>

                    </div>

                    {item?.description ? (
                      <div
                        className={`text-sm font-normal text-gray-600 dark:text-gray-300`}
                      >
                        <span className={`ql-editor`}>
                          <HtmlParser html={String(item?.description ?? '')} />
                        </span>
                      </div>
                    ) : null}


                  </>
                ) : (
                  <CommissionCheckoutSkeleton />
                )}
              </div>
            </div>

            <div className="px-5 py-6 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800 ">
                  {item?.id ? (
                    <>
                      <div className="py-6">
                        <div className="mb-2 flex items-center">
                          <AvatarComponent
                            size={40}
                            className="size-10 shrink-0 rounded-full"
                            profile={item?.profile}
                          />

                          <div className="ml-2 cursor-pointer">
                            <p className="text-sm font-bold">
                              {item?.profile?.firstName ?? ''}{' '}
                              {item?.profile?.lastName ?? ''}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-500">
                              Checkout
                            </p>
                          </div>

                          {/* <div className="ml-auto">
                            <p className="cursor-pointer text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900">
                              <Link
                                className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                                href={`/${username}/commissions`}
                              >
                                Commission
                              </Link>
                            </p>
                          </div> */}
                          <ButtonInput
                            type="button"
                            size="sm"
                            variant="info"
                            className="ml-auto"
                          >
                            <Link href={`/${username}/commissions`}>
                              Event
                            </Link>
                          </ButtonInput>
                        </div>
                      </div>
                      <div className="py-6">
                        <ul className="space-y-3">
                          {/* <li className="flex items-center justify-between">
                            <p className="text-sm font-medium dark:text-white">
                              Tva
                            </p>
                            {newAmount?.value ? (
                              <>
                                <p className="ml-auto text-sm font-bold dark:text-white">
                                  {formatePrice({
                                    value: Number(newAmount?.value),
                                    isDivide: false,
                                  }) ?? ''}
                                </p>
                                <p className="ml-1 text-sm font-bold dark:text-white">
                                  {newAmount?.currency}
                                </p>
                              </>
                            ) : null}
                          </li> */}


                          <li className="flex items-center justify-between">
                            <p className="text-sm font-bold text-gray-600">
                              {newAmount?.currency} {newAmount?.value} x {increment}
                            </p>
                            <div className="ml-auto flex items-center justify-end space-x-8 rounded-md border border-gray-100 dark:border-gray-900">
                              <ButtonInput
                                type="button"
                                variant="info"
                                disabled={increment === 1 ? true : false}
                                onClick={() => setIncrement((lk) => lk - 1)}
                                icon={<PlusIcon className="size-5" />}
                              />

                              <span className="text-base font-semibold text-black dark:text-white">
                                {increment}
                              </span>

                              <ButtonInput
                                type="button"
                                variant="info"
                                loading={false}
                                onClick={() => setIncrement((lk) => lk + 1)}
                                icon={<PlusIcon className="size-5" />}
                              />
                            </div>
                          </li>

                          {/* <li className="flex items-center justify-between">
                            <p className="text-sm font-medium dark:text-white">
                              Commission
                            </p>
                            {newAmount?.value ? (
                              <>
                                <p className="ml-auto text-sm font-bold dark:text-white">
                                  {formatePrice({
                                    value: Number(newAmount?.value),
                                    isDivide: false,
                                  }) ?? ''}
                                </p>
                                <p className="ml-1 text-sm font-bold dark:text-white">
                                  {newAmount?.currency}
                                </p>
                              </>
                            ) : null}
                          </li> */}

                          <li className="flex items-center justify-between py-4">
                            <p className="text-3xl font-medium dark:text-white">
                              Total
                            </p>
                            {newAmount?.valueTotal ? (
                              <>
                                <p className="ml-auto text-xl font-bold dark:text-white">
                                  {formatePrice({
                                    value: Number(newAmount?.valueTotal),
                                    isDivide: false,
                                  }) ?? ''}
                                </p>
                                <p className="ml-1 text-lg font-bold dark:text-white">
                                  {newAmount?.currency}
                                </p>
                              </>
                            ) : null}
                          </li>
                        </ul>
                      </div>

                      <>
                        <div className="py-4">
                          <div className="flex items-center">
                            <h2 className="text-base font-bold text-gray-500">
                              Billing Information
                            </h2>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>

                          <div className="py-4">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                              <div className="mt-2">
                                <TextInput
                                  label="First name"
                                  control={control}
                                  type="text"
                                  name="firstName"
                                  placeholder="First name"
                                  errors={errors}

                                />
                              </div>

                              <div className="mt-2">
                                <TextInput
                                  label="Last name"
                                  control={control}
                                  type="text"
                                  name="lastName"
                                  placeholder="Last name"
                                  errors={errors}
                                />
                              </div>
                            </div>


                            <div className="mt-2">
                              <TextInput
                                label="Email"
                                control={control}
                                type="email"
                                name="email"
                                placeholder="Email"
                                errors={errors}
                              />
                            </div>

                            {watchFirstName &&
                              watchLastName &&
                              watchEmail ? null :
                              <div className="my-4 flex items-center space-x-4">
                                <ButtonInput
                                  size="lg"
                                  type="submit"
                                  variant="info"
                                  className="w-full"
                                >
                                  Continue
                                </ButtonInput>
                              </div>}

                          </div>
                        </form>

                        {watchFirstName &&
                          watchLastName &&
                          watchEmail ?
                          <>
                            <div className="py-4">
                              <h2 className="text-base font-bold text-gray-500">
                                Payment Method
                              </h2>
                            </div>

                            <div className="py-6">
                              <div className="flex items-center space-x-4">
                                <ButtonInput
                                  size="lg"
                                  type="button"
                                  variant={isCardPay ? 'info' : 'ghost'}
                                  className="w-full"
                                  onClick={() => {
                                    setIsPayPalPay(false);
                                    setIsCardPay(true);
                                  }}
                                  icon={<FaCreditCard className="size-6" />}
                                >
                                  Card
                                </ButtonInput>
                                <ButtonInput
                                  size="lg"
                                  type="button"
                                  variant={isPayPalPay ? 'info' : 'ghost'}
                                  className="w-full"
                                  onClick={() => {
                                    setIsCardPay(false);
                                    setIsPayPalPay(true);
                                  }}
                                  icon={<FaPaypal className="size-6" />}
                                >
                                  PayPal
                                </ButtonInput>
                              </div>
                              <>
                                {isCardPay ? (
                                  <>
                                    <CreateCardStripe
                                      paymentModel="STRIPE-COMMISSION"
                                      data={{
                                        userAddress,
                                        productId: item?.id,
                                        amount: newAmount,
                                        userReceiveId: item?.userId,
                                        userBuyerId: userBayer?.id,
                                        organizationSellerId:
                                          item?.organizationId,
                                        organizationBuyerId:
                                          userBayer?.organizationId,
                                      }}
                                    />
                                  </>
                                ) : null}

                                {isPayPalPay ? (
                                  <CreatePaymentPayPal
                                    paymentModel="PAYPAL-COMMISSION"
                                    data={{
                                      userAddress,
                                      productId: productId,
                                      amount: newAmount,
                                      userReceiveId: item?.userId,
                                      userBuyerId: userBayer?.id,
                                      organizationSellerId:
                                        item?.organizationId,
                                      organizationBuyerId:
                                        userBayer?.organizationId,
                                    }}
                                  />
                                ) : null}

                                <Image
                                  className="ml-auto mt-2"
                                  src={'/assets/payment-cards.png'}
                                  height={180}
                                  width={180}
                                  alt="Payment cards"
                                />
                              </>
                            </div>
                          </> : null}



                      </>

                      {/* {userBayer?.organizationId !== item?.organizationId ? (
                        <>
                          <CreateOrUpdateUserAddressForm
                            userAddress={userAddress}
                          />

                          {userAddress?.isUpdated &&
                            userAddress?.street1 &&
                            userAddress?.city &&
                            userAddress?.country ? (
                            <>
                              <div className="py-4">
                                <h2 className="text-base font-bold text-gray-500">
                                  Payment Method
                                </h2>
                              </div>

                              <div className="py-6">
                                <div className="flex items-center space-x-4">
                                  <ButtonInput
                                    size="lg"
                                    type="button"
                                    variant={isCardPay ? 'info' : 'ghost'}
                                    className="w-full"
                                    onClick={() => {
                                      setIsPayPalPay(false);
                                      setIsCardPay(true);
                                    }}
                                    icon={<FaCreditCard className="size-6" />}
                                  >
                                    Card
                                  </ButtonInput>
                                  <ButtonInput
                                    size="lg"
                                    type="button"
                                    variant={isPayPalPay ? 'info' : 'ghost'}
                                    className="w-full"
                                    onClick={() => {
                                      setIsCardPay(false);
                                      setIsPayPalPay(true);
                                    }}
                                    icon={<FaPaypal className="size-6" />}
                                  >
                                    PayPal
                                  </ButtonInput>
                                </div>
                                <>
                                  {isCardPay ? (
                                    <>
                                      <CreateCardStripe
                                        paymentModel="STRIPE-COMMISSION"
                                        data={{
                                          userAddress,
                                          productId: item?.id,
                                          amount: newAmount,
                                          userReceiveId: item?.userId,
                                          userBuyerId: userBayer?.id,
                                          organizationSellerId:
                                            item?.organizationId,
                                          organizationBuyerId:
                                            userBayer?.organizationId,
                                        }}
                                      />
                                    </>
                                  ) : null}

                                  {isPayPalPay ? (
                                    <CreatePaymentPayPal
                                      paymentModel="PAYPAL-COMMISSION"
                                      data={{
                                        userAddress,
                                        productId: productId,
                                        amount: newAmount,
                                        userReceiveId: item?.userId,
                                        userBuyerId: userBayer?.id,
                                        organizationSellerId:
                                          item?.organizationId,
                                        organizationBuyerId:
                                          userBayer?.organizationId,
                                      }}
                                    />
                                  ) : null}

                                  <Image
                                    className="ml-auto mt-2"
                                    src={'/assets/payment-cards.png'}
                                    height={180}
                                    width={180}
                                    alt="Payment cards"
                                  />
                                </>
                              </div>
                            </>
                          ) : null}
                        </>
                      ) : null} */}
                    </>
                  ) : (
                    <ProfileCheckoutSkeleton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="mt-4 text-sm font-normal text-gray-500">
            All the taxes will be calculated while checkout
          </p>
        </div>
      </LayoutCheckoutSite>
    </>
  );
};
export default PrivateComponent(CheckoutEvent);
