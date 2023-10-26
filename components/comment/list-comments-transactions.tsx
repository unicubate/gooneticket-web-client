/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { CommentModel } from "@/types/comment";
import { AvatarCoffeeComponent, AvatarComponent } from "../ui";
import Link from "next/link";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from "@/utils";
import { HtmlParser } from "@/utils/html-parser";
import { BsReplyAll } from "react-icons/bs";
import { CreateOrUpdateFormCommentReply } from "../comment/create-or-update-form-comment-reply";
import Swal from "sweetalert2";
import {
  DeleteOneCommentAPI,
  GetInfiniteCommentsRepliesAPI,
} from "@/api-site/comment";
import { Skeleton } from "antd";
import { ModelType } from "@/utils/pagination-item";
import { ListCommentsRepliesTransactions } from "./list-comments-replies-transactions";

const ListCommentTransactions: React.FC<{
  item: CommentModel;
  model: ModelType;
  modelIds: ModelType[];
  index: number;
  organizationId?: string;
}> = ({ model, modelIds, item, organizationId, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalReply, setOpenModalReply] = useState(false);

  const editItem = (item: any) => {
    setOpenModal(true);
  };

  const { mutateAsync: saveMutation } = DeleteOneCommentAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = (item: any) => {
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this?",
      confirmButtonText: "Yes, Deleted",
      cancelButtonText: "No, Cancel",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6f42c1",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        try {
          await saveMutation({ commentId: item?.id });
          AlertSuccessNotification({
            text: "Comment deleted successfully",
            className: "info",
            gravity: "top",
            position: "center",
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
    });
  };

  const {
    isLoading: isLoadingComments,
    isError: isErrorComments,
    data: dataComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteCommentsRepliesAPI({
    take: 3,
    sort: "DESC",
    modelIds: modelIds,
    commentId: String(item?.id),
  });

  const dataTableCommentsReplies = isLoadingComments ? (
    <Skeleton loading={isLoadingComments} avatar paragraph={{ rows: 1 }} />
  ) : isErrorComments ? (
    <strong>Error find data please try again...</strong>
  ) : dataComments?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataComments?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListCommentsRepliesTransactions
          model={model}
          item={item}
          key={index}
          index={index}
          organizationId={String(organizationId)}
        />
      ))
  );
  return (
    <>
      <li key={index} className="py-4">
        <div className="flex items-start">
          {item?.profile?.username ? (
            <AvatarComponent size={50} profile={item?.profile} />
          ) : (
            <AvatarCoffeeComponent size={50} color={item?.color} />
          )}

          <div className="ml-3">
            <div className="flex items-center space-x-px">
              <div className="flex items-center">
                {item?.profile?.username ? (
                  <Link
                    href={`/${item?.profile?.username}`}
                    className="text-sm font-bold text-gray-900"
                  >
                    {item?.profile?.firstName} {item?.profile?.lastName}
                  </Link>
                ) : (
                  <span className="text-sm font-bold text-gray-900">
                    {item?.fullName}
                  </span>
                )}

                <p className="ml-3.5 text-sm font-normal text-gray-500">
                  {formateFromNow(item?.createdAt as Date)}
                </p>
              </div>
            </div>
            <p className="mt-1 text-sm font-normal text-gray-600">
              <HtmlParser html={String(item?.description ?? "")} />
            </p>

            <div className="flex items-center">
              {/* Replies comments */}
              {!openModalReply && organizationId === item?.organizationId ? (
                <>
                  <button
                    onClick={() => {
                      setOpenModalReply((lk) => !lk);
                    }}
                    className="ml-3.5 text-2xl"
                  >
                    <BsReplyAll />
                  </button>
                </>
              ) : null}
            </div>
            
            {dataTableCommentsReplies}

            {hasNextPage ? (
              <>
                <div className="mt-4 flex flex-col justify-between items-center">
                  {isFetchingNextPage ? null : (
                    <button
                      disabled={isFetchingNextPage ? true : false}
                      onClick={() => fetchNextPage()}
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                    >
                      View more response
                    </button>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
        {openModalReply ? (
          <div className="ml-10">
            <CreateOrUpdateFormCommentReply
              model={model}
              parentId={String(item?.id)}
              openModalReply={openModalReply}
              setOpenModalReply={setOpenModalReply}
            />
          </div>
        ) : null}
      </li>
    </>
  );
};

export { ListCommentTransactions };
