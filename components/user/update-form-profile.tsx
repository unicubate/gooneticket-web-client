import React, { useEffect, useState } from 'react'
import { Select, Space } from 'antd';
import { UpdateOneProfileAPI, getAllCountiesAPI, getAllCurrenciesAPI, getOneProfileAPI } from '@/pages/api/profile';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SelectSearchInput } from '../util/form/select-search-input';
import { DateInput, TextAreaInput, TextInput } from '../util/form';
import { ButtonInput } from '../templates/button-input';
import { ProfileFormModel, arrayColors } from '@/types/profile.type';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils/alert-notification';

const { Option } = Select;

type Props = {
    profileId: string
    user: any
}

const schema = yup.object({
    fullName: yup.string().required(),
    url: yup.string().url().optional(),
    birthday: yup.date().required(),
    currencyId: yup.string().uuid().required(),
    countryId: yup.string().uuid().required(),
});

const UpdateFormProfile: React.FC<Props> = ({ profileId, user }) => {
    const [colors] = useState(arrayColors)
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
        undefined
    );
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const fetchCurrencies = async () => await getAllCurrenciesAPI();
    const { data: dataCurrencies } = useQuery(
        ["currencies"],
        () => fetchCurrencies(),
        {
            refetchOnWindowFocus: false,
        }
    );
    const currencies: any = dataCurrencies?.data;

    const fetchCountries = async () => await getAllCountiesAPI();
    const { data: dataCountries } = useQuery(
        ["countries"],
        () => fetchCountries(),
        {
            refetchOnWindowFocus: false,
        }
    );
    const countries: any = dataCountries?.data;


    const fetchOneProfile = async () =>
        await getOneProfileAPI({ profileId: profileId });
    const { data: profileItem } = useQuery(["profile", profileId], () => fetchOneProfile(), {
        refetchOnWindowFocus: false,
        enabled: Boolean(profileId),
    });
    const profile: any = profileItem?.data;


    useEffect(() => {
        if (profile) {
            const fields = [
                'birthday',
                'currencyId',
                'countryId',
                'url',
                'phone',
                'color',
                'fullName',
                'secondAddress',
                'firstAddress',
                'description'
            ];
            fields?.forEach((field: any) => setValue(field, profile[field]));
        }
    }, [profile, profileId, setValue]);

    const saveMutation = UpdateOneProfileAPI({
        onSuccess: () => {
            setHasErrors(false);
            setLoading(false);
        },
        onError: (error?: any) => {
            setHasErrors(true);
            setHasErrors(error.response.data.message);
        },
    });

    const onSubmit: SubmitHandler<ProfileFormModel> = async (
        payload: ProfileFormModel
    ) => {
        setLoading(true);
        setHasErrors(undefined);
        try {
            await saveMutation.mutateAsync({
                ...payload,
                profileId: profileId,
            });
            setHasErrors(false);
            setLoading(false);
            AlertSuccessNotification({
                text: `Information save successfully`,
                gravity: "bottom",
                className: "info",
                position: "center",
            });
        } catch (error: any) {
            setHasErrors(true);
            setLoading(false);
            setHasErrors(error.response.data.message);
            AlertDangerNotification({
                text: `${error.response.data.message}`,
                gravity: "bottom",
                className: "info",
                position: "center",
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mt-8 overflow-hidden bg-white border border-gray-200">

                    <div className="px-4 py-5">


                        <h2 className="text-base font-bold text-gray-900"> Profile </h2>

                        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-y-5 gap-x-6">
                            <div>
                                <div className="mt-2">
                                    <TextInput
                                        label="Full name"
                                        control={control}
                                        type="text"
                                        name="fullName"
                                        placeholder="Full name"
                                        errors={errors}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mt-2">
                                    <TextInput
                                        label="Phone"
                                        control={control}
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        errors={errors}
                                    />
                                </div>
                            </div>

                        </div>


                        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-y-5 gap-x-6">
                            <div>
                                <div className="mt-2">
                                    <TextInput
                                        label="Website"
                                        control={control}
                                        type="url"
                                        name="url"
                                        placeholder="Website"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <DateInput
                                        label="Birthday"
                                        control={control}
                                        placeholder="12/01/2023"
                                        name="birthday"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-y-5 gap-x-6">
                            <div>
                                <div className="mt-2">
                                    <TextInput
                                        label="First address"
                                        control={control}
                                        type="text"
                                        name="firstAddress"
                                        placeholder="First address"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <TextInput
                                        label="Second address"
                                        control={control}
                                        type="text"
                                        name="secondAddress"
                                        placeholder="Second address"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 mt-6 sm:grid-cols-3 gap-y-5 gap-x-6">

                            <div>
                                <div className="mt-2">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Color
                                    </label>
                                    <Controller
                                        name={'color'}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                showSearch
                                                size="large"
                                                style={{ width: "100%" }}
                                                id={'color'}
                                                placeholder={'Color'}
                                                status={errors?.color?.message ? "error" : ""}
                                                filterOption={(input, option) =>
                                                    (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
                                                }
                                                {...field}>
                                                <>
                                                    {colors?.length > 0
                                                        ? colors?.map((item: any, index: number) => (
                                                            <Option key={index} value={item?.name} name={item?.name}>
                                                                <Space>
                                                                    <span className={`text-xs font-semibold text-${item?.name}-600 bg-${item?.name}-50 border border-${item?.name}-600 rounded-md inline-flex items-center px-2.5 py-1`}>
                                                                        {item?.name}
                                                                    </span>
                                                                </Space>
                                                            </Option>
                                                        ))
                                                        : null}
                                                </>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>


                            <div>
                                <div className="mt-2">
                                    <SelectSearchInput
                                        label="Counties"
                                        firstOptionName="Country"
                                        valueType="key"
                                        control={control}
                                        errors={errors}
                                        placeholder="Country"
                                        name="countryId"
                                        dataItem={countries}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <SelectSearchInput
                                        label="Currency"
                                        firstOptionName="Currency"
                                        valueType="key"
                                        control={control}
                                        errors={errors}
                                        placeholder="Currency"
                                        name="currencyId"
                                        dataItem={currencies}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 mt-6 gap-y-5 gap-x-6">
                            <div>
                                <div className="mt-2">
                                    <TextAreaInput
                                        control={control}
                                        label="Bio"
                                        name="description"
                                        placeholder="Introduce yourself and what you're creating"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="mt-8">
                            <ButtonInput shape="default" type="submit" size="normal" loading={loading} color={user?.profile?.color}>
                                Save changes
                            </ButtonInput>
                        </div>

                    </div>
                </div>
                
            </form>


        </>
    )
}

export { UpdateFormProfile }