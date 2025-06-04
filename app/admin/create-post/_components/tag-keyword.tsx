import { useState } from "react";
import { Button } from "@/components/ui/button";
import ManageModal from "./manage-modal";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { PostFormSchema } from "@/schema/post";
import Badge from "@/components/ui/badge";
import { getTags, getKeywords } from "@/app/api/admin";
import useSWR from "swr";

const TagKeyword = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof PostFormSchema>>;
}) => {
  const [modalType, setModalType] = useState<"tags" | "keywords" | null>(null);

  const { data: tags } = useSWR("tags", getTags);
  const { data: keywords } = useSWR("keywords", getKeywords);

  const openModal = (e: React.MouseEvent, type: "tags" | "keywords") => {
    e.preventDefault();
    setModalType(type);
  };

  return (
    <>
      <div>
        <div className="mb-3 flex items-center justify-between web:mb-0 web:justify-start">
          <p className="pretendard-subtitle-m web:mb-3">태그</p>
          <Button
            size="lg"
            variant="outline"
            className="w-[97px] web:hidden"
            onClick={(e) => {
              openModal(e, "tags");
            }}
          >
            선택하기
          </Button>
        </div>
        <div className="flex gap-x-3">
          {tags && tags.length > 0 && (
            <div className="flex flex-col flex-wrap items-center gap-x-2 gap-y-3 web:flex-row web:gap-y-0">
              {tags.map((tag: { id: string; content: string }) => (
                <Badge
                  key={tag.id}
                  text={tag.content}
                  color="default"
                  className="h-10 px-4 py-2 pretendard-body-2"
                />
              ))}
            </div>
          )}
          <Button
            size="lg"
            variant="outline"
            className="hidden w-[97px] self-start web:block"
            onClick={(e) => {
              openModal(e, "tags");
            }}
          >
            선택하기
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between web:mb-0 web:justify-start">
          <p className="pretendard-subtitle-m">
            키워드{" "}
            <span className="text-label-natural pretendard-body-3">
              (최대 5개)
            </span>
          </p>
          <Button
            size="lg"
            variant="outline"
            className="w-[97px] web:hidden"
            onClick={(e) => {
              openModal(e, "keywords");
            }}
          >
            선택하기
          </Button>
        </div>
        <div className="flex gap-x-3">
          {keywords && keywords.length > 0 && (
            <div className="flex flex-col flex-wrap items-center gap-x-2 gap-y-3 web:flex-row web:gap-y-0">
              {keywords.map((keyword: { id: string; content: string }) => (
                <Badge
                  key={keyword.id}
                  text={keyword.content}
                  color="default"
                  className="h-10 px-4 py-2 pretendard-body-2"
                />
              ))}
            </div>
          )}

          <Button
            size="lg"
            variant="outline"
            className="hidden w-[97px] web:block"
            onClick={(e) => {
              openModal(e, "keywords");
            }}
          >
            선택하기
          </Button>
        </div>
      </div>
      {modalType && (
        <ManageModal
          modalType={modalType}
          form={form}
          setModalType={setModalType}
          options={modalType === "tags" ? (tags ?? []) : (keywords ?? [])}
        />
      )}
    </>
  );
};

export default TagKeyword;
