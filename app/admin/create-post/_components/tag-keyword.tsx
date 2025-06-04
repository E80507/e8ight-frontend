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
  const selectedKeywords = form.watch("keywords");
  const selectedTags = form.watch("tags");

  return (
    <>
      <div>
        <p className="mb-3 pretendard-subtitle-m">태그</p>
        <div className="flex gap-x-3">
          {selectedTags && selectedTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2">
              {selectedTags.map((tag: string) => (
                <Badge
                  key={tag}
                  text={tag}
                  color="default"
                  className="h-10 px-4 py-2 pretendard-body-2"
                />
              ))}
            </div>
          )}
          <Button
            size="lg"
            variant="outline"
            className="w-[97px] self-start"
            onClick={(e) => {
              openModal(e, "tags");
            }}
          >
            선택하기
          </Button>
        </div>
      </div>
      <div>
        <p className="mb-3 pretendard-subtitle-m">
          키워드{" "}
          <span className="text-label-natural pretendard-body-3">
            (최대 5개)
          </span>
        </p>
        <div className="flex gap-x-3">
          {selectedKeywords && selectedKeywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2">
              {selectedKeywords.map((keyword: string) => (
                <Badge
                  key={keyword}
                  text={keyword}
                  color="default"
                  className="h-10 px-4 py-2 pretendard-body-2"
                />
              ))}
            </div>
          )}

          <Button
            size="lg"
            variant="outline"
            className="w-[97px]"
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
