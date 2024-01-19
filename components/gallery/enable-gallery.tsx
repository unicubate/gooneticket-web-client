
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { AlertDangerNotification } from "@/utils";
import { ButtonInput } from "../ui-setting/ant/button-input";
import { UpdateEnableProfileAPI } from "@/api-site/user";
import { useAuth } from "../util/context-user";


type Props = {
  profile?: any;
};

const EnableGallery: React.FC<Props> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(profile?.enableGallery)


  // Create or Update data
  const { mutateAsync: saveMutation } = UpdateEnableProfileAPI({
    onSuccess: () => { },
    onError: (error?: any) => { },
  });

  const enableItem = async () => {
    try {
      await saveMutation({
        enableGallery: true,
        profileId: profile?.id
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }

  }


  return (
    <>
      <div className={`mt-8 border rounded-lg ${isOpen ? 'bg-indigo-50 dark:bg-indigo-100' : 'bg-red-100'} border-${isOpen ? 'indigo-300' : 'red-500'} `}>
        <div className="px-4 py-5 sm:p-3">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 max-w-xs md:mt-0">
              <p className="text-base font-bold text-gray-600">
                Shop  {isOpen ? "Open" : "Close"}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {isOpen ?
                  "Gallery are currently active. Your fans can request them from your page."
                  :
                  "Your gallery are currently private and are not available for public."
                }
              </p>
            </div>
            <div className="flex items-center justify-start mt-4 space-x-6 md:ml-auto md:justify-end md:mt-0 md:space-x-reverse">
              <ButtonInput
                onClick={() => { enableItem(); setIsOpen((lk: boolean) => !lk) }}
                shape="default"
                type="button"
                size="normal"
                loading={false}
                color={isOpen ? "indigo" : "red"}
              >
                {isOpen ? "click to close" : "Click to open"}
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { EnableGallery };
